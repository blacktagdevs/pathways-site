/**
 * Westover University Pathways Scholarship
 * Main JavaScript
 *
 * Features:
 * 1. Mobile Navigation Toggle
 * 2. FAQ Accordion
 * 3. Active Page Highlighting
 * 4. Smooth Scroll Enhancement
 */

(function () {
  'use strict';

  /**
   * DOM Ready Helper
   * Ensures code runs after DOM is fully loaded
   */
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /**
   * Mobile Navigation Toggle
   * Handles hamburger menu open/close functionality
   */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';

      // Toggle state
      toggle.setAttribute('aria-expanded', !isOpen);
      nav.classList.toggle('is-open');

      // Announce to screen readers
      if (!isOpen) {
        nav.setAttribute('aria-hidden', 'false');
      } else {
        nav.setAttribute('aria-hidden', 'true');
      }
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        nav.setAttribute('aria-hidden', 'true');
      }
    });

    // Close nav on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        nav.setAttribute('aria-hidden', 'true');
        toggle.focus();
      }
    });

    // Handle window resize - close mobile nav when switching to desktop
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth >= 768) {
          toggle.setAttribute('aria-expanded', 'false');
          nav.classList.remove('is-open');
          nav.removeAttribute('aria-hidden');
        }
      }, 100);
    });
  }

  /**
   * FAQ Accordion
   * Handles collapsible FAQ items with keyboard support
   */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq__item');

    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      const button = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');

      if (!button || !answer) return;

      // Set initial ARIA attributes
      const answerId = 'faq-answer-' + Math.random().toString(36).substr(2, 9);
      answer.id = answerId;
      button.setAttribute('aria-controls', answerId);
      button.setAttribute('aria-expanded', 'false');

      button.addEventListener('click', function () {
        const isOpen = item.classList.contains('is-open');

        // Optional: Close other open items (accordion behavior)
        // Uncomment the following if you want only one item open at a time:
        /*
        faqItems.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            otherItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
          }
        });
        */

        // Toggle current item
        item.classList.toggle('is-open');
        button.setAttribute('aria-expanded', !isOpen);
      });

      // Keyboard navigation within FAQ
      button.addEventListener('keydown', function (e) {
        const currentIndex = Array.from(faqItems).indexOf(item);

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            if (currentIndex < faqItems.length - 1) {
              faqItems[currentIndex + 1].querySelector('.faq__question').focus();
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (currentIndex > 0) {
              faqItems[currentIndex - 1].querySelector('.faq__question').focus();
            }
            break;
          case 'Home':
            e.preventDefault();
            faqItems[0].querySelector('.faq__question').focus();
            break;
          case 'End':
            e.preventDefault();
            faqItems[faqItems.length - 1].querySelector('.faq__question').focus();
            break;
        }
      });
    });
  }

  /**
   * Active Page Highlighting
   * Adds active class to current page's nav link
   */
  function initActivePageHighlight() {
    const navLinks = document.querySelectorAll('.nav__link');
    const currentPath = window.location.pathname;

    // Get the current page filename
    let currentPage = currentPath.split('/').pop() || 'index.html';

    // Handle root path
    if (currentPage === '' || currentPage === '/') {
      currentPage = 'index.html';
    }

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');

      // Check if this link matches current page
      if (href === currentPage ||
          (currentPage === 'index.html' && (href === './' || href === 'index.html'))) {
        link.classList.add('nav__link--active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('nav__link--active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Smooth Scroll for Anchor Links
   * Enhances in-page navigation with smooth scrolling
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href');

        // Skip if just "#" or empty
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          // Get header height for offset
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Set focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  /**
   * Form Enhancement
   * Adds client-side validation feedback (visual only for static sites)
   */
  function initFormEnhancement() {
    const forms = document.querySelectorAll('.form');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        // For static hosting, prevent actual submission and show feedback
        e.preventDefault();

        // Check if form is valid
        if (form.checkValidity()) {
          // Show success message
          const button = form.querySelector('button[type="submit"]');
          const originalText = button.textContent;

          button.textContent = 'Message Sent!';
          button.disabled = true;

          // Reset after delay (in real implementation, this would send data)
          setTimeout(function () {
            button.textContent = originalText;
            button.disabled = false;
            form.reset();

            // In production, you'd send the form data here via fetch/AJAX
            // or redirect to a thank you page
          }, 3000);
        } else {
          // Trigger native validation UI
          form.reportValidity();
        }
      });
    });
  }

  /**
   * Skip Link Focus Fix
   * Ensures skip link target receives focus properly in all browsers
   */
  function initSkipLinkFix() {
    const skipLink = document.querySelector('.skip-link');

    if (!skipLink) return;

    skipLink.addEventListener('click', function (e) {
      const href = skipLink.getAttribute('href');
      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }

  /**
   * Initialize All Modules
   */
  ready(function () {
    initMobileNav();
    initFaqAccordion();
    initActivePageHighlight();
    initSmoothScroll();
    initFormEnhancement();
    initSkipLinkFix();

    // Log initialization (remove in production)
    console.log('Pathways Scholarship site initialized');
  });
})();
