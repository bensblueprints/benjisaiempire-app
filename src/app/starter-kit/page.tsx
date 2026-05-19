import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Tier — Watch Me Cold-Call Live · Benji's AI Empire",
  description: "The free tier: every Tuesday cold call live, every Thursday build day live, the full 52-week archive. No email opt-in. The Starter Kit, prompts, scripts, and challenges live in $9 AI Empire Insider.",
  alternates: { canonical: "https://benjisaiempire.com/starter-kit/" },
  openGraph: { title: "Free Tier — Watch Me Cold-Call Live", description: "Tuesday cold call live. Thursday build day live. Full archive. Free.", url: "https://benjisaiempire.com/starter-kit/", images: [{ url: "https://benjisaiempire.com/images/streaming-rig.jpg?v=2" }], type: "website" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  /* PAGE — FREE VIDEOS HUB */
  .page-wrap { max-width: var(--container); margin: 0 auto; padding: 0 clamp(20px, 4vw, 56px); }

  /* HERO */
  .free-hero {
    position: relative;
    padding: clamp(72px, 10vw, 140px) 0 clamp(56px, 8vw, 112px);
    border-bottom: 1px solid var(--line);
    overflow: hidden;
  }
  .free-hero::before {
    content: "";
    position: absolute; inset: 0;
    background-image:
      radial-gradient(rgba(244,236,216,.04) 1px, transparent 1px);
    background-size: 4px 4px;
    pointer-events: none;
    opacity: .5;
  }
  .free-hero__inner { position: relative; display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(40px, 6vw, 88px); align-items: center; }
  .free-hero__eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .32em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 28px;
    display: inline-flex; align-items: center; gap: 14px;
  }
  .free-hero__eyebrow::before {
    content: ""; display: inline-block; width: 32px; height: 1px; background: var(--gold);
  }
  .free-hero__headline {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(46px, 6.4vw, 104px); line-height: .9;
    letter-spacing: -.012em; text-transform: uppercase;
    color: var(--cream); margin: 0 0 28px;
  }
  .free-hero__headline em {
    font-family: 'Fraunces', serif; font-style: italic; font-weight: 400;
    color: var(--gold); text-transform: none; letter-spacing: -.02em;
  }
  .free-hero__lede {
    font-family: 'Fraunces', serif; font-weight: 400;
    font-size: clamp(17px, 1.4vw, 21px); line-height: 1.55;
    color: var(--bone); max-width: 56ch; margin: 0 0 36px;
  }
  .free-hero__cta {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--ink); background: var(--gold);
    padding: 18px 28px; border: 1px solid var(--gold);
    transition: background .2s ease, transform .2s ease;
  }
  .free-hero__cta:hover { background: var(--gold-bright); transform: translateY(-2px); }
  .free-hero__cta::after { content: "→"; font-family: 'Manrope', sans-serif; letter-spacing: 0; }
  .free-hero__media {
    position: relative; aspect-ratio: 4 / 5;
    border: 1px solid var(--line); overflow: hidden;
    background: var(--ink-2);
  }
  .free-hero__media img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.04) saturate(1.05); }
  .free-hero__media::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(11,11,12,.55));
    pointer-events: none;
  }
  .free-hero__caption {
    position: absolute; bottom: 18px; left: 18px; right: 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft); display: flex; justify-content: space-between; gap: 16px;
  }
  .free-hero__caption span:last-child { color: var(--gold); }

  /* THIS WEEK'S LIVES */
  .lives {
    padding: clamp(72px, 9vw, 128px) 0;
    border-bottom: 1px solid var(--line);
  }
  .lives__head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: clamp(40px, 5vw, 72px); flex-wrap: wrap; }
  .lives__title {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(34px, 4.6vw, 72px); line-height: .92;
    letter-spacing: -.01em; text-transform: uppercase; color: var(--cream); margin: 0;
  }
  .lives__title em { font-family: 'Fraunces', serif; font-style: italic; font-weight: 400; color: var(--gold); text-transform: none; }
  .lives__meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft);
  }
  .lives__grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(20px, 2.6vw, 36px); }
  .live-card {
    background: var(--ink-2); border: 1px solid var(--line);
    padding: clamp(22px, 2.6vw, 36px);
    display: flex; flex-direction: column; gap: 22px;
  }
  .live-card__tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .28em; text-transform: uppercase;
    color: var(--gold);
    display: inline-flex; align-items: center; gap: 10px;
  }
  .live-card__tag::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--rust); box-shadow: 0 0 0 4px rgba(196,41,46,.18); }
  .live-card__title {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(26px, 2.4vw, 36px); line-height: 1; text-transform: uppercase;
    color: var(--cream); margin: 0; letter-spacing: -.005em;
  }
  .live-card__when {
    font-family: 'Fraunces', serif; font-style: italic;
    font-size: 16px; line-height: 1.5; color: var(--bone); margin: 0;
  }
  .yt-embed-slot {
    aspect-ratio: 16 / 9; background: var(--ink); border: 1px dashed var(--line);
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace; font-size: 10.5px;
    letter-spacing: .26em; text-transform: uppercase; color: var(--cream-soft);
    position: relative;
  }
  .yt-embed-slot::before {
    content: "▶"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -130%);
    color: var(--gold); font-size: 28px; letter-spacing: 0;
  }
  .yt-embed-slot::after { content: "Live embed wires here"; }
  .live-card__caption {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .22em; text-transform: uppercase;
    color: var(--cream-soft); margin: 0;
  }

  /* ARCHIVE */
  .archive {
    padding: clamp(72px, 9vw, 128px) 0;
    border-bottom: 1px solid var(--line);
    display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(40px, 6vw, 96px);
    align-items: center;
  }
  .archive__num {
    font-family: 'Anton', sans-serif;
    font-size: clamp(120px, 18vw, 280px); line-height: .85;
    color: var(--gold); margin: 0; letter-spacing: -.03em;
  }
  .archive__sub {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--cream-soft); display: block; margin-top: 14px;
  }
  .archive__copy { display: flex; flex-direction: column; gap: 26px; }
  .archive__title {
    font-family: 'Anton', sans-serif;
    font-size: clamp(30px, 3.6vw, 56px); line-height: .95;
    text-transform: uppercase; color: var(--cream); margin: 0;
  }
  .archive__title em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); text-transform: none; }
  .archive__body {
    font-family: 'Fraunces', serif; font-size: 18px; line-height: 1.6; color: var(--bone);
    max-width: 52ch; margin: 0;
  }
  .archive__btn {
    align-self: flex-start;
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream); padding: 16px 24px;
    border: 1px solid var(--line);
    transition: border-color .2s ease, color .2s ease;
  }
  .archive__btn:hover { border-color: var(--gold); color: var(--gold-bright); }
  .archive__btn::after { content: "→"; font-family: 'Manrope', sans-serif; letter-spacing: 0; }

  /* WHAT'S NOT FREE — pull-quote */
  .notfree {
    padding: clamp(80px, 10vw, 144px) 0;
    border-bottom: 1px solid var(--line);
    text-align: center;
  }
  .notfree__rail {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 32px;
    display: inline-flex; align-items: center; gap: 16px;
  }
  .notfree__rail::before, .notfree__rail::after { content: ""; width: 36px; height: 1px; background: var(--gold); opacity: .5; }
  .notfree__quote {
    font-family: 'Fraunces', serif; font-weight: 400; font-style: italic;
    font-size: clamp(24px, 3.2vw, 44px); line-height: 1.25;
    color: var(--cream); max-width: 26ch; margin: 0 auto;
  }
  .notfree__quote em { color: var(--gold); font-style: italic; }
  .notfree__sig {
    margin-top: 36px; font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--cream-soft);
  }

  /* UPGRADE CTA */
  .upgrade {
    padding: clamp(80px, 10vw, 144px) 0;
    background: linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%);
    text-align: center;
  }
  .upgrade__eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .32em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 24px;
  }
  .upgrade__title {
    font-family: 'Anton', sans-serif;
    font-size: clamp(48px, 7vw, 112px); line-height: .9;
    text-transform: uppercase; color: var(--cream); margin: 0 0 32px;
    letter-spacing: -.012em;
  }
  .upgrade__title em { font-family: 'Fraunces', serif; font-style: italic; color: var(--gold); text-transform: none; }
  .upgrade__sub {
    font-family: 'Fraunces', serif; font-style: italic; font-size: 19px;
    color: var(--bone); max-width: 50ch; margin: 0 auto 40px; line-height: 1.5;
  }
  .upgrade__primary {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--ink); background: var(--gold);
    padding: 22px 36px; border: 1px solid var(--gold);
    transition: background .2s ease, transform .2s ease;
  }
  .upgrade__primary:hover { background: var(--gold-bright); transform: translateY(-2px); }
  .upgrade__primary::after { content: "→"; font-family: 'Manrope', sans-serif; letter-spacing: 0; }
  .upgrade__cross {
    display: block; margin-top: 26px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft); transition: color .2s ease;
  }
  .upgrade__cross:hover { color: var(--gold-bright); }
  .upgrade__cross::after { content: " →"; }

  @media (max-width: 880px) {
    .free-hero__inner { grid-template-columns: 1fr; }
    .free-hero__media { aspect-ratio: 4 / 3; order: -1; }
    .lives__grid { grid-template-columns: 1fr; }
    .archive { grid-template-columns: 1fr; text-align: left; }
  }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

  <!-- 1. HERO -->
  <section class="free-hero">
    <div class="page-wrap free-hero__inner">
      <div class="free-hero__copy">
        <div class="free-hero__eyebrow">Tier 01 / Free</div>
        <h1 class="free-hero__headline">Watch me cold-call <em>live.</em> Free.</h1>
        <p class="free-hero__lede">
          Tuesday Cold Call Live. Thursday Build Day Live. The full archive. No email opt-in,
          no PDFs, no scripts — just the videos. Everything else (the Starter Kit PDF, the
          prompts, the scripts) is $9 AI Empire Insider.
        </p>
        <a class="free-hero__cta" href="https://www.youtube.com/@benjiboyce" target="_blank" rel="noopener">Open the YouTube channel</a>
      </div>
      <figure class="free-hero__media">
        <img src="/images/streaming-rig.jpg?v=2" alt="The streaming rig where every Tuesday cold call and Thursday build day goes live." loading="eager" />
        <figcaption class="free-hero__caption">
          <span>Live Rig — Build Floor</span><span>On Air Tue · Thu</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <!-- 2. THIS WEEK'S LIVES -->
  <section class="lives">
    <div class="page-wrap">
      <div class="lives__head">
        <h2 class="lives__title">This week's <em>lives.</em></h2>
        <span class="lives__meta">Auto-updates · YouTube</span>
      </div>
      <div class="lives__grid">

        <article class="live-card">
          <span class="live-card__tag">Tuesday Cold Call Live</span>
          <h3 class="live-card__title">100 dials in front of you.</h3>
          <p class="live-card__when">Every Tuesday, 11am MT. The script, the script being broken, the bookings — all of it.</p>
          <div class="yt-embed-slot" data-yt-channel="benjiboyce" data-show="tuesday" aria-label="Tuesday Cold Call Live YouTube embed slot"></div>
          <noscript><a href="https://www.youtube.com/@benjiboyce" target="_blank" rel="noopener">Watch on YouTube</a></noscript>
          <p class="live-card__caption">Embed wires to YouTube live URL. Auto-updates each week.</p>
        </article>

        <article class="live-card">
          <span class="live-card__tag">Thursday Build Day Live</span>
          <h3 class="live-card__title">Ship a real client site.</h3>
          <p class="live-card__when">Every Thursday, 11am MT. Claude Code, GHL plumbing, deploy — open kimono.</p>
          <div class="yt-embed-slot" data-yt-channel="benjiboyce" data-show="thursday" aria-label="Thursday Build Day Live YouTube embed slot"></div>
          <noscript><a href="https://www.youtube.com/@benjiboyce" target="_blank" rel="noopener">Watch on YouTube</a></noscript>
          <p class="live-card__caption">Embed wires to YouTube live URL. Auto-updates each week.</p>
        </article>

      </div>
    </div>
  </section>

  <!-- 3. THE ARCHIVE -->
  <section class="archive">
    <div class="page-wrap" style="display:contents;">
      <div class="page-wrap" style="grid-column: 1 / 2; padding-left: clamp(20px,4vw,56px);">
        <p class="archive__num">52<span class="archive__sub">Weeks · And Counting</span></p>
      </div>
      <div class="archive__copy" style="grid-column: 2 / 3; padding-right: clamp(20px,4vw,56px);">
        <h2 class="archive__title">The whole <em>archive,</em> in one playlist.</h2>
        <p class="archive__body">
          Every Tuesday cold call I've ever streamed. Every Thursday build day. The wins,
          the no-shows, the technical breakdowns I forgot to edit out. Free, on the channel,
          no signup wall.
        </p>
        <a class="archive__btn" href="https://www.youtube.com/@benjiboyce/playlists" target="_blank" rel="noopener">Browse the archive on YouTube</a>
      </div>
    </div>
  </section>

  <!-- 4. WHAT'S NOT FREE -->
  <section class="notfree">
    <div class="page-wrap">
      <div class="notfree__rail">What's not free</div>
      <p class="notfree__quote">
        “The Starter Kit PDF, every prompt, every script, the 30-day challenges — they all
        moved to the <em>$9 AI Empire Insider</em> tier. Why? Because I want serious operators, and
        nine dollars is the smallest filter that keeps tire-kickers out without making it
        inaccessible.”
      </p>
      <p class="notfree__sig">— Benji · Operator's Note</p>
    </div>
  </section>

  <!-- 5. UPGRADE CTA -->
  <section class="upgrade">
    <div class="page-wrap">
      <div class="upgrade__eyebrow">When you're ready</div>
      <h2 class="upgrade__title">Want <em>everything</em> else?</h2>
      <p class="upgrade__sub">
        Four courses, every prompt, every script, the Starter Kit PDF, both 30-day
        challenges, the community, GHL @ $0.04/min — one bucket, one price.
      </p>
      <a class="upgrade__primary" href="/insider/">Join AI Empire Insider — $9/mo</a>
      <a class="upgrade__cross" href="/founders/">Or grab wholesale GHL for $49/mo</a>
    </div>
  </section>

` }} />
      <Footer />
    </>
  );
}
