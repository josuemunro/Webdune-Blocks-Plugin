/**
 * Two-Column Flexible - Video Overlay Click Handler
 * Handles video play button clicks and overlay fade
 */

function initVideoOverlays() {
  // Find all video wrappers in two-column flexible blocks
  const videoWrappers = document.querySelectorAll('.webdune-two-column-flexible .video-wrapper');

  videoWrappers.forEach((wrapper) => {
    const overlay = wrapper.querySelector('.video-overlay');
    const video = wrapper.querySelector('video');

    if (!overlay || !video) return;

    // Make overlay clickable
    overlay.style.cursor = 'pointer';

    // Handle overlay click
    overlay.addEventListener('click', () => {
      // Play the video
      video.play();

      // Show controls after playing
      video.setAttribute('controls', 'controls');

      // Fade out and remove overlay
      overlay.style.transition = 'opacity 0.3s ease';
      overlay.style.opacity = '0';

      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    });

    // Optional: Reset overlay when video ends
    video.addEventListener('ended', () => {
      // Remove controls when video ends
      video.removeAttribute('controls');

      // Show overlay again
      overlay.style.display = 'flex';
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 10);
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVideoOverlays);
} else {
  initVideoOverlays();
}

