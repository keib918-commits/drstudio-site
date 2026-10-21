/* Dr.Studio site behaviour: KO/EN switch, portfolio grid + filters, video dialog, email links, mobile menu. */
(function () {
  'use strict';

  // Contact address: change here only.
  var EMAIL_USER = 'contact';
  var EMAIL_DOMAIN = 'drstudio.site';
  var YT_CHANNEL = 'https://www.youtube.com/@Creative.AI.Production';

  var I18N = {
    ko: {
      'nav.about': '소개', 'nav.why': '강점', 'nav.work': '작업', 'nav.contact': '문의',
      'hero.title': '고객의 니즈에 맞는 광고 영상,<br><em>AI로 만듭니다.</em>',
      'hero.sub': 'Ads made for your brand, with AI.',
      'hero.side': '브랜드를 먼저 읽고 이야기를 설계합니다. 장면과 인물, 목소리는 AI로 만듭니다.',
      'hero.cta': '작업 보기',
      'about.label': '01 / 소개',
      'about.title': '브리프를 받아<br>완성된 광고로 돌려드립니다.',
      'about.body': 'Dr.Studio는 AI로 고객의 니즈에 맞는 광고 영상을 만드는 회사입니다. 브랜드와 타깃을 먼저 읽고, 그에 맞는 이야기와 장면을 설계합니다.',
      'about.box': '광고 기획부터 AI 영상 제작, 언어별 현지화까지 한 팀에서 진행합니다.',
      'about.s1': '광고 영상', 'about.s2': '발주처', 'about.s3': '언어',
      'about.p1t': '브랜드 읽기', 'about.p1d': '브랜드와 타깃, 판매 채널을 먼저 확인하고 광고가 해야 할 일을 정합니다.',
      'about.p2t': '이야기 설계', 'about.p2d': '전할 메시지를 장면 단위로 나눠 대본과 구성을 짭니다.',
      'about.p3t': 'AI 제작과 현지화', 'about.p3d': '장면과 인물, 목소리를 AI로 만들고, 필요하면 언어별로 다시 만듭니다.',
      'why.label': '02 / 강점',
      'why.t1': '마케팅 전문가', 'why.t2': 'AI', 'why.t3': '크리에이티브한 콘텐츠', 'why.t4': '빠른 제작',
      'why.d1': '누구에게 무엇을 말할지, 어디에 집행할지 먼저 정합니다.',
      'why.d2': '장면과 인물, 목소리를 AI로 생성합니다.',
      'why.d3': '보는 사람이 멈춰 서는 이야기로 만듭니다.',
      'why.d4': '세트와 촬영 없이 만들어 일정이 짧습니다.',
      'why.proof': '광고 한 편을 8개 언어로 현지화했습니다.',
      'why.proofsub': '같은 이야기를 나라별 배우와 세트, 원어 대사로 다시 만들었습니다.',
      'work.label': '03 / 작업',
      'work.title': '지금까지 만든 광고',
      'work.f.all': '전체', 'work.f.40weeks': '40Weeks', 'work.f.loc': '8개 언어 현지화', 'work.f.sogd': 'SOGD', 'work.f.sowhat': 'So what?!',
      'work.more': '유튜브에서 더 보기',
      'work.note': 'Dr.Studio 유튜브 채널 · {n}편 · 19+ 영상은 유튜브에서 열립니다',
      'work.story': '이야기 ',
      'contact.label': '04 / 문의',
      'contact.title': '다음 광고,<br>함께 만들겠습니다.',
      'contact.sub': '프로젝트 문의는 메일로 보내 주세요.',
      'contact.boxlabel': '보내 주시면 좋은 것',
      'contact.box': '브랜드와 제품, 판매 국가, 원하는 영상 길이와 일정을 적어 주시면 검토 후 회신드립니다.',
      'contact.cta': '프로젝트 문의하기',
      'dialog.close': '닫기',
      'mail.subject': 'Dr.Studio 프로젝트 문의'
    },
    en: {
      'nav.about': 'About', 'nav.why': 'Why Us', 'nav.work': 'Work', 'nav.contact': 'Contact',
      'hero.title': 'Ads made for your brand,<br><em>with AI.</em>',
      'hero.sub': '고객의 니즈에 맞는 광고 영상을 AI로 만듭니다.',
      'hero.side': 'We read the brand first and design the story. Scenes, cast and voices are made with AI.',
      'hero.cta': 'See our work',
      'about.label': '01 / About',
      'about.title': 'We turn your brief<br>into a finished ad.',
      'about.body': 'Dr.Studio makes ad videos tailored to each client’s needs, with AI. We read your brand and your audience first, then design the story and the scenes that fit.',
      'about.box': 'From ad planning to AI video production and localization, one team handles it end to end.',
      'about.s1': 'Ads', 'about.s2': 'Clients', 'about.s3': 'Languages',
      'about.p1t': 'Brand reading', 'about.p1d': 'We check your brand, audience and sales channels first, and agree on what the ad has to do.',
      'about.p2t': 'Story design', 'about.p2d': 'We break the message into scenes and write the script and the structure.',
      'about.p3t': 'AI production & localization', 'about.p3d': 'Scenes, cast and voices are made with AI, then remade per language when needed.',
      'why.label': '02 / Why Us',
      'why.t1': 'Marketing experts', 'why.t2': 'AI', 'why.t3': 'Creative content', 'why.t4': 'Fast production',
      'why.d1': 'Who it speaks to, what it says and where it runs come first.',
      'why.d2': 'Scenes, cast and voices are generated with AI.',
      'why.d3': 'Stories people stop scrolling for.',
      'why.d4': 'No sets and no shoots, so turnaround stays short.',
      'why.proof': 'One ad, localized into 8 languages.',
      'why.proofsub': 'The same story, remade with a local cast, sets and native dialogue.',
      'work.label': '03 / Selected Work',
      'work.title': 'Ads we have made',
      'work.f.all': 'All', 'work.f.40weeks': '40Weeks', 'work.f.loc': 'One ad · 8 languages', 'work.f.sogd': 'SOGD', 'work.f.sowhat': 'So what?!',
      'work.more': 'More on YouTube',
      'work.note': 'Dr.Studio on YouTube · {n} ads · 19+ videos open on YouTube',
      'work.story': 'Story ',
      'contact.label': '04 / Contact',
      'contact.title': 'Let’s make<br>your next ad.',
      'contact.sub': 'Send us your project by email.',
      'contact.boxlabel': 'What to send',
      'contact.box': 'Tell us your brand and product, target markets, preferred length and timeline. We review it and reply.',
      'contact.cta': 'Start a project',
      'dialog.close': 'Close',
      'mail.subject': 'Dr.Studio project inquiry'
    }
  };

  var PLAY = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var lang = 'ko';
  var filter = 'all';
  var DATA = window.DRSTUDIO_WORK || [];

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function store(key, val) {
    try {
      if (val === undefined) { return window.localStorage.getItem(key); }
      window.localStorage.setItem(key, val);
    } catch (e) { /* storage unavailable: ignore */ }
    return null;
  }
  function t(key) { var d = I18N[lang]; return d[key] !== undefined ? d[key] : I18N.ko[key]; }

  // ---------- Portfolio ----------
  function inFilter(item) {
    if (filter === 'all') { return true; }
    if (filter === 'loc') { return item.group === '40weeks-localized'; }
    return item.group === filter;
  }

  function cardHTML(item) {
    var tag = lang === 'ko' ? item.lang_ko : item.lang_en;
    if (item.story) { tag += ' · ' + t('work.story') + item.story; }
    var cat = lang === 'ko' ? item.cat_ko : item.cat_en;
    var corner = item.age18
      ? '<span class="shrink-0 font-label-sm text-label-sm font-semibold tracking-wider text-error bg-error-container/90 px-2 py-0.5">19+</span>'
      : '<span class="shrink-0 font-label-sm text-label-sm text-paper/80 bg-primary/50 backdrop-blur-sm px-1.5 py-0.5">' + esc(item.dur) + '</span>';
    var inner =
      '<span class="relative block aspect-[9/16] overflow-hidden rounded-sm bg-primary/80 shadow-lg">' +
        '<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="' + esc(item.thumb) + '" alt="" width="540" height="960" loading="lazy" decoding="async">' +
        '<span class="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/30 pointer-events-none"></span>' +
        '<span class="absolute top-2 left-2 right-2 md:top-3 md:left-3 md:right-3 flex items-start justify-between gap-2">' +
          '<span class="min-w-0 truncate font-label-sm text-label-sm uppercase tracking-widest text-paper bg-primary/60 backdrop-blur-sm px-2 py-0.5">' + esc(tag) + '</span>' + corner +
        '</span>' +
        '<span class="absolute inset-0 flex items-center justify-center"><span class="play-btn">' + PLAY + '</span></span>' +
        '<span class="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3 text-left">' +
          '<span class="block font-label-sm text-label-sm uppercase tracking-widest text-emerald-hl mb-0.5">' + esc(item.client) + '</span>' +
          '<span class="block font-serif text-lg md:text-headline-sm leading-tight md:leading-tight text-paper">' + esc(item.title) + '</span>' +
        '</span>' +
      '</span>' +
      '<span class="pt-2 flex items-center justify-between gap-2 font-label-sm text-label-sm uppercase tracking-widest text-paper/60"><span class="truncate">' + esc(cat) + '</span><span>2026</span></span>';
    var label = esc(item.client + ' — ' + item.title + ' (' + item.lang_en + ')');
    if (item.age18) {
      return '<a class="work-card group relative flex flex-col" href="https://www.youtube.com/shorts/' + esc(item.yt) + '" target="_blank" rel="noopener" aria-label="' + label + ', YouTube, 19+">' + inner + '</a>';
    }
    return '<button class="work-card group relative flex flex-col text-left" type="button" data-yt="' + esc(item.yt) + '" aria-label="' + label + '">' + inner + '</button>';
  }

  function renderWork() {
    var grid = document.getElementById('work-grid');
    if (grid) { grid.innerHTML = DATA.filter(inFilter).map(cardHTML).join(''); }
    document.querySelectorAll('[data-filter]').forEach(function (b) {
      var on = b.getAttribute('data-filter') === filter;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-active', on);
    });
    var note = document.querySelector('[data-work-note]');
    if (note) { note.textContent = t('work.note').replace('{n}', String(DATA.length)); }
  }

  function renderStats() {
    var clients = {}, langs = {};
    DATA.forEach(function (d) { clients[d.client] = 1; langs[d.lang_en] = 1; });
    var vals = { ads: DATA.length, clients: Object.keys(clients).length, langs: Object.keys(langs).length };
    document.querySelectorAll('[data-stat]').forEach(function (el) {
      var v = vals[el.getAttribute('data-stat')];
      if (v) { el.textContent = String(v); }
    });
  }

  // ---------- Language ----------
  function applyLang(next) {
    lang = I18N[next] ? next : 'ko';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = I18N[lang][el.getAttribute('data-i18n')];
      if (v !== undefined) { el.textContent = v; }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var v = I18N[lang][el.getAttribute('data-i18n-html')];
      if (v !== undefined) { el.innerHTML = v; }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var v = I18N[lang][el.getAttribute('data-i18n-aria')];
      if (v !== undefined) { el.setAttribute('aria-label', v); }
    });
    document.querySelectorAll('[data-lang-switch]').forEach(function (b) {
      var on = b.getAttribute('data-lang-switch') === lang;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-active', on);
    });
    wireEmail();
    renderWork();
    store('drstudio.lang', lang);
  }

  // ---------- Email / links ----------
  function wireEmail() {
    var addr = EMAIL_USER + '@' + EMAIL_DOMAIN;
    var href = 'mailto:' + addr + '?subject=' + encodeURIComponent(t('mail.subject'));
    document.querySelectorAll('[data-email]').forEach(function (a) { a.setAttribute('href', href); });
    document.querySelectorAll('[data-email-text]').forEach(function (s) { s.textContent = addr; });
    document.querySelectorAll('[data-youtube]').forEach(function (a) { a.setAttribute('href', YT_CHANNEL); });
  }

  // ---------- Video dialog ----------
  var dialog = null, frame = null, lastFocus = null;
  function openVideo(id) {
    if (!dialog || !frame) { window.open('https://www.youtube.com/shorts/' + id, '_blank', 'noopener'); return; }
    lastFocus = document.activeElement;
    frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1';
    if (typeof dialog.showModal === 'function') { dialog.showModal(); } else { dialog.setAttribute('open', ''); }
  }
  function closeVideo() {
    if (!dialog) { return; }
    if (frame) { frame.src = 'about:blank'; }
    if (typeof dialog.close === 'function' && dialog.open) { dialog.close(); } else { dialog.removeAttribute('open'); }
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
  }

  function init() {
    dialog = document.getElementById('video-dialog');
    frame = dialog ? dialog.querySelector('iframe') : null;
    if (dialog) {
      dialog.addEventListener('cancel', function (e) { e.preventDefault(); closeVideo(); });
      dialog.addEventListener('click', function (e) { if (e.target === dialog) { closeVideo(); } });
    }

    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-yt],[data-filter],[data-lang-switch],[data-dialog-close],[data-menu-toggle],#mobile-menu a') : null;
      if (!el) { return; }
      if (el.hasAttribute('data-yt')) { e.preventDefault(); openVideo(el.getAttribute('data-yt')); }
      else if (el.hasAttribute('data-filter')) { filter = el.getAttribute('data-filter'); renderWork(); }
      else if (el.hasAttribute('data-lang-switch')) { applyLang(el.getAttribute('data-lang-switch')); }
      else if (el.hasAttribute('data-dialog-close')) { closeVideo(); }
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

    renderStats();
    var saved = store('drstudio.lang');
    var guess = (navigator.language || 'ko').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
    applyLang(saved === 'ko' || saved === 'en' ? saved : guess);
    var y = document.getElementById('year');
    if (y) { y.textContent = String(new Date().getFullYear()); }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
}());
