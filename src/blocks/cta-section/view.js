/**
 * CTA Section - Tawk Chat Integration
 * Opens Tawk chat widget when buttons with data-open-chat are clicked
 */

function initChatButtons() {
  // Find all CTA buttons with chat functionality
  const chatButtons = document.querySelectorAll('.webdune-cta-section-block a[data-open-chat="true"]');

  chatButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Don't navigate

      // Check if Tawk API is available
      if (typeof Tawk_API !== 'undefined' && Tawk_API.maximize) {
        Tawk_API.maximize();
      } else {
        console.warn('Tawk chat is not loaded yet. Please ensure Tawk.to script is installed.');
      }
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatButtons);
} else {
  initChatButtons();
}



