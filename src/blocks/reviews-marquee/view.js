/**
 * Reviews Marquee - Swiper.js Initialization
 * Creates infinite scroll marquee effect for reviews
 */

function initReviewsMarquee() {
  if (typeof Swiper === 'undefined') {
    console.warn('⚠️ Swiper.js not loaded yet, retrying...');
    setTimeout(initReviewsMarquee, 100);
    return;
  }

  console.log('🎠 Initializing reviews marquees...');

  // Find all review marquee config scripts
  const configScripts = document.querySelectorAll('.swiper-config-reviews[data-block-id]');

  configScripts.forEach((configScript) => {
    const blockId = configScript.getAttribute('data-block-id');
    const autoplaySpeed = parseInt(configScript.getAttribute('data-autoplay-speed')) || 60000;

    // Initialize both top and bottom sliders
    const topSlider = document.querySelector(`.${blockId}-top`);
    const bottomSlider = document.querySelector(`.${blockId}-bottom`);

    if (!topSlider || !bottomSlider) {
      console.warn(`⚠️ Review sliders not found: ${blockId}`);
      return;
    }

    // Check if already initialized
    if (topSlider.classList.contains('swiper-initialized')) {
      console.log(`✅ Reviews already initialized: ${blockId}`);
      return;
    }

    try {
      // Top Row Swiper (Desktop - scrolls left)
      new Swiper(topSlider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: true,
        speed: autoplaySpeed,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        },
        freeMode: true,
        freeModeMomentum: false,
        allowTouchMove: false, // Disable dragging
      });

      // Bottom Row Swiper (scrolls right, mobile uses this)
      new Swiper(bottomSlider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: true,
        speed: autoplaySpeed,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true, // Opposite direction
        },
        freeMode: true,
        freeModeMomentum: false,
        allowTouchMove: true, // Allow touch on mobile
        // Navigation arrows for mobile
        navigation: {
          nextEl: `.${blockId}-nav-next`,
          prevEl: `.${blockId}-nav-prev`,
        },
      });

      console.log(`✅ Reviews marquee initialized: ${blockId}`);
    } catch (error) {
      console.error(`❌ Error initializing reviews marquee ${blockId}:`, error);
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReviewsMarquee);
} else {
  initReviewsMarquee();
}

