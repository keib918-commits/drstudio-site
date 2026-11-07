/* Dr.Studio pricing page: renders assets/data/pricing.json (single source of truth for prices). */
(function () {
  'use strict';

  var T = {
    ko: {
      'page.title': '가격 안내 — Dr.Studio',
      'hero.title': '가격 안내',
      'hero.sub': '기본 가격입니다. 최종 금액은 의뢰서를 검토한 뒤 견적서로 안내드립니다.',
      'loading': '가격표를 불러오는 중입니다…',
      'load.err': '가격표를 불러오지 못했습니다. 잠시 후 다시 열어 주시거나 메일로 문의해 주세요.',
      'rules.title': '꼭 알아 두실 점',
      'pay.label': 'PAYMENT · 결제',
      'process.title': '진행 순서',
      'cta.request': '의뢰서 작성하기',
      'cta.title': '무엇이 필요한지 정하지 않으셔도 됩니다.',
      'cta.sub': '의뢰서의 AI 도우미에 제품과 상황을 편하게 적어 주시면 맞는 상품과 예상 비용을 추천해 드립니다.',
      'col.item': '상품', 'col.price': '가격', 'col.unit': '단위',
      'vat': '부가세 별도', 'from': '{p}부터', 'na': '—',
      'per': '/ ', 'pick': '이 상품으로 의뢰하기',
      'style.title': '두 가지 스타일 중에서 고르실 수 있습니다.'
    },
    en: {
      'page.title': 'Pricing — Dr.Studio',
      'hero.title': 'Pricing',
      'hero.sub': 'These are our base prices. After reviewing your request we confirm the final amount in a written quote.',
      'loading': 'Loading prices…',
      'load.err': 'Could not load the price list. Please reload in a moment or email us.',
      'rules.title': 'Good to know',
      'pay.label': 'PAYMENT',
      'process.title': 'How it works',
      'cta.request': 'Fill in the request form',
      'cta.title': 'You do not need to know exactly what you need.',
      'cta.sub': 'Describe your product and situation to the AI helper in the request form, and it will suggest services and an estimated cost.',
      'col.item': 'Service', 'col.price': 'Price', 'col.unit': 'Unit',
      'vat': 'VAT excluded', 'from': 'from {p}', 'na': '—',
      'per': '/ ', 'pick': 'Request this',
      'style.title': 'Choose between two styles.'
    }
  };

  var DATA = null, failed = false;
  var esc = function (s) { return window.DRS.esc(s); };
  function L(o, k) { var lang = window.DRS.lang(); return o[k + '_' + lang] !== undefined ? o[k + '_' + lang] : (o[k + '_ko'] || ''); }
  function N(o) { return o[window.DRS.lang()] || o.ko; }

  function priceText(it, styleKey) {
    var lang = window.DRS.lang();
    if (styleKey) {
      var v = it[styleKey];
      return v === null || v === undefined ? T[lang].na : window.DRS.won(v);
    }
    if (it['price_text_' + lang]) { return it['price_text_' + lang]; }
    return window.DRS.won(it.price);
  }

  function nameCell(it) {
    var spec = L(it, 'spec');
    var note = L(it, 'note');
    return '<div class="min-w-0 space-y-1">' +
      '<div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">' +
        '<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">' + esc(it.code) + '</span>' +
        '<h3 class="font-serif text-xl text-primary-container leading-snug break-keep">' + esc(N(it)) + '</h3>' +
        (spec ? '<span class="font-sans text-xs text-on-surface-variant">' + esc(spec) + '</span>' : '') +
      '</div>' +
      '<p class="font-sans text-sm text-on-surface-variant leading-relaxed break-keep">' + esc(L(it, 'desc')) + '</p>' +
      (note ? '<p class="font-sans text-xs text-secondary">' + esc(note) + '</p>' : '') +
      '<a class="inline-flex items-center gap-1 font-label-sm text-label-sm uppercase tracking-widest text-primary-container/70 hover:text-secondary border-b border-primary-container/20 hover:border-secondary pb-0.5 transition-colors" href="../request/?p=' + encodeURIComponent(it.code) + '">' +
        esc(T[window.DRS.lang()].pick) + ' <span aria-hidden="true">↗</span></a>' +
    '</div>';
  }

  function priceCell(label, text, strong) {
    return '<div class="flex md:block items-baseline justify-between gap-3 md:text-right">' +
      '<span class="md:hidden font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">' + esc(label) + '</span>' +
      '<span class="font-sans text-sm ' + (strong ? 'font-semibold text-primary' : 'text-primary') + ' break-keep">' + esc(text) + '</span>' +
    '</div>';
  }

  function sectionA(type, items) {
    var lang = window.DRS.lang(), st = DATA.styles;
    var head = '<div class="hidden md:grid md:grid-cols-12 gap-4 pb-2 border-b border-primary/15 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">' +
      '<span class="md:col-span-6">' + esc(T[lang]['col.item']) + '</span>' +
      '<span class="md:col-span-2 text-right">' + esc(N(st.illustration)) + '</span>' +
      '<span class="md:col-span-2 text-right">' + esc(N(st.live)) + '</span>' +
      '<span class="md:col-span-2 text-right">' + esc(T[lang]['col.unit']) + '</span></div>';
    var rows = items.map(function (it) {
      return '<div class="py-5 border-b border-primary/10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start">' +
        '<div class="md:col-span-6">' + nameCell(it) + '</div>' +
        '<div class="md:col-span-2">' + priceCell(N(st.illustration), priceText(it, 'illustration'), true) + '</div>' +
        '<div class="md:col-span-2">' + priceCell(N(st.live), priceText(it, 'live'), true) + '</div>' +
        '<div class="md:col-span-2">' + priceCell(T[lang]['col.unit'], L(it, 'unit'), false) + '</div>' +
      '</div>';
    }).join('');
    var legend = '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' + ['illustration', 'live'].map(function (k) {
      return '<div class="p-4 bg-surface-container-low rounded-sm border-l-2 border-emerald space-y-1">' +
        '<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">' + esc(N(st[k])) + '</span>' +
        '<p class="font-sans text-sm text-on-surface-variant break-keep">' + esc(L(st[k], 'desc')) + '</p></div>';
    }).join('') + '</div>';
    return legend + '<div>' + head + rows + '</div>';
  }

  function sectionBC(type, items) {
    var lang = window.DRS.lang();
    var head = '<div class="hidden md:grid md:grid-cols-12 gap-4 pb-2 border-b border-primary/15 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">' +
      '<span class="md:col-span-7">' + esc(T[lang]['col.item']) + '</span>' +
      '<span class="md:col-span-3 text-right">' + esc(T[lang]['col.price']) + '</span>' +
      '<span class="md:col-span-2 text-right">' + esc(T[lang]['col.unit']) + '</span></div>';
    var rows = items.map(function (it) {
      return '<div class="py-5 border-b border-primary/10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start">' +
        '<div class="md:col-span-7">' + nameCell(it) + '</div>' +
        '<div class="md:col-span-3">' + priceCell(T[lang]['col.price'], priceText(it), true) + '</div>' +
        '<div class="md:col-span-2">' + priceCell(T[lang]['col.unit'], L(it, 'unit'), false) + '</div>' +
      '</div>';
    }).join('');
    return '<div>' + head + rows + '</div>';
  }

  function render() {
    var host = document.getElementById('price-sections');
    var lang = window.DRS.lang();
    if (failed) { host.innerHTML = '<p class="font-sans text-sm text-error">' + esc(T[lang]['load.err']) + '</p>'; return; }
    if (!DATA) { return; }
    var html = ['A', 'B', 'C'].map(function (type) {
      var ty = DATA.types[type];
      var items = DATA.items.filter(function (i) { return i.type === type; });
      return '<section class="space-y-6 scroll-mt-24" id="type-' + type + '">' +
        '<div class="border-b border-primary/10 pb-4 flex flex-wrap items-end justify-between gap-3">' +
          '<div><span class="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-semibold">' + type + ' // ' + esc(ty.label) + '</span>' +
          '<h2 class="font-headline-md text-headline-md text-primary-container mt-1 break-keep">' + esc(N(ty)) + '</h2>' +
          '<p class="font-sans text-sm text-on-surface-variant mt-1 break-keep">' + esc(L(ty, 'line')) + '</p></div>' +
          '<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">' + esc(T[lang].vat) + '</span>' +
        '</div>' +
        (type === 'A' ? sectionA(type, items) : sectionBC(type, items)) +
      '</section>';
    }).join('');
    host.innerHTML = html;

    document.getElementById('type-jump').innerHTML = ['A', 'B', 'C'].map(function (type) {
      var ty = DATA.types[type];
      return '<a class="inline-flex items-center gap-2 px-3 py-1.5 border border-paper/25 rounded-sm font-sans text-sm text-paper/85 hover:border-emerald-hl hover:text-emerald-hl transition-colors" href="#type-' + type + '">' +
        '<span class="font-label-sm text-label-sm tracking-widest text-emerald-hl">' + type + '</span>' + esc(N(ty)) +
        '<span class="text-paper/50 text-xs">' + esc(T[lang].from.replace('{p}', window.DRS.won(ty.from))) + '</span></a>';
    }).join('');

    document.getElementById('rules').innerHTML = DATA.rules.map(function (r) {
      return '<li class="flex gap-2.5"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-emerald shrink-0" aria-hidden="true"></span><span>' + esc(N(r)) + '</span></li>';
    }).join('');
    document.getElementById('payment-note').textContent = N(DATA.payment);

    document.getElementById('process').innerHTML = DATA.process.map(function (p, i) {
      return '<li class="p-4 bg-paper rounded-sm space-y-1.5 border-t-2 ' + (i === 0 ? 'border-emerald' : 'border-primary/15') + '">' +
        '<span class="font-label-sm text-label-sm tracking-[0.25em] text-secondary">STEP 0' + (i + 1) + '</span>' +
        '<h3 class="font-serif text-xl text-primary-container break-keep">' + esc(N(p)) + '</h3>' +
        '<p class="font-sans text-xs text-on-surface-variant leading-relaxed break-keep">' + esc(L(p, 'desc')) + '</p></li>';
    }).join('');
  }

  function init() {
    window.DRS.initPage({ T: T, onLang: render });
    var path = document.body.getAttribute('data-pricing') || '../assets/data/pricing.json';
    window.DRS.getJSON(path).then(function (d) { DATA = d; render(); })
      .catch(function () { failed = true; render(); });
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
}());
