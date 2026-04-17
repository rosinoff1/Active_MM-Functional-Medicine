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

  /* --- FAQ Accordion --- */
  var faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', !expanded);
      if (expanded) {
        answer.setAttribute('hidden', '');
      } else {
        answer.removeAttribute('hidden');
      }
    });
  });

  /* --- Newsletter Subscribe (AJAX submit with inline thanks) --- */
  var subscribeForm = document.querySelector('.subscribe-form');
  var subscribeSuccess = document.querySelector('.subscribe-success');

  if (subscribeForm && subscribeSuccess) {
    subscribeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(subscribeForm);
      fetch(subscribeForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          subscribeForm.hidden = true;
          subscribeSuccess.hidden = false;
        } else {
          subscribeForm.submit();
        }
      }).catch(function () {
        subscribeForm.submit();
      });
    });
  }

  /* --- Shop Inquiry Modal --- */
  var shopModal = document.getElementById('shop-modal');
  if (shopModal) {
    var productSlot = shopModal.querySelector('[data-shop-modal-product]');
    var productField = shopModal.querySelector('input[name="product"]');
    var subjectField = shopModal.querySelector('input[name="_subject"]');
    var modalForm = shopModal.querySelector('.shop-modal-form');
    var modalSuccess = shopModal.querySelector('.shop-modal-success');
    var inquireButtons = document.querySelectorAll('[data-shop-inquire]');
    var lastFocused = null;

    function openShopModal(product, key) {
      productSlot.textContent = product;
      productField.value = product;
      subjectField.value = 'MMFunctionalMed_ShopContactForm_' + key;
      modalForm.reset();
      modalForm.hidden = false;
      modalSuccess.hidden = true;
      shopModal.classList.add('open');
      shopModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      var firstInput = modalForm.querySelector('input:not([type="hidden"])');
      if (firstInput) firstInput.focus();
    }

    function closeShopModal() {
      shopModal.classList.remove('open');
      shopModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (lastFocused) lastFocused.focus();
    }

    inquireButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        lastFocused = btn;
        openShopModal(btn.dataset.product, btn.dataset.productKey);
      });
    });

    shopModal.querySelectorAll('[data-shop-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeShopModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && shopModal.classList.contains('open')) {
        closeShopModal();
      }
    });

    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(modalForm);
      fetch(modalForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          modalForm.hidden = true;
          modalSuccess.hidden = false;
        } else {
          modalForm.submit();
        }
      }).catch(function () {
        modalForm.submit();
      });
    });
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
