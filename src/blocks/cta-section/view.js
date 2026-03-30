/**
 * CTA Section - Tawk Chat Integration
 * Opens Tawk chat widget when buttons with data-open-chat are clicked.
 *
 * Button click analytics (cta_click) are handled globally
 * via src/shared/analytics.js — no per-block wiring needed.
 */

function initChatButtons() {
  const chatButtons = document.querySelectorAll('.webdune-cta-section-block a[data-open-chat="true"]');

  chatButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      if (typeof Tawk_API !== 'undefined' && Tawk_API.maximize) {
        Tawk_API.maximize();
      } else {
        console.warn('Tawk chat is not loaded yet. Please ensure Tawk.to script is installed.');
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatButtons);
} else {
  initChatButtons();
}



