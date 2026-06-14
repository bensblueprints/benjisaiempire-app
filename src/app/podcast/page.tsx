import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Podcast — Up For AI Debate | Benji's AI Empire",
  description:
    "Up For AI Debate — the Benji's AI Empire podcast. Cold calls, AI businesses, and the operator stack, argued out loud. Stream every episode.",
  alternates: { canonical: "https://benjisaiempire.com/podcast/" },
  openGraph: {
    title: "Up For AI Debate — The Podcast",
    description:
      "The Benji's AI Empire podcast. Cold calls, AI businesses, and the operator stack — argued out loud.",
    url: "https://benjisaiempire.com/podcast/",
    images: [{ url: "https://benjisaiempire.com/images/hero-empire.jpg?v=2" }],
    type: "website",
  },
};

const PLAYER_EMBED = `<iframe title="Up For AI Debate" allowtransparency="true" height="315" width="100%" style="border: none; min-width: min(100%, 430px);height:315px;" scrolling="no" data-name="pb-iframe-player" src="https://www.podbean.com/player-v2/?i=a49c4-15625fe-pbblog-playlist&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&order=episodic&limit=10&filter=all&ss=a713390a017602015775e868a2cf26b0&btn-skin=7&size=315" loading="lazy" allowfullscreen=""></iframe>`;

export default function Page() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  main { display:block; }

  /* HERO */
  .pod-hero{
    position:relative;
    padding: clamp(80px, 10vw, 160px) clamp(20px, 4vw, 64px) clamp(48px, 6vw, 88px);
    background:
      radial-gradient(1200px 600px at 80% -10%, rgba(212,175,55,.08), transparent 60%),
      var(--ink);
    border-bottom:1px solid var(--line);
    overflow:hidden; isolation:isolate;
  }
  .pod-hero::before{
    content:""; position:absolute; inset:0;
    background-image: linear-gradient(to right, var(--line) 1px, transparent 1px);
    background-size: calc(100% / 12) 100%;
    opacity:.30;
    mask-image: linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%);
    pointer-events:none; z-index:0;
  }
  .pod-hero__inner{
    position:relative; max-width:1480px; margin:0 auto;
    display:grid; grid-template-columns:1fr; gap:clamp(28px, 4vw, 56px); z-index:1;
  }
  @media (min-width:1000px){
    .pod-hero__inner{ grid-template-columns: 1.05fr 1fr; align-items:end; gap:80px; }
  }
  .pod-hero__rail{
    display:flex; align-items:center; gap:14px;
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.28em; text-transform:uppercase;
    color:var(--cream); margin-bottom:22px;
  }
  .pod-hero__rail .num{ color:var(--gold); }
  .pod-hero__rail .bar{ flex:0 0 56px; height:2px; background:var(--gold); }
  .pod-hero__rail .meta{ color:var(--cream-soft); margin-left:auto; }
  .pod-hero__display{
    font-family:'Anton', sans-serif; font-weight:400;
    font-size:clamp(56px, 10vw, 168px);
    line-height:.86; letter-spacing:-.012em;
    text-transform:uppercase; color:var(--cream); margin:0;
  }
  .pod-hero__display .accent{ color:var(--gold); }
  .pod-hero__display .outline{ color:transparent; -webkit-text-stroke:1.5px var(--cream); }
  .pod-hero__lede{
    font-family:'Fraunces', serif; font-weight:400; font-style:italic;
    font-size:clamp(18px, 1.6vw, 24px); line-height:1.5;
    color:var(--cream-soft); max-width:50ch; margin:0;
  }
  .pod-hero__lede em{ font-style:normal; color:var(--gold-bright); }
  .pod-hero__metarow{
    grid-column: 1 / -1; margin-top:36px; padding-top:24px;
    border-top:1px solid var(--line);
    display:flex; flex-wrap:wrap; gap:24px 56px;
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.18em; text-transform:uppercase;
    color:var(--cream-soft);
  }
  .pod-hero__metarow strong{ color:var(--cream); font-weight:600; margin-right:8px; }

  /* PLAYER */
  .pod-player-section{
    background:var(--ink);
    padding: clamp(48px, 7vw, 104px) clamp(20px, 4vw, 64px);
    border-bottom:1px solid var(--line);
  }
  .pod-player-section__inner{ max-width:1080px; margin:0 auto; }
  .pod-player-head{
    display:flex; align-items:baseline; justify-content:space-between;
    flex-wrap:wrap; gap:12px;
    padding-bottom:20px; margin-bottom:28px;
    border-bottom:1px solid var(--line);
  }
  .pod-player-head__title{
    font-family:'Anton', sans-serif; font-weight:400; text-transform:uppercase;
    font-size:clamp(26px, 3vw, 44px); line-height:.95; letter-spacing:-.005em;
    color:var(--cream); margin:0;
  }
  .pod-player-head__count{
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--gold);
  }
  .pod-player{
    border:1px solid var(--line);
    background: var(--ink-2);
    border-radius:2px; padding: clamp(14px, 1.6vw, 22px);
  }
  .pod-player iframe{ display:block; border-radius:2px; }

  /* SUBSCRIBE NOTE */
  .pod-note{
    background:var(--ink);
    padding: clamp(56px, 7vw, 96px) clamp(20px, 4vw, 64px);
    border-bottom:1px solid var(--line);
  }
  .pod-note__inner{
    max-width:980px; margin:0 auto;
    border:1px solid var(--line);
    background: linear-gradient(180deg, rgba(212,175,55,.06), transparent);
    padding: clamp(28px, 4vw, 56px);
    border-radius:2px; display:grid; gap:18px;
  }
  .pod-note__eyebrow{
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold);
  }
  .pod-note__title{
    font-family:'Anton', sans-serif; font-weight:400;
    font-size:clamp(28px, 3.6vw, 52px); line-height:.95; letter-spacing:-.005em;
    text-transform:uppercase; color:var(--cream); margin:0;
  }
  .pod-note__copy{
    font-family:'Fraunces', serif; font-weight:400; font-style:italic;
    font-size:clamp(16px, 1.2vw, 19px); line-height:1.55;
    color:var(--cream-soft); max-width:62ch; margin:0;
  }
  .pod-note__copy em{ color:var(--gold-bright); font-style:normal; }
  .pod-note__cta{
    margin-top:8px; display:inline-flex; align-items:center; gap:10px; align-self:start;
    padding:14px 22px; background:var(--gold); color:var(--ink);
    font-family:'JetBrains Mono', monospace;
    font-size:11px; letter-spacing:.24em; text-transform:uppercase;
    border:1px solid var(--gold);
    transition: background .2s ease, transform .2s ease;
  }
  .pod-note__cta::after{ content:"→"; font-family:'Manrope', sans-serif; letter-spacing:0; }
  .pod-note__cta:hover{ background:var(--gold-bright); transform:translateX(3px); }
`,
        }}
      />

      <Topbar />

      <main id="main">
        {/* HERO */}
        <section className="pod-hero" aria-label="Podcast hero">
          <div className="pod-hero__inner">
            <div>
              <div className="pod-hero__rail">
                <span className="num">FILE 07</span>
                <span className="bar" aria-hidden="true" />
                <span>The Podcast</span>
                <span className="meta">On Air</span>
              </div>
              <h1 className="pod-hero__display">
                Up For <span className="accent">AI</span>
                <br />
                <span className="outline">Debate.</span>
              </h1>
            </div>
            <p className="pod-hero__lede">
              The operator&apos;s podcast. Cold calls, AI businesses, and the stack I
              actually run — <em>argued out loud</em>, no script, no edits to make me
              sound smarter than I am.
            </p>
            <div className="pod-hero__metarow">
              <span>
                <strong>Weekly</strong> dispatch
              </span>
              <span>
                <strong>Built</strong> in public
              </span>
              <span>
                <strong>Unedited</strong> takes
              </span>
              <span>
                <strong>Stream</strong> below
              </span>
            </div>
          </div>
        </section>

        {/* PLAYER */}
        <section className="pod-player-section" aria-label="Listen — Up For AI Debate">
          <div className="pod-player-section__inner">
            <div className="pod-player-head">
              <h2 className="pod-player-head__title">Latest Episodes</h2>
              <span className="pod-player-head__count">Up For AI Debate · Podbean</span>
            </div>
            <div
              className="pod-player"
              dangerouslySetInnerHTML={{ __html: PLAYER_EMBED }}
            />
          </div>
        </section>

        {/* SUBSCRIBE NOTE */}
        <section className="pod-note" aria-label="Subscribe">
          <div className="pod-note__inner">
            <span className="pod-note__eyebrow">Never miss an episode</span>
            <h2 className="pod-note__title">Hit play. Then come build.</h2>
            <p className="pod-note__copy">
              New episodes drop alongside the Tuesday cold calls and Thursday build
              days. If the show resonates, <em>the whole playbook is $9/mo</em> — every
              course, every prompt, GoHighLevel included.
            </p>
            <a className="pod-note__cta" href="/insider/">
              Join AI Empire Insider — $9/mo
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
