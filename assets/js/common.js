/* Dr.Studio shared helpers for the sub pages (request, pricing, start, cs).
   - DRS.ENDPOINT: the Google Apps Script web app (single source; request.js reads it from here).
   - DRS.api(payload, ms): POST text/plain JSON (Apps Script only allows CORS for simple requests).
   - DRS.initPage({T, onLang}): KO/EN switch with data-t / data-t-html / data-t-ph keys, email links, mobile menu. */
(function () {
  'use strict';

  // Google Apps Script web app ("Dr.Studio 의뢰서 접수"). Redeploy as a new *version* of the same deployment to keep this URL.
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbyDAwNfP_I_oax8EyF3BHsJsH_DWH0o8puu1M7cNAnrCu_iwmxx7NK4fypbOU3uxg4Q/exec';
  var EMAIL = 'contact' + '@' + 'drstudio.site';

  var state = { lang: 'ko', T: null, onLang: null };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function store(key, val) {
    try {
      if (val === undefined) { return window.localStorage.getItem(key); }
      window.localStorage.setItem(key, val);
    } catch (e) { /* storage unavailable */ }
    return null;
  }
  function t(key) {
    var T = state.T || {};
    var d = T[state.lang] || {};
    if (d[key] !== undefined) { return d[key]; }
    return (T.ko && T.ko[key] !== undefined) ? T.ko[key] : key;
  }
  function won(n, lang) {
    if (n === null || n === undefined || n === '' || isNaN(Number(n))) { return ''; }
    var s = Number(n).toLocaleString('en-US');
    return (lang || state.lang) === 'en' ? 'KRW ' + s : s + '원';
  }
  // Only http(s) links from the backend are rendered as links.
  function safeUrl(u) {
    var s = String(u || '').trim();
    return /^https?:\/\//i.test(s) ? s : '';
  }
  function fmtTs(ts) {
    if (ts === null || ts === undefined || ts === '') { return ''; }
    var d = typeof ts === 'number' ? new Date(ts) : new Date(String(ts));
    if (isNaN(d.getTime())) { return String(ts); }
    function p(x) { return (x < 10 ? '0' : '') + x; }
    return d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }
  function qs(name) {
    try { return new URLSearchParams(window.location.search).get(name) || ''; } catch (e) { return ''; }
  }

  // Resolves with the parsed JSON. Rejects with Error('timeout' | 'network' | 'parse').
  function api(payload, ms) {
    return new Promise(function (resolve, reject) {
      var done = false, ctrl = null, timer = null;
      try { ctrl = new AbortController(); } catch (e) { ctrl = null; }
      timer = setTimeout(function () {
        if (done) { return; }
        done = true;
        if (ctrl) { ctrl.abort(); }
        reject(new Error('timeout'));
      }, ms || 30000);
      fetch(ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload), redirect: 'follow', signal: ctrl ? ctrl.signal : undefined
      }).then(function (r) {
        return r.text().then(function (txt) {
          if (done) { return; }
          done = true; clearTimeout(timer);
          var j;
          try { j = JSON.parse(txt); } catch (e) { reject(new Error('parse')); return; }
          resolve(j);
        });
      }).catch(function () {
        if (done) { return; }
        done = true; clearTimeout(timer);
        reject(new Error('network'));
      });
    });
  }

  function getJSON(path) {
    return fetch(path, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) { throw new Error('http ' + r.status); }
      return r.json();
    });
  }

  function applyLang(next) {
    var T = state.T || {};
    state.lang = T[next] ? next : 'ko';
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-t]').forEach(function (el) { el.textContent = t(el.getAttribute('data-t')); });
    document.querySelectorAll('[data-t-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-t-html')); });
    document.querySelectorAll('[data-t-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-t-ph'))); });
    document.querySelectorAll('[data-t-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-t-aria'))); });
    document.querySelectorAll('[data-lang-switch]').forEach(function (b) {
      var on = b.getAttribute('data-lang-switch') === state.lang;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-active', on);
    });
    if (T[state.lang] && T[state.lang]['page.title']) { document.title = T[state.lang]['page.title']; }
    store('drstudio.lang', state.lang);
    if (state.onLang) { state.onLang(state.lang); }
  }

  function initPage(opts) {
    state.T = opts.T;
    state.onLang = opts.onLang || null;
    document.querySelectorAll('[data-email]').forEach(function (a) { a.setAttribute('href', 'mailto:' + EMAIL); });
    document.querySelectorAll('[data-email-text]').forEach(function (s) { s.textContent = EMAIL; });
    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-lang-switch],[data-menu-toggle],#mobile-menu a') : null;
      if (!el) { return; }
      if (el.hasAttribute('data-lang-switch')) { applyLang(el.getAttribute('data-lang-switch')); }
      else if (el.hasAttribute('data-menu-toggle')) {
        var menu = document.getElementById('mobile-menu');
        var open = menu.classList.toggle('hidden') === false;
        el.setAttribute('aria-expanded', open ? 'true' : 'false');
      } else {
        var m = document.getElementById('mobile-menu');
        if (m) { m.classList.add('hidden'); }
        var tg = document.querySelector('[data-menu-toggle]');
        if (tg) { tg.setAttribute('aria-expanded', 'false'); }
      }
    });
    var saved = store('drstudio.lang');
    var guess = (navigator.language || 'ko').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
    applyLang(saved === 'ko' || saved === 'en' ? saved : guess);
  }

  window.DRS = {
    ENDPOINT: ENDPOINT, EMAIL: EMAIL,
    esc: esc, store: store, t: t, won: won, safeUrl: safeUrl, fmtTs: fmtTs, qs: qs,
    api: api, getJSON: getJSON, initPage: initPage, applyLang: applyLang,
    lang: function () { return state.lang; }
  };
}());
