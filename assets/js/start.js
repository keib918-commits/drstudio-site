/* Dr.Studio conversion landing (/start/?i=<industry>&src=<campaign>).
   Industry copy: assets/data/industries.json. Prices: assets/data/pricing.json. Work thumbnails: assets/js/work-data.js. */
(function () {
  'use strict';

  var T = {
    ko: {
      'page.title': 'Dr.Studio — 제품 광고 영상, AI로 빠르게',
      'cta.request': '의뢰서 작성하기',
      'hero.fast': '2~3일 안에, {p}부터',
      'offers.all': '전체 가격',
      'offers.vat': '부가세 별도 · 매체비(광고비)는 고객님 광고 계정에서 직접 결제하십니다.',
      'offer.a1.t': '숏폼 광고 1편', 'offer.a1.d': '15~30초 세로 광고. 릴스·쇼츠·틱톡에 바로 쓰실 수 있습니다.',
      'offer.a1.p': '실사형 {live} · 삽화형 {ill}',
      'offer.c5.t': '2주 시험 캠페인', 'offer.c5.d': '2주 동안 광고를 시험 집행하고 결과를 정리해 드립니다.',
      'offer.b1.t': '채널 셋업', 'offer.b1.d': '브랜드 SNS 채널을 열고 첫 게시까지 준비해 드립니다.',
      'offer.b1.p': '채널당 {p}~',
      'offer.go': '이걸로 의뢰하기',
      'work.all': '전체 보기', 'work.title': 'AI로 만든 광고 영상',
      'steps.note': '결제는 계좌이체로 받고 세금계산서를 발행합니다. 제작물은 착수 후 통상 2~3일 안에 최종본을 완성합니다.',
      'faq1.q': '제품 사진만 있어도 만들 수 있나요?',
      'faq1.a': '네. 제품 사진과 로고만 있어도 제작할 수 있습니다. 실사형 영상에서 실제 제품 모양이 그대로 나와야 한다면 ‘제품 실물 반영’ 옵션으로 제품을 생성 요소로 등록합니다.',
      'faq2.q': '광고비(매체비)도 포함된 가격인가요?',
      'faq2.a': '아니요. 매체비는 고객님 광고 계정에서 직접 결제하시고, 저희는 제작·운영 비용만 받습니다. 모든 금액은 부가세 별도입니다.',
      'faq3.q': '무엇을 맡겨야 할지 아직 모르겠어요.',
      'faq3.a': '괜찮습니다. 의뢰서 맨 위의 AI 도우미에 제품과 상황을 편하게 적어 주시면 맞는 상품과 예상 비용을 추천해 드리고, 검토 후 견적서로 다시 안내드립니다.',
      'cta.title': '의뢰서를 남겨 주시면 검토 후 견적을 보내 드립니다.',
      'why.title': '같은 영상을 왜 더 싸게 드릴 수 있나',
      'why.lead': '싸게 만드는 게 아니라, 남들이 내는 비용을 저희는 내지 않습니다. 그 차이를 가격에서 뺐습니다.',
      'why.not': '대신 하지 않는 것도 분명합니다: 실사 촬영과 무제한 수정은 하지 않습니다. 수정은 1회가 포함됩니다.',
      'why.t1': '플랫폼 수수료 0원', 'why.d1': '크몽 같은 중개 플랫폼은 거래액의 20~25%를 수수료로 가져갑니다. 저희는 직접 거래하므로 그 몫이 가격에 없습니다.',
      'why.t2': '다시 쓰는 제작 자산', 'why.d2': '광고 22편을 만들며 쌓은 인물·세트·목소리·연출 틀을 다음 영상에 다시 씁니다. 기획과 생성 시간이 절반으로 줄어 그만큼 쌉니다.',
      'why.t3': '촬영·세트·배우·장소 비용 0원', 'why.d3': '장면과 인물, 목소리를 AI로 만듭니다. 촬영 하루에 드는 인건비와 대관료가 처음부터 없습니다.',
      'why.t4': '영업·관리 인력 없는 공정', 'why.d4': '의뢰서의 AI 도우미가 상담을 대신하고, 진행 현황 페이지가 보고를 대신합니다. 포맷을 세 가지로 표준화해 사람 손이 가는 시간을 줄였습니다.',
      'why.t5': '광고주로 직접 써 본 공정', 'why.d5': '저희 서비스 광고를 저희가 만들어 직접 집행하며 다듬은 공정입니다. 제작과 집행을 한 손에서 하니 소재 판정이 빠르고, 선불·계좌이체라 카드 수수료와 미수 비용도 없습니다.'
    },
    en: {
      'page.title': 'Dr.Studio — Product ads, made fast with AI',
      'cta.request': 'Fill in the request form',
      'hero.fast': 'In 2–3 days, from {p}',
      'offers.all': 'All prices',
      'offers.vat': 'VAT excluded · Media spend is paid directly from your own ad account.',
      'offer.a1.t': 'Short-form ad', 'offer.a1.d': 'A 15–30 second vertical ad, ready for Reels, Shorts and TikTok.',
      'offer.a1.p': 'Live-action look {live} · Illustrated {ill}',
      'offer.c5.t': '2-week test campaign', 'offer.c5.d': 'We run your ads for two weeks and summarize the results.',
      'offer.b1.t': 'Channel setup', 'offer.b1.d': 'We open your brand’s social channel and prepare the first posts.',
      'offer.b1.p': '{p}+ per channel',
      'offer.go': 'Request this',
      'work.all': 'See all', 'work.title': 'Ads made with AI',
      'steps.note': 'We take bank transfers and issue a tax invoice. Videos are usually final within 2–3 days of kick-off.',
      'faq1.q': 'Can you work from product photos only?',
      'faq1.a': 'Yes. Product photos and a logo are enough. If a live-action-look video must show your actual product exactly, the “real product in frame” option registers it as a generation element.',
      'faq2.q': 'Is media spend included?',
      'faq2.a': 'No. Media spend is paid directly from your own ad account; we only charge for production and management. All prices exclude VAT.',
      'faq3.q': 'I am not sure what to ask for yet.',
      'faq3.a': 'That is fine. Describe your product and situation to the AI helper at the top of the request form. It suggests services and an estimated cost, and we follow up with a written quote.',
      'cta.title': 'Send us a request and we will reply with a quote.',
      'why.title': 'Why the same video costs less here',
      'why.lead': 'We are not cutting corners. We simply do not pay the costs others pass on to you, and we took that difference out of the price.',
      'why.not': 'We are equally clear about what we do not do: no live-action shoots and no unlimited revisions. One round of revisions is included.',
      'why.t1': 'No platform commission', 'why.d1': 'Marketplaces such as Kmong take 20–25% of every order. We work with you directly, so that share is not in the price.',
      'why.t2': 'Production assets we reuse', 'why.d2': 'Characters, sets, voices and story templates built over 22 ads are reused on the next one. Planning and generation take half the time, and the price follows.',
      'why.t3': 'No shoot, set, cast or location costs', 'why.d3': 'Scenes, people and voices are generated with AI. A shooting day’s crew and venue fees never existed.',
      'why.t4': 'No sales or account staff', 'why.d4': 'The AI helper in the request form replaces the consultation call and the status page replaces the reporting. Three standard formats keep hands-on time low.',
      'why.t5': 'A process we run as advertisers ourselves', 'why.d5': 'We built it by making and running ads for our own services. Production and media run under one roof, so creative decisions are fast, and prepaid bank transfers mean no card fees or bad debt.'
    }
  };

  // Six varied pieces from the portfolio (ids from work-data.js); falls back to the first six.
  var WORK_IDS = ['40W-KR-EP7', 'SOGD-02', 'SW-AD03', '40W-EP6-EN', 'SOGD-04', '40W-KR-EP6'];

  var PRICING = null, IND = null;
  var industry = '', src = '';
  var esc = function (s) { return window.DRS.esc(s); };

  function manwon(n) {
    var lang = window.DRS.lang();
    if (n === null || n === undefined) { return ''; }
    if (lang === 'en') { return 'KRW ' + Number(n).toLocaleString('en-US'); }
    return (n % 10000 === 0 ? (n / 10000).toLocaleString('ko-KR') + '만 원' : Number(n).toLocaleString('ko-KR') + '원');
  }
  function item(code) {
    if (!PRICING) { return null; }
    for (var i = 0; i < PRICING.items.length; i++) { if (PRICING.items[i].code === code) { return PRICING.items[i]; } }
    return null;
  }
  function requestHref(extra) {
    var p = [];
    if (industry) { p.push('i=' + encodeURIComponent(industry)); }
    if (src) { p.push('src=' + encodeURIComponent(src)); }
    if (extra) { p.push(extra); }
    return '../request/' + (p.length ? '?' + p.join('&') : '');
  }

  function renderIndustry(lang) {
    var d = IND && (IND[industry] || IND['default']);
    if (!d) { return; }
    var name = d['name_' + lang];
    document.getElementById('ind-name').textContent = name || 'Creative AI Production';
    document.getElementById('ind-headline').textContent = d['headline_' + lang];
    document.getElementById('ind-sub').textContent = d['sub_' + lang];
    document.getElementById('ind-example').textContent = d['example_' + lang] || '';
  }

  function renderOffers(lang) {
    var a1 = item('A-1'), c5 = item('C-5'), b1 = item('B-1');
    var fast = document.getElementById('hero-fast');
    if (a1) { fast.textContent = T[lang]['hero.fast'].replace('{p}', manwon(a1.illustration || a1.live)); fast.classList.remove('invisible'); }
    else if (PRICING === null && IND !== null) { fast.classList.add('invisible'); }   // catalog failed to load
    var cards = [];
    if (a1) { cards.push({ code: 'A-1', t: 'offer.a1.t', d: 'offer.a1.d', price: T[lang]['offer.a1.p'].replace('{live}', manwon(a1.live)).replace('{ill}', manwon(a1.illustration)), q: 'p=A-1&style=live' }); }
    if (c5) { cards.push({ code: 'C-5', t: 'offer.c5.t', d: 'offer.c5.d', price: manwon(c5.price), q: 'p=C-5' }); }
    if (b1) { cards.push({ code: 'B-1', t: 'offer.b1.t', d: 'offer.b1.d', price: T[lang]['offer.b1.p'].replace('{p}', manwon(b1.price)), q: 'p=B-1' }); }
    document.getElementById('offers').innerHTML = cards.map(function (c, i) {
      return '<a class="group flex flex-col gap-2 p-5 bg-surface-container-lowest border border-primary/10 hover:border-secondary rounded-sm transition-colors' + (i === 0 ? ' border-l-2 border-l-emerald' : '') + '" href="' + esc(requestHref(c.q)) + '">' +
        '<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">' + esc(c.code) + '</span>' +
        '<span class="font-serif text-xl text-primary-container leading-snug break-keep">' + esc(T[lang][c.t]) + '</span>' +
        '<span class="font-sans text-sm text-on-surface-variant leading-relaxed break-keep">' + esc(T[lang][c.d]) + '</span>' +
        '<span class="font-sans text-[0.9375rem] font-semibold text-primary pt-1 break-keep">' + esc(c.price) + '</span>' +
        '<span class="mt-auto pt-2 font-label-sm text-label-sm uppercase tracking-widest text-primary-container/70 group-hover:text-secondary">' + esc(T[lang]['offer.go']) + ' ↗</span>' +
      '</a>';
    }).join('');
  }

  function renderWork() {
    var all = window.DRSTUDIO_WORK || [];
    var pick = WORK_IDS.map(function (id) { return all.filter(function (w) { return w.id === id; })[0]; }).filter(Boolean);
    if (pick.length < 6) { pick = all.slice(0, 6); }
    document.getElementById('work-strip').innerHTML = pick.map(function (w) {
      return '<a class="group relative shrink-0 w-[7.5rem] md:w-[10rem] snap-start" href="https://www.youtube.com/shorts/' + encodeURIComponent(w.yt) + '" target="_blank" rel="noopener" aria-label="' + esc(w.client + ' — ' + w.title + ' (YouTube)') + '">' +
        '<span class="relative block aspect-[9/16] overflow-hidden rounded-sm bg-primary shadow-lg">' +
          '<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="../' + esc(w.thumb) + '" alt="" width="540" height="960" loading="lazy" decoding="async">' +
          '<span class="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></span>' +
          '<span class="absolute bottom-2 left-2 right-2">' +
            '<span class="block font-label-sm text-label-sm uppercase tracking-widest text-emerald-hl truncate">' + esc(w.client) + '</span>' +
            '<span class="block font-serif text-sm leading-tight text-paper">' + esc(w.title) + '</span>' +
          '</span>' +
        '</span></a>';
    }).join('');
  }

  function renderSteps(lang) {
    if (!PRICING) { return; }
    document.getElementById('steps').innerHTML = PRICING.process.map(function (p, i) {
      return (i ? '<li class="text-secondary" aria-hidden="true">→</li>' : '') +
        '<li class="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-sm"><span class="font-label-sm text-label-sm text-secondary">0' + (i + 1) + '</span><span class="break-keep">' + esc(p[lang] || p.ko) + '</span></li>';
    }).join('');
  }

  function renderAll(lang) {
    renderIndustry(lang);
    renderOffers(lang);
    renderSteps(lang);
    document.querySelectorAll('[data-cta]').forEach(function (a) { a.setAttribute('href', requestHref('')); });
  }

  function init() {
    var i = window.DRS.qs('i').toLowerCase();
    src = window.DRS.qs('src').replace(/[^A-Za-z0-9_.\-]/g, '').slice(0, 64);
    var body = document.body;
    renderWork();
    var lang0 = null;
    window.DRS.initPage({ T: T, onLang: function (lang) { lang0 = lang; renderAll(lang); } });
    Promise.all([
      window.DRS.getJSON(body.getAttribute('data-industries') || '../assets/data/industries.json').catch(function () { return null; }),
      window.DRS.getJSON(body.getAttribute('data-pricing') || '../assets/data/pricing.json').catch(function () { return null; })
    ]).then(function (r) {
      IND = r[0]; PRICING = r[1];
      industry = IND && i && IND[i] && i !== 'default' ? i : '';
      renderAll(lang0 || window.DRS.lang());
    });
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
}());
