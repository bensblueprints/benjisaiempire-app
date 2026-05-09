import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Toolkit — Software I Actually Use | Benji's AI Empire",
  description: "Honest opinions on every piece of software I run the agency on. Real affiliate links. Member-only promo codes inside Insider.",
  alternates: { canonical: "https://benjisaiempire.com/partners/" },
  openGraph: { title: "The Toolkit — What I Actually Use", description: "Real opinions on the stack. Affiliate links where they exist. Member promo codes inside Insider.", url: "https://benjisaiempire.com/partners/", images: [{ url: "https://benjisaiempire.com/images/hero-empire.jpg?v=2" }], type: "website" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  main { display:block; }

  /* HERO */
  .toolkit-hero{
    position:relative;
    padding: clamp(80px, 10vw, 160px) clamp(20px, 4vw, 64px) clamp(56px, 6vw, 96px);
    background:
      radial-gradient(1200px 600px at 80% -10%, rgba(212,175,55,.08), transparent 60%),
      var(--ink);
    border-bottom:1px solid var(--line);
    overflow:hidden;
    isolation:isolate;
  }
  .toolkit-hero::before{
    content:"";
    position:absolute; inset:0;
    background-image: linear-gradient(to right, var(--line) 1px, transparent 1px);
    background-size: calc(100% / 12) 100%;
    opacity:.30;
    mask-image: linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%);
    pointer-events:none; z-index:0;
  }
  .toolkit-hero__inner{
    position:relative; max-width:1480px; margin:0 auto;
    display:grid; grid-template-columns:1fr; gap:clamp(28px, 4vw, 56px); z-index:1;
  }
  @media (min-width:1000px){
    .toolkit-hero__inner{ grid-template-columns: 1.05fr 1fr; align-items:end; gap:80px; }
  }
  .toolkit-hero__rail{
    display:flex; align-items:center; gap:14px;
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.28em; text-transform:uppercase;
    color:var(--cream); margin-bottom:22px;
  }
  .toolkit-hero__rail .num{ color:var(--gold); }
  .toolkit-hero__rail .bar{ flex:0 0 56px; height:2px; background:var(--gold); }
  .toolkit-hero__rail .meta{ color:var(--cream-soft); margin-left:auto; }
  .toolkit-hero__display{
    font-family:'Anton', sans-serif; font-weight:400;
    font-size:clamp(56px, 10vw, 168px);
    line-height:.86; letter-spacing:-.012em;
    text-transform:uppercase; color:var(--cream); margin:0;
  }
  .toolkit-hero__display .accent{ color:var(--gold); }
  .toolkit-hero__display .outline{
    color:transparent; -webkit-text-stroke:1.5px var(--cream);
  }
  .toolkit-hero__lede{
    font-family:'Fraunces', serif; font-weight:400; font-style:italic;
    font-size:clamp(18px, 1.6vw, 24px); line-height:1.5;
    color:var(--cream-soft); max-width:50ch; margin:0;
  }
  .toolkit-hero__lede em{ font-style:normal; color:var(--gold-bright); }
  .toolkit-hero__metarow{
    grid-column: 1 / -1; margin-top:36px; padding-top:24px;
    border-top:1px solid var(--line);
    display:flex; flex-wrap:wrap; gap:24px 56px;
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.18em; text-transform:uppercase;
    color:var(--cream-soft);
  }
  .toolkit-hero__metarow strong{ color:var(--cream); font-weight:600; margin-right:8px; }

  /* TIER ROWS */
  .toolkit-section{
    background:var(--ink);
    padding: clamp(56px, 7vw, 112px) clamp(20px, 4vw, 64px);
    border-bottom:1px solid var(--line);
  }
  .toolkit-section__inner{ max-width:1480px; margin:0 auto; }
  .tier-block{ margin-bottom: 0; }
  .tier-head{
    display:grid; grid-template-columns:1fr; gap:14px;
    padding-bottom:22px; margin-bottom:36px;
    border-bottom:1px solid var(--line);
  }
  @media(min-width:900px){
    .tier-head{ grid-template-columns: auto 1fr auto; align-items:end; gap:32px; }
  }
  .tier-head__num{
    font-family:'Anton', sans-serif;
    font-size:clamp(56px, 6vw, 96px); line-height:.85;
    color:transparent; -webkit-text-stroke:1.5px var(--gold);
    letter-spacing:-.01em;
  }
  .tier-head__title{
    font-family:'Anton', sans-serif; font-weight:400;
    text-transform:uppercase;
    font-size:clamp(28px, 3.4vw, 52px);
    color:var(--cream); line-height:.95; letter-spacing:-.005em; margin:0;
  }
  .tier-head__sub{
    font-family:'Fraunces', serif; font-style:italic; font-weight:400;
    font-size:clamp(14px, 1vw, 17px);
    color:var(--cream-soft); margin-top:8px; max-width:48ch;
  }
  .tier-head__count{
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.22em; text-transform:uppercase;
    color:var(--gold); white-space:nowrap;
  }

  .partner-grid{
    display:grid; grid-template-columns:1fr; gap: clamp(20px, 2.5vw, 36px);
  }
  @media(min-width:720px){ .partner-grid{ grid-template-columns:repeat(2, 1fr); } }
  @media(min-width:1100px){ .partner-grid{ grid-template-columns:repeat(3, 1fr); } }

  .partner-card{
    position:relative; display:flex; flex-direction:column;
    background: var(--ink-2); border:1px solid var(--line);
    border-radius:2px; padding: clamp(20px, 2vw, 30px);
    transition: border-color .25s ease, transform .25s ease, background .25s ease;
    isolation:isolate;
  }
  .partner-card::before{
    content:""; position:absolute; left:0; top:0; bottom:0; width:2px;
    background:var(--gold); transform:scaleY(0); transform-origin:top;
    transition: transform .35s var(--ease);
  }
  .partner-card:hover{
    border-color: rgba(212,175,55,.45);
    background: var(--ink-3); transform: translateY(-3px);
  }
  .partner-card:hover::before{ transform:scaleY(1); }
  .partner-card__top{
    display:flex; align-items:center; justify-content:space-between;
    gap:14px; margin-bottom:18px;
  }
  .partner-card__logo{
    font-family:'Anton', sans-serif;
    font-size:clamp(22px, 2vw, 30px); line-height:1;
    text-transform:uppercase; letter-spacing:.005em;
    color:var(--cream);
  }
  .partner-card__logo .accent{ color:var(--gold); }
  .partner-card__pill{
    font-family:'JetBrains Mono', monospace;
    font-size:9.5px; letter-spacing:.24em; text-transform:uppercase;
    color:var(--cream-soft);
    border:1px solid var(--line); padding:5px 8px; border-radius:1px;
  }
  .partner-card__pill--code{ color:var(--gold); border-color:rgba(212,175,55,.4); }
  .partner-card__what{
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.18em; text-transform:uppercase;
    color:var(--gold); margin-bottom:12px;
  }
  .partner-card__why{
    font-family:'Fraunces', serif; font-weight:400;
    font-size:16px; line-height:1.5;
    color:var(--bone); margin:0 0 22px; flex:1;
  }
  .partner-card__why em{ font-style:italic; color:var(--cream); }
  .partner-card__cta{
    display:inline-flex; align-items:center; justify-content:space-between;
    gap:8px; padding-top:14px; border-top:1px solid var(--line);
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.22em; text-transform:uppercase;
    color:var(--cream); transition: color .2s ease;
  }
  .partner-card__cta::after{
    content:"→"; color:var(--gold);
    font-family:'Manrope', sans-serif; letter-spacing:0;
    transition: transform .2s ease;
  }
  .partner-card:hover .partner-card__cta{ color:var(--gold-bright); }
  .partner-card:hover .partner-card__cta::after{ transform: translateX(4px); }

  /* MEMBER NOTE */
  .member-note{
    background:var(--ink);
    padding: clamp(56px, 7vw, 96px) clamp(20px, 4vw, 64px);
    border-bottom:1px solid var(--line);
  }
  .member-note__inner{
    max-width:980px; margin:0 auto;
    border:1px solid var(--line);
    background: linear-gradient(180deg, rgba(212,175,55,.06), transparent);
    padding: clamp(28px, 4vw, 56px);
    border-radius:2px; display:grid; gap:18px;
  }
  .member-note__eyebrow{
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.28em; text-transform:uppercase;
    color:var(--gold);
  }
  .member-note__title{
    font-family:'Anton', sans-serif; font-weight:400;
    font-size:clamp(28px, 3.6vw, 52px);
    line-height:.95; letter-spacing:-.005em;
    text-transform:uppercase; color:var(--cream); margin:0;
  }
  .member-note__copy{
    font-family:'Fraunces', serif; font-weight:400; font-style:italic;
    font-size:clamp(16px, 1.2vw, 19px); line-height:1.55;
    color:var(--cream-soft); max-width:62ch; margin:0;
  }
  .member-note__copy em{ color:var(--gold-bright); font-style:normal; }
  .member-note__cta{
    margin-top:8px;
    display:inline-flex; align-items:center; gap:10px;
    align-self:start;
    padding:14px 22px;
    background:var(--gold); color:var(--ink);
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.24em; text-transform:uppercase;
    border:1px solid var(--gold);
    transition: background .2s ease, transform .2s ease;
  }
  .member-note__cta::after{ content:"→"; font-family:'Manrope', sans-serif; letter-spacing:0; }
  .member-note__cta:hover{ background:var(--gold-bright); transform:translateX(3px); }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `



<main>

  <!-- HERO -->
  <section class="toolkit-hero" aria-label="Toolkit hero">
    <div class="toolkit-hero__inner">
      <div>
        <div class="toolkit-hero__rail">
          <span class="num">FILE 04</span>
          <span class="bar" aria-hidden="true"></span>
          <span>The Toolkit</span>
          <span class="meta">Updated 05 / 2026</span>
        </div>
        <h1 class="toolkit-hero__display">
          What I <span class="accent">actually</span><br/>
          <span class="outline">use.</span>
        </h1>
      </div>
      <p class="toolkit-hero__lede">
        Honest opinions. Real affiliate links where they exist. <em>Member-only promo codes</em> inside
        Insider. If a tool is on this page, I am paying for it this month — not because someone sent
        me a t-shirt.
      </p>
      <div class="toolkit-hero__metarow">
        <span><strong>19</strong> tools</span>
        <span><strong>4</strong> tiers</span>
        <span><strong>$0</strong> sponsorships</span>
        <span><strong>UTM</strong> tracked</span>
      </div>
    </div>
  </section>

  <!-- TIER 1 -->
  <section class="toolkit-section" aria-label="Tier 1 — The foundation">
    <div class="toolkit-section__inner">
      <div class="tier-block">
        <header class="tier-head">
          <div class="tier-head__num">01</div>
          <div>
            <h2 class="tier-head__title">The Foundation</h2>
            <p class="tier-head__sub">If these five disappeared tomorrow, the agency would stop running by Wednesday.</p>
          </div>
          <div class="tier-head__count">5 tools · core stack</div>
        </header>
        <div class="partner-grid">

          <a class="partner-card" href="https://www.gohighlevel.com/?fp_ref=benjisaiempire&utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener sponsored">
            <div class="partner-card__top">
              <div class="partner-card__logo">Go<span class="accent">HighLevel</span></div>
              <span class="partner-card__pill partner-card__pill--code">Insider Code</span>
            </div>
            <div class="partner-card__what">CRM · Dialer · Email · Funnels · Courses</div>
            <p class="partner-card__why">
              The whole stack in one login. I run client SaaS sub-accounts on top of this — that's the
              entire $49 wholesale offer. <em>Nothing else combines this much under one roof for the price.</em>
            </p>
            <span class="partner-card__cta">Visit GoHighLevel</span>
          </a>

          <a class="partner-card" href="https://www.anthropic.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">Claude</div>
              <span class="partner-card__pill">No affiliate</span>
            </div>
            <div class="partner-card__what">Primary AI co-pilot</div>
            <p class="partner-card__why">
              Code, copy, strategy. Better long-context reasoning than anything else right now and it
              doesn't pretend to know things it doesn't. <em>Half this site was written with it.</em>
            </p>
            <span class="partner-card__cta">Visit Anthropic</span>
          </a>

          <a class="partner-card" href="https://openai.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">Open<span class="accent">AI</span></div>
              <span class="partner-card__pill">No affiliate</span>
            </div>
            <div class="partner-card__what">Secondary AI · GPT-4o + image gen</div>
            <p class="partner-card__why">
              Specific tasks where it outperforms — image generation, voice transcription, fast structured
              output. I keep both subs because the bake-off changes monthly.
            </p>
            <span class="partner-card__cta">Visit OpenAI</span>
          </a>

          <a class="partner-card" href="https://cursor.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener sponsored">
            <div class="partner-card__top">
              <div class="partner-card__logo">Cursor</div>
              <span class="partner-card__pill partner-card__pill--code">Insider Code</span>
            </div>
            <div class="partner-card__what">Code editor with AI built in</div>
            <p class="partner-card__why">
              Built half my client sites in this. Tab-to-edit + agent mode means I ship a full marketing
              site in a Thursday afternoon. <em>If you build websites, this is the unfair advantage.</em>
            </p>
            <span class="partner-card__cta">Visit Cursor</span>
          </a>

          <a class="partner-card" href="https://www.make.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener sponsored">
            <div class="partner-card__top">
              <div class="partner-card__logo">Make</div>
              <span class="partner-card__pill partner-card__pill--code">Insider Code</span>
            </div>
            <div class="partner-card__what">Automation glue · formerly Integromat</div>
            <p class="partner-card__why">
              When GHL workflows hit a wall, I drop into Make. Cheaper than Zapier, more flexible, and
              the visual canvas means I can hand it to a VA without writing a manual.
            </p>
            <span class="partner-card__cta">Visit Make</span>
          </a>

        </div>
      </div>
    </div>
  </section>

  <!-- TIER 2 -->
  <section class="toolkit-section" aria-label="Tier 2 — The workhorses">
    <div class="toolkit-section__inner">
      <div class="tier-block">
        <header class="tier-head">
          <div class="tier-head__num">02</div>
          <div>
            <h2 class="tier-head__title">The Workhorses</h2>
            <p class="tier-head__sub">Boring infrastructure. The stuff that needs to never break — because when it breaks, money stops.</p>
          </div>
          <div class="tier-head__count">4 tools · infra</div>
        </header>
        <div class="partner-grid">

          <a class="partner-card" href="https://stripe.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">Stripe</div>
              <span class="partner-card__pill">No affiliate</span>
            </div>
            <div class="partner-card__what">Payments</div>
            <p class="partner-card__why">
              Every dollar this empire collects passes through Stripe. <em>I have never had a real
              support issue in eight years.</em> The fees are the fees — pay them and move on.
            </p>
            <span class="partner-card__cta">Visit Stripe</span>
          </a>

          <a class="partner-card" href="https://www.shopify.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener sponsored">
            <div class="partner-card__top">
              <div class="partner-card__logo">Shopify</div>
              <span class="partner-card__pill">Affiliate</span>
            </div>
            <div class="partner-card__what">E-com · the cannabis stack</div>
            <p class="partner-card__why">
              Runs the cannabis store that did $2.8M last year. Themes are overpriced, apps are
              overpriced, but it converts and it doesn't go down on Black Friday.
            </p>
            <span class="partner-card__cta">Visit Shopify</span>
          </a>

          <a class="partner-card" href="https://www.cloudflare.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">Cloudflare</div>
              <span class="partner-card__pill">No affiliate</span>
            </div>
            <div class="partner-card__what">DNS · DDoS · Workers</div>
            <p class="partner-card__why">
              Free tier handles every site I ship. The DNS is fast, the dashboard isn't insulting, and
              I haven't been DDoS'd off the internet once. Workers do the cheap edge work.
            </p>
            <span class="partner-card__cta">Visit Cloudflare</span>
          </a>

          <a class="partner-card" href="https://coolify.io/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">Coolify</div>
              <span class="partner-card__pill">Open source</span>
            </div>
            <div class="partner-card__what">Self-hosted deploy</div>
            <p class="partner-card__why">
              Runs on a $20 Contabo VPS instead of $200/mo on the trendy host. Dockerfile in, domain
              out, done. <em>Every site I build now lives on this — including the one you're reading.</em>
            </p>
            <span class="partner-card__cta">Visit Coolify</span>
          </a>

        </div>
      </div>
    </div>
  </section>

  <!-- TIER 3 -->
  <section class="toolkit-section" aria-label="Tier 3 — Specialists">
    <div class="toolkit-section__inner">
      <div class="tier-block">
        <header class="tier-head">
          <div class="tier-head__num">03</div>
          <div>
            <h2 class="tier-head__title">The Specialists</h2>
            <p class="tier-head__sub">Used in narrow lanes. Each one earned its slot by being the cleanest answer to a specific job.</p>
          </div>
          <div class="tier-head__count">5 tools · selective use</div>
        </header>
        <div class="partner-grid">

          <a class="partner-card" href="https://vercel.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">Vercel</div>
              <span class="partner-card__pill">No affiliate</span>
            </div>
            <div class="partner-card__what">When speed beats price</div>
            <p class="partner-card__why">
              Most projects ship to Coolify. But when a client cares more about Lighthouse 100s than
              the bill, Vercel earns its tax. <em>I use it when the use case demands it — not by default.</em>
            </p>
            <span class="partner-card__cta">Visit Vercel</span>
          </a>

          <a class="partner-card" href="https://www.notion.so/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener sponsored">
            <div class="partner-card__top">
              <div class="partner-card__logo">Notion</div>
              <span class="partner-card__pill">Affiliate</span>
            </div>
            <div class="partner-card__what">Wiki · client portals</div>
            <p class="partner-card__why">
              Every SOP, every client folder, every cold-call script lives here. Clunky on mobile.
              Better than the alternative, which is slack-message archeology.
            </p>
            <span class="partner-card__cta">Visit Notion</span>
          </a>

          <a class="partner-card" href="https://slack.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">Slack</div>
              <span class="partner-card__pill">No affiliate</span>
            </div>
            <div class="partner-card__what">Team comms · still</div>
            <p class="partner-card__why">
              Yes still. Tried Discord, tried Teams, tried Loop. Slack lost a step but the search
              works and the integrations are mature. <em>Sometimes "still" is the answer.</em>
            </p>
            <span class="partner-card__cta">Visit Slack</span>
          </a>

          <a class="partner-card" href="https://1password.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener sponsored">
            <div class="partner-card__top">
              <div class="partner-card__logo">1Password</div>
              <span class="partner-card__pill">Affiliate</span>
            </div>
            <div class="partner-card__what">Credentials</div>
            <p class="partner-card__why">
              Shared vaults per client. The passkey support is finally good. If your team is still
              passing logins in Slack DMs, fix that this week — not next quarter.
            </p>
            <span class="partner-card__cta">Visit 1Password</span>
          </a>

          <a class="partner-card" href="https://figma.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">Figma</div>
              <span class="partner-card__pill">No affiliate</span>
            </div>
            <div class="partner-card__what">Design · when not building direct</div>
            <p class="partner-card__why">
              Used less now that Cursor + Tailwind lets me skip the mockup. Still where every client
              presentation lives, and where the brand work starts.
            </p>
            <span class="partner-card__cta">Visit Figma</span>
          </a>

        </div>
      </div>
    </div>
  </section>

  <!-- TIER 4 -->
  <section class="toolkit-section" aria-label="Tier 4 — The operator stack">
    <div class="toolkit-section__inner">
      <div class="tier-block">
        <header class="tier-head">
          <div class="tier-head__num">04</div>
          <div>
            <h2 class="tier-head__title">The Operator Stack</h2>
            <p class="tier-head__sub">Gritty, in-the-weeds tools. Not glamorous. They're what make a real outbound operation actually run.</p>
          </div>
          <div class="tier-head__count">7 tools · in the weeds</div>
        </header>
        <div class="partner-grid">

          <a class="partner-card" href="https://www.apollo.io/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener sponsored">
            <div class="partner-card__top">
              <div class="partner-card__logo">Apollo</div>
              <span class="partner-card__pill">Affiliate</span>
            </div>
            <div class="partner-card__what">Prospecting · entry-level</div>
            <p class="partner-card__why">
              Where I send beginners. Decent data, fair price, fewer footguns than Clay. <em>Use this
              first; graduate when the volume justifies it.</em>
            </p>
            <span class="partner-card__cta">Visit Apollo</span>
          </a>

          <a class="partner-card" href="https://clay.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener sponsored">
            <div class="partner-card__top">
              <div class="partner-card__logo">Clay</div>
              <span class="partner-card__pill">Affiliate</span>
            </div>
            <div class="partner-card__what">Prospecting · advanced</div>
            <p class="partner-card__why">
              Where you graduate to. Waterfall enrichment, AI columns, real list-building. Powerful
              and expensive. Worth it once you're running paid outbound at volume.
            </p>
            <span class="partner-card__cta">Visit Clay</span>
          </a>

          <a class="partner-card" href="https://aircall.io/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">AirCall</div>
              <span class="partner-card__pill">No affiliate</span>
            </div>
            <div class="partner-card__what">Phone · for power dialers</div>
            <p class="partner-card__why">
              When the GHL dialer isn't enough — usually meaning a team of 3+ SDRs with parallel
              dialing. Pricey, but the call quality is unimpeachable.
            </p>
            <span class="partner-card__cta">Visit AirCall</span>
          </a>

          <a class="partner-card" href="https://www.openphone.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener sponsored">
            <div class="partner-card__top">
              <div class="partner-card__logo">OpenPhone</div>
              <span class="partner-card__pill">Affiliate</span>
            </div>
            <div class="partner-card__what">Phone · for solo operators</div>
            <p class="partner-card__why">
              The cheaper sibling. Solo founders, agencies under five seats. Clean app, AI transcripts
              that are actually useful, the texts deliver. <em>Real opinion: better UX than AirCall.</em>
            </p>
            <span class="partner-card__cta">Visit OpenPhone</span>
          </a>

          <a class="partner-card" href="https://www.loom.com/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">Loom</div>
              <span class="partner-card__pill">No affiliate</span>
            </div>
            <div class="partner-card__what">Async video</div>
            <p class="partner-card__why">
              Two-minute Looms close more deals than a 45-minute Zoom does. Send three before the
              first call. The clients who watch are the clients who close.
            </p>
            <span class="partner-card__cta">Visit Loom</span>
          </a>

          <a class="partner-card" href="https://otter.ai/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener sponsored">
            <div class="partner-card__top">
              <div class="partner-card__logo">Otter</div>
              <span class="partner-card__pill">Affiliate</span>
            </div>
            <div class="partner-card__what">Transcription · meeting notes</div>
            <p class="partner-card__why">
              Joins every sales call. The summaries are good enough that I read them instead of
              re-watching the recording. <em>Saves an hour a day, easily.</em>
            </p>
            <span class="partner-card__cta">Visit Otter</span>
          </a>

          <a class="partner-card" href="https://linear.app/?utm_source=benjisaiempire&utm_medium=partners&utm_campaign=toolkit" target="_blank" rel="noopener">
            <div class="partner-card__top">
              <div class="partner-card__logo">Linear</div>
              <span class="partner-card__pill">No affiliate</span>
            </div>
            <div class="partner-card__what">Issues · when GitHub isn't enough</div>
            <p class="partner-card__why">
              Used on team projects when GitHub Issues turns into a swamp. Keyboard-first, beautiful,
              opinionated. <em>For solo work I still live in GitHub.</em>
            </p>
            <span class="partner-card__cta">Visit Linear</span>
          </a>

        </div>
      </div>
    </div>
  </section>

  <!-- MEMBER NOTE -->
  <section class="member-note" aria-label="Member promo codes">
    <div class="member-note__inner">
      <span class="member-note__eyebrow">For Insiders</span>
      <h2 class="member-note__title">The codes aren't on the public links.</h2>
      <p class="member-note__copy">
        Insiders ($10/mo) get my <em>member-only promo codes</em> for several of these — discounts
        I've negotiated that aren't published on the public affiliate links above. Posted in the
        community vault, updated whenever a new deal opens.
      </p>
      <a class="member-note__cta" href="/insider/">Open Insider — $10/mo</a>
    </div>
  </section>

</main>



` }} />
      <Footer />
    </>
  );
}
