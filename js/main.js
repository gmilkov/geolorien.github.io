/**
 * Geolorien - Main JavaScript
 * Lightweight interactions for navigation, animations, and form handling
 */

(function() {
  'use strict';

  // ==========================================================================
  // Mobile Navigation Toggle
  // ==========================================================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================================================
  // Scroll-triggered Animations
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    animatedElements.forEach(function(el) {
      el.classList.add('is-visible');
    });
  }

  // ==========================================================================
  // Form Submission Success Handler
  // ==========================================================================
  if (window.location.search.includes('submitted=true')) {
    const form = document.querySelector('.contact-form');
    if (form) {
      form.innerHTML = '\
        <div class="success-message">\
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>\
            <polyline points="22 4 12 14.01 9 11.01"/>\
          </svg>\
          <h3>Message Sent!</h3>\
          <p>Thank you for reaching out. We\'ll get back to you as soon as possible.</p>\
          <a href="/" class="btn btn-secondary" style="margin-top: 1.5rem;">Back to Home</a>\
        </div>\
      ';
    }
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

})();
