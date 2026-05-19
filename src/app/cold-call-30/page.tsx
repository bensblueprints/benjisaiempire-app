import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "30-Day Cold Calling Challenge — Included with $9 AI Empire Insider · Benji's AI Empire",
  description: "100 calls. 30 days. Goal: 10 new clients. The master script + the cadence + watching me dial live on Tuesdays. Included with $9 AI Empire Insider.",
  alternates: { canonical: "https://benjisaiempire.com/cold-call-30/" },
  openGraph: { title: "30-Day Cold Calling Challenge — Included with $9 AI Empire Insider", description: "100 calls. 30 days. Goal: 10 new clients. The master script + the live cadence.", url: "https://benjisaiempire.com/cold-call-30/", images: [{ url: "https://benjisaiempire.com/images/streaming-rig.jpg?v=2" }], type: "website" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  .page-wrap { max-width: var(--container); margin: 0 auto; padding: 0 clamp(20px, 4vw, 56px); }

  /* HERO */
  .cc-hero {
    position: relative;
    padding: clamp(72px, 10vw, 140px) 0 clamp(56px, 8vw, 112px);
    border-bottom: 1px solid var(--line);
    overflow: hidden;
  }
  .cc-hero::before {
    content: ""; position: absolute; inset: 0;
    background-image: radial-gradient(rgba(244,236,216,.04) 1px, transparent 1px);
    background-size: 4px 4px; pointer-events: none; opacity: .55;
  }
  .cc-hero__inner { position: relative; display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(40px, 6vw, 88px); align-items: center; }
  .cc-hero__badge {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 8px 14px;
    border: 1px solid var(--gold);
    background: rgba(212,175,55,.08);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .28em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 28px;
  }
  .cc-hero__badge::before { content: "★"; color: var(--gold-bright); }
  .cc-hero__title {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(46px, 6.4vw, 104px); line-height: .9;
    letter-spacing: -.012em; text-transform: uppercase;
    color: var(--cream); margin: 0 0 28px;
  }
  .cc-hero__title em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); text-transform: none; }
  .cc-hero__lede {
    font-family: 'Fraunces', serif; font-size: clamp(17px, 1.4vw, 21px);
    line-height: 1.55; color: var(--bone); max-width: 56ch; margin: 0 0 36px;
  }
  .cc-hero__cta {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--ink); background: var(--gold);
    padding: 18px 28px; border: 1px solid var(--gold);
    transition: background .2s ease, transform .2s ease;
  }
  .cc-hero__cta:hover { background: var(--gold-bright); transform: translateY(-2px); }
  .cc-hero__cta::after { content: "→"; font-family: 'Manrope', sans-serif; letter-spacing: 0; }
  .cc-hero__media {
    position: relative; aspect-ratio: 4 / 5;
    border: 1px solid var(--line); overflow: hidden; background: var(--ink-2);
  }
  .cc-hero__media img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.04) saturate(1.05); }
  .cc-hero__media::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(11,11,12,.55));
  }
  .cc-hero__cap {
    position: absolute; bottom: 18px; left: 18px; right: 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft); display: flex; justify-content: space-between; gap: 16px;
  }
  .cc-hero__cap span:last-child { color: var(--gold); }

  /* THE 30-DAY ARC — phases */
  .arc {
    padding: clamp(72px, 9vw, 128px) 0;
    border-bottom: 1px solid var(--line);
  }
  .arc__head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: clamp(40px, 5vw, 72px); flex-wrap: wrap; }
  .arc__title {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(36px, 4.8vw, 72px); line-height: .92;
    letter-spacing: -.01em; text-transform: uppercase; color: var(--cream); margin: 0;
  }
  .arc__title em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); text-transform: none; }
  .arc__meta { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .26em; text-transform: uppercase; color: var(--cream-soft); }

  .phase-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: clamp(20px, 2.6vw, 36px); }
  .phase {
    position: relative;
    background: var(--ink-2); border: 1px solid var(--line);
    padding: clamp(28px, 3vw, 44px);
    display: flex; flex-direction: column; gap: 18px;
  }
  .phase__rail {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .28em; text-transform: uppercase;
    color: var(--gold);
  }
  .phase__big {
    font-family: 'Anton', sans-serif;
    font-size: clamp(64px, 7vw, 104px); line-height: .85;
    color: var(--cream); margin: 0; letter-spacing: -.02em;
  }
  .phase__big em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); }
  .phase__title {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(22px, 2vw, 30px); line-height: 1; text-transform: uppercase;
    color: var(--cream); margin: 0;
  }
  .phase__sub { font-family: 'Fraunces', serif; font-style: italic; font-size: 16px; color: var(--bone); margin: 0; }
  .phase__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  .phase__list li {
    font-family: 'Manrope', sans-serif; font-size: 14px; color: var(--cream-soft);
    display: grid; grid-template-columns: 64px 1fr; gap: 12px; align-items: baseline;
    padding-top: 10px; border-top: 1px solid var(--line);
  }
  .phase__list li:first-child { border-top: none; padding-top: 0; }
  .phase__list strong {
    font-family: 'JetBrains Mono', monospace; font-size: 10.5px;
    letter-spacing: .22em; color: var(--gold); font-weight: 500;
  }

  /* THE BADGE */
  .badge-section {
    padding: clamp(72px, 9vw, 128px) 0;
    border-bottom: 1px solid var(--line);
    display: grid; grid-template-columns: 1fr 1.3fr; gap: clamp(40px, 5vw, 88px); align-items: center;
  }
  .badge-medal {
    width: clamp(220px, 28vw, 340px); aspect-ratio: 1;
    margin: 0 auto;
    border-radius: 50%;
    background:
      radial-gradient(circle at 30% 30%, var(--gold-bright) 0%, var(--gold) 35%, #8a6c1d 100%);
    display: grid; place-items: center;
    position: relative;
    box-shadow:
      inset 0 0 0 6px rgba(11,11,12,.85),
      inset 0 0 0 8px var(--gold),
      0 30px 80px rgba(212,175,55,.18);
  }
  .badge-medal::before {
    content: ""; position: absolute; inset: 18px;
    border: 1px dashed rgba(11,11,12,.4); border-radius: 50%;
  }
  .badge-medal__num {
    font-family: 'Anton', sans-serif;
    font-size: clamp(80px, 10vw, 144px); line-height: .85; color: var(--ink);
    letter-spacing: -.03em;
  }
  .badge-medal__sub {
    position: absolute; bottom: 22%; left: 0; right: 0; text-align: center;
    font-family: 'JetBrains Mono', monospace; font-size: 10.5px;
    letter-spacing: .3em; text-transform: uppercase; color: var(--ink);
  }
  .badge-copy { display: flex; flex-direction: column; gap: 24px; }
  .badge-rail {
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    letter-spacing: .3em; text-transform: uppercase; color: var(--gold);
  }
  .badge-title {
    font-family: 'Anton', sans-serif; font-size: clamp(36px, 4.6vw, 64px);
    line-height: .95; text-transform: uppercase; color: var(--cream); margin: 0;
  }
  .badge-title em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); text-transform: none; }
  .badge-body {
    font-family: 'Fraunces', serif; font-size: 18px; line-height: 1.55; color: var(--bone);
    max-width: 52ch; margin: 0;
  }

  /* WHO IT'S FOR */
  .audience {
    padding: clamp(72px, 9vw, 128px) 0;
    border-bottom: 1px solid var(--line);
    display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(40px, 5vw, 88px); align-items: start;
  }
  .audience__num {
    font-family: 'Anton', sans-serif;
    font-size: clamp(80px, 12vw, 200px); line-height: .85;
    color: var(--gold); margin: 0; letter-spacing: -.03em;
  }
  .audience__sub { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .3em; text-transform: uppercase; color: var(--cream-soft); display: block; margin-top: 14px; }
  .audience__title {
    font-family: 'Anton', sans-serif;
    font-size: clamp(30px, 3.6vw, 56px); line-height: .95;
    text-transform: uppercase; color: var(--cream); margin: 0 0 28px;
  }
  .audience__title em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); text-transform: none; }
  .audience__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0; }
  .audience__list li {
    padding: 18px 0; border-top: 1px solid var(--line);
    display: grid; grid-template-columns: 32px 1fr; gap: 16px; align-items: baseline;
    font-family: 'Fraunces', serif; font-size: 18px; line-height: 1.45; color: var(--bone);
  }
  .audience__list li:last-child { border-bottom: 1px solid var(--line); }
  .audience__list li::before {
    content: "→"; font-family: 'Manrope', sans-serif; color: var(--gold); font-size: 16px;
  }
  .audience__list li strong { color: var(--cream); font-weight: 500; }

  /* CTA STRIP */
  .cta-strip {
    padding: clamp(80px, 10vw, 144px) 0;
    background: linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%);
    text-align: center;
  }
  .cta-strip__eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .32em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; }
  .cta-strip__title {
    font-family: 'Anton', sans-serif;
    font-size: clamp(48px, 7vw, 112px); line-height: .9;
    text-transform: uppercase; color: var(--cream); margin: 0 0 36px;
    letter-spacing: -.012em;
  }
  .cta-strip__title em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); text-transform: none; }
  .cta-strip__primary {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--ink); background: var(--gold);
    padding: 22px 36px; border: 1px solid var(--gold);
    transition: background .2s ease, transform .2s ease;
  }
  .cta-strip__primary:hover { background: var(--gold-bright); transform: translateY(-2px); }
  .cta-strip__primary::after { content: "→"; font-family: 'Manrope', sans-serif; letter-spacing: 0; }
  .cta-strip__cross {
    display: block; margin-top: 26px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft); transition: color .2s ease;
  }
  .cta-strip__cross:hover { color: var(--gold-bright); }
  .cta-strip__cross::after { content: " →"; }

  @media (max-width: 980px) {
    .phase-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 880px) {
    .cc-hero__inner { grid-template-columns: 1fr; }
    .cc-hero__media { aspect-ratio: 4 / 3; order: -1; }
    .badge-section { grid-template-columns: 1fr; }
    .audience { grid-template-columns: 1fr; }
  }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

  <!-- 1. HERO -->
  <section class="cc-hero">
    <div class="page-wrap cc-hero__inner">
      <div>
        <span class="cc-hero__badge">Included with $9 AI Empire Insider</span>
        <h1 class="cc-hero__title">100 Calls. 30 Days. <em>Goal:</em> 10 new clients.</h1>
        <p class="cc-hero__lede">
          The math: 100 calls in a month is ~3 dials a day. 10 closes on 100 calls is a 10% conversion — boring, achievable, repeatable. Use my Master Script, watch me run it live every Tuesday, and put 10 new logos on the wall in 30 days.
        </p>
        <a class="cc-hero__cta" href="/insider/">Get this + everything for $9/mo</a>
      </div>
      <figure class="cc-hero__media">
        <img src="/images/streaming-rig.jpg?v=2" alt="The streaming rig — every Tuesday cold call live runs from here." loading="eager" />
        <figcaption class="cc-hero__cap">
          <span>Tuesday Cold Call Live</span><span>10 Clients · 30 Days</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <!-- 2. THE 30-DAY ARC — phases -->
  <section class="arc">
    <div class="page-wrap">
      <div class="arc__head">
        <h2 class="arc__title">The <em>arc.</em></h2>
        <span class="arc__meta">Three Phases · 100 Calls · 10 Clients</span>
      </div>
      <div class="phase-grid">

        <article class="phase">
          <span class="phase__rail">Phase 01 · Days 1–7</span>
          <p class="phase__big">10<em>/day</em></p>
          <h3 class="phase__title">Warm-up week.</h3>
          <p class="phase__sub">Find your voice. Get the rejection out of your system.</p>
          <ul class="phase__list">
            <li><strong>D1–2</strong>List build, dialer setup, script read-through.</li>
            <li><strong>D3–5</strong>10 dials/day. No goal but completion.</li>
            <li><strong>D6–7</strong>Review the recordings. Note the freezes.</li>
          </ul>
        </article>

        <article class="phase">
          <span class="phase__rail">Phase 02 · Days 8–21</span>
          <p class="phase__big">5<em>/day</em></p>
          <h3 class="phase__title">Sharpen the cadence.</h3>
          <p class="phase__sub">Quality over quantity. Build to a 5-a-day average.</p>
          <ul class="phase__list">
            <li><strong>D8–14</strong>Lock the opener. Run the objection drill.</li>
            <li><strong>D15–18</strong>5 dials/day, daily debrief in the lounge.</li>
            <li><strong>D19–21</strong>Book your first meeting on tape.</li>
          </ul>
        </article>

        <article class="phase">
          <span class="phase__rail">Phase 03 · Days 22–30</span>
          <p class="phase__big">10<em>/clients</em></p>
          <h3 class="phase__title">Close the ten.</h3>
          <p class="phase__sub">Convert the meetings booked in Phase 02 into 10 signed clients.</p>
          <ul class="phase__list">
            <li><strong>D22–26</strong>Discovery → diagnosis → close cycle on every booked meeting.</li>
            <li><strong>D27–29</strong>Final-week push: re-engage every "not now" from D8–21.</li>
            <li><strong>D30</strong>10 new clients on the books. Badge drops. Receipts on the wall.</li>
          </ul>
        </article>

      </div>
    </div>
  </section>

  <!-- 3. THE BADGE -->
  <section class="badge-section">
    <div class="page-wrap" style="display:contents;">
      <div style="grid-column: 1 / 2; padding-left: clamp(20px, 4vw, 56px);">
        <div class="badge-medal" role="img" aria-label="Cold-caller badge — 10 clients in 30 days">
          <span class="badge-medal__num">10</span>
          <span class="badge-medal__sub">Closed · 30 Days</span>
        </div>
      </div>
      <div class="badge-copy" style="grid-column: 2 / 3; padding-right: clamp(20px, 4vw, 56px);">
        <span class="badge-rail">The Badge</span>
        <h2 class="badge-title">A receipt on your <em>profile.</em></h2>
        <p class="badge-body">
          Close 10 new clients in 30 days and the badge drops on your community profile.
          It's small. It's stupid. It also tells every other operator in the lounge that
          you didn't just dial — you closed. In a community full of people who say they're
          going to, that matters more than you'd think.
        </p>
      </div>
    </div>
  </section>

  <!-- 4. WHO IT'S FOR -->
  <section class="audience">
    <div class="page-wrap" style="display:contents;">
      <div style="grid-column: 1 / 2; padding-left: clamp(20px, 4vw, 56px);">
        <p class="audience__num">3<span class="audience__sub">Operator Profiles</span></p>
      </div>
      <div style="grid-column: 2 / 3; padding-right: clamp(20px, 4vw, 56px);">
        <h2 class="audience__title">Who it's <em>for.</em></h2>
        <ul class="audience__list">
          <li><span><strong>Agency owners stuck on inbound.</strong> Leads dried up. You need a phone-shaped lever this week, not next quarter.</span></li>
          <li><span><strong>Operators terrified of the phone.</strong> Honest. The 30-day frame is the fix — it's volume on a runway, not a cliff.</span></li>
          <li><span><strong>SDRs going independent.</strong> You can already dial. You want a script + cadence for your own offer. This is it.</span></li>
        </ul>
      </div>
    </div>
  </section>

  <!-- 5. CTA STRIP -->
  <section class="cta-strip">
    <div class="page-wrap">
      <div class="cta-strip__eyebrow">When you're ready</div>
      <h2 class="cta-strip__title">Join Insider — <em>$9/mo</em></h2>
      <a class="cta-strip__primary" href="/insider/">Lock $9/mo</a>
      <a class="cta-strip__cross" href="/founders/">Or wholesale GHL — $49/mo</a>
    </div>
  </section>

` }} />
      <Footer />
    </>
  );
}
