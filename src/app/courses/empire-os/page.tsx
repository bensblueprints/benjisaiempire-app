import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Empire OS — Included with $10 Insider · Benji's AI Empire",
  description: "How I run the agency. Systems, hires, finance, fulfillment. The boring stuff that compounds. The operating manual behind the YouTube. Included with $10 Insider.",
  alternates: { canonical: "https://benjisaiempire.com/courses/empire-os/" },
  openGraph: { title: "Empire OS — Course 04 / 04", description: "The operating manual behind the YouTube. Included with $10 Insider.", url: "https://benjisaiempire.com/courses/empire-os/", images: [{ url: "https://benjisaiempire.com/images/hero-petronas-2.jpg?v=2" }], type: "article" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  /* ========== EMPIRE OS — CINEMATIC FULL-BLEED HERO + LEDGER ========== */
  .course-hero{
    position:relative; min-height:96vh;
    background:url('/images/hero-petronas-2.jpg?v=2') center/cover no-repeat var(--ink);
    color:var(--cream); overflow:hidden; isolation:isolate;
    border-bottom:1px solid var(--line);
    display:flex; align-items:flex-end;
  }
  .course-hero::before{
    content:""; position:absolute; inset:0;
    background:
      linear-gradient(180deg, rgba(11,11,12,.55) 0%, rgba(11,11,12,.25) 35%, rgba(11,11,12,.85) 100%);
  }
  .course-hero::after{
    content:""; position:absolute; inset:0;
    background-image:
      radial-gradient(rgba(244,236,216,.045) 1px, transparent 1px);
    background-size:3px 3px;
    mix-blend-mode:overlay; opacity:.6; pointer-events:none;
  }
  .course-hero__inner{
    position:relative; z-index:2;
    width:100%; max-width:var(--container); margin:0 auto;
    padding:clamp(48px,6vw,112px) clamp(20px,4vw,56px) clamp(48px,6vw,96px);
  }
  .course-hero__rail-top{
    position:absolute; top:32px; left:clamp(20px,4vw,56px); right:clamp(20px,4vw,56px);
    display:flex; justify-content:space-between; align-items:center; gap:18px;
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.28em; text-transform:uppercase; color:var(--cream);
  }
  .course-hero__rail-top .num{ color:var(--gold); margin-right:8px; }
  .course-hero__rail-top .chip{
    padding:6px 11px; border:1px solid var(--gold); color:var(--cream);
    background:rgba(11,11,12,.5); backdrop-filter:blur(6px);
  }
  .course-hero__eyebrow{
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.32em; text-transform:uppercase; color:var(--gold);
    margin-bottom:24px;
  }
  .course-hero__eyebrow .sep{ color:var(--cream); margin:0 10px; opacity:.55; }
  .course-hero h1{
    font-family:'Anton',sans-serif; font-weight:400;
    font-size:clamp(72px,12vw,200px); line-height:.84; letter-spacing:-.02em;
    text-transform:uppercase; color:var(--cream);
    margin:0 0 36px;
  }
  .course-hero h1 em{ font-style:normal; color:var(--gold); }

  .course-hero__split{
    display:grid; grid-template-columns:1.4fr 1fr; gap:56px; align-items:end;
    border-top:1px solid var(--line); padding-top:36px;
  }
  .course-hero__lede{
    font-family:'Fraunces',serif; font-style:italic; font-weight:400;
    font-size:clamp(20px,1.7vw,28px); line-height:1.4;
    color:var(--cream); margin:0 0 32px; max-width:60ch;
  }
  .course-hero__lede em{ font-style:normal; color:var(--gold-bright); }
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
  .course-hero__sublink{ display:block; margin-top:16px; font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--cream); opacity:.75; }
  .course-hero__sublink:hover{ color:var(--gold-bright); opacity:1; }

  .course-hero__meta{
    background:rgba(11,11,12,.45); backdrop-filter:blur(8px);
    border:1px solid var(--line); padding:24px;
    display:grid; grid-template-columns:1fr 1fr; gap:18px 28px;
    font-family:'JetBrains Mono',monospace; font-size:11px;
    letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft);
  }
  .course-hero__meta dt{ color:var(--gold); margin-bottom:4px; font-size:9.5px; letter-spacing:.28em; }
  .course-hero__meta dd{ color:var(--cream); font-size:14px; letter-spacing:.04em; font-family:'Anton',sans-serif; text-transform:uppercase; line-height:1; }

  /* OUTCOMES — boardroom 5-row */
  .section{ max-width:var(--container); margin:0 auto; padding:clamp(72px,9vw,140px) clamp(20px,4vw,56px); }
  .section-head{ display:flex; align-items:baseline; gap:24px; margin-bottom:64px; padding-bottom:24px; border-bottom:1px solid var(--line); flex-wrap:wrap; }
  .section-head__num{ font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); }
  .section-head__title{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(34px,4.4vw,68px); line-height:.95; letter-spacing:-.005em; text-transform:uppercase; color:var(--cream); margin:0; }

  .outcomes{ border-top:1px solid var(--line); }
  .outcome{
    display:grid; grid-template-columns: 100px 1fr 80px;
    align-items:center; gap:24px;
    padding:32px 0; border-bottom:1px solid var(--line);
    transition:background .25s ease, padding .25s ease;
  }
  .outcome:hover{ background:rgba(212,175,55,.04); padding-left:18px; }
  .outcome__num{ font-family:'Anton',sans-serif; font-size:clamp(40px,5vw,68px); line-height:1; color:var(--gold); letter-spacing:-.02em; }
  .outcome__text{ font-family:'Fraunces',serif; font-weight:400; font-size:clamp(19px,1.55vw,26px); line-height:1.4; color:var(--cream); margin:0; }
  .outcome__text strong{ font-style:italic; color:var(--gold-bright); font-weight:400; }
  .outcome__chip{ font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft); text-align:right; }

  /* curriculum: ledger book — 10 rows */
  .ledger{ background:var(--ink-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
  .ledger .section{ padding-top:clamp(80px,8vw,128px); padding-bottom:clamp(80px,8vw,128px); }
  .ledger-table{
    border:1px solid var(--line);
    background:rgba(11,11,12,.4);
  }
  .ledger-row{
    display:grid; grid-template-columns: 64px 1.4fr 2.4fr 96px;
    align-items:center; gap:24px;
    padding:22px 28px; border-bottom:1px solid var(--line);
    transition:background .2s ease;
    position:relative;
  }
  .ledger-row:last-child{ border-bottom:none; }
  .ledger-row::before{
    content:""; position:absolute; left:0; top:0; bottom:0; width:0;
    background:var(--gold); transition:width .2s ease;
  }
  .ledger-row:hover{ background:rgba(212,175,55,.05); }
  .ledger-row:hover::before{ width:3px; }
  .ledger-row--head{ background:rgba(11,11,12,.7); position:sticky; top:0; }
  .ledger-row--head:hover{ background:rgba(11,11,12,.7); }
  .ledger-row--head > *{ font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); }
  .ledger-row__num{ font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:600; letter-spacing:.14em; color:var(--gold); }
  .ledger-row__title{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(20px,1.85vw,26px); line-height:1.05; text-transform:uppercase; letter-spacing:.005em; color:var(--cream); margin:0; }
  .ledger-row__desc{ font-family:'Manrope',sans-serif; font-size:14.5px; line-height:1.55; color:var(--cream-soft); margin:0; }
  .ledger-row__tag{ font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft); text-align:right; }

  .pull{
    position:relative; padding:clamp(80px,10vw,160px) clamp(28px,4vw,56px);
    max-width:1080px; margin:0 auto; text-align:left;
  }
  .pull__text{
    font-family:'Fraunces',serif; font-weight:400; font-style:italic;
    font-size:clamp(28px,3.2vw,44px); line-height:1.28; color:var(--cream); margin:0 0 32px;
    border-left:2px solid var(--gold); padding-left:36px;
  }
  .pull__text em{ font-style:normal; color:var(--gold); }
  .pull__attr{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold); padding-left:38px; }
  .pull__attr::before{ content:""; display:inline-block; width:36px; height:1px; background:var(--gold); vertical-align:middle; margin-right:14px; }

  .cta-strip{
    position:relative; overflow:hidden;
    background:url('/images/broll-bangkok.jpg?v=2') center/cover no-repeat var(--ink-2);
    border-top:1px solid var(--line); border-bottom:1px solid var(--line);
    padding:clamp(80px,10vw,160px) clamp(28px,4vw,56px); text-align:center; color:var(--cream);
  }
  .cta-strip::before{
    content:""; position:absolute; inset:0;
    background:linear-gradient(180deg, rgba(11,11,12,.85) 0%, rgba(11,11,12,.7) 100%);
  }
  .cta-strip > *{ position:relative; z-index:1; }
  .cta-strip__eyebrow{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold); margin-bottom:24px; }
  .cta-strip__head{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(40px,5.4vw,84px); line-height:.92; letter-spacing:-.01em; text-transform:uppercase; color:var(--cream); margin:0 auto 36px; max-width:18ch; }
  .cta-strip__head em{ font-style:normal; color:var(--gold); }
  .cta-strip__btn{ display:inline-flex; align-items:center; gap:12px; background:var(--gold); color:var(--ink); font-family:'JetBrains Mono',monospace; font-size:13px; letter-spacing:.22em; text-transform:uppercase; font-weight:600; padding:18px 30px; border:1px solid var(--gold); transition:background .2s ease; }
  .cta-strip__btn:hover{ background:var(--gold-bright); }
  .cta-strip__btn::after{ content:"→"; transition:transform .2s ease; }
  .cta-strip__btn:hover::after{ transform:translateX(4px); }
  .cta-strip__alt{ display:block; margin-top:32px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--cream); opacity:.75; }
  .cta-strip__alt:hover{ color:var(--gold-bright); opacity:1; }

  @media (max-width: 900px){
    .course-hero__split{ grid-template-columns:1fr; }
    .course-hero__rail-top{ display:none; }
    .outcome{ grid-template-columns: 60px 1fr; }
    .outcome__chip{ display:none; }
    .ledger-row{ grid-template-columns: 48px 1fr; }
    .ledger-row__desc, .ledger-row__tag{ grid-column: 2; }
    .ledger-row--head{ display:none; }
  }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

  <section class="course-hero">
    <div class="course-hero__rail-top">
      <span><span class="num">04.</span> Course Series · Final Volume</span>
      <span class="chip">Operator-grade · Asia-friendly</span>
    </div>
    <div class="course-hero__inner">
      <div class="course-hero__eyebrow">Included with $10 Insider <span class="sep">·</span> Course 04 / 04</div>
      <h1>Empire <em>OS</em></h1>

      <div class="course-hero__split">
        <div>
          <p class="course-hero__lede">
            How I run the agency. Systems, hires, finance, fulfillment.
            <em>The boring stuff that compounds.</em>
            The operating manual behind the YouTube.
          </p>
          <a class="course-hero__cta" href="/insider/">Get this + everything else for $10/mo</a>
          <a class="course-hero__sublink" href="/founders/">Or grab wholesale GHL for $49/mo (no courses) →</a>
        </div>

        <dl class="course-hero__meta">
          <div><dt>Modules</dt><dd>10</dd></div>
          <div><dt>Run Time</dt><dd>≈9 hrs</dd></div>
          <div><dt>Format</dt><dd>Self-paced</dd></div>
          <div><dt>Templates</dt><dd>23 SOPs</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-head">
      <span class="section-head__num">§ 02 · What You'll Learn</span>
      <h2 class="section-head__title">The boring stuff. Done well.</h2>
    </div>
    <div class="outcomes">
      <div class="outcome"><div class="outcome__num">01</div><p class="outcome__text">A <strong>hiring framework</strong> that filters for builders, not résumés.</p><div class="outcome__chip">Hires</div></div>
      <div class="outcome"><div class="outcome__num">02</div><p class="outcome__text">A <strong>finance dashboard</strong> you actually look at — five numbers, one glance, weekly.</p><div class="outcome__chip">Finance</div></div>
      <div class="outcome"><div class="outcome__num">03</div><p class="outcome__text"><strong>SOPs that survive turnover</strong> — written once, owned by the role, not the person.</p><div class="outcome__chip">Ops</div></div>
      <div class="outcome"><div class="outcome__num">04</div><p class="outcome__text"><strong>Fulfillment that scales</strong> without you becoming the bottleneck (or the burnout).</p><div class="outcome__chip">Delivery</div></div>
      <div class="outcome"><div class="outcome__num">05</div><p class="outcome__text">The <strong>4 weekly meetings</strong> that actually run the company — every other meeting is theater.</p><div class="outcome__chip">Cadence</div></div>
    </div>
  </section>

  <section class="ledger">
    <div class="section">
      <div class="section-head">
        <span class="section-head__num">§ 03 · Curriculum</span>
        <h2 class="section-head__title">Ten chapters of the operating manual.</h2>
      </div>
      <div class="ledger-table">
        <div class="ledger-row ledger-row--head">
          <span>No.</span>
          <span>Module</span>
          <span>Description</span>
          <span>Domain</span>
        </div>
        <div class="ledger-row"><span class="ledger-row__num">01</span><h3 class="ledger-row__title">The 4 Weekly Meetings</h3><p class="ledger-row__desc">Monday rev, Wednesday build, Thursday financial, Friday retro. Agendas, time-boxes, owners.</p><span class="ledger-row__tag">Cadence</span></div>
        <div class="ledger-row"><span class="ledger-row__num">02</span><h3 class="ledger-row__title">Hiring — Filter, Offer, Trial</h3><p class="ledger-row__desc">The 3-stage filter, the offer letter template, and the 30-day paid trial that has caught every bad hire.</p><span class="ledger-row__tag">People</span></div>
        <div class="ledger-row"><span class="ledger-row__num">03</span><h3 class="ledger-row__title">Onboarding Sprint</h3><p class="ledger-row__desc">The first 14 days — what they ship, who they meet, when they get the keys.</p><span class="ledger-row__tag">People</span></div>
        <div class="ledger-row"><span class="ledger-row__num">04</span><h3 class="ledger-row__title">SOPs That Don't Rot</h3><p class="ledger-row__desc">Writing them so they survive a year — owned by role, version-controlled, reviewed quarterly.</p><span class="ledger-row__tag">Ops</span></div>
        <div class="ledger-row"><span class="ledger-row__num">05</span><h3 class="ledger-row__title">Finance Dashboard — The 5 Numbers</h3><p class="ledger-row__desc">Cash, MRR, CAC, gross margin, runway. The single sheet I open every Thursday morning.</p><span class="ledger-row__tag">Finance</span></div>
        <div class="ledger-row"><span class="ledger-row__num">06</span><h3 class="ledger-row__title">Fulfillment Ops</h3><p class="ledger-row__desc">The kanban board, the delivery sprints, and the QA gate that ships work I'd put my name on.</p><span class="ledger-row__tag">Delivery</span></div>
        <div class="ledger-row"><span class="ledger-row__num">07</span><h3 class="ledger-row__title">Client Retention</h3><p class="ledger-row__desc">The QBR, the surprise-and-delight calendar, and the early-warning churn signals I act on within 24 hours.</p><span class="ledger-row__tag">Revenue</span></div>
        <div class="ledger-row"><span class="ledger-row__num">08</span><h3 class="ledger-row__title">Firing Well</h3><p class="ledger-row__desc">The conversation, the severance, the comms to the team. Done with respect, done fast, done once.</p><span class="ledger-row__tag">People</span></div>
        <div class="ledger-row"><span class="ledger-row__num">09</span><h3 class="ledger-row__title">Travel + Remote (Asia-Friendly)</h3><p class="ledger-row__desc">How I run the company from Bangkok, KL, or a flight. Time zones, async, and the rules that keep it from cracking.</p><span class="ledger-row__tag">Lifestyle</span></div>
        <div class="ledger-row"><span class="ledger-row__num">10</span><h3 class="ledger-row__title">The Exit You Don't Take</h3><p class="ledger-row__desc">Why I haven't sold, when I would, and the structure that makes the agency worth more every year I keep it.</p><span class="ledger-row__tag">Strategy</span></div>
      </div>
    </div>
  </section>

  <section class="pull">
    <p class="pull__text">
      The agency is the boring part. Empire OS is what you run when you don't
      want to read another founder LinkedIn post about <em>"vision."</em>
      It's the operating manual, not the manifesto.
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
