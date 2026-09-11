/* =====================================================
   PROMO AMOR Y AMISTAD — Massage Spa Natalia Ruiz
   Flyer interactivo (solo septiembre 2026)
   - Se oculta solo a partir del 1 de octubre de 2026 (hora Bogotá)
   - Uso: <script src="promo-amor-amistad.js" data-autoopen="true" defer></script>
     data-autoopen="true"  -> se abre solo 1 vez por visita
     sin data-autoopen     -> solo aparece el botón flotante "Promo"
   ===================================================== */
(function () {
  'use strict';

  var PROMO_END = new Date('2026-10-01T00:00:00-05:00'); // fin de septiembre en Bogotá
  var WHATSAPP = '573138772082';
  var now = new Date();
  if (now >= PROMO_END) return;

  var script = document.currentScript || document.querySelector('script[src*="promo-amor-amistad"]');
  var AUTO_OPEN = script && script.getAttribute('data-autoopen') === 'true';
  var daysLeft = Math.max(1, Math.ceil((PROMO_END - now) / 86400000));

  var PLANS = [
    {
      id: 'pareja',
      tab: 'Para 2',
      badge: 'Parejas',
      title: 'Plan para 2',
      price: '$449.000',
      img: 'promo/amor-amistad-pareja.webp',
      alt: 'Pareja en camillas de masaje en la sala de parejas del spa',
      items: [
        'Masaje relajante 60 min',
        'Exfoliación e hidratación corporal',
        'Facial con mascarilla LED, herbal o velo de colágeno',
        'Copa de vino o bebida caliente',
        'Aromaterapia y musicoterapia'
      ],
      msg: '¡Hola! 💝 Quiero reservar la promo de Amor y Amistad: Plan para 2 personas ($449.000). ¿Qué horarios tienen disponibles?'
    },
    {
      id: 'ti',
      tab: 'Para ti',
      badge: 'Solo para ti',
      title: 'Plan para ti',
      price: '$259.000',
      img: 'promo/amor-amistad-ella.webp',
      alt: 'Mujer recibiendo un masaje relajante de espalda',
      items: [
        'Masaje relajante 60 min',
        'Exfoliación e hidratación corporal',
        'Facial con mascarilla LED, herbal o velo de colágeno',
        'Aromaterapia y musicoterapia'
      ],
      msg: '¡Hola! 💝 Quiero reservar la promo de Amor y Amistad: Plan para una persona ($259.000). ¿Qué horarios tienen disponibles?'
    }
  ];

  function waUrl(msg) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
  }

  // Tracking (no bloquea la apertura de WhatsApp)
  function track(label) {
    try {
      var sendTo = (typeof CONVERSION_ID !== 'undefined' && typeof CONVERSION_LABEL !== 'undefined')
        ? CONVERSION_ID + '/' + CONVERSION_LABEL
        : 'AW-17389033791/3XoUCLrD764bEL-y3uNA';
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', { send_to: sendTo, value: 10000, currency: 'COP', transport_type: 'beacon' });
        gtag('event', 'generate_lead', { event_category: 'promo', event_label: label, transport_type: 'beacon' });
      }
      if (typeof fbq === 'function') {
        fbq('trackCustom', 'WhatsAppContactSpa', { event_label: label, value: 10000, currency: 'COP' });
      }
    } catch (e) { /* nada */ }
  }

  // ---------- Estilos ----------
  var css = '' +
  '@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Montserrat:wght@400;500;600;700&display=swap");' +
  '.nrp,.nrp *{box-sizing:border-box;margin:0;padding:0}' +
  '.nrp{--g:#DAA520;--g2:#f3d27a;--rose:#e79bb0;--wine:#3a111d;--ink:#f7efe2;--muted:#c9bba6;' +
    'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;' +
    'font-family:"Montserrat",system-ui,sans-serif;color:var(--ink);opacity:0;visibility:hidden;transition:opacity .35s ease,visibility .35s}' +
  '.nrp.is-open{opacity:1;visibility:visible}' +
  '.nrp__bg{position:absolute;inset:0;background:rgba(8,6,6,.72);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}' +
  '.nrp__card{position:relative;width:100%;max-width:860px;max-height:calc(100dvh - 32px);overflow:auto;overscroll-behavior:contain;' +
    'border-radius:22px;padding:34px 30px 22px;' +
    'background:radial-gradient(120% 80% at 50% -10%,rgba(218,165,32,.18),transparent 55%),radial-gradient(90% 70% at 100% 110%,rgba(231,155,176,.16),transparent 60%),linear-gradient(160deg,#1d1a17 0%,#161312 45%,var(--wine) 130%);' +
    'border:1px solid rgba(218,165,32,.45);box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 0 6px rgba(218,165,32,.06);' +
    'transform:translateY(24px) scale(.97);transition:transform .45s cubic-bezier(.2,.9,.25,1.15);scrollbar-width:thin;scrollbar-color:rgba(218,165,32,.4) transparent}' +
  '.nrp.is-open .nrp__card{transform:none}' +
  '.nrp__hearts{position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:inherit}' +
  '.nrp__hearts span{position:absolute;bottom:-30px;color:var(--rose);opacity:0;font-size:14px;animation:nrpFloat 9s linear infinite}' +
  '@keyframes nrpFloat{0%{transform:translateY(0) rotate(0);opacity:0}10%{opacity:.55}100%{transform:translateY(-640px) rotate(35deg);opacity:0}}' +
  '.nrp__close{position:absolute;top:12px;right:12px;width:38px;height:38px;border-radius:50%;border:1px solid rgba(218,165,32,.35);background:rgba(0,0,0,.35);color:var(--g2);font-size:18px;cursor:pointer;z-index:3;transition:transform .2s,background .2s}' +
  '.nrp__close:hover{background:rgba(218,165,32,.18);transform:rotate(90deg)}' +
  '.nrp__head{position:relative;text-align:center;margin-bottom:22px;z-index:2}' +
  '.nrp__pill{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;font-size:11.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#1a1a1a;background:linear-gradient(90deg,var(--g),var(--g2));box-shadow:0 6px 18px rgba(218,165,32,.3)}' +
  '.nrp__pill i{font-style:normal;display:inline-block;animation:nrpBeat 1.4s ease-in-out infinite}' +
  '@keyframes nrpBeat{0%,100%{transform:scale(1)}15%{transform:scale(1.25)}30%{transform:scale(1)}45%{transform:scale(1.18)}}' +
  '.nrp__title{font-family:"Cormorant Garamond",Georgia,serif;font-weight:700;font-size:clamp(38px,6vw,58px);line-height:1;margin:14px 0 8px;' +
    'background:linear-gradient(90deg,var(--g2),var(--g) 45%,var(--g2));-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200% auto;animation:nrpShine 5s linear infinite}' +
  '.nrp__title em{font-style:italic;color:var(--rose);-webkit-text-fill-color:var(--rose);font-weight:600}' +
  '@keyframes nrpShine{to{background-position:200% center}}' +
  '.nrp__sub{color:var(--muted);font-size:15px}' +
  '.nrp__tabs{display:none;position:relative;margin:18px auto 0;width:max-content;padding:4px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(218,165,32,.25)}' +
  '.nrp__tabs button{position:relative;z-index:1;border:0;background:none;color:var(--muted);font:600 13px "Montserrat",sans-serif;padding:8px 18px;border-radius:999px;cursor:pointer;transition:color .25s}' +
  '.nrp__tabs button[aria-selected="true"]{color:#1a1a1a}' +
  '.nrp__tabs b{position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:999px;background:linear-gradient(90deg,var(--g),var(--g2));transition:transform .35s cubic-bezier(.2,.9,.25,1.1)}' +
  '.nrp__tabs[data-i="1"] b{transform:translateX(100%)}' +
  '.nrp__plans{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:20px}' +
  '.nrp__plan{position:relative;display:flex;flex-direction:column;border-radius:18px;overflow:hidden;background:rgba(255,255,255,.035);border:1px solid rgba(218,165,32,.22);' +
    'transition:transform .35s ease,box-shadow .35s ease,border-color .35s;transform-style:preserve-3d;will-change:transform}' +
  '.nrp__plan:hover{border-color:rgba(218,165,32,.6);box-shadow:0 18px 40px rgba(0,0,0,.45),0 0 30px rgba(218,165,32,.12)}' +
  '.nrp__plan.is-featured{border-color:rgba(231,155,176,.5)}' +
  '.nrp__fig{position:relative;height:210px;overflow:hidden}' +
  '.nrp__fig img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s ease}' +
  '.nrp__plan:hover .nrp__fig img{transform:scale(1.07)}' +
  '.nrp__fig:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(18,14,13,.95))}' +
  '.nrp__badge{position:absolute;top:12px;left:12px;z-index:1;padding:5px 12px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:rgba(20,16,15,.72);border:1px solid rgba(218,165,32,.55);color:var(--g2);backdrop-filter:blur(4px)}' +
  '.nrp__plan.is-featured .nrp__badge{border-color:rgba(231,155,176,.7);color:#ffd6e1}' +
  '.nrp__price{position:absolute;right:14px;bottom:10px;z-index:1;text-align:right;line-height:1}' +
  '.nrp__price small{display:block;font-size:11px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}' +
  '.nrp__price strong{font-family:"Cormorant Garamond",Georgia,serif;font-size:40px;font-weight:700;color:var(--g2);text-shadow:0 2px 12px rgba(0,0,0,.6)}' +
  '.nrp__body{display:flex;flex-direction:column;flex:1;padding:16px 18px 18px}' +
  '.nrp__body h3{font-family:"Cormorant Garamond",Georgia,serif;font-size:26px;font-weight:700;color:var(--ink);margin-bottom:10px}' +
  '.nrp__list{list-style:none;display:grid;gap:7px;margin-bottom:16px;flex:1}' +
  '.nrp__list li{display:flex;gap:9px;align-items:flex-start;font-size:13.5px;line-height:1.35;color:#e8dccb}' +
  '.nrp__list li:before{content:"";flex:0 0 16px;height:16px;margin-top:1px;border-radius:50%;background:rgba(218,165,32,.15) url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23f3d27a%27 stroke-width=%273.2%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M5 12.5l4.2 4.2L19 7%27/%3E%3C/svg%3E") center/10px no-repeat}' +
  '.nrp__wa{position:relative;display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px 16px;border-radius:12px;text-decoration:none;' +
    'font:700 15px "Montserrat",sans-serif;color:#fff;background:linear-gradient(135deg,#25D366,#1ebe5a);box-shadow:0 8px 22px rgba(37,211,102,.28);overflow:hidden;transition:transform .2s,box-shadow .2s}' +
  '.nrp__wa:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(37,211,102,.4)}' +
  '.nrp__wa:active{transform:translateY(0)}' +
  '.nrp__wa svg{width:20px;height:20px;flex:0 0 20px}' +
  '.nrp__wa:after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);transform:skewX(-20deg);animation:nrpSweep 3.2s ease-in-out infinite}' +
  '@keyframes nrpSweep{0%,60%{left:-60%}100%{left:130%}}' +
  '.nrp__foot{position:relative;z-index:2;text-align:center;margin-top:16px;font-size:12px;color:rgba(201,187,166,.75)}' +
  '.nrp__dots{display:none;justify-content:center;gap:6px;margin-top:12px}' +
  '.nrp__dots i{width:7px;height:7px;border-radius:50%;background:rgba(218,165,32,.3);transition:all .3s}' +
  '.nrp__dots i.on{width:20px;border-radius:4px;background:var(--g)}' +
  /* botón flotante */
  '.nrp-fab{position:fixed;left:18px;bottom:22px;z-index:1001;display:flex;align-items:center;gap:8px;padding:11px 16px 11px 12px;border-radius:999px;cursor:pointer;' +
    'border:1px solid rgba(243,210,122,.7);background:linear-gradient(135deg,#2a1519,#1a1a1a);color:#f3d27a;font:600 13px "Montserrat",system-ui,sans-serif;letter-spacing:.02em;' +
    'box-shadow:0 10px 26px rgba(0,0,0,.4),0 0 0 0 rgba(218,165,32,.55);animation:nrpPulse 2.4s infinite;transform:translateY(120px);transition:transform .5s cubic-bezier(.2,.9,.25,1.2)}' +
  '.nrp-fab.is-in{transform:none}' +
  '.nrp-fab span.h{font-size:18px;line-height:1;animation:nrpBeat 1.4s ease-in-out infinite}' +
  '.nrp-fab:hover{background:linear-gradient(135deg,#3a1a22,#222)}' +
  '@keyframes nrpPulse{0%{box-shadow:0 10px 26px rgba(0,0,0,.4),0 0 0 0 rgba(218,165,32,.5)}70%{box-shadow:0 10px 26px rgba(0,0,0,.4),0 0 0 14px rgba(218,165,32,0)}100%{box-shadow:0 10px 26px rgba(0,0,0,.4),0 0 0 0 rgba(218,165,32,0)}}' +
  'html.nrp-lock,html.nrp-lock body{overflow:hidden!important}' +
  /* responsive */
  '@media (max-width:720px){' +
    '.nrp{padding:10px}' +
    '.nrp__card{padding:26px 14px 16px;border-radius:18px;max-height:calc(100dvh - 20px)}' +
    '.nrp__close{top:8px;right:8px;width:32px;height:32px;font-size:15px}' +
    '.nrp__pill{font-size:10px;letter-spacing:.04em;padding:6px 11px;white-space:nowrap}' +
    '.nrp__head{margin-bottom:14px}' +
    '.nrp__sub{font-size:13.5px}' +
    '.nrp__tabs{display:flex}' +
    '.nrp__plans{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin:0 -14px;padding:0 14px}' +
    '.nrp__plans::-webkit-scrollbar{display:none}' +
    '.nrp__plan{flex:0 0 100%;scroll-snap-align:center}' +
    '.nrp__fig{height:clamp(150px,26vh,200px)}' +
    '.nrp__price strong{font-size:36px}' +
    '.nrp__body{padding:12px 14px 14px}' +
    '.nrp__body h3{font-size:23px;margin-bottom:8px}' +
    '.nrp__list{gap:6px;margin-bottom:14px}' +
    '.nrp__list li{font-size:13px}' +
    '.nrp__dots{display:flex}' +
    '.nrp__foot{margin-top:10px}' +
    '.nrp-fab{left:12px;bottom:18px;padding:10px 14px 10px 11px;font-size:12px}' +
  '}' +
  '@media (prefers-reduced-motion:reduce){.nrp *,.nrp-fab,.nrp-fab *{animation:none!important;transition:none!important}}';

  var style = document.createElement('style');
  style.id = 'nrp-styles';
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- Marcado ----------
  var waIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.15-.48-.27-.25-.11-1.47-.72-1.69-.81-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z"/></svg>';

  function planHTML(p, i) {
    return '<article class="nrp__plan' + (i === 0 ? ' is-featured' : '') + '" data-plan="' + p.id + '">' +
      '<div class="nrp__fig"><img src="' + p.img + '" alt="' + p.alt + '" loading="lazy" width="800" height="560">' +
        '<span class="nrp__badge">' + (i === 0 ? '💑 ' : '💆‍♀️ ') + p.badge + '</span>' +
        '<div class="nrp__price"><small>Solo</small><strong>' + p.price + '</strong></div></div>' +
      '<div class="nrp__body"><h3>' + p.title + '</h3>' +
        '<ul class="nrp__list">' + p.items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
        '<a class="nrp__wa" href="' + waUrl(p.msg) + '" target="_blank" rel="noopener" data-label="promo_amor_amistad_' + p.id + '">' + waIcon + '<span>Reservar por WhatsApp</span></a>' +
      '</div></article>';
  }

  var hearts = '';
  for (var h = 0; h < 12; h++) {
    hearts += '<span style="left:' + (4 + h * 8) + '%;animation-delay:' + (h * 0.75).toFixed(2) + 's;font-size:' + (10 + (h % 4) * 4) + 'px">' + (h % 3 ? '♥' : '♡') + '</span>';
  }

  var root = document.createElement('div');
  root.className = 'nrp';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-labelledby', 'nrp-title');
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML =
    '<div class="nrp__bg" data-close></div>' +
    '<div class="nrp__card">' +
      '<div class="nrp__hearts" aria-hidden="true">' + hearts + '</div>' +
      '<button class="nrp__close" type="button" aria-label="Cerrar promoción" data-close>✕</button>' +
      '<div class="nrp__head">' +
        '<span class="nrp__pill"><i>💝</i> Solo en septiembre · ' + (daysLeft === 1 ? 'último día' : 'quedan ' + daysLeft + ' días') + '</span>' +
        '<h2 class="nrp__title" id="nrp-title">Amor <em>&amp;</em> Amistad</h2>' +
        '<p class="nrp__sub">Regala una experiencia de spa… o regálatela.</p>' +
        '<div class="nrp__tabs" role="tablist" data-i="0"><b></b>' +
          PLANS.map(function (p, i) { return '<button type="button" role="tab" aria-selected="' + (i === 0) + '" data-go="' + i + '">' + p.tab + '</button>'; }).join('') +
        '</div>' +
      '</div>' +
      '<div class="nrp__plans">' + PLANS.map(planHTML).join('') + '</div>' +
      '<div class="nrp__dots" aria-hidden="true"><i class="on"></i><i></i></div>' +
      '<p class="nrp__foot">Promoción válida hasta el 30 de septiembre · Cupos limitados</p>' +
    '</div>';

  var fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'nrp-fab';
  fab.setAttribute('aria-label', 'Ver promoción de Amor y Amistad');
  fab.innerHTML = '<span class="h">💝</span><span>Promo Amor y Amistad</span>';

  function mount() {
    document.body.appendChild(root);
    document.body.appendChild(fab);
    setTimeout(function () { fab.classList.add('is-in'); }, 900);
    bind();
    if (AUTO_OPEN && !seen()) scheduleAutoOpen();
  }

  // ---------- Comportamiento ----------
  var lastFocus = null;
  function open() {
    lastFocus = document.activeElement;
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('nrp-lock');
    markSeen();
    setTimeout(function () { var c = root.querySelector('.nrp__close'); c && c.focus({ preventScroll: true }); }, 60);
    try { if (typeof gtag === 'function') gtag('event', 'view_promotion', { promotion_name: 'Amor y Amistad 2026' }); } catch (e) {}
  }
  function close() {
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('nrp-lock');
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  }
  window.openPromoAmorAmistad = open;

  function seen() { try { return sessionStorage.getItem('nrpPromoSeen') === '1'; } catch (e) { return false; } }
  function markSeen() { try { sessionStorage.setItem('nrpPromoSeen', '1'); } catch (e) {} }

  function scheduleAutoOpen() {
    // En el inicio primero se muestra el "Aviso importante"; la promo aparece cuando ese aviso se cierra.
    var waited = 0;
    (function check() {
      var notice = document.getElementById('notice-flyer');
      if (notice && waited < 15000) { waited += 300; return setTimeout(check, 300); }
      setTimeout(open, notice === null && waited > 0 ? 500 : 2200);
    })();
  }

  function bind() {
    fab.addEventListener('click', open);
    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('is-open')) close();
    });

    // Botones de WhatsApp: el enlace abre WhatsApp directamente; el tracking va aparte
    root.querySelectorAll('.nrp__wa').forEach(function (a) {
      a.addEventListener('click', function () { track(a.getAttribute('data-label')); });
    });

    // Tabs + carrusel (móvil)
    var track_ = root.querySelector('.nrp__plans');
    var tabs = root.querySelector('.nrp__tabs');
    var dots = root.querySelectorAll('.nrp__dots i');
    function setActive(i) {
      tabs.setAttribute('data-i', i);
      tabs.querySelectorAll('button').forEach(function (b, j) { b.setAttribute('aria-selected', String(j === i)); });
      dots.forEach(function (d, j) { d.classList.toggle('on', j === i); });
    }
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]'); if (!b) return;
      var i = +b.getAttribute('data-go');
      track_.scrollTo({ left: track_.children[i].offsetLeft - track_.children[0].offsetLeft, behavior: 'smooth' });
      setActive(i);
    });
    var raf = 0;
    track_.addEventListener('scroll', function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var i = Math.round(track_.scrollLeft / Math.max(1, track_.children[0].offsetWidth));
        setActive(Math.min(PLANS.length - 1, Math.max(0, i)));
      });
    }, { passive: true });

    // Efecto 3D sutil al pasar el mouse (solo escritorio)
    if (window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('.nrp__plan').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = 'perspective(900px) rotateY(' + (x * 6).toFixed(2) + 'deg) rotateX(' + (-y * 6).toFixed(2) + 'deg) translateY(-4px)';
        });
        card.addEventListener('mouseleave', function () { card.style.transform = ''; });
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
