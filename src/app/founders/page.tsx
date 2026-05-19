import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Wholesale GHL — $49/mo · First 100 Operators · Benji's AI Empire",
  description: "GoHighLevel at $0.015 a minute, $49 a month, locked for life. First 100 seats only — then back to $99 forever. Pure software at wholesale. No courses.",
  alternates: { canonical: "https://benjisaiempire.com/founders/" },
  openGraph: { title: "Wholesale GHL — $49/mo · First 100 Operators", description: "GHL at $0.015/min. $49/mo locked for life. First 100 only — then $99 forever.", url: "https://benjisaiempire.com/founders/", images: [{ url: "https://benjisaiempire.com/images/hero-empire.jpg?v=2" }], type: "website" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  /* ── PAGE LAYOUT ─────────────────────────────────────────────── */
  .page-wrap { max-width: var(--container); margin: 0 auto; padding: 0 clamp(20px, 4vw, 56px); }

  /* ── HERO ────────────────────────────────────────────────────── */
  .f-hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background: var(--ink);
    border-bottom: 1px solid var(--line);
  }
  .f-hero::before {
    content:""; position:absolute; inset:0;
    background-image:
      radial-gradient(rgba(244,236,216,.045) 1px, transparent 1px),
      radial-gradient(rgba(11,11,12,.06) 1px, transparent 1px);
    background-size: 3px 3px, 5px 5px;
    background-position: 0 0, 1px 2px;
    mix-blend-mode: overlay; opacity: .55;
    pointer-events:none; z-index:5;
  }
  .f-hero__grid {
    display: grid;
    grid-template-columns: 44% 56%;
    min-height: 92vh;
    position: relative;
    z-index: 1;
  }
  .f-hero__left {
    padding: clamp(36px, 5vw, 72px) clamp(28px, 4vw, 64px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;
    background: linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%);
    border-right: 1px solid var(--line);
  }
  .f-hero__rail {
    display: flex; align-items: center; justify-content: space-between; gap: 18px;
  }
  .f-hero__chapter {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft);
    display: inline-flex; align-items: center; gap: 14px;
  }
  .f-hero__chapter em { font-style: normal; color: var(--gold); }
  .f-hero__chapter .bar { display:inline-block; width:42px; height:1px; background: var(--line); }
  .f-hero__seats {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 6px 11px;
    border: 1px solid var(--rust);
    background: rgba(196,41,46,.08);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream);
    border-radius: 2px;
  }
  .f-hero__seats .dot { width:7px; height:7px; border-radius:50%; background: var(--rust); }

  .f-hero__eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .32em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 22px;
  }
  .f-hero__eyebrow span { color: var(--cream-soft); margin: 0 8px; }
  .f-hero h1 {
    font-family: 'Anton', sans-serif;
    font-weight: 400;
    font-size: clamp(42px, 5.6vw, 92px);
    line-height: .92;
    letter-spacing: -.012em;
    text-transform: uppercase;
    color: var(--cream);
    margin: 0;
  }
  .f-hero h1 .gold { color: var(--gold); }
  .f-hero h1 .amp {
    font-family: 'Fraunces', serif;
    font-style: italic; font-weight: 300;
    text-transform: lowercase;
    color: var(--gold-bright);
    padding: 0 .04em;
  }
  .f-hero__lede {
    margin-top: 28px;
    max-width: 52ch;
    font-family: 'Fraunces', serif;
    font-variation-settings: "opsz" 36;
    font-weight: 380;
    font-size: clamp(16px, 1.2vw, 19px);
    line-height: 1.55;
    color: var(--cream);
  }
  .f-hero__lede strong { font-weight: 600; color: var(--gold-bright); font-style: italic; }

  .f-hero__ctas {
    margin-top: 34px;
    display: flex; flex-wrap: wrap; gap: 14px; align-items: center;
  }
  .f-btn {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 16px 26px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11.5px; letter-spacing: .2em; text-transform: uppercase;
    text-decoration: none; border-radius: 2px;
    border: 1px solid transparent;
    transition: transform .3s var(--ease), background .25s ease, border-color .25s ease, color .25s ease;
  }
  .f-btn .arrow { transition: transform .3s var(--ease); }
  .f-btn:hover .arrow { transform: translateX(4px); }
  .f-btn--primary {
    background: var(--gold); color: var(--ink); font-weight: 700;
    box-shadow: 0 10px 30px -12px rgba(212,175,55,.55);
  }
  .f-btn--primary:hover { background: var(--gold-bright); transform: translateY(-1px); }
  .f-btn--ghost {
    color: var(--cream); border-color: var(--line); background: transparent;
  }
  .f-btn--ghost:hover { border-color: var(--cream); background: rgba(244,236,216,.04); }

  .f-hero__ticker {
    display: grid; grid-template-columns: repeat(3,1fr); gap: 0;
    border-top: 1px solid var(--line); padding-top: 22px;
  }
  .f-hero__stat { padding-right: 18px; border-right: 1px solid var(--line); }
  .f-hero__stat:last-child { border-right: 0; padding-left: 18px; padding-right: 0; }
  .f-hero__stat:nth-child(2) { padding-left: 18px; }
  .f-hero__stat .k {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9.5px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--cream-soft); display: block; margin-bottom: 6px;
  }
  .f-hero__stat .v {
    font-family: 'Anton', sans-serif;
    font-size: clamp(22px, 2vw, 30px);
    color: var(--cream); line-height: 1;
  }
  .f-hero__stat .v em {
    font-family: 'Fraunces', serif; font-style: italic; font-weight: 300; color: var(--gold);
  }

  .f-hero__right {
    position: relative; overflow: hidden; background: var(--ink-3);
  }
  .f-hero__photo {
    position: absolute; inset: 0;
    background-image: url('/images/hero-mclaren.jpg?v=2');
    background-size: cover; background-position: center 42%;
    transform: scale(1.04);
  }
  .f-hero__photo::after {
    content:""; position: absolute; inset: 0;
    background: linear-gradient(90deg, rgba(11,11,12,.45) 0%, transparent 35%, transparent 70%, rgba(11,11,12,.5) 100%);
  }
  .f-hero__frame {
    position: absolute; inset: clamp(20px, 3vw, 36px);
    border: 1px solid rgba(244,236,216,.18);
    pointer-events: none; z-index: 2;
  }
  .f-hero__caption {
    position: absolute; right: clamp(24px,3vw,40px); bottom: clamp(24px,3vw,40px);
    z-index: 3;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream); padding: 8px 12px;
    background: rgba(11,11,12,.55);
    border: 1px solid var(--line);
    backdrop-filter: blur(6px);
  }
  .f-hero__caption em { font-style: normal; color: var(--gold); }

  @media (max-width: 960px) {
    .f-hero__grid { grid-template-columns: 1fr; }
    .f-hero__right { min-height: 360px; }
    .f-hero__left { border-right: 0; border-bottom: 1px solid var(--line); }
  }

  /* ── SCARCITY RIBBON ─────────────────────────────────────────── */
  .f-ribbon {
    background: var(--rust);
    color: var(--cream);
    border-top: 1px solid rgba(0,0,0,.2);
    border-bottom: 1px solid rgba(0,0,0,.2);
  }
  .f-ribbon__inner {
    max-width: var(--container);
    margin: 0 auto;
    padding: 18px clamp(20px, 4vw, 56px);
    display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center;
    gap: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: .26em; text-transform: uppercase;
  }
  .f-ribbon__counter {
    display: inline-flex; align-items: baseline; gap: 10px;
    font-family: 'Anton', sans-serif;
    font-size: clamp(22px, 2.6vw, 32px);
    letter-spacing: .02em; line-height: 1;
  }
  .f-ribbon__counter em {
    font-style: normal;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .26em;
    color: rgba(244,236,216,.75);
  }
  .f-ribbon__strike { text-decoration: line-through; opacity: .65; }
  .f-ribbon__pulse {
    display: inline-block; width: 8px; height: 8px; border-radius: 50%;
    background: var(--cream); margin-right: 10px;
    animation: f-pulse 1.6s ease-in-out infinite;
  }
  @keyframes f-pulse {
    0%,100% { opacity:.4; transform:scale(.85); }
    50% { opacity:1; transform:scale(1.1); }
  }

  /* ── SHARED SECTION SHELL ────────────────────────────────────── */
  .f-section { position: relative; padding: clamp(72px, 9vw, 132px) 0; }
  .f-section--alt { background: var(--ink-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .f-kicker {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .32em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 22px;
  }
  .f-kicker .bar { display:inline-block; width: 42px; height: 1px; background: var(--gold); opacity:.7; }
  .f-h2 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(34px, 4.2vw, 64px);
    line-height: .94; letter-spacing: -.005em;
    text-transform: uppercase;
    color: var(--cream);
    max-width: 22ch;
    margin: 0 0 22px;
  }
  .f-h2 .gold { color: var(--gold); }
  .f-deck {
    font-family: 'Fraunces', serif;
    font-style: italic; font-weight: 400;
    font-size: clamp(18px, 1.5vw, 22px);
    line-height: 1.5;
    color: var(--bone);
    max-width: 56ch;
    margin: 0 0 40px;
  }

  /* ── THE MATH ────────────────────────────────────────────────── */
  .f-math__grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: clamp(40px, 5vw, 80px);
    align-items: start;
  }
  @media (max-width: 900px) { .f-math__grid { grid-template-columns: 1fr; } }

  .f-math__table {
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    margin-top: 24px;
  }
  .f-math__row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    gap: 18px;
    padding: 22px 0;
    border-bottom: 1px solid var(--line);
  }
  .f-math__row:last-child { border-bottom: 0; }
  .f-math__row--total { background: linear-gradient(90deg, rgba(212,175,55,.06), transparent); padding: 30px 18px; }
  .f-math__label {
    font-family: 'Manrope', sans-serif;
    font-size: 15px; line-height: 1.5; color: var(--cream);
  }
  .f-math__label small {
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .22em; text-transform: uppercase;
    color: var(--cream-soft); margin-top: 6px;
  }
  .f-math__num {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(20px, 2vw, 28px);
    font-weight: 500;
    color: var(--cream);
    letter-spacing: -.005em;
    text-align: right; white-space: nowrap;
  }
  .f-math__num--strike { color: var(--cream-soft); text-decoration: line-through; }
  .f-math__num--gold { color: var(--gold-bright); }
  .f-math__num--save {
    font-family: 'Anton', sans-serif;
    font-size: clamp(34px, 4vw, 52px);
    color: var(--gold-bright);
    letter-spacing: 0;
    line-height: 1;
  }
  .f-math__caption {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-size: 15px;
    color: var(--cream-soft);
    margin-top: 22px; max-width: 50ch;
  }
  .f-math__caption strong { color: var(--gold-bright); font-weight: 500; }

  /* ── WHO IT'S FOR / NOT INCLUDED ─────────────────────────────── */
  .f-twocol {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(32px, 4vw, 64px);
  }
  @media (max-width: 860px) { .f-twocol { grid-template-columns: 1fr; } }

  .f-card {
    border: 1px solid var(--line);
    padding: clamp(28px, 3vw, 44px);
    background: rgba(244,236,216,.02);
    position: relative;
  }
  .f-card__head {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--gold);
    padding-bottom: 14px;
    border-bottom: 1px solid var(--line);
    margin-bottom: 22px;
  }
  .f-card h3 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(24px, 2.4vw, 34px);
    line-height: 1; text-transform: uppercase;
    color: var(--cream); margin: 0 0 18px;
  }
  .f-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
  .f-list li {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 14px;
    align-items: baseline;
    font-size: 15px; line-height: 1.55;
    color: var(--cream);
  }
  .f-list li::before {
    content: "→";
    font-family: 'Manrope', sans-serif;
    color: var(--gold);
    font-weight: 600;
  }
  .f-list--strike li { color: var(--cream-soft); }
  .f-list--strike li::before { content: "✕"; color: var(--rust); }

  /* ── WHY $49 ─────────────────────────────────────────────────── */
  .f-why {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1.5fr;
    gap: clamp(40px, 5vw, 80px);
    align-items: start;
  }
  @media (max-width: 900px) { .f-why { grid-template-columns: 1fr; } }

  .f-why__num {
    font-family: 'Anton', sans-serif;
    font-size: clamp(120px, 18vw, 280px);
    line-height: .85;
    color: var(--gold);
    letter-spacing: -.02em;
  }
  .f-why__num em {
    font-family: 'Fraunces', serif;
    font-style: italic; font-weight: 300;
    color: var(--gold-bright);
    text-transform: lowercase;
    font-size: .55em;
  }
  .f-why__body p {
    font-family: 'Fraunces', serif;
    font-size: clamp(18px, 1.5vw, 22px);
    line-height: 1.5;
    color: var(--cream);
    margin: 0 0 22px;
  }
  .f-why__body p:last-child { margin-bottom: 0; }
  .f-why__sig {
    display: inline-block;
    margin-top: 22px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft);
    padding-top: 18px; border-top: 1px solid var(--line);
  }
  .f-why__sig em { font-style: normal; color: var(--gold); }

  /* ── CLAIM ───────────────────────────────────────────────────── */
  .f-claim__inner {
    max-width: 720px;
    margin: 0 auto;
    text-align: center;
  }
  .f-claim .f-h2 { margin-left: auto; margin-right: auto; }
  .ghl-checkout-slot {
    margin: 40px auto 0;
    min-height: 360px;
    border: 1px dashed var(--line);
    background: rgba(244,236,216,.02);
    display: flex; align-items: center; justify-content: center; flex-direction: column;
    gap: 14px;
    padding: clamp(40px, 5vw, 64px);
    position: relative;
  }
  .ghl-checkout-slot::before {
    content: "GHL CHECKOUT";
    position: absolute; top: -10px; left: 24px;
    background: var(--ink-2);
    padding: 0 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9.5px; letter-spacing: .32em;
    color: var(--gold);
  }
  .ghl-checkout-slot__price {
    font-family: 'Anton', sans-serif;
    font-size: clamp(56px, 7vw, 96px);
    line-height: 1;
    color: var(--cream);
  }
  .ghl-checkout-slot__price em {
    font-family: 'Fraunces', serif; font-style: italic; font-weight: 300;
    color: var(--gold);
  }
  .ghl-checkout-slot__sub {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft);
  }
  .ghl-checkout-slot .f-btn { margin-top: 14px; }

  .f-claim__note {
    margin-top: 22px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .22em; text-transform: uppercase;
    color: var(--cream-soft);
    line-height: 1.7;
  }

  /* ── FAQ ─────────────────────────────────────────────────────── */
  .f-faq__list {
    border-top: 1px solid var(--line);
    margin-top: 32px;
  }
  .f-faq__item {
    border-bottom: 1px solid var(--line);
    padding: clamp(24px, 3vw, 40px) 0;
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: clamp(20px, 3vw, 48px);
    align-items: start;
  }
  @media (max-width: 720px) { .f-faq__item { grid-template-columns: 1fr; gap: 14px; } }
  .f-faq__num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .28em; text-transform: uppercase;
    color: var(--gold);
    padding-top: 6px;
  }
  .f-faq__q {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(22px, 2vw, 28px);
    line-height: 1.05;
    color: var(--cream);
    text-transform: uppercase;
    margin: 0 0 14px;
  }
  .f-faq__a {
    font-family: 'Fraunces', serif;
    font-size: 17px; line-height: 1.6;
    color: var(--bone);
    max-width: 62ch;
  }
  .f-faq__a strong { color: var(--gold-bright); font-weight: 500; font-style: italic; }
` }} />
      <Topbar />
      <Marquee />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

    <!-- ═══ HERO ═══════════════════════════════════════════════ -->
    <section class="f-hero" aria-labelledby="hero-h">
      <div class="f-hero__grid">
        <div class="f-hero__left">
          <div class="f-hero__rail">
            <span class="f-hero__chapter">
              <em>Tier 03</em>
              <span class="bar" aria-hidden="true"></span>
              Wholesale Software Pass
            </span>
            <span class="f-hero__seats">
              <span class="dot" aria-hidden="true"></span>
              87 of 100 left
            </span>
          </div>

          <div>
            <p class="f-hero__eyebrow">
              GoHighLevel · Wholesale Pass <span>/</span> Founders Issue
            </p>
            <h1 id="hero-h">
              GHL at <span class="gold">$0.015</span> a minute. <br>
              <span class="amp">&</span> <span class="gold">$49</span> a month. <br>
              First <span class="gold">100</span> only.
            </h1>
            <p class="f-hero__lede">
              I bulk-buy GoHighLevel minutes at the agency wholesale rate. The first hundred operators
              who lock in <strong>get that rate at $49 a month — for life.</strong> After 100 it goes
              back to $99 and stays there. No courses, no fluff. Pure software at the price I pay.
            </p>
            <div class="f-hero__ctas">
              <a class="f-btn f-btn--primary" href="#claim-form">
                Lock my $49 seat <span class="arrow" aria-hidden="true">→</span>
              </a>
              <a class="f-btn f-btn--ghost" href="/#pricing">
                See full pricing <span class="arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div class="f-hero__ticker" role="group" aria-label="Headline numbers">
            <div class="f-hero__stat">
              <span class="k">Per-Minute</span>
              <span class="v">$0.015 <em>wholesale</em></span>
            </div>
            <div class="f-hero__stat">
              <span class="k">Monthly</span>
              <span class="v">$49 <em>locked</em></span>
            </div>
            <div class="f-hero__stat">
              <span class="k">Seats</span>
              <span class="v">100 <em>then $99</em></span>
            </div>
          </div>
        </div>

        <div class="f-hero__right" aria-hidden="true">
          <div class="f-hero__photo"></div>
          <div class="f-hero__frame"></div>
          <div class="f-hero__caption">
            File <em>03</em> · Founders Pass · The Wholesale Lane
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ MARQUEE ════════════════════════════════════════════ -->
    

    <!-- ═══ SCARCITY RIBBON ════════════════════════════════════ -->
    <aside class="f-ribbon" aria-label="Live seat counter">
      <div class="f-ribbon__inner">
        <span><span class="f-ribbon__pulse" aria-hidden="true"></span>First 100 seats</span>
        <span class="f-ribbon__counter" data-seat-counter>
          87
          <em>seats remaining</em>
        </span>
        <span><span class="f-ribbon__strike">Was $99/mo</span> &nbsp;·&nbsp; Now $49/mo locked for life</span>
      </div>
    </aside>

    <!-- ═══ THE MATH ═══════════════════════════════════════════ -->
    <section class="f-section" aria-labelledby="math-h">
      <div class="page-wrap">
        <div class="f-math__grid">
          <div>
            <p class="f-kicker"><span class="bar" aria-hidden="true"></span>The Math · No Funny Stuff</p>
            <h2 id="math-h" class="f-h2">You save <span class="gold">$175</span> on day one. Then it compounds.</h2>
            <p class="f-deck">
              Run the numbers against the Insider tier — same software, retail per-minute pricing.
              At 5,000 minutes a month (one full-time dialer) the wholesale lane pays for itself
              in the first week.
            </p>
            <p class="f-math__caption">
              Push 10,000 minutes? You save <strong>$300/mo</strong>. Two dialers? <strong>$475/mo.</strong>
              The math is the pitch.
            </p>
          </div>

          <div>
            <div class="f-math__table" role="table" aria-label="Cost comparison at 5,000 minutes per month">
              <div class="f-math__row" role="row">
                <div class="f-math__label" role="cell">
                  Insider tier — retail GHL minutes
                  <small>5,000 min × $0.040 + $9/mo</small>
                </div>
                <div class="f-math__num f-math__num--strike" role="cell">$210/mo</div>
              </div>
              <div class="f-math__row" role="row">
                <div class="f-math__label" role="cell">
                  Wholesale tier — bulk-rate GHL minutes
                  <small>5,000 min &nbsp;×&nbsp; $0.015 &nbsp;+&nbsp; $49/mo</small>
                </div>
                <div class="f-math__num f-math__num--gold" role="cell">$124/mo</div>
              </div>
              <div class="f-math__row f-math__row--total" role="row">
                <div class="f-math__label" role="cell">
                  You keep — every month, on day one
                  <small>$125 in minutes saved · plus tier delta</small>
                </div>
                <div class="f-math__num--save" role="cell">$175<span style="font-size:.4em;letter-spacing:.05em;">/mo</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ WHO IT'S FOR / NOT INCLUDED ════════════════════════ -->
    <section class="f-section f-section--alt" aria-labelledby="fit-h">
      <div class="page-wrap">
        <p class="f-kicker"><span class="bar" aria-hidden="true"></span>The Fit · Who Should Click & Who Shouldn't</p>
        <h2 id="fit-h" class="f-h2">Wholesale is a <span class="gold">software</span> deal — not a course deal.</h2>
        <p class="f-deck">
          Read both columns before you buy. The point of $49 isn't education — it's leverage on
          the per-minute rate. If you're not already burning minutes, the Insider tier is the better door.
        </p>

        <div class="f-twocol" style="margin-top: 18px;">
          <div class="f-card">
            <div class="f-card__head">Who this is for</div>
            <h3>The high-volume dialer</h3>
            <ul class="f-list">
              <li>Agencies running outbound on GHL with 5,000+ minutes a month</li>
              <li>Cold-call teams burning $200+/mo in GHL minutes alone</li>
              <li>SMS / voice operators who already know the platform inside-out</li>
              <li>Anyone moving from another GHL reseller and wants the floor rate</li>
              <li>Founders who want pure pipes — no curriculum, no community noise</li>
            </ul>
          </div>

          <div class="f-card">
            <div class="f-card__head">What's NOT included</div>
            <h3>This is not the $9 AI Empire Insider tier.</h3>
            <ul class="f-list f-list--strike">
              <li>No courses — Empire OS, Cold Calling, Marketing Engine</li>
              <li>No prompt library, no scripts, no swipe files</li>
              <li>No Starter Kit, no 30-Day Empire Challenge, no Cold-Calling Challenge</li>
              <li>No private community access</li>
              <li>No 1:1 coaching, no DMs, no done-for-you setup</li>
            </ul>
            <p class="f-math__caption" style="margin-top: 22px;">
              Want all of that? It's <strong>$9/mo</strong> on the AI Empire Insider tier — and you can
              stack both. Wholesale + AI Empire Insider = $58/mo total.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ WHY $49 ════════════════════════════════════════════ -->
    <section class="f-section" aria-labelledby="why-h">
      <div class="page-wrap">
        <p class="f-kicker"><span class="bar" aria-hidden="true"></span>Why $49 · Founder's Note</p>
        <h2 id="why-h" class="f-h2">The honest reason it's <span class="gold">half price</span>.</h2>

        <div class="f-why">
          <div class="f-why__num">$49<em>/mo</em></div>
          <div class="f-why__body">
            <p>
              I get the wholesale rate by buying GHL minutes in bulk. I'm passing it through to the
              first 100 operators who lock in.
            </p>
            <p>
              After seat 100 it goes back to $99 because I can't keep eating the margin —
              that's the actual retail. The first 100 stay at $49 forever, even when the door closes.
            </p>
            <p>
              No expiring trial, no annual hike, no <em>"limited intro"</em> nonsense. Lock the seat,
              the seat is yours.
            </p>
            <span class="f-why__sig">Signed — <em>Benji</em> &nbsp;·&nbsp; Built In Public Since 2024</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CLAIM ══════════════════════════════════════════════ -->
    <section class="f-section f-section--alt f-claim" id="claim-form" aria-labelledby="claim-h">
      <div class="page-wrap">
        <div class="f-claim__inner">
          <p class="f-kicker" style="justify-content:center;">
            <span class="bar" aria-hidden="true"></span>Claim · Tier 03 Wholesale<span class="bar" aria-hidden="true"></span>
          </p>
          <h2 id="claim-h" class="f-h2">Lock the rate. <span class="gold">Walk out at $49.</span></h2>
          <p class="f-deck" style="margin-left:auto;margin-right:auto;">
            One checkout, one card, one seat. Cancel any month. Upgrade to Insider any time.
          </p>

          <!-- GHL CHECKOUT PLACEHOLDER -->
          <div class="ghl-checkout-slot" data-ghl-product="wholesale-49" role="region" aria-label="GoHighLevel checkout">
            <div class="ghl-checkout-slot__price">$49<em>/mo</em></div>
            <div class="ghl-checkout-slot__sub">Wholesale GHL · $0.015/min · Locked for life</div>
            <a class="f-btn f-btn--primary" href="https://benjisaiempire.com/checkout/wholesale-49">
              Lock my $49 seat <span class="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <noscript>
            <p style="margin-top:18px;">
              <a class="f-btn f-btn--ghost" href="https://benjisaiempire.com/checkout/wholesale-49">
                Enable JS or click here to claim a seat <span class="arrow" aria-hidden="true">→</span>
              </a>
            </p>
          </noscript>

          <p class="f-claim__note">
            Form wires to GoHighLevel checkout. Stripe processes payment.<br>
            You'll get account credentials within 24h.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══ FAQ ════════════════════════════════════════════════ -->
    <section class="f-section" aria-labelledby="faq-h">
      <div class="page-wrap">
        <p class="f-kicker"><span class="bar" aria-hidden="true"></span>FAQ · The Honest Five</p>
        <h2 id="faq-h" class="f-h2">Five things I'd ask <span class="gold">before</span> I clicked.</h2>

        <div class="f-faq__list">
          <article class="f-faq__item">
            <div class="f-faq__num">Q · 01</div>
            <div>
              <h3 class="f-faq__q">Can I cancel any time?</h3>
              <p class="f-faq__a">
                Yes — month-to-month, cancel from the dashboard, no support ticket required.
                But understand: <strong>once you cancel, the seat releases.</strong> If all 100 are
                claimed, you re-enter at $99/mo. The locked rate is for as long as the subscription
                is active.
              </p>
            </div>
          </article>

          <article class="f-faq__item">
            <div class="f-faq__num">Q · 02</div>
            <div>
              <h3 class="f-faq__q">Can I upgrade to Insider too?</h3>
              <p class="f-faq__a">
                Stack them. <strong>$49 wholesale + $9 AI Empire Insider = $58/mo total</strong> — wholesale
                minutes <em>and</em> every course, prompt, script, challenge, and the community. That's
                the play most operators run.
              </p>
            </div>
          </article>

          <article class="f-faq__item">
            <div class="f-faq__num">Q · 03</div>
            <div>
              <h3 class="f-faq__q">Why is GHL $99 retail and you're charging $49?</h3>
              <p class="f-faq__a">
                Because I'm taking the loss on the first 100 to seed the wholesale program. I need
                volume to keep my agency rate with GoHighLevel. <strong>You give me volume, I give
                you the floor.</strong> After seat 100 it returns to $99 — the actual cost-plus
                number.
              </p>
            </div>
          </article>

          <article class="f-faq__item">
            <div class="f-faq__num">Q · 04</div>
            <div>
              <h3 class="f-faq__q">What if I don't use 5,000 minutes a month?</h3>
              <p class="f-faq__a">
                Then this tier probably isn't your move. <strong>The math only works if you're
                dialing.</strong> Under ~1,200 min/mo, the $39 monthly delta vs Insider eats the
                per-minute savings. Take the $9 AI Empire Insider tier instead — you get the platform plus
                everything else.
              </p>
            </div>
          </article>

          <article class="f-faq__item">
            <div class="f-faq__num">Q · 05</div>
            <div>
              <h3 class="f-faq__q">Is the $49 really locked for life?</h3>
              <p class="f-faq__a">
                Yes — for the seat, not the human. As long as your subscription stays active, the
                rate stays $49. Cancel and the seat goes back into the pool. <strong>I'm not raising
                it on you; I'm not bait-and-switching it.</strong> The whole point of "first 100" is
                that the first 100 keep what they bought.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

  ` }} />
      <Footer />
    </>
  );
}
