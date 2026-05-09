import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Marketing Engine — Included with $10 Insider · Benji's AI Empire",
  description: "One Tuesday Live → 14 pieces of content. The Pillar-to-Derivative Cascade, the full prompt + automation stack, the engine I run while I sleep. Included with $10 Insider.",
  alternates: { canonical: "https://benjisaiempire.com/courses/marketing-engine/" },
  openGraph: { title: "AI Marketing Engine — Course 03 / 04", description: "One Tuesday Live → 14 pieces of content. Included with $10 Insider.", url: "https://benjisaiempire.com/courses/marketing-engine/", images: [{ url: "https://benjisaiempire.com/images/course-marketing-engine.jpg" }], type: "article" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  /* ========== MARKETING ENGINE — SCHEMATIC / DIAGRAM TREATMENT ========== */
  .course-hero{
    position:relative; background:var(--ink); color:var(--cream);
    overflow:hidden; isolation:isolate;
    border-bottom:1px solid var(--line);
    background-image:
      linear-gradient(rgba(212,175,55,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,175,55,.05) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  .course-hero__inner{
    position:relative; z-index:1; max-width:var(--container); margin:0 auto;
    padding:clamp(48px,6vw,96px) clamp(20px,4vw,56px) clamp(60px,7vw,120px);
  }
  .course-hero__rail{
    display:flex; align-items:center; justify-content:space-between;
    gap:18px; margin-bottom:48px;
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.24em; text-transform:uppercase; color:var(--cream-soft);
  }
  .course-hero__rail .num{ color:var(--gold); margin-right:8px; }
  .course-hero__rail .bar{ flex:1; height:1px; background:var(--line); margin:0 14px; }
  .course-hero__eyebrow{
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.32em; text-transform:uppercase; color:var(--gold);
    margin-bottom:24px;
    display:inline-block; padding:8px 14px; border:1px solid var(--gold);
  }
  .course-hero__eyebrow span{ color:var(--cream-soft); margin:0 8px; }
  .course-hero h1{
    font-family:'Anton',sans-serif; font-weight:400;
    font-size:clamp(58px,8.4vw,148px); line-height:.85; letter-spacing:-.018em;
    text-transform:uppercase; color:var(--cream); margin:0 0 36px;
    max-width:14ch;
  }
  .course-hero h1 em{ font-style:normal; color:var(--gold); }
  .course-hero h1 .arrow{ color:var(--rust); display:inline-block; transform:translateY(-.06em); }

  .course-hero__split{
    display:grid; grid-template-columns:1.2fr 1fr; gap:56px;
    align-items:end;
  }
  .course-hero__lede{
    font-family:'Fraunces',serif; font-style:italic; font-weight:400;
    font-size:clamp(20px,1.7vw,26px); line-height:1.45;
    color:var(--bone); margin:0 0 32px; max-width:60ch;
  }
  .course-hero__meta{
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft);
    margin-bottom:32px;
    padding-top:18px; border-top:1px solid var(--line);
  }
  .course-hero__meta strong{ color:var(--cream); font-weight:600; }
  .course-hero__cta{
    display:inline-flex; align-items:center; gap:12px;
    background:var(--gold); color:var(--ink);
    font-family:'JetBrains Mono',monospace; font-size:12px;
    letter-spacing:.22em; text-transform:uppercase; font-weight:600;
    padding:18px 28px; border:1px solid var(--gold); transition:background .2s ease;
  }
  .course-hero__cta:hover{ background:var(--gold-bright); }
  .course-hero__cta::after{ content:"→"; transition:transform .2s ease; }
  .course-hero__cta:hover::after{ transform:translateX(4px); }
  .course-hero__sublink{ display:block; margin-top:14px; font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft); }
  .course-hero__sublink:hover{ color:var(--gold-bright); }

  .course-hero__schematic{
    position:relative;
    border:1px solid var(--line); padding:24px;
    background:rgba(11,11,12,.5); backdrop-filter:blur(6px);
    aspect-ratio: 5/4;
    display:flex; flex-direction:column; justify-content:space-between;
    overflow:hidden;
  }
  .course-hero__schematic::before{
    content:"FIG. 01"; position:absolute; top:14px; right:18px;
    font-family:'JetBrains Mono',monospace; font-size:9.5px;
    letter-spacing:.28em; color:var(--gold); opacity:.7;
  }
  .schem-pillar{
    align-self:flex-start;
    font-family:'Anton',sans-serif; font-size:36px; line-height:1; color:var(--gold);
    letter-spacing:.005em; text-transform:uppercase;
  }
  .schem-pillar small{ display:block; font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--cream-soft); letter-spacing:.24em; margin-top:6px; }
  .schem-fan{
    display:grid; grid-template-columns:repeat(7,1fr); gap:6px; align-items:end; margin-top:auto;
  }
  .schem-fan span{
    height:42px; background:linear-gradient(180deg, var(--gold), rgba(212,175,55,.2));
    display:block; position:relative;
  }
  .schem-fan span::after{
    content:""; position:absolute; left:50%; top:-22px; width:1px; height:18px;
    background:linear-gradient(180deg, transparent, var(--gold)); transform:translateX(-50%);
  }
  .schem-fan span:nth-child(2){ height:30px; }
  .schem-fan span:nth-child(3){ height:54px; }
  .schem-fan span:nth-child(4){ height:48px; }
  .schem-fan span:nth-child(5){ height:36px; }
  .schem-fan span:nth-child(6){ height:60px; }
  .schem-fan span:nth-child(7){ height:24px; }
  .schem-label{
    margin-top:14px; display:flex; justify-content:space-between;
    font-family:'JetBrains Mono',monospace; font-size:10px;
    letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft);
  }
  .schem-label strong{ color:var(--gold); }

  .section{ max-width:var(--container); margin:0 auto; padding:clamp(72px,9vw,140px) clamp(20px,4vw,56px); }
  .section-head{ display:flex; align-items:baseline; gap:24px; margin-bottom:64px; padding-bottom:24px; border-bottom:1px solid var(--line); flex-wrap:wrap; }
  .section-head__num{ font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); }
  .section-head__title{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(34px,4.4vw,68px); line-height:.95; letter-spacing:-.005em; text-transform:uppercase; color:var(--cream); margin:0; }

  .outcomes{ display:grid; grid-template-columns:repeat(5,1fr); gap:0; border-left:1px solid var(--line); border-top:1px solid var(--line); }
  .outcome{ padding:36px 24px; border-right:1px solid var(--line); border-bottom:1px solid var(--line); transition:background .25s ease; display:flex; flex-direction:column; gap:18px; min-height:280px; }
  .outcome:hover{ background:rgba(212,175,55,.05); }
  .outcome__num{ font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.18em; color:var(--gold); }
  .outcome__text{ font-family:'Manrope',sans-serif; font-size:16px; line-height:1.5; color:var(--cream); margin:0; }
  .outcome__text strong{ color:var(--gold-bright); font-weight:600; }

  /* curriculum: 3-col schematic stack */
  .curriculum{ background:var(--ink-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
  .modules{ display:grid; grid-template-columns:repeat(3,1fr); gap:0; border-left:1px solid var(--line); border-top:1px solid var(--line); }
  .module{ padding:32px 24px; border-right:1px solid var(--line); border-bottom:1px solid var(--line); transition:background .2s ease; position:relative; min-height:220px; display:flex; flex-direction:column; gap:14px; }
  .module:hover{ background:rgba(212,175,55,.04); }
  .module::before{ content:""; position:absolute; left:0; top:0; width:100%; height:0; background:var(--gold); transition:height .2s ease; opacity:.6; }
  .module:hover::before{ height:2px; }
  .module__head{ display:flex; align-items:baseline; justify-content:space-between; gap:18px; }
  .module__num{ font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:600; letter-spacing:.18em; color:var(--gold); }
  .module__chip{ font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.22em; color:var(--cream-soft); text-transform:uppercase; padding:3px 7px; border:1px solid var(--line); }
  .module__title{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(22px,1.95vw,28px); line-height:1.05; letter-spacing:.005em; text-transform:uppercase; color:var(--cream); margin:0; }
  .module__desc{ font-family:'Manrope',sans-serif; font-size:14.5px; line-height:1.55; color:var(--cream-soft); margin:0; }

  .pull{
    position:relative; padding:clamp(80px,10vw,160px) clamp(28px,4vw,56px);
    text-align:center; max-width:1100px; margin:0 auto;
    background-image: linear-gradient(180deg, transparent 0, transparent 50%, rgba(212,175,55,.04) 100%);
  }
  .pull__text{ font-family:'Fraunces',serif; font-weight:400; font-style:italic; font-size:clamp(26px,3vw,42px); line-height:1.3; color:var(--cream); margin:0 0 32px; }
  .pull__text em{ font-style:normal; color:var(--gold); }
  .pull__attr{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold); }
  .pull__attr::before{ content:""; display:inline-block; width:36px; height:1px; background:var(--gold); vertical-align:middle; margin-right:14px; }

  .cta-strip{
    background:var(--ink); border-top:1px solid var(--line); border-bottom:1px solid var(--line);
    padding:clamp(72px,8vw,120px) clamp(28px,4vw,56px); text-align:center;
    background-image:
      linear-gradient(rgba(212,175,55,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,175,55,.04) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .cta-strip__eyebrow{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold); margin-bottom:24px; }
  .cta-strip__head{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(38px,5vw,76px); line-height:.95; letter-spacing:-.01em; text-transform:uppercase; color:var(--cream); margin:0 auto 36px; max-width:18ch; }
  .cta-strip__head em{ font-style:normal; color:var(--gold); }
  .cta-strip__btn{ display:inline-flex; align-items:center; gap:12px; background:var(--gold); color:var(--ink); font-family:'JetBrains Mono',monospace; font-size:13px; letter-spacing:.22em; text-transform:uppercase; font-weight:600; padding:18px 30px; border:1px solid var(--gold); transition:background .2s ease; }
  .cta-strip__btn:hover{ background:var(--gold-bright); }
  .cta-strip__btn::after{ content:"→"; transition:transform .2s ease; }
  .cta-strip__btn:hover::after{ transform:translateX(4px); }
  .cta-strip__alt{ display:block; margin-top:32px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--cream-soft); }
  .cta-strip__alt:hover{ color:var(--gold-bright); }

  @media (max-width: 1100px){
    .outcomes{ grid-template-columns:repeat(2,1fr); }
    .modules{ grid-template-columns:repeat(2,1fr); }
  }
  @media (max-width: 720px){
    .course-hero__split{ grid-template-columns:1fr; }
    .outcomes{ grid-template-columns:1fr; }
    .modules{ grid-template-columns:1fr; }
  }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

  <section class="course-hero">
    <div class="course-hero__inner">
      <div class="course-hero__rail">
        <span><span class="num">03.</span> Course Series</span>
        <span class="bar"></span>
        <span>Pillar → Derivative · 1 in / 14 out</span>
      </div>

      <div class="course-hero__eyebrow">Included with $10 Insider <span>·</span> Course 03 / 04</div>
      <h1>AI Marketing<br><em>Engine</em><span class="arrow"> →</span> 14×</h1>

      <div class="course-hero__split">
        <div>
          <p class="course-hero__lede">
            One Tuesday Live → 14 pieces of content. The Pillar-to-Derivative
            Cascade, the full prompt + automation stack, the engine I run in
            the background while I sleep.
          </p>
          <div class="course-hero__meta">
            <strong>9 modules</strong> &nbsp;·&nbsp; ≈8 hours &nbsp;·&nbsp; Make + Claude + GHL stack &nbsp;·&nbsp; templates included
          </div>
          <a class="course-hero__cta" href="/insider/">Get this + everything else for $10/mo</a>
          <a class="course-hero__sublink" href="/founders/">Or grab wholesale GHL for $49/mo (no courses) →</a>
        </div>

        <figure class="course-hero__schematic" aria-label="Pillar to derivative diagram">
          <div class="schem-pillar">1 Pillar<small>Tuesday Live · 60 min</small></div>
          <div class="schem-fan" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="schem-label">
            <span><strong>14×</strong> Derivatives</span>
            <span>YT · X · IG · LI · Email · Ads · Pod</span>
          </div>
        </figure>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-head">
      <span class="section-head__num">§ 02 · What You'll Learn</span>
      <h2 class="section-head__title">An engine. Not a content calendar.</h2>
    </div>
    <div class="outcomes">
      <div class="outcome"><div class="outcome__num">→ 01</div><p class="outcome__text">The <strong>Pillar-to-Derivative</strong> system — one real conversation per week, fourteen channels filled.</p></div>
      <div class="outcome"><div class="outcome__num">→ 02</div><p class="outcome__text">A <strong>14-channel content engine</strong> mapped to your voice — not a generic "AI writes everything" template.</p></div>
      <div class="outcome"><div class="outcome__num">→ 03</div><p class="outcome__text">The <strong>full automation stack</strong> — Make + Claude + GHL — wired together and provably working.</p></div>
      <div class="outcome"><div class="outcome__num">→ 04</div><p class="outcome__text">A <strong>cost-per-lead</strong> dashboard that exposes which channels are actually paying for themselves.</p></div>
      <div class="outcome"><div class="outcome__num">→ 05</div><p class="outcome__text">An <strong>engine that runs without you</strong> — survives your vacation, your bad week, your travel schedule.</p></div>
    </div>
  </section>

  <section class="curriculum">
    <div class="section">
      <div class="section-head">
        <span class="section-head__num">§ 03 · Curriculum</span>
        <h2 class="section-head__title">Nine modules. One running engine.</h2>
      </div>
      <div class="modules">
        <div class="module"><div class="module__head"><span class="module__num">01</span><span class="module__chip">System</span></div><h3 class="module__title">The Pillar-to-Derivative Cascade</h3><p class="module__desc">The architecture of the engine. Why one real conversation beats 14 "content ideas" every time.</p></div>
        <div class="module"><div class="module__head"><span class="module__num">02</span><span class="module__chip">Capture</span></div><h3 class="module__title">Recording the Pillar (Tuesday Live)</h3><p class="module__desc">My exact rig, scenes, lighting, and the 60-minute show format that produces transcribable, derivative-ready content.</p></div>
        <div class="module"><div class="module__head"><span class="module__num">03</span><span class="module__chip">Map</span></div><h3 class="module__title">The 14-Channel Matrix</h3><p class="module__desc">The grid I fill every Wednesday — what each channel takes, what it leaves behind, how to format without diluting.</p></div>
        <div class="module"><div class="module__head"><span class="module__num">04</span><span class="module__chip">AI</span></div><h3 class="module__title">The Prompt Library</h3><p class="module__desc">40+ prompts with brand voice, channel constraints, and length controls — all tested, all in plaintext.</p></div>
        <div class="module"><div class="module__head"><span class="module__num">05</span><span class="module__chip">Automate</span></div><h3 class="module__title">Make Automations</h3><p class="module__desc">The Make scenarios that pipe transcript → prompt → draft → Notion → review → publish, end to end.</p></div>
        <div class="module"><div class="module__head"><span class="module__num">06</span><span class="module__chip">Stack</span></div><h3 class="module__title">GHL Contact-Event Hooks</h3><p class="module__desc">Wiring content engagement back into the CRM so the engine actually feeds the pipeline.</p></div>
        <div class="module"><div class="module__head"><span class="module__num">07</span><span class="module__chip">Paid</span></div><h3 class="module__title">Paid Amplification (Meta + YouTube)</h3><p class="module__desc">Which derivatives to boost, the spend ladder, and the creative test framework I run weekly.</p></div>
        <div class="module"><div class="module__head"><span class="module__num">08</span><span class="module__chip">Measure</span></div><h3 class="module__title">The 3 Metrics That Matter</h3><p class="module__desc">CAC, time-to-meeting, and channel half-life. The dashboard I actually look at.</p></div>
        <div class="module"><div class="module__head"><span class="module__num">09</span><span class="module__chip">Operate</span></div><h3 class="module__title">Maintenance + Iteration</h3><p class="module__desc">The 30-minute weekly tune-up that keeps the engine compounding instead of decaying.</p></div>
      </div>
    </div>
  </section>

  <section class="pull">
    <p class="pull__text">
      Most "AI marketing" is just hiring AI to do <em>bad marketing</em> faster.
      The Engine is different — it starts with one real conversation per week,
      then turns into 14 pieces of asymmetric leverage.
    </p>
    <div class="pull__attr">— Benji Boyce</div>
  </section>

  <section class="cta-strip">
    <div class="cta-strip__eyebrow">Included with $10 Insider</div>
    <h2 class="cta-strip__head">Get this + <em>everything in the bucket</em> for $10/mo.</h2>
    <a class="cta-strip__btn" href="/insider/">Join Insider</a>
    <a class="cta-strip__alt" href="/founders/">Or grab wholesale GHL for $49/mo (no courses) →</a>
  </section>

` }} />
      <Footer />
    </>
  );
}
