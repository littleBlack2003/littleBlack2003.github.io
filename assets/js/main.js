/* =========================================================
   WuXiaoHei · personal site scripts
   - 摄影作品大图查看（lightbox）
   - 页脚年份
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. 摄影作品 lightbox
        只有真正含 <img> 的作品卡片可点击
     --------------------------------------------------------- */
  (function lightbox() {
    var box = document.getElementById('lightbox');
    if (!box) return;

    var imgEl = document.getElementById('lbImg');
    var capEl = document.getElementById('lbCaption');
    var btnClose = box.querySelector('.lb-close');
    var btnPrev = box.querySelector('.lb-prev');
    var btnNext = box.querySelector('.lb-next');

    // 只收集已放入图片的作品（跳过 is-empty 占位）
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
        caption: [
          title ? title.textContent.trim() : '',
          year ? year.textContent.trim() : ''
        ].filter(Boolean).join(' · ')
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
      // 强制一次重排，让 opacity/visibility 的过渡正常触发
      // （比 requestAnimationFrame 更稳，页面在后台时也一定执行）
      void box.offsetWidth;
      box.classList.add('is-open');
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

    // 点击深色背景关闭
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lb-figure')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });

    // 触摸左右滑动
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

  /* ---------------------------------------------------------
     2. 页脚年份
     --------------------------------------------------------- */
  (function year() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  })();

})();
