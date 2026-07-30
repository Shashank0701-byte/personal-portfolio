<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quest Log — Section Prototype</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --bg: #ded6c8;
    --bg-soft: #e8e2d6;
    --card: #f2ede2;
    --ink: #1c1a17;
    --sub: #6f6858;
    --line: #c9bfa9;
    --accent: #8f7fd6;
    --accent-dark: #6a58b8;
    --warn: #b3492f;
    --warn-bg: #f4e1da;
    --note: #9c7a2e;
    --note-bg: #f1e6cf;
    --live: #3f7a3a;
    --placeholder-bg: #d8cfbd;
    --placeholder-border: #a89a7d;
  }
  *{ box-sizing:border-box; }
  body{
    margin:0;
    background: var(--bg);
    background-image: radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px);
    background-size: 24px 24px;
    color: var(--ink);
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 80px 24px 120px;
  }
  .wrap{ max-width: 980px; margin:0 auto; position:relative; }

  .ghost-num{
    position:absolute; top:-40px; left:-10px;
    font-size: 140px;
    font-weight:800;
    color: rgba(0,0,0,0.045);
    line-height:1;
    z-index:0;
    user-select:none;
  }

  .eyebrow{
    font-family:'JetBrains Mono', monospace;
    font-size:12px;
    letter-spacing:3px;
    color: var(--sub);
    text-transform:uppercase;
    position:relative; z-index:1;
  }
  h2.title{
    font-size: clamp(32px, 4.5vw, 46px);
    font-weight:800;
    margin: 10px 0 12px;
    position:relative; z-index:1;
  }
  p.lede{
    font-size:17px;
    color: var(--sub);
    max-width:640px;
    margin: 0 0 56px;
    position:relative; z-index:1;
    line-height:1.6;
  }

  .timeline{ position:relative; z-index:1; }
  .rail{
    position:absolute;
    left: 9px;
    top: 10px;
    bottom: 10px;
    width:2px;
    background: repeating-linear-gradient(to bottom, var(--line) 0 6px, transparent 6px 12px);
  }

  .entry{
    position:relative;
    padding-left: 46px;
    margin-bottom: 64px;
  }
  .entry:last-child{ margin-bottom:0; }
  .dot{
    position:absolute;
    left:0; top:6px;
    width:20px; height:20px;
    border-radius:50%;
    background: var(--accent);
    box-shadow: 0 0 0 5px var(--bg), 0 0 0 6px var(--line);
  }
  .entry.placement .dot{ background: var(--live); }

  .meta-row{
    display:flex; align-items:center; flex-wrap:wrap; gap:10px;
    margin-bottom:10px;
  }
  .event-badge{
    font-family:'JetBrains Mono', monospace;
    font-size:11px;
    letter-spacing:1.5px;
    color: var(--accent-dark);
    background: rgba(143,127,214,0.12);
    border: 1px solid rgba(143,127,214,0.35);
    padding: 4px 10px;
    text-transform:uppercase;
  }
  .duration{
    font-family:'JetBrains Mono', monospace;
    font-size:11px;
    color: var(--sub);
    letter-spacing:1px;
  }
  .placement-badge{
    font-family:'JetBrains Mono', monospace;
    font-size:11px;
    letter-spacing:1px;
    color: #fff;
    background: var(--live);
    padding: 4px 10px;
  }

  .entry h3{
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 12px;
  }

  .body-grid{
    display:grid;
    grid-template-columns: 220px 1fr;
    gap: 24px;
    margin-bottom: 18px;
  }
  @media (max-width: 640px){
    .body-grid{ grid-template-columns: 1fr; }
  }

  .media-slot{
    border-radius:8px;
    overflow:hidden;
    background: var(--placeholder-bg);
    border: 1.5px dashed var(--placeholder-border);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    min-height: 150px;
    color: #6b6350;
    text-align:center;
    padding: 14px;
    gap:8px;
  }
  .media-slot .ico{ font-size:26px; }
  .media-slot .label{ font-size:11px; font-family:'JetBrains Mono', monospace; letter-spacing:0.5px; }
  .media-slot.has-photo{
    background-size: cover;
    background-position:center;
    border-style: solid;
    min-height: 170px;
    position:relative;
  }
  .media-slot.has-photo .caption{
    position:absolute; bottom:0; left:0; right:0;
    background: linear-gradient(to top, rgba(0,0,0,0.65), transparent);
    color:#fff; font-size:11px; padding: 18px 10px 8px; text-align:left;
    font-family:'JetBrains Mono', monospace;
  }

  .desc{
    font-size:15px;
    line-height:1.7;
    color: #35322c;
  }

  .callouts{
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:12px;
    margin: 16px 0 18px;
  }
  @media (max-width:640px){ .callouts{ grid-template-columns:1fr; } }
  .callout{
    padding: 12px 14px;
    border-radius:6px;
    font-size:13px;
    line-height:1.5;
  }
  .callout .label{
    font-family:'JetBrains Mono', monospace;
    font-size:10.5px;
    letter-spacing:1px;
    text-transform:uppercase;
    display:block;
    margin-bottom:5px;
    font-weight:600;
  }
  .callout.wrong{ background: var(--warn-bg); color:#5a2618; }
  .callout.wrong .label{ color: var(--warn); }
  .callout.miss{ background: var(--note-bg); color:#4a3814; }
  .callout.miss .label{ color: var(--note); }
  .callout.placeholder{
    background: transparent;
    border: 1.5px dashed var(--placeholder-border);
    color: var(--sub);
    font-style: italic;
  }
  .callout.placeholder .label{ color: var(--sub); }

  .tags{ display:flex; flex-wrap:wrap; gap:8px; }
  .tag{
    font-family:'JetBrains Mono', monospace;
    font-size:11px;
    letter-spacing:0.5px;
    padding: 5px 10px;
    border: 1px solid var(--line);
    border-radius:4px;
    color: #4a4536;
    background: var(--card);
  }
  .tag.category{
    border-color: var(--accent);
    color: var(--accent-dark);
    background: rgba(143,127,214,0.08);
  }
</style>
</head>
<body>
<div class="wrap">
  <span class="ghost-num" aria-hidden="true">06</span>
  <p class="eyebrow">Quest Log</p>
  <h2 class="title">Built under pressure.</h2>
  <p class="lede">Three offline hackathons, three different failure modes, three things I'd do differently. Photos and footage where I have them — honest notes where I don't.</p>

  <div class="timeline">
    <div class="rail" aria-hidden="true"></div>

    <!-- Entry 1: Bruteforce -->
    <div class="entry">
      <span class="dot" aria-hidden="true"></span>
      <div class="meta-row">
        <span class="event-badge">Bruteforce</span>
        <span class="duration">12 HOURS</span>
      </div>
      <h3>Food Rescue Marketplace</h3>
      <div class="body-grid">
        <div class="media-slot">
          <span class="ico">🖼️</span>
          <span class="label">PHOTO GOES HERE</span>
        </div>
        <div class="desc">
          Built a marketplace where hotels and restaurants could list unsold food at 50% off before it went to waste. Users could choose free delivery, no-charge pickup, or walk in to collect — built as a React + Node web app with the Maps API handling location and delivery logistics, plus a companion Flutter mobile app.
        </div>
      </div>
      <div class="callouts">
        <div class="callout placeholder">
          <span class="label">What Went Wrong</span>
          add your note here
        </div>
        <div class="callout placeholder">
          <span class="label">Judge Feedback</span>
          add the remark here
        </div>
      </div>
      <div class="tags">
        <span class="tag category">Food Waste</span>
        <span class="tag category">Marketplace</span>
        <span class="tag">React</span>
        <span class="tag">Node.js</span>
        <span class="tag">Maps API</span>
        <span class="tag">Flutter</span>
      </div>
    </div>

    <!-- Entry 2: Hackman / Veriseal -->
    <div class="entry placement">
      <span class="dot" aria-hidden="true"></span>
      <div class="meta-row">
        <span class="event-badge">Hackman</span>
        <span class="duration">24 HOURS</span>
        <span class="placement-badge">TOP 9</span>
      </div>
      <h3>Veriseal — Tamper-Evident Delivery Tracker</h3>
      <div class="body-grid">
        <div class="media-slot">
          <span class="ico">🎞️</span>
          <span class="label">VIDEO: SOLDERING &amp; PCB BUILD</span>
        </div>
        <div class="desc">
          An accelerometer detected sudden jerks or unauthorized box openings and streamed the data to our platform in real time. Every transit handoff was logged via QR scan, and the final scan at delivery surfaced the full chain of custody — every checkpoint, plus any impact or tamper events along the way. I built the software side: the React/Node platform, the QR scan-and-log pipeline, role-based access control separating what customers vs. the shipping company could see, and a blockchain layer for log integrity.
        </div>
      </div>
      <div class="callouts">
        <div class="callout wrong">
          <span class="label">What Went Wrong</span>
          One of our main hardware components burned out mid-build, weakening our final demo.
        </div>
        <div class="callout miss">
          <span class="label">What We Missed</span>
          A judge pointed out we hadn't considered that the hardware itself could be tampered with or hacked — a real gap in a system built to catch tampering.
        </div>
      </div>
      <div class="tags">
        <span class="tag category">Hardware</span>
        <span class="tag category">IoT</span>
        <span class="tag">React</span>
        <span class="tag">Node.js</span>
        <span class="tag">Blockchain</span>
        <span class="tag">RBAC</span>
      </div>
    </div>

    <!-- Entry 3: Sandbox / Shadow -->
    <div class="entry">
      <span class="dot" aria-hidden="true"></span>
      <div class="meta-row">
        <span class="event-badge">Sandbox</span>
        <span class="duration">24 HOURS</span>
      </div>
      <h3>Shadow Permission Analyzer</h3>
      <div class="body-grid">
        <div class="media-slot">
          <span class="ico">🖼️</span>
          <span class="label">PHOTO GOES HERE</span>
        </div>
        <div class="desc">
          Write your own account here — what the tool does, what you built in the 24 hours, and how the AWS IAM mocking came together with Neo4j's graph traversal.
        </div>
      </div>
      <div class="callouts">
        <div class="callout placeholder">
          <span class="label">What Went Wrong / What We Missed</span>
          add your note here
        </div>
        <div class="callout placeholder">
          <span class="label">Result</span>
          add placement if any
        </div>
      </div>
      <div class="tags">
        <span class="tag category">Security</span>
        <span class="tag category">AWS IAM Mocking</span>
        <span class="tag">React</span>
        <span class="tag">FastAPI</span>
        <span class="tag">Neo4j</span>
        <span class="tag">boto3</span>
      </div>
    </div>

  </div>
</div>
</body>
</html>