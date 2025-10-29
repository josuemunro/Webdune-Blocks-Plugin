/**
 * Phone Slider - Swiper.js Initialization
 * Initializes all phone sliders on the page
 */

// Wait for Swiper to be loaded
function initPhoneSliders() {
  if (typeof Swiper === 'undefined') {
    console.warn('⚠️ Swiper.js not loaded yet, retrying...');
    setTimeout(initPhoneSliders, 100);
    return;
  }

  console.log('🎠 Initializing phone sliders...');

  // Find all swiper config scripts
  const configScripts = document.querySelectorAll('.swiper-config[data-slider-id]');

  configScripts.forEach((configScript) => {
    const sliderId = configScript.getAttribute('data-slider-id');
    const sliderElement = document.querySelector(`.${sliderId}`);

    if (!sliderElement) {
      console.warn(`⚠️ Slider element not found: ${sliderId}`);
      return;
    }

    // Check if already initialized
    if (sliderElement.classList.contains('swiper-initialized')) {
      console.log(`✅ Slider already initialized: ${sliderId}`);
      return;
    }

    try {
      // Parse config from JSON
      const config = JSON.parse(configScript.textContent);

      // Add navigation selectors specific to this slider
      if (config.navigation && config.navigation.enabled) {
        const arrowsWrapper = sliderElement.querySelector('.phones-slider_arrows-wrapper');
        if (arrowsWrapper) {
          config.navigation = {
            nextEl: arrowsWrapper.querySelector('.phones-slider_arrow.next'),
            prevEl: arrowsWrapper.querySelector('.phones-slider_arrow.prev'),
          };
        }
      }

      // Initialize Swiper
      new Swiper(sliderElement, config);

      console.log(`✅ Phone slider initialized: ${sliderId}`);
    } catch (error) {
      console.error(`❌ Error initializing phone slider ${sliderId}:`, error);
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhoneSliders);
} else {
  initPhoneSliders();
}

