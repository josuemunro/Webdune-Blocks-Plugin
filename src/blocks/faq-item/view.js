/**
 * FAQ Item - Frontend Accordion Functionality
 * Vanilla JavaScript for smooth accordion animation
 */

document.addEventListener('DOMContentLoaded', function () {
  console.log('🎯 FAQ Item view script loaded');

  const faqItems = document.querySelectorAll('[data-faq-trigger]');

  faqItems.forEach(trigger => {
    const accordion = trigger.closest('.faq5_accordion');
    const answer = accordion.querySelector('[data-faq-answer]');

    if (!answer) return;

    // Set initial state
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      answer.style.height = answer.scrollHeight + 'px';
    } else {
      answer.style.height = '0px';
    }

    // Click handler
    trigger.addEventListener('click', function () {
      toggleAccordion(trigger, answer);
    });

    // Keyboard accessibility (Enter and Space)
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAccordion(trigger, answer);
      }
    });
  });

  function toggleAccordion(trigger, answer) {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      // Close
      answer.style.height = answer.scrollHeight + 'px';
      // Force reflow
      answer.offsetHeight;
      answer.style.height = '0px';
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      // Open
      answer.style.height = answer.scrollHeight + 'px';
      trigger.setAttribute('aria-expanded', 'true');

      // Optional: Reset height to 'auto' after animation completes
      // This allows the content to adapt if window is resized
      answer.addEventListener('transitionend', function handler() {
        if (trigger.getAttribute('aria-expanded') === 'true') {
          answer.style.height = 'auto';
        }
        answer.removeEventListener('transitionend', handler);
      });
    }
  }
});

