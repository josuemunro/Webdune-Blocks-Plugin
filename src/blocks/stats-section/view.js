/**
 * Stats Section - Count-up Animation
 * 
 * Animates numbers counting up from 0 when the section scrolls into view.
 * Uses GSAP and ScrollTrigger (already loaded globally).
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP and ScrollTrigger are available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('Stats Section: GSAP or ScrollTrigger not loaded');
    return;
  }

  // Find all stats sections
  const statsSections = document.querySelectorAll('.webdune-stats-section-block .section_stats');

  statsSections.forEach((section) => {
    const statElements = section.querySelectorAll('.stats_stat');

    statElements.forEach((statElement) => {
      const targetValue = statElement.getAttribute('data-target');
      const hasBeenAnimated = statElement.getAttribute('data-animated') === 'true';

      // Skip if already animated
      if (hasBeenAnimated) {
        return;
      }

      // Parse the number from the target value
      // Handle formats like: "5,510", "$1,697,167", "$26,000"
      const numericValue = parseFloat(targetValue.replace(/[^0-9.-]/g, ''));

      // Extract prefix (like $) and suffix if any
      const prefix = targetValue.match(/^[^0-9.-]*/)?.[0] || '';
      const suffix = targetValue.match(/[^0-9,.-]*$/)?.[0] || '';

      // Check if number has commas for formatting
      const hasCommas = targetValue.includes(',');

      // Format number with commas
      const formatNumber = (value) => {
        const roundedValue = Math.round(value);
        if (hasCommas) {
          return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return roundedValue.toString();
      };

      // Create counter object for GSAP to animate
      const counter = { value: 0 };

      // Create ScrollTrigger animation
      gsap.to(counter, {
        value: numericValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%', // Start animation when section is 80% down the viewport
          once: true, // Only animate once
          onEnter: () => {
            statElement.setAttribute('data-animated', 'true');
          }
        },
        onUpdate: function () {
          statElement.textContent = prefix + formatNumber(counter.value) + suffix;
        },
        onComplete: function () {
          // Ensure final value is exactly the target
          statElement.textContent = targetValue;
        }
      });
    });
  });
});

