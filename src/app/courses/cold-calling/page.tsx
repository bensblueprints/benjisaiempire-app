import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cold Calling 2.0 + AI — Included with $9 AI Empire Insider · Benji's AI Empire",
  description: "The exact cold-calling system I run live every Tuesday. AI-augmented prospecting, the Master Script, real objection handling, and the follow-up cadence that closes. Included with $9 AI Empire Insider.",
  alternates: { canonical: "https://benjisaiempire.com/courses/cold-calling/" },
  openGraph: { title: "Cold Calling 2.0 + AI — Course 01 / 04", description: "The exact cold-calling system I run live every Tuesday. Included with $9 AI Empire Insider.", url: "https://benjisaiempire.com/courses/cold-calling/", images: [{ url: "https://benjisaiempire.com/images/hero-empire.jpg?v=2" }], type: "article" }
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  /* ========== COLD CALLING — DIAL-LOG / TICKER TREATMENT ========== */
  .course-hero{ position:relative; background:var(--ink); color:var(--cream); overflow:hidden; isolation:isolate; border-bottom:1px solid var(--line); }
  .course-hero::before{
    content:""; position:absolute; inset:0;
    background-image:
      radial-gradient(rgba(244,236,216,.04) 1px, transparent 1px),
      radial-gradient(rgba(11,11,12,.06) 1px, transparent 1px);
    background-size:3px 3px, 5px 5px;
    mix-blend-mode:overlay; pointer-events:none; z-index:5; opacity:.55;
  }
  .course-hero__grid{ position:relative; z-index:1; display:grid; grid-template-columns:56% 44%; min-height:88vh; max-width:var(--container); margin:0 auto; }
  .course-hero__left{ padding:clamp(40px,6vw,88px) clamp(28px,4vw,64px) clamp(40px,5vw,72px); display:flex; flex-direction:column; justify-content:space-between; gap:48px; border-right:1px solid var(--line); }
  .course-hero__rail{ display:flex; align-items:center; justify-content:space-between; gap:18px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--cream-soft); }
  .course-hero__rail .num{ color:var(--gold); margin-right:8px; }
  .course-hero__rail .bar{ flex:1; height:1px; background:var(--line); margin:0 14px; }
  .course-hero__eyebrow{ font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold); display:inline-flex; align-items:center; gap:14px; margin-bottom:22px; }
  .course-hero__eyebrow .sep{ color:var(--cream-soft); opacity:.6; }
  .course-hero h1{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(54px,7.4vw,118px); line-height:.88; letter-spacing:-.012em; text-transform:uppercase; color:var(--cream); margin:0 0 28px; }
  .course-hero h1 em{ font-style:normal; color:var(--gold); }
  .course-hero__lede{ font-family:'Fraunces',serif; font-weight:400; font-style:italic; font-size:clamp(20px,1.65vw,26px); line-height:1.45; color:var(--bone); max-width:62ch; margin:0 0 36px; }
  .course-hero__meta{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--cream-soft); margin-bottom:32px; }
  .course-hero__meta strong{ color:var(--cream); font-weight:600; }
  .course-hero__cta{ display:inline-flex; align-items:center; gap:12px; background:var(--gold); color:var(--ink); font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.22em; text-transform:uppercase; font-weight:600; padding:16px 26px; border:1px solid var(--gold); transition:background .2s ease; margin-bottom:8px; }
  .course-hero__cta:hover{ background:var(--gold-bright); }
  .course-hero__cta::after{ content:"→"; transition:transform .2s ease; }
  .course-hero__cta:hover::after{ transform:translateX(4px); }
  .course-hero__sublink{ display:block; margin-top:14px; font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft); }
  .course-hero__sublink:hover{ color:var(--gold-bright); }
  .course-hero__right{ position:relative; background:url('/images/hero-empire.jpg?v=2') center/cover no-repeat; min-height:480px; }
  .course-hero__right::before{ content:""; position:absolute; inset:0; background:linear-gradient(110deg, rgba(11,11,12,.55) 0%, rgba(11,11,12,.05) 50%, rgba(11,11,12,0) 100%); }
  .course-hero__right-tag{ position:absolute; top:32px; right:32px; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.28em; text-transform:uppercase; color:var(--cream); background:rgba(11,11,12,.7); padding:8px 12px; border:1px solid var(--gold); backdrop-filter:blur(6px); }
  .course-hero__right-tag .dot{ display:inline-block; width:7px; height:7px; border-radius:50%; background:var(--rust); margin-right:8px; vertical-align:middle; animation:livePulse 1.6s ease-in-out infinite; }
  @keyframes livePulse{ 0%,100%{ box-shadow:0 0 0 0 rgba(196,41,46,.6); } 50%{ box-shadow:0 0 0 8px rgba(196,41,46,0); } }

  .dial-ticker{ background:var(--ink-2); border-bottom:1px solid var(--line); padding:14px 0; overflow:hidden; }
  .dial-ticker__inner{ max-width:var(--container); margin:0 auto; padding:0 clamp(20px,4vw,56px); display:flex; gap:48px; align-items:center; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--cream-soft); white-space:nowrap; overflow-x:auto; }
  .dial-ticker__item strong{ color:var(--gold); margin-right:8px; }

  .section{ max-width:var(--container); margin:0 auto; padding:clamp(72px,9vw,140px) clamp(20px,4vw,56px); }
  .section-head{ display:flex; align-items:baseline; gap:24px; margin-bottom:64px; padding-bottom:24px; border-bottom:1px solid var(--line); flex-wrap:wrap; }
  .section-head__num{ font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); }
  .section-head__title{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(34px,4.4vw,68px); line-height:.95; letter-spacing:-.005em; text-transform:uppercase; color:var(--cream); margin:0; }

  .outcomes{ display:grid; gap:0; }
  .outcome{ display:grid; grid-template-columns:60px 1fr; align-items:start; gap:24px; padding:28px 0; border-bottom:1px solid var(--line); transition:background .25s ease, padding .25s ease; }
  .outcome:hover{ background:rgba(212,175,55,.04); padding-left:12px; }
  .outcome__num{ font-family:'JetBrains Mono',monospace; font-size:13px; letter-spacing:.18em; color:var(--gold); padding-top:4px; }
  .outcome__text{ font-family:'Manrope',sans-serif; font-size:clamp(17px,1.4vw,21px); line-height:1.5; color:var(--cream); font-weight:400; }
  .outcome__text strong{ color:var(--gold-bright); font-weight:500; }

  .ledger{ background:var(--ink-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
  .ledger .section{ padding-top:clamp(72px,8vw,120px); padding-bottom:clamp(72px,8vw,120px); }
  .modules{ display:grid; grid-template-columns:1fr 1fr; gap:0; border-top:1px solid var(--line); border-left:1px solid var(--line); }
  .module{ display:grid; grid-template-columns:56px 1fr; gap:18px; padding:28px; border-right:1px solid var(--line); border-bottom:1px solid var(--line); transition:background .2s ease; position:relative; }
  .module:hover{ background:rgba(212,175,55,.05); }
  .module::before{ content:""; position:absolute; left:0; top:0; bottom:0; width:0; background:var(--gold); transition:width .2s ease; }
  .module:hover::before{ width:3px; }
  .module__num{ font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:600; letter-spacing:.12em; color:var(--gold); padding-top:4px; }
  .module__title{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(22px,1.95vw,28px); line-height:1.05; letter-spacing:.005em; text-transform:uppercase; color:var(--cream); margin:0 0 8px; }
  .module__desc{ font-family:'Manrope',sans-serif; font-size:14.5px; line-height:1.55; color:var(--cream-soft); margin:0; }

  .pull{ max-width:1080px; margin:0 auto; padding:clamp(80px,10vw,160px) clamp(28px,4vw,56px); text-align:center; position:relative; }
  .pull::before{ content:"\\201C"; position:absolute; top:30px; left:50%; transform:translateX(-50%); font-family:'Fraunces',serif; font-size:clamp(120px,16vw,200px); line-height:1; color:var(--gold); opacity:.18; }
  .pull__text{ font-family:'Fraunces',serif; font-weight:400; font-style:italic; font-size:clamp(26px,3vw,42px); line-height:1.3; letter-spacing:-.005em; color:var(--cream); margin:0 0 32px; position:relative; }
  .pull__attr{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold); }
  .pull__attr::before{ content:""; display:inline-block; width:36px; height:1px; background:var(--gold); vertical-align:middle; margin-right:14px; }

  .cta-strip{ background:var(--ink-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:clamp(72px,8vw,120px) clamp(28px,4vw,56px); text-align:center;
    background-image: radial-gradient(circle at 20% 20%, rgba(212,175,55,.08), transparent 50%), radial-gradient(circle at 80% 80%, rgba(196,41,46,.06), transparent 50%); }
  .cta-strip__eyebrow{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold); margin-bottom:24px; }
  .cta-strip__head{ font-family:'Anton',sans-serif; font-weight:400; font-size:clamp(38px,5vw,76px); line-height:.95; letter-spacing:-.01em; text-transform:uppercase; color:var(--cream); margin:0 auto 36px; max-width:18ch; }
  .cta-strip__head em{ font-style:normal; color:var(--gold); }
  .cta-strip__btn{ display:inline-flex; align-items:center; gap:12px; background:var(--gold); color:var(--ink); font-family:'JetBrains Mono',monospace; font-size:13px; letter-spacing:.22em; text-transform:uppercase; font-weight:600; padding:18px 30px; border:1px solid var(--gold); transition:background .2s ease; }
  .cta-strip__btn:hover{ background:var(--gold-bright); }
  .cta-strip__btn::after{ content:"→"; transition:transform .2s ease; }
  .cta-strip__btn:hover::after{ transform:translateX(4px); }
  .cta-strip__alt{ display:block; margin-top:32px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--cream-soft); }
  .cta-strip__alt:hover{ color:var(--gold-bright); }

  @media (max-width: 900px){
    .course-hero__grid{ grid-template-columns:1fr; }
    .course-hero__left{ border-right:none; border-bottom:1px solid var(--line); }
    .course-hero__right{ min-height:340px; }
    .modules{ grid-template-columns:1fr; }
  }
` }} />
      <Topbar />
      <main id="main" dangerouslySetInnerHTML={{ __html: `

  <section class="course-hero">
    <div class="course-hero__grid">
      <div class="course-hero__left">
        <div class="course-hero__rail">
          <span><span class="num">01.</span> Course Series</span>
          <span class="bar"></span>
          <span>Self-paced · Updated weekly</span>
        </div>
        <div>
          <div class="course-hero__eyebrow">
            Included with $9 AI Empire Insider <span class="sep">·</span> Course 01 / 04
          </div>
          <h1>Cold Calling <em>2.0</em><br>+ AI</h1>
          <p class="course-hero__lede">
            The exact system I run live every Tuesday. AI-augmented prospecting,
            the Master Script, real objection handling, and the follow-up cadence
            that actually closes.
          </p>
          <div class="course-hero__meta">
            <strong>8 modules</strong> &nbsp;·&nbsp; ≈6.5 hours &nbsp;·&nbsp; self-paced &nbsp;·&nbsp; live Q&amp;A weekly
          </div>
          <a class="course-hero__cta" href="/insider/">Get this + everything else for $9/mo</a>
          <a class="course-hero__sublink" href="/founders/">Or grab wholesale GHL for $49/mo (no courses) →</a>
        </div>
      </div>
      <div class="course-hero__right">
        <div class="course-hero__right-tag"><span class="dot"></span> Live Tuesdays · YouTube</div>
      </div>
    </div>
  </section>

  <div class="dial-ticker">
    <div class="dial-ticker__inner">
      <span class="dial-ticker__item"><strong>100</strong> dials / day</span>
      <span class="dial-ticker__item"><strong>12</strong> objections, mapped</span>
      <span class="dial-ticker__item"><strong>8s</strong> to hook</span>
      <span class="dial-ticker__item"><strong>1</strong> Master Script</span>
      <span class="dial-ticker__item"><strong>0</strong> burnout</span>
      <span class="dial-ticker__item"><strong>$9/mo</strong> includes everything</span>
    </div>
  </div>

  <section class="section">
    <div class="section-head">
      <span class="section-head__num">§ 02 · What You'll Learn</span>
      <h2 class="section-head__title">Outcomes, not theory.</h2>
    </div>
    <div class="outcomes">
      <div class="outcome"><div class="outcome__num">01</div><div class="outcome__text">An <strong>AI prospecting workflow</strong> that builds your list, scores it, and queues the dials before you sit down.</div></div>
      <div class="outcome"><div class="outcome__num">02</div><div class="outcome__text">The <strong>Master Script</strong> that handles 90% of the objections you'll hear in the first 30 seconds.</div></div>
      <div class="outcome"><div class="outcome__num">03</div><div class="outcome__text">A <strong>daily 100-dial cadence</strong> with energy management — so you can do it Monday and again Friday.</div></div>
      <div class="outcome"><div class="outcome__num">04</div><div class="outcome__text">A <strong>follow-up sequence</strong> that doesn't burn out the list and quietly closes weeks later.</div></div>
      <div class="outcome"><div class="outcome__num">05</div><div class="outcome__text"><strong>Live-stream confidence</strong> — the rig, the framing, the mental model for dialing in front of an audience.</div></div>
    </div>
  </section>

  <section class="ledger">
    <div class="section">
      <div class="section-head">
        <span class="section-head__num">§ 03 · Curriculum</span>
        <h2 class="section-head__title">Eight modules. One repeatable Tuesday.</h2>
      </div>
      <div class="modules">
        <div class="module"><div class="module__num">01.</div><div><h3 class="module__title">AI Prospecting Setup</h3><p class="module__desc">Stack the tools, scrape the list, score every lead before the first dial — the workflow I run on Sunday night.</p></div></div>
        <div class="module"><div class="module__num">02.</div><div><h3 class="module__title">The Master Script</h3><p class="module__desc">The exact framework I open with — what to say, what to never say, and where to deviate when the call goes off-rail.</p></div></div>
        <div class="module"><div class="module__num">03.</div><div><h3 class="module__title">The Opening 8 Seconds</h3><p class="module__desc">If you don't earn the next 30 seconds, the call is over. The pattern interrupt, the tone, the pace.</p></div></div>
        <div class="module"><div class="module__num">04.</div><div><h3 class="module__title">Objection Map (Top 12)</h3><p class="module__desc">Every objection I've heard a thousand times — mapped, scripted, and stress-tested live on stream.</p></div></div>
        <div class="module"><div class="module__num">05.</div><div><h3 class="module__title">Discovery → Diagnosis</h3><p class="module__desc">Stop pitching. Start diagnosing. The 7 questions that turn a cold call into a paid consultation.</p></div></div>
        <div class="module"><div class="module__num">06.</div><div><h3 class="module__title">The Close</h3><p class="module__desc">Calendar invite before they hang up — the assumptive close framework, plus the soft re-open if they hesitate.</p></div></div>
        <div class="module"><div class="module__num">07.</div><div><h3 class="module__title">Follow-Up Cadence</h3><p class="module__desc">Day 1, 3, 7, 14, 30. The exact emails, voicemails, and texts — most of my closes happen here.</p></div></div>
        <div class="module"><div class="module__num">08.</div><div><h3 class="module__title">Going Live (YouTube Setup)</h3><p class="module__desc">The streaming rig, the OBS scenes, the FCC-safe setup, and the mental model for dialing on camera without freezing.</p></div></div>
      </div>
    </div>
  </section>

  <section class="pull">
    <p class="pull__text">
      Most "cold call training" is theater from people who don't dial.
      I dial live every Tuesday on YouTube. This course is just the system,
      broken down so you can run it Monday morning.
    </p>
    <div class="pull__attr">— Benji Boyce</div>
  </section>

  <section class="cta-strip">
    <div class="cta-strip__eyebrow">Included with $9 AI Empire Insider</div>
    <h2 class="cta-strip__head">Get this + <em>everything in the empire</em> for $9/mo.</h2>
    <a class="cta-strip__btn" href="/insider/">Join Insider</a>
    <a class="cta-strip__alt" href="/founders/">Or grab wholesale GHL for $49/mo (no courses) →</a>
  </section>

` }} />
      <Footer />
    </>
  );
}
