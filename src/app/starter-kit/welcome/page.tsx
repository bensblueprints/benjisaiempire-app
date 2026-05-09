import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Welcome — Free Tier · Benji's AI Empire",
  description: "You're in the free tier. The videos live at /starter-kit/. Want everything else? $10 Insider.",
  alternates: { canonical: "https://benjisaiempire.com/starter-kit/welcome" },
  robots: { index: false, follow: true }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  .lite-hero {
    min-height: calc(100vh - 80px);
    display: grid; place-items: center;
    padding: clamp(48px, 8vw, 120px) clamp(20px, 4vw, 56px);
    text-align: center;
    background:
      radial-gradient(ellipse at 50% 30%, rgba(212,175,55,.08) 0%, transparent 60%),
      var(--ink);
    position: relative;
  }
  .lite-hero::before {
    content: ""; position: absolute; inset: 0;
    background-image: radial-gradient(rgba(244,236,216,.04) 1px, transparent 1px);
    background-size: 4px 4px; pointer-events: none; opacity: .6;
  }
  .lite-hero__inner { position: relative; max-width: 780px; }
  .lite-hero__eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .32em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 32px;
    display: inline-flex; align-items: center; gap: 14px;
  }
  .lite-hero__eyebrow::before, .lite-hero__eyebrow::after {
    content: ""; width: 28px; height: 1px; background: var(--gold); opacity: .55;
  }
  .lite-hero__title {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(64px, 11vw, 168px); line-height: .88;
    letter-spacing: -.018em; text-transform: uppercase;
    color: var(--cream); margin: 0 0 32px;
  }
  .lite-hero__title em {
    font-family: 'Fraunces', serif; font-style: italic;
    color: var(--gold); text-transform: none;
  }
  .lite-hero__lede {
    font-family: 'Fraunces', serif; font-size: clamp(18px, 1.6vw, 22px);
    line-height: 1.55; color: var(--bone); margin: 0 auto 44px; max-width: 52ch;
  }
  .lite-hero__cta {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--ink); background: var(--gold);
    padding: 18px 28px; border: 1px solid var(--gold);
    transition: background .2s ease, transform .2s ease;
  }
  .lite-hero__cta:hover { background: var(--gold-bright); transform: translateY(-2px); }
  .lite-hero__cta::after { content: "→"; font-family: 'Manrope', sans-serif; letter-spacing: 0; }
  .lite-hero__cross {
    display: block; margin-top: 26px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft); transition: color .2s ease;
  }
  .lite-hero__cross:hover { color: var(--gold-bright); }
  .lite-hero__cross::after { content: " →"; }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `
  <section class="lite-hero">
    <div class="lite-hero__inner">
      <div class="lite-hero__eyebrow">Tier 01 / Free</div>
      <h1 class="lite-hero__title"><em>Welcome.</em></h1>
      <p class="lite-hero__lede">
        You're in the free tier. The videos are at <strong style="color:var(--cream);">/starter-kit/</strong>.
        Want everything else? <strong style="color:var(--gold);">$10 Insider →</strong>
      </p>
      <a class="lite-hero__cta" href="/insider/">Join Insider — $10/mo</a>
      <a class="lite-hero__cross" href="/starter-kit/">Or stay in free tier · watch the videos</a>
    </div>
  </section>
` }} />
      <Footer />
    </>
  );
}
