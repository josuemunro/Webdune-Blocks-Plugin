/**
 * Scroll Animations System - GSAP ScrollTrigger
 * 
 * Data-attribute-based animation system for fade-up, fade-in, and stagger effects.
 * 
 * Supported data attributes:
 * - data-fade-up: Fade up from below (opacity: 0 → 1, y: 40 → 0)
 * - data-fade-in: Fade in without movement (opacity: 0 → 1)
 * - data-fade-delay="0.5": Optional delay in seconds (works on fade-up, fade-in, and stagger-children parent)
 * - data-stagger-children: Parent element whose direct children will stagger
 * - data-stagger-delay="0.2": Custom stagger delay between children (default: 0.15s)
 * - data-instant="true": Fire animation as soon as element enters viewport (for hero sections)
 * - data-bounce-loop: Bouncing animation loop (for Template Hero arrow)
 * 
 * CSS class animations (automatic):
 * - .gradient-underline: Width animation 0% → 100% with 0.4s default delay
 * 
 * Animation specs:
 * - Duration: 0.8s
 * - Easing: power2.out
 * - Trigger: 25% into viewport (start: "top 75%"), or instant if data-instant="true"
 * - Once: true (animations only play once)
 */

function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('Scroll Animations: GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Animation defaults
  const DURATION = 0.8;
  const STAGGER_DELAY = 0.15;
  const EASING = 'power2.out';
  const TRIGGER_START = 'top 75%'; // Trigger when element is 25% into viewport
  const TRIGGER_INSTANT = 'top 100%'; // Trigger as soon as element enters viewport

  /**
   * Fade Up Animation
   * Elements fade up from below with opacity
   */
  const fadeUpElements = document.querySelectorAll('[data-fade-up]');

  fadeUpElements.forEach((element) => {
    const delay = parseFloat(element.getAttribute('data-fade-delay')) || 0;
    const instant = element.getAttribute('data-instant') === 'true';

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 40
    });

    // Animate on scroll
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: DURATION,
      delay: delay,
      ease: EASING,
      scrollTrigger: {
        trigger: element,
        start: instant ? TRIGGER_INSTANT : TRIGGER_START,
        once: true
      }
    });
  });

  /**
   * Fade In Animation (no movement)
   * Elements fade in without translating
   */
  const fadeInElements = document.querySelectorAll('[data-fade-in]');

  fadeInElements.forEach((element) => {
    const delay = parseFloat(element.getAttribute('data-fade-delay')) || 0;
    const instant = element.getAttribute('data-instant') === 'true';

    // Set initial state
    gsap.set(element, {
      opacity: 0
    });

    // Animate on scroll
    gsap.to(element, {
      opacity: 1,
      duration: DURATION,
      delay: delay,
      ease: EASING,
      scrollTrigger: {
        trigger: element,
        start: instant ? TRIGGER_INSTANT : TRIGGER_START,
        once: true
      }
    });
  });

  /**
   * Stagger Children Animation
   * Parent element whose children will stagger animate
   * Supports data-delay on parent to delay entire stagger sequence
   */
  const staggerParents = document.querySelectorAll('[data-stagger-children]');

  staggerParents.forEach((parent) => {
    const staggerDelay = parseFloat(parent.getAttribute('data-stagger-delay')) || STAGGER_DELAY;
    const parentDelay = parseFloat(parent.getAttribute('data-delay')) || 0;
    const instant = parent.getAttribute('data-instant') === 'true';
    const children = Array.from(parent.children);

    if (children.length === 0) return;

    // Set initial state for all children
    gsap.set(children, {
      opacity: 0,
      y: 40
    });

    // Stagger animate children with optional parent delay
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: DURATION,
      delay: parentDelay,
      ease: EASING,
      stagger: staggerDelay,
      scrollTrigger: {
        trigger: parent,
        start: instant ? TRIGGER_INSTANT : TRIGGER_START,
        once: true
      }
    });
  });

  /**
   * Gradient Underline Expand Animation
   * All .gradient-underline elements automatically animate
   * Default delay of 0.4s (allows heading to fade up first)
   * Animates background-size instead of width (works on inline elements)
   */
  const underlineElements = document.querySelectorAll('.gradient-underline');

  underlineElements.forEach((element) => {
    // Check for custom delay, otherwise use default 0.4s
    const delay = parseFloat(element.getAttribute('data-delay')) || 0.4;
    const instant = element.getAttribute('data-instant') === 'true';

    // Get the computed background-size to preserve the height value
    const computedStyle = window.getComputedStyle(element);
    const bgSize = computedStyle.backgroundSize || '100% 0.3rem';
    const height = bgSize.split(' ')[1] || '0.3rem'; // Extract height value

    // Set initial state - 0% width, preserve height
    gsap.set(element, {
      backgroundSize: `0% ${height}`
    });

    // Animate on scroll - expand to full width
    gsap.to(element, {
      backgroundSize: `100% ${height}`,
      duration: DURATION,
      delay: delay,
      ease: EASING,
      scrollTrigger: {
        trigger: element,
        start: instant ? TRIGGER_INSTANT : TRIGGER_START,
        once: true
      }
    });
  });

  /**
   * Bounce Loop Animation
   * For Template Hero down arrow - bounces up and back with delays
   */
  const bounceElements = document.querySelectorAll('[data-bounce-loop]');

  bounceElements.forEach((element) => {
    // First fade in the element (handled by data-fade-in)
    // Then start the bounce loop after a delay

    // Wait for fade-in to complete (0.8s duration + 0.5s delay = 1.3s)
    setTimeout(() => {
      // Create infinite bounce timeline
      const bounceTl = gsap.timeline({
        repeat: -1, // Infinite repeat
        repeatDelay: 3 // 3 second delay between bounces
      });

      bounceTl.to(element, {
        y: -15, // Bounce up 15px
        duration: 0.4,
        ease: 'power2.out'
      }).to(element, {
        y: 0, // Back to original position
        duration: 0.4,
        ease: 'power2.in'
      });
    }, 1500); // Start bounce loop 1.5s after page load
  });

  /**
   * Refresh ScrollTrigger after all animations are set up
   * Ensures proper trigger positioning
   */
  ScrollTrigger.refresh();
}

/**
 * Auto-initialize on page load
 * Only on frontend, not in the editor
 */
if (typeof window !== 'undefined') {
  const isEditor = document.body.classList.contains('block-editor-page') ||
    document.body.classList.contains('wp-admin');

  if (!isEditor) {
    // Initialize animations when DOM is ready
    window.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
    });

    // Refresh ScrollTrigger after full page load (images, fonts, etc.)
    window.addEventListener('load', () => {
      // Initial refresh after page load
      setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
          console.log('ScrollTrigger: Refreshed after page load');
        }
      }, 100);

      // Second refresh to catch any lazy-loaded content
      setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
          console.log('ScrollTrigger: Second refresh complete');
        }
      }, 500);

      // Second refresh for slow connections
      setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
          console.log('ScrollTrigger: Final refresh complete');
        }
      }, 1500);
    });

    // Refresh after fonts are loaded (prevents layout shift from font swapping)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setTimeout(() => {
          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
            console.log('ScrollTrigger: Refreshed after fonts loaded');
          }
        }, 50);
      });
    }
  }
}

