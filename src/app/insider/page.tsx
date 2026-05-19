import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Empire Insider — $9/mo · Every Course, Free GoHighLevel, Every Prompt | Benji's AI Empire",
  description: "Nine dollars a month gets you every AI course I teach, every prompt I run, every script I send, a free GoHighLevel sub-account, and the private AI Empire Insider community.",
  alternates: { canonical: "https://benjisaiempire.com/insider/" },
  openGraph: { title: "AI Empire Insider — $9/mo · Everything You Need to Build an AI Business", description: "Free GoHighLevel sub-account + 4 courses + every prompt + every script. $9/mo. Cancel anytime.", url: "https://benjisaiempire.com/insider/", images: [{ url: "https://benjisaiempire.com/images/course-marketing-engine.jpg?v=2" }], type: "website" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  /* ─── PAGE WRAP ─────────────────────────────────────────────── */
  .ins-main { background:var(--ink); color:var(--cream); }
  .ins-wrap { max-width:var(--container); margin:0 auto; padding:0 clamp(20px,4vw,56px); }

  /* shared editorial typography */
  .ins-eyebrow{
    font-family:'JetBrains Mono',monospace;
    font-size:11px; letter-spacing:.28em; text-transform:uppercase;
    color:var(--gold); display:inline-flex; align-items:center; gap:10px;
  }
  .ins-eyebrow::before{
    content:""; width:28px; height:1px; background:var(--gold); display:inline-block;
  }
  .ins-rule{
    height:1px; background:linear-gradient(90deg,transparent,var(--gold) 18%,var(--gold) 82%,transparent);
    opacity:.5; margin:0;
  }
  .ins-display{
    font-family:'Anton',sans-serif; font-weight:400;
    text-transform:uppercase; letter-spacing:.005em;
    line-height:.92; color:var(--cream);
  }
  .ins-display em{
    font-family:'Fraunces',serif; font-style:italic; font-weight:500;
    text-transform:none; letter-spacing:-.01em; color:var(--gold-bright);
  }
  .ins-lede{
    font-family:'Fraunces',serif; font-style:italic; font-weight:300;
    color:var(--bone); line-height:1.45;
  }
  .ins-mono{
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.24em; text-transform:uppercase; color:var(--cream-soft);
  }

  /* ─── HERO ─────────────────────────────────────────────────── */
  .ins-hero{
    position:relative; isolation:isolate;
    padding:clamp(64px,8vw,120px) 0 clamp(48px,6vw,96px);
    border-bottom:1px solid var(--line);
    overflow:hidden;
  }
  .ins-hero::before{
    content:""; position:absolute; inset:0;
    background-image:
      radial-gradient(rgba(244,236,216,.045) 1px, transparent 1px),
      radial-gradient(rgba(11,11,12,.06) 1px, transparent 1px);
    background-size:3px 3px, 5px 5px;
    background-position:0 0, 1px 2px;
    mix-blend-mode:overlay; pointer-events:none; z-index:0; opacity:.55;
  }
  .ins-hero__grid{
    position:relative; z-index:1;
    display:grid; grid-template-columns:1.05fr .95fr;
    gap:clamp(40px,5vw,80px); align-items:center;
  }
  .ins-hero__rail{
    display:flex; justify-content:space-between; align-items:center;
    padding-bottom:18px; border-bottom:1px solid var(--line);
    margin-bottom:clamp(28px,3vw,40px);
  }
  .ins-hero__chapter{ font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.3em; color:var(--cream-soft); text-transform:uppercase; }
  .ins-hero__chapter strong{ color:var(--gold); font-weight:500; margin-right:6px; }
  .ins-hero__price-tag{
    font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.26em;
    text-transform:uppercase; color:var(--gold);
    border:1px solid var(--gold); padding:6px 10px; border-radius:1px;
  }
  .ins-hero__headline{
    font-size:clamp(56px,8.4vw,128px);
    margin:0 0 clamp(22px,2.4vw,32px);
  }
  .ins-hero__lede{
    font-size:clamp(19px,1.6vw,24px);
    max-width:560px; margin:0 0 clamp(28px,3vw,42px);
  }
  .ins-hero__meta-row{
    display:flex; flex-wrap:wrap; gap:clamp(20px,2.4vw,36px);
    padding:18px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line);
    margin-bottom:clamp(28px,3vw,40px);
  }
  .ins-hero__meta-cell{
    display:flex; flex-direction:column; gap:4px;
  }
  .ins-hero__meta-k{
    font-family:'JetBrains Mono',monospace; font-size:9.5px;
    letter-spacing:.28em; text-transform:uppercase; color:var(--cream-soft);
  }
  .ins-hero__meta-v{
    font-family:'Anton',sans-serif; font-size:22px; letter-spacing:.01em;
    text-transform:uppercase; color:var(--cream);
  }
  .ins-hero__meta-v em{ font-family:'Fraunces',serif; font-style:italic; font-weight:500; color:var(--gold); text-transform:none; }
  .ins-hero__ctas{ display:flex; flex-wrap:wrap; gap:14px; }
  .ins-btn{
    display:inline-flex; align-items:center; gap:10px;
    font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.22em;
    text-transform:uppercase; padding:16px 22px; border-radius:1px;
    transition:all .2s ease; border:1px solid transparent; cursor:pointer;
  }
  .ins-btn--gold{ background:var(--gold); color:var(--ink); border-color:var(--gold); font-weight:600; }
  .ins-btn--gold:hover{ background:var(--gold-bright); border-color:var(--gold-bright); transform:translateY(-1px); }
  .ins-btn--ghost{ background:transparent; color:var(--cream); border-color:var(--line); }
  .ins-btn--ghost:hover{ border-color:var(--gold); color:var(--gold-bright); }
  .ins-btn span.arrow{ transition:transform .2s ease; }
  .ins-btn:hover span.arrow{ transform:translateX(4px); }

  .ins-hero__photo{
    position:relative; aspect-ratio:4/5;
    border:1px solid var(--line); overflow:hidden;
    background:var(--ink-2);
  }
  .ins-hero__photo img{
    width:100%; height:100%; object-fit:cover;
    filter:saturate(.92) contrast(1.04);
  }
  .ins-hero__photo::after{
    content:""; position:absolute; inset:0;
    background:linear-gradient(180deg,transparent 60%, rgba(11,11,12,.55));
    pointer-events:none;
  }
  .ins-hero__caption{
    position:absolute; bottom:18px; left:18px; right:18px;
    z-index:2; display:flex; justify-content:space-between; align-items:flex-end;
    gap:14px;
  }
  .ins-hero__caption-l{
    font-family:'Fraunces',serif; font-style:italic; font-size:14px;
    color:var(--cream); max-width:70%;
  }
  .ins-hero__caption-r{
    font-family:'JetBrains Mono',monospace; font-size:9.5px;
    letter-spacing:.26em; color:var(--gold); text-transform:uppercase;
  }

  @media (max-width:900px){
    .ins-hero__grid{ grid-template-columns:1fr; }
    .ins-hero__photo{ order:-1; aspect-ratio:5/4; }
  }

  /* ─── BUCKET (centerpiece) ────────────────────────────────── */
  .ins-bucket{
    padding:clamp(72px,8vw,128px) 0;
    border-bottom:1px solid var(--line);
    position:relative;
  }
  .ins-bucket__head{
    display:grid; grid-template-columns:.9fr 1.1fr;
    gap:clamp(32px,4vw,64px); align-items:end;
    margin-bottom:clamp(48px,5vw,72px);
  }
  .ins-bucket__title{
    font-size:clamp(48px,6.4vw,96px);
    margin:14px 0 0;
  }
  .ins-bucket__lede{
    font-size:clamp(17px,1.4vw,21px);
    max-width:520px; padding-bottom:8px;
  }

  .ins-bucket__grid{
    display:grid;
    grid-template-columns:repeat(12,1fr);
    gap:1px;
    background:var(--line);
    border:1px solid var(--line);
  }
  .ins-tile{
    grid-column:span 4;
    background:var(--ink); padding:clamp(24px,2.4vw,38px);
    display:flex; flex-direction:column; gap:14px;
    min-height:280px;
    position:relative;
    transition:background .25s ease, transform .25s ease;
  }
  .ins-tile:hover{ background:var(--ink-2); }
  .ins-tile--wide{ grid-column:span 6; }
  .ins-tile--full{ grid-column:span 12; }
  .ins-tile--photo{ padding:0; min-height:340px; overflow:hidden; }
  .ins-tile__num{
    font-family:'Anton',sans-serif; font-size:clamp(38px,4.2vw,58px);
    color:var(--gold); letter-spacing:.01em; line-height:1;
  }
  .ins-tile__kicker{
    font-family:'JetBrains Mono',monospace; font-size:10.5px;
    letter-spacing:.26em; text-transform:uppercase; color:var(--cream-soft);
  }
  .ins-tile__title{
    font-family:'Anton',sans-serif; font-weight:400;
    font-size:clamp(24px,2.2vw,32px); letter-spacing:.005em;
    text-transform:uppercase; color:var(--cream); line-height:1;
    margin-top:auto;
  }
  .ins-tile__title em{
    font-family:'Fraunces',serif; font-style:italic; font-weight:500;
    color:var(--gold-bright); text-transform:none; letter-spacing:-.005em;
  }
  .ins-tile__desc{
    font-family:'Manrope',sans-serif; font-size:14px; line-height:1.55;
    color:var(--cream-soft); max-width:42ch;
  }
  .ins-tile__tag{
    align-self:flex-start;
    font-family:'JetBrains Mono',monospace; font-size:10px;
    letter-spacing:.24em; text-transform:uppercase; color:var(--gold);
    border:1px solid var(--gold); padding:4px 8px; border-radius:1px;
  }
  .ins-tile__photo-wrap{
    position:relative; width:100%; height:100%; min-height:340px;
    background:var(--ink-2);
  }
  .ins-tile__photo-wrap img{
    width:100%; height:100%; object-fit:cover; filter:saturate(.9) contrast(1.05);
  }
  .ins-tile__photo-wrap::after{
    content:""; position:absolute; inset:0;
    background:linear-gradient(180deg,transparent 40%, rgba(11,11,12,.85));
    pointer-events:none;
  }
  .ins-tile__photo-overlay{
    position:absolute; left:clamp(20px,2vw,32px); right:clamp(20px,2vw,32px);
    bottom:clamp(20px,2vw,32px); z-index:2;
    display:flex; flex-direction:column; gap:10px;
  }

  @media (max-width:1024px){
    .ins-tile{ grid-column:span 6; }
    .ins-tile--wide{ grid-column:span 6; }
    .ins-tile--full{ grid-column:span 12; }
  }
  @media (max-width:640px){
    .ins-bucket__head{ grid-template-columns:1fr; }
    .ins-tile, .ins-tile--wide{ grid-column:span 12; min-height:220px; }
  }

  /* ─── PULL QUOTE (Why $10) ──────────────────────────────── */
  .ins-pull{
    padding:clamp(80px,9vw,140px) 0;
    border-bottom:1px solid var(--line);
    background:linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%);
  }
  .ins-pull__inner{
    max-width:980px; margin:0 auto;
    padding:0 clamp(20px,4vw,56px);
    text-align:center;
  }
  .ins-pull__mark{
    font-family:'Fraunces',serif; font-style:italic; font-weight:500;
    font-size:clamp(80px,10vw,140px); line-height:1;
    color:var(--gold); opacity:.75; margin-bottom:-18px;
  }
  .ins-pull__quote{
    font-family:'Fraunces',serif; font-style:italic; font-weight:400;
    font-size:clamp(28px,3.4vw,48px); line-height:1.25;
    color:var(--cream); max-width:880px; margin:0 auto 36px;
  }
  .ins-pull__quote em{
    color:var(--gold-bright); font-weight:500;
  }
  .ins-pull__attr{
    display:inline-flex; align-items:center; gap:14px;
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.3em; text-transform:uppercase; color:var(--cream-soft);
  }
  .ins-pull__attr::before{
    content:""; width:32px; height:1px; background:var(--gold);
  }
  .ins-pull__attr strong{ color:var(--gold); font-weight:500; letter-spacing:.3em; }

  /* ─── MATH TABLE ──────────────────────────────────────── */
  .ins-math{
    padding:clamp(72px,8vw,120px) 0;
    border-bottom:1px solid var(--line);
  }
  .ins-math__head{
    display:flex; justify-content:space-between; align-items:flex-end;
    flex-wrap:wrap; gap:24px;
    padding-bottom:24px; border-bottom:1px solid var(--line);
    margin-bottom:clamp(36px,4vw,56px);
  }
  .ins-math__title{
    font-size:clamp(40px,5vw,72px); margin-top:14px;
  }
  .ins-math__sub{
    font-family:'Fraunces',serif; font-style:italic; font-size:17px;
    color:var(--bone); max-width:420px;
  }
  .ins-math__table{
    display:grid; grid-template-columns:1fr 1fr;
    gap:clamp(24px,3vw,48px);
  }
  .ins-math__col{
    border:1px solid var(--line);
    padding:clamp(28px,3vw,42px);
    background:var(--ink);
    position:relative;
  }
  .ins-math__col--insider{
    background:linear-gradient(180deg, var(--ink-2) 0%, var(--ink) 100%);
    border-color:var(--gold);
  }
  .ins-math__col-tag{
    font-family:'JetBrains Mono',monospace; font-size:10.5px;
    letter-spacing:.28em; text-transform:uppercase;
    color:var(--cream-soft); margin-bottom:14px;
  }
  .ins-math__col--insider .ins-math__col-tag{ color:var(--gold); }
  .ins-math__col-name{
    font-family:'Anton',sans-serif; font-size:clamp(28px,2.6vw,38px);
    letter-spacing:.005em; text-transform:uppercase; color:var(--cream);
    margin-bottom:24px;
  }
  .ins-math__list{
    list-style:none; padding:0; margin:0 0 24px;
    display:flex; flex-direction:column;
  }
  .ins-math__list li{
    display:flex; justify-content:space-between; align-items:baseline;
    gap:16px; padding:14px 0; border-bottom:1px dashed var(--line);
    font-family:'Manrope',sans-serif; font-size:15px; color:var(--cream);
  }
  .ins-math__list li:last-child{ border-bottom:none; }
  .ins-math__list li span:last-child{
    font-family:'JetBrains Mono',monospace; font-size:13px;
    color:var(--cream-soft); letter-spacing:.04em;
  }
  .ins-math__col--insider .ins-math__list li span:last-child{ color:var(--gold); }
  .ins-math__total{
    display:flex; justify-content:space-between; align-items:baseline;
    padding-top:18px; border-top:1px solid var(--line);
    font-family:'Anton',sans-serif; font-size:clamp(22px,2vw,28px);
    letter-spacing:.01em; text-transform:uppercase; color:var(--cream);
  }
  .ins-math__col--insider .ins-math__total{ color:var(--gold-bright); border-color:var(--gold); }
  .ins-math__total span:last-child{ font-family:'JetBrains Mono',monospace; font-size:18px; letter-spacing:.04em; }

  @media (max-width:760px){
    .ins-math__table{ grid-template-columns:1fr; }
  }

  /* ─── CLAIM ───────────────────────────────────────────── */
  .ins-claim{
    padding:clamp(80px,9vw,140px) 0;
    border-bottom:1px solid var(--line);
    background:var(--ink-2);
    position:relative;
  }
  .ins-claim::before{
    content:""; position:absolute; left:0; right:0; top:0; height:1px;
    background:linear-gradient(90deg,transparent,var(--gold) 30%,var(--gold) 70%,transparent);
    opacity:.5;
  }
  .ins-claim__inner{
    display:grid; grid-template-columns:.9fr 1.1fr;
    gap:clamp(40px,5vw,80px); align-items:start;
  }
  .ins-claim__title{
    font-size:clamp(44px,5.6vw,80px);
    margin:14px 0 24px;
  }
  .ins-claim__lede{
    font-size:clamp(17px,1.4vw,21px); max-width:440px; margin-bottom:24px;
  }
  .ins-claim__list{
    list-style:none; padding:0; margin:0;
    display:flex; flex-direction:column; gap:10px;
  }
  .ins-claim__list li{
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft);
    display:flex; align-items:center; gap:10px;
  }
  .ins-claim__list li::before{
    content:""; width:10px; height:1px; background:var(--gold);
  }
  .ghl-checkout-slot{
    border:1px dashed var(--line); padding:clamp(28px,3vw,44px);
    min-height:380px; background:var(--ink);
    display:flex; flex-direction:column; justify-content:center; align-items:center;
    text-align:center; gap:16px;
    position:relative;
  }
  .ghl-checkout-slot::before{
    content:"FORM SLOT"; position:absolute; top:14px; left:18px;
    font-family:'JetBrains Mono',monospace; font-size:9px;
    letter-spacing:.3em; color:var(--cream-soft);
  }
  .ghl-checkout-slot::after{
    content:""; position:absolute; top:14px; right:18px;
    width:8px; height:8px; border-radius:50%;
    background:var(--gold); box-shadow:0 0 0 4px rgba(212,175,55,.18);
  }
  .ghl-checkout-slot__title{
    font-family:'Anton',sans-serif; font-size:clamp(30px,3vw,44px);
    letter-spacing:.005em; text-transform:uppercase; color:var(--cream);
  }
  .ghl-checkout-slot__title em{
    font-family:'Fraunces',serif; font-style:italic; font-weight:500;
    color:var(--gold-bright); text-transform:none;
  }
  .ghl-checkout-slot__sub{
    font-family:'Fraunces',serif; font-style:italic; font-size:16px;
    color:var(--bone); max-width:360px;
  }
  .ghl-checkout-slot__cta{ margin-top:8px; }
  .ins-claim__caption{
    margin-top:18px; font-family:'JetBrains Mono',monospace;
    font-size:10.5px; letter-spacing:.24em; text-transform:uppercase;
    color:var(--cream-soft); line-height:1.7;
  }
  .ins-claim__caption strong{ color:var(--gold); font-weight:500; }
  .ins-claim__noscript{ display:block; margin-top:10px; color:var(--gold); }

  @media (max-width:900px){
    .ins-claim__inner{ grid-template-columns:1fr; }
  }

  /* ─── FAQ ─────────────────────────────────────────────── */
  .ins-faq{ padding:clamp(72px,8vw,128px) 0; border-bottom:1px solid var(--line); }
  .ins-faq__head{
    display:grid; grid-template-columns:.9fr 1.1fr;
    gap:clamp(32px,4vw,64px); align-items:end;
    padding-bottom:24px; border-bottom:1px solid var(--line);
    margin-bottom:clamp(40px,4vw,56px);
  }
  .ins-faq__title{ font-size:clamp(42px,5.4vw,80px); margin-top:14px; }
  .ins-faq__sub{ font-family:'Fraunces',serif; font-style:italic; font-size:17px; color:var(--bone); max-width:480px; }
  .ins-faq__list{
    display:grid; grid-template-columns:1fr; gap:0;
  }
  .ins-faq__item{
    display:grid; grid-template-columns:80px 1fr;
    gap:clamp(20px,3vw,48px);
    padding:clamp(28px,3vw,44px) 0;
    border-top:1px solid var(--line);
  }
  .ins-faq__item:last-child{ border-bottom:1px solid var(--line); }
  .ins-faq__num{
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.28em; text-transform:uppercase; color:var(--gold);
  }
  .ins-faq__q{
    font-family:'Anton',sans-serif; font-weight:400;
    font-size:clamp(22px,2.2vw,30px); letter-spacing:.005em;
    text-transform:uppercase; color:var(--cream); line-height:1.1;
    margin-bottom:14px;
  }
  .ins-faq__q em{ font-family:'Fraunces',serif; font-style:italic; font-weight:500; color:var(--gold-bright); text-transform:none; letter-spacing:-.005em; }
  .ins-faq__a{
    font-family:'Manrope',sans-serif; font-size:16px; line-height:1.65;
    color:var(--cream-soft); max-width:64ch;
  }
  .ins-faq__a strong{ color:var(--cream); font-weight:600; }
  @media (max-width:640px){
    .ins-faq__head{ grid-template-columns:1fr; }
    .ins-faq__item{ grid-template-columns:1fr; gap:14px; }
  }

  /* ─── CROSS-SELL ──────────────────────────────────────── */
  .ins-xsell{
    padding:clamp(56px,6vw,96px) 0;
    background:var(--ink);
  }
  .ins-xsell__inner{
    display:flex; justify-content:space-between; align-items:center;
    gap:clamp(24px,3vw,48px); flex-wrap:wrap;
    border:1px solid var(--line); padding:clamp(28px,3.5vw,52px);
    background:linear-gradient(135deg,var(--ink) 0%,var(--ink-2) 100%);
  }
  .ins-xsell__l{ display:flex; flex-direction:column; gap:8px; max-width:640px; }
  .ins-xsell__kicker{
    font-family:'JetBrains Mono',monospace; font-size:10.5px;
    letter-spacing:.28em; text-transform:uppercase; color:var(--gold);
  }
  .ins-xsell__h{
    font-family:'Anton',sans-serif; font-size:clamp(26px,2.6vw,38px);
    letter-spacing:.005em; text-transform:uppercase; color:var(--cream); line-height:1.05;
  }
  .ins-xsell__h em{ font-family:'Fraunces',serif; font-style:italic; font-weight:500; color:var(--gold-bright); text-transform:none; }
  .ins-xsell__sub{ font-family:'Fraunces',serif; font-style:italic; font-size:15px; color:var(--bone); max-width:520px; }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

  <!-- ═════ HERO ═════ -->
  <section class="ins-hero" aria-labelledby="hero-headline">
    <div class="ins-wrap">

      <div class="ins-hero__rail">
        <span class="ins-hero__chapter"><strong>AI Empire Insider</strong> / Everything · The Full Playbook</span>
        <span class="ins-hero__price-tag">$9 / mo · cancel anytime</span>
      </div>

      <div class="ins-hero__grid">

        <div class="ins-hero__copy">
          <div class="ins-eyebrow" style="margin-bottom:22px;">AI Empire Insider — Everything</div>
          <h1 class="ins-hero__headline ins-display" id="hero-headline">
            Nine dollars a&nbsp;month.<br><em>The whole empire.</em>
          </h1>
          <p class="ins-hero__lede ins-lede">
            Every course I teach, every prompt I run, every script I send, a free GoHighLevel
            sub-account, and the private AI Empire Insider community — bundled into one tier
            that costs less than a coffee twice a week.
          </p>

          <div class="ins-hero__meta-row" aria-label="Tier facts">
            <div class="ins-hero__meta-cell">
              <span class="ins-hero__meta-k">Price</span>
              <span class="ins-hero__meta-v">$9<em>/mo</em></span>
            </div>
            <div class="ins-hero__meta-cell">
              <span class="ins-hero__meta-k">Courses</span>
              <span class="ins-hero__meta-v">04 <em>included</em></span>
            </div>
            <div class="ins-hero__meta-cell">
              <span class="ins-hero__meta-k">GHL Minutes</span>
              <span class="ins-hero__meta-v">$0.04<em>/min</em></span>
            </div>
            <div class="ins-hero__meta-cell">
              <span class="ins-hero__meta-k">Lock-in</span>
              <span class="ins-hero__meta-v">None</span>
            </div>
          </div>

          <div class="ins-hero__ctas">
            <a class="ins-btn ins-btn--gold" href="#claim-form">
              Join AI Empire Insider — $9/mo <span class="arrow">→</span>
            </a>
            <a class="ins-btn ins-btn--ghost" href="/#pricing">
              See pricing <span class="arrow">→</span>
            </a>
          </div>
        </div>

        <figure class="ins-hero__photo" aria-hidden="false">
          <img src="/images/course-marketing-engine.jpg?v=2" alt="Streaming rig where Benji ships build days every Thursday" loading="eager" decoding="async" />
          <figcaption class="ins-hero__caption">
            <span class="ins-hero__caption-l">The same rig where every prompt, every script, every course gets recorded.</span>
            <span class="ins-hero__caption-r">Plate 02</span>
          </figcaption>
        </figure>

      </div>
    </div>
  </section>

  <!-- ═════ WHAT'S IN THE BUCKET ═════ -->
  <section class="ins-bucket" aria-labelledby="bucket-title">
    <div class="ins-wrap">

      <div class="ins-bucket__head">
        <div>
          <span class="ins-eyebrow">The Inventory</span>
          <h2 class="ins-bucket__title ins-display" id="bucket-title">
            What's in the&nbsp;<em>bucket.</em>
          </h2>
        </div>
        <p class="ins-bucket__lede ins-lede">
          Eleven things land in your account the second you click join. No drip schedule,
          no tease. The whole library — courses, prompts, scripts, the reseller account,
          the community — opens at once.
        </p>
      </div>

      <div class="ins-bucket__grid" role="list">

        <!-- 01 Cold Calling 2.0 -->
        <article class="ins-tile ins-tile--photo ins-tile--wide" role="listitem" aria-labelledby="tile-01-t">
          <div class="ins-tile__photo-wrap">
            <img src="/images/course-cold-calling.jpg?v=2" alt="Cold Calling 2.0 + AI course thumbnail" loading="lazy" decoding="async" />
            <div class="ins-tile__photo-overlay">
              <span class="ins-tile__num">01</span>
              <span class="ins-tile__kicker">Course · 6 Modules</span>
              <h3 class="ins-tile__title" id="tile-01-t">Cold Calling 2.0 <em>+ AI</em></h3>
              <p class="ins-tile__desc">The exact opener stack I run on the Tuesday lives — plus the AI prompts that pre-qualify, draft the follow-up, and book the meeting before you hang up.</p>
            </div>
          </div>
        </article>

        <!-- 02 AI Brand Builder -->
        <article class="ins-tile ins-tile--photo" role="listitem" aria-labelledby="tile-02-t">
          <div class="ins-tile__photo-wrap">
            <img src="/images/course-brand-builder.jpg?v=2" alt="AI Brand Builder course thumbnail" loading="lazy" decoding="async" />
            <div class="ins-tile__photo-overlay">
              <span class="ins-tile__num">02</span>
              <span class="ins-tile__kicker">Course · 5 Modules</span>
              <h3 class="ins-tile__title" id="tile-02-t">AI Brand <em>Builder</em></h3>
            </div>
          </div>
        </article>

        <!-- 03 Marketing Engine -->
        <article class="ins-tile ins-tile--photo" role="listitem" aria-labelledby="tile-03-t">
          <div class="ins-tile__photo-wrap">
            <img src="/images/course-marketing-engine.jpg?v=2" alt="AI Marketing Engine course thumbnail" loading="lazy" decoding="async" />
            <div class="ins-tile__photo-overlay">
              <span class="ins-tile__num">03</span>
              <span class="ins-tile__kicker">Course · 7 Modules</span>
              <h3 class="ins-tile__title" id="tile-03-t">AI Marketing <em>Engine</em></h3>
            </div>
          </div>
        </article>

        <!-- 04 Empire OS -->
        <article class="ins-tile ins-tile--photo ins-tile--wide" role="listitem" aria-labelledby="tile-04-t">
          <div class="ins-tile__photo-wrap">
            <img src="/images/course-empire-os.jpg?v=throne" alt="Empire OS course thumbnail" loading="lazy" decoding="async" />
            <div class="ins-tile__photo-overlay">
              <span class="ins-tile__num">04</span>
              <span class="ins-tile__kicker">Course · 8 Modules</span>
              <h3 class="ins-tile__title" id="tile-04-t">Empire <em>OS</em></h3>
              <p class="ins-tile__desc">The full agency operating system — pipeline, comp plan, daily KPIs, weekly cadence, the actual file structure I use to run the business.</p>
            </div>
          </div>
        </article>

        <!-- 05 Starter Kit -->
        <article class="ins-tile" role="listitem" aria-labelledby="tile-05-t">
          <span class="ins-tile__num">05</span>
          <span class="ins-tile__kicker">PDF + Scripts</span>
          <h3 class="ins-tile__title" id="tile-05-t">The Starter <em>Kit</em></h3>
          <p class="ins-tile__desc">42-page playbook plus the cold-call scripts I use on every dial. The same file goes out to every new operator on day one.</p>
        </article>

        <!-- 06 Empire Challenge -->
        <article class="ins-tile" role="listitem" aria-labelledby="tile-06-t">
          <span class="ins-tile__num">06</span>
          <span class="ins-tile__kicker">30-Day · Daily Email</span>
          <h3 class="ins-tile__title" id="tile-06-t">30-Day Empire <em>Challenge</em></h3>
          <p class="ins-tile__desc">One assignment per morning. By day 30 you've got a working brand, a list, a pipeline, and a real first month of revenue tracked in the open.</p>
        </article>

        <!-- 07 Cold Calling Challenge -->
        <article class="ins-tile" role="listitem" aria-labelledby="tile-07-t">
          <span class="ins-tile__num">07</span>
          <span class="ins-tile__kicker">30-Day · Daily Email</span>
          <h3 class="ins-tile__title" id="tile-07-t">30-Day Cold-Calling <em>Challenge</em></h3>
          <p class="ins-tile__desc">A specific dial target every day, plus the recorded teardown of my own calls so you know exactly what closed and what didn't.</p>
        </article>

        <!-- 08 Prompts -->
        <article class="ins-tile ins-tile--wide" role="listitem" aria-labelledby="tile-08-t">
          <span class="ins-tile__tag">Updated weekly</span>
          <span class="ins-tile__num">08</span>
          <span class="ins-tile__kicker">Claude · Cursor · GPT</span>
          <h3 class="ins-tile__title" id="tile-08-t">Every prompt <em>I run</em></h3>
          <p class="ins-tile__desc">The actual prompt files from my Claude projects, my Cursor rules, and the GPTs I use to draft cold emails, write SEO pages, and generate ad creative. Pulled from my live working set, not theoretical examples.</p>
        </article>

        <!-- 09 Scripts/SOPs -->
        <article class="ins-tile" role="listitem" aria-labelledby="tile-09-t">
          <span class="ins-tile__num">09</span>
          <span class="ins-tile__kicker">Templates · SOPs</span>
          <h3 class="ins-tile__title" id="tile-09-t">Every script, <em>every SOP</em></h3>
          <p class="ins-tile__desc">Sales scripts, onboarding SOPs, hiring checklists, weekly KPI dashboards. The operator's filing cabinet.</p>
        </article>

        <!-- 10 GHL Reseller -->
        <article class="ins-tile" role="listitem" aria-labelledby="tile-10-t">
          <span class="ins-tile__tag">Live account</span>
          <span class="ins-tile__num">10</span>
          <span class="ins-tile__kicker">Sub-account · $0.04/min</span>
          <h3 class="ins-tile__title" id="tile-10-t">GoHighLevel <em>reseller</em></h3>
          <p class="ins-tile__desc">A working GHL sub-account on my reseller plan. Pay four cents a minute for AI calls. No $297/mo agency tier required.</p>
        </article>

        <!-- 11 Community -->
        <article class="ins-tile ins-tile--wide" role="listitem" aria-labelledby="tile-11-t">
          <span class="ins-tile__num">11</span>
          <span class="ins-tile__kicker">Private · Members Only</span>
          <h3 class="ins-tile__title" id="tile-11-t">The Insider <em>community</em></h3>
          <p class="ins-tile__desc">Where operators trade what's working in real time. Friday Q&amp;A digest, daily wins thread, the call-review channel where I drop notes on member recordings.</p>
        </article>

      </div>
    </div>
  </section>

  <!-- ═════ WHY $9 ═════ -->
  <section class="ins-pull" aria-labelledby="pull-q">
    <div class="ins-pull__inner">
      <div class="ins-pull__mark" aria-hidden="true">"</div>
      <p class="ins-pull__quote" id="pull-q">
        I want every operator who's serious to have this. Nine dollars is the price of a coffee
        twice a week. <em>I'm not building a $2K mastermind</em> — I'm building a community
        that actually ships.
      </p>
      <span class="ins-pull__attr"><strong>Benji Boyce</strong> · Founder, Advanced Marketing</span>
    </div>
  </section>

  <!-- ═════ THE MATH ═════ -->
  <section class="ins-math" aria-labelledby="math-title">
    <div class="ins-wrap">

      <div class="ins-math__head">
        <div>
          <span class="ins-eyebrow">The Math</span>
          <h2 class="ins-math__title ins-display" id="math-title">
            What this <em>actually</em> replaces.
          </h2>
        </div>
        <p class="ins-math__sub">Same stack, two different price tags. The line items don't lie.</p>
      </div>

      <div class="ins-math__table">
        <div class="ins-math__col">
          <div class="ins-math__col-tag">Typical operator stack — Year 01</div>
          <div class="ins-math__col-name">The Old Way</div>
          <ul class="ins-math__list">
            <li><span>GoHighLevel agency tier</span><span>$297 / mo</span></li>
            <li><span>4 separate AI / sales courses</span><span>~$2,000</span></li>
            <li><span>Paid community / mastermind</span><span>$99 / mo</span></li>
            <li><span>Prompt packs · script bundles</span><span>~$400</span></li>
          </ul>
          <div class="ins-math__total"><span>Year One</span><span>$2,500+</span></div>
        </div>

        <div class="ins-math__col ins-math__col--insider">
          <div class="ins-math__col-tag">AI Empire Insider — Year 01</div>
          <div class="ins-math__col-name">The Empire</div>
          <ul class="ins-math__list">
            <li><span>Free GoHighLevel sub-account</span><span>Included</span></li>
            <li><span>Four full AI courses</span><span>Included</span></li>
            <li><span>Every prompt · script · SOP</span><span>Included</span></li>
            <li><span>Private AI Empire Insider community</span><span>Included</span></li>
            <li><span>GHL AI calling minutes</span><span>$0.04 / min</span></li>
          </ul>
          <div class="ins-math__total"><span>Year One</span><span>$108</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═════ CLAIM ═════ -->
  <section class="ins-claim" id="claim-form" aria-labelledby="claim-title">
    <div class="ins-wrap">
      <div class="ins-claim__inner">

        <div class="ins-claim__l">
          <span class="ins-eyebrow">Claim</span>
          <h2 class="ins-claim__title ins-display" id="claim-title">
            Take the&nbsp;<em>whole empire.</em>
          </h2>
          <p class="ins-claim__lede ins-lede">
            One form. Nine dollars. Access provisioned the second the charge clears.
            Cancel from your dashboard anytime — no email-the-support-team gauntlet.
          </p>
          <ul class="ins-claim__list">
            <li>Free GoHighLevel sub-account — set up same day</li>
            <li>Instant access to all four AI courses</li>
            <li>AI Empire Insider community invite within 60 seconds</li>
            <li>Cancel inside the dashboard, one click</li>
          </ul>
        </div>

        <div class="ins-claim__r">
          <div class="ghl-checkout-slot" data-ghl-product="insider-9" role="region" aria-label="AI Empire Insider checkout">
            <h3 class="ghl-checkout-slot__title">$9<em>/mo</em></h3>
            <p class="ghl-checkout-slot__sub">Stripe handles the card — access provisioned instantly. Free GoHighLevel sub-account set up same day.</p>
            <a class="ins-btn ins-btn--gold ghl-checkout-slot__cta" href="/api/stripe/checkout" data-tier="INSIDER">
              Join AI Empire Insider — $9/mo <span class="arrow">→</span>
            </a>
          </div>
          <noscript>
            <p class="ins-claim__noscript">JavaScript off? <a href="/login" style="color:var(--gold-bright); text-decoration:underline;">Sign in to join AI Empire Insider.</a></p>
          </noscript>
          <p class="ins-claim__caption">
            Form wires to <strong>GoHighLevel</strong> checkout · <strong>Stripe</strong> handles payment · access provisioned <strong>instantly</strong>
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- ═════ FAQ ═════ -->
  <section class="ins-faq" aria-labelledby="faq-title">
    <div class="ins-wrap">

      <div class="ins-faq__head">
        <div>
          <span class="ins-eyebrow">FAQ</span>
          <h2 class="ins-faq__title ins-display" id="faq-title">
            Five questions <em>I get</em> a lot.
          </h2>
        </div>
        <p class="ins-faq__sub">If something's not here, ask in the community on day one — I read every post.</p>
      </div>

      <div class="ins-faq__list">

        <article class="ins-faq__item">
          <span class="ins-faq__num">01</span>
          <div>
            <h3 class="ins-faq__q">What if I only want <em>one</em> course?</h3>
            <p class="ins-faq__a">There's no single-course tier. The math doesn't work — even one course at standalone agency-school pricing runs $300-$2,000. <strong>The whole empire is $9.</strong> Take it for a month, watch the one you came for, cancel if the rest isn't useful. You're still up two grand.</p>
          </div>
        </article>

        <article class="ins-faq__item">
          <span class="ins-faq__num">02</span>
          <div>
            <h3 class="ins-faq__q">Can I <em>cancel</em> anytime?</h3>
            <p class="ins-faq__a">Yes. One click inside your dashboard. No "let me transfer you to retention," no 30-day notice, no clawback. The next month doesn't bill.</p>
          </div>
        </article>

        <article class="ins-faq__item">
          <span class="ins-faq__num">03</span>
          <div>
            <h3 class="ins-faq__q">Why is this <em>so cheap</em>?</h3>
            <p class="ins-faq__a">Because I'm not running a coaching business — I'm running an agency that publishes its work. The courses, prompts, and SOPs already exist for my own ops. Charging ten bucks pays for hosting, support, and a community that pays attention. <strong>Volume + a small wholesale margin on GHL minutes is the model.</strong> The mastermind tier you're imagining isn't here.</p>
          </div>
        </article>

        <article class="ins-faq__item">
          <span class="ins-faq__num">04</span>
          <div>
            <h3 class="ins-faq__q">Do I get GHL <em>minutes</em> with this?</h3>
            <p class="ins-faq__a">You get a sub-account on my reseller plan with calling priced at $0.04/minute pay-as-you-go. No $297/mo agency tier required. If you're running heavy call volume — north of about 8,000 minutes a month — the wholesale tier below makes more sense.</p>
          </div>
        </article>

        <article class="ins-faq__item">
          <span class="ins-faq__num">05</span>
          <div>
            <h3 class="ins-faq__q">What's the <em>Wholesale GHL</em> upgrade?</h3>
            <p class="ins-faq__a"><strong>$49/mo Wholesale GHL</strong> — was $99, first 100 operators only. It's strictly the GHL reseller piece at $0.015/min instead of $0.04. <em>No courses, no prompts, no community.</em> Pure infrastructure for high-volume callers. You can run Insider and Wholesale together, or just Wholesale on its own.</p>
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- ═════ CROSS-SELL ═════ -->
  <section class="ins-xsell" aria-labelledby="xsell-h">
    <div class="ins-wrap">
      <div class="ins-xsell__inner">
        <div class="ins-xsell__l">
          <span class="ins-xsell__kicker">Tier 03 — Wholesale GHL</span>
          <h3 class="ins-xsell__h" id="xsell-h">Running heavy <em>call volume</em>?</h3>
          <p class="ins-xsell__sub">$49/mo · $0.015/min · first 100 operators only · pure infrastructure, no courses.</p>
        </div>
        <a class="ins-btn ins-btn--gold" href="/founders/">
          See Wholesale GHL <span class="arrow">→</span>
        </a>
      </div>
    </div>
  </section>

` }} />
      <Footer />
    </>
  );
}
