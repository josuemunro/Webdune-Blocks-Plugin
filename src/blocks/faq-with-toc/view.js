/**
 * FAQ with ToC - Frontend JavaScript
 * 
 * Generates table of contents links based on FAQ categories
 * Handles smooth scrolling to categories
 */

document.addEventListener('DOMContentLoaded', function () {
  const faqSections = document.querySelectorAll('.section_faq-main');

  faqSections.forEach(function (section) {
    const tocContainer = section.querySelector('[data-faq-toc]');
    if (!tocContainer) return;

    // Find all FAQ categories
    const categories = section.querySelectorAll('.faq-section');
    if (!categories.length) return;

    // Clear existing ToC (if any)
    tocContainer.innerHTML = '';

    // Generate ToC links
    categories.forEach(function (category) {
      const categoryId = category.querySelector('.scroll_target')?.id;
      const categoryName = category.querySelector('.faq-h2')?.textContent;

      if (categoryId && categoryName) {
        // Create ToC link
        const link = document.createElement('a');
        link.href = '#' + categoryId;
        link.className = 'faq_sidebar-link w-inline-block';
        link.innerHTML = '<div>' + categoryName + '</div>';

        // Add smooth scroll behavior
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.getElementById(categoryId);
          if (target) {
            // Get the position accounting for fixed headers
            const yOffset = -100; // Adjust for sticky nav
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

            // Smooth scroll
            window.scrollTo({ top: y, behavior: 'smooth' });

            // Update active state
            section.querySelectorAll('.faq_sidebar-link').forEach(function (l) {
              l.classList.remove('is-active');
            });
            link.classList.add('is-active');
          }
        });

        tocContainer.appendChild(link);
      }
    });

    // Highlight active section on scroll
    if (window.lenisInstance) {
      // Use Lenis scroll event if available
      window.lenisInstance.on('scroll', function () {
        updateActiveTocLink(section);
      });
    } else {
      // Fallback to regular scroll event
      window.addEventListener('scroll', function () {
        updateActiveTocLink(section);
      });
    }

    // Initial check
    updateActiveTocLink(section);
  });

  /**
   * Update active ToC link based on scroll position
   */
  function updateActiveTocLink(section) {
    const categories = section.querySelectorAll('.faq-section');
    const tocLinks = section.querySelectorAll('.faq_sidebar-link');
    
    let currentActive = -1;
    const scrollPosition = window.scrollY + 150; // Offset for header

    categories.forEach(function (category, index) {
      const target = category.querySelector('.scroll_target');
      if (target) {
        const rect = target.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        
        if (scrollPosition >= offsetTop) {
          currentActive = index;
        }
      }
    });

    // Update active state
    tocLinks.forEach(function (link, index) {
      if (index === currentActive) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }
});

