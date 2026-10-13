/* =========================================================
   WuXiaoHei · personal site scripts
   - hero dot field (subtle wave)
   - art dot field (interactive, pointer-driven)
   - scroll reveal + footer year
   ========================================================= */
(function () {
  'use strict';

  var ACCENT = '#2b5ce6';
  var ACCENT_SOFT = '#9fb6f5';
  var WARM = '#c8613a';
  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- canvas setup helper ---------- */
  function setupCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.getBoundingClientRect();
    var w = rect.width || canvas.width;
    var h = rect.height || (canvas.height / canvas.width) * w;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h };
  }

  /* =========================================================
     1. hero dot field — gentle radial wave
     ========================================================= */
  (function heroDots() {
    var canvas = document.getElementById('dotfield');
    if (!canvas) return;

    var state = setupCanvas(canvas);
    var ctx = state.ctx, W = state.w, H = state.h;
    var t = 0;

    function draw() {
      var gap = 20;
      var cols = Math.ceil(W / gap) + 1;
      var rows = Math.ceil(H / gap) + 1;
      var cx = W / 2, cy = H / 2;
      var maxD = Math.sqrt(cx * cx + cy * cy);

      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          var x = i * gap;
          var y = j * gap;
          var d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
          var wave = Math.sin(d / 46 - t) * 0.5 + 0.5;      // 0..1
          var r = 1.05 + wave * 2.05;
          var a = 0.10 + wave * 0.5;
          var mix = d / maxD;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = mix > 0.62
            ? 'rgba(159,182,245,' + a.toFixed(3) + ')'
            : (mix > 0.3
                ? 'rgba(43,92,230,' + (a * 0.85).toFixed(3) + ')'
                : 'rgba(22,24,29,' + (a * 0.42).toFixed(3) + ')');
          ctx.fill();
        }
      }
      t += 0.03;
      if (!prefersReduced) requestAnimationFrame(draw);
    }

    if (prefersReduced) {
      draw(); // one static frame
    } else {
      draw();
      var ro = new ResizeObserver(function () {
        state = setupCanvas(canvas);
        ctx = state.ctx; W = state.w; H = state.h;
      });
      ro.observe(canvas);
    }
  })();

  /* =========================================================
     2. art dot field — interactive point field
        dots drift by default; the pointer pushes/brightens them
     ========================================================= */
  (function artDots() {
    var canvas = document.getElementById('artdots');
    if (!canvas) return;

    var state = setupCanvas(canvas);
    var ctx = state.ctx, W = state.w, H = state.h;

    var pointer = { x: -9999, y: -9999, active: false };
    var R = 130;                 // influence radius
    var dots = [];
    var t = 0;

    function build() {
      dots = [];
      var gap = 21;
      var cols = Math.ceil(W / gap);
      var rows = Math.ceil(H / gap);
      var ox = (W - (cols - 1) * gap) / 2;
      var oy = (H - (rows - 1) * gap) / 2;
      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          var bx = ox + i * gap;
          var by = oy + j * gap;
          dots.push({
            bx: bx, by: by,
            x: bx, y: by,
            seed: Math.random() * Math.PI * 2
          });
        }
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);

      for (var k = 0; k < dots.length; k++) {
        var d = dots[k];

        // idle breathing
        var br = 0.5 + 0.5 * Math.sin(t * 0.9 + d.seed);
        var r = 1.2 + br * 0.7;
        var alpha = 0.16 + br * 0.14;
        var color = 'rgba(22,24,29,' + alpha.toFixed(3) + ')';

        if (pointer.active) {
          var dx = d.bx - pointer.x;
          var dy = d.by - pointer.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R && dist > 0.001) {
            var f = 1 - dist / R;          // 0..1
            var push = f * f * 26;         // displacement
            d.x += (d.bx + (dx / dist) * push - d.x) * 0.18;
            d.y += (d.by + (dy / dist) * push - d.y) * 0.18;
            r += f * 3.4;
            color = 'rgba(200,97,58,' + (0.20 + f * 0.72).toFixed(3) + ')';
          } else {
            d.x += (d.bx - d.x) * 0.09;
            d.y += (d.by - d.y) * 0.09;
          }
        } else {
          d.x += (d.bx - d.x) * 0.06;
          d.y += (d.by - d.y) * 0.06;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      t += 0.018;
      if (!prefersReduced) requestAnimationFrame(frame);
    }

    function toLocal(e) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) * (W / rect.width);
      pointer.y = (e.clientY - rect.top) * (H / rect.height);
      pointer.active = true;
    }

    canvas.addEventListener('pointermove', toLocal);
    canvas.addEventListener('pointerdown', toLocal);
    canvas.addEventListener('pointerleave', function () {
      pointer.active = false;
      pointer.x = pointer.y = -9999;
    });

    build();
    frame();

    var ro = new ResizeObserver(function () {
      state = setupCanvas(canvas);
      ctx = state.ctx; W = state.w; H = state.h;
      build();
    });
    ro.observe(canvas);
  })();

  /* =========================================================
     3. scroll reveal
     ========================================================= */
  (function reveal() {
    var targets = document.querySelectorAll(
      '.section-title, .section-sub, .about-grid, .card, .art-feature, .gallery-item, .contact-card'
    );
    if (!('IntersectionObserver' in window) || prefersReduced) return;

    targets.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.forEach(function (el) { io.observe(el); });
  })();

  /* =========================================================
     4. footer year
     ========================================================= */
  (function year() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  })();

})();
