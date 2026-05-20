import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "You're In — Welcome to Insider | Benji's AI Empire",
  description: "Welcome to Insider. Everything I run is now in your account. Three steps to get moving today.",
  alternates: { canonical: "https://benjisaiempire.com/insider/welcome" },
  robots: { index: false, follow: true },
  openGraph: { title: "You're In — Welcome to Insider", description: "Welcome to Insider. Everything I run is now in your account.", url: "https://benjisaiempire.com/insider/welcome", images: [{ url: "https://benjisaiempire.com/images/course-marketing-engine.jpg?v=4" }], type: "website" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  .wel-main{ background:var(--ink); color:var(--cream); }
  .wel-wrap{ max-width:var(--container); margin:0 auto; padding:0 clamp(20px,4vw,56px); }

  .wel-eyebrow{
    font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.28em;
    text-transform:uppercase; color:var(--gold);
    display:inline-flex; align-items:center; gap:10px;
  }
  .wel-eyebrow::before{
    content:""; width:28px; height:1px; background:var(--gold);
  }
  .wel-display{
    font-family:'Anton',sans-serif; font-weight:400;
    text-transform:uppercase; letter-spacing:.005em;
    line-height:.92; color:var(--cream);
  }
  .wel-display em{
    font-family:'Fraunces',serif; font-style:italic; font-weight:500;
    text-transform:none; letter-spacing:-.01em; color:var(--gold-bright);
  }
  .wel-lede{
    font-family:'Fraunces',serif; font-style:italic; font-weight:300;
    color:var(--bone); line-height:1.45;
  }

  /* HERO */
  .wel-hero{
    position:relative; isolation:isolate;
    padding:clamp(72px,9vw,140px) 0 clamp(48px,6vw,96px);
    border-bottom:1px solid var(--line);
    overflow:hidden;
    text-align:center;
  }
  .wel-hero::before{
    content:""; position:absolute; inset:0;
    background-image:
      radial-gradient(rgba(244,236,216,.045) 1px, transparent 1px),
      radial-gradient(rgba(11,11,12,.06) 1px, transparent 1px);
    background-size:3px 3px, 5px 5px;
    background-position:0 0, 1px 2px;
    mix-blend-mode:overlay; pointer-events:none; z-index:0; opacity:.55;
  }
  .wel-hero__eyebrow{
    margin:0 auto 32px;
    display:inline-flex; gap:14px; align-items:center;
    font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.3em;
    text-transform:uppercase; color:var(--gold);
  }
  .wel-hero__eyebrow::before, .wel-hero__eyebrow::after{
    content:""; width:32px; height:1px; background:var(--gold);
  }
  .wel-hero__pulse{
    width:9px; height:9px; border-radius:50%;
    background:var(--gold); display:inline-block;
    box-shadow:0 0 0 5px rgba(212,175,55,.18);
    animation:wel-pulse 2s ease-in-out infinite;
  }
  @keyframes wel-pulse{
    0%,100%{ box-shadow:0 0 0 5px rgba(212,175,55,.18); }
    50%{ box-shadow:0 0 0 9px rgba(212,175,55,.05); }
  }
  .wel-hero__headline{
    font-size:clamp(72px,11vw,180px);
    margin:0 0 clamp(24px,2.6vw,36px);
    position:relative; z-index:1;
  }
  .wel-hero__lede{
    font-size:clamp(20px,1.7vw,26px);
    max-width:680px; margin:0 auto;
    position:relative; z-index:1;
  }
  .wel-hero__divider{
    width:80px; height:1px; background:var(--gold); opacity:.6;
    margin:clamp(32px,3.5vw,48px) auto 0;
  }
  .wel-hero__meta{
    margin-top:24px;
    font-family:'JetBrains Mono',monospace; font-size:10.5px;
    letter-spacing:.28em; text-transform:uppercase; color:var(--cream-soft);
  }
  .wel-hero__meta strong{ color:var(--gold); font-weight:500; }

  /* STEPS */
  .wel-steps{
    padding:clamp(72px,8vw,120px) 0;
    border-bottom:1px solid var(--line);
  }
  .wel-steps__head{
    display:grid; grid-template-columns:.9fr 1.1fr;
    gap:clamp(32px,4vw,64px); align-items:end;
    padding-bottom:24px; border-bottom:1px solid var(--line);
    margin-bottom:clamp(40px,4vw,56px);
  }
  .wel-steps__title{ font-size:clamp(40px,5vw,72px); margin-top:14px; }
  .wel-steps__sub{ font-family:'Fraunces',serif; font-style:italic; font-size:17px; color:var(--bone); max-width:480px; }

  .wel-step{
    display:grid; grid-template-columns:140px 1fr auto;
    gap:clamp(24px,3vw,48px); align-items:center;
    padding:clamp(28px,3vw,40px) 0;
    border-top:1px solid var(--line);
  }
  .wel-step:last-child{ border-bottom:1px solid var(--line); }
  .wel-step__num{
    font-family:'Anton',sans-serif; font-size:clamp(56px,6vw,88px);
    color:var(--gold); letter-spacing:.005em; line-height:1;
  }
  .wel-step__body{ display:flex; flex-direction:column; gap:10px; max-width:62ch; }
  .wel-step__kicker{
    font-family:'JetBrains Mono',monospace; font-size:10.5px;
    letter-spacing:.26em; text-transform:uppercase; color:var(--cream-soft);
  }
  .wel-step__title{
    font-family:'Anton',sans-serif; font-weight:400;
    font-size:clamp(24px,2.4vw,34px); letter-spacing:.005em;
    text-transform:uppercase; color:var(--cream); line-height:1.05;
  }
  .wel-step__title em{
    font-family:'Fraunces',serif; font-style:italic; font-weight:500;
    color:var(--gold-bright); text-transform:none; letter-spacing:-.005em;
  }
  .wel-step__desc{
    font-family:'Manrope',sans-serif; font-size:15px; line-height:1.6;
    color:var(--cream-soft);
  }
  .wel-step__desc a{
    color:var(--gold); border-bottom:1px solid var(--gold);
    padding-bottom:1px; transition:color .2s ease, border-color .2s ease;
  }
  .wel-step__desc a:hover{ color:var(--gold-bright); border-color:var(--gold-bright); }

  .wel-btn{
    display:inline-flex; align-items:center; gap:10px;
    font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.22em;
    text-transform:uppercase; padding:14px 18px; border-radius:1px;
    transition:all .2s ease; border:1px solid transparent;
  }
  .wel-btn--gold{ background:var(--gold); color:var(--ink); border-color:var(--gold); font-weight:600; }
  .wel-btn--gold:hover{ background:var(--gold-bright); border-color:var(--gold-bright); transform:translateY(-1px); }
  .wel-btn--ghost{ background:transparent; color:var(--cream); border-color:var(--line); }
  .wel-btn--ghost:hover{ border-color:var(--gold); color:var(--gold-bright); }
  .wel-btn span.arrow{ transition:transform .2s ease; }
  .wel-btn:hover span.arrow{ transform:translateX(4px); }

  .wel-courses{
    margin-top:18px;
    display:flex; flex-wrap:wrap; gap:8px;
  }
  .wel-courses a{
    font-family:'JetBrains Mono',monospace; font-size:10.5px;
    letter-spacing:.22em; text-transform:uppercase;
    padding:8px 12px; border:1px solid var(--line); border-radius:1px;
    color:var(--cream-soft); transition:all .2s ease;
  }
  .wel-courses a:hover{ border-color:var(--gold); color:var(--gold-bright); }

  @media (max-width:760px){
    .wel-step{ grid-template-columns:80px 1fr; }
    .wel-step .wel-btn{ grid-column:1/-1; justify-self:start; }
    .wel-steps__head{ grid-template-columns:1fr; }
  }

  /* CROSS-SELL */
  .wel-xsell{
    padding:clamp(56px,6vw,96px) 0;
    background:var(--ink);
  }
  .wel-xsell__inner{
    display:flex; justify-content:space-between; align-items:center;
    gap:clamp(24px,3vw,48px); flex-wrap:wrap;
    border:1px solid var(--line); padding:clamp(28px,3.5vw,52px);
    background:linear-gradient(135deg,var(--ink) 0%,var(--ink-2) 100%);
  }
  .wel-xsell__l{ display:flex; flex-direction:column; gap:8px; max-width:640px; }
  .wel-xsell__kicker{
    font-family:'JetBrains Mono',monospace; font-size:10.5px;
    letter-spacing:.28em; text-transform:uppercase; color:var(--gold);
  }
  .wel-xsell__h{
    font-family:'Anton',sans-serif; font-size:clamp(26px,2.6vw,38px);
    letter-spacing:.005em; text-transform:uppercase; color:var(--cream); line-height:1.05;
  }
  .wel-xsell__h em{ font-family:'Fraunces',serif; font-style:italic; font-weight:500; color:var(--gold-bright); text-transform:none; }
  .wel-xsell__sub{ font-family:'Fraunces',serif; font-style:italic; font-size:15px; color:var(--bone); max-width:520px; }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

  <!-- ═════ HERO ═════ -->
  <section class="wel-hero" aria-labelledby="wel-hd">
    <div class="wel-wrap">
      <span class="wel-hero__eyebrow">
        <span class="wel-hero__pulse" aria-hidden="true"></span>
        Tier 02 · Insider · Activated
      </span>
      <h1 class="wel-hero__headline wel-display" id="wel-hd">
        You're <em>in.</em>
      </h1>
      <p class="wel-hero__lede wel-lede">
        Welcome to Insider. Everything I run is now in your inbox and the community.
        Here's how to start without losing your first hour to clicking around.
      </p>
      <div class="wel-hero__divider" aria-hidden="true"></div>
      <p class="wel-hero__meta">
        Order <strong>confirmed</strong> &nbsp;·&nbsp; Access <strong>provisioned</strong> &nbsp;·&nbsp; Community invite <strong>sent</strong>
      </p>
    </div>
  </section>

  <!-- ═════ 3-STEP NEXT ═════ -->
  <section class="wel-steps" aria-labelledby="wel-steps-t">
    <div class="wel-wrap">

      <div class="wel-steps__head">
        <div>
          <span class="wel-eyebrow">Next</span>
          <h2 class="wel-steps__title wel-display" id="wel-steps-t">
            Three steps, <em>today.</em>
          </h2>
        </div>
        <p class="wel-steps__sub">Do these in order and you're shipping by tomorrow morning. No "settle in and explore" — there's nothing to settle into.</p>
      </div>

      <div class="wel-steps__list">

        <article class="wel-step">
          <span class="wel-step__num">01</span>
          <div class="wel-step__body">
            <span class="wel-step__kicker">Step One · Inbox</span>
            <h3 class="wel-step__title">Check your email for the <em>community invite</em></h3>
            <p class="wel-step__desc">Look for the subject line "You're in — Insider community invite." If it's not in your inbox in 60 seconds, search your promotions tab and mark me as not-spam. The invite link expires in 7 days.</p>
          </div>
          <a class="wel-btn wel-btn--ghost" href="mailto:?subject=Insider%20Invite">
            Email tips <span class="arrow">→</span>
          </a>
        </article>

        <article class="wel-step">
          <span class="wel-step__num">02</span>
          <div class="wel-step__body">
            <span class="wel-step__kicker">Step Two · The Library</span>
            <h3 class="wel-step__title">Bookmark <em>the four courses</em></h3>
            <p class="wel-step__desc">Open all four in tabs, pick the one closest to whatever you're stuck on right now, and start there. Don't try to watch them in order — start with the friction point.</p>
            <div class="wel-courses" aria-label="Course library">
              <a href="/courses/cold-calling/">Cold Calling 2.0 + AI</a>
              <a href="/courses/brand-builder/">AI Brand Builder</a>
              <a href="/courses/marketing-engine/">AI Marketing Engine</a>
              <a href="/courses/empire-os/">Empire OS</a>
            </div>
          </div>
          <a class="wel-btn wel-btn--gold" href="/courses/cold-calling/">
            Start with Cold Calling <span class="arrow">→</span>
          </a>
        </article>

        <article class="wel-step">
          <span class="wel-step__num">03</span>
          <div class="wel-step__body">
            <span class="wel-step__kicker">Step Three · Cadence</span>
            <h3 class="wel-step__title">Join the <em>Friday Q&amp;A digest</em></h3>
            <p class="wel-step__desc">Friday I drop the week's wins, the calls I worked, the prompts I shipped, and the ones that flopped. Reply with what you're stuck on by Thursday EOD and I'll cover it. The digest is the heartbeat of the community.</p>
          </div>
          <a class="wel-btn wel-btn--ghost" href="/community/friday-digest/">
            Join the digest <span class="arrow">→</span>
          </a>
        </article>

      </div>
    </div>
  </section>

  <!-- ═════ CROSS-SELL ═════ -->
  <section class="wel-xsell" aria-labelledby="wel-xsell-h">
    <div class="wel-wrap">
      <div class="wel-xsell__inner">
        <div class="wel-xsell__l">
          <span class="wel-xsell__kicker">Tier 03 — Wholesale GHL</span>
          <h3 class="wel-xsell__h" id="wel-xsell-h">Want wholesale GHL <em>too?</em></h3>
          <p class="wel-xsell__sub">$49/mo · $0.015/min on minutes · first 100 operators only · stack it on top of Insider if you're running heavy call volume.</p>
        </div>
        <a class="wel-btn wel-btn--gold" href="/founders/">
          See Wholesale GHL <span class="arrow">→</span>
        </a>
      </div>
    </div>
  </section>

` }} />
      <Footer />
    </>
  );
}
