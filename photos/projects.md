<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Enchanter's Chamber — Projects</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
  :root{
    --void-1: #0a0714;
    --void-2: #16102b;
    --panel: #c6c6c6;
    --panel-hi: #ffffff;
    --panel-lo: #545454;
    --panel-shadow: #2b2b2b;
    --slot-bg: #8b8b8b;
    --purple-1: #5a3a94;
    --purple-2: #3d2568;
    --purple-3: #2a1a4a;
    --purple-glow: #b28cff;
    --gold: #f6d43c;
    --gold-dark: #93690a;
    --gold-hi: #fff4b0;
    --xp-green: #6bdb4a;
    --xp-green-dark: #2d7a1a;
    --ink: #1b1b1b;
    --paper: #e9e5f5;
    --lvl-live: #6bdb4a;
    --lvl-wip: #f2a93c;
    --lvl-concept: #e0574f;
    --font-display: 'Press Start 2P', monospace;
    --font-body: 'Pixelify Sans', sans-serif;
  }

  *{ box-sizing: border-box; }
  html,body{ height:100%; }
  body{
    margin:0;
    min-height:100vh;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(120,70,220,0.20), transparent 60%),
      radial-gradient(ellipse at 20% 80%, rgba(90,50,180,0.14), transparent 55%),
      linear-gradient(180deg, var(--void-1), var(--void-2));
    font-family: var(--font-body);
    color: var(--paper);
    overflow-x:hidden;
    position:relative;
  }

  @media (prefers-reduced-motion: reduce){
    *{ animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
  }

  /* ---------- floating rune field ---------- */
  #rune-field{
    position:fixed; inset:0; pointer-events:none; z-index:0;
    background-image: radial-gradient(rgba(150,110,230,0.35) 1px, transparent 1px);
    background-size: 26px 26px;
    opacity:0.5;
  }
  .rune{
    position:absolute;
    color: rgba(178,140,255,0.55);
    font-size: 15px;
    letter-spacing: 2px;
    text-shadow: 0 0 8px rgba(150,100,255,0.6);
    user-select:none;
    animation: drift 9s ease-in-out infinite;
  }
  @keyframes drift{
    0%,100%{ transform: translateY(0px); opacity:0.45; }
    50%{ transform: translateY(-10px); opacity:0.85; }
  }

  /* ---------- hero ---------- */
  .hero{
    position:relative; z-index:1;
    max-width: 980px;
    margin: 0 auto;
    padding: 72px 24px 100px;
    text-align:center;
  }
  .eyebrow{
    font-size: 12px;
    letter-spacing: 6px;
    color: #b7a3ec;
    text-transform:uppercase;
  }
  .eyebrow::before, .eyebrow::after{ content:"◆"; margin:0 12px; color: var(--gold); font-size:10px; }

  h1.title{
    font-family: var(--font-display);
    font-size: clamp(28px, 6vw, 56px);
    margin: 22px 0 14px;
    color:#f4f0ff;
    text-shadow: 0 0 18px rgba(170,120,255,0.55), 0 0 40px rgba(120,60,220,0.35);
    line-height:1.3;
  }
  .subtitle{
    font-size: 18px;
    color:#c9bdec;
    margin-bottom: 46px;
  }

  .table-wrap{
    position:relative;
    display:inline-block;
    cursor:pointer;
    border:0;
    background:none;
    padding:0;
  }
  .table-glow{
    position:absolute; inset:-30px;
    background: radial-gradient(circle, rgba(150,90,255,0.35), transparent 70%);
    filter: blur(6px);
    animation: pulse 3.2s ease-in-out infinite;
    border-radius: 50%;
  }
  @keyframes pulse{
    0%,100%{ opacity:0.55; transform:scale(0.96); }
    50%{ opacity:0.95; transform:scale(1.05); }
  }
  .table-wrap img{
    position:relative;
    width: min(420px, 78vw);
    image-rendering: -webkit-optimize-contrast;
    filter: drop-shadow(0 18px 30px rgba(0,0,0,0.55));
    transition: transform .25s ease, filter .25s ease;
    border-radius: 10px;
  }
  .table-wrap:hover img, .table-wrap:focus-visible img{
    transform: translateY(-6px) scale(1.02);
    filter: drop-shadow(0 22px 34px rgba(0,0,0,0.6)) brightness(1.06);
  }
  .table-wrap:focus-visible{ outline: 3px solid var(--gold); outline-offset: 10px; border-radius: 14px; }

  .sparkle{
    position:absolute;
    color: var(--gold-hi);
    font-size: 14px;
    animation: twinkle 1.8s ease-in-out infinite;
    pointer-events:none;
  }
  @keyframes twinkle{
    0%,100%{ opacity:0; transform: scale(0.5) rotate(0deg); }
    50%{ opacity:1; transform: scale(1.1) rotate(20deg); }
  }

  .cta-hint{
    margin-top: 26px;
    font-size: 13px;
    letter-spacing: 3px;
    color: var(--gold);
    animation: blink 1.6s steps(2) infinite;
  }
  @keyframes blink{ 50%{ opacity: 0.35; } }

  .stat-row{
    margin-top: 54px;
    display:flex;
    gap:16px;
    justify-content:center;
    flex-wrap:wrap;
  }
  .stat-card{
    background: linear-gradient(180deg, #2a2340, #1c1730);
    border: 2px solid #4a3d76;
    box-shadow: inset 0 0 0 2px rgba(255,255,255,0.04), 0 6px 14px rgba(0,0,0,0.4);
    padding: 18px 28px;
    min-width: 120px;
    border-radius: 6px;
  }
  .stat-num{ font-family: var(--font-display); font-size: 22px; }
  .stat-label{ font-size: 12px; letter-spacing:2px; color:#a89bd6; margin-top:8px; text-transform:uppercase; }
  .stat-card.live .stat-num{ color: var(--lvl-live); }
  .stat-card.wip .stat-num{ color: var(--lvl-wip); }
  .stat-card.concept .stat-num{ color: var(--lvl-concept); }

  /* ---------- modal ---------- */
  .overlay{
    position:fixed; inset:0; z-index:10;
    background: rgba(6,4,14,0.78);
    display:flex; align-items:center; justify-content:center;
    padding: 20px;
    opacity:0; pointer-events:none;
    transition: opacity .18s ease;
  }
  .overlay.open{ opacity:1; pointer-events:auto; }

  .gui{
    width: min(980px, 100%);
    max-height: 88vh;
    display:flex; flex-direction:column;
    background: var(--panel);
    background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.035) 0 2px, transparent 2px 4px);
    color: var(--ink);
    border: 4px solid var(--panel-shadow);
    box-shadow:
      inset 3px 3px 0 var(--panel-hi),
      inset -3px -3px 0 var(--panel-lo),
      0 20px 50px rgba(0,0,0,0.55);
    transform: scale(0.9) translateY(10px);
    transition: transform .18s ease;
  }
  .overlay.open .gui{ transform: scale(1) translateY(0); }

  .gui-header{
    display:flex; align-items:center; gap:12px;
    padding: 14px 18px;
    border-bottom: 3px solid var(--panel-lo);
    background: linear-gradient(180deg, #d6d6d6, #bcbcbc);
  }
  .gui-header .book{ font-size:20px; }
  .gui-header h2{
    font-family: var(--font-display);
    font-size: 15px;
    margin:0;
    letter-spacing:2px;
    flex:1;
  }
  .close-btn{
    width:34px; height:34px;
    background: var(--slot-bg);
    border: 2px solid var(--panel-shadow);
    box-shadow: inset 2px 2px 0 var(--panel-hi), inset -2px -2px 0 var(--panel-lo);
    font-family: var(--font-display);
    font-size: 12px;
    color: var(--ink);
    cursor:pointer;
  }
  .close-btn:hover{ filter: brightness(1.08); }
  .close-btn:active{ box-shadow: inset -2px -2px 0 var(--panel-hi), inset 2px 2px 0 var(--panel-lo); }

  .gui-body{
    display:grid;
    grid-template-columns: minmax(260px, 1fr) minmax(280px, 1fr);
    gap: 0;
    overflow:hidden;
    flex:1;
    min-height: 0;
  }
  @media (max-width: 760px){
    .gui-body{ grid-template-columns: 1fr; overflow-y:auto; }
  }

  .list-pane{
    padding: 16px 14px 10px;
    border-right: 3px solid var(--panel-lo);
    display:flex; flex-direction:column;
    min-height:0;
  }
  @media (max-width:760px){ .list-pane{ border-right:none; border-bottom:3px solid var(--panel-lo); } }

  .tabs{
    display:flex; gap:8px; flex-wrap:wrap;
    margin-bottom: 12px;
  }
  .tab{
    font-family: var(--font-body);
    font-weight:600;
    font-size: 13px;
    padding: 7px 12px;
    background: var(--slot-bg);
    border: 2px solid var(--panel-shadow);
    box-shadow: inset 1px 1px 0 var(--panel-hi), inset -1px -1px 0 var(--panel-lo);
    color: var(--ink);
    cursor:pointer;
  }
  .tab .count{ opacity:0.75; margin-left:4px; }
  .tab.active{
    background: var(--purple-1);
    color: #f2ebff;
    box-shadow: inset 1px 1px 0 rgba(255,255,255,0.25), inset -1px -1px 0 rgba(0,0,0,0.4);
  }
  .tab.active .count{ opacity:1; }
  .tab:focus-visible{ outline:2px solid var(--gold); outline-offset:2px; }

  .rows{
    overflow-y:auto;
    flex:1;
    padding-right:4px;
    scrollbar-width: thin;
  }
  .row{
    position:relative;
    display:flex; align-items:center; gap:10px;
    padding: 11px 12px;
    margin-bottom:6px;
    background: linear-gradient(180deg, var(--purple-1), var(--purple-2));
    border: 2px solid var(--purple-3);
    box-shadow: inset 1px 1px 0 rgba(255,255,255,0.15), inset -2px -2px 0 rgba(0,0,0,0.3);
    cursor:pointer;
    color: #efe6ff;
    text-align:left;
    width:100%;
    font-family: var(--font-body);
  }
  .row:hover{ filter:brightness(1.12); }
  .row:focus-visible{ outline:2px solid var(--gold); outline-offset:2px; }
  .row.selected{
    background: linear-gradient(180deg, #7a52c4, #4c2f8a);
    box-shadow: inset 1px 1px 0 rgba(255,255,255,0.3), inset -2px -2px 0 rgba(0,0,0,0.35), 0 0 0 2px var(--gold);
  }
  .row.hidden{ display:none; }
  .row .lvl{
    font-family: var(--font-display);
    font-size: 11px;
    width:16px;
    flex-shrink:0;
  }
  .row .icon{ font-size:18px; flex-shrink:0; }
  .row .names{ flex:1; min-width:0; }
  .row .glyph-name{
    font-size:14px; letter-spacing:1px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    display:block;
  }
  .row .real-name{
    display:none;
    font-size:14px; font-weight:600;
  }
  .row .real-sub{
    display:none;
    font-size: 11px;
    color:#cbb8f5;
    margin-top:2px;
  }
  .row.selected .glyph-name{ display:none; }
  .row.selected .real-name{ display:block; }
  .row.selected .real-sub{ display:block; }
  .row .cost{
    font-family: var(--font-display);
    font-size: 11px;
    padding: 4px 8px;
    background:#0d0a18;
    border:1px solid #000;
    flex-shrink:0;
  }
  .cost.c-live{ color: var(--lvl-live); }
  .cost.c-wip{ color: var(--lvl-wip); }
  .cost.c-concept{ color: var(--lvl-concept); }

  /* tooltip */
  .tip{
    position:absolute;
    left: 100%;
    top:50%;
    transform: translateY(-50%);
    margin-left:10px;
    background: linear-gradient(180deg, #2a1a4a, #180d30);
    border: 2px solid #6b3fa0;
    padding:6px 10px;
    font-size:12px;
    white-space:nowrap;
    z-index:5;
    display:none;
    color:#f2ebff;
    box-shadow: 0 6px 14px rgba(0,0,0,0.5);
  }
  .row:hover .tip, .row:focus-visible .tip{ display:block; }
  @media (max-width:760px){ .tip{ display:none !important; } }

  .detail-pane{
    padding: 18px 20px;
    overflow-y:auto;
    min-height:0;
    display:flex; flex-direction:column;
  }
  .d-empty{
    margin:auto; text-align:center; color:#6f6f6f;
  }
  .d-empty .book-ico{ font-size:30px; display:block; margin-bottom:10px; }
  .d-content{ display:none; flex-direction:column; height:100%; }
  .d-content.show{ display:flex; }

  .d-head{ display:flex; align-items:center; gap:12px; padding-bottom:12px; border-bottom:2px solid #9d9d9d; margin-bottom:14px; }
  .d-head .d-icon{ font-size:26px; }
  .d-head h3{ font-family: var(--font-display); font-size:15px; margin:0 0 6px; }
  .d-status{ font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; display:flex; align-items:center; gap:6px; }
  .d-status .dot{ width:8px; height:8px; border-radius:50%; display:inline-block; }
  .d-status.live .dot{ background:var(--lvl-live); box-shadow:0 0 6px var(--lvl-live); }
  .d-status.wip .dot{ background:var(--lvl-wip); box-shadow:0 0 6px var(--lvl-wip); }
  .d-status.concept .dot{ background:var(--lvl-concept); box-shadow:0 0 6px var(--lvl-concept); }
  .d-status.live{ color:#2e7a18; }
  .d-status.wip{ color:#8a5a10; }
  .d-status.concept{ color:#9c2e28; }

  .d-desc{
    background:#9d9d9d;
    background-image: repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 4px);
    border: 2px solid var(--panel-shadow);
    box-shadow: inset 2px 2px 0 rgba(0,0,0,0.15);
    padding: 12px 14px;
    font-size: 13px;
    line-height:1.55;
    color:#161616;
    margin-bottom:16px;
  }

  .section-label{
    font-size:11px; letter-spacing:2px; color:#5a5a5a; text-transform:uppercase; margin-bottom:8px; font-weight:600;
  }

  .xp-bar{
    height:22px;
    background:#2b2b2b;
    border:2px solid #111;
    box-shadow: inset 1px 1px 0 rgba(255,255,255,0.1);
    margin-bottom:16px;
    position:relative;
  }
  .xp-fill{
    height:100%;
    background: linear-gradient(180deg, var(--xp-green), var(--xp-green-dark));
    width:0%;
    transition: width .6s ease;
  }
  .xp-text{
    position:absolute; inset:0;
    display:flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:700; color:#0c2205;
    text-shadow: 0 1px 0 rgba(255,255,255,0.3);
  }

  .chips{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }
  .chip{
    background:#e6e6e6;
    border:2px solid var(--panel-shadow);
    box-shadow: inset 1px 1px 0 var(--panel-hi), inset -1px -1px 0 var(--panel-lo);
    font-size:12px;
    padding:5px 10px;
    color:#2a2a2a;
    font-weight:600;
  }

  .d-rune{
    text-align:center;
    color:#9d9d9d;
    letter-spacing:3px;
    font-size:13px;
    margin: 4px 0 18px;
  }

  .view-btn{
    margin-top:auto;
    display:flex; align-items:center; justify-content:center; gap:10px;
    font-family: var(--font-display);
    font-size:13px;
    color:#3a2900;
    background: linear-gradient(180deg, var(--gold-hi), var(--gold) 55%, var(--gold-dark));
    border: 2px solid #4a3200;
    box-shadow: inset 1px 1px 0 rgba(255,255,255,0.6), inset -2px -2px 0 rgba(0,0,0,0.25);
    padding: 14px;
    text-decoration:none;
    cursor:pointer;
  }
  .view-btn:hover{ filter:brightness(1.05); }
  .view-btn:active{ box-shadow: inset -1px -1px 0 rgba(255,255,255,0.4), inset 2px 2px 0 rgba(0,0,0,0.25); }
  .view-btn[aria-disabled="true"]{ opacity:0.55; cursor:not-allowed; filter:grayscale(0.4); }

  /* tech inventory */
  .inventory{
    border-top: 3px solid var(--panel-lo);
    padding: 14px 18px 18px;
    background: linear-gradient(180deg, #bcbcbc, #c6c6c6);
  }
  .inventory .section-label{ margin-bottom:10px; }
  .slots{
    display:flex; gap:8px; flex-wrap:wrap;
  }
  .slot{
    width:64px;
    background: var(--slot-bg);
    border: 2px solid var(--panel-shadow);
    box-shadow: inset 2px 2px 0 rgba(0,0,0,0.35), inset -1px -1px 0 rgba(255,255,255,0.15);
    padding:8px 4px 6px;
    text-align:center;
    cursor:pointer;
    position:relative;
    color:#eee;
    font-size:10px;
  }
  .slot .t-icon{ font-size:16px; display:block; margin-bottom:4px; }
  .slot .t-count{
    position:absolute; bottom:2px; right:4px;
    font-family: var(--font-display);
    font-size:9px;
    color:#fff;
    text-shadow: 1px 1px 0 #000;
  }
  .slot.active{
    background: var(--purple-1);
    box-shadow: inset 2px 2px 0 rgba(0,0,0,0.4), 0 0 0 2px var(--gold);
  }
  .slot:focus-visible{ outline:2px solid var(--gold); outline-offset:2px; }

  .sr-only{
    position:absolute; width:1px; height:1px; padding:0; margin:-1px;
    overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
  }

  footer.note{
    position:relative; z-index:1;
    text-align:center;
    font-size:11px;
    color:#6a5c95;
    padding-bottom:36px;
    letter-spacing:1px;
  }
</style>
</head>
<body>

<div id="rune-field"></div>

<main class="hero">
  <p class="eyebrow">Enchanter's Chamber</p>
  <h1 class="title">MY PROJECTS</h1>
  <p class="subtitle">Click the enchanting table to reveal your works</p>

  <button class="table-wrap" id="openTrigger" aria-haspopup="dialog" aria-controls="enchant-modal">
    <span class="table-glow" aria-hidden="true"></span>
    <img src="data:image/webp;base64,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" alt="An enchanting table, glowing with purple light" />
    <span class="sparkle" style="top:6%; left:12%;" aria-hidden="true">✦</span>
    <span class="sparkle" style="top:14%; right:10%; animation-delay:.5s;" aria-hidden="true">✦</span>
    <span class="sparkle" style="top:36%; left:2%; animation-delay:1s;" aria-hidden="true">✧</span>
    <span class="sparkle" style="top:44%; right:4%; animation-delay:1.4s;" aria-hidden="true">✧</span>
  </button>

  <p class="cta-hint">[ CLICK TO ENCHANT ]</p>

  <div class="stat-row" id="statRow"></div>
</main>

<footer class="note">right-click / inspect this file to lift the code into your own build</footer>

<div class="overlay" id="overlay">
  <section class="gui" role="dialog" aria-modal="true" aria-labelledby="guiTitle" id="enchant-modal">
    <div class="gui-header">
      <span class="book" aria-hidden="true">📖</span>
      <h2 id="guiTitle">ENCHANT</h2>
      <button class="close-btn" id="closeBtn" aria-label="Close">✕</button>
    </div>
    <div class="gui-body">
      <div class="list-pane">
        <div class="tabs" id="tabs" role="tablist" aria-label="Filter projects"></div>
        <div class="rows" id="rows" role="list"></div>
      </div>
      <div class="detail-pane">
        <div class="d-empty" id="dEmpty">
          <span class="book-ico" aria-hidden="true">📖</span>
          Select an enchantment
        </div>
        <div class="d-content" id="dContent">
          <div class="d-head">
            <span class="d-icon" id="dIcon"></span>
            <div>
              <h3 id="dName"></h3>
              <span class="d-status" id="dStatus"><span class="dot"></span><span id="dStatusText"></span></span>
            </div>
          </div>
          <div class="d-desc" id="dDesc"></div>
          <p class="section-label">Enchantment Power</p>
          <div class="xp-bar"><div class="xp-fill" id="dXpFill"><span class="xp-text" id="dXpText"></span></div></div>
          <p class="section-label">Materials</p>
          <div class="chips" id="dChips"></div>
          <p class="d-rune" id="dRune" aria-hidden="true"></p>
          <a class="view-btn" id="dLink" href="#" target="_blank" rel="noopener">✦ VIEW PROJECT ✦</a>
        </div>
      </div>
    </div>
    <div class="inventory">
      <p class="section-label">Tech Inventory</p>
      <div class="slots" id="techSlots"></div>
    </div>
  </section>
</div>

<script>
/* ---------------------------------------------------------
   1. PROJECT DATA — replace with your real links / copy
--------------------------------------------------------- */
const PROJECTS = [
  {
    id: 'systemcraft', name: 'SystemCraft', icon: '🛠️', status: 'live',
    desc: 'Flagship DevOps system on Kubernetes — Helm/ArgoCD delivery, HPA autoscaling proven under load, full CI/CD and observability.',
    stack: ['Kubernetes', 'Helm', 'ArgoCD', 'Prometheus', 'Grafana', 'GitHub Actions'],
    power: 30, maxPower: 30, link: 'https://system-craft.me'
  },
  {
    id: 'ollive', name: 'ollive.ai', icon: '📊', status: 'live',
    desc: 'Full-stack LLM inference logging and ingestion platform — streaming traces over SSE through a decoupled ingestion service.',
    stack: ['Fastify', 'PostgreSQL', 'Redis Streams', 'React', 'Prometheus'],
    power: 26, maxPower: 30, link: '#'
  },
  {
    id: 'shadow', name: 'Shadow Permission Analyzer', icon: '🔐', status: 'live',
    desc: 'Graph-based AWS IAM security analyzer — traces effective permissions across roles with BFS/DFS traversal to surface privilege escalation paths.',
    stack: ['Neo4j', 'FastAPI', 'boto3'],
    power: 21, maxPower: 30, link: '#'
  },
  {
    id: 'docuflow', name: 'DocuFlow', icon: '📄', status: 'wip',
    desc: 'Document processing pipeline built on a Celery/Redis task queue, backed by PostgreSQL for durable state.',
    stack: ['Docker', 'Celery', 'Redis', 'PostgreSQL'],
    power: 16, maxPower: 30, link: '#'
  },
  {
    id: 'devfc', name: 'DevFC', icon: '⚽', status: 'wip',
    desc: 'Turns a GitHub profile into a FIFA-style stat card, complete with a pack-opening reveal animation.',
    stack: ['React', 'Node.js'],
    power: 12, maxPower: 30, link: '#'
  },
  {
    id: 'githeat', name: 'git-heat', icon: '🔥', status: 'concept',
    desc: 'Terminal Git heatmap CLI, written in Go — a working prototype already aliased into daily use.',
    stack: ['Go', 'CLI'],
    power: 6, maxPower: 30, link: '#'
  }
];
PROJECTS.sort((a,b) => b.power - a.power);

const STATUS_META = {
  live:    { label: 'Live',    cls: 'live',    color: 'var(--lvl-live)' },
  wip:     { label: 'In Progress', cls: 'wip', color: 'var(--lvl-wip)' },
  concept: { label: 'Concept', cls: 'concept', color: 'var(--lvl-concept)' }
};

/* ---------------------------------------------------------
   2. RUNE CIPHER — deterministic letter -> runic glyph
--------------------------------------------------------- */
const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ".split('');
function toRunes(str){
  return str.toLowerCase().split('').map(ch => {
    if (ch === ' ') return '  ';
    const code = ch.charCodeAt(0);
    return RUNES[code % RUNES.length];
  }).join('');
}

/* ---------------------------------------------------------
   3. HERO: floating background runes + stat cards
--------------------------------------------------------- */
const runeField = document.getElementById('rune-field');
const heroWords = PROJECTS.map(p => toRunes(p.name.slice(0,6)));
for (let i = 0; i < 16; i++){
  const el = document.createElement('span');
  el.className = 'rune';
  el.textContent = heroWords[i % heroWords.length];
  el.style.top = (Math.random()*90 + 3) + '%';
  el.style.left = (Math.random()*92 + 2) + '%';
  el.style.animationDelay = (Math.random()*4) + 's';
  el.style.animationDuration = (7 + Math.random()*5) + 's';
  runeField.appendChild(el);
}

const counts = { live:0, wip:0, concept:0 };
PROJECTS.forEach(p => counts[p.status]++);
const statRow = document.getElementById('statRow');
['live','wip','concept'].forEach(key => {
  const card = document.createElement('div');
  card.className = 'stat-card ' + key;
  card.innerHTML = `<div class="stat-num">${counts[key]}</div><div class="stat-label">${STATUS_META[key].label}</div>`;
  statRow.appendChild(card);
});

/* ---------------------------------------------------------
   4. MODAL: tabs, rows, detail panel, tech inventory
--------------------------------------------------------- */
const overlay = document.getElementById('overlay');
const openTrigger = document.getElementById('openTrigger');
const closeBtn = document.getElementById('closeBtn');
const rowsEl = document.getElementById('rows');
const tabsEl = document.getElementById('tabs');
const techSlotsEl = document.getElementById('techSlots');

const dEmpty = document.getElementById('dEmpty');
const dContent = document.getElementById('dContent');
const dIcon = document.getElementById('dIcon');
const dName = document.getElementById('dName');
const dStatus = document.getElementById('dStatus');
const dStatusText = document.getElementById('dStatusText');
const dDesc = document.getElementById('dDesc');
const dXpFill = document.getElementById('dXpFill');
const dXpText = document.getElementById('dXpText');
const dChips = document.getElementById('dChips');
const dRune = document.getElementById('dRune');
const dLink = document.getElementById('dLink');

let currentFilter = 'all';
let currentTech = null;
let selectedId = null;

// Build tabs
const filterDefs = [
  { key:'all', label:'All' },
  { key:'live', label:'Live' },
  { key:'wip', label:'WIP' },
  { key:'concept', label:'Concept' }
];
filterDefs.forEach(f => {
  const count = f.key === 'all' ? PROJECTS.length : counts[f.key];
  const btn = document.createElement('button');
  btn.className = 'tab' + (f.key === 'all' ? ' active' : '');
  btn.setAttribute('role','tab');
  btn.dataset.filter = f.key;
  btn.innerHTML = `${f.label} <span class="count">(${count})</span>`;
  btn.addEventListener('click', () => {
    currentFilter = f.key;
    [...tabsEl.children].forEach(t => t.classList.toggle('active', t === btn));
    applyFilters();
  });
  tabsEl.appendChild(btn);
});

// Build rows
PROJECTS.forEach((p, idx) => {
  const row = document.createElement('button');
  row.className = 'row';
  row.dataset.status = p.status;
  row.dataset.stack = p.stack.join(',');
  row.setAttribute('role','listitem');
  row.innerHTML = `
    <span class="lvl" style="color:${STATUS_META[p.status].color}">${idx+1}</span>
    <span class="icon">${p.icon}</span>
    <span class="names">
      <span class="glyph-name">${toRunes(p.name)}</span>
      <span class="real-name">${p.name}</span>
      <span class="real-sub">${p.stack.slice(0,2).join(' · ')}</span>
    </span>
    <span class="cost c-${p.status}">${p.power}</span>
    <span class="tip">${p.name}</span>
  `;
  row.addEventListener('click', () => selectProject(p.id));
  rowsEl.appendChild(row);
});

function selectProject(id){
  selectedId = id;
  const p = PROJECTS.find(x => x.id === id);
  [...rowsEl.children].forEach(r => {
    r.classList.toggle('selected', PROJECTS[[...rowsEl.children].indexOf(r)].id === id);
  });
  dEmpty.style.display = 'none';
  dContent.classList.add('show');
  dIcon.textContent = p.icon;
  dName.textContent = p.name;
  dStatus.className = 'd-status ' + p.status;
  dStatusText.textContent = STATUS_META[p.status].label;
  dDesc.textContent = p.desc;
  dChips.innerHTML = p.stack.map(s => `<span class="chip">${s}</span>`).join('');
  dRune.textContent = toRunes(p.name);
  const pct = Math.round((p.power / p.maxPower) * 100);
  requestAnimationFrame(() => { dXpFill.style.width = pct + '%'; });
  dXpText.textContent = `${p.power} / ${p.maxPower} XP`;
  if (p.link && p.link !== '#'){
    dLink.href = p.link;
    dLink.removeAttribute('aria-disabled');
    dLink.textContent = '';
    dLink.innerHTML = '✦ VIEW PROJECT ✦';
  } else {
    dLink.removeAttribute('href');
    dLink.setAttribute('aria-disabled','true');
    dLink.innerHTML = '✦ LINK COMING SOON ✦';
  }
}

// Tech inventory (aggregate stack counts)
const techCounts = {};
PROJECTS.forEach(p => p.stack.forEach(t => { techCounts[t] = (techCounts[t]||0)+1; }));
const TECH_ICONS = {
  'Kubernetes':'☸️','Helm':'⎈','ArgoCD':'🔄','Prometheus':'🔥','Grafana':'📈','GitHub Actions':'⚙️',
  'Fastify':'⚡','PostgreSQL':'🐘','Redis Streams':'📡','React':'⚛️','Neo4j':'🕸️','FastAPI':'🚀',
  'boto3':'☁️','Docker':'🐳','Celery':'🌿','Node.js':'🟢','Go':'🐹','CLI':'⌨️'
};
Object.keys(techCounts).sort((a,b)=>techCounts[b]-techCounts[a]).forEach(tech => {
  const slot = document.createElement('button');
  slot.className = 'slot';
  slot.innerHTML = `<span class="t-icon">${TECH_ICONS[tech] || '🔹'}</span>${tech}<span class="t-count">${techCounts[tech]}</span>`;
  slot.setAttribute('aria-pressed','false');
  slot.title = 'Filter by ' + tech;
  slot.addEventListener('click', () => {
    if (currentTech === tech){
      currentTech = null;
      slot.classList.remove('active');
      slot.setAttribute('aria-pressed','false');
    } else {
      [...techSlotsEl.children].forEach(s => { s.classList.remove('active'); s.setAttribute('aria-pressed','false'); });
      currentTech = tech;
      slot.classList.add('active');
      slot.setAttribute('aria-pressed','true');
    }
    applyFilters();
  });
  techSlotsEl.appendChild(slot);
});

function applyFilters(){
  [...rowsEl.children].forEach(row => {
    const statusOk = currentFilter === 'all' || row.dataset.status === currentFilter;
    const techOk = !currentTech || row.dataset.stack.split(',').includes(currentTech);
    row.classList.toggle('hidden', !(statusOk && techOk));
  });
}

/* ---------------------------------------------------------
   5. OPEN / CLOSE + focus handling
--------------------------------------------------------- */
function openModal(){
  overlay.classList.add('open');
  closeBtn.focus();
  document.addEventListener('keydown', onKeydown);
}
function closeModal(){
  overlay.classList.remove('open');
  document.removeEventListener('keydown', onKeydown);
  openTrigger.focus();
}
function onKeydown(e){
  if (e.key === 'Escape') closeModal();
}
openTrigger.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

// Auto-select the top project on first open, for a populated first impression
let firstOpen = true;
openTrigger.addEventListener('click', () => {
  if (firstOpen){ selectProject(PROJECTS[0].id); firstOpen = false; }
});
</script>
</body>
</html>