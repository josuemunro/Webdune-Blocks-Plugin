/**
 * Phone Slider - Client-Side Rendering
 * Queries posts via REST API and renders slider dynamically
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Phone Slider view.js loading... [BUILD: v1.0.4-arrows-check]');

  // Find all phone slider blocks
  const sliderBlocks = document.querySelectorAll('.section_home-phones');

  sliderBlocks.forEach((block) => {
    const configScript = block.querySelector('.phone-slider-config');
    if (!configScript) {
      console.warn('Phone slider config not found');
      return;
    }

    const config = JSON.parse(configScript.textContent);
    const blockId = configScript.dataset.blockId;

    console.group('📱 Phone Slider - ' + blockId);
    console.log('Config:', config);

    // Build REST API query
    const queryParams = new URLSearchParams({
      per_page: config.numberOfPosts || 8,
      _embed: true, // Include featured images
    });

    // Add filtering based on selection method
    if (config.postSelectionMethod === 'category' && config.selectedCategory) {
      queryParams.append('categories', config.selectedCategory);
    } else if (config.postSelectionMethod === 'manual' && config.selectedPosts?.length) {
      queryParams.append('include', config.selectedPosts.join(','));
    } else {
      // Latest posts
      queryParams.append('orderby', 'date');
      queryParams.append('order', 'desc');
    }

    const apiUrl = `/wp-json/wp/v2/posts?${queryParams.toString()}`;
    console.log('Fetching:', apiUrl);

    // Fetch phones
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((posts) => {
        console.log(`Found ${posts.length} posts`);

        if (posts.length === 0) {
          renderEmptyState(block, blockId, config);
        } else {
          renderPhoneSlider(block, blockId, posts, config);
        }

        console.groupEnd();
      })
      .catch((error) => {
        console.error('Phone Slider error:', error);
        renderErrorState(block, blockId, error);
        console.groupEnd();
      });
  });
});

function renderPhoneSlider(block, blockId, posts, config) {
  const container = block.querySelector('.home-phones_slider-container');

  // Build slider HTML
  const sliderHTML = `
    <div class="home-phones_slider ${blockId}">
      <div class="phones-slider swiper-wrapper">
        ${posts.map((post) => {
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      '/wp-content/plugins/webdune-blocks/assets/images/placeholder-phone.png';
    const title = post.title.rendered;
    const url = post.link;

    // Get max price from REST API field
    const maxPrice = post.max_price || 0;

    return `
            <a href="${url}" class="phone-slide swiper-slide w-inline-block">
              <img src="${imageUrl}" loading="lazy" alt="${title}" class="phone-slide_img">
              <div class="phone-slide_content">
                <h3>${title}</h3>
                ${maxPrice > 0 ? `<div class="text-size-tiny text-color-grey">Get up to <strong class="text-color-dark">$${maxPrice}</strong></div>` : ''}
              </div>
            </a>
          `;
  }).join('')}
      </div>
      ${config.showArrows ? `
      <div class="padding-global phones-slider_arrows-wrapper">
        <div class="container-large phones-slider_container">
          <a href="#" class="phones-slider_arrow prev w-inline-block">
            <div class="icon-slider-arrow w-embed">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 28" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                <path d="M15.4386 0.526291C15.0981 0.189398 14.6362 0 14.1544 0C13.6727 0 13.2107 0.189402 12.8702 0.526291L0.532341 12.7149C0.191428 13.0515 0 13.5083 0 13.9845C0 14.4607 0.191432 14.9175 0.532341 15.2541L12.8702 27.4428C13.2077 27.7933 13.674 27.9942 14.1634 27.9999C14.6527 28.0057 15.1238 27.8159 15.4696 27.4734C15.8153 27.131 16.0066 26.6649 15.9998 26.1811C15.9932 25.6973 15.789 25.2367 15.4339 24.9036L4.38026 13.9845L15.4339 3.06541C15.7754 2.72939 15.9678 2.2729 15.9687 1.79667C15.9694 1.32047 15.7787 0.863381 15.4385 0.526216L15.4386 0.526291Z" fill="currentColor" />
              </svg>
            </div>
          </a>
          <a href="#" class="phones-slider_arrow next w-inline-block">
            <div class="icon-slider-arrow w-embed">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 28" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                <path d="M0.561444 0.526291C0.901915 0.189398 1.36381 0 1.84563 0C2.3273 0 2.78935 0.189402 3.12982 0.526291L15.4677 12.7149C15.8086 13.0515 16 13.5083 16 13.9845C16 14.4607 15.8086 14.9175 15.4677 15.2541L3.12982 27.4428C2.79231 27.7933 2.32598 27.9942 1.83663 27.9999C1.34729 28.0057 0.876244 27.8159 0.530437 27.4734C0.18465 27.131 -0.00662994 26.6649 0.00017643 26.1811C0.00682259 25.6973 0.210956 25.2367 0.566056 24.9036L11.6197 13.9845L0.566056 3.06541C0.224553 2.72939 0.0322409 2.2729 0.0313339 1.79667C0.0305948 1.32047 0.221288 0.863381 0.561481 0.526216L0.561444 0.526291Z" fill="currentColor" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    ` : ''}
    </div>
  `;

  container.innerHTML = sliderHTML;
  container.removeAttribute('data-loading');

  // Initialize Swiper after DOM is fully rendered
  // Use requestAnimationFrame to ensure browser has painted the DOM
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (typeof Swiper !== 'undefined') {
        initializeSwiper(blockId, config);
      } else {
        console.warn('Swiper not loaded, slider will display as static grid');
      }
    });
  });
}

function initializeSwiper(blockId, config) {
  const swiperElement = document.querySelector(`.home-phones_slider.${blockId}`);
  if (!swiperElement) {
    console.warn('Swiper element not found:', blockId);
    return;
  }

  // Ensure swiper-wrapper exists before initializing
  const swiperWrapper = swiperElement.querySelector('.swiper-wrapper');
  if (!swiperWrapper) {
    console.warn('Swiper wrapper not found in:', blockId);
    return;
  }

  // Critical: Ensure element is attached to the DOM
  if (!document.body.contains(swiperElement)) {
    console.warn('Swiper element not in DOM yet:', blockId);
    return;
  }

  // Ensure there are actual slide elements
  const slides = swiperWrapper.querySelectorAll('.swiper-slide');
  if (slides.length === 0) {
    console.warn('No slides found in swiper:', blockId);
    return;
  }

  const swiperConfig = {
    slidesPerView: 'auto',
    spaceBetween: 72,
    loop: false,
    centeredSlides: true,
    initialSlide: 2
  };

  if (config.autoplay) {
    swiperConfig.autoplay = {
      delay: config.autoplaySpeed || 3000,
      disableOnInteraction: false,
    };
  }

  if (config.showArrows) {
    // Verify arrow elements exist before configuring navigation
    const nextArrow = document.querySelector('.phones-slider_arrow.next');
    const prevArrow = document.querySelector('.phones-slider_arrow.prev');

    if (nextArrow && prevArrow) {
      swiperConfig.navigation = {
        nextEl: '.phones-slider_arrow.next',
        prevEl: '.phones-slider_arrow.prev',
      };
      console.log('✅ Navigation arrows found');
    } else {
      console.warn('⚠️ Navigation arrows not found - disabling navigation');
      console.log('Next:', nextArrow, 'Prev:', prevArrow);
    }
  }

  // Wrap in try-catch to gracefully handle any Swiper initialization errors
  try {
    new Swiper(swiperElement, swiperConfig);
    console.log('✅ Swiper initialized for:', blockId);
  } catch (error) {
    console.error('❌ Failed to initialize Swiper for:', blockId, error);
    // Log element state for debugging
    console.log('Element:', swiperElement);
    console.log('Wrapper:', swiperWrapper);
    console.log('Slides:', slides.length);
  }
}

function renderEmptyState(block, blockId, config) {
  const container = block.querySelector('.home-phones_slider-container');
  container.innerHTML = `
    <div class="padding-global">
      <div class="container-small">
        <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #856404;">⚠️ No Phones Found</h3>
          <p><strong>The phone slider couldn't find any posts to display.</strong></p>
          <ul style="text-align: left; margin: 10px 0;">
            <li><strong>Selection Method:</strong> ${config.postSelectionMethod}</li>
            <li><strong>Requested Posts:</strong> ${config.numberOfPosts}</li>
            ${config.postSelectionMethod === 'category' ? `<li><strong>Category ID:</strong> ${config.selectedCategory}</li>` : ''}
          </ul>
          <p style="margin-bottom: 0;"><strong>Possible causes:</strong></p>
          <ul style="text-align: left; margin: 5px 0 0 0;">
            <li>No published posts exist</li>
            <li>Selected category has no posts</li>
            <li>Selected posts don't exist or aren't published</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  container.removeAttribute('data-loading');
}

function renderErrorState(block, blockId, error) {
  const container = block.querySelector('.home-phones_slider-container');
  container.innerHTML = `
    <div class="padding-global">
      <div class="container-small">
        <div style="background: #f8d7da; border: 1px solid #f5c2c7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin-top: 0; color: #842029;">❌ Error Loading Phones</h3>
          <p>${error.message}</p>
          <p style="font-size: 14px; color: #666;">Check browser console for details.</p>
        </div>
      </div>
    </div>
  `;
  container.removeAttribute('data-loading');
}

console.log('✅ Phone Slider view.js loaded');
