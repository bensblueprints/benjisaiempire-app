import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "You're Locked In — Wholesale GHL · Benji's AI Empire",
  description: "Your $49/mo wholesale GoHighLevel seat is confirmed. Credentials within 24 hours. Welcome to wholesale-rate minutes for life.",
  alternates: { canonical: "https://benjisaiempire.com/founders/welcome.html" },
  robots: { index: false, follow: true },
  openGraph: { title: "You're locked in — Wholesale GHL", description: "Seat confirmed. Credentials within 24h. $49/mo locked for life.", url: "https://benjisaiempire.com/founders/welcome.html", images: [{ url: "https://benjisaiempire.com/images/hero-empire.jpg" }], type: "website" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  .page-wrap { max-width: var(--container); margin: 0 auto; padding: 0 clamp(20px, 4vw, 56px); }

  /* ── HERO ───────────────────────────────────────────────────── */
  .w-hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: clamp(80px, 11vw, 160px) 0 clamp(56px, 7vw, 96px);
    background: linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%);
    border-bottom: 1px solid var(--line);
  }
  .w-hero::before {
    content:""; position:absolute; inset:0;
    background-image:
      radial-gradient(rgba(244,236,216,.045) 1px, transparent 1px),
      radial-gradient(rgba(11,11,12,.06) 1px, transparent 1px);
    background-size: 3px 3px, 5px 5px;
    background-position: 0 0, 1px 2px;
    mix-blend-mode: overlay; opacity: .5;
    pointer-events:none; z-index: 1;
  }
  .w-hero::after {
    content:""; position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent);
    opacity: .55;
  }
  .w-hero__inner { position: relative; z-index: 2; }

  .w-stamp {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 28px;
    padding: 8px 14px;
    border: 1px solid var(--gold);
    background: rgba(212,175,55,.06);
    border-radius: 2px;
  }
  .w-stamp .check {
    display: inline-flex; align-items: center; justify-content: center;
    width: 16px; height: 16px; border-radius: 50%;
    background: var(--gold); color: var(--ink);
    font-family: 'Manrope', sans-serif; font-size: 11px; font-weight: 700;
  }

  .w-hero h1 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(48px, 8vw, 132px);
    line-height: .9; letter-spacing: -.012em;
    text-transform: uppercase;
    color: var(--cream);
    margin: 0;
    max-width: 14ch;
  }
  .w-hero h1 .gold { color: var(--gold); }
  .w-hero h1 .amp {
    font-family: 'Fraunces', serif; font-style: italic; font-weight: 300;
    text-transform: lowercase;
    color: var(--gold-bright);
    padding: 0 .04em;
  }
  .w-hero__lede {
    margin-top: 32px;
    max-width: 56ch;
    font-family: 'Fraunces', serif;
    font-style: italic; font-weight: 400;
    font-size: clamp(18px, 1.5vw, 22px);
    line-height: 1.55;
    color: var(--cream);
  }
  .w-hero__lede strong { color: var(--gold-bright); font-weight: 500; }

  .w-hero__meta {
    margin-top: 40px;
    display: flex; flex-wrap: wrap; gap: clamp(20px, 3vw, 48px);
    padding-top: 28px;
    border-top: 1px solid var(--line);
  }
  .w-meta {
    display: flex; flex-direction: column; gap: 4px;
    font-family: 'JetBrains Mono', monospace;
  }
  .w-meta__k {
    font-size: 9.5px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--cream-soft);
  }
  .w-meta__v {
    font-family: 'Anton', sans-serif;
    font-size: clamp(20px, 1.8vw, 26px);
    color: var(--cream); line-height: 1;
  }
  .w-meta__v em {
    font-family: 'Fraunces', serif; font-style: italic; font-weight: 300; color: var(--gold);
  }

  /* ── NEXT STEPS ─────────────────────────────────────────────── */
  .w-section { padding: clamp(72px, 9vw, 120px) 0; }
  .w-section--alt { background: var(--ink-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .w-kicker {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .32em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 22px;
  }
  .w-kicker .bar { display:inline-block; width: 42px; height: 1px; background: var(--gold); opacity:.7; }
  .w-h2 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(34px, 4.2vw, 60px);
    line-height: .94; text-transform: uppercase;
    color: var(--cream);
    margin: 0 0 48px;
    max-width: 22ch;
  }
  .w-h2 .gold { color: var(--gold); }

  .w-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(24px, 3vw, 48px);
    counter-reset: step;
  }
  @media (max-width: 860px) { .w-steps { grid-template-columns: 1fr; } }

  .w-step {
    border: 1px solid var(--line);
    padding: clamp(28px, 3vw, 40px);
    background: rgba(244,236,216,.02);
    position: relative;
    counter-increment: step;
  }
  .w-step__num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--line);
  }
  .w-step__num::before {
    content: "Step " counter(step, decimal-leading-zero);
  }
  .w-step h3 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(22px, 2vw, 28px);
    line-height: 1.05;
    text-transform: uppercase;
    color: var(--cream);
    margin: 0 0 14px;
  }
  .w-step p {
    font-family: 'Manrope', sans-serif;
    font-size: 15px; line-height: 1.6;
    color: var(--bone);
    margin: 0;
  }
  .w-step p strong { color: var(--gold-bright); font-weight: 600; }
  .w-step__when {
    display: inline-block;
    margin-top: 18px;
    padding: 6px 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream);
    border: 1px solid var(--line);
    border-radius: 2px;
  }
  .w-step__when em { font-style: normal; color: var(--gold); }

  /* ── SUPPORT ─────────────────────────────────────────────────── */
  .w-support {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(28px, 4vw, 64px);
    align-items: center;
  }
  @media (max-width: 800px) { .w-support { grid-template-columns: 1fr; } }

  .w-support__card {
    border: 1px solid var(--line);
    padding: clamp(28px, 3vw, 44px);
    background: rgba(244,236,216,.02);
  }
  .w-support__card h3 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(22px, 2vw, 28px);
    line-height: 1.05; text-transform: uppercase;
    color: var(--cream);
    margin: 0 0 14px;
  }
  .w-support__card p {
    font-family: 'Manrope', sans-serif;
    font-size: 15px; line-height: 1.6;
    color: var(--bone); margin: 0 0 22px;
  }
  .w-support__link {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: .2em; text-transform: uppercase;
    color: var(--gold);
    text-decoration: none;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--gold);
    transition: color .2s ease, border-color .2s ease;
  }
  .w-support__link:hover { color: var(--gold-bright); border-color: var(--gold-bright); }

  /* ── CROSS-SELL ─────────────────────────────────────────────── */
  .w-xsell {
    position: relative;
    overflow: hidden;
    padding: clamp(72px, 9vw, 120px) 0;
    background: var(--ink);
    border-top: 1px solid var(--line);
  }
  .w-xsell__bg {
    position: absolute; inset: 0;
    background-image: url('/images/headshot-mural.jpg');
    background-size: cover; background-position: center 30%;
    opacity: .14; filter: grayscale(.4) contrast(1.1);
  }
  .w-xsell__bg::after {
    content:""; position: absolute; inset: 0;
    background: linear-gradient(90deg, var(--ink) 0%, rgba(11,11,12,.6) 60%, transparent 100%);
  }
  .w-xsell__inner {
    position: relative; z-index: 2;
    max-width: 60ch;
  }
  .w-xsell h2 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(34px, 4.5vw, 64px);
    line-height: .94; text-transform: uppercase;
    color: var(--cream);
    margin: 0 0 22px;
  }
  .w-xsell h2 .gold { color: var(--gold); }
  .w-xsell p {
    font-family: 'Fraunces', serif;
    font-style: italic; font-weight: 400;
    font-size: clamp(17px, 1.4vw, 20px);
    line-height: 1.55;
    color: var(--bone);
    max-width: 52ch;
    margin: 0 0 28px;
  }

  .w-btn {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 16px 26px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11.5px; letter-spacing: .2em; text-transform: uppercase;
    text-decoration: none; border-radius: 2px;
    border: 1px solid transparent;
    transition: transform .3s var(--ease), background .25s ease, border-color .25s ease, color .25s ease;
  }
  .w-btn .arrow { transition: transform .3s var(--ease); }
  .w-btn:hover .arrow { transform: translateX(4px); }
  .w-btn--primary {
    background: var(--gold); color: var(--ink); font-weight: 700;
    box-shadow: 0 10px 30px -12px rgba(212,175,55,.55);
  }
  .w-btn--primary:hover { background: var(--gold-bright); transform: translateY(-1px); }
` }} />
      {/* @ts-expect-error Async Server Component */}
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

    <!-- ═══ HERO ═══════════════════════════════════════════════ -->
    <section class="w-hero" aria-labelledby="welcome-h">
      <div class="page-wrap w-hero__inner">
        <span class="w-stamp" role="status">
          <span class="check" aria-hidden="true">✓</span>
          Tier 03 · Wholesale Seat Confirmed
        </span>

        <h1 id="welcome-h">
          You're <span class="gold">locked</span> <br>
          in.
        </h1>

        <p class="w-hero__lede">
          Your wholesale GoHighLevel account is being provisioned right now. Credentials will hit
          your inbox within <strong>24 hours.</strong> The seat is yours — $0.015 a minute,
          <strong>$49 a month, locked for life.</strong> No upsells in this email. No surprises on
          your card.
        </p>

        <div class="w-hero__meta">
          <div class="w-meta">
            <span class="w-meta__k">Your Tier</span>
            <span class="w-meta__v">Wholesale <em>03</em></span>
          </div>
          <div class="w-meta">
            <span class="w-meta__k">Locked Rate</span>
            <span class="w-meta__v">$49 <em>/ mo</em></span>
          </div>
          <div class="w-meta">
            <span class="w-meta__k">Per Minute</span>
            <span class="w-meta__v">$0.015 <em>wholesale</em></span>
          </div>
          <div class="w-meta">
            <span class="w-meta__k">Provisioning</span>
            <span class="w-meta__v">~24h <em>now</em></span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ WHAT HAPPENS NEXT ══════════════════════════════════ -->
    <section class="w-section w-section--alt" aria-labelledby="next-h">
      <div class="page-wrap">
        <p class="w-kicker"><span class="bar" aria-hidden="true"></span>What Happens Next · 24-Hour Window</p>
        <h2 id="next-h" class="w-h2">Three things land — <span class="gold">in this order</span>.</h2>

        <ol class="w-steps">
          <li class="w-step">
            <div class="w-step__num"></div>
            <h3>Credentials email</h3>
            <p>
              Your GHL sub-account login + temp password ships to the email you checked out with.
              Comes from <strong>support@benjisaiempire.com</strong> — whitelist it. If it's not in
              your inbox in 24h, check spam, then ping support.
            </p>
            <span class="w-step__when">In <em>≤ 24h</em></span>
          </li>

          <li class="w-step">
            <div class="w-step__num"></div>
            <h3>Onboarding call</h3>
            <p>
              A short 15-minute walk-through of the sub-account: where to find your wholesale rate,
              how to connect Twilio, where minutes meter, and how to add team seats. <strong>Optional —
              skip if you already know GHL.</strong>
            </p>
            <span class="w-step__when">Within <em>72h</em></span>
          </li>

          <li class="w-step">
            <div class="w-step__num"></div>
            <h3>First sub-account login</h3>
            <p>
              You log in, change the temp password, point your number, and start dialing at the
              wholesale rate. <strong>Day-one math: $0.015/min.</strong> No further action from us
              required.
            </p>
            <span class="w-step__when">When <em>you're ready</em></span>
          </li>
        </ol>
      </div>
    </section>

    <!-- ═══ SUPPORT ════════════════════════════════════════════ -->
    <section class="w-section" aria-labelledby="support-h">
      <div class="page-wrap">
        <p class="w-kicker"><span class="bar" aria-hidden="true"></span>Support · Real People, Real Fast</p>
        <h2 id="support-h" class="w-h2">Stuck? <span class="gold">Don't sit on it.</span></h2>

        <div class="w-support">
          <div class="w-support__card">
            <h3>Direct support</h3>
            <p>
              Provisioning issues, login trouble, billing questions — email goes straight to the
              team. Expect a reply inside one business day. Faster if you include your order number.
            </p>
            <a class="w-support__link" href="mailto:support@benjisaiempire.com">
              support@benjisaiempire.com →
            </a>
          </div>

          <div class="w-support__card">
            <h3>Operator community</h3>
            <p>
              Wholesale seats include read access to the public build-day archive. Want full
              community + every course, prompt, and script? Add Insider for $10/mo (see below).
            </p>
            <a class="w-support__link" href="/community">
              Open the community →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CROSS-SELL ═════════════════════════════════════════ -->
    <section class="w-xsell" aria-labelledby="xsell-h">
      <div class="w-xsell__bg" aria-hidden="true"></div>
      <div class="page-wrap">
        <div class="w-xsell__inner">
          <p class="w-kicker"><span class="bar" aria-hidden="true"></span>Stack The Tiers · One More Card-Charge</p>
          <h2 id="xsell-h">
            Want the <span class="gold">courses</span> too?
          </h2>
          <p>
            Wholesale is pure software. Insider is everything else — every course, every prompt,
            every script, the Starter Kit, the 30-Day Empire Challenge, the 30-Day Cold Calling
            Challenge, and the private community. Add it for ten bucks and you're at $59/mo total.
          </p>
          <a class="w-btn w-btn--primary" href="/insider/">
            Add Insider for $10/mo <span class="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>

  ` }} />
      <Footer />
    </>
  );
}
