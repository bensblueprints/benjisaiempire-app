import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "30-Day AI Empire Challenge — Included with $10 Insider · Benji's AI Empire",
  description: "30 days. 30 emails. One AI-powered offer shipped end-to-end. Daily prompt, daily nudge, accountability check-ins. Included with $10 Insider.",
  alternates: { canonical: "https://benjisaiempire.com/challenge/" },
  openGraph: { title: "30-Day AI Empire Challenge — Included with $10 Insider", description: "30 days. 30 emails. One AI-powered offer shipped end-to-end. Included with $10 Insider.", url: "https://benjisaiempire.com/challenge/", images: [{ url: "https://benjisaiempire.com/images/course-marketing-engine.jpg" }], type: "website" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  .page-wrap { max-width: var(--container); margin: 0 auto; padding: 0 clamp(20px, 4vw, 56px); }

  /* HERO */
  .ch-hero {
    position: relative;
    padding: clamp(72px, 10vw, 140px) 0 clamp(56px, 8vw, 112px);
    border-bottom: 1px solid var(--line);
    overflow: hidden;
  }
  .ch-hero::before {
    content: ""; position: absolute; inset: 0;
    background-image: radial-gradient(rgba(244,236,216,.04) 1px, transparent 1px);
    background-size: 4px 4px; pointer-events: none; opacity: .55;
  }
  .ch-hero__inner { position: relative; display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(40px, 6vw, 88px); align-items: center; }
  .ch-hero__badge {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 8px 14px;
    border: 1px solid var(--gold);
    background: rgba(212,175,55,.08);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .28em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 28px;
  }
  .ch-hero__badge::before { content: "★"; color: var(--gold-bright); }
  .ch-hero__title {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(46px, 6.4vw, 104px); line-height: .9;
    letter-spacing: -.012em; text-transform: uppercase;
    color: var(--cream); margin: 0 0 28px;
  }
  .ch-hero__title em {
    font-family: 'Fraunces', serif; font-style: italic;
    color: var(--gold); text-transform: none;
  }
  .ch-hero__lede {
    font-family: 'Fraunces', serif; font-size: clamp(17px, 1.4vw, 21px);
    line-height: 1.55; color: var(--bone); max-width: 56ch; margin: 0 0 36px;
  }
  .ch-hero__cta {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--ink); background: var(--gold);
    padding: 18px 28px; border: 1px solid var(--gold);
    transition: background .2s ease, transform .2s ease;
  }
  .ch-hero__cta:hover { background: var(--gold-bright); transform: translateY(-2px); }
  .ch-hero__cta::after { content: "→"; font-family: 'Manrope', sans-serif; letter-spacing: 0; }
  .ch-hero__media {
    position: relative; aspect-ratio: 4 / 5;
    border: 1px solid var(--line); overflow: hidden; background: var(--ink-2);
  }
  .ch-hero__media img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.04) saturate(1.05); }
  .ch-hero__media::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(11,11,12,.55));
  }
  .ch-hero__cap {
    position: absolute; bottom: 18px; left: 18px; right: 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft); display: flex; justify-content: space-between; gap: 16px;
  }
  .ch-hero__cap span:last-child { color: var(--gold); }

  /* THE 30-DAY ARC */
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
  .arc__weeks { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(20px, 2.6vw, 36px); }
  .week {
    background: var(--ink-2); border: 1px solid var(--line);
    padding: clamp(24px, 2.8vw, 40px);
    display: flex; flex-direction: column; gap: 18px;
    position: relative;
  }
  .week__rail {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .28em; text-transform: uppercase;
    color: var(--gold);
  }
  .week__title {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(24px, 2.2vw, 34px); line-height: 1; text-transform: uppercase;
    color: var(--cream); margin: 0;
  }
  .week__title em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); text-transform: none; }
  .week__sub { font-family: 'Fraunces', serif; font-style: italic; font-size: 16px; color: var(--bone); margin: 0; }
  .week__days {
    display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-top: 6px;
  }
  .week__day {
    aspect-ratio: 1; border: 1px solid var(--line);
    display: grid; place-items: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: var(--cream-soft);
    background: var(--ink);
    transition: border-color .2s ease, color .2s ease;
  }
  .week__day:hover { border-color: var(--gold); color: var(--gold); }
  .week__day--accent { color: var(--gold); border-color: var(--gold); }
  .week__list {
    list-style: none; margin: 8px 0 0; padding: 0;
    display: flex; flex-direction: column; gap: 10px;
  }
  .week__list li {
    font-family: 'Manrope', sans-serif; font-size: 14px; color: var(--cream-soft);
    display: grid; grid-template-columns: 56px 1fr; gap: 14px; align-items: baseline;
  }
  .week__list strong {
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    letter-spacing: .22em; color: var(--gold); font-weight: 500;
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

  /* PULL QUOTE */
  .pq {
    padding: clamp(80px, 10vw, 144px) 0;
    border-bottom: 1px solid var(--line);
    text-align: center;
  }
  .pq__rail {
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    letter-spacing: .3em; text-transform: uppercase; color: var(--gold);
    margin-bottom: 32px;
    display: inline-flex; align-items: center; gap: 16px;
  }
  .pq__rail::before, .pq__rail::after { content: ""; width: 36px; height: 1px; background: var(--gold); opacity: .5; }
  .pq__quote {
    font-family: 'Fraunces', serif; font-weight: 400; font-style: italic;
    font-size: clamp(24px, 3.2vw, 44px); line-height: 1.25;
    color: var(--cream); max-width: 30ch; margin: 0 auto;
  }
  .pq__quote em { color: var(--gold); }
  .pq__sig {
    margin-top: 32px; font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--cream-soft);
  }

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

  @media (max-width: 880px) {
    .ch-hero__inner { grid-template-columns: 1fr; }
    .ch-hero__media { aspect-ratio: 4 / 3; order: -1; }
    .arc__weeks { grid-template-columns: 1fr; }
    .audience { grid-template-columns: 1fr; }
  }
` }} />
      {/* @ts-expect-error Async Server Component */}
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

  <!-- 1. HERO -->
  <section class="ch-hero">
    <div class="page-wrap ch-hero__inner">
      <div>
        <span class="ch-hero__badge">Included with $10 Insider</span>
        <h1 class="ch-hero__title">30 Days. 30 Emails. <em>One</em> AI-powered offer.</h1>
        <p class="ch-hero__lede">
          Daily prompt, daily nudge, accountability check-ins. Build a real AI-powered offer
          end-to-end in a month — not in theory, in shipped output. Positioning, build,
          launch, iterate. By Day 30 you have a thing you can sell.
        </p>
        <a class="ch-hero__cta" href="/insider/">Get this + everything for $10/mo</a>
      </div>
      <figure class="ch-hero__media">
        <img src="/images/course-marketing-engine.jpg" alt="The Marketing Engine — where the 30-Day Empire Challenge runs from." loading="eager" />
        <figcaption class="ch-hero__cap">
          <span>Empire Challenge · Cohort 04</span><span>30 Days</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <!-- 2. THE 30-DAY ARC -->
  <section class="arc">
    <div class="page-wrap">
      <div class="arc__head">
        <h2 class="arc__title">The <em>arc.</em></h2>
        <span class="arc__meta">Four Weeks · Daily Prompts</span>
      </div>
      <div class="arc__weeks">

        <article class="week">
          <span class="week__rail">Week 01 · Days 1–7</span>
          <h3 class="week__title">Position the <em>offer.</em></h3>
          <p class="week__sub">Pick the niche, pick the promise, pick the price.</p>
          <div class="week__days" aria-label="Days 1 through 7">
            <span class="week__day week__day--accent">01</span>
            <span class="week__day">02</span>
            <span class="week__day">03</span>
            <span class="week__day">04</span>
            <span class="week__day">05</span>
            <span class="week__day">06</span>
            <span class="week__day">07</span>
          </div>
          <ul class="week__list">
            <li><strong>D1–2</strong>Niche audit + ICP doc.</li>
            <li><strong>D3–5</strong>Offer architecture + price test.</li>
            <li><strong>D6–7</strong>One-page sales doc, AI-drafted.</li>
          </ul>
        </article>

        <article class="week">
          <span class="week__rail">Week 02 · Days 8–14</span>
          <h3 class="week__title">Build the <em>thing.</em></h3>
          <p class="week__sub">Claude Code, GHL, the funnel, the email sequence.</p>
          <div class="week__days" aria-label="Days 8 through 14">
            <span class="week__day">08</span>
            <span class="week__day">09</span>
            <span class="week__day">10</span>
            <span class="week__day week__day--accent">11</span>
            <span class="week__day">12</span>
            <span class="week__day">13</span>
            <span class="week__day">14</span>
          </div>
          <ul class="week__list">
            <li><strong>D8–10</strong>Sales page in Claude Code.</li>
            <li><strong>D11–12</strong>GHL pipeline + checkout.</li>
            <li><strong>D13–14</strong>Email sequence + nurture.</li>
          </ul>
        </article>

        <article class="week">
          <span class="week__rail">Week 03 · Days 15–21</span>
          <h3 class="week__title">Prep the <em>launch.</em></h3>
          <p class="week__sub">Audience warming, pre-sell, ad creative, soft list.</p>
          <div class="week__days" aria-label="Days 15 through 21">
            <span class="week__day">15</span>
            <span class="week__day">16</span>
            <span class="week__day">17</span>
            <span class="week__day week__day--accent">18</span>
            <span class="week__day">19</span>
            <span class="week__day">20</span>
            <span class="week__day">21</span>
          </div>
          <ul class="week__list">
            <li><strong>D15–17</strong>Pre-sell list, founder offer.</li>
            <li><strong>D18–19</strong>Ad creative + pixel sanity.</li>
            <li><strong>D20–21</strong>Dry run + soft launch.</li>
          </ul>
        </article>

        <article class="week">
          <span class="week__rail">Week 04 · Days 22–30</span>
          <h3 class="week__title">Launch + <em>iterate.</em></h3>
          <p class="week__sub">Open the doors, read the data, fix the leak, repeat.</p>
          <div class="week__days" aria-label="Days 22 through 30">
            <span class="week__day">22</span>
            <span class="week__day">23</span>
            <span class="week__day">24</span>
            <span class="week__day">25</span>
            <span class="week__day">26</span>
            <span class="week__day">27</span>
            <span class="week__day">28</span>
            <span class="week__day">29</span>
            <span class="week__day week__day--accent">30</span>
          </div>
          <ul class="week__list">
            <li><strong>D22–24</strong>Public launch + traffic on.</li>
            <li><strong>D25–27</strong>Read the funnel, fix the choke.</li>
            <li><strong>D28–30</strong>Iterate, ship v2, debrief.</li>
          </ul>
        </article>

      </div>
    </div>
  </section>

  <!-- 3. WHO IT'S FOR -->
  <section class="audience">
    <div class="page-wrap" style="display:contents;">
      <div style="grid-column: 1 / 2; padding-left: clamp(20px, 4vw, 56px);">
        <p class="audience__num">3<span class="audience__sub">Operator Profiles</span></p>
      </div>
      <div style="grid-column: 2 / 3; padding-right: clamp(20px, 4vw, 56px);">
        <h2 class="audience__title">Who it's <em>for.</em></h2>
        <ul class="audience__list">
          <li><span><strong>Operators with an idea but no shipped offer.</strong> You've been talking about it for six months. This forces the ship date.</span></li>
          <li><span><strong>Agency owners testing AI products.</strong> You sell services. You want a productized AI thing. Build it in 30 days, validate it on real traffic.</span></li>
          <li><span><strong>E-com folks adding a service layer.</strong> Already running a store. Want to bolt on consulting, audits, done-for-you. The arc fits.</span></li>
        </ul>
      </div>
    </div>
  </section>

  <!-- 4. PULL QUOTE -->
  <section class="pq">
    <div class="page-wrap">
      <div class="pq__rail">Operator's Note</div>
      <p class="pq__quote">
        “I built every offer I run in <em>under thirty days.</em> Not because I'm fast.
        Because the deadline forces the cut.”
      </p>
      <p class="pq__sig">— Benji</p>
    </div>
  </section>

  <!-- 5. CTA STRIP -->
  <section class="cta-strip">
    <div class="page-wrap">
      <div class="cta-strip__eyebrow">When you're ready</div>
      <h2 class="cta-strip__title">Join Insider — <em>$10/mo</em></h2>
      <a class="cta-strip__primary" href="/insider/">Lock $10/mo</a>
      <a class="cta-strip__cross" href="/founders/">Or wholesale GHL — $49/mo</a>
    </div>
  </section>

` }} />
      <Footer />
    </>
  );
}
