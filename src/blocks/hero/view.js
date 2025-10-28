/**
 * Hero Block - Phone Search Functionality
 * Handles live search with debouncing and AJAX
 */

document.addEventListener('DOMContentLoaded', function () {
  console.log('🔍 Phone search initialized');

  const searchInput = document.getElementById('phone-search');
  const searchButton = document.querySelector('.home-hero_phone-lookup .button');
  const resultsWrapper = document.querySelector('.phone-lookup');
  const resultsContainer = document.querySelector('.phone-lookup_results');
  const viewAllLink = document.querySelector('.phone-lookup .text-style-link');

  if (!searchInput || !resultsWrapper || !resultsContainer) {
    console.warn('⚠️ Phone search elements not found');
    return;
  }

  let searchTimeout = null;
  let currentSearch = '';

  // Hide results initially
  resultsWrapper.style.display = 'none';

  /**
   * Debounced search function
   * Waits 300ms after user stops typing before searching
   */
  function debounceSearch(value) {
    clearTimeout(searchTimeout);
    currentSearch = value.trim();

    if (currentSearch.length === 0) {
      hideResults();
      return;
    }

    // Show loading state
    resultsContainer.innerHTML = '<div class="phone-search-loading">Searching...</div>';
    resultsWrapper.style.display = 'block';

    searchTimeout = setTimeout(() => {
      performSearch(currentSearch);
    }, 300);
  }

  /**
   * Perform AJAX search
   */
  function performSearch(searchTerm) {
    const ajaxUrl = webdunePhoneSearch?.ajaxUrl || '/wp-admin/admin-ajax.php';
    const nonce = webdunePhoneSearch?.nonce || '';

    const url = `${ajaxUrl}?action=search_phones&search=${encodeURIComponent(searchTerm)}&limit=3&nonce=${nonce}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.success && data.data) {
          displayResults(data.data);
        } else {
          showNoResults();
        }
      })
      .catch(error => {
        console.error('❌ Phone search error:', error);
        showError();
      });
  }

  /**
   * Display search results
   */
  function displayResults(results) {
    if (!results || results.length === 0) {
      showNoResults();
      return;
    }

    resultsContainer.innerHTML = results.map(phone => `
      <a href="${phone.url}" class="phone-lookup_item">
        <div class="phone-lookup_item-details">
          ${phone.image ? `<img src="${phone.image}" loading="lazy" alt="${phone.title}" class="phone-lookup_img">` : ''}
          <div>
            <div>${phone.title}</div>
            <div class="text-size-tiny">
              Get <strong>$${phone.price_range.min}</strong> to <strong>$${phone.price_range.max}</strong>
            </div>
          </div>
        </div>
        <div class="button is-secondary is-small">
          <div>Sell</div>
        </div>
      </a>
    `).join('');

    resultsWrapper.style.display = 'block';
  }

  /**
   * Show no results message
   */
  function showNoResults() {
    resultsContainer.innerHTML = `
      <div class="phone-search-no-results">
        <p>No phones found matching "${currentSearch}"</p>
        <p class="text-size-tiny">Try a different search or <a href="/select-model/?phone=${encodeURIComponent(currentSearch)}">view all models</a></p>
      </div>
    `;
    resultsWrapper.style.display = 'block';
  }

  /**
   * Show error message
   */
  function showError() {
    resultsContainer.innerHTML = `
      <div class="phone-search-error">
        <p>Sorry, something went wrong. Please try again.</p>
      </div>
    `;
    resultsWrapper.style.display = 'block';
  }

  /**
   * Hide results dropdown
   */
  function hideResults() {
    resultsWrapper.style.display = 'none';
    resultsContainer.innerHTML = '';
  }

  /**
   * Redirect to select-model page
   */
  function redirectToSelectModel() {
    const searchValue = searchInput.value.trim();
    if (searchValue.length > 0) {
      window.location.href = `/select-model/?phone=${encodeURIComponent(searchValue)}`;
    }
  }

  // Event Listeners

  // Search on input with debouncing
  searchInput.addEventListener('input', function (e) {
    debounceSearch(e.target.value);
  });

  // Handle Enter key
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      redirectToSelectModel();
    }
  });

  // Handle button click
  if (searchButton) {
    searchButton.addEventListener('click', function (e) {
      e.preventDefault();
      redirectToSelectModel();
    });
  }

  // Handle "View all models" link
  if (viewAllLink) {
    viewAllLink.addEventListener('click', function (e) {
      e.preventDefault();
      const searchValue = searchInput.value.trim();
      if (searchValue.length > 0) {
        window.location.href = `/select-model/?phone=${encodeURIComponent(searchValue)}`;
      } else {
        window.location.href = '/select-model/';
      }
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!searchInput.contains(e.target) && !resultsWrapper.contains(e.target) && !searchButton.contains(e.target)) {
      hideResults();
    }
  });

  // Prevent dropdown from closing when clicking inside it
  resultsWrapper.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});

