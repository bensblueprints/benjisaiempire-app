import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import CalendlyWidget from "./CalendlyWidget";

export const metadata: Metadata = {
  title: "Free Website for Your Business · Benji's AI Empire",
  description: "Get a fast, conversion-focused website built for your local business — no upfront cost. Book a free 15-minute consultation.",
  alternates: { canonical: "https://benjisaiempire.com/free-webdesign/" },
  openGraph: {
    title: "Free Website for Your Business",
    description: "No upfront cost. Done in 7 days. Book a free 15-minute consultation.",
    url: "https://benjisaiempire.com/free-webdesign/",
    images: [{ url: "https://benjisaiempire.com/images/hero-empire.jpg?v=2" }],
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  .wd-hero {
    position: relative;
    padding: clamp(72px, 10vw, 140px) 0 0;
    overflow: hidden;
  }
  .wd-hero::before {
    content: "";
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(244,236,216,.04) 1px, transparent 1px);
    background-size: 4px 4px;
    pointer-events: none; opacity: .5;
  }
  .wd-wrap {
    max-width: var(--container);
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 56px);
  }
  .wd-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .32em; text-transform: uppercase;
    color: var(--gold);
    display: inline-flex; align-items: center; gap: 14px;
    margin-bottom: 28px;
  }
  .wd-eyebrow::before {
    content: ""; display: inline-block;
    width: 32px; height: 1px; background: var(--gold);
  }
  .wd-h1 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(46px, 6.4vw, 96px);
    line-height: .9; letter-spacing: -.012em;
    text-transform: uppercase;
    color: var(--cream);
    margin: 0 0 28px;
  }
  .wd-h1 .gold { color: var(--gold); }
  .wd-h1 .italic {
    font-family: 'Fraunces', serif;
    font-style: italic; font-weight: 400;
    text-transform: none; letter-spacing: -.02em;
    color: var(--gold);
  }
  .wd-lede {
    font-family: 'Fraunces', serif; font-weight: 400;
    font-size: clamp(17px, 1.4vw, 21px); line-height: 1.6;
    color: var(--bone); max-width: 56ch;
    margin: 0 0 20px;
  }
  .wd-lede strong { color: var(--cream); font-style: italic; }
  .wd-proof {
    display: flex; flex-wrap: wrap; gap: 10px;
    margin-bottom: clamp(48px, 6vw, 72px);
  }
  .wd-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
    color: var(--cream-soft);
    border: 1px solid var(--line);
    padding: 7px 13px; border-radius: 2px;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .wd-badge .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); }
  .wd-video-section {
    padding: clamp(56px, 7vw, 96px) 0;
    border-top: 1px solid var(--line);
  }
  .wd-video-wrap {
    margin-top: 32px;
    position: relative;
    width: 100%;
    max-width: 800px;
    aspect-ratio: 16 / 9;
    background: #000;
    border: 1px solid var(--line);
    border-radius: 2px;
    overflow: hidden;
  }
  .wd-video-wrap iframe {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    border: none;
  }
  .wd-booking {
    background: var(--ink-2);
    border-top: 1px solid var(--line);
    padding: clamp(56px, 7vw, 96px) 0;
  }
  .wd-booking__label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 32px;
    display: flex; align-items: center; gap: 14px;
  }
  .wd-booking__label::before {
    content: ""; display: inline-block;
    width: 32px; height: 1px; background: var(--gold);
  }
  .wd-calendly {
    min-height: 700px;
    border: 1px solid var(--line);
    background: #fff;
    border-radius: 2px;
    overflow: hidden;
  }
  .wd-what {
    padding: clamp(56px, 7vw, 96px) 0;
    border-top: 1px solid var(--line);
  }
  .wd-what__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(24px, 3vw, 40px);
    margin-top: 40px;
  }
  @media (max-width: 780px) { .wd-what__grid { grid-template-columns: 1fr; } }
  .wd-card {
    border: 1px solid var(--line);
    padding: clamp(24px, 3vw, 36px);
    background: rgba(244,236,216,.02);
  }
  .wd-card__num {
    font-family: 'Anton', sans-serif;
    font-size: clamp(40px, 4vw, 56px);
    color: var(--gold);
    line-height: 1;
    margin-bottom: 14px;
  }
  .wd-card h3 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(18px, 1.8vw, 22px);
    text-transform: uppercase;
    color: var(--cream);
    margin: 0 0 12px;
  }
  .wd-card p {
    font-family: 'Fraunces', serif;
    font-size: 15px; line-height: 1.6;
    color: var(--bone);
    margin: 0;
  }
  .wd-section-head {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--gold);
    display: inline-flex; align-items: center; gap: 14px;
    margin-bottom: 18px;
  }
  .wd-section-head::before {
    content: ""; display: inline-block;
    width: 32px; height: 1px; background: var(--gold);
  }
  .wd-h2 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(32px, 4vw, 56px);
    line-height: .94; letter-spacing: -.005em;
    text-transform: uppercase;
    color: var(--cream);
    margin: 0 0 10px;
  }
  .wd-h2 .gold { color: var(--gold); }
` }} />

      <Topbar />

      <main id="main">
        {/* ── HERO ── */}
        <section className="wd-hero">
          <div className="wd-wrap">
            <p className="wd-eyebrow">Free · Web Design Consultation</p>
            <h1 className="wd-h1">
              Get a <span className="gold">Free</span><br />
              Website for<br />
              <span className="italic">Your Business</span>
            </h1>
            <p className="wd-lede">
              We build fast, conversion-focused websites for local businesses —
              <strong> no upfront cost.</strong> Book a 15-minute call and we&apos;ll show
              you exactly what we&apos;d build for you.
            </p>
            <div className="wd-proof">
              <span className="wd-badge"><span className="dot" aria-hidden="true" />No upfront cost</span>
              <span className="wd-badge"><span className="dot" aria-hidden="true" />Done in 7 days</span>
              <span className="wd-badge"><span className="dot" aria-hidden="true" />Local business specialists</span>
              <span className="wd-badge"><span className="dot" aria-hidden="true" />15-min call</span>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU GET ── */}
        <section className="wd-what">
          <div className="wd-wrap">
            <p className="wd-section-head">What You Get</p>
            <h2 className="wd-h2">Everything to <span className="gold">convert</span> visitors.</h2>
            <div className="wd-what__grid">
              <div className="wd-card">
                <div className="wd-card__num">01</div>
                <h3>Fast &amp; Mobile-First</h3>
                <p>Built for speed on every device. A slow site loses customers before they read a word.</p>
              </div>
              <div className="wd-card">
                <div className="wd-card__num">02</div>
                <h3>Lead Capture Built In</h3>
                <p>Contact forms, click-to-call buttons, and booking widgets wired up on day one.</p>
              </div>
              <div className="wd-card">
                <div className="wd-card__num">03</div>
                <h3>Done in 7 Days</h3>
                <p>No month-long agency timelines. Book the call Monday, live site by Friday.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── VIDEO ── */}
        <section className="wd-video-section">
          <div className="wd-wrap">
            <p className="wd-section-head">Watch First</p>
            <h2 className="wd-h2">See what we <span className="gold">build</span>.</h2>
            <div className="wd-video-wrap">
              <iframe
                src="https://share.descript.com/embed/23nzBqhVAJh"
                width="640"
                height="360"
                frameBorder="0"
                allowFullScreen
                title="Free website consultation overview"
              />
            </div>
          </div>
        </section>

        {/* ── CALENDLY BOOKING ── */}
        <section className="wd-booking">
          <div className="wd-wrap">
            <p className="wd-booking__label">Book Your Free Call</p>
            <CalendlyWidget url="https://calendly.com/ben-advancedmarketing/free-website-consultation" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
