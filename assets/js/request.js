/* Dr.Studio ad production request form: renders the bilingual form from one schema, validates, and submits
   to the Google Apps Script web app (sheet + notification mail). Without an endpoint it falls back to an email draft. */
(function () {
  'use strict';

  // Google Apps Script web app URL (deployment of "Dr.Studio 의뢰서 접수"). Empty = email fallback.
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbyDAwNfP_I_oax8EyF3BHsJsH_DWH0o8puu1M7cNAnrCu_iwmxx7NK4fypbOU3uxg4Q/exec';
  var EMAIL = 'contact' + '@' + 'drstudio.site';

  var T = {
    ko: {
      'hero.title': '광고 제작 의뢰서',
      'hero.sub': '필수 항목만 채워도 접수됩니다. 검토 후 이메일로 회신드립니다.',
      'side.label': 'PROCESS · 진행 순서', 'side.title': '진행 순서',
      's1.t': '의뢰서 접수', 's1.d': '보내 주신 내용을 검토합니다.',
      's2.t': '상담·견적', 's2.d': '방향과 일정, 비용을 이메일로 제안합니다.',
      's3.t': '제작', 's3.d': '통상 2~3일 안에 최종본을 완성합니다.', 's3.badge': '2~3일',
      's4.t': '수정·납품', 's4.d': '의견을 반영해 최종 파일을 전달합니다.',
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
      'ok.again': '다른 의뢰서 작성하기',
      'mail.opened': '메일 앱에 의뢰서 내용이 채워졌습니다. 메일을 보내면 접수가 완료됩니다.',
      'select': '선택해 주세요', 'multi': '여러 개 선택 가능'
    },
    en: {
      'hero.title': 'Request an ad',
      'hero.sub': 'Fill in the required fields and send. We review every request and reply by email.',
      'side.label': 'PROCESS', 'side.title': 'How it works',
      's1.t': 'Request', 's1.d': 'We review what you send us.',
      's2.t': 'Consultation & quote', 's2.d': 'We propose the direction, schedule and cost by email.',
      's3.t': 'Production', 's3.d': 'The final cut is usually ready within 2–3 days.', 's3.badge': '2–3 days',
      's4.t': 'Revisions & delivery', 's4.d': 'We apply your feedback and deliver the final files.',
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
      'ok.again': 'Send another request',
      'mail.opened': 'Your mail app now has the request filled in. Send that email to complete the request.',
      'select': 'Please select', 'multi': 'Choose any'
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

  var lang = 'ko';
  var startedAt = Date.now();
  function t(k) { return (T[lang] && T[lang][k]) || T.ko[k] || k; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function store(key, val) { try { if (val === undefined) { return window.localStorage.getItem(key); } window.localStorage.setItem(key, val); } catch (e) { /* ignore */ } return null; }

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
    if (host) { host.innerHTML = SCHEMA.map(sectionHTML).join(''); }
    if (keep) { restore(form, keep); }
  }

  function applyLang(next) {
    lang = T[next] ? next : 'ko';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (el) { el.textContent = t(el.getAttribute('data-t')); });
    document.querySelectorAll('[data-lang-switch]').forEach(function (b) {
      var on = b.getAttribute('data-lang-switch') === lang;
      b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.classList.toggle('is-active', on);
    });
    document.title = (lang === 'ko' ? '광고 제작 의뢰서' : 'Request an ad') + ' — Dr.Studio';
    var msg = document.getElementById('form-msg');
    if (msg) { msg.textContent = ''; }
    render();
    store('drstudio.lang', lang);
  }

  function message(kind, text) {
    var m = document.getElementById('form-msg');
    m.textContent = text || '';
    m.className = 'text-sm font-sans ' + (kind === 'error' ? 'text-error' : 'text-on-surface-variant');
  }

  function mailtoFallback(data) {
    var lines = [];
    SCHEMA.forEach(function (s) { s.fields.forEach(function (f) {
      var v = data[f.k]; if (Array.isArray(v)) { v = v.join(', '); }
      lines.push(f.ko + ': ' + (v || '-'));
    }); });
    lines.push('개인정보 동의: ' + data.consent);
    var subject = '[Dr.Studio 의뢰서] ' + data.company + ' — ' + data.product;
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function showDone(viaMail) {
    document.getElementById('request-form').classList.add('hidden');
    var card = document.getElementById('success-card');
    card.classList.remove('hidden');
    document.getElementById('success-body').textContent = viaMail ? t('mail.opened') : t('ok.body');
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function onSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var data = collect(form);
    var missing = !data.company || !data.name || !data.email || !data.product || !data.oneliner || !data.goal || !data.consent || !form.elements.email.checkValidity();
    if (missing) { message('error', t('err.required')); form.reportValidity && form.reportValidity(); return; }
    if (data.hp || Date.now() - startedAt < 2500) { showDone(false); return; }   // bot: pretend success, send nothing
    if (!ENDPOINT) { mailtoFallback(data); showDone(true); return; }
    var btn = document.getElementById('submit-btn');
    btn.disabled = true; btn.querySelector('[data-t]').textContent = t('sending');
    fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) })
      .then(function () { showDone(false); })
      .catch(function () { message('error', t('err.send')); })
      .then(function () { btn.disabled = false; btn.querySelector('[data-t]').textContent = t('submit'); });
  }

  function init() {
    var form = document.getElementById('request-form');
    document.querySelectorAll('[data-email]').forEach(function (a) { a.setAttribute('href', 'mailto:' + EMAIL); a.textContent = EMAIL; });
    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-lang-switch],[data-again],[data-menu-toggle],#mobile-menu a') : null;
      if (!el) { return; }
      if (el.hasAttribute('data-lang-switch')) { applyLang(el.getAttribute('data-lang-switch')); }
      else if (el.hasAttribute('data-again')) {
        form.reset(); form.classList.remove('hidden'); document.getElementById('success-card').classList.add('hidden'); message('', '');
        startedAt = Date.now(); form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (el.hasAttribute('data-menu-toggle')) {
        var menu = document.getElementById('mobile-menu'); var open = menu.classList.toggle('hidden') === false;
        el.setAttribute('aria-expanded', open ? 'true' : 'false');
      } else { var m = document.getElementById('mobile-menu'); if (m) { m.classList.add('hidden'); } }
    });
    form.addEventListener('submit', onSubmit);
    var saved = store('drstudio.lang');
    var guess = (navigator.language || 'ko').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
    applyLang(saved === 'ko' || saved === 'en' ? saved : guess);
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
}());
