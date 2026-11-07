/* Dr.Studio ad production request form: renders the bilingual form from one schema (plus a service picker built from
   assets/data/pricing.json and an AI helper), validates, and submits to the Google Apps Script web app (DRS.ENDPOINT in
   common.js). The response {ok,id,token} links the customer to /cs/. Without an endpoint it falls back to an email draft. */
(function () {
  'use strict';

  var ENDPOINT = (window.DRS && window.DRS.ENDPOINT) || '';
  var EMAIL = 'contact' + '@' + 'drstudio.site';

  var T = {
    ko: {
      'hero.title': '광고 제작 의뢰서',
      'hero.sub': '필수 항목만 채워도 접수됩니다. 검토 후 견적서를 이메일로 보내 드립니다.',
      'side.label': 'PROCESS · 진행 순서', 'side.title': '진행 순서',
      's1.t': '의뢰서', 's1.d': '제품과 목표를 남겨 주세요.',
      's2.t': '견적', 's2.d': '검토 후 견적서를 보내 드립니다.',
      's3.t': '계약서 서명', 's3.d': '견적을 수락하시면 계약서를 보내 드립니다.',
      's4.t': '입금', 's4.d': '계좌이체로 입금해 주세요.',
      's5.t': '착수', 's5.d': '입금을 확인하면 바로 시작합니다. 영상은 통상 2~3일 안에 최종본을 완성합니다.', 's5.badge': '2~3일',
      'side.pay': '결제: 계좌이체 + 세금계산서',
      'side.pricing': '가격 안내 보기',
      'side.urgent': '급한 문의는 메일로 보내 주세요.',
      'consent.label': '[필수] 개인정보 수집·이용에 동의합니다.',
      'consent.items': '수집 항목: 회사·브랜드명, 담당자 이름, 이메일, 연락처(선택)',
      'consent.purpose': '이용 목적: 광고 제작 상담, 견적 회신과 진행 안내',
      'consent.keep': '보유 기간: 상담 종료 후 1년 보관 뒤 파기하며, 요청하면 바로 파기합니다.',
      'consent.where': '접수 내용은 Dr.Studio(닥터서울)의 Google 스프레드시트와 메일로 관리합니다.',
      'consent.refuse': '동의하지 않을 수 있으며, 동의하지 않으면 의뢰서를 접수할 수 없습니다.',
      'submit': '의뢰서 보내기', 'sending': '보내는 중…',
      'err.required': '표시된 필수 항목을 확인해 주세요.',
      'err.send': '전송하지 못했습니다. 잠시 후 다시 시도하거나 메일로 보내 주세요.',
      'ok.label': 'RECEIVED', 'ok.title': '의뢰서가 접수되었습니다.',
      'ok.body': '보내 주신 내용을 검토한 뒤 입력하신 이메일로 회신드립니다.',
      'ok.bodyId': '입력하신 이메일로 접수 확인 메일을 보내 드렸습니다. 진행 현황 페이지에서 견적 확인과 문의를 하실 수 있습니다.',
      'ok.unsure': '보내 주신 내용을 검토한 뒤 입력하신 이메일로 회신드립니다. 접수 확인 메일이 오지 않으면 메일로 알려 주세요.',
      'ok.id': '접수 번호', 'ok.cs': '진행 현황 보기',
      'ok.again': '다른 의뢰서 작성하기',
      'mail.opened': '메일 앱에 의뢰서 내용이 채워졌습니다. 메일을 보내면 접수가 완료됩니다.',
      'select': '선택해 주세요', 'multi': '여러 개 선택 가능',
      // service picker
      'svc.label': 'SERVICE', 'svc.title': '무엇이 필요하세요?',
      'svc.sub': '필요한 상품을 골라 주세요. 잘 모르시면 비워 두셔도 됩니다. 금액은 부가세 별도 기본 가격입니다.',
      'svc.from': '{p}부터', 'svc.style': '스타일', 'svc.picked': '{n}개 선택',
      'svc.loading': '상품 목록을 불러오는 중입니다…',
      'svc.err': '상품 목록을 불러오지 못했습니다. 아래 항목만 작성해 주셔도 접수됩니다.',
      'svc.pricing': '가격 자세히 보기',
      'svc.liveOnly': '실사형 전용',
      // AI helper
      'ai.label': 'AI HELPER', 'ai.title': '막막하신가요?',
      'ai.sub': '제품과 상황을 편하게 적어 주시면 AI가 맞는 상품과 광고 방향, 예상 비용을 추천해 드립니다. 추천은 참고용이며 최종 견적은 담당자가 드립니다.',
      'ai.ph': '제품·상황을 편하게 적어 주세요. 예: 미용실에 납품하는 염색약을 만드는 회사인데, 원장님들께 보여 줄 짧은 영상이 필요해요.',
      'ai.btn': 'AI에게 추천받기', 'ai.loading': '추천을 만드는 중입니다… (최대 30초)',
      'ai.need': '제품 이름이나 상황을 한 줄이라도 적어 주세요.',
      'ai.limit': '오늘은 AI 추천 이용이 많아 잠시 쉬고 있습니다. 아래 의뢰서를 그대로 작성해 주시면 담당자가 직접 검토해 드립니다.',
      'ai.timeout': '응답이 늦어지고 있습니다. 잠시 후 다시 시도하시거나 아래 의뢰서를 바로 작성해 주세요.',
      'ai.err': 'AI 추천을 불러오지 못했습니다. 아래 의뢰서를 그대로 작성해 주셔도 됩니다.',
      'ai.result': 'AI 추천', 'ai.estimate': '예상 비용',
      'ai.products': '추천 상품', 'ai.style': '스타일', 'ai.goal': '광고 목적', 'ai.audience': '타깃 고객', 'ai.channels': '집행 채널',
      'ai.ratio': '화면 비율', 'ai.length': '영상 길이', 'ai.count': '제작 편수', 'ai.message': '핵심 메시지',
      'ai.fill': '추천대로 채우기', 'ai.filled': '비어 있던 항목을 추천대로 채웠습니다. 확인하시고 필요하면 고쳐 주세요.',
      'ai.summaryEst': '예상 비용: '
    },
    en: {
      'hero.title': 'Request an ad',
      'hero.sub': 'Fill in the required fields and send. We review every request and email you a quote.',
      'side.label': 'PROCESS', 'side.title': 'How it works',
      's1.t': 'Request', 's1.d': 'Tell us about your product and goals.',
      's2.t': 'Quote', 's2.d': 'We review it and send a quote.',
      's3.t': 'Contract', 's3.d': 'Accept the quote and we send the contract.',
      's4.t': 'Payment', 's4.d': 'Pay by bank transfer.',
      's5.t': 'Kick-off', 's5.d': 'We start once payment is confirmed. Videos are usually final within 2–3 days.', 's5.badge': '2–3 days',
      'side.pay': 'Payment: bank transfer + tax invoice',
      'side.pricing': 'See pricing',
      'side.urgent': 'For urgent questions, email us.',
      'consent.label': '[Required] I agree to the collection and use of my personal information.',
      'consent.items': 'Collected: company or brand, contact name, email, phone (optional)',
      'consent.purpose': 'Purpose: consultation on ad production, quotes and project updates',
      'consent.keep': 'Retention: kept for 1 year after the consultation ends, deleted at once on request.',
      'consent.where': 'Requests are managed in Dr.Studio (Dr.Seoul) Google Sheets and email.',
      'consent.refuse': 'You may decline, but we cannot accept the request without consent.',
      'submit': 'Send request', 'sending': 'Sending…',
      'err.required': 'Please check the required fields.',
      'err.send': 'Could not send. Please try again shortly or email us.',
      'ok.label': 'RECEIVED', 'ok.title': 'Your request has been received.',
      'ok.body': 'We will review it and reply to the email address you entered.',
      'ok.bodyId': 'We have sent a confirmation to your email. On the status page you can review your quote and message us.',
      'ok.unsure': 'We will review it and reply to the email address you entered. If no confirmation email arrives, please email us.',
      'ok.id': 'Request ID', 'ok.cs': 'View project status',
      'ok.again': 'Send another request',
      'mail.opened': 'Your mail app now has the request filled in. Send that email to complete the request.',
      'select': 'Please select', 'multi': 'Choose any',
      'svc.label': 'SERVICE', 'svc.title': 'What do you need?',
      'svc.sub': 'Pick the services you need, or leave this empty if you are not sure. Base prices, VAT excluded.',
      'svc.from': 'from {p}', 'svc.style': 'Style', 'svc.picked': '{n} selected',
      'svc.loading': 'Loading services…',
      'svc.err': 'Could not load the service list. You can still send the request with the fields below.',
      'svc.pricing': 'See full pricing',
      'svc.liveOnly': 'Live-action look only',
      'ai.label': 'AI HELPER', 'ai.title': 'Not sure what to ask for?',
      'ai.sub': 'Describe your product and situation in your own words. The AI suggests services, an ad direction and an estimated cost. Suggestions are a starting point; our team sends the final quote.',
      'ai.ph': 'Tell us about your product and situation. e.g. We make hair colour for salons and need a short video to show salon owners.',
      'ai.btn': 'Get AI suggestions', 'ai.loading': 'Working on suggestions… (up to 30 s)',
      'ai.need': 'Please write at least a line about your product or situation.',
      'ai.limit': 'The AI helper is resting after a busy day. Please fill in the form below and our team will review it directly.',
      'ai.timeout': 'This is taking longer than usual. Please try again shortly, or fill in the form below.',
      'ai.err': 'Could not get suggestions. You can fill in the form below as usual.',
      'ai.result': 'AI suggestion', 'ai.estimate': 'Estimated cost',
      'ai.products': 'Services', 'ai.style': 'Style', 'ai.goal': 'Goal', 'ai.audience': 'Audience', 'ai.channels': 'Channels',
      'ai.ratio': 'Aspect ratio', 'ai.length': 'Length', 'ai.count': 'Number of videos', 'ai.message': 'Key message',
      'ai.fill': 'Fill in as suggested', 'ai.filled': 'Empty fields were filled in as suggested. Please check and edit as needed.',
      'ai.summaryEst': 'Estimated cost: '
    }
  };

  function o(v, ko, en) { return { v: v || ko, ko: ko, en: en }; }
  var SCHEMA = [
    { no: '01', label: 'CLIENT', ko: '의뢰인 정보', en: 'About you', fields: [
      { k: 'company', type: 'text', req: true, half: true, ko: '회사·브랜드명', en: 'Company / brand', ph: { ko: '예: 닥터서울', en: 'e.g. Dr.Seoul' }, ac: 'organization' },
      { k: 'name', type: 'text', req: true, half: true, ko: '담당자 이름', en: 'Your name', ph: { ko: '예: 홍길동 / 마케팅 담당', en: 'e.g. Jane Kim / Marketing' }, ac: 'name' },
      { k: 'email', type: 'email', req: true, half: true, ko: '이메일', en: 'Email', ph: { ko: 'name@brand.com', en: 'name@brand.com' }, ac: 'email' },
      { k: 'phone', type: 'tel', half: true, ko: '연락처', en: 'Phone', ph: { ko: '010-0000-0000', en: '+82 10 0000 0000' }, ac: 'tel' },
      { k: 'website', type: 'text', ko: '웹사이트·SNS', en: 'Website / social', ph: { ko: '브랜드 홈페이지나 인스타그램 주소', en: 'Brand website or Instagram' } }
    ] },
    { no: '02', label: 'PRODUCT', ko: '제품 정보', en: 'Product', fields: [
      { k: 'product', type: 'text', req: true, half: true, ko: '제품·서비스 이름', en: 'Product or service', ph: { ko: '광고할 제품 이름', en: 'What we will advertise' } },
      { k: 'category', type: 'select', half: true, ko: '업종', en: 'Category', opts: [
        o('', '뷰티·화장품', 'Beauty & cosmetics'), o('', '식품·음료', 'Food & beverage'), o('', '앱·IT 서비스', 'App & IT service'),
        o('', '게임', 'Games'), o('', '패션·잡화', 'Fashion & accessories'), o('', '생활용품', 'Household goods'), o('', '기타', 'Other')] },
      { k: 'oneliner', type: 'text', req: true, ko: '제품 한 줄 소개', en: 'One-line description', ph: { ko: '예: 민감한 피부를 위한 저자극 수분 크림', en: 'e.g. A gentle moisturizer for sensitive skin' } },
      { k: 'where', type: 'text', ko: '판매 중인 곳', en: 'Where it sells', ph: { ko: '예: 자사몰, 스마트스토어, 올리브영, 쇼피', en: 'e.g. own store, Amazon, Shopee' } }
    ] },
    { no: '03', label: 'GOAL', ko: '광고 목표', en: 'Goal & audience', fields: [
      { k: 'goal', type: 'radio', req: true, ko: '광고 목적', en: 'Goal', opts: [
        o('', '브랜드 인지도', 'Brand awareness'), o('', '판매·전환', 'Sales & conversions'), o('', '앱 설치', 'App installs'),
        o('', '신제품 출시', 'Product launch'), o('', '기타', 'Other')] },
      { k: 'markets', type: 'check', ko: '판매·집행 국가', en: 'Target markets', opts: [
        o('', '한국', 'Korea'), o('', '미국', 'United States'), o('', '일본', 'Japan'), o('', '동남아', 'Southeast Asia'),
        o('', '중남미', 'Latin America'), o('', '유럽', 'Europe'), o('', '기타', 'Other')] },
      { k: 'languages', type: 'check', ko: '광고 언어', en: 'Ad languages', opts: [
        o('', '한국어', 'Korean'), o('', '영어', 'English'), o('', '일본어', 'Japanese'), o('', '스페인어', 'Spanish'),
        o('', '포르투갈어', 'Portuguese'), o('', '인도네시아어', 'Indonesian'), o('', '기타', 'Other')] },
      { k: 'audience', type: 'textarea', ko: '타깃 고객', en: 'Target audience', ph: { ko: '연령, 성별, 관심사 등', en: 'Age, gender, interests' } },
      { k: 'adChannels', type: 'check', ko: '집행 채널', en: 'Channels', opts: [
        o('', '인스타그램 릴스', 'Instagram Reels'), o('', '틱톡', 'TikTok'), o('', '유튜브 쇼츠', 'YouTube Shorts'),
        o('', '유튜브', 'YouTube'), o('', '메타 광고', 'Meta ads'), o('', '미정', 'Not decided')] }
    ] },
    { no: '04', label: 'PRODUCTION', ko: '제작 내용', en: 'Production', fields: [
      { k: 'ratio', type: 'check', half: true, ko: '화면 비율', en: 'Aspect ratio', opts: [
        o('', '세로 9:16', 'Vertical 9:16'), o('', '가로 16:9', 'Horizontal 16:9'), o('', '정사각 1:1', 'Square 1:1')] },
      { k: 'length', type: 'radio', half: true, ko: '영상 길이', en: 'Length', opts: [
        o('', '15초 이하', 'Up to 15 s'), o('', '15~30초', '15–30 s'), o('', '30~60초', '30–60 s'), o('', '60초 이상', 'Over 60 s')] },
      { k: 'count', type: 'select', ko: '제작 편수', en: 'Number of videos', opts: [
        o('', '1편', '1'), o('', '2~3편', '2–3'), o('', '4~5편', '4–5'), o('', '6편 이상', '6 or more'), o('', '미정', 'Not decided')] },
      { k: 'message', type: 'textarea', ko: '꼭 담고 싶은 메시지·요청 사항', en: 'Key message & requests', ph: { ko: '꼭 들어가야 할 문구, 장면, 분위기 등', en: 'Copy, scenes or mood that must be included' } },
      { k: 'references', type: 'textarea', ko: '참고 광고 링크', en: 'Reference ads', ph: { ko: '참고할 영상 주소를 한 줄에 하나씩', en: 'One link per line' } },
      { k: 'assets', type: 'check', ko: '준비된 자료', en: 'What you can provide', opts: [
        o('', '제품 사진', 'Product photos'), o('', '로고', 'Logo'), o('', '제품 실물 제공 가능', 'Physical product'), o('', '브랜드 가이드', 'Brand guide')] }
    ] },
    { no: '05', label: 'TIMELINE & BUDGET', ko: '일정·예산', en: 'Timeline & budget', fields: [
      { k: 'due', type: 'date', half: true, ko: '희망 완료일', en: 'Preferred delivery date' },
      { k: 'source', type: 'select', half: true, ko: '알게 된 경로', en: 'How did you hear about us?', opts: [
        o('', '유튜브', 'YouTube'), o('', '인스타그램', 'Instagram'), o('', '검색', 'Search'), o('', '소개', 'Referral'), o('', '기타', 'Other')] },
      { k: 'budget', type: 'radio', ko: '예산 범위', en: 'Budget', grid: true, opts: [
        o('', '100만 원 미만', 'Under KRW 1M'), o('', '100~300만 원', 'KRW 1M–3M'), o('', '300~500만 원', 'KRW 3M–5M'),
        o('', '500만 원 이상', 'Over KRW 5M'), o('', '성과 연동(매출 수수료) 상담 희망', 'Performance-based (revenue share)'), o('', '미정', 'Not decided')] }
    ] }
  ];
  function fieldOf(k) {
    for (var i = 0; i < SCHEMA.length; i++) { for (var j = 0; j < SCHEMA[i].fields.length; j++) { if (SCHEMA[i].fields[j].k === k) { return SCHEMA[i].fields[j]; } } }
    return null;
  }

  var lang = 'ko';
  var startedAt = Date.now();
  // Service picker state (survives language re-renders).
  var PRICING = null, pricingFailed = false, INDUSTRIES = null;
  var picked = {}, style = '', openTypes = {};
  var pendingCodes = [];        // ?p= codes waiting for the catalog
  var lastAI = null;            // {suggest, note}
  function t(k) { return (T[lang] && T[lang][k]) || T.ko[k] || k; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function store(key, val) { try { if (val === undefined) { return window.localStorage.getItem(key); } window.localStorage.setItem(key, val); } catch (e) { /* ignore */ } return null; }
  function won(n) { if (n === null || n === undefined || isNaN(Number(n))) { return ''; } var s = Number(n).toLocaleString('en-US'); return lang === 'en' ? 'KRW ' + s : s + '원'; }
  function qsAll(name) { try { return new URLSearchParams(window.location.search).getAll(name); } catch (e) { return []; } }
  function qs(name) { var a = qsAll(name); return a.length ? a[0] : ''; }
  function itemOf(code) {
    if (!PRICING) { return null; }
    for (var i = 0; i < PRICING.items.length; i++) { if (PRICING.items[i].code === code) { return PRICING.items[i]; } }
    return null;
  }
  function pickedList() { return Object.keys(picked).filter(function (c) { return picked[c]; }); }

  var INPUT = 'w-full bg-surface-container-lowest border border-primary/20 rounded px-4 py-3 text-sm text-primary placeholder:text-on-surface-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition font-sans';
  var PILL = 'inline-block px-4 py-2 border border-primary/20 rounded text-sm text-primary font-medium font-sans peer-checked:bg-primary peer-checked:text-surface-bright peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-secondary transition-all';

  function labelHTML(f, forId) {
    var star = f.req ? ' <span class="text-secondary font-bold" aria-hidden="true">*</span>' : '';
    var multi = f.type === 'check' ? ' <span class="normal-case tracking-normal text-on-surface-variant/70">(' + esc(t('multi')) + ')</span>' : '';
    var text = esc(f[lang]) + star + multi;
    return forId
      ? '<label class="block font-label-md text-label-md uppercase tracking-wider text-primary" for="' + forId + '">' + text + '</label>'
      : '<span class="block font-label-md text-label-md uppercase tracking-wider text-primary" id="lbl-' + f.k + '">' + text + '</span>';
  }

  function fieldHTML(f) {
    var id = 'f-' + f.k, req = f.req ? ' required aria-required="true"' : '', ph = f.ph ? ' placeholder="' + esc(f.ph[lang]) + '"' : '';
    var ac = f.ac ? ' autocomplete="' + f.ac + '"' : '';
    var wrap = '<div class="space-y-2' + (f.half ? '' : ' md:col-span-2') + '" data-field="' + f.k + '">';
    if (f.type === 'text' || f.type === 'email' || f.type === 'tel' || f.type === 'date') {
      return wrap + labelHTML(f, id) + '<input class="' + INPUT + '" id="' + id + '" name="' + f.k + '" type="' + f.type + '"' + req + ph + ac + ' maxlength="300"></div>';
    }
    if (f.type === 'textarea') {
      return wrap + labelHTML(f, id) + '<textarea class="' + INPUT + ' resize-y" id="' + id + '" name="' + f.k + '" rows="3"' + req + ph + ' maxlength="3000"></textarea></div>';
    }
    if (f.type === 'select') {
      var opts = '<option value="">' + esc(t('select')) + '</option>' + f.opts.map(function (x) { return '<option value="' + esc(x.v) + '">' + esc(x[lang]) + '</option>'; }).join('');
      return wrap + labelHTML(f, id) + '<select class="' + INPUT + ' cursor-pointer" id="' + id + '" name="' + f.k + '"' + req + '>' + opts + '</select></div>';
    }
    // radio / check pills
    var type = f.type === 'radio' ? 'radio' : 'checkbox';
    var pills = f.opts.map(function (x, i) {
      return '<label class="cursor-pointer"><input class="peer sr-only" type="' + type + '" name="' + f.k + '" value="' + esc(x.v) + '"' + (i === 0 && f.req && type === 'radio' ? ' required' : '') + '>' +
        '<span class="' + PILL + (f.grid ? ' block text-center' : '') + '">' + esc(x[lang]) + '</span></label>';
    }).join('');
    var box = f.grid ? 'grid grid-cols-2 sm:grid-cols-3 gap-2.5' : 'flex flex-wrap gap-2.5';
    return wrap.replace('space-y-2', 'space-y-3') + labelHTML(f) + '<div class="' + box + '" role="group" aria-labelledby="lbl-' + f.k + '">' + pills + '</div></div>';
  }

  function sectionHTML(s) {
    return '<section class="space-y-6">' +
      '<div class="border-b border-primary/10 pb-4"><span class="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-semibold">' + s.no + ' // ' + esc(s.label) + '</span>' +
      '<h2 class="font-headline-sm text-headline-sm text-primary mt-1">' + esc(s[lang]) + '</h2></div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' + s.fields.map(fieldHTML).join('') + '</div></section>';
  }

  // ---------- 00 // SERVICE picker ----------
  function itemPriceText(it) {
    if (it.type === 'A') {
      if (it.illustration === null || it.illustration === undefined) { return won(it.live) + ' · ' + t('svc.liveOnly'); }
      if (it.illustration === it.live) { return won(it.live); }
      var st = PRICING.styles;
      return (lang === 'en' ? st.illustration.en : st.illustration.ko) + ' ' + won(it.illustration) + ' · ' + (lang === 'en' ? st.live.en : st.live.ko) + ' ' + won(it.live);
    }
    return it['price_text_' + lang] || won(it.price);
  }

  function serviceHTML() {
    var head = '<div class="border-b border-primary/10 pb-4"><span class="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-semibold">00 // ' + esc(t('svc.label')) + '</span>' +
      '<h2 class="font-headline-sm text-headline-sm text-primary mt-1">' + esc(t('svc.title')) + '</h2>' +
      '<p class="font-sans text-sm text-on-surface-variant mt-1 break-keep">' + esc(t('svc.sub')) + ' <a class="text-secondary underline underline-offset-2 whitespace-nowrap" href="../pricing/" target="_blank" rel="noopener">' + esc(t('svc.pricing')) + ' ↗</a></p></div>';
    if (pricingFailed) { return '<section class="space-y-6" id="svc">' + head + '<p class="font-sans text-sm text-on-surface-variant">' + esc(t('svc.err')) + '</p></section>'; }
    if (!PRICING) { return '<section class="space-y-6" id="svc">' + head + '<p class="font-sans text-sm text-on-surface-variant">' + esc(t('svc.loading')) + '</p></section>'; }
    var cards = ['A', 'B', 'C'].map(function (type) {
      var ty = PRICING.types[type];
      var items = PRICING.items.filter(function (i) { return i.type === type; });
      var n = items.filter(function (i) { return picked[i.code]; }).length;
      var open = !!openTypes[type];
      var styleRow = '';
      if (type === 'A') {
        styleRow = '<div class="space-y-2"><span class="block font-label-md text-label-md uppercase tracking-wider text-primary" id="lbl-style">' + esc(t('svc.style')) + '</span>' +
          '<div class="flex flex-wrap gap-2.5" role="radiogroup" aria-labelledby="lbl-style">' + ['illustration', 'live'].map(function (k) {
            var s = PRICING.styles[k];
            return '<label class="cursor-pointer"><input class="peer sr-only" type="radio" name="style" value="' + k + '"' + (style === k ? ' checked' : '') + '>' +
              '<span class="' + PILL + '">' + esc(lang === 'en' ? s.en : s.ko) + ' <span class="font-normal opacity-70 text-xs">· ' + esc(s['desc_' + lang] || s.desc_ko) + '</span></span></label>';
          }).join('') + '</div></div>';
      }
      var pills = items.map(function (it) {
        return '<label class="cursor-pointer block"><input class="peer sr-only" type="checkbox" name="products" value="' + esc(it.code) + '"' + (picked[it.code] ? ' checked' : '') + '>' +
          '<span class="flex flex-col gap-0.5 h-full px-3.5 py-2.5 border border-primary/20 rounded text-left font-sans peer-checked:bg-primary peer-checked:text-surface-bright peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-secondary transition-all">' +
            '<span class="text-sm font-medium break-keep"><span class="font-label-sm text-label-sm tracking-widest opacity-70 mr-1">' + esc(it.code) + '</span>' + esc(lang === 'en' ? it.en : it.ko) +
              (it['spec_' + lang] ? ' <span class="font-normal opacity-70">(' + esc(it['spec_' + lang]) + ')</span>' : '') + '</span>' +
            '<span class="text-xs opacity-75 break-keep">' + esc(itemPriceText(it)) + '</span>' +
          '</span></label>';
      }).join('');
      return '<div class="border border-primary/15 rounded bg-surface-container-lowest' + (n ? ' border-l-2 border-l-emerald' : '') + '">' +
        '<button class="w-full flex items-start justify-between gap-3 p-4 md:p-5 text-left" type="button" data-svc-toggle="' + type + '" aria-expanded="' + (open ? 'true' : 'false') + '" aria-controls="svc-' + type + '">' +
          '<span class="min-w-0 space-y-1">' +
            '<span class="block font-label-sm text-label-sm uppercase tracking-[0.22em] text-secondary">' + type + ' · ' + esc(ty.label) + '</span>' +
            '<span class="block font-serif text-xl text-primary-container">' + esc(lang === 'en' ? ty.en : ty.ko) + '</span>' +
            '<span class="block font-sans text-sm text-on-surface-variant break-keep">' + esc(ty['line_' + lang] || ty.line_ko) + '</span>' +
            '<span class="block font-sans text-xs text-primary font-semibold pt-0.5">' + esc(t('svc.from').replace('{p}', won(ty.from))) +
              (n ? ' <span class="ml-1.5 px-1.5 py-0.5 bg-secondary/10 text-secondary rounded-sm font-medium">' + esc(t('svc.picked').replace('{n}', String(n))) + '</span>' : '') + '</span>' +
          '</span>' +
          '<span class="shrink-0 mt-1 text-secondary text-xl leading-none transition-transform' + (open ? ' rotate-45' : '') + '" aria-hidden="true">+</span>' +
        '</button>' +
        '<div class="' + (open ? '' : 'hidden ') + 'px-4 pb-4 md:px-5 md:pb-5 space-y-4" id="svc-' + type + '">' + styleRow +
          '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="group" aria-label="' + esc(lang === 'en' ? ty.en : ty.ko) + '">' + pills + '</div>' +
        '</div></div>';
    }).join('');
    return '<section class="space-y-6" id="svc">' + head + '<div class="space-y-3">' + cards + '</div></section>';
  }

  function collect(form) {
    var data = {};
    SCHEMA.forEach(function (s) { s.fields.forEach(function (f) {
      if (f.type === 'check') { data[f.k] = [].slice.call(form.querySelectorAll('input[name="' + f.k + '"]:checked')).map(function (i) { return i.value; }); }
      else if (f.type === 'radio') { var c = form.querySelector('input[name="' + f.k + '"]:checked'); data[f.k] = c ? c.value : ''; }
      else { var el = form.elements[f.k]; data[f.k] = el ? String(el.value || '').trim() : ''; }
    }); });
    data.consent = form.elements.consent.checked ? '동의' : '';
    data.lang = lang;
    data.hp = form.elements.company_site ? form.elements.company_site.value : '';
    return data;
  }

  // Values: snapshot of the user's input so a language switch can re-render the form without losing it.
  function snapshot(form) { return form ? collect(form) : null; }
  function restore(form, d) {
    if (!d) { return; }
    SCHEMA.forEach(function (s) { s.fields.forEach(function (f) {
      var v = d[f.k];
      if (f.type === 'check') { (v || []).forEach(function (x) { var i = form.querySelector('input[name="' + f.k + '"][value="' + x.replace(/"/g, '\\"') + '"]'); if (i) { i.checked = true; } }); }
      else if (f.type === 'radio') { if (v) { var r = form.querySelector('input[name="' + f.k + '"][value="' + v.replace(/"/g, '\\"') + '"]'); if (r) { r.checked = true; } } }
      else if (form.elements[f.k]) { form.elements[f.k].value = v || ''; }
    }); });
    form.elements.consent.checked = d.consent === '동의';
  }

  function render() {
    var host = document.getElementById('form-sections');
    var form = document.getElementById('request-form');
    var keep = host && host.children.length ? snapshot(form) : null;
    if (host) { host.innerHTML = serviceHTML() + SCHEMA.map(sectionHTML).join(''); }
    if (keep) { restore(form, keep); }
  }

  // Re-render only the picker (keeps focus elsewhere intact).
  function renderService() {
    var el = document.getElementById('svc');
    if (!el) { render(); return; }
    var tmp = document.createElement('div');
    tmp.innerHTML = serviceHTML();
    el.parentNode.replaceChild(tmp.firstChild, el);
  }

  // ---------- AI helper ----------
  function norm(s) { return String(s || '').toLowerCase().replace(/[\s()·]/g, '').replace(/[–—\-]/g, '~').replace(/seconds?|sec\.?|s$/g, 's'); }
  // Option value for a suggested label: exact (ko / en / value), else the longest option contained in the suggestion.
  function matchOpt(f, value) {
    if (!f || value === undefined || value === null || value === '') { return null; }
    var nv = norm(value), best = null, bestLen = 0;
    for (var i = 0; i < f.opts.length; i++) {
      var op = f.opts[i];
      if (nv === norm(op.v) || nv === norm(op.ko) || nv === norm(op.en)) { return op.v; }
    }
    f.opts.forEach(function (op) {
      [op.ko, op.en].forEach(function (lbl) {
        var nl = norm(lbl);
        if (nl.length >= 2 && nv.indexOf(nl) >= 0 && nl.length > bestLen) { best = op.v; bestLen = nl.length; }
      });
    });
    return best;
  }
  function asList(v) { return Array.isArray(v) ? v : (v ? [v] : []); }
  function labelFor(k, v) {
    var f = fieldOf(k), m = matchOpt(f, v);
    if (!m) { return String(v); }
    for (var i = 0; i < f.opts.length; i++) { if (f.opts[i].v === m) { return f.opts[i][lang]; } }
    return String(v);
  }
  function styleLabel(v) {
    if (PRICING && PRICING.styles[v]) { return lang === 'en' ? PRICING.styles[v].en : PRICING.styles[v].ko; }
    return v || '';
  }
  function codeLabel(c) { var it = itemOf(c); return it ? c + ' ' + (lang === 'en' ? it.en : it.ko) : c; }

  function aiMsg(text, kind) {
    var m = document.getElementById('ai-msg');
    if (!m) { return; }
    m.textContent = text || '';
    m.className = 'font-sans text-sm ' + (kind === 'error' ? 'text-error' : 'text-on-surface-variant');
  }

  function renderAI() {
    var box = document.getElementById('ai-result');
    if (!box) { return; }
    if (!lastAI) { box.classList.add('hidden'); box.innerHTML = ''; return; }
    var s = lastAI.suggest || {};
    function row(key, val) { return val ? '<div class="space-y-0.5"><dt class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">' + esc(t(key)) + '</dt><dd class="font-sans text-sm text-primary break-keep">' + esc(val) + '</dd></div>' : ''; }
    var rows = row('ai.products', asList(s.products).map(codeLabel).join(', ')) +
      row('ai.style', s.style ? styleLabel(s.style) : '') +
      row('ai.goal', s.goal ? labelFor('goal', s.goal) : '') +
      row('ai.channels', asList(s.adChannels).map(function (v) { return labelFor('adChannels', v); }).join(', ')) +
      row('ai.ratio', asList(s.ratio).map(function (v) { return labelFor('ratio', v); }).join(', ')) +
      row('ai.length', s.length ? labelFor('length', s.length) : '') +
      row('ai.count', s.count ? labelFor('count', s.count) : '') +
      row('ai.audience', s.audience || '');
    box.innerHTML = '<div class="flex items-center gap-2 text-secondary"><span class="w-1.5 h-1.5 rounded-full bg-emerald"></span><span class="font-label-sm text-label-sm uppercase tracking-[0.25em] font-semibold">' + esc(t('ai.result')) + '</span></div>' +
      (s.plan ? '<p class="font-sans text-sm text-primary leading-relaxed whitespace-pre-line break-keep [overflow-wrap:anywhere]">' + esc(s.plan) + '</p>' : '') +
      (s.estimate ? '<p class="font-sans text-sm"><span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mr-2">' + esc(t('ai.estimate')) + '</span><span class="font-semibold text-primary break-keep">' + esc(s.estimate) + '</span></p>' : '') +
      (rows ? '<dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-primary/10">' + rows + '</dl>' : '') +
      (s.message ? '<div class="space-y-0.5"><p class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">' + esc(t('ai.message')) + '</p><p class="font-sans text-sm text-primary leading-relaxed whitespace-pre-line break-keep [overflow-wrap:anywhere]">' + esc(s.message) + '</p></div>' : '') +
      (lastAI.note ? '<p class="font-sans text-xs text-on-surface-variant break-keep">' + esc(lastAI.note) + '</p>' : '') +
      '<button class="inline-flex items-center gap-2 py-2.5 px-5 bg-primary hover:bg-primary-container text-surface-bright font-label-md text-label-md uppercase tracking-[0.2em] rounded transition" type="button" data-ai-fill>' + esc(t('ai.fill')) + ' <span aria-hidden="true">↗</span></button>';
    box.classList.remove('hidden');
  }

  function setAiSummary(s) {
    var el = document.getElementById('f-ai_summary');
    if (!el) { return; }
    var parts = [];
    if (s && s.plan) { parts.push(String(s.plan)); }
    if (s && s.estimate) { parts.push(t('ai.summaryEst') + s.estimate); }
    el.value = parts.join('\n').slice(0, 4000);
  }

  function askAI() {
    var form = document.getElementById('request-form');
    var btn = document.getElementById('ai-btn');
    var free = (document.getElementById('ai-free').value || '').trim().slice(0, 2000);
    var d = collect(form);
    if (!free && !d.product && !d.oneliner) { aiMsg(t('ai.need'), 'error'); document.getElementById('ai-free').focus(); return; }
    if (!window.DRS || !ENDPOINT) { aiMsg(t('ai.err'), 'error'); return; }
    btn.disabled = true; aiMsg(t('ai.loading'));
    window.DRS.api({ action: 'assist', lang: lang, product: d.product, oneliner: d.oneliner, category: d.category, where: d.where,
      goal: d.goal, budget: d.budget, free: free }, 30000)
      .then(function (j) {
        if (j && j.ok && j.suggest) {
          lastAI = { suggest: j.suggest, note: j.note || '' };
          setAiSummary(j.suggest); renderAI(); aiMsg('');
          document.getElementById('ai-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (j && j.error === 'limit') { aiMsg(t('ai.limit'), 'error'); }
        else { aiMsg(t('ai.err'), 'error'); }
      }, function (err) { aiMsg(err && err.message === 'timeout' ? t('ai.timeout') : t('ai.err'), 'error'); })
      .then(function () { btn.disabled = false; });
  }

  function fillFromAI() {
    if (!lastAI) { return; }
    var s = lastAI.suggest || {}, form = document.getElementById('request-form');
    function noneChecked(k) { return !form.querySelector('input[name="' + k + '"]:checked'); }
    function check(k, values) {
      var f = fieldOf(k);
      asList(values).forEach(function (v) {
        var m = matchOpt(f, v);
        if (!m) { return; }
        var i = form.querySelector('input[name="' + k + '"][value="' + m.replace(/"/g, '\\"') + '"]');
        if (i) { i.checked = true; }
      });
    }
    if (noneChecked('goal')) { check('goal', s.goal); }
    if (noneChecked('adChannels')) { check('adChannels', s.adChannels); }
    if (noneChecked('ratio')) { check('ratio', s.ratio); }
    if (noneChecked('length')) { check('length', s.length); }
    if (form.elements.count && !form.elements.count.value) { var mc = matchOpt(fieldOf('count'), s.count); if (mc) { form.elements.count.value = mc; } }
    if (form.elements.message && !form.elements.message.value.trim() && s.message) { form.elements.message.value = String(s.message).slice(0, 3000); }
    if (form.elements.audience && !form.elements.audience.value.trim() && s.audience) { form.elements.audience.value = String(s.audience).slice(0, 3000); }
    if (!pickedList().length) {
      asList(s.products).forEach(function (c) {
        var it = itemOf(c);
        if (it) { picked[it.code] = true; openTypes[it.type] = true; }
      });
    }
    if (!style && (s.style === 'illustration' || s.style === 'live')) { style = s.style; openTypes.A = openTypes.A || pickedList().some(function (c) { return c.charAt(0) === 'A'; }); }
    setAiSummary(s);
    renderService();
    aiMsg(t('ai.filled'));
    var svc = document.getElementById('svc');
    if (svc) { svc.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }

  // ---------- language ----------
  function applyLang(next) {
    lang = T[next] ? next : 'ko';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (el) { el.textContent = t(el.getAttribute('data-t')); });
    document.querySelectorAll('[data-t-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-t-ph'))); });
    document.querySelectorAll('[data-lang-switch]').forEach(function (b) {
      var on = b.getAttribute('data-lang-switch') === lang;
      b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.classList.toggle('is-active', on);
    });
    document.title = (lang === 'ko' ? '광고 제작 의뢰서' : 'Request an ad') + ' — Dr.Studio';
    var msg = document.getElementById('form-msg');
    if (msg) { msg.textContent = ''; }
    render();
    renderAI();
    store('drstudio.lang', lang);
  }

  function message(kind, text) {
    var m = document.getElementById('form-msg');
    m.textContent = text || '';
    m.className = 'text-sm font-sans ' + (kind === 'error' ? 'text-error' : 'text-on-surface-variant');
  }

  function mailtoFallback(data) {
    var lines = [];
    lines.push('상품: ' + ((data.products || []).join(', ') || '-') + (data.style ? ' (' + data.style + ')' : ''));
    SCHEMA.forEach(function (s) { s.fields.forEach(function (f) {
      var v = data[f.k]; if (Array.isArray(v)) { v = v.join(', '); }
      lines.push(f.ko + ': ' + (v || '-'));
    }); });
    if (data.ai_summary) { lines.push('AI 추천 요약: ' + data.ai_summary); }
    lines.push('개인정보 동의: ' + data.consent);
    var subject = '[Dr.Studio 의뢰서] ' + data.company + ' — ' + data.product;
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  }

  // kind: 'mail' (mailto fallback) | 'unsure' (sent, but no readable answer) | {id, token} | falsy (generic)
  function showDone(kind) {
    document.getElementById('request-form').classList.add('hidden');
    var card = document.getElementById('success-card');
    card.classList.remove('hidden');
    var body = document.getElementById('success-body');
    var extra = document.getElementById('success-extra');
    extra.classList.add('hidden');
    if (kind === 'mail') { body.textContent = t('mail.opened'); }
    else if (kind === 'unsure') { body.textContent = t('ok.unsure'); }
    else if (kind && kind.id) {
      body.textContent = t('ok.bodyId');
      document.getElementById('success-id').textContent = kind.id;
      var link = document.getElementById('success-cs');
      if (kind.token) {
        link.setAttribute('href', '../cs/?id=' + encodeURIComponent(kind.id) + '&t=' + encodeURIComponent(kind.token));
        link.classList.remove('hidden');
      } else { link.classList.add('hidden'); }
      extra.classList.remove('hidden');
    } else { body.textContent = t('ok.body'); }
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    card.focus({ preventScroll: true });
  }

  function onSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var data = collect(form);
    var missing = !data.company || !data.name || !data.email || !data.product || !data.oneliner || !data.goal || !data.consent || !form.elements.email.checkValidity();
    if (missing) { message('error', t('err.required')); form.reportValidity && form.reportValidity(); return; }
    if (data.hp || Date.now() - startedAt < 2500) { showDone(null); return; }   // bot: pretend success, send nothing
    data.action = 'submit';
    data.products = pickedList();
    data.style = style || '';
    data.ai_summary = (form.elements.ai_summary && form.elements.ai_summary.value) || '';
    data.source_ref = (form.elements.source_ref && form.elements.source_ref.value) || '';
    data.industry = (form.elements.industry && form.elements.industry.value) || '';
    if (!ENDPOINT || !window.DRS) { mailtoFallback(data); showDone('mail'); return; }
    var btn = document.getElementById('submit-btn');
    btn.disabled = true; btn.querySelector('[data-t]').textContent = t('sending');
    window.DRS.api(data, 30000)
      .then(function (j) {
        if (j && j.ok) { showDone(j.id ? { id: String(j.id), token: j.token ? String(j.token) : '' } : 'unsure'); }
        else { message('error', t('err.send')); }
      }, function (err) {
        // The POST usually reaches Apps Script even when the answer cannot be read (timeout / unreadable reply).
        // Only a browser that is offline is treated as a certain failure.
        if (err && err.message === 'network' && navigator.onLine === false) { message('error', t('err.send')); }
        else { showDone('unsure'); }
      })
      .then(function () { btn.disabled = false; btn.querySelector('[data-t]').textContent = t('submit'); });
  }

  // ---------- prefill from the landing page (?p=A-1,C-5 &style=live &i=beauty &src=...) ----------
  function readQuery(form) {
    qsAll('p').forEach(function (v) { String(v).split(',').forEach(function (c) { c = c.trim().toUpperCase(); if (/^[ABC]-[0-9A-Z-]{1,8}$/.test(c)) { pendingCodes.push(c); } }); });
    var st = qs('style').toLowerCase();
    if (st === 'illustration' || st === 'live') { style = st; }
    var src = qs('src').replace(/[^A-Za-z0-9_.\-]/g, '').slice(0, 64);
    if (src && form.elements.source_ref) { form.elements.source_ref.value = src; }
    var ind = qs('i').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 32);
    if (ind && form.elements.industry) { form.elements.industry.value = ind; }
  }
  function applyPendingCodes() {
    pendingCodes.forEach(function (c) { var it = itemOf(c); if (it) { picked[it.code] = true; openTypes[it.type] = true; } });
    pendingCodes = [];
    if (style) { openTypes.A = true; }
  }
  function applyIndustryCategory() {
    var form = document.getElementById('request-form');
    var ind = form.elements.industry ? form.elements.industry.value : '';
    if (!ind || !INDUSTRIES || !INDUSTRIES[ind]) { return; }
    var cat = INDUSTRIES[ind].category;
    if (cat && form.elements.category && !form.elements.category.value) {
      var ok = [].some.call(form.elements.category.options, function (op) { return op.value === cat; });
      if (ok) { form.elements.category.value = cat; }
    }
  }

  function init() {
    var form = document.getElementById('request-form');
    document.querySelectorAll('[data-email]').forEach(function (a) { a.setAttribute('href', 'mailto:' + EMAIL); a.textContent = EMAIL; });
    readQuery(form);
    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-lang-switch],[data-again],[data-menu-toggle],[data-svc-toggle],[data-ai-fill],#ai-btn,#mobile-menu a') : null;
      if (!el) { return; }
      if (el.hasAttribute('data-lang-switch')) { applyLang(el.getAttribute('data-lang-switch')); }
      else if (el.hasAttribute('data-svc-toggle')) {
        var ty = el.getAttribute('data-svc-toggle'); openTypes[ty] = !openTypes[ty];
        var panel = document.getElementById('svc-' + ty);
        if (panel) { panel.classList.toggle('hidden', !openTypes[ty]); }
        el.setAttribute('aria-expanded', openTypes[ty] ? 'true' : 'false');
        var plus = el.querySelector('[aria-hidden="true"]:last-child'); if (plus) { plus.classList.toggle('rotate-45', !!openTypes[ty]); }
      }
      else if (el.id === 'ai-btn') { askAI(); }
      else if (el.hasAttribute('data-ai-fill')) { fillFromAI(); }
      else if (el.hasAttribute('data-again')) {
        form.reset(); picked = {}; style = ''; openTypes = {}; lastAI = null;
        ['f-ai_summary'].forEach(function (k) { var x = document.getElementById(k); if (x) { x.value = ''; } });
        readQuery(form); applyPendingCodes(); render(); applyIndustryCategory(); renderAI(); aiMsg('');
        form.classList.remove('hidden'); document.getElementById('success-card').classList.add('hidden'); message('', '');
        startedAt = Date.now(); form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (el.hasAttribute('data-menu-toggle')) {
        var menu = document.getElementById('mobile-menu'); var open = menu.classList.toggle('hidden') === false;
        el.setAttribute('aria-expanded', open ? 'true' : 'false');
      } else { var m = document.getElementById('mobile-menu'); if (m) { m.classList.add('hidden'); } }
    });
    form.addEventListener('change', function (e) {
      var el = e.target;
      if (el.name === 'products') { picked[el.value] = el.checked; renderServiceBadges(); }
      else if (el.name === 'style') { style = el.value; }
    });
    form.addEventListener('submit', onSubmit);
    var saved = store('drstudio.lang');
    var guess = (navigator.language || 'ko').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
    applyLang(saved === 'ko' || saved === 'en' ? saved : guess);

    var body = document.body;
    var getJSON = function (p) { return fetch(p, { cache: 'no-cache' }).then(function (r) { if (!r.ok) { throw new Error('http'); } return r.json(); }); };
    getJSON(body.getAttribute('data-pricing') || '../assets/data/pricing.json')
      .then(function (d) { PRICING = d; applyPendingCodes(); }, function () { pricingFailed = true; })
      .then(function () { renderService(); });
    getJSON(body.getAttribute('data-industries') || '../assets/data/industries.json')
      .then(function (d) { INDUSTRIES = d; applyIndustryCategory(); }, function () { /* no prefill */ });
  }

  // Selected-count badges change when a pill is ticked; re-render the picker but keep keyboard focus on the same pill.
  function renderServiceBadges() {
    var active = document.activeElement, code = active && active.name === 'products' ? active.value : null;
    renderService();
    if (code) { var i = document.querySelector('input[name="products"][value="' + code.replace(/"/g, '\\"') + '"]'); if (i) { i.focus({ preventScroll: true }); } }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
}());
