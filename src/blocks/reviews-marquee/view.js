/**
 * Reviews Marquee - Client-Side Rendering & Swiper Initialization
 * Renders reviews from JSON data and creates infinite scroll marquee effect
 */

// Star SVG template
const starSVG = `<svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.8594 17.7306C22.6399 17.9799 22.5379 18.3112 22.5791 18.6406L23.4099 25.6408C23.4539 26.0116 23.3972 26.3873 23.2458 26.7287C23.0943 27.0701 22.8537 27.3645 22.5491 27.5808C22.1967 27.8267 21.7777 27.9592 21.3479 27.9608C21.0311 27.9605 20.7189 27.8851 20.437 27.7408L14.5213 24.8208C14.2032 24.6766 13.8383 24.6766 13.5203 24.8208L7.58425 27.7808C7.25091 27.9485 6.87814 28.0223 6.5059 27.9942C6.13377 27.9659 5.77633 27.8369 5.47216 27.6208C5.16759 27.4045 4.92693 27.1101 4.77542 26.7687C4.62402 26.4273 4.56729 26.0516 4.6113 25.6808L5.44212 18.6806C5.48331 18.3512 5.38133 18.0199 5.16184 17.7706L0.527386 12.5203C0.0328426 11.9656 -0.12817 11.1896 0.105208 10.4842C0.33846 9.77893 0.930505 9.25142 1.65851 9.10027L8.19511 7.78024C8.54202 7.7192 8.84127 7.50138 9.00591 7.19023L12.1891 1.1101C12.4259 0.661234 12.8188 0.314346 13.2937 0.134769C13.7688 -0.044923 14.293 -0.044923 14.7681 0.134769C15.243 0.314357 15.6359 0.661234 15.8727 1.1101L19.0158 7.19023C19.1763 7.49648 19.4671 7.71347 19.8066 7.78024L26.3331 9.10027C26.8132 9.19788 27.2437 9.46153 27.5483 9.84498C27.8531 10.2283 28.0127 10.7068 27.9992 11.1962C27.9856 11.6856 27.7997 12.1544 27.4742 12.5203L22.8594 17.7306Z" fill="#FFD940"/>
</svg>`;

function createReviewSlide(review) {
  const stars = Array(5).fill(starSVG).map(svg => `<div class="reviews_star">${svg}</div>`).join('');

  // Safely escape HTML but preserve emojis and special characters
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const photoHTML = review.photo && review.photo !== ''
    ? `<img src="${escapeHtml(review.photo)}" loading="lazy" alt="${escapeHtml(review.author || 'Reviewer')}" class="reviews_profile-img">`
    : `<div class="reviews_profile-img-placeholder"></div>`;

  return `
    <div class="review-slide swiper-slide">
      <div class="reviews_slide-top">
        <div class="reviews_stars-wrap">${stars}</div>
        <p>${escapeHtml(review.text)}</p>
      </div>
      <div class="reviews_profile-wrap">
        ${photoHTML}
        <div class="reviews_profile-content">
          <div class="reviews_profile-name">${escapeHtml(review.author || 'Anonymous')}</div>
          <div class="reviews_profile-date">${escapeHtml(review.date || 'Recently')}</div>
        </div>
      </div>
    </div>
  `;
}

function initReviewsMarquee() {
  if (typeof Swiper === 'undefined') {
    console.warn('⚠️ Swiper.js not loaded yet, retrying...');
    setTimeout(initReviewsMarquee, 100);
    return;
  }

  console.log('🎠 Initializing reviews marquees...');

  // Find all review marquee data scripts
  const dataScripts = document.querySelectorAll('.reviews-marquee-data[data-block-id]');

  dataScripts.forEach((dataScript) => {
    try {
      // Parse JSON data - emojis are safely handled
      const data = JSON.parse(dataScript.textContent);
      const { blockId, reviews, autoplaySpeed } = data;

      // Validate reviews data
      if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
        console.warn(`⚠️ No reviews found for block: ${blockId || 'unknown'}`);
        return;
      }

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

      // Render reviews into both sliders
      const reviewsHTML = reviews.map(review => createReviewSlide(review)).join('');

      const topWrapper = topSlider.querySelector('.swiper-wrapper');
      const bottomWrapper = bottomSlider.querySelector('.swiper-wrapper');

      if (topWrapper) topWrapper.innerHTML = reviewsHTML;
      if (bottomWrapper) bottomWrapper.innerHTML = reviewsHTML;

      // Top Row Swiper (Desktop - scrolls left)
      new Swiper(topSlider, {
        slidesPerView: 'auto',
        spaceBetween: 32,
        centeredSlides: true,
        loop: true,
        speed: autoplaySpeed || 7000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        },
        freeMode: true,
        freeModeMomentum: false,
        allowTouchMove: true, // Disable dragging
      });

      // Bottom Row Swiper (scrolls right, mobile uses this)
      new Swiper(bottomSlider, {
        slidesPerView: 1,
        spaceBetween: 32,
        centeredSlides: true,
        loop: true,
        speed: 300,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true, // Opposite direction
          enabled: false,
        },

        breakpoints: {
          // when window width is >= 480px
          480: {
            slidesPerView: 'auto',
            speed: autoplaySpeed || 7000,
            autoplay: {
              enabled: true,
              delay: 0,
              reverseDirection: true,
            },
          },
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
      console.error(`❌ Error initializing reviews marquee:`, error);

      // Check if it's a JSON parse error (could be emoji-related)
      if (error instanceof SyntaxError) {
        console.error('💡 This may be caused by special characters or emojis in review text. The block has been updated to handle this.');
      }
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReviewsMarquee);
} else {
  initReviewsMarquee();
}

