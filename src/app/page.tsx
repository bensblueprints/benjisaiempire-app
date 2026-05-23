import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import PortfolioSection from "@/components/PortfolioSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Benji's AI Empire — AI Empire Insider $9/mo · AI Business Playbook",
  description: "For $9/mo get every AI course I teach, every prompt, every script, and a GoHighLevel sub-account. Everything you need to build an AI business.",
  alternates: { canonical: "https://benjisaiempire.com/" },
  openGraph: { title: "Benji's AI Empire — $9/mo Gets You Everything", description: "$9/mo for all 4 AI courses, every prompt, every script, and a GoHighLevel account.", url: "https://benjisaiempire.com/", images: [{ url: "https://benjisaiempire.com/images/hero-empire.jpg?v=5" }], type: "website" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink:#0b0b0c; --ink-2:#15161a; --ink-3:#1d1f25;
    --cream:#f4ecd8; --cream-soft:rgba(244,236,216,.65);
    --gold:#d4af37; --gold-bright:#f5d061;
    --rust:#c4292e; --bone:#d8d2bf; --line:rgba(244,236,216,.14);
    --ease:cubic-bezier(.22,1,.36,1);
    --container:1280px;
  }
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  body {
    font-family:'Manrope',system-ui,sans-serif;
    background:var(--ink); color:var(--cream);
    font-size:16px; line-height:1.55;
    -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
    min-height:100vh; overflow-x:hidden;
  }
  a{color:inherit; text-decoration:none}
  img{max-width:100%; display:block}
  button{font:inherit; cursor:pointer; border:none; background:none; color:inherit}
  ::selection{background:var(--gold); color:var(--ink)}
  .skip-to-main{
    position:absolute; left:-9999px; top:8px; background:var(--gold); color:var(--ink);
    padding:8px 14px; border-radius:4px; z-index:999;
    font-family:'JetBrains Mono',monospace; font-size:13px;
  }
  .skip-to-main:focus{left:8px}
  @media (prefers-reduced-motion: reduce){
    *,*::before,*::after{
      animation-duration:.01ms !important; animation-iteration-count:1 !important;
      transition-duration:.01ms !important;
    }
  }



/* ===== 01-hero ===== */

  /* ──── HERO SECTION ────────────────────────────────────────────────────────────────────────────────────── */
  .hero-section{
    position:relative;
    background:var(--ink);
    color:var(--cream);
    min-height:auto;
    padding-block:clamp(64px, 8vw, 128px);
    overflow:hidden;
    font-family:'Manrope',sans-serif;
    isolation:isolate;
  }

  /* film-grain overlay across entire hero */
  .hero-section::before{
    content:"";
    position:absolute;inset:0;
    background-image:
      radial-gradient(rgba(244,236,216,.045) 1px, transparent 1px),
      radial-gradient(rgba(11,11,12,.06) 1px, transparent 1px);
    background-size:3px 3px, 5px 5px;
    background-position:0 0, 1px 2px;
    mix-blend-mode:overlay;
    pointer-events:none;
    z-index:5;
    opacity:.55;
  }

  /* hairline divider over seam */
  .hero-section::after{
    content:"";
    position:absolute;
    left:42%;top:0;bottom:0;width:1px;
    background:linear-gradient(to bottom,
      transparent 0%,
      var(--line) 12%,
      var(--line) 88%,
      transparent 100%);
    z-index:3;
    pointer-events:none;
  }

  .hero-section .hero-grid{
    position:relative;
    display:grid;
    grid-template-columns:42% 58%;
    min-height:auto;
    z-index:1;
  }
  @media (max-width:760px){
    .hero-section .hero-grid{ grid-template-columns:1fr; gap:32px; }
  }

  /* ──── LEFT: INK PANEL ──────────────────────────────────────────────────────────────────────────────── */
  .hero-section .hero-left{
    position:relative;
    padding:clamp(28px,4vw,56px) clamp(28px,4vw,68px) clamp(28px,3vw,48px);
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    background:linear-gradient(180deg,var(--ink) 0%,var(--ink-2) 100%);
    z-index:2;
  }

  /* top rail: chapter marker + ON AIR */
  .hero-section .hero-rail{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:24px;
    opacity:0;
    animation:heroFadeIn .9s cubic-bezier(.22,1,.36,1) .1s forwards;
  }

  .hero-section .chapter{
    font-family:'JetBrains Mono',monospace;
    font-size:11px;
    letter-spacing:.22em;
    text-transform:uppercase;
    color:var(--cream-soft);
    display:flex;
    align-items:center;
    gap:14px;
  }
  .hero-section .chapter .num{ color:var(--gold); }
  .hero-section .chapter .bar{
    display:inline-block;width:42px;height:1px;background:var(--line);
  }

  .hero-section .on-air{
    display:inline-flex;
    align-items:center;
    gap:9px;
    padding:6px 11px 6px 9px;
    border:1px solid var(--rust);
    background:rgba(196,41,46,.08);
    font-family:'JetBrains Mono',monospace;
    font-size:10px;
    letter-spacing:.28em;
    text-transform:uppercase;
    color:var(--cream);
    border-radius:2px;
  }
  .hero-section .on-air .dot{
    width:7px;height:7px;border-radius:50%;
    background:var(--rust);
    box-shadow:0 0 0 0 rgba(196,41,46,.6);
    animation:heroPulse 1.6s ease-in-out infinite;
  }

  /* main editorial block */
  .hero-section .hero-main{
    margin:clamp(28px,5vh,64px) 0 clamp(28px,4vh,52px);
  }

  .hero-section .eyebrow{
    font-family:'JetBrains Mono',monospace;
    font-size:10.5px;
    letter-spacing:.32em;
    text-transform:uppercase;
    color:var(--gold);
    margin-bottom:22px;
    opacity:0;
    animation:heroFadeIn .9s cubic-bezier(.22,1,.36,1) .2s forwards;
  }
  .hero-section .eyebrow span{ color:var(--cream-soft); margin:0 8px; }

  .hero-section h1.hero-headline{
    font-family:'Anton',sans-serif;
    font-weight:400;
    font-size:clamp(46px,6.6vw,108px);
    line-height:.9;
    letter-spacing:-.012em;
    text-transform:uppercase;
    color:var(--cream);
    margin:0;
  }
  .hero-section .hero-headline .line{
    display:block;
    overflow:hidden;
  }
  .hero-section .hero-headline .line > span{
    display:inline-block;
    transform:translateY(102%);
    opacity:0;
    animation:heroLineUp 1.05s cubic-bezier(.22,1,.36,1) forwards;
  }
  .hero-section .hero-headline .l1 > span{ animation-delay:.30s; }
  .hero-section .hero-headline .l2 > span{ animation-delay:.40s; }
  .hero-section .hero-headline .l3 > span{ animation-delay:.50s; color:var(--gold); }
  .hero-section .hero-headline .l4 > span{ animation-delay:.60s; color:var(--gold); }

  .hero-section .hero-headline .amp{
    display:inline-block;
    font-family:'Fraunces',serif;
    font-style:italic;
    font-weight:300;
    font-variation-settings:"opsz" 144;
    text-transform:lowercase;
    color:var(--gold-bright);
    transform:translateY(-.05em);
    padding:0 .04em;
  }

  .hero-section .hero-lede{
    margin-top:clamp(22px,3vh,32px);
    max-width:54ch;
    font-family:'Fraunces',serif;
    font-variation-settings:"opsz" 36;
    font-weight:380;
    font-size:clamp(15px,1.15vw,18px);
    line-height:1.55;
    color:var(--cream);
    opacity:0;
    animation:heroFadeIn .9s cubic-bezier(.22,1,.36,1) .75s forwards;
  }
  .hero-section .hero-lede strong{
    font-weight:600;
    color:var(--gold-bright);
    font-style:italic;
  }

  /* CTAs */
  .hero-section .hero-ctas{
    margin-top:clamp(26px,3.5vh,38px);
    display:flex;
    flex-wrap:wrap;
    gap:14px;
    align-items:center;
    opacity:0;
    animation:heroFadeIn .9s cubic-bezier(.22,1,.36,1) .85s forwards;
  }
  .hero-section .btn{
    position:relative;
    display:inline-flex;
    align-items:center;
    gap:12px;
    padding:16px 26px;
    font-family:'JetBrains Mono',monospace;
    font-size:11.5px;
    letter-spacing:.18em;
    text-transform:uppercase;
    text-decoration:none;
    border-radius:2px;
    transition:transform .35s cubic-bezier(.22,1,.36,1),
               background .25s ease,
               color .25s ease,
               box-shadow .35s ease;
    cursor:pointer;
    border:1px solid transparent;
  }
  .hero-section .btn .arrow{
    display:inline-block;
    transition:transform .35s cubic-bezier(.22,1,.36,1);
  }
  .hero-section .btn:hover .arrow{ transform:translateX(4px); }

  .hero-section .btn-primary{
    background:var(--gold);
    color:var(--ink);
    font-weight:700;
    box-shadow:0 10px 30px -12px rgba(212,175,55,.55);
  }
  .hero-section .btn-primary:hover{
    background:var(--gold-bright);
    transform:translateY(-1px);
    box-shadow:0 16px 40px -12px rgba(245,208,97,.7);
  }

  .hero-section .btn-ghost{
    color:var(--cream);
    border-color:var(--line);
    background:transparent;
  }
  .hero-section .btn-ghost:hover{
    border-color:var(--cream);
    background:rgba(244,236,216,.04);
  }

  /* bottom ticker / stat strip */
  .hero-section .hero-ticker{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:0;
    border-top:1px solid var(--line);
    padding-top:22px;
    opacity:0;
    animation:heroFadeIn .9s cubic-bezier(.22,1,.36,1) 1s forwards;
  }
  .hero-section .stat{
    padding-right:18px;
    border-right:1px solid var(--line);
  }
  .hero-section .stat:last-child{ border-right:none; padding-left:18px; padding-right:0; }
  .hero-section .stat:nth-child(2){ padding-left:18px; }
  .hero-section .stat .k{
    font-family:'JetBrains Mono',monospace;
    font-size:9.5px;
    letter-spacing:.3em;
    text-transform:uppercase;
    color:var(--cream-soft);
    display:block;
    margin-bottom:6px;
  }
  .hero-section .stat .v{
    font-family:'Anton',sans-serif;
    font-size:clamp(22px,2vw,30px);
    line-height:1;
    color:var(--cream);
    letter-spacing:.005em;
  }
  .hero-section .stat .v em{
    font-family:'Fraunces',serif;
    font-style:italic;
    font-weight:300;
    color:var(--gold);
  }

  /* ──── RIGHT: PHOTO PANEL ────────────────────────────────────────────────────────────────────────── */
  .hero-section .hero-right{
    position:relative;
    overflow:hidden;
    background:var(--ink-3);
  }

  .hero-section .hero-photo{
    position:absolute;inset:0;
    background-image:url('/images/hero-empire.jpg?v=5');
    background-size:cover;
    background-position:center 38%;
    transform:scale(1.06);
    animation:heroKenBurns 18s linear infinite alternate,
              heroPhotoIn 1.4s cubic-bezier(.22,1,.36,1) .15s both;
    will-change:transform;
  }

  /* duotone wash */
  .hero-section .hero-photo::after{
    content:"";
    position:absolute;inset:0;
    background:
      linear-gradient(115deg,
        rgba(11,11,12,.55) 0%,
        rgba(11,11,12,.10) 38%,
        rgba(11,11,12,.05) 62%,
        rgba(11,11,12,.45) 100%),
      linear-gradient(180deg,
        rgba(11,11,12,.35) 0%,
        rgba(11,11,12,0) 25%,
        rgba(11,11,12,0) 70%,
        rgba(11,11,12,.65) 100%);
  }

  /* gold accent corner brackets */
  .hero-section .bracket{
    position:absolute;
    width:38px;height:38px;
    border:1.5px solid var(--gold);
    z-index:4;
    opacity:0;
    animation:heroFadeIn .8s cubic-bezier(.22,1,.36,1) 1.1s forwards;
  }
  .hero-section .bracket.tr{ top:24px;right:24px;border-left:none;border-bottom:none; }
  .hero-section .bracket.bl{ bottom:24px;left:24px;border-right:none;border-top:none; }

  /* issue tag top-right */
  .hero-section .issue-tag{
    position:absolute;
    top:32px;right:74px;
    font-family:'JetBrains Mono',monospace;
    font-size:10px;
    letter-spacing:.28em;
    text-transform:uppercase;
    color:var(--cream);
    text-align:right;
    z-index:4;
    opacity:0;
    animation:heroFadeIn .9s cubic-bezier(.22,1,.36,1) 1.05s forwards;
  }
  .hero-section .issue-tag .big{
    display:block;
    font-family:'Fraunces',serif;
    font-style:italic;
    font-weight:300;
    font-size:30px;
    letter-spacing:0;
    text-transform:none;
    color:var(--gold-bright);
    line-height:1;
    margin-bottom:6px;
  }

  /* vertical caption rail bottom-right */
  .hero-section .photo-caption{
    position:absolute;
    right:24px;bottom:48px;
    writing-mode:vertical-rl;
    transform:rotate(180deg);
    font-family:'JetBrains Mono',monospace;
    font-size:10px;
    letter-spacing:.32em;
    text-transform:uppercase;
    color:var(--cream-soft);
    z-index:4;
    opacity:0;
    animation:heroFadeIn .9s cubic-bezier(.22,1,.36,1) 1.15s forwards;
  }
  .hero-section .photo-caption span{ color:var(--gold); }

  /* bottom-left credit on photo */
  .hero-section .photo-credit{
    position:absolute;
    left:32px;bottom:32px;
    font-family:'JetBrains Mono',monospace;
    font-size:10px;
    letter-spacing:.26em;
    text-transform:uppercase;
    color:var(--cream-soft);
    z-index:4;
    opacity:0;
    animation:heroFadeIn .9s cubic-bezier(.22,1,.36,1) 1.2s forwards;
  }
  .hero-section .photo-credit b{ color:var(--cream); font-weight:600; }

  /* ──── POLAROID on seam ────────────────────────────────────────────────────────────────────────────── */
  .hero-section .polaroid{
    position:absolute;
    left:42%;
    top:54%;
    transform:translate(-58%, -50%) rotate(-6deg);
    width:clamp(150px,14vw,210px);
    background:var(--cream);
    padding:10px 10px 38px;
    box-shadow:
      0 30px 60px -20px rgba(0,0,0,.7),
      0 12px 24px -10px rgba(0,0,0,.5);
    z-index:6;
    opacity:0;
    animation:heroPolaroid 1.1s cubic-bezier(.22,1,.36,1) 1.25s forwards;
  }
  .hero-section .polaroid img{
    display:block;
    width:100%;
    height:auto;
    aspect-ratio:1/1.05;
    object-fit:cover;
    object-position:center 25%;
    filter:saturate(.92) contrast(1.02);
  }
  .hero-section .polaroid .pcap{
    position:absolute;
    left:0;right:0;bottom:10px;
    text-align:center;
    font-family:'Fraunces',serif;
    font-style:italic;
    font-weight:400;
    font-size:13px;
    color:var(--ink);
  }
  .hero-section .polaroid::after{
    content:"BENJI / 2026";
    position:absolute;
    top:-22px;left:14px;
    font-family:'JetBrains Mono',monospace;
    font-size:9px;
    letter-spacing:.3em;
    color:var(--gold);
    background:var(--ink);
    padding:4px 8px;
    border:1px solid var(--line);
  }

  /* ──── KEYFRAMES ──────────────────────────────────────────────────────────────────────────────────────────── */
  @keyframes heroFadeIn{
    from{opacity:0; transform:translateY(8px);}
    to  {opacity:1; transform:translateY(0);}
  }
  @keyframes heroLineUp{
    from{transform:translateY(102%); opacity:0;}
    to  {transform:translateY(0);    opacity:1;}
  }
  @keyframes heroPulse{
    0%,100%{ box-shadow:0 0 0 0 rgba(196,41,46,.55); }
    50%    { box-shadow:0 0 0 9px rgba(196,41,46,0); }
  }
  @keyframes heroKenBurns{
    from{ transform:scale(1.06) translate(0,0); }
    to  { transform:scale(1.13) translate(-1.5%, -1%); }
  }
  @keyframes heroPhotoIn{
    from{ opacity:0; filter:blur(8px); }
    to  { opacity:1; filter:blur(0); }
  }
  @keyframes heroPolaroid{
    from{ opacity:0; transform:translate(-58%,-46%) rotate(-12deg) scale(.92); }
    to  { opacity:1; transform:translate(-58%,-50%) rotate(-6deg)  scale(1); }
  }

  /* ──── REDUCED MOTION ────────────────────────────────────────────────────────────────────────────────── */
  @media (prefers-reduced-motion:reduce){
    .hero-section *,
    .hero-section *::before,
    .hero-section *::after{
      animation-duration:.001s !important;
      animation-delay:0s !important;
      transition:none !important;
    }
    .hero-section .hero-headline .line > span{ transform:none; opacity:1; }
  }

  /* ──── RESPONSIVE ────────────────────────────────────────────────────────────────────────────────────────── */
  @media (max-width:1100px){
    .hero-section .hero-grid{ grid-template-columns:48% 52%; }
    .hero-section::after{ left:48%; }
    .hero-section .polaroid{ left:48%; width:160px; }
  }
  @media (max-width:860px){
    .hero-section .hero-grid{
      grid-template-columns:1fr;
      min-height:auto;
    }
    .hero-section::after{ display:none; }
    .hero-section .hero-right{
      order:-1;
      height:62vh;
      min-height:420px;
    }
    .hero-section .hero-left{
      padding:36px 24px 40px;
    }
    .hero-section .polaroid{
      left:auto;right:22px;
      top:auto;bottom:-46px;
      transform:rotate(-6deg);
      width:140px;
      z-index:7;
    }
    .hero-section .issue-tag{ right:24px; }
    .hero-section .photo-caption{ display:none; }
    .hero-section .hero-ticker{ grid-template-columns:1fr; gap:14px; }
    .hero-section .stat{
      border-right:none;
      border-bottom:1px solid var(--line);
      padding:0 0 14px 0 !important;
    }
    .hero-section .stat:last-child{ border-bottom:none; padding-bottom:0 !important; }
  }
  @media (max-width:520px){
    .hero-section h1.hero-headline{ font-size:clamp(40px,11vw,64px); }
    .hero-section .bracket{ width:28px;height:28px; }
  }


/* ===== 02-pricing ===== */

  /* ============================================================
     PRICING — scoped entirely under .pricing-section
     ============================================================ */
  .pricing-section{
    /* local fallbacks if globals aren't present */
    --ps-ink:        var(--ink, #0b0b0c);
    --ps-ink-2:      var(--ink-2, #15161a);
    --ps-ink-3:      var(--ink-3, #1d1f25);
    --ps-cream:      var(--cream, #f4ecd8);
    --ps-cream-soft: var(--cream-soft, rgba(244,236,216,.65));
    --ps-gold:       var(--gold, #d4af37);
    --ps-gold-bright:var(--gold-bright, #f5d061);
    --ps-rust:       var(--rust, #c4292e);
    --ps-bone:       var(--bone, #d8d2bf);
    --ps-line:       var(--line, rgba(244,236,216,.14));

    position: relative;
    padding: clamp(72px, 9vw, 140px) clamp(20px, 5vw, 72px) clamp(96px, 11vw, 160px);
    background:
      radial-gradient(1200px 600px at 80% -10%, rgba(212,175,55,.06), transparent 60%),
      radial-gradient(900px 500px at 5% 110%, rgba(196,41,46,.05), transparent 65%),
      var(--ps-ink);
    color: var(--ps-cream);
    overflow: hidden;
    isolation: isolate;
  }

  /* Faint print-like horizontal rule grid in the background */
  .pricing-section::before{
    content:"";
    position:absolute; inset:0;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 47px,
      rgba(244,236,216,.025) 47px,
      rgba(244,236,216,.025) 48px
    );
    pointer-events:none; z-index:0;
  }

  .pricing-section > *{ position: relative; z-index: 1; }

  /* ---------- HEADER / EDITORIAL MASTHEAD ---------- */
  .pricing-masthead{
    display:grid;
    grid-template-columns: 1fr;
    gap: 14px;
    max-width: 1280px;
    margin: 0 auto clamp(48px, 6vw, 88px);
    border-top: 1px solid var(--ps-line);
    padding-top: clamp(24px, 3vw, 44px);
    position: relative;
  }
  .pricing-masthead::after{
    content:""; position:absolute; left:0; right:0; top:-1px; height:1px;
    background: linear-gradient(90deg, var(--ps-gold) 0, var(--ps-gold) 80px, transparent 80px);
  }

  .pricing-eyebrow{
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: var(--ps-gold);
    display:flex; align-items:center; gap: 14px;
  }
  .pricing-eyebrow::before{
    content:""; width: 28px; height:1px; background: var(--ps-gold);
  }
  .pricing-eyebrow .pricing-eyebrow-meta{
    color: var(--ps-cream-soft);
    margin-left: auto;
    font-size: 10px;
  }

  .pricing-headline{
    font-family: 'Anton', 'Bebas Neue', Impact, sans-serif;
    font-weight: 400;
    font-size: clamp(54px, 8.4vw, 132px);
    line-height: .92;
    letter-spacing: -.01em;
    margin: 6px 0 0;
    text-transform: uppercase;
    color: var(--ps-cream);
  }
  .pricing-headline .ph-amp{
    color: var(--ps-gold);
    font-style: normal;
    -webkit-text-stroke: 1px var(--ps-gold);
    color: transparent;
    margin: 0 .08em;
  }
  .pricing-lede{
    font-family: 'Fraunces', 'Times New Roman', Georgia, serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(17px, 1.5vw, 22px);
    line-height: 1.45;
    color: var(--ps-cream-soft);
    max-width: 720px;
    margin: 18px 0 0;
  }

  /* ---------- TIER GRID ---------- */
  .pricing-grid{
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(20px, 2.4vw, 28px);
    max-width: 1280px;
    margin: 0 auto;
    align-items: stretch;
  }
  @media (min-width: 900px){
    .pricing-grid{
      grid-template-columns: 1fr 1fr;
      max-width: 1280px;
      gap: clamp(20px, 2.4vw, 28px);
    }
  }

  /* ---------- TIER CARD (base) ---------- */
  .tier{
    --i: 0;
    position: relative;
    background: var(--ps-ink-2);
    border: 1px solid var(--ps-line);
    padding: clamp(28px, 2.6vw, 40px) clamp(24px, 2.2vw, 36px) clamp(28px, 2.6vw, 40px);
    display: flex;
    flex-direction: column;
    min-height: 100%;
    color: var(--ps-cream);
    transition: transform .35s cubic-bezier(.2,.7,.2,1),
                box-shadow .35s ease,
                border-color .35s ease,
                background .35s ease;
    opacity: 0;
    transform: translateY(14px);
  }
  .tier::before{
    /* hairline gold rule across the top of every card */
    content:""; position:absolute; left:0; right:0; top:-1px; height:1px;
    background: linear-gradient(90deg, transparent 0, var(--ps-gold) 18%, var(--ps-gold) 82%, transparent 100%);
    opacity: .35;
  }
  .pricing-grid.is-visible .tier{
    opacity: 1; transform: translateY(0);
    transition-delay: calc(var(--i) * 60ms);
  }
  /* Fallback: animate without JS by default after small delay */
  @media (prefers-reduced-motion: no-preference){
    .pricing-grid:not(.is-visible) .tier{
      animation: tierFadeIn .7s cubic-bezier(.2,.7,.2,1) forwards;
      animation-delay: calc(var(--i) * 60ms + 120ms);
    }
  }
  @keyframes tierFadeIn{ to{ opacity:1; transform: translateY(0);} }

  .tier:hover{
    transform: translateY(-3px);
    box-shadow:
      0 1px 0 var(--ps-line) inset,
      0 28px 60px -28px rgba(0,0,0,.7),
      0 8px 22px -10px rgba(212,175,55,.12);
    border-color: rgba(244,236,216,.22);
  }

  .tier-eyebrow{
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: .26em;
    text-transform: uppercase;
    color: var(--ps-cream-soft);
    display:flex; align-items:center; gap:10px;
  }
  .tier-eyebrow::before{
    content:""; width:18px; height:1px; background: var(--ps-gold); opacity:.7;
  }

  .tier-name{
    font-family: 'Anton', 'Bebas Neue', Impact, sans-serif;
    font-weight: 400;
    font-size: clamp(34px, 3.6vw, 54px);
    line-height: 1;
    letter-spacing: -.005em;
    margin: 14px 0 22px;
    text-transform: uppercase;
    color: var(--ps-cream);
  }

  .tier-price-row{
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
    margin: 0 0 6px;
    border-top: 1px solid var(--ps-line);
    padding-top: 18px;
  }
  .tier-price{
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-weight: 700;
    font-size: clamp(56px, 6vw, 88px);
    line-height: .95;
    letter-spacing: -.02em;
    color: var(--ps-cream);
  }
  .tier-price .currency{
    font-size: .55em;
    vertical-align: top;
    margin-right: 2px;
    color: var(--ps-gold);
    font-weight: 500;
  }
  .tier-price-strike{
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-weight: 500;
    font-size: clamp(20px, 2vw, 28px);
    color: var(--ps-rust);
    text-decoration: line-through;
    text-decoration-thickness: 2px;
    margin-right: 4px;
    align-self: center;
    transform: translateY(-6px);
  }
  .tier-price-cadence{
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--ps-cream-soft);
    align-self: flex-end;
    padding-bottom: 8px;
  }

  .tier-perminute{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--ps-gold);
    border: 1px solid rgba(212,175,55,.45);
    padding: 7px 11px 6px;
    margin: 12px 0 0;
    align-self: flex-start;
    background: rgba(212,175,55,.05);
  }
  .tier-perminute .dot{
    width:5px; height:5px; border-radius:50%;
    background: var(--ps-gold); display:inline-block;
  }

  .tier-tagline{
    font-family: 'Fraunces', Georgia, serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(16px, 1.25vw, 19px);
    line-height: 1.45;
    color: var(--ps-cream);
    margin: 22px 0 22px;
    padding-left: 14px;
    border-left: 2px solid var(--ps-gold);
  }

  /* hairline section divider before the includes list */
  .tier-divider{
    display:flex; align-items:center; gap: 12px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: var(--ps-cream-soft);
    margin: 6px 0 14px;
  }
  .tier-divider::after{
    content:""; flex:1; height:1px; background: var(--ps-line);
  }

  .tier-includes{
    list-style: none;
    margin: 0 0 28px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .tier-includes li{
    font-family: 'Manrope', system-ui, sans-serif;
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--ps-cream);
    padding-left: 22px;
    position: relative;
  }
  .tier-includes li::before{
    content:""; position:absolute; left:0; top:.65em;
    width: 12px; height: 1px;
    background: var(--ps-gold);
  }
  .tier-includes li strong{
    color: var(--ps-gold-bright);
    font-weight: 600;
  }

  /* push the CTA to the bottom of every card so they line up */
  .tier-foot{ margin-top: auto; }

  .tier-cta{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    padding: 16px 20px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: .18em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid var(--ps-cream);
    color: var(--ps-cream);
    background: transparent;
    transition: background .25s ease, color .25s ease, border-color .25s ease, transform .25s ease;
  }
  .tier-cta:hover{
    background: var(--ps-cream);
    color: var(--ps-ink);
    transform: translateY(-1px);
  }
  .tier-cta--gold{
    background: var(--ps-gold);
    border-color: var(--ps-gold);
    color: var(--ps-ink);
  }
  .tier-cta--gold:hover{
    background: var(--ps-gold-bright);
    border-color: var(--ps-gold-bright);
    color: var(--ps-ink);
  }
  .tier-cta--gold-outline{
    background: var(--ps-gold);
    color: var(--ps-ink);
    border: 1px solid var(--ps-gold);
    box-shadow: 0 0 0 4px rgba(212,175,55,.12);
  }
  .tier-cta--gold-outline:hover{
    background: var(--ps-gold-bright);
    border-color: var(--ps-gold-bright);
    box-shadow: 0 0 0 6px rgba(212,175,55,.18);
  }
  .tier-cta .arrow{
    transition: transform .25s ease;
  }
  .tier-cta:hover .arrow{
    transform: translateX(4px);
  }

  .tier-fineprint{
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--ps-cream-soft);
    text-align: center;
    margin: 12px 0 0;
  }

  /* ---------- INSIDER ---------- */
  .tier--insider{ --i: 0; }
  .tier--insider .tier-name{ color: var(--ps-cream); }

  /* ---------- DONE FOR YOU COACHING ---------- */
  .tier--coaching{
    --i: 1;
    border-color: rgba(212,175,55,.35);
    background: linear-gradient(165deg, rgba(212,175,55,.1) 0%, var(--ps-ink-2) 42%);
  }
  .tier--coaching .tier-eyebrow{ color: var(--ps-gold); }
  .tier--coaching .tier-name{ color: var(--ps-gold-bright, var(--ps-gold)); }
  .tier-price-row--stacked{
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .tier-price-secondary{
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }
  .tier-price-secondary .tier-price{
    font-size: clamp(40px, 4.5vw, 64px);
  }

  /* ---------- TIER 3: WHOLESALE GHL — FEATURED ---------- */
  .tier--featured{
    --i: 2;
    background: linear-gradient(180deg, #1a1916 0%, var(--ps-ink-2) 65%);
    border: 1px solid var(--ps-gold);
    box-shadow:
      0 0 0 1px rgba(212,175,55,.25),
      0 30px 60px -30px rgba(0,0,0,.8),
      0 12px 30px -16px rgba(212,175,55,.18);
    padding-top: clamp(40px, 3.4vw, 56px);
  }
  @media (min-width: 900px){
    .tier--featured{
      transform: translateY(-12px);
      margin-top: -12px;
    }
    .tier--featured:hover{
      transform: translateY(-16px);
    }
  }
  .tier--featured::before{
    background: linear-gradient(90deg, transparent 0, var(--ps-gold) 8%, var(--ps-gold-bright) 50%, var(--ps-gold) 92%, transparent 100%);
    opacity: .9;
  }

  /* shimmer that slowly travels across the gold edge on hover */
  .tier--featured::after{
    content:"";
    position: absolute;
    inset: -1px;
    border: 1px solid transparent;
    background:
      linear-gradient(115deg,
        transparent 0%,
        transparent 38%,
        rgba(245,208,97,.55) 50%,
        transparent 62%,
        transparent 100%) border-box;
    -webkit-mask:
      linear-gradient(#000 0 0) padding-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    background-size: 250% 250%;
    background-position: -50% 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity .4s ease;
  }
  .tier--featured:hover::after{
    opacity: 1;
    animation: shimmerEdge 2.6s linear infinite;
  }
  @keyframes shimmerEdge{
    0%   { background-position: -50% 0; }
    100% { background-position: 150% 0; }
  }

  /* RUST RIBBON — ticket-stub */
  .tier-ribbon{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: var(--ps-rust);
    color: var(--ps-cream);
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: .32em;
    text-transform: uppercase;
    padding: 9px 18px 8px;
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0,.35);
    box-shadow: 0 1px 0 rgba(245,208,97,.25);
  }
  .tier-ribbon::before,
  .tier-ribbon::after{
    /* perforation dots — ticket stub feel */
    content:"";
    position:absolute;
    bottom: -5px;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--ps-ink);
    border: 1px solid var(--ps-gold);
  }
  .tier-ribbon::before{ left: -5px; }
  .tier-ribbon::after { right: -5px; }

  .tier--featured .tier-eyebrow{ color: var(--ps-gold); margin-top: 8px; }
  .tier--featured .tier-name{
    color: var(--ps-cream);
    text-shadow: 0 1px 0 rgba(0,0,0,.3);
  }

  /* SCARCITY COUNTER */
  .scarcity{
    display:flex; align-items:center; gap: 12px;
    margin: 0 0 18px;
    padding: 12px 14px;
    background: rgba(196,41,46,.08);
    border: 1px dashed rgba(196,41,46,.5);
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--ps-cream);
  }
  .scarcity .scarcity-pulse{
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--ps-rust);
    box-shadow: 0 0 0 0 rgba(196,41,46,.6);
    animation: pulse 2s infinite;
    flex: none;
  }
  @keyframes pulse{
    0%   { box-shadow: 0 0 0 0 rgba(196,41,46,.55); }
    70%  { box-shadow: 0 0 0 10px rgba(196,41,46,0); }
    100% { box-shadow: 0 0 0 0 rgba(196,41,46,0); }
  }
  .scarcity-count{
    color: var(--ps-gold-bright);
    font-weight: 700;
  }
  .scarcity-bar{
    flex: 1;
    height: 3px;
    background: rgba(244,236,216,.1);
    position: relative;
    overflow: hidden;
  }
  .scarcity-bar::before{
    content:"";
    position:absolute; left:0; top:0; bottom:0;
    width: 13%; /* 13 of 100 sold; 87 left */
    background: linear-gradient(90deg, var(--ps-gold) 0%, var(--ps-rust) 100%);
  }

  /* ---------- FOOT NOTE BAR (under grid) ---------- */
  .pricing-footnote{
    max-width: 1280px;
    margin: clamp(48px, 6vw, 80px) auto 0;
    padding-top: 26px;
    border-top: 1px solid var(--ps-line);
    display: flex;
    flex-wrap: wrap;
    gap: 18px 36px;
    justify-content: space-between;
    align-items: baseline;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--ps-cream-soft);
  }
  .pricing-footnote span strong{
    color: var(--ps-gold);
    font-weight: 600;
  }

  /* ---------- RESPONSIVE TIDY ---------- */
  @media (max-width: 899px){
    .tier--featured{ order: -1; }
    .pricing-headline{ font-size: clamp(48px, 12vw, 72px); }
  }
  @media (max-width: 520px){
    .tier{ padding: 26px 22px; }
    .tier-name{ font-size: 38px; }
    .tier-price{ font-size: 56px; }
    .tier-eyebrow .pricing-eyebrow-meta{ display:none; }
  }


/* ===== 03-courses ===== */

  .courses-section {
    --tile-radius: 2px;
    --row-gap: clamp(48px, 6vw, 96px);
    --col-gap: clamp(20px, 2.4vw, 40px);

    position: relative;
    background: var(--ink);
    color: var(--cream);
    padding: clamp(80px, 10vw, 160px) clamp(20px, 4vw, 64px) clamp(96px, 12vw, 200px);
    overflow: hidden;
    font-family: 'Manrope', sans-serif;
  }

  /* hairline grid texture in background */
  .courses-section::before {
    content: "";
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, var(--line) 1px, transparent 1px);
    background-size: calc(100% / 12) 100%;
    opacity: .35;
    pointer-events: none;
    mask-image: linear-gradient(to bottom, transparent 0, #000 12%, #000 88%, transparent 100%);
  }

  .courses-section__inner {
    position: relative;
    max-width: 1480px;
    margin: 0 auto;
  }

  /* ────────────────────────────────────────────── HEADER ────────────────────────────────────────────── */
  .courses-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    margin-bottom: clamp(64px, 7vw, 112px);
    padding-bottom: 40px;
    border-bottom: 1px solid var(--line);
  }
  @media (min-width: 900px) {
    .courses-header {
      grid-template-columns: 1fr 1.1fr;
      align-items: end;
      gap: 56px;
    }
  }

  .courses-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream);
    display: inline-flex;
    align-items: center;
    gap: 14px;
    margin: 0;
  }
  .courses-eyebrow::after {
    content: "";
    flex: 0 0 56px;
    height: 2px;
    background: var(--gold);
    transform: translateY(1px);
  }

  .courses-display {
    font-family: 'Anton', sans-serif;
    font-weight: 400;
    font-size: clamp(56px, 11vw, 188px);
    line-height: 0.86;
    letter-spacing: -0.012em;
    text-transform: uppercase;
    margin: 18px 0 0;
    color: var(--cream);
  }
  .courses-display .accent {
    color: var(--gold);
    font-style: normal;
    -webkit-text-stroke: 0;
  }
  .courses-display .outline {
    color: transparent;
    -webkit-text-stroke: 1.5px var(--cream);
    text-stroke: 1.5px var(--cream);
  }

  .courses-lede {
    font-family: 'Fraunces', serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(18px, 1.5vw, 24px);
    line-height: 1.45;
    color: var(--cream-soft);
    max-width: 52ch;
    margin: 0;
  }
  .courses-lede em {
    font-style: normal;
    color: var(--gold-bright);
    font-weight: 400;
  }

  .courses-meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 32px 56px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid var(--line);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--cream-soft);
  }
  .courses-meta-row span strong {
    color: var(--cream);
    font-weight: 600;
    margin-right: 8px;
  }

  /* ────────────────────────────────────────────── GRID ────────────────────────────────────────────── */
  .courses-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--row-gap) var(--col-gap);
  }

  /* default mobile: every tile full width */
  .tile { grid-column: 1 / -1; }

  /* desktop asymmetric editorial layout */
  @media (min-width: 1000px) {
    .tile-01 { grid-column: 1 / span 5; }
    .tile-02 { grid-column: 7 / span 5; }       /* tile-02 sits to the right of 01 */
    .tile-03 { grid-column: 1 / span 12; }      /* full-width spread */
    .tile-04 { grid-column: 2 / span 4; }
    .tile-05 { grid-column: 7 / span 6; }       /* wide */
    .courses-soon-head { grid-column: 1 / -1; }
    .tile-07 { grid-column: 1 / span 4; }
    .tile-08 { grid-column: 5 / span 4; }
    .tile-09 { grid-column: 9 / span 4; }
    .tile-06 { grid-column: 1 / span 12; }      /* atmospheric finale */
  }

  /* shifted vertical alignment for editorial rhythm */
  @media (min-width: 1000px) {
    .tile-02 { transform: translateY(64px); }
    .tile-04 { transform: translateY(40px); }
    .tile-05 { transform: translateY(-32px); }
  }

  /* ────────────────────────────────────────────── TILE BASE ────────────────────────────────────────────── */
  .tile {
    position: relative;
    text-decoration: none;
    color: inherit;
    display: block;
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: no-preference) {
    .tile:not(.is-in) {
      opacity: 0;
      transform: translateY(28px);
      transition:
        opacity 800ms cubic-bezier(.22,1,.36,1) calc(var(--i, 0) * 80ms),
        transform 800ms cubic-bezier(.22,1,.36,1) calc(var(--i, 0) * 80ms);
    }
    .tile.is-in {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* preserve the editorial offsets after enter animation */
  @media (min-width: 1000px) {
    .tile-02.is-in { transform: translateY(64px); }
    .tile-04.is-in { transform: translateY(40px); }
    .tile-05.is-in { transform: translateY(-32px); }
    .tile-02 { transform: translateY(calc(64px + 28px)); }
    .tile-04 { transform: translateY(calc(40px + 28px)); }
    .tile-05 { transform: translateY(calc(-32px + 28px)); }
  }

  /* ────────────────────────────────────────────── NUMERAL ────────────────────────────────────────────── */
  .tile__numeral {
    position: absolute;
    font-family: 'Anton', sans-serif;
    font-weight: 400;
    font-size: clamp(120px, 16vw, 220px);
    line-height: 0.78;
    letter-spacing: -0.02em;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--cream);
    text-stroke: 1.5px var(--cream);
    opacity: 0.55;
    pointer-events: none;
    user-select: none;
    transition: transform 800ms cubic-bezier(.22,1,.36,1), opacity 400ms ease;
    z-index: 2;
  }
  .tile:hover .tile__numeral {
    transform: translate(8px, -4px);
    opacity: 0.95;
    -webkit-text-stroke-color: var(--gold);
    text-stroke-color: var(--gold);
  }

  /* numeral positioning per tile */
  .tile-01 .tile__numeral { top: -42px; left: -18px; }
  .tile-02 .tile__numeral { top: -42px; right: -18px; left: auto; }
  .tile-03 .tile__numeral { top: -64px; left: 2%; font-size: clamp(160px, 22vw, 320px); }
  .tile-04 .tile__numeral { top: -42px; left: -18px; }
  .tile-05 .tile__numeral { top: -42px; right: -18px; left: auto; }
  .tile-06 .tile__numeral { top: -88px; left: 2%; font-size: clamp(180px, 26vw, 380px); }
  .tile-07 .tile__numeral { top: -36px; left: -12px; font-size: clamp(100px, 12vw, 160px); }
  .tile-08 .tile__numeral { top: -36px; right: -12px; left: auto; font-size: clamp(100px, 12vw, 160px); }
  .tile-09 .tile__numeral { top: -36px; left: -12px; font-size: clamp(100px, 12vw, 160px); }

  .courses-soon-head {
    margin: clamp(24px, 4vw, 48px) 0 0;
    padding-top: clamp(32px, 5vw, 56px);
    border-top: 1px solid var(--line);
  }
  .courses-soon-head__eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 10px;
  }
  .courses-soon-head__title {
    font-family: 'Anton', sans-serif;
    font-weight: 400;
    font-size: clamp(28px, 4vw, 48px);
    text-transform: uppercase;
    color: var(--cream);
    margin: 0;
    line-height: 1.05;
  }

  .tile--soon {
    cursor: default;
    pointer-events: none;
  }
  .tile--soon .tile__photo::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(11,11,12,.15) 0%, rgba(11,11,12,.72) 100%);
    z-index: 2;
  }
  .tile--soon .tile__soon-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 3;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink);
    background: var(--gold);
    padding: 8px 12px;
    border-radius: 2px;
  }
  .tile--soon .tile__cta {
    color: var(--cream-soft);
    border-color: var(--line);
  }
  .tile--soon .tile__cta::after { display: none; }
  .tile--soon:hover .tile__title { color: var(--cream); }
  .tile--soon:hover .tile__photo img { transform: none; filter: saturate(0.85) contrast(1.02); }

  .tile-07 .tile__photo { aspect-ratio: 4 / 5; }
  .tile-08 .tile__photo { aspect-ratio: 4 / 5; }
  .tile-09 .tile__photo { aspect-ratio: 4 / 5; }

  /* ────────────────────────────────────────────── PHOTO ────────────────────────────────────────────── */
  .tile__photo {
    position: relative;
    overflow: hidden;
    background: var(--ink-2);
    border-radius: var(--tile-radius);
    isolation: isolate;
  }
  .tile__photo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 800ms cubic-bezier(.22,1,.36,1), filter 600ms ease;
    filter: saturate(0.92) contrast(1.04);
  }
  .tile:hover .tile__photo img {
    transform: scale(1.04);
    filter: saturate(1.08) contrast(1.08);
  }
  .tile__photo::after {
    content: "";
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(11,11,12,.45) 100%);
    pointer-events: none;
    z-index: 1;
  }

  /* aspect ratios per tile (editorial — not uniform) */
  .tile-01 .tile__photo { aspect-ratio: 4 / 5; }     /* portrait */
  .tile-02 .tile__photo { aspect-ratio: 4 / 5; }     /* portrait */
  .tile-03 .tile__photo { aspect-ratio: 21 / 9; }    /* cinematic spread */
  .tile-04 .tile__photo { aspect-ratio: 3 / 4; }     /* tall portrait */
  .tile-05 .tile__photo { aspect-ratio: 16 / 9; }    /* wide */
  .tile-06 .tile__photo { aspect-ratio: 21 / 9; }    /* atmospheric finale */

  /* ────────────────────────────────────────────── KICKER ROW (above title) ────────────────────────────────────────────── */
  .tile__kicker {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 24px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream-soft);
  }
  .tile__kicker .index {
    color: var(--gold);
    font-weight: 600;
  }
  .tile__kicker .rule {
    flex: 1;
    height: 1px;
    background: var(--line);
  }
  .tile__kicker .type {
    color: var(--cream);
  }
  .tile-05 .tile__kicker .type,
  .tile-06 .tile__kicker .type {
    color: var(--rust);
  }

  /* ────────────────────────────────────────────── TITLE + COPY ────────────────────────────────────────────── */
  .tile__title {
    font-family: 'Anton', sans-serif;
    font-weight: 400;
    font-size: clamp(32px, 3.4vw, 56px);
    line-height: 0.94;
    letter-spacing: -0.005em;
    text-transform: uppercase;
    margin: 14px 0 0;
    color: var(--cream);
    transition: color 320ms ease;
  }
  .tile-03 .tile__title,
  .tile-06 .tile__title {
    font-size: clamp(40px, 5vw, 84px);
  }
  .tile:hover .tile__title { color: var(--gold-bright); }

  .tile__tagline {
    font-family: 'Fraunces', serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(17px, 1.35vw, 22px);
    line-height: 1.4;
    color: var(--bone);
    margin: 14px 0 0;
    max-width: 38ch;
  }

  .tile__body {
    font-family: 'Manrope', sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.6;
    color: var(--cream-soft);
    margin: 18px 0 0;
    max-width: 52ch;
  }

  .tile__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-top: 22px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
  }

  .tile__meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--cream-soft);
  }

  .tile__cta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: color 260ms ease, gap 260ms ease;
  }
  .tile__cta::after {
    content: "→";
    font-family: 'Anton', sans-serif;
    font-size: 16px;
    transform: translateY(-1px);
    transition: transform 320ms cubic-bezier(.22,1,.36,1);
  }
  .tile:hover .tile__cta {
    color: var(--gold-bright);
    gap: 16px;
  }
  .tile:hover .tile__cta::after { transform: translate(4px, -1px); }

  /* ────────────────────────────────────────────── SPREAD-STYLE TILES (03, 06) ────────────────────────────────────────────── */
  /* On wide tiles, copy sits in a 5-col grid below the photo, magazine-style */
  @media (min-width: 1000px) {
    .tile-03 .tile__copy,
    .tile-06 .tile__copy {
      display: grid;
      grid-template-columns: 5fr 4fr 3fr;
      gap: 56px;
      align-items: start;
      margin-top: 28px;
    }
    .tile-03 .tile__copy > *,
    .tile-06 .tile__copy > * {
      max-width: none;
      margin: 0;
    }
    .tile-03 .tile__title,
    .tile-06 .tile__title {
      grid-column: 1;
    }
    .tile-03 .tile__tagline,
    .tile-06 .tile__tagline {
      grid-column: 2;
      font-size: clamp(18px, 1.5vw, 24px);
    }
    .tile-03 .tile__body,
    .tile-06 .tile__body {
      grid-column: 3;
    }
    .tile-03 .tile__footer,
    .tile-06 .tile__footer {
      grid-column: 1 / -1;
      margin-top: 32px;
    }
  }

  /* Tile 05 — copy splits into 2 columns under wide photo */
  @media (min-width: 1000px) {
    .tile-05 .tile__copy {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 40px;
      align-items: start;
      margin-top: 22px;
    }
    .tile-05 .tile__copy > * { margin: 0; max-width: none; }
    .tile-05 .tile__title { grid-column: 1; grid-row: 1; }
    .tile-05 .tile__tagline { grid-column: 1; grid-row: 2; margin-top: 12px; }
    .tile-05 .tile__body { grid-column: 2; grid-row: 1 / span 2; }
    .tile-05 .tile__footer { grid-column: 1 / -1; }
  }

  /* CHALLENGE accent — tiles 05 + 06 get a rust marker */
  .tile-05 .tile__photo::before,
  .tile-06 .tile__photo::before {
    content: "";
    position: absolute;
    top: 16px; left: 16px;
    width: 8px; height: 8px;
    background: var(--rust);
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 0 0 4px rgba(196,41,46,.18);
  }

  /* tile lift on hover */
  @media (hover: hover) {
    .tile { transition-property: opacity, transform, filter; }
    .tile:not(.tile-03):not(.tile-06):hover { filter: brightness(1.02); }
  }

  /* ────────────────────────────────────────────── FOOTER STRIP ────────────────────────────────────────────── */
  .courses-footstrip {
    margin-top: clamp(96px, 10vw, 160px);
    padding-top: 32px;
    border-top: 1px solid var(--line);
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    align-items: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream-soft);
  }
  @media (min-width: 800px) {
    .courses-footstrip {
      grid-template-columns: auto 1fr auto;
      gap: 32px;
    }
  }
  .courses-footstrip__price {
    font-family: 'Anton', sans-serif;
    font-size: 28px;
    letter-spacing: 0;
    color: var(--gold);
    text-transform: none;
  }
  .courses-footstrip__rule { height: 1px; background: var(--line); }
  .courses-footstrip a {
    color: var(--cream);
    text-decoration: none;
    border: 1px solid var(--line);
    padding: 14px 22px;
    transition: background 220ms ease, color 220ms ease, border-color 220ms ease;
  }
  .courses-footstrip a:hover {
    background: var(--gold);
    color: var(--ink);
    border-color: var(--gold);
  }

  /* reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    .tile,
    .tile__photo img,
    .tile__numeral,
    .tile__cta,
    .tile__cta::after { transition: none !important; }
    .tile { opacity: 1 !important; transform: none !important; }
    @media (min-width: 1000px) {
      .tile-02, .tile-04, .tile-05 { transform: none !important; }
    }
  }


/* ===== 04-proof ===== */

  /* ──── PROOF SECTION ──────────────────────────────────────────────────────────────────────────────────── */
  .proof-section{
    position:relative;
    background:var(--ink);
    color:var(--cream);
    font-family:'Manrope',sans-serif;
    padding:clamp(80px,10vw,160px) clamp(24px,5vw,96px) clamp(96px,12vw,180px);
    overflow:hidden;
    isolation:isolate;
  }

  /* faint paper-grain wash so the ink doesn't read flat */
  .proof-section::before{
    content:"";
    position:absolute; inset:0;
    background:
      radial-gradient(1200px 800px at 12% -10%, rgba(212,175,55,.05), transparent 60%),
      radial-gradient(1000px 700px at 110% 110%, rgba(196,41,46,.045), transparent 55%);
    pointer-events:none;
    z-index:0;
  }

  .proof-section > *{ position:relative; z-index:1; }

  /* ──── MASTHEAD BAND ──────────────────────────────────────────────────────────────────────────────────── */
  .proof-section .ps-masthead{
    display:grid;
    grid-template-columns: 1fr auto;
    align-items:end;
    gap:32px;
    padding-bottom:28px;
    border-bottom:1px solid var(--line);
    margin-bottom:clamp(48px,6vw,88px);
  }

  .proof-section .ps-eyebrow{
    font-family:'JetBrains Mono',monospace;
    font-size:11px;
    letter-spacing:.28em;
    text-transform:uppercase;
    color:var(--gold);
    display:flex; align-items:center; gap:14px;
    margin-bottom:18px;
  }
  .proof-section .ps-eyebrow::before{
    content:""; width:32px; height:1px; background:var(--gold);
  }

  .proof-section .ps-headline{
    font-family:'Anton',sans-serif;
    font-weight:400;
    font-size:clamp(64px,11vw,168px);
    line-height:.86;
    letter-spacing:-.02em;
    margin:0;
    color:var(--cream);
    text-transform:uppercase;
  }
  .proof-section .ps-headline em{
    font-style:normal;
    color:var(--gold);
  }

  .proof-section .ps-folio{
    font-family:'JetBrains Mono',monospace;
    font-size:11px;
    letter-spacing:.24em;
    text-transform:uppercase;
    color:var(--cream-soft);
    text-align:right;
    line-height:1.6;
    white-space:nowrap;
  }
  .proof-section .ps-folio span{ color:var(--gold); }

  /* ──── PULL QUOTE SPREAD ──────────────────────────────────────────────────────────────────────────── */
  .proof-section .ps-quote{
    max-width:min(1180px, 100%);
    margin:0 auto clamp(64px,8vw,120px);
    padding:clamp(36px,5vw,72px) clamp(24px,4vw,56px);
    position:relative;
    border-top:1px solid var(--line);
    border-bottom:1px solid var(--line);
  }

  /* corner gold tick marks — magazine register marks */
  .proof-section .ps-quote::before,
  .proof-section .ps-quote::after{
    content:"";
    position:absolute;
    width:18px; height:18px;
    border:1px solid var(--gold);
    opacity:.7;
  }
  .proof-section .ps-quote::before{
    top:-1px; left:-1px;
    border-right:0; border-bottom:0;
  }
  .proof-section .ps-quote::after{
    bottom:-1px; right:-1px;
    border-left:0; border-top:0;
  }

  .proof-section .ps-quote-marker{
    font-family:'Fraunces',serif;
    font-style:italic;
    font-weight:300;
    font-size:clamp(120px,16vw,220px);
    line-height:.7;
    color:var(--gold);
    opacity:.55;
    position:absolute;
    top:clamp(-8px,-1vw,-4px);
    left:clamp(8px,2vw,28px);
    user-select:none;
    pointer-events:none;
  }

  .proof-section .ps-quote-body{
    font-family:'Fraunces',serif;
    font-variation-settings:"opsz" 144;
    font-style:italic;
    font-weight:300;
    font-size:clamp(28px,3.6vw,56px);
    line-height:1.18;
    letter-spacing:-.005em;
    color:var(--cream);
    margin:0 0 36px;
    max-width:24ch;
    margin-inline:auto;
    text-align:left;
    text-wrap:balance;
    /* entrance */
    opacity:0;
    letter-spacing:.02em;
    animation: ps-quote-in 1100ms cubic-bezier(.22,1,.36,1) forwards;
    animation-delay:120ms;
  }

  .proof-section .ps-quote-body::first-letter{
    font-weight:400;
    color:var(--gold);
  }

  .proof-section .ps-quote-attr{
    font-family:'JetBrains Mono',monospace;
    font-size:12px;
    letter-spacing:.32em;
    text-transform:uppercase;
    color:var(--gold);
    display:flex; align-items:center; gap:14px;
    max-width:24ch;
    margin-inline:auto;
  }
  .proof-section .ps-quote-attr::before{
    content:""; width:48px; height:1px; background:var(--gold); flex:none;
  }

  @keyframes ps-quote-in{
    from{ opacity:0; letter-spacing:.02em; }
    to  { opacity:1; letter-spacing:-.005em; }
  }

  /* ──── BIO + ANCHOR PORTRAIT ──────────────────────────────────────────────────────────────────── */
  .proof-section .ps-bio{
    display:grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr);
    gap:clamp(40px,6vw,96px);
    align-items:start;
    max-width:1320px;
    margin:0 auto clamp(64px,7vw,112px);
    padding-bottom:clamp(56px,7vw,96px);
    border-bottom:1px solid var(--line);
  }

  .proof-section .ps-bio-col{
    display:flex; flex-direction:column; gap:22px;
  }

  .proof-section .ps-bio-label{
    font-family:'JetBrains Mono',monospace;
    font-size:11px;
    letter-spacing:.28em;
    text-transform:uppercase;
    color:var(--cream-soft);
    display:flex; align-items:center; gap:12px;
    margin-bottom:6px;
  }
  .proof-section .ps-bio-label::before{
    content:""; width:24px; height:1px; background:var(--gold);
  }

  .proof-section .ps-bio p{
    font-family:'Manrope',sans-serif;
    font-size:clamp(16px,1.15vw,18px);
    line-height:1.65;
    color:var(--cream);
    margin:0;
    max-width:62ch;
  }
  .proof-section .ps-bio p:first-of-type{
    font-size:clamp(17px,1.25vw,20px);
    color:var(--cream);
  }
  .proof-section .ps-bio p:first-of-type::first-letter{
    font-family:'Fraunces',serif;
    font-style:normal;
    font-weight:400;
    font-size:5.2em;
    line-height:.85;
    float:left;
    padding:6px 12px 0 0;
    color:var(--gold);
  }
  .proof-section .ps-bio p strong{
    font-weight:600;
    color:var(--cream);
    background:linear-gradient(transparent 65%, rgba(212,175,55,.22) 65%);
    padding:0 2px;
  }

  .proof-section .ps-cta{
    align-self:flex-start;
    margin-top:14px;
    display:inline-flex;
    align-items:center;
    gap:14px;
    padding:14px 24px;
    border:1px solid var(--gold);
    background:transparent;
    color:var(--cream);
    font-family:'JetBrains Mono',monospace;
    font-size:12px;
    letter-spacing:.24em;
    text-transform:uppercase;
    text-decoration:none;
    transition:background 280ms ease, color 280ms ease, letter-spacing 280ms ease;
  }
  .proof-section .ps-cta:hover{
    background:var(--gold);
    color:var(--ink);
    letter-spacing:.28em;
  }
  .proof-section .ps-cta .ps-arrow{
    transition:transform 280ms cubic-bezier(.22,1,.36,1);
  }
  .proof-section .ps-cta:hover .ps-arrow{ transform:translateX(4px); }

  /* anchor portrait — second column */
  .proof-section .ps-anchor{
    position:relative;
    align-self:start;
    margin-top:8px;
  }
  .proof-section .ps-anchor-frame{
    position:relative;
    aspect-ratio: 4 / 5;
    border:1px solid rgba(212,175,55,.45);
    box-shadow:
      14px 14px 0 -1px rgba(212,175,55,.10),
      28px 28px 60px rgba(0,0,0,.5);
    overflow:hidden;
    background:var(--ink-2);
  }
  .proof-section .ps-anchor-frame img{
    width:100%; height:100%;
    object-fit:cover;
    display:block;
    filter:contrast(1.04) saturate(.92);
  }
  .proof-section .ps-anchor-cap{
    margin-top:14px;
    padding-top:12px;
    border-top:1px solid var(--gold);
    font-family:'JetBrains Mono',monospace;
    font-size:11px;
    letter-spacing:.22em;
    text-transform:uppercase;
    color:var(--gold);
    line-height:1.5;
  }
  .proof-section .ps-anchor-cap small{
    display:block;
    color:var(--cream-soft);
    font-size:10px;
    letter-spacing:.28em;
    margin-top:4px;
  }

  /* ──── STATS REGISTER ────────────────────────────────────────────────────────────────────────────────── */
  .proof-section .ps-stats{
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap:0;
    max-width:1320px;
    margin:0 auto clamp(72px,8vw,128px);
    border-top:1px solid var(--line);
    border-bottom:1px solid var(--line);
    padding:clamp(36px,4vw,56px) 0;
  }
  .proof-section .ps-stat{
    padding:0 clamp(20px,3vw,48px);
    border-right:1px solid var(--line);
    display:flex; flex-direction:column; gap:14px;
  }
  .proof-section .ps-stat:last-child{ border-right:0; }

  .proof-section .ps-stat-num{
    font-family:'Anton',sans-serif;
    font-weight:400;
    font-size:clamp(56px,7vw,108px);
    line-height:.9;
    letter-spacing:-.015em;
    color:var(--cream);
    display:flex;
    align-items:baseline;
    gap:4px;
  }
  .proof-section .ps-stat-num .ps-prefix,
  .proof-section .ps-stat-num .ps-suffix{
    color:var(--gold);
    font-size:.55em;
    line-height:1;
    letter-spacing:0;
  }
  .proof-section .ps-stat-num .ps-prefix{ margin-right:2px; }

  .proof-section .ps-stat-label{
    font-family:'JetBrains Mono',monospace;
    font-size:11px;
    letter-spacing:.24em;
    text-transform:uppercase;
    color:var(--cream-soft);
    line-height:1.55;
    max-width:24ch;
  }
  .proof-section .ps-stat-label b{
    color:var(--gold); font-weight:400;
  }

  /* count-up animation via CSS @property */
  @property --pscount{
    syntax:'<integer>';
    inherits:false;
    initial-value:0;
  }
  .proof-section .ps-stat[data-counter] .ps-stat-num .ps-value{
    counter-reset: ps-c var(--pscount);
  }
  .proof-section .ps-stat[data-counter] .ps-stat-num .ps-value::after{
    content: counter(ps-c);
  }
  .proof-section .ps-stats.is-inview .ps-stat[data-counter='25'] .ps-stat-num .ps-value{
    animation: ps-up-25 1800ms cubic-bezier(.22,1,.36,1) forwards;
  }
  .proof-section .ps-stats.is-inview .ps-stat[data-counter='250'] .ps-stat-num .ps-value{
    animation: ps-up-250 1800ms cubic-bezier(.22,1,.36,1) forwards;
  }
  @keyframes ps-up-25 { from{--pscount:0;} to{--pscount:25;} }
  @keyframes ps-up-250 { from{--pscount:0;} to{--pscount:250;} }

  /* ──── RECEIPTS GALLERY ────────────────────────────────────────────────────────────────────────────── */
  .proof-section .ps-receipts-head{
    max-width:1320px;
    margin:0 auto 36px;
    display:grid;
    grid-template-columns: 1fr auto;
    align-items:end;
    gap:24px;
    padding-bottom:18px;
    border-bottom:1px solid var(--line);
  }
  .proof-section .ps-receipts-title{
    font-family:'Anton',sans-serif;
    font-weight:400;
    font-size:clamp(36px,4.5vw,64px);
    line-height:1;
    letter-spacing:-.015em;
    color:var(--cream);
    text-transform:uppercase;
    margin:0;
  }
  .proof-section .ps-receipts-title em{
    font-style:normal; color:var(--gold);
  }
  .proof-section .ps-receipts-meta{
    font-family:'JetBrains Mono',monospace;
    font-size:11px;
    letter-spacing:.24em;
    text-transform:uppercase;
    color:var(--cream-soft);
    text-align:right;
    line-height:1.6;
  }
  .proof-section .ps-receipts-meta b{ color:var(--gold); font-weight:400; }

  .proof-section .ps-grid{
    max-width:1320px;
    margin:0 auto;
    display:grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: 84px;
    gap:clamp(14px,1.6vw,22px);
  }

  /* asymmetric placement — magazine collage */
  .proof-section .ps-frame{
    --frame-delay:0ms;
    position:relative;
    background:var(--ink-2);
    border:1px solid rgba(212,175,55,.35);
    box-shadow:
      10px 10px 0 -1px rgba(212,175,55,.08),
      22px 22px 50px rgba(0,0,0,.5);
    overflow:hidden;
    opacity:0;
    transform:translateY(8px);
    animation: ps-frame-in 800ms cubic-bezier(.22,1,.36,1) forwards;
    animation-delay: var(--frame-delay);
  }
  @keyframes ps-frame-in{
    to{ opacity:1; transform:none; }
  }

  .proof-section .ps-frame img{
    width:100%; height:100%;
    object-fit:cover;
    object-position:center top;
    display:block;
    filter:contrast(1.05) saturate(.94);
    transition:transform 900ms cubic-bezier(.22,1,.36,1), filter 600ms ease;
  }
  .proof-section .ps-frame:hover img{
    transform:scale(1.035);
    filter:contrast(1.08) saturate(1);
  }

  /* caption — sits below frame, hairline above */
  .proof-section .ps-cap{
    margin-top:12px;
    padding-top:10px;
    border-top:1px solid var(--gold);
    font-family:'JetBrains Mono',monospace;
    font-size:10.5px;
    letter-spacing:.22em;
    text-transform:uppercase;
    color:var(--gold);
    line-height:1.5;
  }

  /* tile = frame + caption wrapper */
  .proof-section .ps-tile{
    display:flex;
    flex-direction:column;
    min-width:0;
  }
  .proof-section .ps-tile .ps-frame{
    flex:1 1 auto;
  }

  /* asymmetric grid placements */
  .proof-section .ps-tile.t1 { grid-column: span 7; grid-row: span 5; }   /* shopify — hero proof */
  .proof-section .ps-tile.t2 { grid-column: span 5; grid-row: span 3; }   /* grant cardone */
  .proof-section .ps-tile.t3 { grid-column: span 5; grid-row: span 2; }   /* meta ads */
  .proof-section .ps-tile.t4 { grid-column: span 4; grid-row: span 4; }   /* petronas */
  .proof-section .ps-tile.t5 { grid-column: span 4; grid-row: span 4; }   /* bangkok mural */
  .proof-section .ps-tile.t6 { grid-column: span 4; grid-row: span 4; }   /* dev rig */

  .proof-section .ps-tile.t1 .ps-frame{ aspect-ratio: 16 / 10; }
  .proof-section .ps-tile.t1 .ps-frame img{
    object-fit: cover;
    object-position: center center;
  }
  .proof-section .ps-tile.t2 .ps-frame{ aspect-ratio:auto; }

  /* fade stagger */
  .proof-section .ps-tile.t1 .ps-frame{ --frame-delay:0ms; }
  .proof-section .ps-tile.t2 .ps-frame{ --frame-delay:60ms; }
  .proof-section .ps-tile.t3 .ps-frame{ --frame-delay:120ms; }
  .proof-section .ps-tile.t4 .ps-frame{ --frame-delay:180ms; }
  .proof-section .ps-tile.t5 .ps-frame{ --frame-delay:240ms; }
  .proof-section .ps-tile.t6 .ps-frame{ --frame-delay:300ms; }

  /* tiny corner badge on the hero proof tile */
  .proof-section .ps-tile.t1 .ps-frame::after{
    content:"VERIFIED · SHOPIFY EXPORT";
    position:absolute;
    top:14px; left:14px;
    background:rgba(11,11,12,.78);
    backdrop-filter:blur(6px);
    color:var(--gold);
    font-family:'JetBrains Mono',monospace;
    font-size:10px;
    letter-spacing:.22em;
    padding:6px 10px;
    border:1px solid rgba(212,175,55,.45);
    z-index:2;
  }

  /* ──── RESPONSIVE ────────────────────────────────────────────────────────────────────────────────────────── */
  @media (max-width: 1024px){
    .proof-section .ps-bio{
      grid-template-columns: 1fr;
      gap:48px;
    }
    .proof-section .ps-anchor{ max-width:480px; }
    .proof-section .ps-grid{ grid-auto-rows: 72px; }
    .proof-section .ps-tile.t1{ grid-column: span 12; grid-row: span 5; }
    .proof-section .ps-tile.t2{ grid-column: span 7; grid-row: span 4; }
    .proof-section .ps-tile.t3{ grid-column: span 5; grid-row: span 4; }
    .proof-section .ps-tile.t4{ grid-column: span 6; grid-row: span 4; }
    .proof-section .ps-tile.t5{ grid-column: span 6; grid-row: span 4; }
    .proof-section .ps-tile.t6{ grid-column: span 12; grid-row: span 4; }
  }

  @media (max-width: 720px){
    .proof-section{
      padding:72px 20px 96px;
    }
    .proof-section .ps-masthead{
      grid-template-columns: 1fr;
      align-items:start;
    }
    .proof-section .ps-folio{ text-align:left; }
    .proof-section .ps-quote-body{ font-size:clamp(22px,6vw,32px); max-width:100%; }
    .proof-section .ps-quote-attr{ max-width:100%; }
    .proof-section .ps-stats{ grid-template-columns:1fr; gap:28px; padding:28px 0; }
    .proof-section .ps-stat{ border-right:0; border-bottom:1px solid var(--line); padding:0 0 28px; }
    .proof-section .ps-stat:last-child{ border-bottom:0; padding-bottom:0; }
    .proof-section .ps-grid{ grid-template-columns: 1fr; grid-auto-rows: auto; }
    .proof-section .ps-tile.t1,
    .proof-section .ps-tile.t2,
    .proof-section .ps-tile.t3,
    .proof-section .ps-tile.t4,
    .proof-section .ps-tile.t5,
    .proof-section .ps-tile.t6{
      grid-column: span 1; grid-row: auto;
    }
    .proof-section .ps-tile .ps-frame{ aspect-ratio: 4/3; }
    .proof-section .ps-tile.t1 .ps-frame{ aspect-ratio: 16/10; }
  }

  /* ──── REDUCED MOTION ────────────────────────────────────────────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce){
    .proof-section .ps-quote-body,
    .proof-section .ps-frame{
      animation:none !important;
      opacity:1 !important;
      letter-spacing:normal !important;
      transform:none !important;
    }
    .proof-section .ps-stats.is-inview .ps-stat .ps-stat-num .ps-value{
      animation:none !important;
    }
    .proof-section .ps-stat[data-counter='25'] .ps-value::after{ content:"25"; }
    .proof-section .ps-stat[data-counter='250'] .ps-value::after{ content:"250"; }
  }


/* ===== 05-shell ===== */

  /* ============================================================
     1) SHELL-TOPBAR — masthead-style sticky nav
     ============================================================ */
  .shell-topbar {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 80;
    width: 100%;
    height: 80px;
    background: color-mix(in srgb, var(--ink) 88%, transparent);
    backdrop-filter: blur(14px) saturate(140%);
    -webkit-backdrop-filter: blur(14px) saturate(140%);
    border-bottom: 1px solid var(--line);
    transition: height .35s cubic-bezier(.2,.7,.2,1),
                background .35s ease,
                border-color .35s ease;
    font-family: 'Manrope', sans-serif;
    color: var(--cream);
  }
  .shell-topbar::after {
    content: "";
    position: absolute;
    left: 0; right: 0; bottom: -1px;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      var(--gold) 18%,
      var(--gold-bright) 50%,
      var(--gold) 82%,
      transparent 100%);
    opacity: .55;
    pointer-events: none;
  }
  .shell-topbar.is-scrolled {
    height: 64px;
    background: color-mix(in srgb, var(--ink) 94%, transparent);
  }

  .shell-topbar__inner {
    height: 100%;
    max-width: 1480px;
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 56px);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: clamp(16px, 4vw, 48px);
  }

  /* — Masthead logo block — */
  .shell-topbar__brand {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1;
    text-decoration: none;
  }
  .shell-topbar__brand-name {
    font-family: 'Anton', sans-serif;
    font-weight: 400;
    font-size: clamp(22px, 2.1vw, 28px);
    letter-spacing: .015em;
    color: var(--gold);
    text-transform: uppercase;
    line-height: .95;
    transition: font-size .35s cubic-bezier(.2,.7,.2,1), color .25s ease;
  }
  .shell-topbar.is-scrolled .shell-topbar__brand-name {
    font-size: clamp(18px, 1.6vw, 22px);
  }
  .shell-topbar__brand-name:hover {
    color: var(--gold-bright);
  }
  .shell-topbar__brand-sub {
    margin-top: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9.5px;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--cream-soft);
    transition: opacity .25s ease;
  }
  .shell-topbar.is-scrolled .shell-topbar__brand-sub {
    opacity: 0;
    pointer-events: none;
  }

  /* — Center inline pricing links — */
  .shell-topbar__center {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(18px, 2.4vw, 32px);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: .2em;
    text-transform: uppercase;
  }
  .shell-topbar__pill {
    color: var(--cream-soft);
    text-decoration: none;
    padding: 6px 0;
    position: relative;
    transition: color .2s ease;
  }
  .shell-topbar__pill::after {
    content: "";
    position: absolute;
    left: 0; bottom: 0;
    height: 1px;
    width: 0;
    background: var(--gold);
    transition: width .25s ease;
  }
  .shell-topbar__pill:hover {
    color: var(--gold-bright);
  }
  .shell-topbar__pill:hover::after {
    width: 100%;
  }
  .shell-topbar__pill em {
    font-style: normal;
    color: var(--gold);
    margin-left: 6px;
  }
  .shell-topbar__pill-divider {
    width: 1px;
    height: 14px;
    background: var(--line);
  }

  /* — Right side — */
  .shell-topbar__right {
    display: flex;
    align-items: center;
    gap: clamp(14px, 1.8vw, 22px);
  }
  .shell-topbar__login {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--cream-soft);
    text-decoration: none;
    padding: 8px 2px;
    border-bottom: 1px solid transparent;
    transition: color .2s ease, border-color .2s ease;
  }
  .shell-topbar__login:hover {
    color: var(--cream);
    border-bottom-color: var(--gold);
  }
  .shell-topbar__cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--ink);
    background: var(--gold);
    text-decoration: none;
    padding: 10px 16px;
    border: 1px solid var(--gold);
    border-radius: 1px;
    transition: background .2s ease, color .2s ease, transform .2s ease;
  }
  .shell-topbar__cta::after {
    content: "→";
    font-family: 'Manrope', sans-serif;
    letter-spacing: 0;
    transition: transform .2s ease;
  }
  .shell-topbar__cta:hover {
    background: var(--gold-bright);
  }
  .shell-topbar__cta:hover::after {
    transform: translateX(3px);
  }

  @media (max-width: 900px) {
    .shell-topbar__center { display: none; }
    .shell-topbar__inner { grid-template-columns: auto 1fr auto; }
  }
  @media (max-width: 560px) {
    .shell-topbar__brand-sub { display: none; }
    .shell-topbar__cta { padding: 9px 12px; font-size: 10px; }
  }


  /* ============================================================
     2) SHELL-MARQUEE — stock-ticker proof bar
     ============================================================ */
  .shell-marquee {
    position: relative;
    width: 100%;
    height: 50px;
    background: var(--ink-2);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    overflow: hidden;
    display: flex;
    align-items: center;
    isolation: isolate;
  }
  /* hairline gold rules over the ink-2 lines */
  .shell-marquee::before,
  .shell-marquee::after {
    content: "";
    position: absolute;
    left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent, var(--gold) 20%, var(--gold) 80%, transparent);
    opacity: .35;
    pointer-events: none;
    z-index: 2;
  }
  .shell-marquee::before { top: 0; }
  .shell-marquee::after  { bottom: 0; }

  /* edge fade so text doesn't cut hard at viewport edges */
  .shell-marquee__fade {
    position: absolute;
    top: 0; bottom: 0;
    width: 80px;
    z-index: 3;
    pointer-events: none;
  }
  .shell-marquee__fade--left {
    left: 0;
    background: linear-gradient(90deg, var(--ink-2), transparent);
  }
  .shell-marquee__fade--right {
    right: 0;
    background: linear-gradient(270deg, var(--ink-2), transparent);
  }

  .shell-marquee__track {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    width: max-content;
    animation: shell-marquee-scroll 30s linear infinite;
    will-change: transform;
  }
  .shell-marquee:hover .shell-marquee__track {
    animation-play-state: paused;
  }
  .shell-marquee__group {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    padding-right: 0;
  }
  .shell-marquee__item {
    display: inline-flex;
    align-items: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: var(--cream-soft);
    padding: 0 26px;
  }
  .shell-marquee__item--accent { color: var(--gold); }
  .shell-marquee__item--brand  { color: var(--cream); }
  .shell-marquee__sep {
    color: var(--cream-soft);
    opacity: .55;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    user-select: none;
  }

  @keyframes shell-marquee-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .shell-marquee__track { animation-duration: 120s; }
  }


  /* ============================================================
     3) SHELL-FOOTER — editorial colophon
     ============================================================ */
  .shell-footer {
    position: relative;
    width: 100%;
    background: var(--ink);
    color: var(--cream-soft);
    font-family: 'Manrope', sans-serif;
    padding: clamp(56px, 7vw, 96px) 0 32px;
    border-top: 1px solid var(--line);
    overflow: hidden;
  }
  .shell-footer::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent, var(--gold) 30%, var(--gold) 70%, transparent);
    opacity: .35;
    animation: shell-footer-hairline 1.2s ease-out both;
  }
  @keyframes shell-footer-hairline {
    from { opacity: 0; transform: scaleX(.6); }
    to   { opacity: .35; transform: scaleX(1); }
  }

  .shell-footer__inner {
    max-width: 1480px;
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 56px);
  }

  .shell-footer__grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: clamp(28px, 4vw, 64px);
    padding-bottom: clamp(40px, 6vw, 72px);
  }

  /* — Column 1: brand block — */
  .shell-footer__brand-name {
    font-family: 'Anton', sans-serif;
    font-weight: 400;
    font-size: clamp(34px, 3.6vw, 52px);
    letter-spacing: .01em;
    line-height: .9;
    color: var(--gold);
    text-transform: uppercase;
    margin: 0 0 18px;
  }
  .shell-footer__brand-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px;
    letter-spacing: .26em;
    text-transform: uppercase;
    color: var(--cream-soft);
    margin: 0 0 22px;
  }
  .shell-footer__brand-tagline {
    font-family: 'Fraunces', serif;
    font-weight: 300;
    font-style: italic;
    font-size: 15px;
    line-height: 1.5;
    color: var(--bone);
    max-width: 320px;
    margin: 0;
  }

  /* — Column headers + lists — */
  .shell-footer__col-head {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 22px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--line);
  }
  .shell-footer__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .shell-footer__link {
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    color: var(--cream-soft);
    text-decoration: none;
    transition: color .2s ease, transform .2s ease;
  }
  .shell-footer__link::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 1px;
    background: var(--gold);
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity .2s ease, transform .2s ease;
  }
  .shell-footer__link:hover {
    color: var(--gold-bright);
  }
  .shell-footer__link:hover::before {
    opacity: 1;
    transform: translateX(0);
  }
  .shell-footer__link-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-left: 6px;
  }

  /* — Bottom row — */
  .shell-footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding-top: 28px;
    border-top: 1px solid var(--line);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px;
    letter-spacing: .24em;
    text-transform: uppercase;
    color: var(--cream-soft);
  }
  .shell-footer__bottom-left {
    display: inline-flex;
    align-items: center;
    gap: 14px;
  }
  .shell-footer__copy strong {
    color: var(--cream);
    font-weight: 500;
    letter-spacing: .26em;
  }
  .shell-footer__divider {
    display: inline-block;
    width: 18px;
    height: 1px;
    background: var(--line);
  }
  .shell-footer__tag {
    color: var(--gold);
    border: 1px solid var(--line);
    padding: 6px 10px;
    border-radius: 1px;
    transition: border-color .2s ease, color .2s ease;
  }
  .shell-footer__tag:hover {
    border-color: var(--gold);
    color: var(--gold-bright);
  }

  @media (max-width: 1024px) {
    .shell-footer__grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 600px) {
    .shell-footer__grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .shell-footer__bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }
  }

  /* ═══ VSL SECTION ═══════════════════════════════════════════ */
  .vsl-section{
    background:var(--ink-2);
    border-top:1px solid var(--line);
    border-bottom:1px solid var(--line);
    padding:clamp(56px,8vw,112px) clamp(20px,5vw,56px);
  }
  .vsl-inner{
    max-width:860px;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:32px;
    text-align:center;
  }
  .vsl-eyebrow{
    font-family:'JetBrains Mono',monospace;
    font-size:11px; letter-spacing:.28em; text-transform:uppercase;
    color:var(--gold);
    display:flex; align-items:center; gap:14px;
  }
  .vsl-eyebrow::before,.vsl-eyebrow::after{
    content:""; width:32px; height:1px; background:var(--gold);
  }
  .vsl-headline{
    font-family:'Anton',sans-serif; font-weight:400;
    font-size:clamp(26px,4.5vw,52px);
    text-transform:uppercase; line-height:1.05;
    color:var(--cream); letter-spacing:.01em;
  }
  .vsl-headline em{
    font-family:'Fraunces',serif; font-style:italic; font-weight:500;
    text-transform:none; color:var(--gold-bright); letter-spacing:-.01em;
  }
  .vsl-topics{
    display:flex; flex-wrap:wrap; justify-content:center; gap:10px;
    max-width:680px;
  }
  .vsl-topic{
    font-family:'JetBrains Mono',monospace; font-size:10.5px;
    letter-spacing:.2em; text-transform:uppercase;
    color:var(--cream-soft);
    border:1px solid var(--line); padding:6px 12px; border-radius:2px;
  }
  .vsl-video-title{
    font-family:'Anton',sans-serif; font-weight:400;
    font-size:clamp(22px,3.8vw,42px);
    text-transform:uppercase; line-height:1.1;
    color:var(--gold-bright); letter-spacing:.02em;
    text-align:center; max-width:800px;
  }
  .vsl-player-wrap{
    width:100%; max-width:800px;
    border-radius:4px; overflow:hidden;
    border:1px solid rgba(212,175,55,.35);
    box-shadow:0 32px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(212,175,55,.08);
  }
  .vsl-player{
    position:relative; padding-bottom:56.25%; height:0;
    background:var(--ink);
  }
  .vsl-player iframe{
    position:absolute; inset:0; width:100%; height:100%; border:0;
  }
  .vsl-sub{
    font-family:'Fraunces',serif; font-style:italic; font-weight:300;
    font-size:clamp(16px,2vw,20px); color:var(--bone); line-height:1.5;
    max-width:560px;
  }
  .vsl-cta{
    display:inline-flex; align-items:center; gap:10px;
    background:var(--gold); color:var(--ink);
    font-family:'Manrope',sans-serif; font-weight:800;
    font-size:14px; letter-spacing:.1em; text-transform:uppercase;
    padding:16px 32px; border-radius:3px;
    transition:background .2s var(--ease), transform .2s var(--ease);
  }
  .vsl-cta:hover{ background:var(--gold-bright); transform:translateY(-2px); }
  .vsl-cta-arrow{ font-size:18px; }
  @media(max-width:600px){
    .vsl-topics{ gap:8px; }
    .vsl-topic{ font-size:10px; letter-spacing:.14em; }
  }


` }} />
      <Topbar />
      <Marquee />
      <main id="main" dangerouslySetInnerHTML={{ __html: `
<section class="hero-section" aria-label="Benji Boyce — The Empire">
  <div class="hero-grid">

    <!-- ──── LEFT: INK PANEL ────────────────────────────────────────────────────────────────────── -->
    <div class="hero-left">

      <div class="hero-rail">
        <div class="chapter">
          <span class="num">01</span>
          <span class="bar"></span>
          <span>06 — The Empire</span>
        </div>
        <div class="on-air" aria-label="Live every Tuesday">
          <span class="dot" aria-hidden="true"></span>
          <span>On Air · Tuesdays</span>
        </div>
      </div>

      <div class="hero-main">
        <div class="eyebrow">
          Benji Boyce <span>/</span> Operator, Founder, Caller-In-Chief
        </div>

        <h1 class="hero-headline">
          <span class="line l1"><span>I cold-call</span></span>
          <span class="line l2"><span>live every Tuesday<span class="amp">.</span></span></span>
          <span class="line l3"><span>You can have</span></span>
          <span class="line l4"><span>the whole playbook.</span></span>
        </h1>

        <p class="hero-lede">
          I'm Benji Boyce. I run a real agency, sell real software, and ship
          real client websites with Claude Code on YouTube every week.
          <strong>AI Empire Insider is $9/mo</strong> — every course, every prompt,
          GoHighLevel included, the full operator stack.
        </p>

        <div class="hero-ctas">
          <a class="btn btn-primary" href="/checkout/insider">
            <span>Join AI Empire Insider — $9/mo</span>
            <span class="arrow" aria-hidden="true">→</span>
          </a>
          <a class="btn btn-ghost" href="https://www.youtube.com/channel/UCT6RXVsmGY7U_LxcUFoVC0g" target="_blank" rel="noopener noreferrer">
            <span>Watch on YouTube</span>
            <span class="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div class="hero-ticker" aria-label="Receipts">
        <div class="stat">
          <span class="k">Portfolio</span>
          <span class="v">8<em>—figure</em></span>
        </div>
        <div class="stat">
          <span class="k">Live calls / wk</span>
          <span class="v">40<em>+</em></span>
        </div>
        <div class="stat">
          <span class="k">AI Empire Insider</span>
          <span class="v">$9<em>/mo</em></span>
        </div>
      </div>
    </div>

    <!-- ──── RIGHT: PHOTO PANEL ──────────────────────────────────────────────────────────────── -->
    <div class="hero-right">
      <div class="hero-photo" role="img" aria-label="Benji in Boss hoodie with Rolls Royce and Lamborghini Urus at night"></div>

      <div class="bracket tr" aria-hidden="true"></div>
      <div class="bracket bl" aria-hidden="true"></div>

      <div class="issue-tag">
        <span class="big">№ 01</span>
        Vol. MMXXVI · Empire Issue
      </div>

      <div class="photo-caption">
        Shot on location <span>·</span> Receipts in the driveway
      </div>

      <div class="photo-credit">
        <b>Benji Boyce</b> &nbsp;//&nbsp; The Operator, unedited
      </div>
    </div>

    <!-- ──── POLAROID on seam ──────────────────────────────────────────────────────────────────── -->
    <figure class="polaroid" aria-hidden="true">
      <img src="/images/headshot-pointing.jpg?v=5" alt="">
      <figcaption class="pcap">"yeah, you."</figcaption>
    </figure>

  </div>
</section>


<!-- ═══ VSL SECTION — swap YouTube ID when you have your sales letter video ═══ -->
<section class="vsl-section" aria-label="Watch before you decide">
  <div class="vsl-inner">

    <div class="vsl-eyebrow">Watch Before You Decide</div>

    <h2 class="vsl-headline">
      I spend 16 hours a day<br>building AI businesses.<br>
      <em>This is exactly what I do</em> — $9/mo gets you all of it.
    </h2>

    <div class="vsl-topics">
      <span class="vsl-topic">AI E-Commerce</span>
      <span class="vsl-topic">Client Marketing with AI</span>
      <span class="vsl-topic">Getting Clients with AI</span>
      <span class="vsl-topic">Writing Scripts with AI</span>
      <span class="vsl-topic">AI Videos for Clients</span>
      <span class="vsl-topic">Building Funnels with AI</span>
      <span class="vsl-topic">Cold Calling + AI</span>
    </div>

    <h3 class="vsl-video-title">Watch Me Call And Close A Deal EASY!!!!!!</h3>

    <div class="vsl-player-wrap">
      <div class="vsl-player">
        <iframe
          src="https://www.youtube.com/embed/qk-fOcz-4aw?start=393&rel=0&modestbranding=1&color=white"
          title="Watch Me Call And Close A Deal EASY"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <p class="vsl-sub">
      If this doesn&rsquo;t resonate in the first 5 minutes, close the tab.
      If it does, nine dollars will feel like a rounding error.
    </p>

    <a class="vsl-cta" href="#pricing">
      <span>Get AI Empire Insider — $9/mo</span>
      <span class="vsl-cta-arrow" aria-hidden="true">&nbsp;&rarr;</span>
    </a>

  </div>
</section>

<section class="pricing-section" id="pricing">
  <header class="pricing-masthead">
    <div class="pricing-eyebrow">
      <span>PRICING</span>
      <span class="pricing-eyebrow-meta">VOL. 02 · ISSUE 03 · OPERATOR EDITION</span>
    </div>
    <h2 class="pricing-headline">
      DIY or <span class="ph-amp">Done For You</span>.
    </h2>
    <p class="pricing-lede">
      <strong>$9/mo</strong> gets the full empire self-paced. <strong>Done For You Coaching</strong> adds the 30 Day Challenge plus <strong>one hour with Ben every week</strong> — launch pricing for the first 5 operators only.
    </p>
  </header>

  <div class="pricing-grid">

    <!-- ============== AI EMPIRE INSIDER ============== -->
    <article class="tier tier--insider" aria-labelledby="tier-insider-name">
      <div class="tier-ribbon">MEMBERSHIP</div>
      <div class="tier-eyebrow"><span>AI EMPIRE INSIDER</span></div>
      <h3 class="tier-name" id="tier-insider-name">AI EMPIRE INSIDER</h3>

      <div class="tier-price-row">
        <span class="tier-price"><span class="currency">$</span>9</span>
        <span class="tier-price-cadence">/ month</span>
      </div>
      <span class="tier-perminute">
        <span class="dot" aria-hidden="true"></span>
        GHL AI calling · $0.04 / min
      </span>

      <p class="tier-tagline">Every course. Every prompt. Every script. Free GoHighLevel. The whole empire.</p>

      <div class="tier-divider"><span>What's included</span></div>
      <ul class="tier-includes">
        <li><strong>Free GoHighLevel sub-account</strong> — yours to keep, set up within 24 hrs</li>
        <li>All <strong>4 courses</strong> — Cold Calling 2.0 + AI, AI Brand Builder, AI Marketing Engine, Empire OS</li>
        <li>Every AI prompt I run — Claude, Cursor, GPT</li>
        <li>Every script, template, SOP &amp; checklist</li>
        <li><strong>30 Day AI Website Empire Challenge</strong> — full playbook + 30 daily dial checklists (3,000 calls)</li>
        <li>Every script, template, SOP &amp; checklist (incl. Master Script + SKILL.md)</li>
        <li>30-Day AI Empire Challenge (daily email sequence)</li>
        <li>Private AI Empire Insider community</li>
        <li>Cancel anytime · 7-day refund</li>
      </ul>

      <div class="tier-foot">
        <a class="tier-cta tier-cta--gold" href="/checkout/insider">
          <span>Join AI Empire Insider — $9/mo</span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </article>

    <!-- ============== DONE FOR YOU COACHING ============== -->
    <article class="tier tier--coaching" aria-labelledby="tier-coaching-name">
      <div class="tier-ribbon">FIRST 5 SPOTS · LAUNCH PRICING</div>
      <div class="tier-eyebrow"><span>DONE FOR YOU COACHING</span></div>
      <h3 class="tier-name" id="tier-coaching-name">Done For You Coaching</h3>

      <div class="tier-price-row tier-price-row--stacked">
        <div class="tier-price-secondary">
          <span class="tier-price-strike" aria-label="Was 1000 per month">$1,000</span>
          <span class="tier-price"><span class="currency">$</span>599</span>
          <span class="tier-price-cadence">/ month</span>
        </div>
        <div class="tier-price-secondary" style="margin-top:10px">
          <span class="tier-price-strike" aria-label="Was 9997 per year">$9,997</span>
          <span class="tier-price"><span class="currency">$</span>4,997</span>
          <span class="tier-price-cadence">/ year</span>
        </div>
      </div>
      <span class="tier-perminute">
        <span class="dot" aria-hidden="true"></span>
        1 hour / week with Ben · live on Zoom
      </span>

      <p class="tier-tagline">We build the machine together — you still make 100 dials a day, but you are not guessing alone.</p>

      <div class="tier-divider"><span>What's included</span></div>
      <ul class="tier-includes">
        <li><strong>Everything in AI Empire Insider</strong> — all courses, prompts, GHL sub-account</li>
        <li><strong>30 Day AI Website Empire Challenge</strong> — full curriculum + daily dial checklists</li>
        <li><strong>52 hours/year</strong> of live coaching (1 hr × 52 weeks)</li>
        <li>Accountability, script review, pipeline + offer feedback</li>
        <li>Launch price locked for <strong>first 5 members</strong> — then rates go up</li>
      </ul>

      <div class="tier-foot">
        <a class="tier-cta tier-cta--gold" href="/checkout/done-with-you">
          <span>Apply for Done For You Coaching</span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
        <p class="tier-fineprint">Choose monthly or yearly at checkout · 7-day refund on first payment</p>
      </div>
    </article>

    <!-- ============== WHOLESALE GHL — hidden until relaunched ============== -->
    <article class="tier tier--featured" style="display:none" aria-labelledby="tier-wholesale-name">
      <div class="tier-ribbon">FIRST 100 SEATS · WAS $99</div>

      <div class="tier-eyebrow"><span>TIER 03 / WHOLESALE</span></div>
      <h3 class="tier-name" id="tier-wholesale-name">WHOLESALE GHL</h3>

      <div class="tier-price-row">
        <span class="tier-price-strike" aria-label="Original price 99 dollars">$99</span>
        <span class="tier-price"><span class="currency">$</span>49</span>
        <span class="tier-price-cadence">/ month, locked</span>
      </div>
      <span class="tier-perminute">
        <span class="dot" aria-hidden="true"></span>
        GHL · $0.015 / minute
      </span>

      <p class="tier-tagline">Just the software — at my wholesale rate.</p>

      <div class="scarcity" role="status" aria-live="polite">
        <span class="scarcity-pulse" aria-hidden="true"></span>
        <span><span class="scarcity-count" data-seats-left>87</span> of 100 left</span>
        <span class="scarcity-bar" aria-hidden="true"></span>
      </div>

      <div class="tier-divider"><span>What's included</span></div>
      <ul class="tier-includes">
        <li>GoHighLevel reseller sub-account</li>
        <li>Wholesale per-minute pricing — <strong>$0.015/min</strong> (62% cheaper than Insider tier)</li>
        <li><strong>Locked at $49/mo for life</strong> — never goes up</li>
        <li>Pure software access — NO courses, NO prompts</li>
        <li>For agencies running real call volume</li>
        <li>Only 100 seats. Then it goes back to $99 forever.</li>
      </ul>

      <div class="tier-foot">
        <a class="tier-cta tier-cta--gold-outline" href="/founders/">
          <span>Lock my $49 seat</span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
        <p class="tier-fineprint">Price held for life · 7-day refund · No contracts</p>
      </div>
    </article>

  </div>

  <div class="pricing-footnote">
    <span>Filed under <strong>Operator Pricing</strong> · benjisaiempire.com</span>
    <span>All tiers billed monthly. Cancel anytime.</span>
    <span>GHL minutes billed at-cost on top of subscription.</span>
  </div>
</section>

<section class="courses-section" id="the-bucket">
  <div class="courses-section__inner">

    <header class="courses-header">
      <div>
        <p class="courses-eyebrow">Included with AI Empire Insider — $9/mo</p>
        <h2 class="courses-display">
          Everything<br>
          <span class="outline">in the</span> <span class="accent">Empire</span>
        </h2>
      </div>
      <div>
        <p class="courses-lede">
          The <strong>30 Day AI Website Empire Challenge</strong> is the flagship — learn the stack, then 100 dials a day for 30 days. Four skill courses live now, three more dropping soon. Every prompt, script, and GoHighLevel included.
          <em>All for nine dollars a month.</em>
        </p>
        <div class="courses-meta-row">
          <span><strong>01</strong>Flagship challenge</span>
          <span><strong>04</strong>Live courses</span>
          <span><strong>03</strong>Coming soon</span>
          <span><strong>$9</strong>/mo</span>
        </div>
      </div>
    </header>

    <div class="courses-grid">

      <!-- 01 / FLAGSHIP — 30 Day AI Website Empire Challenge -->
      <a class="tile tile-01 is-in" style="--i:0" href="/learn/30-day-ai-website-empire-challenge" aria-label="30 Day AI Website Empire Challenge">
        <span class="tile__numeral" aria-hidden="true">01</span>
        <div class="tile__photo">
          <img src="/images/course-marketing-engine.jpg?v=5" alt="30 Day AI Website Empire Challenge" loading="lazy">
        </div>
        <div class="tile__copy">
          <div class="tile__kicker">
            <span class="index">N&deg; 01</span>
            <span class="rule"></span>
            <span class="type">Challenge &middot; Flagship</span>
          </div>
          <h3 class="tile__title">30 Day AI Website Empire Challenge</h3>
          <p class="tile__tagline">&ldquo;Learn the stack. Then 100 dials a day for 30 days.&rdquo;</p>
          <p class="tile__body">Domain, Cloudflare, GHL pipeline, free-site offer, AI redesigns, Master Script — then 3,000 dials. Do the work, don&rsquo;t make money? Full refund.</p>
          <div class="tile__footer">
            <span class="tile__meta">48 modules &middot; 18 learn + 30 checklists</span>
            <span class="tile__cta">Start challenge</span>
          </div>
        </div>
      </a>

      <!-- 02 / COURSE — Cold Calling 2.0 + AI -->
      <a class="tile tile-02 is-in" style="--i:1" href="/courses/cold-calling/" aria-label="Cold Calling 2.0 + AI — course">
        <span class="tile__numeral" aria-hidden="true">02</span>
        <div class="tile__photo">
          <img src="/images/course-cold-calling.jpg?v=5" alt="Cold Calling 2.0 + AI course" loading="lazy">
        </div>
        <div class="tile__copy">
          <div class="tile__kicker">
            <span class="index">N&deg; 02</span>
            <span class="rule"></span>
            <span class="type">Course</span>
          </div>
          <h3 class="tile__title">Cold Calling 2.0 + AI</h3>
          <p class="tile__tagline">&ldquo;The exact system I run live every Tuesday.&rdquo;</p>
          <p class="tile__body">AI prospecting, the Master Script, objection handling, follow-up cadence that actually closes.</p>
          <div class="tile__footer">
            <span class="tile__meta">8 modules &middot; &asymp;4 hours</span>
            <span class="tile__cta">Open course</span>
          </div>
        </div>
      </a>

      <!-- 03 / COURSE — AI Marketing Engine (full-bleed spread) -->
      <a class="tile tile-03 is-in" style="--i:2" href="/courses/marketing-engine/" aria-label="AI Marketing Engine — course">
        <span class="tile__numeral" aria-hidden="true">03</span>
        <div class="tile__photo">
          <img src="/images/course-marketing-engine.jpg?v=5" alt="AI Marketing Engine course" loading="lazy">
        </div>
        <div class="tile__copy">
          <div class="tile__kicker" style="grid-column:1/-1;">
            <span class="index">N&deg; 03</span>
            <span class="rule"></span>
            <span class="type">Course &middot; Cover Story</span>
          </div>
          <h3 class="tile__title">AI Marketing Engine</h3>
          <p class="tile__tagline">&ldquo;One Tuesday Live &rarr; 14 pieces of content.&rdquo;</p>
          <p class="tile__body">The Pillar-to-Derivative Cascade. Full prompt + automation stack. The thing I actually run in the background while I sleep.</p>
          <div class="tile__footer">
            <span class="tile__meta">9 modules &middot; &asymp;5 hours</span>
            <span class="tile__cta">Open course</span>
          </div>
        </div>
      </a>

      <!-- 04 / COURSE — AI Brand Builder -->
      <a class="tile tile-04 is-in" style="--i:3" href="/courses/brand-builder/" aria-label="AI Brand Builder — course">
        <span class="tile__numeral" aria-hidden="true">04</span>
        <div class="tile__photo">
          <img src="/images/course-brand-builder.jpg?v=5" alt="AI Brand Builder course" loading="lazy">
        </div>
        <div class="tile__copy">
          <div class="tile__kicker">
            <span class="index">N&deg; 04</span>
            <span class="rule"></span>
            <span class="type">Course</span>
          </div>
          <h3 class="tile__title">AI Brand Builder</h3>
          <p class="tile__tagline">&ldquo;Blank page to a brand that converts.&rdquo;</p>
          <p class="tile__body">Positioning, voice, identity, content. AI as a co-pilot &mdash; not a crutch.</p>
          <div class="tile__footer">
            <span class="tile__meta">7 modules &middot; &asymp;3.5 hours</span>
            <span class="tile__cta">Open course</span>
          </div>
        </div>
      </a>

      <!-- 05 / COURSE — Empire OS -->
      <a class="tile tile-05 is-in" style="--i:4" href="/courses/empire-os/" aria-label="Empire OS — course">
        <span class="tile__numeral" aria-hidden="true">05</span>
        <div class="tile__photo">
          <img src="/images/course-empire-os.jpg?v=throne" alt="Empire OS course" loading="lazy">
        </div>
        <div class="tile__copy">
          <div class="tile__kicker">
            <span class="index">N&deg; 05</span>
            <span class="rule"></span>
            <span class="type">Course</span>
          </div>
          <h3 class="tile__title">Empire OS</h3>
          <p class="tile__tagline">&ldquo;How I run the agency.&rdquo;</p>
          <p class="tile__body">Systems, hires, finance, fulfillment. The boring stuff that compounds. The operating manual behind the YouTube.</p>
          <div class="tile__footer">
            <span class="tile__meta">10 modules &middot; &asymp;6 hours</span>
            <span class="tile__cta">Open course</span>
          </div>
        </div>
      </a>

      <div class="courses-soon-head">
        <p class="courses-soon-head__eyebrow">Dropping inside Insider</p>
        <h3 class="courses-soon-head__title">Coming Soon</h3>
      </div>

      <!-- 07 / COMING SOON — AI Brand Launch -->
      <article class="tile tile-07 tile--soon is-in" style="--i:6" aria-label="AI Brand Launch — coming soon">
        <span class="tile__numeral" aria-hidden="true">07</span>
        <div class="tile__photo">
          <span class="tile__soon-badge">Coming Soon</span>
          <img src="/images/course-brand-builder.jpg?v=7" alt="AI Brand Launch course preview" loading="lazy">
        </div>
        <div class="tile__copy">
          <div class="tile__kicker">
            <span class="index">N&deg; 07</span>
            <span class="rule"></span>
            <span class="type">Course &middot; Soon</span>
          </div>
          <h3 class="tile__title">AI Brand Launch</h3>
          <p class="tile__tagline">&ldquo;Build a physical product brand with AI.&rdquo;</p>
          <p class="tile__body">Packaging, labels, mockups, and launch creative &mdash; from blank SKU to shelf-ready brand without a design agency.</p>
          <div class="tile__footer">
            <span class="tile__meta">Insider $9/mo</span>
            <span class="tile__cta">Coming soon</span>
          </div>
        </div>
      </article>

      <!-- 08 / COMING SOON — AI Film Director -->
      <article class="tile tile-08 tile--soon is-in" style="--i:7" aria-label="AI Film Director — coming soon">
        <span class="tile__numeral" aria-hidden="true">08</span>
        <div class="tile__photo">
          <span class="tile__soon-badge">Coming Soon</span>
          <img src="/images/course-marketing-engine.jpg?v=7" alt="AI Film Director course preview" loading="lazy">
        </div>
        <div class="tile__copy">
          <div class="tile__kicker">
            <span class="index">N&deg; 08</span>
            <span class="rule"></span>
            <span class="type">Course &middot; Soon</span>
          </div>
          <h3 class="tile__title">AI Film Director</h3>
          <p class="tile__tagline">&ldquo;Cinematic commercials &amp; short films with AI.&rdquo;</p>
          <p class="tile__body">Storyboard, shot list, prompts, and edit rhythm for ads that look like you hired a crew &mdash; from your phone.</p>
          <div class="tile__footer">
            <span class="tile__meta">Insider $9/mo</span>
            <span class="tile__cta">Coming soon</span>
          </div>
        </div>
      </article>

      <!-- 09 / COMING SOON — AI Print Designer -->
      <article class="tile tile-09 tile--soon is-in" style="--i:8" aria-label="AI Print Designer — coming soon">
        <span class="tile__numeral" aria-hidden="true">09</span>
        <div class="tile__photo">
          <span class="tile__soon-badge">Coming Soon</span>
          <img src="/images/course-dev-rig.jpg?v=7" alt="AI Print Designer course preview" loading="lazy">
        </div>
        <div class="tile__copy">
          <div class="tile__kicker">
            <span class="index">N&deg; 09</span>
            <span class="rule"></span>
            <span class="type">Course &middot; Soon</span>
          </div>
          <h3 class="tile__title">AI Print Designer</h3>
          <p class="tile__tagline">&ldquo;Clients from Facebook groups. Residual print income.&rdquo;</p>
          <p class="tile__body">Win local businesses in FB groups, sell merch &amp; print design, and stack recurring orders with AI mockups.</p>
          <div class="tile__footer">
            <span class="tile__meta">Insider $9/mo</span>
            <span class="tile__cta">Coming soon</span>
          </div>
        </div>
      </article>

      <!-- 06 / FLAGSHIP CTA — Day 1 (closing spread) -->
      <a class="tile tile-06 is-in" style="--i:9" href="/learn/30-day-ai-website-empire-challenge" aria-label="30 Day AI Website Empire Challenge — start Day 1">
        <span class="tile__numeral" aria-hidden="true">06</span>
        <div class="tile__photo">
          <img src="/images/broll-bangkok.jpg?v=5" alt="30 Day AI Website Empire Challenge" loading="lazy">
        </div>
        <div class="tile__copy">
          <div class="tile__kicker" style="grid-column:1/-1;">
            <span class="index">N&deg; 06</span>
            <span class="rule"></span>
            <span class="type">Challenge &middot; Closing Spread</span>
          </div>
          <h3 class="tile__title">Start Day 1 — 100 Calls</h3>
          <p class="tile__tagline">&ldquo;Learn in Modules 1&ndash;18. Execute in Days 1&ndash;30.&rdquo;</p>
          <p class="tile__body">No new lessons on dial days &mdash; just the checklist. 3,000 calls. Build free sites. Collect $500 builds. Refund if you do the work and still don&rsquo;t make money.</p>
          <div class="tile__footer">
            <span class="tile__meta">Member portal &middot; Insider $9/mo</span>
            <span class="tile__cta">Open challenge</span>
          </div>
        </div>
      </a>

    </div>

    <div class="courses-footstrip">
      <span class="courses-footstrip__price">$9/mo</span>
      <span class="courses-footstrip__rule"></span>
      <a href="/insider/">Join AI Empire Insider &rarr;</a>
    </div>

  </div>

  
</section>

<section class="proof-section" id="proof" aria-labelledby="proof-headline">

  <!-- ZONE 1 · MASTHEAD -->
  <header class="ps-masthead">
    <div>
      <div class="ps-eyebrow">File — The Operator</div>
      <h2 class="ps-headline" id="proof-headline">Why Listen <em>To Me.</em></h2>
    </div>
    <div class="ps-folio">
      Nº <span>04</span><br>
      Receipts &amp; Bio
    </div>
  </header>

  <!-- ZONE 2 · PULL QUOTE -->
  <figure class="ps-quote">
    <span class="ps-quote-marker" aria-hidden="true">&ldquo;</span>
    <blockquote class="ps-quote-body">
      I&rsquo;m not a guru. I run real businesses. I cold-call live on YouTube every Tuesday because if I&rsquo;m going to teach this, I should be doing it in front of you &mdash; with my real list, my real script, and my real bad days mixed in with the good ones.
    </blockquote>
    <figcaption class="ps-quote-attr">Benji Boyce</figcaption>
  </figure>

  <!-- ZONE 3 · BIO + ANCHOR PORTRAIT -->
  <div class="ps-bio">
    <div class="ps-bio-col">
      <div class="ps-bio-label">Bio · The Short Version</div>
      <p>
        Multiple Shopify stores doing <strong>eight figures combined</strong>. A marketing agency. A published book on losing a million dollars in 364 days &mdash; so I could write the one on how to avoid it. Featured in <strong>Forbes, Yahoo Finance, Nasdaq, and LA Weekly</strong>. None of that matters more than this:
      </p>
      <p>
        I cold-call <strong>live, every Tuesday</strong>, in front of strangers, with a list nobody has scrubbed for me. If the script doesn&rsquo;t work, you&rsquo;ll hear it. If it works, you&rsquo;ll see why.
      </p>
      <a class="ps-cta" href="#pricing">
        <span>See pricing</span>
        <span class="ps-arrow" aria-hidden="true">&rarr;</span>
      </a>
    </div>

    <aside class="ps-anchor">
      <div class="ps-anchor-frame">
        <img src="/images/hero-throne.jpg?v=7" alt="Benji Boyce in the king's chair" loading="lazy">
      </div>
      <div class="ps-anchor-cap">
        The King&rsquo;s Chair &middot; Built On AI
        <small>Operator Portrait &middot; 2026</small>
      </div>
    </aside>
  </div>

  <!-- ZONE 4 · STATS REGISTER -->
  <div class="ps-stats" id="ps-stats">
    <div class="ps-stat" data-counter="25">
      <div class="ps-stat-num">
        <span class="ps-prefix">$</span><span class="ps-value">25</span><span class="ps-suffix">M+</span>
      </div>
      <div class="ps-stat-label">Ecommerce Sales <b>·</b> All Stores</div>
    </div>
    <div class="ps-stat" data-counter="250">
      <div class="ps-stat-num">
        <span class="ps-value">250</span><span class="ps-suffix">K+</span>
      </div>
      <div class="ps-stat-label">Shopify Orders <b>·</b> All Stores</div>
    </div>
    <div class="ps-stat">
      <div class="ps-stat-num">
        <span class="ps-value">1</span><span class="ps-suffix">B+</span>
      </div>
      <div class="ps-stat-label">Reddit Views <b>·</b> All-Time Reach</div>
    </div>
  </div>

  <!-- ZONE 5 · RECEIPTS GALLERY -->
  <div class="ps-receipts-head">
    <h3 class="ps-receipts-title">The <em>Receipts.</em></h3>
    <div class="ps-receipts-meta">
      Field Notes <b>·</b> 2024&ndash;2026<br>
      Six Frames <b>·</b> Verified
    </div>
  </div>

  <div class="ps-grid">

    <figure class="ps-tile t1">
      <div class="ps-frame">
        <img src="/images/proof-shopify-2-8m.jpg?v=7" alt="Shopify Plus dashboard — ecommerce revenue proof" loading="lazy">
      </div>
      <figcaption class="ps-cap">Shopify Plus Dashboard &middot; Verified</figcaption>
    </figure>

    <figure class="ps-tile t2">
      <div class="ps-frame">
        <img src="/images/proof-grant-cardone.jpg?v=5" alt="Ben standing with Grant Cardone" loading="lazy">
      </div>
      <figcaption class="ps-cap">With Grant Cardone &middot; 2024</figcaption>
    </figure>

    <figure class="ps-tile t3">
      <div class="ps-frame">
        <img src="/images/proof-meta-ads.jpg?v=5" alt="Meta Ads Manager showing four active campaigns" loading="lazy">
      </div>
      <figcaption class="ps-cap">Meta Ads &middot; 4 Active Campaigns</figcaption>
    </figure>

    <figure class="ps-tile t4">
      <div class="ps-frame">
        <img src="/images/hero-petronas.jpg?v=5" alt="Petronas Towers, Kuala Lumpur" loading="lazy">
      </div>
      <figcaption class="ps-cap">Build From Anywhere &middot; KL</figcaption>
    </figure>

    <figure class="ps-tile t5">
      <div class="ps-frame">
        <img src="/images/proof-floyd-mayweather.jpg?v=1" alt="Benji Boyce with Floyd Mayweather" loading="lazy">
      </div>
      <figcaption class="ps-cap">With Floyd Mayweather</figcaption>
    </figure>

    <figure class="ps-tile t6">
      <div class="ps-frame">
        <img src="/images/hero-throne.jpg?v=5" alt="Benji Boyce — built on AI" loading="lazy">
      </div>
      <figcaption class="ps-cap">Built On AI &middot; 2026</figcaption>
    </figure>

  </div>

  

</section>

` }} />
      <PortfolioSection />
      <Footer />
      <Script id="page-init-0" strategy="afterInteractive">{`(function () {
      var section = document.querySelector('#the-bucket');
      if (!section || section.dataset.observed === '1') return;
      section.dataset.observed = '1';
      var tiles = section.querySelectorAll('.tile');
      if (!('IntersectionObserver' in window)) {
        tiles.forEach(function (t) { t.classList.add('is-in'); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
      tiles.forEach(function (t) { io.observe(t); });
      setTimeout(function () {
        tiles.forEach(function (t) { t.classList.add('is-in'); });
      }, 1200);
    })();`}</Script>
      <Script id="page-init-1" strategy="afterInteractive">{`(function(){
      var stats = document.getElementById('ps-stats');
      if(!stats || !('IntersectionObserver' in window)){
        if(stats) stats.classList.add('is-inview');
        return;
      }
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            stats.classList.add('is-inview');
            io.disconnect();
          }
        });
      }, { threshold: 0.35 });
      io.observe(stats);
    })();`}</Script>
    </>
  );
}
