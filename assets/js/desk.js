/* Channel Operation Desk sample (/desk/): renders assets/data/desk-sample.json and talks to the backend `desk` action. */
(function () {
  'use strict';
  var D = window.DRS, esc = D.esc;
  var DATA = null, HISTORY = [], BUSY = false, TABLE = { reach: false, inq: false };

  var T = {
    ko: {
      'page.title': '채널 운영 데스크 샘플 — Dr.Studio',
      'banner.tag': '샘플', 'banner.text': '가상의 고객 데이터로 만든 예시 화면입니다. 실제 고객에게는 고객 채널의 숫자로 채운 전용 데스크를 드립니다.', 'banner.link': '채널 운영 가격 보기',
      'head.title': '채널 운영 데스크', 'head.sub': '저희가 운영하는 채널의 결과를 한 화면에서 확인하고, 오른쪽 AI에게 물어보세요.',
      'kpi.prev': '직전 4주', 'reach.title': '주별 도달', 'reach.sub': '최근 8주 · 세 채널 합계', 'inq.title': '주별 문의·예약 클릭', 'inq.sub': '최근 8주',
      'view.table': '표로 보기', 'view.chart': '그래프로 보기', 'th.week': '주 시작일', 'th.reach': '도달', 'th.inq': '문의 클릭',
      'ch.title': '채널별 성과', 'ch.sub': '최근 4주', 'th.channel': '채널', 'th.posts': '게시', 'th.eng': '참여율', 'th.fol': '팔로워', 'th.new': '순증',
      'posts.title': '게시물별 성과', 'posts.sub': '최근 4주에 올린 12편 · 조회 많은 순', 'th.date': '게시일', 'th.title': '제목', 'th.format': '포맷', 'th.views': '조회', 'th.saves': '저장',
      'cal.title': '다음 게시 일정', 'prog.title': '진행 상황', 'prog.this': '이번 기간 게시', 'prog.next': '다음 기간 예약', 'prog.unit': '편',
      'ai.title': '마케팅 전문 AI : Dr.Studio에게 물어보세요', 'ai.lead': '이 화면의 숫자를 읽고 요약하고, 다음에 무엇을 할지 제안합니다.',
      'ai.q1': '요약', 'ai.q2': '주간 브리프', 'ai.q3': '솔루션 제안',
      'ai.u1': '이 대시보드를 요약해 주세요.', 'ai.u2': '이번 주 브리프를 써 주세요.', 'ai.u3': '다음 달에 할 조치를 제안해 주세요.',
      'ai.ph': '예: 어떤 포맷을 더 늘려야 하나요?', 'ai.send': '보내기',
      'ai.hello': '위 버튼을 누르거나 궁금한 것을 물어보세요. 예: “문의가 가장 많이 나온 게시물의 공통점은?”',
      'ai.fine': 'AI 답변은 화면의 샘플 데이터만 근거로 하며 결과를 보장하지 않습니다. 입력하신 질문은 답변 생성에만 쓰입니다.',
      'ai.wait': '숫자를 읽는 중', 'err.limit': '오늘 준비된 시험 횟수를 모두 썼습니다. 내일 다시 시도해 주세요.', 'err.net': '연결이 원활하지 않습니다. 잠시 뒤 다시 시도해 주세요.', 'err.etc': '지금은 답을 만들지 못했습니다. 잠시 뒤 다시 시도해 주세요.',
      'cta.text': '채널 운영을 맡기시면 고객님 채널의 숫자로 채운 운영 데스크를 만들어 드립니다. 결과는 데스크에서 확인하시고, 다음 할 일은 AI에게 물어보시면 됩니다.', 'cta.btn': '의뢰서 작성하기'
    },
    en: {
      'page.title': 'Channel Operation Desk sample — Dr.Studio',
      'banner.tag': 'Sample', 'banner.text': 'An example screen built on data for a fictional client. Real clients get their own desk filled with their channels’ numbers.', 'banner.link': 'See channel operation pricing',
      'head.title': 'Channel Operation Desk', 'head.sub': 'See the results of the channels we run on one screen, and ask the AI on the right.',
      'kpi.prev': 'previous 4 weeks', 'reach.title': 'Weekly reach', 'reach.sub': 'Last 8 weeks · three channels combined', 'inq.title': 'Weekly inquiry clicks', 'inq.sub': 'Last 8 weeks',
      'view.table': 'View as table', 'view.chart': 'View as chart', 'th.week': 'Week of', 'th.reach': 'Reach', 'th.inq': 'Inquiry clicks',
      'ch.title': 'By channel', 'ch.sub': 'Last 4 weeks', 'th.channel': 'Channel', 'th.posts': 'Posts', 'th.eng': 'Engagement', 'th.fol': 'Followers', 'th.new': 'New',
      'posts.title': 'By post', 'posts.sub': '12 posts from the last 4 weeks · most viewed first', 'th.date': 'Date', 'th.title': 'Title', 'th.format': 'Format', 'th.views': 'Views', 'th.saves': 'Saves',
      'cal.title': 'Upcoming posts', 'prog.title': 'Progress', 'prog.this': 'Published this period', 'prog.next': 'Scheduled for next period', 'prog.unit': '',
      'ai.title': 'Marketing AI : Ask Dr.Studio', 'ai.lead': 'It reads the numbers on this screen, sums them up and suggests what to do next.',
      'ai.q1': 'Summary', 'ai.q2': 'Weekly brief', 'ai.q3': 'Solutions',
      'ai.u1': 'Summarize this dashboard.', 'ai.u2': 'Write this week’s brief.', 'ai.u3': 'Suggest actions for next month.',
      'ai.ph': 'e.g. Which format should we make more of?', 'ai.send': 'Send',
      'ai.hello': 'Press a button above or ask anything. e.g. “What do the posts with the most inquiries have in common?”',
      'ai.fine': 'Answers rely only on the sample data on this screen and do not guarantee results. Your question is used only to generate the answer.',
      'ai.wait': 'Reading the numbers', 'err.limit': 'Today’s demo quota is used up. Please try again tomorrow.', 'err.net': 'The connection is unstable. Please try again shortly.', 'err.etc': 'No answer could be produced right now. Please try again shortly.',
      'cta.text': 'When we run your channels, we build a desk filled with your own numbers. Check the results there and ask the AI what to do next.', 'cta.btn': 'Fill in the request form'
    }
  };

  function L() { return D.lang(); }
  function num(n) { return Number(n).toLocaleString('en-US'); }
  function el(id) { return document.getElementById(id); }

  function renderHead() {
    var l = L();
    el('desk-meta').innerHTML = [DATA.client[l], DATA.plan[l], DATA.period[l]].map(function (s) { return '<span class="chip"><i></i>' + esc(s) + '</span>'; }).join('');
  }

  function renderKpis() {
    var l = L();
    el('kpis').innerHTML = DATA.kpis.map(function (k) {
      var diff, cls = k.value >= k.prev ? 'up' : 'down', sign = k.value >= k.prev ? '+' : '−';
      if (k.unit === '%') { diff = sign + Math.abs(k.value - k.prev).toFixed(1) + '%p'; }
      else { diff = sign + Math.abs((k.value - k.prev) / k.prev * 100).toFixed(0) + '%'; }
      var v = k.unit === '%' ? k.value.toFixed(1) + '%' : (k.key === 'followers' ? '+' : '') + num(k.value);
      var pv = k.unit === '%' ? k.prev.toFixed(1) + '%' : num(k.prev);
      return '<div class="kpi"><div class="l">' + esc(k[l]) + '</div><div class="v">' + v + '</div>' +
        '<div class="d"><b class="' + cls + '">' + (cls === 'up' ? '▲ ' : '▼ ') + diff + '</b> · ' + esc(D.t('kpi.prev')) + ' ' + pv + '</div></div>';
    }).join('');
  }

  function niceStep(m) { var p = Math.pow(10, Math.floor(Math.log10(m))); var s = m / p; return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * p; }

  // One series per chart (title names it, so no legend). Line: crosshair + tooltip. Bars: per-mark tooltip.
  function chartSVG(kind, vals, labels, W) {
    var H = 230, pl = 44, pr = 14, pt = 18, pb = 28, iw = W - pl - pr, ih = H - pt - pb;
    var top = Math.max.apply(null, vals), stepv = niceStep(top / 4), nt = Math.ceil(top / stepv), max = stepv * nt, n = vals.length, i, s = '';
    for (i = 0; i <= nt; i++) {
      var gy = pt + ih - ih * i / nt, gv = stepv * i;
      s += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + gy + '" y2="' + gy + '" stroke="rgba(11,65,60,' + (i === 0 ? '.35' : '.09') + ')" stroke-width="1"/>' +
        '<text x="' + (pl - 8) + '" y="' + (gy + 4) + '" text-anchor="end">' + (gv >= 1000 ? (gv / 1000) + 'k' : gv) + '</text>';
    }
    var step = iw / n, xs = [], ys = [];
    for (i = 0; i < n; i++) {
      xs.push(kind === 'line' ? pl + iw * i / (n - 1) : pl + step * i + step / 2);
      ys.push(pt + ih - ih * vals[i] / max);
      s += '<text x="' + xs[i] + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(labels[i]) + '</text>';
    }
    if (kind === 'line') {
      s += '<line x1="' + xs[4] + '" x2="' + xs[4] + '" y1="' + pt + '" y2="' + (pt + ih) + '" stroke="rgba(11,65,60,.25)" stroke-dasharray="3 4"/>';
      s += '<polyline fill="none" stroke="#00A39B" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" points="' + xs.map(function (x, k) { return x + ',' + ys[k]; }).join(' ') + '"/>';
      for (i = 0; i < n; i++) { s += '<circle cx="' + xs[i] + '" cy="' + ys[i] + '" r="4" fill="#00A39B" stroke="#fff" stroke-width="2"/>'; }
      s += '<text class="val" x="' + xs[n - 1] + '" y="' + (ys[n - 1] - 10) + '" text-anchor="end">' + num(vals[n - 1]) + '</text>';
      s += '<line class="cross" x1="0" x2="0" y1="' + pt + '" y2="' + (pt + ih) + '" stroke="#0b413c" stroke-width="1" opacity="0"/>';
    } else {
      var bw = Math.min(28, step - 10);
      for (i = 0; i < n; i++) {
        var h = pt + ih - ys[i];
        s += '<path d="M' + (xs[i] - bw / 2) + ' ' + (pt + ih) + 'v' + (-(h - 4)) + 'q0 -4 4 -4h' + (bw - 8) + 'q4 0 4 4v' + (h - 4) + 'z" fill="#00A39B" opacity="' + (i < 4 ? '.45' : '1') + '"/>';
      }
      s += '<text class="val" x="' + xs[n - 1] + '" y="' + (ys[n - 1] - 6) + '" text-anchor="middle">' + num(vals[n - 1]) + '</text>';
    }
    for (i = 0; i < n; i++) {
      s += '<rect class="hit" data-i="' + i + '" data-x="' + xs[i] + '" data-y="' + ys[i] + '" x="' + (xs[i] - step / 2) + '" y="' + pt + '" width="' + step + '" height="' + ih + '" fill="transparent"/>';
    }
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img">' + s + '</svg><div class="tip"></div>';
  }

  function weekTable(vals, head) {
    return '<div class="tbl-wrap"><table class="tbl" style="min-width:0"><thead><tr><th>' + esc(D.t('th.week')) + '</th><th>' + esc(head) + '</th></tr></thead><tbody>' +
      DATA.weeks.labels.map(function (w, i) { return '<tr><td>' + esc(w) + '</td><td>' + num(vals[i]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }

  function renderCharts() {
    var w = DATA.weeks;
    [['reach', 'line', w.reach, 'th.reach', 560], ['inq', 'bar', w.inquiries, 'th.inq', 380]].forEach(function (c) {
      var box = el('chart-' + c[0]);
      box.innerHTML = TABLE[c[0]] ? weekTable(c[2], D.t(c[3])) : chartSVG(c[1], c[2], w.labels, c[4]);
      el('toggle-' + c[0]).textContent = D.t(TABLE[c[0]] ? 'view.chart' : 'view.table');
      if (TABLE[c[0]]) { return; }
      var svg = box.querySelector('svg'), tip = box.querySelector('.tip'), cross = box.querySelector('.cross');
      function show(r) {
        var i = Number(r.getAttribute('data-i')), bb = svg.getBoundingClientRect(), k = bb.width / c[4];
        tip.textContent = w.labels[i] + ' · ' + num(c[2][i]);
        tip.style.left = (Number(r.getAttribute('data-x')) * k) + 'px';
        tip.style.top = (Number(r.getAttribute('data-y')) * k - 10) + 'px';
        tip.classList.add('on');
        if (cross) { cross.setAttribute('x1', r.getAttribute('data-x')); cross.setAttribute('x2', r.getAttribute('data-x')); cross.setAttribute('opacity', '.35'); }
      }
      function hide() { tip.classList.remove('on'); if (cross) { cross.setAttribute('opacity', '0'); } }
      box.querySelectorAll('.hit').forEach(function (r) {
        r.addEventListener('mouseenter', function () { show(r); });
        r.addEventListener('touchstart', function () { show(r); }, { passive: true });
      });
      svg.addEventListener('mouseleave', hide);
    });
  }

  function renderChannels() {
    var l = L(), max = Math.max.apply(null, DATA.channels.map(function (c) { return c.reach; }));
    el('channels').innerHTML = '<thead><tr><th>' + esc(D.t('th.channel')) + '</th><th>' + esc(D.t('th.posts')) + '</th><th>' + esc(D.t('th.reach')) + '</th><th>' + esc(D.t('th.eng')) +
      '</th><th>' + esc(D.t('th.fol')) + '</th><th>' + esc(D.t('th.new')) + '</th><th>' + esc(D.t('th.inq')) + '</th></tr></thead><tbody>' +
      DATA.channels.map(function (c) {
        return '<tr><td class="title">' + esc(c[l]) + '</td><td>' + c.posts + '</td><td><div class="bar">' + num(c.reach) + '<span style="width:' + Math.round(c.reach / max * 110) + 'px"></span></div></td><td>' +
          c.engagement.toFixed(1) + '%</td><td>' + num(c.followers) + '</td><td class="up">+' + num(c.followers_new) + '</td><td>' + c.inquiries + '</td></tr>';
      }).join('') + '</tbody>';
  }

  function renderPosts() {
    var l = L(), rows = DATA.posts.slice().sort(function (a, b) { return b.views - a.views; });
    el('posts').innerHTML = '<thead><tr><th>' + esc(D.t('th.date')) + '</th><th class="tl">' + esc(D.t('th.title')) + '</th><th class="tl">' + esc(D.t('th.channel')) + '</th><th class="tl">' + esc(D.t('th.format')) +
      '</th><th>' + esc(D.t('th.views')) + '</th><th>' + esc(D.t('th.eng')) + '</th><th>' + esc(D.t('th.saves')) + '</th><th>' + esc(D.t('th.inq')) + '</th></tr></thead><tbody>' +
      rows.map(function (p, i) {
        return '<tr' + (i < 3 ? ' class="best"' : '') + '><td class="mut">' + esc(p.date) + '</td><td class="tl title">' + esc(p[l]) + '</td><td class="tl mut">' + esc(DATA.channels[p.ch][l]) +
          '</td><td class="tl"><span class="tag">' + esc(DATA.formats[p.format][l]) + '</span></td><td>' + num(p.views) + '</td><td>' + p.engagement.toFixed(1) + '%</td><td>' + num(p.saves) + '</td><td>' + p.inquiries + '</td></tr>';
      }).join('') + '</tbody>';
    el('posts-note').textContent = DATA.notes[l];
  }

  function renderCalendar() {
    var l = L(), p = DATA.progress;
    el('calendar').innerHTML = DATA.calendar.map(function (c) {
      return '<li><span class="dt">' + esc(c.date) + '</span><span class="t">' + esc(c[l]) + '<small>' + esc(DATA.channels[c.ch][l]) + ' · ' + esc(DATA.formats[c.format][l]) + '</small></span>' +
        '<span class="st ' + esc(c.status) + '">' + esc(DATA.statuses[c.status][l]) + '</span></li>';
    }).join('');
    var u = D.t('prog.unit');
    el('progress').innerHTML = [['prog.this', p.published, p.planned], ['prog.next', p.next_scheduled, p.next_planned]].map(function (r) {
      return '<div style="margin-top:14px"><div style="display:flex;justify-content:space-between;font-size:13px"><span>' + esc(D.t(r[0])) + '</span><b style="font-variant-numeric:tabular-nums">' + r[1] + ' / ' + r[2] + esc(u) +
        '</b></div><div class="prog"><span style="width:' + Math.round(r[1] / r[2] * 100) + '%"></span></div></div>';
    }).join('');
  }

  function renderAll() {
    if (!DATA) { return; }
    renderHead(); renderKpis(); renderCharts(); renderChannels(); renderPosts(); renderCalendar();
    if (!HISTORY.length) { el('ai-log').innerHTML = '<div class="msg sys">' + esc(D.t('ai.hello')) + '</div>'; }
  }

  // ---------- AI ----------
  function addMsg(cls, text) {
    var log = el('ai-log'), d = document.createElement('div');
    d.className = 'msg ' + cls; d.textContent = text; log.appendChild(d); log.scrollTop = log.scrollHeight;
    return d;
  }
  function setBusy(b) {
    BUSY = b;
    document.querySelectorAll('#ai-quick button, #ai-form button, #ai-form input').forEach(function (x) { x.disabled = b; });
  }
  function dataForAI() {
    var l = L(), d = DATA;
    return JSON.stringify({
      client: d.client[l], plan: d.plan[l], period: d.period[l],
      kpis: d.kpis.map(function (k) { return { name: k[l], last4w: k.value, prev4w: k.prev, unit: k.unit }; }),
      weekly: { week_start: d.weeks.labels, reach: d.weeks.reach, inquiry_clicks: d.weeks.inquiries },
      channels: d.channels.map(function (c) { return { name: c[l], posts: c.posts, reach: c.reach, engagement_pct: c.engagement, followers: c.followers, new_followers: c.followers_new, inquiry_clicks: c.inquiries }; }),
      posts: d.posts.map(function (p) { return { date: p.date, channel: d.channels[p.ch][l], format: d.formats[p.format][l], title: p[l], views: p.views, engagement_pct: p.engagement, saves: p.saves, inquiry_clicks: p.inquiries }; }),
      upcoming: d.calendar.map(function (c) { return { date: c.date, channel: d.channels[c.ch][l], format: d.formats[c.format][l], title: c[l], status: d.statuses[c.status][l] }; }),
      progress: d.progress, notes: d.notes[l]
    });
  }
  function ask(mode, userText) {
    if (BUSY || !DATA) { return; }
    if (!HISTORY.length) { el('ai-log').innerHTML = ''; }
    addMsg('user', userText);
    var wait = addMsg('bot wait', D.t('ai.wait'));
    setBusy(true);
    var payload = { action: 'desk', lang: L(), mode: mode, data: dataForAI(), messages: HISTORY.slice(-6).concat(mode === 'chat' ? [{ role: 'user', text: userText }] : []) };
    D.api(payload, 60000).then(function (r) {
      if (r && r.ok && r.text) {
        wait.className = 'msg bot'; wait.innerHTML = D.linkHTML(r.text);
        HISTORY.push({ role: 'user', text: userText }, { role: 'assistant', text: r.text });
      } else {
        wait.className = 'msg sys'; wait.textContent = D.t(r && r.error === 'limit' ? 'err.limit' : 'err.etc');
      }
    }).catch(function () {
      wait.className = 'msg sys'; wait.textContent = D.t('err.net');
    }).then(function () { setBusy(false); el('ai-log').scrollTop = el('ai-log').scrollHeight; });
  }

  document.addEventListener('DOMContentLoaded', function () {
    D.initPage({ T: T, onLang: renderAll });
    el('ai-quick').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) { return; }
      var m = b.getAttribute('data-mode');
      ask(m, D.t({ summary: 'ai.u1', brief: 'ai.u2', solutions: 'ai.u3' }[m]));
    });
    el('ai-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var inp = el('ai-input'), q = inp.value.trim().slice(0, 500);
      if (!q) { return; }
      inp.value = ''; ask('chat', q);
    });
    ['reach', 'inq'].forEach(function (k) {
      el('toggle-' + k).addEventListener('click', function () { TABLE[k] = !TABLE[k]; renderCharts(); });
    });
    D.getJSON(document.body.getAttribute('data-desk')).then(function (d) { DATA = d; renderAll(); });
  });
}());
