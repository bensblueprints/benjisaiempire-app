import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Thanks — Free Tier · Benji's AI Empire",
  description: "Thanks for coming through. The free videos live at /starter-kit/. Hit the YouTube channel for the full archive. The $9 AI Empire Insider bucket is one click away.",
  alternates: { canonical: "https://benjisaiempire.com/starter-kit/thank-you" },
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
  .lite-hero__inner { position: relative; max-width: 820px; }
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
    font-size: clamp(56px, 9vw, 144px); line-height: .88;
    letter-spacing: -.018em; text-transform: uppercase;
    color: var(--cream); margin: 0 0 32px;
  }
  .lite-hero__title em {
    font-family: 'Fraunces', serif; font-style: italic;
    color: var(--gold); text-transform: none;
  }
  .lite-hero__lede {
    font-family: 'Fraunces', serif; font-size: clamp(18px, 1.6vw, 22px);
    line-height: 1.55; color: var(--bone); margin: 0 auto 40px; max-width: 56ch;
  }
  .lite-hero__ctas {
    display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
  }
  .btn-gold, .btn-ghost {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: .26em; text-transform: uppercase;
    padding: 16px 26px; border: 1px solid;
    transition: background .2s ease, border-color .2s ease, color .2s ease, transform .2s ease;
  }
  .btn-gold { color: var(--ink); background: var(--gold); border-color: var(--gold); }
  .btn-gold:hover { background: var(--gold-bright); transform: translateY(-2px); }
  .btn-gold::after { content: "→"; font-family: 'Manrope', sans-serif; letter-spacing: 0; }
  .btn-ghost { color: var(--cream); background: transparent; border-color: var(--line); }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold-bright); }
  .btn-ghost::after { content: "→"; font-family: 'Manrope', sans-serif; letter-spacing: 0; }
  .lite-hero__cross {
    display: block; margin-top: 28px;
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
      <h1 class="lite-hero__title"><em>Thanks</em> for coming through.</h1>
      <p class="lite-hero__lede">
        The free videos live at <strong style="color:var(--cream);">/starter-kit/</strong>.
        Hit the YouTube channel for the full archive. The <strong style="color:var(--gold);">$9 AI Empire Insider</strong>
        bucket — every course, every prompt, every script — is one click away.
      </p>
      <div class="lite-hero__ctas">
        <a class="btn-gold" href="/insider/">Join AI Empire Insider — $9/mo</a>
        <a class="btn-ghost" href="https://www.youtube.com/@benjiboyce" target="_blank" rel="noopener">Open the YouTube channel</a>
      </div>
      <a class="lite-hero__cross" href="/starter-kit/">Back to the free videos hub</a>
    </div>
  </section>
` }} />
      <Footer />
    </>
  );
}
