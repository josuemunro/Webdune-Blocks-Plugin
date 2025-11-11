/**
 * Tips Meta Block - Frontend JavaScript
 * Handles copy link functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Handle copy link button
  const copyButtons = document.querySelectorAll('.tips-meta__share-button--copy');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', async function(e) {
      e.preventDefault();
      
      const url = this.dataset.url;
      
      try {
        // Try modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
          showCopiedFeedback(this);
        } else {
          // Fallback for older browsers or non-secure contexts
          const textArea = document.createElement('textarea');
          textArea.value = url;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            const success = document.execCommand('copy');
            showCopiedFeedback(this, success);
          } catch (err) {
            console.error('Failed to copy:', err);
            showCopiedFeedback(this, false);
          }
          
          textArea.remove();
        }
      } catch (err) {
        console.error('Failed to copy URL:', err);
        showCopiedFeedback(this, false);
      }
    });
  });
  
  function showCopiedFeedback(button, success = true) {
    if (success) {
      button.classList.add('copied');
      button.setAttribute('data-tooltip', 'Copied!');
    } else {
      button.classList.add('copy-failed');
      button.setAttribute('data-tooltip', 'Failed to copy');
    }
    
    setTimeout(() => {
      button.classList.remove('copied', 'copy-failed');
      button.removeAttribute('data-tooltip');
    }, 2000);
  }
});
