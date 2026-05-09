import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "You watched me dial. Now run the system. — $10 Insider · Benji's AI Empire",
  description: "Free-tier viewer offer: lock in $10/mo Insider. Four courses, every prompt, every script, the Starter Kit, both 30-day challenges, the community, GHL @ $0.04/min.",
  alternates: { canonical: "https://benjisaiempire.com/starter-kit/insider-offer" },
  robots: { index: false, follow: true }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  .page-wrap { max-width: var(--container); margin: 0 auto; padding: 0 clamp(20px, 4vw, 56px); }

  /* HERO */
  .tw-hero {
    position: relative;
    padding: clamp(60px, 8vw, 112px) 0 clamp(48px, 7vw, 88px);
    overflow: hidden;
    border-bottom: 1px solid var(--line);
  }
  .tw-hero::before {
    content: ""; position: absolute; inset: 0;
    background-image: radial-gradient(rgba(244,236,216,.04) 1px, transparent 1px);
    background-size: 4px 4px; pointer-events: none; opacity: .55;
  }
  .tw-hero__band {
    display: inline-flex; align-items: center; gap: 14px;
    padding: 8px 14px;
    border: 1px solid var(--rust);
    background: rgba(196,41,46,.08);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream); margin-bottom: 28px;
  }
  .tw-hero__band .dot {
    width: 7px; height: 7px; border-radius: 50%; background: var(--rust);
    box-shadow: 0 0 0 0 rgba(196,41,46,.6);
    animation: dotPulse 1.6s ease-in-out infinite;
  }
  @keyframes dotPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(196,41,46,.6); }
    50% { box-shadow: 0 0 0 8px rgba(196,41,46,0); }
  }
  .tw-hero__inner { position: relative; display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(32px, 5vw, 72px); align-items: center; }
  .tw-hero__title {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(46px, 6.4vw, 104px); line-height: .9;
    text-transform: uppercase; color: var(--cream); margin: 0 0 26px;
    letter-spacing: -.012em;
  }
  .tw-hero__title em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); text-transform: none; }
  .tw-hero__lede {
    font-family: 'Fraunces', serif; font-size: clamp(17px, 1.4vw, 21px);
    line-height: 1.55; color: var(--bone); max-width: 54ch; margin: 0 0 32px;
  }
  .tw-hero__price {
    display: inline-flex; align-items: baseline; gap: 12px;
    font-family: 'Anton', sans-serif;
    font-size: clamp(56px, 7vw, 104px); line-height: 1; color: var(--gold);
    margin: 0 0 8px;
  }
  .tw-hero__price small {
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
    letter-spacing: .26em; text-transform: uppercase; color: var(--cream-soft);
  }
  .tw-hero__media {
    position: relative; aspect-ratio: 4 / 5;
    border: 1px solid var(--line); overflow: hidden; background: var(--ink-2);
  }
  .tw-hero__media img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.04) saturate(1.05); }
  .tw-hero__media::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(11,11,12,.6));
  }

  /* THE BUCKET */
  .bucket {
    padding: clamp(64px, 8vw, 112px) 0;
    border-bottom: 1px solid var(--line);
  }
  .bucket__head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: clamp(36px, 4vw, 56px); flex-wrap: wrap; }
  .bucket__title {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(34px, 4.4vw, 64px); line-height: .92;
    text-transform: uppercase; color: var(--cream); margin: 0; letter-spacing: -.01em;
  }
  .bucket__title em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); text-transform: none; }
  .bucket__meta { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .26em; text-transform: uppercase; color: var(--cream-soft); }
  .bucket__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; }
  .bucket__item {
    display: grid; grid-template-columns: 56px 1fr auto;
    gap: 20px; align-items: center;
    padding: 22px 0;
    border-top: 1px solid var(--line);
  }
  .bucket__item:last-child { border-bottom: 1px solid var(--line); }
  .bucket__num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: .26em; color: var(--gold);
  }
  .bucket__name {
    font-family: 'Fraunces', serif; font-size: clamp(18px, 1.7vw, 24px);
    line-height: 1.35; color: var(--cream);
  }
  .bucket__name strong { font-weight: 600; }
  .bucket__price-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .24em; text-transform: uppercase;
    color: var(--cream-soft);
  }

  /* CHECKOUT */
  .checkout {
    padding: clamp(64px, 8vw, 112px) 0;
    border-bottom: 1px solid var(--line);
    background: linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%);
    text-align: center;
  }
  .checkout__eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .32em; text-transform: uppercase; color: var(--gold); margin-bottom: 22px; }
  .checkout__title {
    font-family: 'Anton', sans-serif; font-size: clamp(36px, 5vw, 72px);
    line-height: .92; text-transform: uppercase; color: var(--cream); margin: 0 0 36px;
  }
  .ghl-slot {
    max-width: 520px; margin: 0 auto 32px;
    aspect-ratio: 5 / 4;
    background: var(--ink); border: 1px dashed var(--line);
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .24em; text-transform: uppercase; color: var(--cream-soft);
    padding: 32px;
  }
  .ghl-slot strong { color: var(--gold); font-weight: 500; }
  .checkout__cta {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--ink); background: var(--gold);
    padding: 22px 36px; border: 1px solid var(--gold);
    transition: background .2s ease, transform .2s ease;
  }
  .checkout__cta:hover { background: var(--gold-bright); transform: translateY(-2px); }
  .checkout__cta::after { content: "→"; font-family: 'Manrope', sans-serif; letter-spacing: 0; }
  .checkout__fineprint {
    font-family: 'JetBrains Mono', monospace; font-size: 10.5px;
    letter-spacing: .22em; text-transform: uppercase; color: var(--cream-soft);
    margin-top: 18px;
  }

  /* SOCIAL PROOF */
  .proof {
    padding: clamp(64px, 8vw, 112px) 0;
    border-bottom: 1px solid var(--line);
    text-align: center;
  }
  .proof__rail {
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    letter-spacing: .3em; text-transform: uppercase; color: var(--gold);
    margin-bottom: 32px;
    display: inline-flex; align-items: center; gap: 16px;
  }
  .proof__rail::before, .proof__rail::after { content: ""; width: 36px; height: 1px; background: var(--gold); opacity: .5; }
  .proof__numbers { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px, 4vw, 56px); max-width: 880px; margin: 0 auto; }
  .proof__stat { padding: 28px 0; }
  .proof__big {
    font-family: 'Anton', sans-serif;
    font-size: clamp(64px, 8vw, 128px); line-height: .9;
    color: var(--gold); margin: 0; letter-spacing: -.02em;
  }
  .proof__label {
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    letter-spacing: .28em; text-transform: uppercase; color: var(--cream-soft);
    margin-top: 14px;
  }
  .proof__attr {
    font-family: 'Fraunces', serif; font-style: italic; font-size: 18px;
    color: var(--bone); max-width: 56ch; margin: 36px auto 0; line-height: 1.5;
  }

  /* SECONDARY CTA */
  .second-cta {
    padding: clamp(48px, 6vw, 88px) 0;
    text-align: center;
  }
  .second-cta__link {
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft); transition: color .2s ease;
  }
  .second-cta__link:hover { color: var(--gold-bright); }
  .second-cta__link::after { content: " →"; }

  @media (max-width: 880px) {
    .tw-hero__inner { grid-template-columns: 1fr; }
    .tw-hero__media { aspect-ratio: 4 / 3; order: -1; }
    .bucket__item { grid-template-columns: 36px 1fr; }
    .bucket__price-tag { grid-column: 2 / 3; padding-top: 4px; }
    .proof__numbers { grid-template-columns: 1fr; }
  }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

  <!-- 1. HERO -->
  <section class="tw-hero">
    <div class="page-wrap tw-hero__inner">
      <div>
        <span class="tw-hero__band"><span class="dot"></span>Free Tier Viewer · Limited Offer</span>
        <h1 class="tw-hero__title">You watched me <em>dial.</em> Now run the system.</h1>
        <p class="tw-hero__lede">
          You've been watching the videos. Cool. The videos are the trailer. The system —
          the Starter Kit PDF, every prompt I've ever shipped, the master cold-call script,
          the 30-day challenges, the GHL reseller seat — all lives one tier up. Ten dollars.
          Unlock the whole bucket.
        </p>
        <p class="tw-hero__price">$10<small>/ month · cancel any time</small></p>
      </div>
      <figure class="tw-hero__media">
        <img src="/images/headshot-pointing.jpg?v=2" alt="Benji pointing — your turn." loading="eager" />
      </figure>
    </div>
  </section>

  <!-- 2. THE BUCKET -->
  <section class="bucket">
    <div class="page-wrap">
      <div class="bucket__head">
        <h2 class="bucket__title">What's <em>actually</em> in the bucket.</h2>
        <span class="bucket__meta">5 things · all $10/mo</span>
      </div>
      <ul class="bucket__list">
        <li class="bucket__item">
          <span class="bucket__num">01</span>
          <span class="bucket__name"><strong>Four full courses</strong> — Empire OS, Brand Builder, Cold Calling System, Marketing Engine. Every module, every download.</span>
          <span class="bucket__price-tag">Included</span>
        </li>
        <li class="bucket__item">
          <span class="bucket__num">02</span>
          <span class="bucket__name"><strong>Every prompt + every script</strong> — the Claude Code design prompts, the master cold-call script, the email sequences, the offer doc.</span>
          <span class="bucket__price-tag">Included</span>
        </li>
        <li class="bucket__item">
          <span class="bucket__num">03</span>
          <span class="bucket__name"><strong>The Starter Kit PDF</strong> — the actual playbook the free crowd doesn't get. Operator's edition.</span>
          <span class="bucket__price-tag">Included</span>
        </li>
        <li class="bucket__item">
          <span class="bucket__num">04</span>
          <span class="bucket__name"><strong>Both 30-day challenges</strong> — Empire Challenge (build) + Cold Calling Challenge (100 dials). Daily prompts, accountability, badges.</span>
          <span class="bucket__price-tag">Included</span>
        </li>
        <li class="bucket__item">
          <span class="bucket__num">05</span>
          <span class="bucket__name"><strong>Community + GHL @ $0.04/min</strong> — operator's lounge access, plus the GHL reseller account at four cents a minute.</span>
          <span class="bucket__price-tag">Included</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- 3. CHECKOUT -->
  <section class="checkout" id="lock">
    <div class="page-wrap">
      <div class="checkout__eyebrow">Lock the rate · 60 seconds</div>
      <h2 class="checkout__title">$10/mo. One click.</h2>
      <div class="ghl-slot" data-ghl-form="insider-checkout" aria-label="GoHighLevel checkout embed">
        <strong>GHL Checkout Form</strong>
        <span>Embed slot · wires to live form</span>
      </div>
      <a class="checkout__cta" href="#">Lock $10/mo</a>
      <p class="checkout__fineprint">Stripe · Cancel any time · Instant access</p>
    </div>
  </section>

  <!-- 4. SOCIAL PROOF -->
  <section class="proof">
    <div class="page-wrap">
      <div class="proof__rail">Receipts</div>
      <div class="proof__numbers">
        <div class="proof__stat">
          <p class="proof__big">$2.8M</p>
          <p class="proof__label">Shopify Revenue Tracked</p>
        </div>
        <div class="proof__stat">
          <p class="proof__big">31,745</p>
          <p class="proof__label">Orders Shipped</p>
        </div>
      </div>
      <p class="proof__attr">— Numbers from the e-com brand I run alongside this. Same playbook, same prompts, same cold-call cadence. The bucket is the bucket.</p>
    </div>
  </section>

  <!-- 5. SECONDARY CTA -->
  <section class="second-cta">
    <div class="page-wrap">
      <a class="second-cta__link" href="/starter-kit/">Not ready yet? Stay in free tier</a>
    </div>
  </section>

` }} />
      <Footer />
    </>
  );
}
