/* Landing section: scroll reveal + sample viewer (auto-cycles tinted previews; hover or focus a name to see the real page in colour). */
(function () {
  'use strict';
  function start() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window) || reduce) { els.forEach(function (e) { e.classList.add('in'); }); }
    else {
      var io = new IntersectionObserver(function (list) {
        list.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
      }, { threshold: 0.15 });
      els.forEach(function (e) { io.observe(e); });
      // content rendered later (work cards, pricing) registers itself here
      window.drsObserve = function (root) { (root || document).querySelectorAll('.rv:not(.in)').forEach(function (e) { io.observe(e); }); };
    }
    if (!window.drsObserve) { window.drsObserve = function (root) { (root || document).querySelectorAll('.rv').forEach(function (e) { e.classList.add('in'); }); }; window.drsObserve(); }
    var bar = document.getElementById('scroll-bar');
    if (bar) {
      var tick = false;
      var paint = function () { tick = false; var h = document.documentElement.scrollHeight - window.innerHeight; bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ')'; };
      window.addEventListener('scroll', function () { if (!tick) { tick = true; window.requestAnimationFrame(paint); } }, { passive: true });
      paint();
    }
    var v = document.getElementById('lp-viewer');
    if (!v) { return; }
    var tabs = v.querySelectorAll('.lp-tab'), shots = v.querySelectorAll('.lp-shot'), cur = 0, timer = null;
    function show(i) {
      cur = i;
      tabs.forEach(function (b, k) { b.classList.toggle('is-on', k === i); });
      shots.forEach(function (im, k) { im.classList.toggle('is-on', k === i); });
    }
    function play() { if (reduce || timer) { return; } v.classList.add('is-auto'); timer = setInterval(function () { show((cur + 1) % tabs.length); }, 4000); }
    function stop() { v.classList.remove('is-auto'); if (timer) { clearInterval(timer); timer = null; } }
    tabs.forEach(function (b, i) {
      function pick() { stop(); show(i); }
      b.addEventListener('mouseenter', pick); b.addEventListener('focus', pick); b.addEventListener('click', pick);
    });
    v.querySelector('.lp-frame').addEventListener('mouseenter', stop);
    v.addEventListener('mouseleave', play);
    play();
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); } else { start(); }
}());
