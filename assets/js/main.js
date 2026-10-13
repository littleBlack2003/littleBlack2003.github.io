/* =========================================================
   WuXiaoHei · personal site scripts
   - scroll reveal
   - photography lightbox
   - footer year
   ========================================================= */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     1. scroll reveal
     ========================================================= */
  (function reveal() {
    var targets = document.querySelectorAll(
      '.section-title, .section-sub, .about-grid, .card, .photo, .photo-hint, .contact-card'
    );
    if (!('IntersectionObserver' in window) || prefersReduced) return;

    Array.prototype.forEach.call(targets, function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  })();

  /* =========================================================
     2. photography lightbox
        only figures that actually contain an <img> are clickable
     ========================================================= */
  (function lightbox() {
    var box = document.getElementById('lightbox');
    if (!box) return;

    var imgEl = document.getElementById('lbImg');
    var capEl = document.getElementById('lbCaption');
    var btnClose = box.querySelector('.lb-close');
    var btnPrev = box.querySelector('.lb-prev');
    var btnNext = box.querySelector('.lb-next');

    // collect real photos only (skip empty placeholder slots)
    var figures = Array.prototype.slice.call(
      document.querySelectorAll('.photo')
    ).filter(function (f) { return !!f.querySelector('img'); });

    var index = 0;
    var lastFocus = null;

    function itemsOf(fig) {
      var img = fig.querySelector('img');
      var title = fig.querySelector('.photo-title');
      var year = fig.querySelector('.photo-year');
      return {
        src: img.getAttribute('data-full') || img.getAttribute('src'),
        alt: img.getAttribute('alt') || '',
        caption: [title ? title.textContent.trim() : '', year ? year.textContent.trim() : '']
          .filter(Boolean).join(' · ')
      };
    }

    function render() {
      var it = itemsOf(figures[index]);
      imgEl.src = it.src;
      imgEl.alt = it.alt;
      capEl.textContent = it.caption;
    }

    function open(i) {
      if (!figures.length) return;
      index = (i + figures.length) % figures.length;
      render();
      lastFocus = document.activeElement;
      if (box.hasAttribute('hidden')) box.removeAttribute('hidden');
      // next frame so the transition runs after removing [hidden]
      requestAnimationFrame(function () { box.classList.add('is-open'); });
      document.body.style.overflow = 'hidden';
      btnClose.focus();
    }

    function close() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function step(d) {
      index = (index + d + figures.length) % figures.length;
      render();
    }

    figures.forEach(function (fig, i) {
      fig.addEventListener('click', function (e) {
        e.preventDefault();
        open(i);
      });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    btnNext.addEventListener('click', function (e) { e.stopPropagation(); step(1); });

    // click on the dark backdrop closes
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lb-figure')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });

    // touch swipe
    var startX = null;
    box.addEventListener('touchstart', function (e) {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
      startX = null;
    }, { passive: true });
  })();

  /* =========================================================
     3. footer year
     ========================================================= */
  (function year() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  })();

})();
