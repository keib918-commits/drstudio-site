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
      'offer.b1.t': '채널 셋업', 'offer.b1.d': '브랜드 SNS 채널을 열고 첫 게시까지 준비해 드립니다.',
      'offer.b1.p': '채널당 {p}~',
      'offer.go': '이걸로 의뢰하기',
      'work.all': '전체 보기', 'work.title': 'AI로 만든 광고 영상',
      'steps.note': '결제는 계좌이체로 받고 세금계산서를 발행합니다. 제작물은 착수 후 통상 2~3일 안에 최종본을 완성합니다.',
      'cta.title': '의뢰서를 남겨 주시면 검토 후 견적을 보내 드립니다.',
      'why.title': '사람의 일을 AI로 바꾼 것이 아니라, 광고 제작 공정 전체를 AI로 바꿨습니다',
      'why.lead': '사람이 하던 작업 몇 가지를 AI에 맡기는 것만으로는 가격도 속도도 크게 달라지지 않습니다. 저희는 기획부터 제작·현지화·납품·집행까지 공정 전체를 AI 위에 다시 짰습니다. 그래서 사람이 만들던 수준 이상의 품질을, 낮은 가격에, 많은 편수로 드릴 수 있습니다.',
      'why.not': '대신 하지 않는 것도 분명합니다: 실사 촬영과 무제한 수정은 하지 않습니다. 컷 수정은 3회까지 포함되며, 이후에는 컷별로 추가 요금이 붙습니다.',
      'why.t1': '공정 전체가 AI', 'why.d1': '기획·대본·장면·인물·목소리·편집·현지화가 한 공정 안에서 이어집니다. 단계마다 사람과 외주를 거치며 생기던 대기와 재작업이 없어, 통상 2~3일 안에 최종본이 나옵니다.',
      'why.t2': '촬영 없는 제작', 'why.d2': '장면과 인물, 목소리를 AI로 만듭니다. 촬영·세트·배우·장소에 들던 비용과 일정 제약이 처음부터 없어, 예산이 아니라 기획이 장면을 정합니다.',
      'why.t3': '만들수록 쌓이는 제작 자산', 'why.d3': '광고 22편을 만들며 쌓은 인물·세트·목소리·연출 틀을 다음 영상에 다시 씁니다. 편수가 늘수록 더 빠르고 고른 품질로 나옵니다. 광고 한 편을 8개 언어로 현지화한 것도 같은 방식입니다.',
      'why.t4': '상담과 보고까지 공정 안에', 'why.d4': '의뢰서의 AI 도우미가 상담을 대신하고, 진행 현황 페이지가 보고를 대신합니다. 포맷을 세 가지로 표준화해 여러 편을 동시에 진행해도 품질이 흔들리지 않습니다.',
      'why.t5': '직접 거래하고 직접 검증한 공정', 'why.fig': '크몽 ‘AI 광고 영상’ 검색 결과(2026-11-08 캡처, 판매자 정보는 가렸습니다). 시작가는 3만 5천 원부터 2,400만 원까지, 15~30초 광고 기준으로는 10만~50만 원대가 많습니다. 여기에 구매자 수수료 4.5%가 더 붙고, 판매자는 약 21.7%를 수수료로 냅니다. 저희는 같은 길이의 영상을 18만~25만 원에 기획·집행까지 포함해 드립니다.',
      'pc.title': '제작 공정',
      'pc.sub': '단계마다 고객님이 확인하신 뒤 다음 단계로 넘어갑니다',
      'pc.t1': '대본 작성',
      'pc.d1': '광고에서 할 말과 장면 순서를 대본으로 정리합니다.',
      'pc.t2': '컷 영상 제작',
      'pc.d2': '대본의 장면을 컷 단위 영상으로 만듭니다. 컷 수정은 3회까지 포함됩니다.',
      'pc.t3': '조립 완성본 제작',
      'pc.d3': '확정된 컷을 이어 붙이고 자막과 음성, 음악을 입힙니다.',
      'pc.t4': '화질 개선',
      'pc.d4': '확정된 완성본의 화질을 높여 최종 파일로 드립니다.',
      'pc.ok': '고객 확인',
      'pc.ok4': '고객 확인 · 완료',
      'pc.note': '컷 수정은 3회까지 포함되며, 이후에는 컷별로 추가 요금이 붙습니다.',
      'ops.focus': '데스크의 숫자를 보고 효과가 있는 곳에 집중하고, 효과 없는 광고는 줄여 비용을 아낍니다.',
      'lp.label': '05 / 랜딩 페이지',
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
      'ops.label': '06 / 채널 운영',
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
      'faq1.q': '촬영을 안 해도 되나요? 무엇을 준비하면 되나요?',
      'faq1.a': '촬영은 하지 않습니다. 매장이나 제품 사진 몇 장과 로고, 그리고 알리고 싶은 내용만 말씀해 주시면 됩니다. 글로 정리하기 어려우시면 의뢰서 맨 위의 AI 도우미에 편하게 적어 주세요.',
      'faq2.q': 'AI로 만들면 우리 가게나 제품이 실제와 다르게 나오지 않나요?',
      'faq2.a': '보내 주신 사진을 바탕으로 영상을 만드는 방식이 있어 실제 모습을 살릴 수 있습니다. 또 대본, 컷 영상, 완성본을 단계마다 먼저 보여 드리고 확인받은 뒤 다음으로 넘어가므로, 다르게 나온 장면은 그 단계에서 바로잡습니다.',
      'faq3.q': '결과물이 마음에 안 들면 어떻게 하나요?',
      'faq3.a': '컷 수정은 3회까지 포함되어 있습니다. 그 이후에는 컷별로 추가 요금이 붙습니다. 단계마다 확인을 받고 진행하기 때문에, 다 만든 뒤에야 방향이 다르다는 것을 알게 되는 일을 줄일 수 있습니다.',
      'faq4.q': '얼마나 걸리나요?',
      'faq4.a': '입금을 확인하고 착수하면 일주일 안에 최종본을 드립니다.',
      'faq5.q': '견적 말고 추가로 드는 비용이 있나요?',
      'faq5.a': '모든 금액은 부가세 별도입니다. 광고를 집행하신다면 광고비(매체비)는 고객님 광고 계정에서 직접 결제하시고, 저희는 제작·운영 비용만 받습니다. 컷 수정이 3회를 넘으면 컷별 추가 요금이 있습니다. 작업 범위가 달라지면 먼저 견적을 다시 드립니다.',
      'faq6.q': '영상은 받아서 제가 직접 올려야 하나요?',
      'faq6.a': '완성된 영상 파일을 드리므로 인스타그램 릴스, 유튜브 쇼츠, 틱톡에 바로 올리실 수 있습니다. 올리고 관리할 시간이 없으시면 채널 운영부터 광고 집행까지 저희에게 맡기실 수 있습니다.',
      'faq7.q': '광고를 하면 손님이 늘어나나요? 효과를 보장하나요?',
      'faq7.a': '매출이나 방문 수를 보장하지는 않습니다. 대신 채널 운영을 맡기시면 도달, 조회, 문의 숫자를 운영 데스크에서 직접 보실 수 있습니다. 그 숫자를 보고 효과가 있는 곳에 집중하고, 효과 없는 광고는 줄여 비용을 아끼도록 돕습니다.',
      'faq8.q': '계약과 결제는 어떻게 하나요?',
      'faq8.a': '의뢰서, 견적, 계약서 서명, 입금, 착수 순서로 진행합니다. 결제는 계좌이체로 받고 세금계산서를 발행합니다. 채널 운영이나 광고 대행 같은 월 단위 상품은 월 단위로 해지하실 수 있습니다.',
      'faq9.q': '무엇을 맡겨야 할지 아직 모르겠어요.',
      'faq9.a': '괜찮습니다. 의뢰서 맨 위의 AI 도우미에 가게와 상황을 편하게 적어 주시면 맞는 상품과 예상 비용을 추천해 드리고, 검토 후 견적서로 다시 안내드립니다.',
      'why.t6': '업계보다 저렴한 가격', 'why.d6': '15~30초 광고 한 편이 18만~25만 원입니다. 기획과 자막, 음성, 컷 수정 3회가 포함된 가격입니다. 중개 플랫폼의 AI 광고 영상은 같은 길이 기준 10만~50만 원대가 많고, 여기에 구매 수수료가 따로 붙습니다(2026-11-08 조사).',
      'why.d5': '저희 서비스 광고를 직접 만들고 집행하며 다듬은 공정입니다. 제작과 집행을 한 손에서 하니 소재 판정이 빠릅니다. 중개 플랫폼을 거치지 않으므로 약 26%의 수수료(판매자 약 21.7% + 구매자 4.5%)도 가격에 붙지 않습니다.'
    },
    en: {
      'page.title': 'Dr.Studio — Product ads, made fast with AI',
      'cta.request': 'Fill in the request form',
      'hero.fast': 'In 2–3 days, from {p}',
      'offers.all': 'All prices',
      'offers.vat': 'VAT excluded · Media spend is paid directly from your own ad account.',
      'offer.a1.t': 'Short-form ad', 'offer.a1.d': 'A 15–30 second vertical ad, ready for Reels, Shorts and TikTok.',
      'offer.a1.p': 'Live-action look {live} · Illustrated {ill}',
      'offer.b1.t': 'Channel setup', 'offer.b1.d': 'We open your brand’s social channel and prepare the first posts.',
      'offer.b1.p': '{p}+ per channel',
      'offer.go': 'Request this',
      'work.all': 'See all', 'work.title': 'Ads made with AI',
      'steps.note': 'We take bank transfers and issue a tax invoice. Videos are usually final within 2–3 days of kick-off.',
      'cta.title': 'Send us a request and we will reply with a quote.',
      'why.title': 'We did not swap people for AI. We rebuilt the whole ad production process on AI.',
      'why.lead': 'Handing a few human tasks to AI barely changes price or speed. We rebuilt the entire process on AI, from planning through production, localization, delivery and media. That is how we deliver quality at or above what people used to make, at a lower price and at volume.',
      'why.not': 'We are equally clear about what we do not do: no live-action shoots and no unlimited revisions. Cut revisions are included up to three times; after that, each cut is charged extra.',
      'why.t1': 'The whole process runs on AI', 'why.d1': 'Planning, script, scenes, characters, voice, editing and localization run as one continuous process. The waiting and rework of passing between people and vendors is gone, so a final cut usually arrives in 2–3 days.',
      'why.t2': 'Production without a shoot', 'why.d2': 'Scenes, people and voices are generated with AI. The cost and scheduling limits of shoots, sets, cast and locations never existed, so the idea decides the scene, not the budget.',
      'why.t3': 'Production assets that compound', 'why.d3': 'Characters, sets, voices and story templates built over 22 ads are reused on the next one. The more we make, the faster and more consistent it gets. Localizing one ad into 8 languages works the same way.',
      'why.t4': 'Consultation and reporting built in', 'why.d4': 'The AI helper in the request form replaces the consultation call and the status page replaces the reporting. Three standard formats keep quality steady even when many videos run at once.',
      'why.t5': 'Direct, and proven on our own ads', 'why.fig': 'Kmong search results for ‘AI ad video’ (captured 2026-11-08, seller details hidden). Starting prices run from KRW 35,000 to 24,000,000; for a 15–30 second ad most sit between KRW 100,000 and 500,000, plus a 4.5% buyer fee, while sellers pay about 21.7% in fees. We make the same length of video for KRW 180,000–250,000 with planning and ad execution included.',
      'pc.title': 'Production process',
      'pc.sub': 'You confirm each stage before we move on to the next',
      'pc.t1': 'Script',
      'pc.d1': 'We write what the ad says and the order of its scenes.',
      'pc.t2': 'Cut videos',
      'pc.d2': 'Each scene of the script becomes a video cut. Up to three cut revisions are included.',
      'pc.t3': 'Assembled cut',
      'pc.d3': 'Confirmed cuts are joined, with subtitles, voice and music.',
      'pc.t4': 'Upscaling',
      'pc.d4': 'The confirmed final cut is upscaled and delivered as the final file.',
      'pc.ok': 'Client check',
      'pc.ok4': 'Client check · done',
      'pc.note': 'Cut revisions are included up to three times; after that, each cut is charged extra.',
      'ops.focus': 'The numbers on the desk show where to put more and which ads to cut, so spend goes where it works.',
      'lp.label': '05 / Landing page',
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
      'ops.label': '06 / Channel operation',
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
      'faq1.q': 'Is there really no shoot? What do I need to prepare?',
      'faq1.a': 'There is no shoot. A few photos of your shop or product, your logo and what you want to tell people are enough. If writing it down is hard, describe it freely to the AI helper at the top of the request form.',
      'faq2.q': 'Will AI make my shop or product look different from the real thing?',
      'faq2.a': 'One of our formats builds the video from the photos you send, which keeps the real look. We also show you the script, the cut videos and the assembled cut one stage at a time and move on only after you confirm, so a scene that looks off is fixed at that stage.',
      'faq3.q': 'What if I do not like the result?',
      'faq3.a': 'Up to three cut revisions are included. After that, each cut is charged extra. Because you confirm every stage, you are far less likely to discover a wrong direction only at the end.',
      'faq4.q': 'How long does it take?',
      'faq4.a': 'Once payment is confirmed and we start, you receive the final video within a week.',
      'faq5.q': 'Are there costs beyond the quote?',
      'faq5.a': 'All prices exclude VAT. If you run ads, media spend is paid directly from your own ad account; we only charge for production and management. Cut revisions beyond three are charged per cut. If the scope changes, we send a new quote first.',
      'faq6.q': 'Do I have to upload the video myself?',
      'faq6.a': 'You receive the finished video file, ready for Instagram Reels, YouTube Shorts and TikTok. If you have no time to post and manage, you can leave everything to us, from channel operation to running the ads.',
      'faq7.q': 'Will ads bring more customers? Do you guarantee results?',
      'faq7.a': 'We do not guarantee sales or visits. With channel operation, you see reach, views and inquiries yourself on the operation desk, and we help you put more into what works and cut the ads that do not.',
      'faq8.q': 'How do contract and payment work?',
      'faq8.a': 'Request form, quote, contract signing, payment, then kick-off. Payment is by bank transfer and we issue a tax invoice. Monthly services such as channel operation and paid ads can be cancelled month by month.',
      'faq9.q': 'I am not sure what to ask for yet.',
      'faq9.a': 'That is fine. Describe your shop and situation to the AI helper at the top of the request form. It suggests services and an estimated cost, and we follow up with a written quote.',
      'why.t6': 'Priced below the market', 'why.d6': 'A 15–30 second ad costs KRW 180,000–250,000, with planning, subtitles, voice and up to three cut revisions included. On marketplaces, AI ad videos of the same length mostly run KRW 100,000–500,000 plus a buyer fee (surveyed 2026-11-08).',
      'why.d5': 'We refined this process by making and running ads for our own services. Production and media run under one roof, so creative decisions are fast. With no marketplace in between, the roughly 26% in fees (about 21.7% seller + 4.5% buyer) never reaches your price.'
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
    var a1 = item('A-1'), b1 = item('B-1');
    var fast = document.getElementById('hero-fast');
    if (a1) { fast.textContent = T[lang]['hero.fast'].replace('{p}', manwon(a1.illustration || a1.live)); fast.classList.remove('invisible'); }
    else if (PRICING === null && IND !== null) { fast.classList.add('invisible'); }   // catalog failed to load
    var cards = [];
    if (a1) { cards.push({ code: 'A-1', t: 'offer.a1.t', d: 'offer.a1.d', price: T[lang]['offer.a1.p'].replace('{live}', manwon(a1.live)).replace('{ill}', manwon(a1.illustration)), q: 'p=A-1&style=live' }); }
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
