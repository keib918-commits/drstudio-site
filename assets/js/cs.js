/* Dr.Studio customer status page (/cs/?id=<request id>&t=<token>).
   Reads cs_get; quote decision via cs_quote; messages via cs_post. Contract: files/drstudio_request_backend/API_CONTRACT_2026-11-08.md */
(function () {
  'use strict';

  var STEPS = ['received', 'quoted', 'contract', 'payment', 'production', 'review', 'publish', 'done'];

  var T = {
    ko: {
      'page.title': '진행 현황 — Dr.Studio',
      'hero.title': '진행 현황',
      'hero.sub': '의뢰하신 프로젝트의 진행 상황을 확인하고, 견적 확인과 문의를 이 페이지에서 하실 수 있습니다.',
      'loading': '진행 현황을 불러오는 중입니다…',
      'st.received': '접수', 'st.quoted': '견적 발송', 'st.contract': '계약 대기', 'st.payment': '입금 대기',
      'st.production': '제작 중', 'st.review': '검수', 'st.publish': '게시·집행', 'st.done': '완료',
      'st.hold': '보류', 'st.closed': '종료',
      'hold.note': '프로젝트가 잠시 보류되어 있습니다. 궁금하신 점은 아래 메시지로 남겨 주세요.',
      'closed.note': '이 프로젝트는 종료되었습니다. 다시 진행을 원하시면 메시지나 새 의뢰서로 알려 주세요.',
      'step.of': '단계 {n} / {total}',
      'h.id': '접수 번호', 'h.created': '접수일', 'h.products': '선택한 상품', 'h.style': '스타일',
      'style.illustration': '삽화형', 'style.live': '실사형',
      'tl.title': '진행 기록', 'tl.empty': '아직 기록이 없습니다.',
      'q.title': '견적서', 'q.item': '항목', 'q.qty': '수량', 'q.unit': '단가', 'q.amount': '금액', 'q.total': '합계',
      'q.sent': '확인 대기', 'q.accepted': '수락하셨습니다', 'q.declined': '거절하셨습니다',
      'q.sentAt': '보낸 날짜', 'q.notePh': '전하실 말씀이 있으면 적어 주세요 (선택)',
      'q.accept': '견적 수락하기', 'q.decline': '거절하기',
      'q.confirmDecline': '이 견적을 거절하시겠습니까? 거절하시면 프로젝트가 보류됩니다.',
      'q.done.accept': '견적을 수락하셨습니다. 곧 계약서를 보내 드리겠습니다.',
      'q.done.decline': '견적 거절 의사를 전달했습니다. 담당자가 확인 후 연락드리겠습니다.',
      'q.vat': '부가세 별도',
      'c.title': '계약서', 'c.open': '계약서 보기·서명하기', 'c.signed': '서명 완료', 'c.pending': '서명 대기',
      'p.title': '입금 안내', 'p.confirmed': '입금 확인', 'p.pending': '입금 대기',
      'p.note': '입금을 확인하면 세금계산서(또는 현금영수증)를 발행해 드립니다.',
      'd.title': '전달 자료', 'd.open': '열기',
      'm.title': '메시지', 'm.empty': '아직 메시지가 없습니다. 궁금하신 점을 편하게 남겨 주세요.',
      'm.studio': 'Dr.Studio', 'm.you': '고객님',
      'm.ph': '메시지를 입력해 주세요', 'm.send': '보내기', 'm.sending': '보내는 중…',
      'm.sent': '메시지를 보냈습니다. 담당자가 확인 후 답변드리겠습니다.',
      'm.tooLong': '메시지는 3,000자 이내로 적어 주세요.',
      'working': '처리 중입니다…',
      'err.params.t': '링크를 확인해 주세요.',
      'err.params': '이 주소에는 접수 번호나 확인 코드가 없습니다. 접수 확인 메일의 ‘진행 현황 보기’ 링크로 다시 열어 주세요.',
      'err.auth.t': '확인 코드가 맞지 않습니다.',
      'err.auth': '링크가 잘렸거나 바뀌었을 수 있습니다. 접수 확인 메일의 링크를 다시 눌러 주시고, 그래도 열리지 않으면 메일로 알려 주세요.',
      'err.net.t': '진행 현황을 불러오지 못했습니다.',
      'err.net': '인터넷 연결을 확인하신 뒤 다시 시도해 주세요. 계속 열리지 않으면 메일로 알려 주세요.',
      'err.action': '처리하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      'retry': '다시 시도', 'mail': '메일로 문의하기', 'reload': '새로 고침'
    },
    en: {
      'page.title': 'Your project — Dr.Studio',
      'hero.title': 'Your project',
      'hero.sub': 'Check the status of your project, review your quote and message us, all on this page.',
      'loading': 'Loading your project…',
      'st.received': 'Received', 'st.quoted': 'Quote sent', 'st.contract': 'Contract', 'st.payment': 'Payment',
      'st.production': 'In production', 'st.review': 'Review', 'st.publish': 'Live', 'st.done': 'Done',
      'st.hold': 'On hold', 'st.closed': 'Closed',
      'hold.note': 'This project is on hold for now. Send us a message below if you have questions.',
      'closed.note': 'This project is closed. To restart, send us a message or a new request.',
      'step.of': 'Step {n} of {total}',
      'h.id': 'Request ID', 'h.created': 'Received', 'h.products': 'Selected services', 'h.style': 'Style',
      'style.illustration': 'Illustrated', 'style.live': 'Live-action look',
      'tl.title': 'Timeline', 'tl.empty': 'Nothing yet.',
      'q.title': 'Quote', 'q.item': 'Item', 'q.qty': 'Qty', 'q.unit': 'Unit price', 'q.amount': 'Amount', 'q.total': 'Total',
      'q.sent': 'Awaiting your answer', 'q.accepted': 'You accepted this quote', 'q.declined': 'You declined this quote',
      'q.sentAt': 'Sent', 'q.notePh': 'Anything you would like to add (optional)',
      'q.accept': 'Accept quote', 'q.decline': 'Decline',
      'q.confirmDecline': 'Decline this quote? The project will be put on hold.',
      'q.done.accept': 'Thank you for accepting the quote. We will send the contract shortly.',
      'q.done.decline': 'We have passed on your decision. We will be in touch.',
      'q.vat': 'VAT excluded',
      'c.title': 'Contract', 'c.open': 'View and sign the contract', 'c.signed': 'Signed', 'c.pending': 'Awaiting signature',
      'p.title': 'Payment', 'p.confirmed': 'Payment confirmed', 'p.pending': 'Awaiting payment',
      'p.note': 'Once payment is confirmed we issue a tax invoice (or cash receipt).',
      'd.title': 'Deliverables', 'd.open': 'Open',
      'm.title': 'Messages', 'm.empty': 'No messages yet. Feel free to ask us anything.',
      'm.studio': 'Dr.Studio', 'm.you': 'You',
      'm.ph': 'Write a message', 'm.send': 'Send', 'm.sending': 'Sending…',
      'm.sent': 'Message sent. We will reply soon.',
      'm.tooLong': 'Please keep messages under 3,000 characters.',
      'working': 'Working…',
      'err.params.t': 'Please check the link.',
      'err.params': 'This address has no request ID or access code. Please open the “View status” link in your confirmation email.',
      'err.auth.t': 'The access code does not match.',
      'err.auth': 'The link may have been cut off or changed. Please click the link in your confirmation email again, or email us if it still does not open.',
      'err.net.t': 'Could not load your project.',
      'err.net': 'Please check your connection and try again. If it keeps failing, email us.',
      'err.action': 'That did not go through. Please try again shortly.',
      'retry': 'Try again', 'mail': 'Email us', 'reload': 'Refresh'
    }
  };

  var id = '', token = '', DATA = null, NAMES = {}, busy = false;
  var draft = { msg: '', qnote: '' }, flash = { quote: '', msg: '' };
  var esc = function (s) { return window.DRS.esc(s); };
  function tt(k) { return window.DRS.t(k); }
  function stLabel(code, fallback) {
    var k = 'st.' + code;
    var v = tt(k);
    if (v !== k) { return v; }
    return fallback || code || '';
  }
  function nameOf(code) {
    var n = NAMES[code];
    if (!n) { return code; }
    return code + ' ' + (window.DRS.lang() === 'en' ? n.en : n.ko);
  }

  var CARD = 'bg-surface-container-lowest border border-primary/10 rounded p-5 md:p-7 shadow-sm space-y-4';
  function cardHead(label, title, badge) {
    return '<div class="flex items-start justify-between gap-3 border-b border-primary/10 pb-3">' +
      '<div class="min-w-0"><span class="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-semibold">' + esc(label) + '</span>' +
      '<h2 class="font-headline-sm text-headline-sm text-primary mt-0.5 break-keep">' + esc(title) + '</h2></div>' + (badge || '') + '</div>';
  }
  function badge(text, kind) {
    var cls = kind === 'ok' ? 'bg-secondary/10 text-secondary border-secondary/30'
      : kind === 'warn' ? 'bg-error-container text-on-error-container border-error/20'
      : 'bg-surface-container text-on-surface-variant border-primary/15';
    return '<span class="shrink-0 inline-flex items-center px-2 py-1 rounded-sm border text-[11px] font-sans font-semibold ' + cls + '">' + esc(text) + '</span>';
  }

  // ---------- states ----------
  function showState(titleKey, bodyKey, withRetry) {
    document.getElementById('cs-app').classList.add('hidden');
    var el = document.getElementById('cs-state');
    el.classList.remove('hidden');
    el.innerHTML = '<div class="max-w-xl p-6 md:p-8 bg-surface-container-low border border-primary/10 rounded space-y-4">' +
      '<h2 class="font-headline-sm text-headline-sm text-primary break-keep">' + esc(tt(titleKey)) + '</h2>' +
      '<p class="font-sans text-sm text-on-surface-variant leading-relaxed break-keep">' + esc(tt(bodyKey)) + '</p>' +
      '<div class="flex flex-wrap items-center gap-4 pt-1">' +
        (withRetry ? '<button class="py-2.5 px-5 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md uppercase tracking-[0.2em] rounded transition" type="button" data-act="retry">' + esc(tt('retry')) + '</button>' : '') +
        '<a class="font-label-md text-label-md uppercase tracking-[0.2em] text-primary-container hover:text-secondary border-b border-primary-container/30 pb-0.5" href="mailto:' + esc(window.DRS.EMAIL) + '">' + esc(tt('mail')) + ' ↗</a>' +
      '</div></div>';
  }
  var errState = null;

  // ---------- render ----------
  function stepperHTML(req) {
    var status = req.status;
    var cur = STEPS.indexOf(status);
    var paused = status === 'hold' || status === 'closed';
    if (cur < 0 && DATA.timeline) {   // hold / closed: show how far it got
      for (var i = DATA.timeline.length - 1; i >= 0; i--) {
        var k = STEPS.indexOf(DATA.timeline[i].status);
        if (k >= 0) { cur = k; break; }
      }
    }
    var bars = STEPS.map(function (s, i) {
      var cls = i < cur || (i === cur && status === 'done') ? 'bg-secondary' : i === cur ? (paused ? 'bg-outline' : 'bg-emerald-hl') : 'bg-primary/10';
      return '<li class="min-w-0 space-y-2" aria-current="' + (i === cur ? 'step' : 'false') + '">' +
        '<span class="block h-1.5 rounded-full ' + cls + '"></span>' +
        '<span class="hidden sm:block font-sans text-[11px] leading-tight break-keep ' + (i === cur ? 'text-primary font-semibold' : i < cur ? 'text-on-surface-variant' : 'text-on-surface-variant/50') + '">' + esc(stLabel(s)) + '</span></li>';
    }).join('');
    var count = cur >= 0 ? tt('step.of').replace('{n}', String(cur + 1)).replace('{total}', String(STEPS.length)) : '';
    return '<ol class="grid grid-cols-8 gap-1.5 sm:gap-2" aria-label="Progress">' + bars + '</ol>' +
      '<p class="sm:hidden font-sans text-xs text-on-surface-variant">' + esc(count) + (cur >= 0 ? ' · ' + esc(stLabel(STEPS[cur])) : '') + '</p>';
  }

  function headerCard(req) {
    var paused = req.status === 'hold' || req.status === 'closed';
    var label = window.DRS.lang() === 'ko' && req.status_label ? req.status_label : stLabel(req.status, req.status_label);
    var stBadge = badge(label, req.status === 'done' ? 'ok' : paused ? 'warn' : '');
    var prods = (req.products || []).map(function (c) { return '<span class="inline-block px-2 py-1 bg-surface-container-low rounded-sm font-sans text-xs text-primary">' + esc(nameOf(c)) + '</span>'; }).join(' ');
    var style = req.style ? tt('style.' + req.style) : '';
    return '<section class="' + CARD + '">' +
      '<div class="flex items-start justify-between gap-3">' +
        '<div class="min-w-0 space-y-1">' +
          '<span class="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-semibold">' + esc(tt('h.id')) + ' · ' + esc(req.id || id) + '</span>' +
          '<h2 class="font-headline-sm text-headline-sm md:text-headline-md text-primary break-keep">' + esc(req.company || '') + '</h2>' +
          '<p class="font-sans text-sm text-on-surface-variant break-keep">' + esc(req.product || '') + '</p>' +
        '</div>' + stBadge +
      '</div>' +
      stepperHTML(req) +
      (req.status === 'hold' ? '<p class="font-sans text-sm text-on-surface-variant break-keep">' + esc(tt('hold.note')) + '</p>' : '') +
      (req.status === 'closed' ? '<p class="font-sans text-sm text-on-surface-variant break-keep">' + esc(tt('closed.note')) + '</p>' : '') +
      '<dl class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-primary/10 font-sans text-sm">' +
        '<div><dt class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">' + esc(tt('h.created')) + '</dt><dd class="text-primary mt-1">' + esc(window.DRS.fmtTs(req.created)) + '</dd></div>' +
        (prods ? '<div class="sm:col-span-2"><dt class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">' + esc(tt('h.products')) + (style ? ' · ' + esc(style) : '') + '</dt><dd class="mt-1 flex flex-wrap gap-1.5">' + prods + '</dd></div>' : '') +
      '</dl></section>';
  }

  function quoteCard(q) {
    if (!q) { return ''; }
    var stMap = { sent: ['q.sent', ''], accepted: ['q.accepted', 'ok'], declined: ['q.declined', 'warn'] };
    var st = stMap[q.status] || ['q.sent', ''];
    var rows = (q.items || []).map(function (it) {
      return '<div class="py-3 border-b border-primary/10 grid grid-cols-2 sm:grid-cols-12 gap-x-3 gap-y-1 font-sans text-sm">' +
        '<div class="col-span-2 sm:col-span-6 min-w-0"><span class="font-label-sm text-label-sm tracking-widest text-secondary mr-1.5">' + esc(it.code || '') + '</span><span class="text-primary break-keep">' + esc(it.name || '') + '</span></div>' +
        '<div class="sm:col-span-1 sm:text-right text-on-surface-variant"><span class="sm:hidden">' + esc(tt('q.qty')) + ' </span>' + esc(it.qty) + '</div>' +
        '<div class="sm:col-span-2 text-right text-on-surface-variant">' + esc(window.DRS.won(it.unit_price)) + '</div>' +
        '<div class="col-span-2 sm:col-span-3 text-right text-primary font-semibold">' + esc(window.DRS.won(it.amount)) + '</div>' +
      '</div>';
    }).join('');
    var head = '<div class="hidden sm:grid sm:grid-cols-12 gap-3 pb-2 border-b border-primary/15 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">' +
      '<span class="sm:col-span-6">' + esc(tt('q.item')) + '</span><span class="sm:col-span-1 text-right">' + esc(tt('q.qty')) + '</span>' +
      '<span class="sm:col-span-2 text-right">' + esc(tt('q.unit')) + '</span><span class="sm:col-span-3 text-right">' + esc(tt('q.amount')) + '</span></div>';
    var actions = '';
    if (q.status === 'sent') {
      actions = '<div class="space-y-3 pt-2">' +
        '<textarea class="w-full bg-surface-container-lowest border border-primary/20 rounded px-4 py-3 text-sm text-primary placeholder:text-on-surface-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition font-sans resize-y" rows="2" maxlength="1000" id="q-note" placeholder="' + esc(tt('q.notePh')) + '">' + esc(draft.qnote) + '</textarea>' +
        '<div class="flex flex-col sm:flex-row gap-3">' +
          '<button class="flex-1 py-3 px-6 bg-secondary hover:bg-secondary/90 disabled:opacity-60 text-on-secondary font-label-lg text-label-lg uppercase tracking-[0.2em] rounded transition flex items-center justify-center gap-2" type="button" data-act="accept"' + (busy ? ' disabled' : '') + '>' + esc(tt('q.accept')) + ' <span aria-hidden="true">↗</span></button>' +
          '<button class="py-3 px-6 border border-primary/30 hover:border-error hover:text-error disabled:opacity-60 text-primary font-label-lg text-label-lg uppercase tracking-[0.2em] rounded transition" type="button" data-act="decline"' + (busy ? ' disabled' : '') + '>' + esc(tt('q.decline')) + '</button>' +
        '</div></div>';
    }
    return '<section class="' + CARD + '" id="quote">' + cardHead('Quote', tt('q.title'), badge(tt(st[0]), st[1])) +
      (q.sent_at ? '<p class="font-sans text-xs text-on-surface-variant">' + esc(tt('q.sentAt')) + ' ' + esc(window.DRS.fmtTs(q.sent_at)) + '</p>' : '') +
      '<div>' + head + rows + '</div>' +
      '<div class="flex items-baseline justify-between gap-3 pt-1"><span class="font-label-md text-label-md uppercase tracking-widest text-primary">' + esc(tt('q.total')) + '</span>' +
        '<span class="font-serif text-headline-sm text-primary">' + esc(window.DRS.won(q.total)) + '</span></div>' +
      '<p class="font-sans text-xs text-on-surface-variant text-right">' + esc(q.vat_note || tt('q.vat')) + '</p>' +
      (q.note ? '<p class="font-sans text-sm text-on-surface-variant leading-relaxed whitespace-pre-line break-keep [overflow-wrap:anywhere] p-3 bg-surface-container-low rounded-sm">' + esc(q.note) + '</p>' : '') +
      actions +
      (flash.quote ? '<p class="font-sans text-sm text-secondary" role="status">' + esc(flash.quote) + '</p>' : '') +
    '</section>';
  }

  function contractCard(c) {
    if (!c) { return ''; }
    var url = window.DRS.safeUrl(c.url);
    return '<section class="' + CARD + '">' + cardHead('Contract', tt('c.title'), badge(c.signed ? tt('c.signed') : tt('c.pending'), c.signed ? 'ok' : '')) +
      (url ? '<a class="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-[0.2em] text-primary-container hover:text-secondary border-b border-primary-container/30 hover:border-secondary pb-0.5 transition-colors" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(tt('c.open')) + ' <span aria-hidden="true">↗</span></a>' : '') +
    '</section>';
  }

  function paymentCard(p) {
    if (!p) { return ''; }
    return '<section class="' + CARD + '">' + cardHead('Payment', tt('p.title'), badge(p.confirmed ? tt('p.confirmed') : tt('p.pending'), p.confirmed ? 'ok' : '')) +
      (p.bank ? '<p class="font-sans text-sm text-primary leading-relaxed whitespace-pre-line break-keep [overflow-wrap:anywhere] p-3 bg-surface-container-low rounded-sm">' + esc(p.bank) + '</p>' : '') +
      '<p class="font-sans text-xs text-on-surface-variant break-keep">' + esc(tt('p.note')) + '</p>' +
    '</section>';
  }

  function deliverablesCard(list) {
    if (!list || !list.length) { return ''; }
    var items = list.map(function (d) {
      var url = window.DRS.safeUrl(d.url);
      return '<li class="py-3 border-b border-primary/10 flex items-start justify-between gap-3">' +
        '<div class="min-w-0"><p class="font-sans text-sm text-primary break-keep [overflow-wrap:anywhere]">' + esc(d.title || '') + '</p>' +
        '<p class="font-sans text-xs text-on-surface-variant">' + esc(window.DRS.fmtTs(d.ts)) + '</p></div>' +
        (url ? '<a class="shrink-0 font-label-md text-label-md uppercase tracking-[0.2em] text-primary-container hover:text-secondary border-b border-primary-container/30 pb-0.5" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(tt('d.open')) + ' ↗</a>' : '') +
      '</li>';
    }).join('');
    return '<section class="' + CARD + '">' + cardHead('Deliverables', tt('d.title')) + '<ul>' + items + '</ul></section>';
  }

  function messagesCard(list) {
    var bubbles = (list || []).map(function (m) {
      var mine = m.from === 'customer';
      return '<li class="flex ' + (mine ? 'justify-end' : 'justify-start') + '">' +
        '<div class="max-w-[85%] min-w-0 space-y-1 ' + (mine ? 'text-right' : '') + '">' +
          '<p class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">' + esc(mine ? tt('m.you') : tt('m.studio')) + ' · ' + esc(window.DRS.fmtTs(m.ts)) + '</p>' +
          '<div class="inline-block max-w-full text-left px-4 py-2.5 rounded font-sans text-sm leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere] ' +
            (mine ? 'bg-primary-container text-paper rounded-br-sm' : 'bg-surface-container-low text-primary border border-primary/10 rounded-bl-sm') + '">' + esc(m.text || '') + '</div>' +
        '</div></li>';
    }).join('');
    return '<section class="' + CARD + '" id="messages">' + cardHead('Messages', tt('m.title')) +
      (bubbles ? '<ol class="space-y-4 max-h-[28rem] overflow-y-auto pr-1" id="thread">' + bubbles + '</ol>' : '<p class="font-sans text-sm text-on-surface-variant break-keep">' + esc(tt('m.empty')) + '</p>') +
      '<div class="space-y-3 pt-3 border-t border-primary/10">' +
        '<label class="sr-only" for="m-text">' + esc(tt('m.ph')) + '</label>' +
        '<textarea class="w-full bg-surface-container-lowest border border-primary/20 rounded px-4 py-3 text-sm text-primary placeholder:text-on-surface-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition font-sans resize-y" rows="3" maxlength="3000" id="m-text" placeholder="' + esc(tt('m.ph')) + '">' + esc(draft.msg) + '</textarea>' +
        '<div class="flex items-center justify-between gap-3">' +
          '<p class="font-sans text-xs text-on-surface-variant min-w-0" id="m-status" role="status" aria-live="polite">' + esc(flash.msg) + '</p>' +
          '<button class="shrink-0 py-2.5 px-6 bg-secondary hover:bg-secondary/90 disabled:opacity-60 text-on-secondary font-label-md text-label-md uppercase tracking-[0.2em] rounded transition flex items-center gap-2" type="button" data-act="send"' + (busy ? ' disabled' : '') + '>' + esc(busy ? tt('m.sending') : tt('m.send')) + ' <span aria-hidden="true">↗</span></button>' +
        '</div></div></section>';
  }

  function timelineCard(list) {
    var items = (list || []).slice().reverse().map(function (e, i) {
      return '<li class="relative pl-6">' +
        '<span class="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full ' + (i === 0 ? 'bg-emerald' : 'bg-primary/20') + ' ring-4 ring-surface-container-lowest"></span>' +
        '<p class="font-sans text-sm font-semibold text-primary break-keep">' + esc(window.DRS.lang() === 'ko' && e.label ? e.label : stLabel(e.status, e.label)) + '</p>' +
        '<p class="font-sans text-xs text-on-surface-variant">' + esc(window.DRS.fmtTs(e.ts)) + '</p>' +
        (e.note ? '<p class="font-sans text-xs text-on-surface-variant leading-relaxed mt-1 whitespace-pre-line break-keep [overflow-wrap:anywhere]">' + esc(e.note) + '</p>' : '') +
      '</li>';
    }).join('');
    return '<section class="' + CARD + '">' + cardHead('Timeline', tt('tl.title')) +
      (items ? '<ol class="relative space-y-5 before:absolute before:left-[4px] before:top-2 before:bottom-2 before:w-px before:bg-primary/15">' + items + '</ol>'
        : '<p class="font-sans text-sm text-on-surface-variant">' + esc(tt('tl.empty')) + '</p>') +
    '</section>';
  }

  function render() {
    if (errState) { showState(errState[0], errState[1], errState[2]); return; }
    if (!DATA) { return; }
    var req = DATA.request || {};
    document.getElementById('cs-state').classList.add('hidden');
    document.getElementById('cs-app').classList.remove('hidden');
    document.getElementById('cs-main').innerHTML = headerCard(req) + quoteCard(DATA.quote) + contractCard(DATA.contract) +
      paymentCard(DATA.payment) + deliverablesCard(DATA.deliverables) + messagesCard(DATA.messages);
    document.getElementById('cs-side').innerHTML = timelineCard(DATA.timeline);
    var th = document.getElementById('thread');
    if (th) { th.scrollTop = th.scrollHeight; }
  }

  // ---------- data ----------
  function load() {
    errState = null;
    var st = document.getElementById('cs-state');
    if (!DATA) { st.classList.remove('hidden'); st.innerHTML = '<span>' + esc(tt('loading')) + '</span>'; }
    return window.DRS.api({ action: 'cs_get', id: id, token: token }, 30000).then(function (j) {
      if (j && j.ok) { DATA = j; render(); return; }
      errState = j && j.error === 'auth' ? ['err.auth.t', 'err.auth', false] : ['err.net.t', 'err.net', true];
      DATA = null; render();
    }, function () {
      if (DATA) { return; }   // keep the page we already have on a failed refresh
      errState = ['err.net.t', 'err.net', true]; render();
    });
  }

  function quote(decision) {
    if (busy) { return; }
    if (decision === 'decline' && !window.confirm(tt('q.confirmDecline'))) { return; }
    var noteEl = document.getElementById('q-note');
    busy = true; flash.quote = tt('working'); render();
    window.DRS.api({ action: 'cs_quote', id: id, token: token, decision: decision, note: noteEl ? noteEl.value.trim() : draft.qnote }, 30000)
      .then(function (j) {
        busy = false;
        if (j && j.ok) { draft.qnote = ''; flash.quote = tt(decision === 'accept' ? 'q.done.accept' : 'q.done.decline'); return load(); }
        flash.quote = tt('err.action'); render();
      }, function () { busy = false; flash.quote = tt('err.action'); render(); });
  }

  function send() {
    if (busy) { return; }
    var el = document.getElementById('m-text');
    var text = el ? el.value.trim() : '';
    if (!text) { if (el) { el.focus(); } return; }
    if (text.length > 3000) { flash.msg = tt('m.tooLong'); render(); return; }
    busy = true; draft.msg = text; flash.msg = ''; render();
    window.DRS.api({ action: 'cs_post', id: id, token: token, text: text }, 30000)
      .then(function (j) {
        busy = false;
        if (j && j.ok) { draft.msg = ''; flash.msg = tt('m.sent'); return load(); }
        flash.msg = tt('err.action'); render();
      }, function () { busy = false; flash.msg = tt('err.action'); render(); });
  }

  function init() {
    id = window.DRS.qs('id').trim().slice(0, 64);
    token = window.DRS.qs('t').trim().slice(0, 256);
    window.DRS.initPage({ T: T, onLang: function () { render(); } });
    document.addEventListener('input', function (e) {
      if (e.target.id === 'm-text') { draft.msg = e.target.value; }
      if (e.target.id === 'q-note') { draft.qnote = e.target.value; }
    });
    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-act]') : null;
      if (!b) { return; }
      var act = b.getAttribute('data-act');
      if (act === 'retry') { load(); }
      else if (act === 'accept' || act === 'decline') { quote(act); }
      else if (act === 'send') { send(); }
    });
    if (!id || !token) { errState = ['err.params.t', 'err.params', false]; render(); return; }
    // Product names for the selected-services chips (optional).
    window.DRS.getJSON(document.body.getAttribute('data-pricing') || '../assets/data/pricing.json').then(function (d) {
      (d.items || []).forEach(function (it) { NAMES[it.code] = { ko: it.ko, en: it.en }; });
      render();
    }, function () { /* codes only */ });
    load();
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
}());
