/**
 * Navigation Block Frontend Interactivity
 * Handles mobile menu toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  const navComponents = document.querySelectorAll('.navbar14_component');

  navComponents.forEach((navComponent) => {
    const menuButton = navComponent.querySelector('.navbar14_menu-button');
    const navMenu = navComponent.querySelector('.navbar14_menu');
    const menuIcon = navComponent.querySelector('.menu-icon2');

    if (!menuButton || !navMenu) {
      return;
    }

    // Toggle menu on button click
    menuButton.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('w--open');

      if (isOpen) {
        // Close menu
        navMenu.classList.remove('w--open');
        menuIcon?.classList.remove('w--open');
        menuButton.setAttribute('aria-expanded', 'false');
      } else {
        // Open menu
        navMenu.classList.add('w--open');
        menuIcon?.classList.add('w--open');
        menuButton.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navComponent.contains(e.target) && navMenu.classList.contains('w--open')) {
        navMenu.classList.remove('w--open');
        menuIcon?.classList.remove('w--open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('w--open')) {
        navMenu.classList.remove('w--open');
        menuIcon?.classList.remove('w--open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on window resize to desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991 && navMenu.classList.contains('w--open')) {
        navMenu.classList.remove('w--open');
        menuIcon?.classList.remove('w--open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });

    // Set initial aria attribute
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');
  });
});

