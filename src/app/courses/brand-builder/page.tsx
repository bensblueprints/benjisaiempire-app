import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Brand Builder — Included with $10 Insider · Benji's AI Empire",
  description: "Blank page to a brand that converts. Positioning, voice, identity, content. AI as a co-pilot — not a crutch. Included with $10 Insider.",
  alternates: { canonical: "https://benjisaiempire.com/courses/brand-builder/" },
  openGraph: { title: "AI Brand Builder — Course 02 / 04", description: "Blank page to a brand that converts. Included with $10 Insider.", url: "https://benjisaiempire.com/courses/brand-builder/", images: [{ url: "https://benjisaiempire.com/images/headshot-leaves.jpg" }], type: "article" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  /* ========== BRAND BUILDER — EDITORIAL/MAGAZINE TREATMENT ========== */
  .course-hero{
    position:relative; background:var(--cream); color:var(--ink);
    border-bottom:1px solid var(--ink);
    overflow:hidden;
  }
  .course-hero::after{
    content:""; position:absolute; inset:0;
    background-image:
      radial-gradient(rgba(11,11,12,.05) 1px, transparent 1px);
    background-size:4px 4px;
    pointer-events:none; opacity:.5;
  }
  .course-hero__grid{
    position:relative; z-index:1;
    display:grid; grid-template-columns:42% 58%;
    min-height:90vh;
    max-width:var(--container); margin:0 auto;
  }
  .course-hero__left{
    padding:clamp(40px,6vw,88px) clamp(28px,4vw,56px);
    display:flex; flex-direction:column; justify-content:center;
    background:url('/images/headshot-leaves.jpg') center/cover no-repeat;
    position:relative; min-height:480px;
  }
  .course-hero__left::before{
    content:""; position:absolute; inset:0;
    background:linear-gradient(180deg, rgba(11,11,12,.18) 0%, rgba(11,11,12,.55) 100%);
  }
  .course-hero__masthead{
    position:relative; align-self:flex-start;
    color:var(--cream); font-family:'JetBrains Mono',monospace;
    font-size:11px; letter-spacing:.3em; text-transform:uppercase;
    padding:8px 14px; border:1px solid var(--gold);
    background:rgba(11,11,12,.5); backdrop-filter:blur(8px);
  }
  .course-hero__masthead em{ font-style:normal; color:var(--gold); margin:0 8px; }
  .course-hero__floor{
    position:absolute; bottom:32px; left:32px; right:32px;
    color:var(--cream); font-family:'Fraunces',serif; font-style:italic;
    font-size:18px; line-height:1.4;
    border-top:1px solid rgba(244,236,216,.3); padding-top:18px;
  }
  .course-hero__floor strong{ font-style:normal; color:var(--gold); font-weight:500; letter-spacing:.04em; }

  .course-hero__right{
    padding:clamp(48px,6vw,96px) clamp(28px,4vw,72px);
    display:flex; flex-direction:column; justify-content:center;
    border-left:1px solid var(--ink);
    position:relative;
  }
  .course-hero__eyebrow{
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.32em; text-transform:uppercase;
    color:var(--rust); margin-bottom:28px;
    display:inline-flex; gap:14px; align-items:center;
  }
  .course-hero__eyebrow::before{
    content:""; display:inline-block; width:36px; height:1px; background:var(--ink);
  }
  .course-hero h1{
    font-family:'Anton',sans-serif; font-weight:400;
    font-size:clamp(58px,7.6vw,124px); line-height:.86; letter-spacing:-.014em;
    text-transform:uppercase; color:var(--ink); margin:0 0 32px;
  }
  .course-hero h1 .accent{
    display:block; font-family:'Fraunces',serif; font-weight:400; font-style:italic;
    text-transform:none; font-size:.55em; letter-spacing:-.01em;
    color:var(--rust); margin-top:6px; line-height:1;
  }
  .course-hero__lede{
    font-family:'Fraunces',serif; font-style:italic; font-weight:400;
    font-size:clamp(20px,1.7vw,26px); line-height:1.45;
    color:var(--ink-2); max-width:60ch; margin:0 0 32px;
  }
  .course-hero__lede::first-letter{
    font-size:1.8em; line-height:1; padding-right:6px; color:var(--rust);
    font-weight:500; font-style:normal; font-family:'Anton',sans-serif;
  }
  .course-hero__meta{
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.22em; text-transform:uppercase; color:var(--ink-2);
    margin-bottom:32px; padding-top:24px; border-top:1px solid rgba(11,11,12,.18);
  }
  .course-hero__meta strong{ color:var(--ink); font-weight:600; }
  .course-hero__cta{
    display:inline-flex; align-items:center; gap:12px;
    background:var(--ink); color:var(--cream);
    font-family:'JetBrains Mono',monospace; font-size:12px;
    letter-spacing:.22em; text-transform:uppercase; font-weight:600;
    padding:18px 28px; border:1px solid var(--ink);
    transition:background .2s ease, color .2s ease;
  }
  .course-hero__cta:hover{ background:var(--rust); border-color:var(--rust); }
  .course-hero__cta::after{ content:"→"; transition:transform .2s ease; }
  .course-hero__cta:hover::after{ transform:translateX(4px); }
  .course-hero__sublink{
    display:block; margin-top:16px;
    font-family:'JetBrains Mono',monospace; font-size:10.5px;
    letter-spacing:.22em; text-transform:uppercase; color:var(--ink-2);
  }
  .course-hero__sublink:hover{ color:var(--rust); }

  .section{ max-width:var(--container); margin:0 auto; padding:clamp(72px,9vw,140px) clamp(20px,4vw,56px); }
  .section-head{ display:grid; grid-template-columns: minmax(0,1fr); gap:14px; margin-bottom:64px; padding-bottom:24px; border-bottom:1px solid var(--line); }
  .section-head__num{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold); }
  .section-head__title{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(36px,4.8vw,72px); line-height:.95; letter-spacing:-.005em; text-transform:uppercase; color:var(--cream); margin:0; }
  .section-head__sub{ font-family:'Fraunces',serif; font-style:italic; font-size:clamp(17px,1.3vw,20px); line-height:1.5; color:var(--bone); max-width:60ch; margin-top:8px; }

  /* outcomes — 2-col asymmetric editorial */
  .outcomes{ display:grid; grid-template-columns:repeat(12,1fr); gap:0; border-top:1px solid var(--line); }
  .outcome{ grid-column: span 6; display:grid; grid-template-columns:48px 1fr; gap:18px; align-items:start; padding:36px 28px; border-bottom:1px solid var(--line); border-right:1px solid var(--line); transition:background .2s ease; }
  .outcome:nth-child(6n+1){ grid-column: span 12; background:rgba(212,175,55,.04); }
  .outcome:hover{ background:rgba(212,175,55,.07); }
  .outcome__num{ font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--gold); padding-top:6px; letter-spacing:.16em; }
  .outcome__text{ font-family:'Fraunces',serif; font-weight:400; font-size:clamp(18px,1.5vw,24px); line-height:1.4; color:var(--cream); }
  .outcome__text em{ font-style:italic; color:var(--gold-bright); }

  /* curriculum: vertical numbered timeline */
  .curriculum{ background:var(--ink-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
  .curriculum .section{ padding-top:clamp(80px,9vw,140px); padding-bottom:clamp(80px,9vw,140px); }
  .modules{ display:flex; flex-direction:column; max-width:1080px; margin:0 auto; }
  .module{ display:grid; grid-template-columns: 90px 1fr 80px; gap:32px; align-items:center; padding:36px 0; border-top:1px solid var(--line); position:relative; transition:padding .25s ease; }
  .module:hover{ padding-left:18px; }
  .module:last-child{ border-bottom:1px solid var(--line); }
  .module__num{ font-family:'Anton',sans-serif; font-size:clamp(40px,5vw,72px); line-height:1; letter-spacing:-.02em; color:var(--gold); }
  .module__body h3{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(22px,2.1vw,32px); line-height:1.05; text-transform:uppercase; letter-spacing:.005em; color:var(--cream); margin:0 0 8px; }
  .module__body p{ font-family:'Manrope',sans-serif; font-size:15px; line-height:1.55; color:var(--cream-soft); margin:0; max-width:62ch; }
  .module__tag{ font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft); text-align:right; }

  .pull{ max-width:1080px; margin:0 auto; padding:clamp(80px,10vw,160px) clamp(28px,4vw,56px); position:relative; }
  .pull__text{ font-family:'Fraunces',serif; font-weight:400; font-style:italic; font-size:clamp(28px,3.2vw,46px); line-height:1.28; color:var(--cream); margin:0 0 32px; max-width:24ch; }
  .pull__text::before{ content:"\\201C"; font-family:'Fraunces',serif; font-size:1.6em; color:var(--gold); line-height:0; vertical-align:-.32em; margin-right:6px; }
  .pull__attr{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold); padding-left:48px; position:relative; }
  .pull__attr::before{ content:""; position:absolute; left:0; top:50%; width:36px; height:1px; background:var(--gold); }

  .cta-strip{
    background:var(--cream); color:var(--ink); padding:clamp(72px,8vw,120px) clamp(28px,4vw,56px); text-align:center;
    border-top:1px solid var(--ink); border-bottom:1px solid var(--ink);
    background-image:
      linear-gradient(transparent 0, transparent calc(100% - 1px), rgba(11,11,12,.06) 100%),
      linear-gradient(90deg, transparent 0, transparent calc(100% - 1px), rgba(11,11,12,.06) 100%);
    background-size: 48px 48px;
  }
  .cta-strip__eyebrow{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:var(--rust); margin-bottom:20px; }
  .cta-strip__head{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(40px,5.4vw,84px); line-height:.92; letter-spacing:-.01em; text-transform:uppercase; color:var(--ink); margin:0 auto 32px; max-width:20ch; }
  .cta-strip__head em{ font-style:italic; font-family:'Fraunces',serif; font-weight:400; text-transform:none; color:var(--rust); }
  .cta-strip__btn{ display:inline-flex; align-items:center; gap:12px; background:var(--ink); color:var(--cream); font-family:'JetBrains Mono',monospace; font-size:13px; letter-spacing:.22em; text-transform:uppercase; font-weight:600; padding:18px 30px; border:1px solid var(--ink); transition:background .2s ease; }
  .cta-strip__btn:hover{ background:var(--rust); border-color:var(--rust); }
  .cta-strip__btn::after{ content:"→"; transition:transform .2s ease; }
  .cta-strip__btn:hover::after{ transform:translateX(4px); }
  .cta-strip__alt{ display:block; margin-top:32px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--ink-2); }
  .cta-strip__alt:hover{ color:var(--rust); }

  @media (max-width: 900px){
    .course-hero__grid{ grid-template-columns:1fr; }
    .course-hero__right{ border-left:none; border-top:1px solid var(--ink); }
    .course-hero__left{ min-height:340px; }
    .outcome, .outcome:nth-child(6n+1){ grid-column: span 12; }
    .module{ grid-template-columns: 60px 1fr; gap:18px; }
    .module__tag{ display:none; }
  }
` }} />
      {/* @ts-expect-error Async Server Component */}
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

  <section class="course-hero">
    <div class="course-hero__grid">
      <div class="course-hero__left">
        <div class="course-hero__masthead">Issue 02 <em>·</em> Brand</div>
        <div class="course-hero__floor">
          <strong>"$1M lost in 364 days."</strong><br>
          The book that became this course.
        </div>
      </div>
      <div class="course-hero__right">
        <div class="course-hero__eyebrow">Included with $10 Insider · Course 02 / 04</div>
        <h1>AI Brand <span class="accent">Builder</span></h1>
        <p class="course-hero__lede">
          Blank page to a brand that converts. Positioning, voice, identity,
          content. AI as a co-pilot — not a crutch.
        </p>
        <div class="course-hero__meta">
          <strong>7 modules</strong> &nbsp;·&nbsp; ≈5 hours &nbsp;·&nbsp; self-paced &nbsp;·&nbsp; prompt library included
        </div>
        <a class="course-hero__cta" href="/insider/">Get this + everything else for $10/mo</a>
        <a class="course-hero__sublink" href="/founders/">Or grab wholesale GHL for $49/mo (no courses) →</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-head">
      <span class="section-head__num">§ 02 · What You'll Learn</span>
      <h2 class="section-head__title">A brand that compounds.</h2>
      <p class="section-head__sub">Five outcomes most agencies fake. We build them in 7 modules.</p>
    </div>
    <div class="outcomes">
      <div class="outcome"><div class="outcome__num">01</div><div class="outcome__text">A <em>positioning statement</em> that doesn't sound like every other agency.</div></div>
      <div class="outcome"><div class="outcome__num">02</div><div class="outcome__text">A <em>voice</em> that survives across 14 channels — written, spoken, on camera.</div></div>
      <div class="outcome"><div class="outcome__num">03</div><div class="outcome__text">A <em>visual identity</em> in 90 minutes with Claude + Figma — not 6 weeks with a "creative director."</div></div>
      <div class="outcome"><div class="outcome__num">04</div><div class="outcome__text">A <em>content engine</em> that runs while you sleep — and sounds like you when you're awake.</div></div>
      <div class="outcome"><div class="outcome__num">05</div><div class="outcome__text"><em>Brand-as-asset</em> thinking — book, podcast, event — the leverage that compounds when paid traffic dies.</div></div>
    </div>
  </section>

  <section class="curriculum">
    <div class="section">
      <div class="section-head">
        <span class="section-head__num">§ 03 · Curriculum</span>
        <h2 class="section-head__title">Seven modules. Blank page to launch.</h2>
      </div>
      <div class="modules">
        <div class="module"><div class="module__num">01</div><div class="module__body"><h3>Positioning — the 3-question framework</h3><p>The three questions I ask every new brand before I write a single word of copy. If you can't answer them, the brand isn't real yet.</p></div><div class="module__tag">Foundations</div></div>
        <div class="module"><div class="module__num">02</div><div class="module__body"><h3>Voice &amp; tone (with prompt library)</h3><p>How to define a voice AI can actually replicate — plus the 40-prompt library I use to keep Claude on-brand for every channel.</p></div><div class="module__tag">Voice</div></div>
        <div class="module"><div class="module__num">03</div><div class="module__body"><h3>Visual identity sprint</h3><p>Logo, type system, color, motion principles — built in a single 90-minute session with Claude and Figma. The exact files included.</p></div><div class="module__tag">Identity</div></div>
        <div class="module"><div class="module__num">04</div><div class="module__body"><h3>Naming — when AI helps, when it hurts</h3><p>Why most AI-named brands die in 18 months. The framework I use to pick names that survive trademark, search, and the test of being said out loud.</p></div><div class="module__tag">Naming</div></div>
        <div class="module"><div class="module__num">05</div><div class="module__body"><h3>The 14-channel voice test</h3><p>One brand voice, 14 outputs — email, sales call, LinkedIn, tweet, ad, blog, podcast, YouTube. The pass/fail test that catches drift early.</p></div><div class="module__tag">Voice</div></div>
        <div class="module"><div class="module__num">06</div><div class="module__body"><h3>Brand-as-asset (book / podcast / event)</h3><p>The three brand assets that compound — and how to launch each in under 90 days using the same content engine.</p></div><div class="module__tag">Leverage</div></div>
        <div class="module"><div class="module__num">07</div><div class="module__body"><h3>Trademarks + the boring stuff</h3><p>Filing, USPTO, domain hygiene, social handles. The 90-minute legal pass that protects everything you just built.</p></div><div class="module__tag">Ops</div></div>
      </div>
    </div>
  </section>

  <section class="pull">
    <p class="pull__text">
      I literally wrote the book on losing a million dollars in 364 days.
      This course is what I learned about NOT doing that.
      Brand is the thing that compounds when paid traffic dies.
    </p>
    <div class="pull__attr">— Benji Boyce</div>
  </section>

  <section class="cta-strip">
    <div class="cta-strip__eyebrow">Included with $10 Insider</div>
    <h2 class="cta-strip__head">Get this + <em>everything in the bucket</em> for $10/mo.</h2>
    <a class="cta-strip__btn" href="/insider/">Join Insider</a>
    <a class="cta-strip__alt" href="/founders/">Or grab wholesale GHL for $49/mo (no courses) →</a>
  </section>

` }} />
      <Footer />
    </>
  );
}
