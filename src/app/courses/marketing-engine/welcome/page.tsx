import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Welcome — AI Marketing Engine | Benji's AI Empire",
  description: "You're in. Here's the 24-hour playbook for AI Marketing Engine.",
  alternates: { canonical: "https://benjisaiempire.com/courses/marketing-engine/welcome" },
  robots: { index: false, follow: true },
  openGraph: { title: "Welcome — AI Marketing Engine", description: "Course access provisioned. Here's what to do next.", images: [{ url: "https://benjisaiempire.com/images/course-marketing-engine.jpg?v=2" }], type: "website" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  main{ display:block; }
  .welcome-hero{ position:relative; overflow:hidden; isolation:isolate; background:var(--ink); border-bottom:1px solid var(--line); }
  .welcome-hero__grid{ display:grid; grid-template-columns:1fr; min-height:80vh; }
  @media(min-width:1000px){ .welcome-hero__grid{ grid-template-columns: 46% 54%; min-height:88vh; } }
  .welcome-hero__left{ padding: clamp(48px, 7vw, 96px) clamp(24px, 4vw, 64px); background: linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%); display:flex; flex-direction:column; justify-content:space-between; gap:clamp(40px, 6vw, 80px); z-index:2; }
  .welcome-hero__rail{ display:flex; align-items:center; gap:14px; font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:var(--cream-soft); }
  .welcome-hero__rail .num{ color:var(--gold); }
  .welcome-hero__rail .bar{ flex:0 0 42px; height:1px; background:var(--gold); }
  .welcome-hero__check{ display:inline-flex; align-items:center; gap:9px; padding:6px 11px; border:1px solid var(--gold); background:rgba(212,175,55,.08); font-family:'JetBrains Mono', monospace; font-size:10px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold-bright); border-radius:2px; margin-left:auto; }
  .welcome-hero__check::before{ content:""; width:7px; height:7px; border-radius:50%; background:var(--gold); box-shadow:0 0 12px rgba(212,175,55,.6); }
  .welcome-hero__eyebrow{ font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold); margin-bottom:22px; }
  .welcome-hero__eyebrow span{ color:var(--cream-soft); margin:0 8px; }
  .welcome-hero__title{ font-family:'Anton', sans-serif; font-weight:400; font-size:clamp(44px, 6.6vw, 96px); line-height:.92; letter-spacing:-.012em; text-transform:uppercase; color:var(--cream); margin:0; }
  .welcome-hero__title .accent{ color:var(--gold); }
  .welcome-hero__lede{ font-family:'Fraunces', serif; font-weight:400; font-style:italic; font-size:clamp(18px, 1.5vw, 22px); line-height:1.5; color:var(--cream-soft); max-width:46ch; margin-top:28px; }
  .welcome-hero__lede em{ font-style:normal; color:var(--gold-bright); }
  .welcome-hero__ctarow{ display:flex; flex-wrap:wrap; gap:12px; margin-top:36px; }
  .btn-primary{ display:inline-flex; align-items:center; gap:10px; padding:14px 22px; background:var(--gold); color:var(--ink); font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.24em; text-transform:uppercase; border:1px solid var(--gold); border-radius:1px; transition: background .2s ease, transform .2s ease; }
  .btn-primary::after{ content:"→"; font-family:'Manrope', sans-serif; letter-spacing:0; }
  .btn-primary:hover{ background:var(--gold-bright); transform:translateX(2px); }
  .btn-ghost{ display:inline-flex; align-items:center; gap:10px; padding:14px 22px; background:transparent; color:var(--cream); font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.24em; text-transform:uppercase; border:1px solid var(--line); border-radius:1px; transition: border-color .2s ease, color .2s ease; }
  .btn-ghost::after{ content:"→"; font-family:'Manrope', sans-serif; letter-spacing:0; color:var(--gold); }
  .btn-ghost:hover{ border-color:var(--gold); color:var(--gold-bright); }
  .welcome-hero__right{ position:relative; min-height:320px; background:var(--ink-3); overflow:hidden; }
  .welcome-hero__photo{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter: saturate(.95) contrast(1.05); }
  .welcome-hero__right::after{ content:""; position:absolute; inset:0; background:linear-gradient(90deg, var(--ink) 0%, transparent 18%, transparent 82%, rgba(11,11,12,.6) 100%); pointer-events:none; }
  .welcome-hero__caption{ position:absolute; left:0; right:0; bottom:0; padding: 18px 24px; font-family:'JetBrains Mono', monospace; font-size:10.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft); background: linear-gradient(0deg, rgba(11,11,12,.85), transparent); z-index:2; }
  .welcome-hero__caption strong{ color:var(--gold); margin-right:8px; }
  .welcome-section{ background:var(--ink); padding: clamp(56px, 7vw, 112px) clamp(24px, 4vw, 64px); border-bottom:1px solid var(--line); }
  .welcome-section__inner{ max-width:1280px; margin:0 auto; }
  .welcome-section__head{ display:grid; grid-template-columns:1fr; gap:18px; margin-bottom:48px; padding-bottom:24px; border-bottom:1px solid var(--line); }
  @media(min-width:900px){ .welcome-section__head{ grid-template-columns: 1fr 1.2fr; align-items:end; gap:48px; } }
  .welcome-section__eyebrow{ font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); display:inline-flex; align-items:center; gap:14px; margin:0; }
  .welcome-section__eyebrow::after{ content:""; flex:0 0 56px; height:2px; background:var(--gold); }
  .welcome-section__title{ font-family:'Anton', sans-serif; font-weight:400; font-size:clamp(34px, 4vw, 64px); line-height:.95; letter-spacing:-.005em; text-transform:uppercase; color:var(--cream); margin:8px 0 0; }
  .welcome-section__lede{ font-family:'Fraunces', serif; font-weight:400; font-style:italic; font-size:clamp(15px, 1.1vw, 18px); line-height:1.55; color:var(--cream-soft); max-width:54ch; margin:0; }
  .steps{ display:grid; grid-template-columns:1fr; gap:18px; }
  @media(min-width:900px){ .steps{ grid-template-columns:repeat(3, 1fr); gap:24px; } }
  .step{ position:relative; border:1px solid var(--line); background:var(--ink-2); padding: clamp(24px, 2.4vw, 36px); border-radius:2px; transition: border-color .25s ease, transform .25s ease; }
  .step:hover{ border-color:rgba(212,175,55,.4); transform:translateY(-2px); }
  .step__num{ font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.28em; color:var(--gold); margin-bottom:18px; }
  .step__title{ font-family:'Anton', sans-serif; font-weight:400; font-size:clamp(22px, 2.2vw, 30px); line-height:1; text-transform:uppercase; color:var(--cream); margin:0 0 14px; letter-spacing:.005em; }
  .step__copy{ font-family:'Fraunces', serif; font-weight:400; font-size:15.5px; line-height:1.55; color:var(--bone); margin:0; }
  .step__copy em{ color:var(--cream); font-style:italic; }
  .continue-grid{ display:grid; grid-template-columns:1fr; gap:18px; }
  @media(min-width:720px){ .continue-grid{ grid-template-columns:repeat(3, 1fr); gap:24px; } }
  .cont-card{ position:relative; display:flex; flex-direction:column; background:var(--ink-2); border:1px solid var(--line); border-radius:2px; padding: clamp(20px, 2vw, 28px); transition: border-color .25s ease, transform .25s ease, background .25s ease; }
  .cont-card:hover{ border-color:rgba(212,175,55,.45); background:var(--ink-3); transform:translateY(-2px); }
  .cont-card__kicker{ font-family:'JetBrains Mono', monospace; font-size:10.5px; letter-spacing:.24em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .cont-card__kicker .rule{ flex:1; height:1px; background:var(--line); }
  .cont-card__title{ font-family:'Anton', sans-serif; font-weight:400; font-size:clamp(22px, 2vw, 28px); text-transform:uppercase; color:var(--cream); line-height:1; margin:0 0 14px; }
  .cont-card__copy{ font-family:'Fraunces', serif; font-size:15px; line-height:1.55; color:var(--cream-soft); margin:0 0 18px; flex:1; }
  .cont-card__cta{ display:inline-flex; align-items:center; justify-content:space-between; gap:8px; padding-top:14px; border-top:1px solid var(--line); font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--cream); transition: color .2s ease; }
  .cont-card__cta::after{ content:"→"; color:var(--gold); font-family:'Manrope', sans-serif; letter-spacing:0; transition: transform .2s ease; }
  .cont-card:hover .cont-card__cta{ color:var(--gold-bright); }
  .cont-card:hover .cont-card__cta::after{ transform: translateX(4px); }
  .cross{ background:var(--ink-2); border-top:1px solid var(--line); padding: clamp(40px, 5vw, 72px) clamp(24px, 4vw, 64px); }
  .cross__inner{ max-width:1280px; margin:0 auto; display:grid; grid-template-columns:1fr; gap:18px; align-items:center; }
  @media(min-width:900px){ .cross__inner{ grid-template-columns: 1fr auto; gap:32px; } }
  .cross__copy{ font-family:'Fraunces', serif; font-weight:400; font-style:italic; font-size:clamp(17px, 1.3vw, 22px); line-height:1.5; color:var(--cream); margin:0; max-width:60ch; }
  .cross__copy strong{ color:var(--gold); font-style:normal; font-weight:600; }
  .cross__cta{ display:inline-flex; align-items:center; gap:10px; padding:14px 22px; background:transparent; color:var(--cream); font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.24em; text-transform:uppercase; border:1px solid var(--gold); border-radius:1px; white-space:nowrap; transition: background .2s ease, color .2s ease; }
  .cross__cta::after{ content:"→"; font-family:'Manrope', sans-serif; letter-spacing:0; color:var(--gold); }
  .cross__cta:hover{ background:var(--gold); color:var(--ink); }
  .cross__cta:hover::after{ color:var(--ink); }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `



<main>

  <section class="welcome-hero" aria-label="Course welcome hero">
    <div class="welcome-hero__grid">
      <div class="welcome-hero__left">
        <div class="welcome-hero__rail">
          <span class="num">WELCOME</span>
          <span class="bar" aria-hidden="true"></span>
          <span>Course 03 / 04</span>
          <span class="welcome-hero__check">Access Live</span>
        </div>
        <div>
          <p class="welcome-hero__eyebrow">Engine Track <span>·</span> Insider $10</p>
          <h1 class="welcome-hero__title">You're in: AI Marketing <span class="accent">Engine.</span></h1>
          <p class="welcome-hero__lede">
            Course access provisioned. The funnel template, email sequences, ad copy generator,
            and the GHL automation pack are unlocked. <em>Here's what to do in the next 24 hours.</em>
          </p>
          <div class="welcome-hero__ctarow">
            <a class="btn-primary" href="/login">Open The Portal</a>
            <a class="btn-ghost" href="#next">First 24 Hours</a>
          </div>
        </div>
      </div>
      <div class="welcome-hero__right">
        <img class="welcome-hero__photo" src="/images/course-marketing-engine.jpg?v=2" alt="Marketing engine — funnels, sequences, GHL automations" />
        <div class="welcome-hero__caption"><strong>FILE 03</strong> AI Marketing Engine · 14 modules · Funnel pack · GHL workflow imports</div>
      </div>
    </div>
  </section>

  <section class="welcome-section" id="next" aria-label="What to do next">
    <div class="welcome-section__inner">
      <header class="welcome-section__head">
        <div>
          <p class="welcome-section__eyebrow">First 24 Hours</p>
          <h2 class="welcome-section__title">Three things. In order.</h2>
        </div>
        <p class="welcome-section__lede">
          The engine works whether you watch every module or not — but only if you import
          the GHL workflow pack. Don't skip module 01.
        </p>
      </header>

      <div class="steps">
        <article class="step">
          <div class="step__num">01 / Bookmark</div>
          <h3 class="step__title">Bookmark this URL</h3>
          <p class="step__copy">
            Your course library lives at this exact link. Drop it in your bookmarks bar — not
            buried in a folder. <em>Friction kills momentum.</em>
          </p>
        </article>
        <article class="step">
          <div class="step__num">02 / Download</div>
          <h3 class="step__title">Grab the workbook + prompt pack</h3>
          <p class="step__copy">
            Posted in the Insider community vault. The funnel JSON, the email sequence prompts,
            and the GHL workflow snapshot. Import the snapshot first.
          </p>
        </article>
        <article class="step">
          <div class="step__num">03 / Block</div>
          <h3 class="step__title">Block 60 minutes this week</h3>
          <p class="step__copy">
            Calendar it. One sitting, no phone, module 01 — the funnel teardown. <em>If it's not
            on the calendar it isn't real.</em>
          </p>
        </article>
      </div>
    </div>
  </section>

  <section class="welcome-section" aria-label="Continue learning">
    <div class="welcome-section__inner">
      <header class="welcome-section__head">
        <div>
          <p class="welcome-section__eyebrow">Continue Learning</p>
          <h2 class="welcome-section__title">The other three are unlocked.</h2>
        </div>
        <p class="welcome-section__lede">
          Insider gets you the entire library — not just one course. Open the next one
          while the momentum is hot. Most operators run them in this order.
        </p>
      </header>

      <div class="continue-grid">

        <a class="cont-card" href="/courses/cold-calling/">
          <div class="cont-card__kicker"><span>01</span><span class="rule"></span><span>Foundation</span></div>
          <h3 class="cont-card__title">Cold Calling 2.0 + AI</h3>
          <p class="cont-card__copy">
            The 30-second opener, the AI prep stack, the Master Script PDF. The engine generates
            the lead — cold calling closes them.
          </p>
          <span class="cont-card__cta">Open Cold Calling</span>
        </a>

        <a class="cont-card" href="/courses/brand-builder/">
          <div class="cont-card__kicker"><span>02</span><span class="rule"></span><span>Foundation</span></div>
          <h3 class="cont-card__title">AI Brand Builder</h3>
          <p class="cont-card__copy">
            Logo, voice, positioning, deck, site — built in a week. The engine works ten times
            harder when the brand is right.
          </p>
          <span class="cont-card__cta">Open Brand Builder</span>
        </a>

        <a class="cont-card" href="/courses/empire-os/">
          <div class="cont-card__kicker"><span>04</span><span class="rule"></span><span>System</span></div>
          <h3 class="cont-card__title">Empire OS</h3>
          <p class="cont-card__copy">
            How I run the agency itself — SOPs, daily rhythm, hiring the first VA, client onboarding.
            Take after the engine starts producing.
          </p>
          <span class="cont-card__cta">Open Empire OS</span>
        </a>

      </div>
    </div>
  </section>

  <section class="cross" aria-label="Wholesale GHL upsell">
    <div class="cross__inner">
      <p class="cross__copy">
        Need <strong>wholesale GHL</strong> for high call volume? $49/mo Wholesale unlocks
        $0.015/min calling and your own SaaS-mode sub-account. First 100 only.
      </p>
      <a class="cross__cta" href="/founders/">See Wholesale GHL — $49/mo</a>
    </div>
  </section>

</main>



` }} />
      <Footer />
    </>
  );
}
