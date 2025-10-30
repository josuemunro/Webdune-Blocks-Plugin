/**
 * Webdune Animations - GSAP Scroll Behaviors
 * Includes: Lenis smooth scroll, parallax, nav behaviors
 * From Webflow export
 */

/**
 * Initialize Lenis smooth scroll
 */
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded');
    return null;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  return lenis;
}

/**
 * Initialize parallax effect for elements with [data-speed]
 */
function initParallax(lenis) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Connect Lenis with GSAP ScrollTrigger
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Create parallax effect for each background image
  const parallaxElements = document.querySelectorAll('[data-speed]');

  parallaxElements.forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0.5;
    const section = el.closest('section');

    gsap.to(el, {
      yPercent: 30 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

/**
 * Initialize navigation scroll behaviors
 * - Background color change on scroll
 * - Hide nav on scroll down, show on scroll up
 */
function initNavScrollBehavior(lenis) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  const navbarContainer = document.querySelector('.navbar14_container');
  const navbarComponent = document.querySelector('.navbar14_component');

  if (!navbarContainer || !navbarComponent) {
    return;
  }

  // Background color change on scroll
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const scrolled = self.scroll();
      if (scrolled > window.innerHeight * 0.5) {
        gsap.to(navbarContainer, {
          backgroundColor: "#00000033",
          duration: 0.3
        });
      } else {
        gsap.to(navbarContainer, {
          backgroundColor: "#fff3",
          duration: 0.3
        });
      }
    }
  });

  // Navbar hide on scroll down, show on scroll up
  if (lenis) {
    let lastScrollY = 0;
    let isHidden = false;

    // Get the full bounding box height including margins
    const navbarRect = navbarComponent.getBoundingClientRect();
    const navbarStyles = window.getComputedStyle(navbarComponent);
    const marginTop = parseFloat(navbarStyles.marginTop);
    const marginBottom = parseFloat(navbarStyles.marginBottom);
    const fullHeight = navbarRect.height + marginTop + marginBottom;

    lenis.on('scroll', ({ scroll }) => {
      const currentScrollY = scroll;

      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        // Scrolling down
        if (!isHidden) {
          gsap.to(navbarComponent, {
            y: -fullHeight * 1.25,
            duration: 0.6,
            ease: "power2.out"
          });
          isHidden = true;
        }
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        if (isHidden) {
          gsap.to(navbarComponent, {
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          });
          isHidden = false;
        }
      }

      lastScrollY = currentScrollY;
    });
  }
}

/**
 * Auto-initialize all animations on page load
 * Only run on frontend, not in the editor
 */
if (typeof window !== 'undefined') {
  // Check if we're ACTUALLY in the block editor (not just if the module exists)
  // The editor has a specific body class we can check for
  const isEditor = document.body.classList.contains('block-editor-page') || 
                   document.body.classList.contains('wp-admin');
  
  if (!isEditor) {
    window.addEventListener('DOMContentLoaded', () => {
      const lenis = initSmoothScroll();
      
      // Expose Lenis globally so other scripts (like FAQ) can trigger resize
      if (lenis) {
        window.lenis = lenis;
      }
      
      initParallax(lenis);
      initNavScrollBehavior(lenis);
    });
  }
}

