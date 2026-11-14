/* Dr.Studio site behaviour: KO/EN switch, portfolio grid + filters, video dialog, email links, mobile menu. */
(function () {
  'use strict';

  // Contact address: change here only.
  var EMAIL_USER = 'contact';
  var EMAIL_DOMAIN = 'drstudio.site';
  var YT_CHANNEL = 'https://www.youtube.com/@Creative.AI.Production';

  var I18N = {
    ko: {
      'hero.title': '광고주 머릿속의 그림을,<br><em>AI로 꺼내 드립니다.</em>',
      'hero.sub': '막연한 그림이라도 괜찮습니다. AI로 확인하면서 또렷하게 만들어드립니다.',
      'hero.p1': '확인 단계 4번', 'hero.p2': '기획은 마케터와 함께', 'hero.p3': '컷 수정 3회 포함',
      'hero.side': '브랜드를 먼저 읽고 이야기를 설계합니다. 장면과 인물, 목소리는 AI로 만듭니다.',
      'hero.cta': '포트폴리오 보기',
      'about.label': '01 / About',
      'about.title': '브리프를 받아<br>완성된 광고로 돌려드립니다.',
      'about.body': 'Dr.Studio는 AI로 고객의 니즈에 맞는 광고 영상을 만드는 회사입니다. 브랜드와 타깃을 먼저 읽고, 그에 맞는 이야기와 장면을 설계합니다.',
      'about.pv.label': 'What we provide',
      'about.pv.lead': '광고 영상부터 랜딩 페이지, 운영 데스크까지 한 번에 제공합니다.',
      'about.pv.1t': '광고 영상',
      'about.pv.1d': '보는 사람이 멈춰 서는 광고를 만듭니다.',
      'about.pv.2t': '랜딩 페이지',
      'about.pv.2d': '광고로 들어온 고객을 결제까지 잇습니다.',
      'about.pv.3t': '운영 데스크',
      'about.pv.3d': '결과를 한 화면에서 보고, AI에게 다음 할 일을 묻습니다.',
      'ops.focus': '데스크의 숫자를 보고 효과가 있는 곳에 집중하고, 효과 없는 광고는 줄여 비용을 아낍니다.',
      'about.box': '광고 기획부터 AI 영상 제작, 언어별 현지화까지 한 팀에서 진행합니다.',
      'about.s1': '광고 영상', 'about.s2': '발주처', 'about.s3': '언어',
      'about.p1t': '브랜드 읽기', 'about.p1d': '브랜드와 타깃, 판매 채널을 먼저 확인하고 광고가 해야 할 일을 정합니다.',
      'about.p2t': '이야기 설계', 'about.p2d': '전할 메시지를 장면 단위로 나눠 대본과 구성을 짭니다.',
      'about.p3t': 'AI 제작과 현지화', 'about.p3d': '장면과 인물, 목소리를 AI로 만들고, 필요하면 언어별로 다시 만듭니다.',
      'why.label': '01 / About · 강점',
      'why.t1': '마케팅 전문가', 'why.t2': 'AI', 'why.t3': '크리에이티브한 콘텐츠', 'why.t4': '빠른 제작',
      'why.d1': '누구에게 무엇을 말할지, 어디에 집행할지 먼저 정합니다.',
      'why.d2': '장면과 인물, 목소리를 AI로 생성합니다.',
      'why.d3': '보는 사람이 멈춰 서는 이야기로 만듭니다.',
      'why.d4': '통상 2~3일 안에 최종본을 완성합니다. 세트와 촬영이 없어 일정이 짧습니다.',
      'why.proof': '광고 한 편을 8개 언어로 현지화했습니다.',
      'why.proofsub': '같은 이야기를 나라별 배우와 세트, 원어 대사로 다시 만들었습니다.',
      'price.label': '01 / About · Why Dr.Studio', 'price.cta': '가격 안내 보기',
      'price.title': '사람의 일을 AI로 바꾼 것이 아니라, 광고 제작 공정 전체를 AI로 바꿨습니다',
      'price.lead': '사람이 하던 작업 몇 가지를 AI에 맡기는 것만으로는 가격도 속도도 크게 달라지지 않습니다. 저희는 기획부터 제작·현지화·납품·집행까지 공정 전체를 AI 위에 다시 짰습니다. 그래서 사람이 만들던 수준 이상의 품질을, 낮은 가격에, 많은 편수로 드릴 수 있습니다.',
      'price.not': '대신 하지 않는 것도 분명합니다: 실사 촬영과 무제한 수정은 하지 않습니다. 컷 수정은 3회까지 포함되며, 이후에는 컷별로 추가 요금이 붙습니다.',
      'price.t1': '공정 전체가 AI', 'price.d1': '기획·대본·장면·인물·목소리·편집·현지화가 한 공정 안에서 이어집니다. 단계마다 사람과 외주를 거치며 생기던 대기와 재작업이 없어, 통상 2~3일 안에 최종본이 나옵니다.',
      'price.t2': '촬영 없는 제작', 'price.d2': '장면과 인물, 목소리를 AI로 만듭니다. 촬영·세트·배우·장소에 들던 비용과 일정 제약이 처음부터 없어, 예산이 아니라 기획이 장면을 정합니다.',
      'price.t3': '만들수록 쌓이는 제작 자산', 'price.d3': '광고 22편을 만들며 쌓은 인물·세트·목소리·연출 틀을 다음 영상에 다시 씁니다. 편수가 늘수록 더 빠르고 고른 품질로 나옵니다. 광고 한 편을 8개 언어로 현지화한 것도 같은 방식입니다.',
      'price.t4': '상담과 보고까지 공정 안에', 'price.d4': '의뢰서의 AI 도우미가 상담을 대신하고, 진행 현황 페이지가 보고를 대신합니다. 포맷을 세 가지로 표준화해 여러 편을 동시에 진행해도 품질이 흔들리지 않습니다.',
      'price.t5': '직접 검증한 공정',
      'lp.label': '02 / Products · 02 랜딩 페이지',
      'lp.title': '광고에서 결제까지, 랜딩 페이지도 만듭니다',
      'lp.lead': '광고를 보고 들어온 고객이 결제까지 가도록, 광고와 이어지는 랜딩 페이지를 함께 만듭니다.',
      'lp.t1': '광고와 같은 이야기',
      'lp.d1': '광고의 장면과 문구가 첫 화면에 그대로 이어집니다.',
      'lp.t2': '근거는 숫자로',
      'lp.d2': '고객이 망설이는 지점에 숫자로 먼저 답합니다.',
      'lp.t3': '행동은 하나로',
      'lp.d3': '구매, 예약, 신청. 한 가지 행동으로 모읍니다.',
      'lp.t4': '광고별로 측정',
      'lp.d4': '어느 광고가 결제로 이어졌는지 확인합니다.',
      'lp.t5': 'AI가 1차 고객 응대',
      'lp.d5': '페이지 안의 AI가 고객 문의에 먼저 답합니다.',
      'lp.opt': '옵션',
      'lp.price': '랜딩 페이지 가격 보기',
      'lp.end': '랜딩 페이지까지 함께 만들기 때문에, 구매 전환율이 높습니다.',
      'lp.s1': '판매자 모집 랜딩',
      'lp.s2': '게임 소개 랜딩',
      'lp.s3': '셀러 모집 랜딩',
      'lp.hint': '이름에 마우스를 올리면 해당 화면으로 바뀝니다',
      'ops.label': '02 / Products · 03 채널 운영',
      'ops.title': '채널 운영, 이렇게 해 드립니다',
      'ops.lead': '영상 한 편으로 끝나지 않습니다. 채널을 열고, 매달 콘텐츠를 만들어 올리고, 숫자를 읽어 다음 달 계획에 반영하는 일까지 저희가 맡습니다.',
      'ops.t1': '채널 셋업',
      'ops.d1': '채널 개설과 프로필, 기본 설정을 마치고 첫 게시를 준비합니다. 인스타그램 릴스·유튜브 쇼츠·틱톡 가운데 업종에 맞는 채널부터 엽니다.',
      'ops.t2': '월간 계획',
      'ops.d2': '업종과 시즌에 맞춰 한 달 치 주제와 포맷(설명형·상황극·사진→영상)을 정하고, 게시 일정표로 공유합니다.',
      'ops.t3': '제작과 게시',
      'ops.d3': 'AI 제작 공정으로 매달 정해진 편수(8·12·20편)를 만들어 채널별 규격에 맞춰 올립니다.',
      'ops.t4': '성과 기록',
      'ops.d4': '도달·조회·참여·문의를 채널별, 게시물별로 모아 고객님 전용 운영 데스크에 정리합니다.',
      'ops.end': '고객님은 저희가 만들어 드리는 채널 운영 데스크를 통해 결과를 확인하고, AI를 통해 솔루션을 찾으시면 됩니다.',
      'ops.cta': '운영 데스크 샘플 보기',
      'ops.cta2': '채널 운영 가격 보기',
      'ops.fig': '채널 운영 데스크 샘플 화면(가상의 고객 데이터). 성과 지표와 게시 일정, 요약·브리프·솔루션을 답하는 AI가 한 화면에 있습니다.',
      'price.t6': '업계보다 저렴한 가격',
      'price.d6': '15초 광고 한 편이 10만~12만 원입니다. 기획과 자막, 음성, 컷 수정 3회가 포함된 가격입니다.',
      'hp.title': '가격은 처음부터 공개합니다',
      'hp.lead': '상품군별 대표 상품입니다. 모든 금액은 부가세 별도이며, 광고비(매체비)는 고객님 광고 계정에서 직접 결제하십니다.',
      'hp.all': '전체 가격표 보기',
      'hp.pkg': 'Package · 묶음 상품',
      'price.d5': '저희 서비스 광고를 직접 만들고 집행하며 다듬은 공정입니다. 제작과 집행을 한 손에서 하니 소재 판정이 빠릅니다.',
      'work.label': '02 / Products · 01 광고 영상',
      'work.title': '지금까지 만든 광고',
      'work.f.all': '전체', 'work.f.40weeks': '40Weeks', 'work.f.loc': '8개 언어 현지화', 'work.f.sogd': 'SOGD', 'work.f.sowhat': 'So what?!',
      'work.expand': '더보기',
      'work.collapse': '접기',
      'work.more': '유튜브에서 더 보기',
      'work.note': 'Dr.Studio 유튜브 채널 · {n}편',
      'hero.alt1': '40Weeks 광고의 한 장면: 새벽에 휴대폰 속 아기 얼굴을 보며 잠드는 여성',
      'hero.alt2': 'SOGD 광고의 한 장면: 낙타를 탄 상인이 아파트 현관에 특산품을 배달하는 모습',
      'hero.alt3': 'So what?! 광고의 한 장면: 밤의 사무실에 앉은 남성과 큰 자막',
      'work.story': '이야기 ',
      'contact.label': '04 / Q&A',
      'contact.title': '함께 고민하고<br>함께 설득하겠습니다.',
      'contact.sub': '프로젝트 문의는 메일로 보내 주세요.',
      'contact.boxlabel': '광고 제작 의뢰서',
      'contact.box': '제품과 목표, 일정과 예산을 의뢰서에 남겨 주시면 검토 후 견적서를 이메일로 보내 드립니다. 기본 가격은 가격 안내에서 먼저 보실 수 있습니다.',
      'contact.pricing': '가격 안내 보기',
      'contact.cta': '의뢰서 작성하기',
      'hero.cta2': '제작 의뢰하기',
      'dialog.close': '닫기',
      'mail.subject': 'Dr.Studio 프로젝트 문의'
    },
    en: {
      'hero.title': 'The picture in your head,<br><em>brought out with AI.</em>',
      'hero.sub': 'A vague picture is fine. We make it sharper with AI, checking with you along the way.',
      'hero.p1': '4 client sign-offs', 'hero.p2': 'Planned with marketers', 'hero.p3': '3 cut revisions included',
      'hero.side': 'We read the brand first and design the story. Scenes, cast and voices are made with AI.',
      'hero.cta': 'See the portfolio',
      'about.label': '01 / About',
      'about.title': 'We turn your brief<br>into a finished ad.',
      'about.body': 'Dr.Studio makes ad videos tailored to each client’s needs, with AI. We read your brand and your audience first, then design the story and the scenes that fit.',
      'about.pv.label': 'What we provide',
      'about.pv.lead': 'Ad videos, landing pages and the operation desk, all from one place.',
      'about.pv.1t': 'Ad videos',
      'about.pv.1d': 'Ads that make people stop and watch.',
      'about.pv.2t': 'Landing pages',
      'about.pv.2d': 'Pages that carry ad visitors to checkout.',
      'about.pv.3t': 'Operation desk',
      'about.pv.3d': 'See results on one screen and ask the AI what to do next.',
      'ops.focus': 'The numbers on the desk show where to put more and which ads to cut, so spend goes where it works.',
      'about.box': 'From ad planning to AI video production and localization, one team handles it end to end.',
      'about.s1': 'Ads', 'about.s2': 'Clients', 'about.s3': 'Languages',
      'about.p1t': 'Brand reading', 'about.p1d': 'We check your brand, audience and sales channels first, and agree on what the ad has to do.',
      'about.p2t': 'Story design', 'about.p2d': 'We break the message into scenes and write the script and the structure.',
      'about.p3t': 'AI production & localization', 'about.p3d': 'Scenes, cast and voices are made with AI, then remade per language when needed.',
      'why.label': '01 / About · Strengths',
      'why.t1': 'Marketing experts', 'why.t2': 'AI', 'why.t3': 'Creative content', 'why.t4': 'Fast production',
      'why.d1': 'Who it speaks to, what it says and where it runs come first.',
      'why.d2': 'Scenes, cast and voices are generated with AI.',
      'why.d3': 'Stories people stop scrolling for.',
      'why.d4': 'The final cut is usually ready within 2–3 days. No sets or shoots keep the schedule short.',
      'why.proof': 'One ad, localized into 8 languages.',
      'why.proofsub': 'The same story, remade with a local cast, sets and native dialogue.',
      'price.label': '01 / About · Why Dr.Studio', 'price.cta': 'See pricing',
      'price.title': 'We did not swap people for AI. We rebuilt the whole ad production process on AI.',
      'price.lead': 'Handing a few human tasks to AI barely changes price or speed. We rebuilt the entire process on AI, from planning through production, localization, delivery and media. That is how we deliver quality at or above what people used to make, at a lower price and at volume.',
      'price.not': 'We are equally clear about what we do not do: no live-action shoots and no unlimited revisions. Cut revisions are included up to three times; after that, each cut is charged extra.',
      'price.t1': 'The whole process runs on AI', 'price.d1': 'Planning, script, scenes, characters, voice, editing and localization run as one continuous process. The waiting and rework of passing between people and vendors is gone, so a final cut usually arrives in 2–3 days.',
      'price.t2': 'Production without a shoot', 'price.d2': 'Scenes, people and voices are generated with AI. The cost and scheduling limits of shoots, sets, cast and locations never existed, so the idea decides the scene, not the budget.',
      'price.t3': 'Production assets that compound', 'price.d3': 'Characters, sets, voices and story templates built over 22 ads are reused on the next one. The more we make, the faster and more consistent it gets. Localizing one ad into 8 languages works the same way.',
      'price.t4': 'Consultation and reporting built in', 'price.d4': 'The AI helper in the request form replaces the consultation call and the status page replaces the reporting. Three standard formats keep quality steady even when many videos run at once.',
      'price.t5': 'Proven on our own ads',
      'lp.label': '02 / Products · 02 Landing page',
      'lp.title': 'From ad to checkout: we build the landing page too',
      'lp.lead': 'We build a landing page that continues the ad, so visitors go all the way to checkout.',
      'lp.t1': 'The same story as the ad',
      'lp.d1': 'The scene and line from the ad carry into the first screen.',
      'lp.t2': 'Proof in numbers',
      'lp.d2': 'Where visitors hesitate, numbers answer first.',
      'lp.t3': 'One action',
      'lp.d3': 'Buy, book or apply. Everything leads to one action.',
      'lp.t4': 'Measured per ad',
      'lp.d4': 'We see which ad led to a purchase.',
      'lp.t5': 'AI handles first-line inquiries',
      'lp.d5': 'The AI on the page answers visitor questions first.',
      'lp.opt': 'Add-on',
      'lp.price': 'See landing page pricing',
      'lp.end': 'Because we build the landing page too, purchase conversion is high.',
      'lp.s1': 'Seller recruitment landing',
      'lp.s2': 'Game introduction landing',
      'lp.s3': 'Seller recruitment landing',
      'lp.hint': 'Hover a name to switch the page shown',
      'ops.label': '02 / Products · 03 Channel operation',
      'ops.title': 'How we run your channels',
      'ops.lead': 'It does not end with one video. We open the channels, make and publish content every month, read the numbers and feed them into next month’s plan.',
      'ops.t1': 'Channel setup',
      'ops.d1': 'Accounts, profiles and basic settings, ready for the first post. We start with the channel that fits your business among Instagram Reels, YouTube Shorts and TikTok.',
      'ops.t2': 'Monthly plan',
      'ops.d2': 'A month of topics and formats (explainer, story, photo to video) chosen for your business and season, shared as a posting calendar.',
      'ops.t3': 'Production and posting',
      'ops.d3': 'Our AI production process delivers the agreed number of posts each month (8, 12 or 20), published to each channel’s format.',
      'ops.t4': 'Performance record',
      'ops.d4': 'Reach, views, engagement and inquiries are collected by channel and by post in your own operation desk.',
      'ops.end': 'You check the results on the Channel Operation Desk we build for you, and find the next move with its AI.',
      'ops.cta': 'See the desk sample',
      'ops.cta2': 'See channel operation pricing',
      'ops.fig': 'Channel Operation Desk sample (fictional client data). Performance, the posting calendar and an AI that answers with summaries, briefs and solutions on one screen.',
      'price.t6': 'Priced below the market',
      'price.d6': 'A 15-second ad costs KRW 100,000–120,000, with planning, subtitles, voice and up to three cut revisions included.',
      'hp.title': 'Prices are public from the start',
      'hp.lead': 'Representative products by group. All prices exclude VAT, and ad media spend is paid directly from your own ad account.',
      'hp.all': 'See the full price list',
      'hp.pkg': 'Packages',
      'price.d5': 'We refined this process by making and running ads for our own services. Production and media run under one roof, so creative decisions are fast.',
      'work.label': '02 / Products · 01 Ad videos',
      'work.title': 'Ads we have made',
      'work.f.all': 'All', 'work.f.40weeks': '40Weeks', 'work.f.loc': 'One ad · 8 languages', 'work.f.sogd': 'SOGD', 'work.f.sowhat': 'So what?!',
      'work.expand': 'Show more',
      'work.collapse': 'Show less',
      'work.more': 'More on YouTube',
      'work.note': 'Dr.Studio on YouTube · {n} ads',
      'hero.alt1': 'A still from a 40Weeks ad: a woman falls asleep looking at a baby face on her phone at night',
      'hero.alt2': 'A still from a SOGD ad: a merchant on a camel delivers a regional specialty to an apartment door',
      'hero.alt3': 'A still from a So what?! ad: a man sitting in an office at night with large captions',
      'work.story': 'Story ',
      'contact.label': '04 / Q&A',
      'contact.title': 'We think it through with you<br>and persuade with you.',
      'contact.sub': 'Send us your project by email.',
      'contact.boxlabel': 'Request form',
      'contact.box': 'Leave your product, goals, timeline and budget in the request form. We review it and email you a quote. Base prices are on the pricing page.',
      'contact.pricing': 'See pricing',
      'contact.cta': 'Fill in the request form',
      'hero.cta2': 'Request an ad',
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
    var corner = '<span class="shrink-0 font-label-sm text-label-sm text-paper/80 bg-primary/50 backdrop-blur-sm px-1.5 py-0.5">' + esc(item.dur) + '</span>';
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
    return '<button class="work-card group relative flex flex-col text-left" type="button" data-yt="' + esc(item.yt) + '" aria-label="' + label + '">' + inner + '</button>';
  }

  function renderWork() {
    var grid = document.getElementById('work-grid');
    if (grid) {
      grid.innerHTML = DATA.filter(inFilter).map(cardHTML).join('');
      [].forEach.call(grid.children, function (c, i) { c.classList.add('rv'); c.style.setProperty('--d', ((i % 4) * 70) + 'ms'); });
      if (window.drsObserve) { window.drsObserve(grid); }
    }
    document.querySelectorAll('[data-filter]').forEach(function (b) {
      var on = b.getAttribute('data-filter') === filter;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-active', on);
    });
    var note = document.querySelector('[data-work-note]');
    if (note) { note.textContent = t('work.note').replace('{n}', String(DATA.length)); }
    clipWork();
  }

  // Work grid: first row plus a peek of the second, then "show more".
  var workOpen = false, workBound = false;
  function clipWork() {
    var clip = document.getElementById('work-clip'), grid = document.getElementById('work-grid'), btn = document.getElementById('work-toggle');
    if (!clip || !grid || !btn) { return; }
    if (!workBound) {
      workBound = true;
      btn.addEventListener('click', function () {
        workOpen = !workOpen;
        clipWork();
        if (!workOpen) {
          var sec = document.getElementById('portfolio');
          if (sec && sec.getBoundingClientRect().top < 0) { sec.scrollIntoView(); }
        }
      });
      window.addEventListener('resize', clipWork);
      window.addEventListener('load', clipWork);
    }
    var cards = grid.children, second = null;
    if (cards.length) {
      var top0 = cards[0].offsetTop;
      for (var i = 0; i < cards.length; i++) { if (cards[i].offsetTop > top0 + 4) { second = cards[i]; break; } }
    }
    if (!second) { clip.style.maxHeight = ''; clip.classList.remove('is-clipped'); btn.hidden = true; return; }
    btn.hidden = false;
    if (workOpen) { clip.style.maxHeight = grid.scrollHeight + 'px'; clip.classList.remove('is-clipped'); }
    else { clip.style.maxHeight = (second.offsetTop + Math.round(second.offsetHeight * 0.3)) + 'px'; clip.classList.add('is-clipped'); }
    document.getElementById('work-toggle-label').textContent = t(workOpen ? 'work.collapse' : 'work.expand');
    btn.setAttribute('aria-expanded', workOpen ? 'true' : 'false');
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
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var v = I18N[lang][el.getAttribute('data-i18n-alt')];
      if (v !== undefined) { el.setAttribute('alt', v); }
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

/* Home pricing section: representative products per group (rows aligned across columns) and packages, from assets/data/pricing.json. */
(function () {
  'use strict';
  var ORDER = ['A', 'W', 'B', 'C'];
  var REP = { A: ['A-1', 'A-2', 'A-2-60'], W: ['W-1', 'W-2', 'W-3'], B: ['B-1', 'B-2', 'B-3'], C: ['C-1', 'C-2', 'C-3'] };
  var GROUP = { A: { ko: '제작', en: 'Production' }, W: { ko: '홈페이지 제작', en: 'Website' }, B: { ko: '채널 운영', en: 'Channel operation' }, C: { ko: '유료 광고 대행', en: 'Paid ads' } };
  var PKG = [
    { codes: ['A-1', 'W-1'], ko: '첫 광고 세트', en: 'First ad set', dko: '15초 광고 1편(실사형)과 랜딩 페이지 1장', den: 'One short-form ad (live-action look) and one landing page' },
    { codes: ['B-1', 'B-2'], ko: '채널 운영 시작 세트', en: 'Channel start set', dko: '채널 셋업과 운영 베이직 첫 달(1채널·월 8편)', den: 'Channel setup and the first month of Operation Basic (1 channel, 8 posts)', after: ['B-2'] },
    { codes: ['A-1', 'W-1', 'C-1', 'C-2'], ko: '광고 전환 세트', en: 'Ad-to-sale set', dko: '광고 영상과 랜딩 페이지를 만들고, 광고 셋업과 첫 달 운영까지', den: 'Ad video and landing page, plus ads setup and the first month of management', after: ['C-2'] },
    { codes: ['A-6', 'B-1', 'B-2'], ko: '브랜드 채널 런칭 세트', en: 'Brand channel launch set', dko: '브랜드 소개 영상(실사형)으로 채널을 열고 첫 달 운영까지', den: 'Open the channel with a brand film (live-action look) and run the first month', after: ['B-2'] },
    { codes: ['B-1', 'B-2', 'C-1', 'C-2'], ko: '채널 + 광고 세트', en: 'Channel + ads set', dko: '채널 운영 첫 달과 광고 셋업, 광고 운영 첫 달', den: 'First month of channel operation, plus ads setup and first month of management', after: ['B-2', 'C-2'] },
    { codes: ['A-1', 'W-1', 'B-1', 'B-2', 'C-1', 'C-2'], ko: '올인원 세트', en: 'All-in-one set', dko: '광고 영상, 랜딩 페이지, 채널 운영, 광고 운영을 한 번에', den: 'Ad video, landing page, channel operation and ad management together', after: ['B-2', 'C-2'] }
  ];
  var TX = { ko: { ill: '삽화형', live: '실사형', go: '의뢰하기', then: '이후 월' }, en: { ill: 'Illustration', live: 'Live-action', go: 'Request', then: 'then monthly' } };
  var DATA = null;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ko'; }
  function money(n, l) { return l === 'en' ? 'KRW ' + Number(n).toLocaleString('en-US') : (n % 10000 === 0 ? (n / 10000).toLocaleString('en-US') + '만 원' : Number(n).toLocaleString('en-US') + '원'); }
  function item(code) { return DATA.items.filter(function (x) { return x.code === code; })[0]; }
  function base(it) { return it.price !== undefined && it.price !== null ? it.price : (it.live !== undefined && it.live !== null ? it.live : it.min || 0); }
  function priceText(it, l) {
    if (it['price_text_' + l]) { return it['price_text_' + l]; }
    if (it.illustration !== undefined && it.illustration !== null && it.illustration !== it.live) { return TX[l].ill + ' ' + money(it.illustration, l) + ' · ' + TX[l].live + ' ' + money(it.live, l); }
    return money(base(it), l);
  }
  function render() {
    if (!DATA) { return; }
    var l = lang();
    document.getElementById('hp-groups').innerHTML = ORDER.filter(function (t) { return REP[t].map(item).filter(Boolean).length; }).map(function (t) {
      return '<div class="hp-col rv" style="--d:' + (ORDER.indexOf(t) * 90) + 'ms"><div class="hp-head"><h3 class="font-headline-md text-headline-md text-primary-container">' + esc(GROUP[t][l]) + '</h3><span class="hp-tag">' + t + '</span></div>' +
        REP[t].map(item).filter(Boolean).map(function (it) {
          return '<div class="hp-row"><div class="hp-row__top"><span class="font-headline-sm text-headline-sm text-primary-container break-keep">' + esc(it[l]) + '</span><span class="hp-row__unit">/ ' + esc(it['unit_' + l]) + '</span></div>' +
            '<p class="hp-row__price">' + esc(priceText(it, l)) + '</p>' + '<p class="hp-row__spec">' + esc([it['spec_' + l], (it['meta_' + l] || '').split(' · ')[0]].filter(Boolean).join(' · ')) + '</p></div>';
        }).join('') + '</div>';
    }).join('');
    document.getElementById('hp-packages').innerHTML = PKG.map(function (k) {
      var its = k.codes.map(item); if (its.some(function (x) { return !x; })) { return ''; }
      var sum = its.reduce(function (a, x) { return a + base(x); }, 0), types = [];
      its.forEach(function (x) { if (types.indexOf(x.type) < 0) { types.push(x.type); } });
      var after = k.after ? k.after.map(item).reduce(function (a, x) { return a + base(x); }, 0) : 0;
      var q = 'p=' + k.codes.join(',') + (k.codes.indexOf('A-1') >= 0 || k.codes.indexOf('A-6') >= 0 ? '&style=live' : '');
      return '<a class="hp-pk rv" style="--d:' + ((PKG.indexOf(k) % 3) * 90) + 'ms" href="request/?' + q + '">' +
        '<span class="hp-pk__groups">' + types.map(function (t) { return esc(GROUP[t][l]); }).join(' + ') + '</span>' +
        '<span class="hp-pk__title font-headline-sm text-headline-sm break-keep">' + esc(k[l]) + '</span>' +
        '<span class="hp-pk__desc">' + esc(k['d' + l]) + '</span>' +
        '<span class="hp-pk__price"><span class="font-headline-md text-headline-md">' + esc(money(sum, l)) + '</span>' + (after ? '<span class="hp-pk__after">' + TX[l].then + ' ' + esc(money(after, l)) + '</span>' : '') + '</span>' +
        '<span class="hp-pk__go">' + TX[l].go + ' <i aria-hidden="true">↗</i></span></a>';
    }).join('');
    if (window.drsObserve) { window.drsObserve(document.getElementById('pricing')); }
  }
  function start() {
    var sec = document.getElementById('pricing'); if (!sec) { return; }
    fetch(sec.getAttribute('data-pricing'), { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) { DATA = d; render(); }).catch(function () { /* the link to the full price list stays */ });
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); } else { start(); }
}());
