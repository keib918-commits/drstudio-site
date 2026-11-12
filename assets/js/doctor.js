/* "닥터" (Doctor): the Dr.Studio customer-service AI. A floating button opens a chat panel that talks to the backend `doctor` action.
   Needs common.js (DRS.api). Language follows <html lang>. */
(function () {
  'use strict';
  var T = {
    ko: {
      open: '닥터에게 물어보기', title: '닥터', sub: 'Dr.Studio AI 상담', close: '닫기',
      hello: '안녕하세요, Dr.Studio의 AI 상담원 닥터입니다. 가격, 상품 선택, 제작 과정 등 궁금한 점을 물어보세요.',
      chips: ['가격이 궁금해요', '어떤 상품이 맞을까요?', '제작은 얼마나 걸리나요?'],
      ph: '궁금한 점을 입력하세요', send: '보내기', wait: '답변을 쓰는 중',
      fine: 'AI 답변은 참고용이며, 정확한 견적은 의뢰서 검토 후 보내 드립니다.',
      limit: '오늘 상담 가능 횟수를 모두 썼습니다. 의뢰서나 메일로 문의해 주세요.', net: '연결이 원활하지 않습니다. 잠시 뒤 다시 시도해 주세요.', etc: '지금은 답을 드리지 못했습니다. 잠시 뒤 다시 시도해 주세요.',
      form: '의뢰서 작성하기'
    },
    en: {
      open: 'Ask Doctor', title: 'Doctor', sub: 'Dr.Studio AI assistant', close: 'Close',
      hello: 'Hello, I am Doctor, the Dr.Studio AI assistant. Ask me about prices, which product fits, or how production works.',
      chips: ['How much does it cost?', 'Which product fits me?', 'How long does it take?'],
      ph: 'Type your question', send: 'Send', wait: 'Writing an answer',
      fine: 'AI answers are for reference. An exact quote follows after we review your request.',
      limit: 'Today’s chat quota is used up. Please use the request form or email.', net: 'The connection is unstable. Please try again shortly.', etc: 'No answer could be produced right now. Please try again shortly.',
      form: 'Fill in the request form'
    }
  };
  var BASE = ((document.currentScript && document.currentScript.src) || '').replace(/assets\/js\/doctor\.js.*$/, '');
  var HISTORY = [], BUSY = false, root, log, input, built = false;
  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ko'; }
  function t(k) { return T[lang()][k]; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) { e.className = cls; } if (text !== undefined) { e.textContent = text; } return e; }

  function addMsg(cls, text) { var d = el('div', 'dr-msg ' + cls, text); log.appendChild(d); log.scrollTop = log.scrollHeight; return d; }
  function setBusy(b) { BUSY = b; root.querySelectorAll('.dr-chip, .dr-form button, .dr-form input').forEach(function (x) { x.disabled = b; }); }

  function ask(q) {
    q = String(q || '').trim().slice(0, 500);
    if (!q || BUSY) { return; }
    var chips = root.querySelector('.dr-chips'); if (chips) { chips.remove(); }
    addMsg('dr-user', q);
    var wait = addMsg('dr-bot dr-wait', t('wait'));
    setBusy(true);
    window.DRS.api({ action: 'doctor', lang: lang(), messages: HISTORY.slice(-8).concat([{ role: 'user', text: q }]) }, 60000).then(function (r) {
      if (r && r.ok && r.text) {
        wait.className = 'dr-msg dr-bot'; wait.innerHTML = window.DRS.linkHTML(r.text);
        HISTORY.push({ role: 'user', text: q }, { role: 'assistant', text: r.text });
      } else { wait.className = 'dr-msg dr-sys'; wait.textContent = t(r && r.error === 'limit' ? 'limit' : 'etc'); }
    }).catch(function () { wait.className = 'dr-msg dr-sys'; wait.textContent = t('net'); })
      .then(function () { setBusy(false); log.scrollTop = log.scrollHeight; input.focus(); });
  }

  function build() {
    built = true;
    var panel = el('div', 'dr-panel'); panel.id = 'dr-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', t('title'));
    var head = el('div', 'dr-head');
    var who = el('div', 'dr-who'); who.appendChild(el('span', 'dr-avatar', 'Dr.'));
    var names = el('div'); names.appendChild(el('strong', 'dr-name', t('title'))); names.appendChild(el('span', 'dr-sub', t('sub'))); who.appendChild(names);
    var x = el('button', 'dr-close', '×'); x.type = 'button'; x.setAttribute('aria-label', t('close')); x.addEventListener('click', toggle);
    head.appendChild(who); head.appendChild(x);
    log = el('div', 'dr-log'); log.setAttribute('aria-live', 'polite');
    var form = el('form', 'dr-form'); form.setAttribute('autocomplete', 'off');
    input = el('input'); input.type = 'text'; input.maxLength = 500; input.placeholder = t('ph'); input.setAttribute('aria-label', t('ph'));
    var send = el('button', '', t('send')); send.type = 'submit';
    form.appendChild(input); form.appendChild(send);
    form.addEventListener('submit', function (e) { e.preventDefault(); var q = input.value; input.value = ''; ask(q); });
    var foot = el('p', 'dr-fine', t('fine') + ' ');
    var a = el('a', '', t('form')); a.href = BASE + 'request/';
    foot.appendChild(a);
    panel.appendChild(head); panel.appendChild(log); panel.appendChild(form); panel.appendChild(foot);
    root.appendChild(panel);
    addMsg('dr-bot', t('hello'));
    var chips = el('div', 'dr-chips');
    t('chips').forEach(function (c) { var b = el('button', 'dr-chip', c); b.type = 'button'; b.addEventListener('click', function () { ask(c); }); chips.appendChild(b); });
    log.appendChild(chips);
  }

  function toggle() {
    if (!built) { build(); }
    var open = root.classList.toggle('is-open');
    root.querySelector('.dr-fab').setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) { setTimeout(function () { input.focus(); }, 50); }
  }

  function start() {
    if (!window.DRS || document.getElementById('dr-root')) { return; }
    root = el('div', 'dr-root'); root.id = 'dr-root';
    var fab = el('button', 'dr-fab'); fab.type = 'button'; fab.setAttribute('aria-controls', 'dr-panel'); fab.setAttribute('aria-expanded', 'false');
    fab.appendChild(el('span', 'dr-fab__dot')); fab.appendChild(el('span', 'dr-fab__mark', 'Dr.'));
    var label = el('span', 'dr-fab__label', t('open')); fab.appendChild(label);
    fab.addEventListener('click', toggle);
    root.appendChild(fab);
    document.body.appendChild(root);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('is-open')) { toggle(); } });
    new MutationObserver(function () {
      label.textContent = t('open');
      if (built && !HISTORY.length) { root.querySelector('.dr-panel').remove(); built = false; if (root.classList.contains('is-open')) { build(); } }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); } else { start(); }
}());
