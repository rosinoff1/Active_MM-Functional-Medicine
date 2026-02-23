/* ============================================================
   Marylee Marre Functional Medicine - Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* --- Mobile Navigation --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
      body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
      });
    });
  }

  /* --- Header scroll shadow --- */
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* --- Fade-in on scroll (Intersection Observer) --- */
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything if IntersectionObserver is not supported
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
