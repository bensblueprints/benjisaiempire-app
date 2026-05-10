// Place this section between two existing sections in src/app/page.tsx
// Recommended slot: after the Receipts gallery (proof-section) and before the final CTA strip
// Import: `import PortfolioSection from "@/components/PortfolioSection";`
// Insert: `<PortfolioSection />`

type Site = {
  name: string;
  url: string;
  domain: string;
  tagline: string;
  category: string;
};

const SITES: Site[] = [
  {
    name: "Lees Ferry On The Fly",
    url: "https://leesferry.advancedmarketing.co",
    domain: "leesferry.advancedmarketing.co",
    tagline: "Arizona trout water, booked from the boat ramp.",
    category: "OUTDOOR · GUIDE",
  },
  {
    name: "Cave Run Muskie",
    url: "https://kymuskie.advancedmarketing.co",
    domain: "kymuskie.advancedmarketing.co",
    tagline: "Kentucky's fish of ten thousand casts.",
    category: "OUTDOOR · GUIDE",
  },
  {
    name: "Rainy Lake Fish Guiding",
    url: "https://rainylake.advancedmarketing.co",
    domain: "rainylake.advancedmarketing.co",
    tagline: "Walleye and smallies on the border water.",
    category: "OUTDOOR · GUIDE",
  },
  {
    name: "Ten 2 Ten Stereo",
    url: "https://ten2tenstereo.advancedmarketing.co",
    domain: "ten2tenstereo.advancedmarketing.co",
    tagline: "Car audio shop with subs that move air.",
    category: "RETAIL · LOCAL",
  },
  {
    name: "The Beach Bowl",
    url: "https://beachbowl.advancedmarketing.co",
    domain: "beachbowl.advancedmarketing.co",
    tagline: "Bowling alley with a brand identity worth keeping.",
    category: "RETAIL · LOCAL",
  },
  {
    name: "Got Beef",
    url: "https://gotbeef.us",
    domain: "gotbeef.us",
    tagline: "Direct-to-door beef. .us TLD, full identity build.",
    category: "RETAIL · DTC",
  },
  {
    name: "DED Gaming",
    url: "https://ded.advancedmarketing.co",
    domain: "ded.advancedmarketing.co",
    tagline: "Competitive gaming brand, dressed to kill.",
    category: "GAMING · BRAND",
  },
  {
    name: "Game On Arcade",
    url: "https://gameon.advancedmarketing.co",
    domain: "gameon.advancedmarketing.co",
    tagline: "Arcade nostalgia, redrawn for 2026.",
    category: "GAMING · ARCADE",
  },
  {
    name: "StarFighters Arcade",
    url: "https://starfighters.advancedmarketing.co",
    domain: "starfighters.advancedmarketing.co",
    tagline: "Quarter-eating cabinet rooms, on the web.",
    category: "GAMING · ARCADE",
  },
  {
    name: "PixelJoy",
    url: "https://pixeljoy.advancedmarketing.co",
    domain: "pixeljoy.advancedmarketing.co",
    tagline: "Arcade-rental shop dressed for the kid in everyone.",
    category: "GAMING · RENTAL",
  },
  {
    name: "DropCards",
    url: "https://dropcards.advancedmarketing.co",
    domain: "dropcards.advancedmarketing.co",
    tagline: "Business-card SaaS, contact in two taps.",
    category: "SAAS · TOOL",
  },
  {
    name: "Cold Call Academy",
    url: "https://coldcallacademy.com",
    domain: "coldcallacademy.com",
    tagline: "The course, the scripts, the receipts.",
    category: "EDU · COURSE",
  },
  {
    name: "Kilowatt",
    url: "https://kilo.advancedmarketing.co",
    domain: "kilo.advancedmarketing.co",
    tagline: "Energy startup with a power-grid swagger.",
    category: "STARTUP · ENERGY",
  },
  {
    name: "Shopify Photo Gen",
    url: "https://photos.advancedmarketing.co",
    domain: "photos.advancedmarketing.co",
    tagline: "AI product photos for stores that ship today.",
    category: "SAAS · AGENCY TOOL",
  },
  {
    name: "PR Agent",
    url: "https://press.advancedmarketing.co",
    domain: "press.advancedmarketing.co",
    tagline: "Automated PR distribution, hands-off.",
    category: "SAAS · AGENCY TOOL",
  },
  {
    name: "Domain Checker",
    url: "https://domains.advancedmarketing.co",
    domain: "domains.advancedmarketing.co",
    tagline: "The domain finder that actually finds them.",
    category: "SAAS · AGENCY TOOL",
  },
  {
    name: "GMaps Image Scraper",
    url: "https://maps.advancedmarketing.co",
    domain: "maps.advancedmarketing.co",
    tagline: "Local lead-gen, scraped clean off the map.",
    category: "SAAS · LEAD GEN",
  },
];

const CSS = `
.portfolio-section{
  position:relative;
  background:var(--ink);
  color:var(--cream);
  padding:120px 0 140px;
  overflow:hidden;
  isolation:isolate;
  font-family:'Manrope',sans-serif;
}
.portfolio-section::before{
  content:"";
  position:absolute; inset:0;
  background-image:
    radial-gradient(rgba(244,236,216,.04) 1px, transparent 1px),
    radial-gradient(rgba(11,11,12,.06) 1px, transparent 1px);
  background-size:3px 3px, 5px 5px;
  background-position:0 0, 1px 2px;
  mix-blend-mode:overlay;
  pointer-events:none;
  z-index:0;
  opacity:.5;
}
.portfolio-section > *{ position:relative; z-index:1; }

.portfolio-section .pf-wrap{
  max-width:var(--container);
  margin:0 auto;
  padding:0 32px;
}

/* ── Masthead ─────────────────────────────────────────────────── */
.portfolio-section .pf-masthead{
  display:grid;
  grid-template-columns: 1fr;
  gap:18px;
  padding-bottom:56px;
  border-bottom:1px solid var(--line);
  margin-bottom:64px;
  position:relative;
}
.portfolio-section .pf-eyebrow{
  display:flex; align-items:center; gap:14px;
  font-family:'JetBrains Mono',monospace;
  font-size:11px; letter-spacing:.28em; text-transform:uppercase;
  color:var(--gold);
}
.portfolio-section .pf-eyebrow::before{
  content:""; width:42px; height:1px; background:var(--gold);
}
.portfolio-section .pf-eyebrow .pf-folio{
  margin-left:auto;
  color:var(--cream-soft);
  letter-spacing:.22em;
  font-size:10px;
}
.portfolio-section .pf-eyebrow .pf-folio span{ color:var(--gold); }

.portfolio-section .pf-headline{
  font-family:'Anton',sans-serif;
  font-weight:400;
  font-size:clamp(44px, 8vw, 116px);
  line-height:.92;
  letter-spacing:-.02em;
  text-transform:uppercase;
  color:var(--cream);
  max-width:14ch;
}
.portfolio-section .pf-headline em{
  font-family:'Fraunces',serif;
  font-style:italic;
  font-weight:300;
  text-transform:none;
  letter-spacing:-.01em;
  color:var(--gold-bright);
}

.portfolio-section .pf-lede{
  font-family:'Fraunces',serif;
  font-style:italic;
  font-weight:300;
  font-size:clamp(17px, 1.6vw, 22px);
  line-height:1.5;
  color:var(--cream-soft);
  max-width:62ch;
  margin-top:8px;
}
.portfolio-section .pf-lede strong{
  font-style:normal;
  font-family:'Manrope',sans-serif;
  font-weight:600;
  color:var(--cream);
}

/* gold rule between header and grid */
.portfolio-section .pf-rule{
  display:flex; align-items:center; gap:16px;
  margin-bottom:48px;
  font-family:'JetBrains Mono',monospace;
  font-size:10px; letter-spacing:.3em; text-transform:uppercase;
  color:var(--cream-soft);
}
.portfolio-section .pf-rule .pf-line{
  flex:1; height:1px;
  background:linear-gradient(90deg, var(--gold) 0%, var(--gold) 60%, transparent 100%);
}
.portfolio-section .pf-rule .pf-line.right{
  background:linear-gradient(270deg, transparent 0%, var(--line) 100%);
}

/* ── Grid ─────────────────────────────────────────────────────── */
.portfolio-section .pf-grid{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap:40px 28px;
}

.portfolio-section .pf-card{
  display:flex; flex-direction:column;
  text-decoration:none;
  color:inherit;
  position:relative;
  isolation:isolate;
}
.portfolio-section .pf-card-no{
  font-family:'JetBrains Mono',monospace;
  font-size:10px; letter-spacing:.3em; text-transform:uppercase;
  color:var(--gold);
  margin-bottom:10px;
  display:flex; align-items:center; gap:10px;
}
.portfolio-section .pf-card-no::after{
  content:""; flex:1; height:1px; background:var(--line);
}

.portfolio-section .pf-frame{
  position:relative;
  width:100%;
  aspect-ratio: 16 / 10;
  overflow:hidden;
  background:var(--ink-2);
  border:1px solid rgba(212,175,55,.22);
  box-shadow: 0 1px 0 rgba(244,236,216,.04) inset;
  transition:border-color .5s var(--ease), box-shadow .5s var(--ease), transform .8s var(--ease);
}
.portfolio-section .pf-frame::before{
  /* fallback brand-name tile, sits behind the <img> */
  content: attr(data-fallback);
  position:absolute; inset:0;
  display:flex; align-items:center; justify-content:center;
  font-family:'Anton',sans-serif;
  font-size:clamp(22px, 3vw, 36px);
  text-transform:uppercase;
  letter-spacing:-.01em;
  color:var(--cream-soft);
  background:
    radial-gradient(120% 80% at 50% 0%, rgba(212,175,55,.10), transparent 60%),
    var(--ink-2);
  text-align:center;
  padding:20px;
  z-index:0;
}
.portfolio-section .pf-frame img{
  position:relative; z-index:1;
  width:100%; height:100%;
  object-fit:cover; object-position:top center;
  transform:scale(1);
  transition:transform .8s var(--ease), filter .8s var(--ease);
  filter:saturate(1.05) contrast(1.02);
  background:var(--ink-2);
}
.portfolio-section .pf-frame::after{
  /* gold-tint frame on hover */
  content:"";
  position:absolute; inset:0;
  border:1px solid transparent;
  pointer-events:none;
  z-index:2;
  transition:border-color .5s var(--ease);
}
.portfolio-section .pf-card:hover .pf-frame img,
.portfolio-section .pf-card:focus-visible .pf-frame img{
  transform:scale(1.04);
  filter:saturate(1.15) contrast(1.06);
}
.portfolio-section .pf-card:hover .pf-frame,
.portfolio-section .pf-card:focus-visible .pf-frame{
  border-color: rgba(212,175,55,.55);
  box-shadow: 0 18px 60px -28px rgba(212,175,55,.45),
              0 1px 0 rgba(244,236,216,.06) inset;
}
.portfolio-section .pf-card:hover .pf-frame::after,
.portfolio-section .pf-card:focus-visible .pf-frame::after{
  border-color: rgba(245,208,97,.35);
}

.portfolio-section .pf-meta{
  padding:18px 0 0;
  display:flex; flex-direction:column; gap:8px;
}
.portfolio-section .pf-cat{
  font-family:'JetBrains Mono',monospace;
  font-size:10px; letter-spacing:.3em; text-transform:uppercase;
  color:var(--cream-soft);
}
.portfolio-section .pf-name{
  font-family:'Anton',sans-serif;
  font-weight:400;
  font-size:clamp(22px, 2vw, 26px);
  line-height:1;
  letter-spacing:-.005em;
  text-transform:uppercase;
  color:var(--cream);
}
.portfolio-section .pf-card:hover .pf-name,
.portfolio-section .pf-card:focus-visible .pf-name{
  color:var(--gold-bright);
}
.portfolio-section .pf-tag{
  font-family:'Fraunces',serif;
  font-style:italic;
  font-weight:300;
  font-size:15px;
  line-height:1.35;
  color:var(--cream-soft);
  max-width:34ch;
}
.portfolio-section .pf-domain{
  margin-top:6px;
  font-family:'JetBrains Mono',monospace;
  font-size:11px; letter-spacing:.16em; text-transform:uppercase;
  color:var(--gold);
  display:flex; align-items:center; gap:8px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  max-width:100%;
}
.portfolio-section .pf-domain::before{
  content:"↗";
  display:inline-block;
  font-family:'JetBrains Mono',monospace;
  color:var(--gold);
  transform:translateY(-1px);
  transition:transform .4s var(--ease);
  flex-shrink:0;
}
.portfolio-section .pf-card:hover .pf-domain::before,
.portfolio-section .pf-card:focus-visible .pf-domain::before{
  transform:translate(2px,-3px);
}
.portfolio-section .pf-domain span{
  overflow:hidden; text-overflow:ellipsis;
}

/* ── Closing rule + footnote ─────────────────────────────────── */
.portfolio-section .pf-foot{
  margin-top:72px;
  padding-top:28px;
  border-top:1px solid var(--line);
  display:flex; align-items:center; justify-content:space-between;
  gap:24px;
  font-family:'JetBrains Mono',monospace;
  font-size:11px; letter-spacing:.22em; text-transform:uppercase;
  color:var(--cream-soft);
  flex-wrap:wrap;
}
.portfolio-section .pf-foot strong{
  color:var(--gold);
  font-weight:500;
  letter-spacing:.22em;
}
.portfolio-section .pf-foot em{
  font-family:'Fraunces',serif;
  font-style:italic;
  text-transform:none;
  font-weight:300;
  letter-spacing:.02em;
  font-size:14px;
  color:var(--cream-soft);
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 900px){
  .portfolio-section{ padding:88px 0 100px; }
  .portfolio-section .pf-wrap{ padding:0 22px; }
  .portfolio-section .pf-masthead{ padding-bottom:36px; margin-bottom:44px; }
  .portfolio-section .pf-grid{
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap:36px 22px;
  }
}
@media (max-width: 560px){
  .portfolio-section{ padding:72px 0 88px; }
  .portfolio-section .pf-wrap{ padding:0 18px; }
  .portfolio-section .pf-grid{
    grid-template-columns: 1fr;
    gap:44px;
  }
  .portfolio-section .pf-headline{ font-size:clamp(40px, 12vw, 64px); }
  .portfolio-section .pf-foot{ font-size:10px; }
}

@media (prefers-reduced-motion: reduce){
  .portfolio-section .pf-frame,
  .portfolio-section .pf-frame img{
    transition:none !important;
    transform:none !important;
  }
}
`;

export default function PortfolioSection() {
  const sites = SITES;
  const total = sites.length;

  return (
    <section
      className="portfolio-section"
      aria-labelledby="pf-headline"
      id="portfolio"
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="pf-wrap">
        <header className="pf-masthead">
          <div className="pf-eyebrow">
            <span>Portfolio · {total} Live Builds</span>
            <span className="pf-folio">
              VOL. <span>07</span> &nbsp;/&nbsp; FIELD <span>NOTES</span>
            </span>
          </div>

          <h2 id="pf-headline" className="pf-headline">
            Websites <em>we&rsquo;ve</em> built.
          </h2>

          <p className="pf-lede">
            Every site below is live right now. <strong>Hosted on our own
            Coolify box, billed at $7 a month, deployed in an afternoon.</strong>
            {" "}Click any tile to open the real thing in a new tab — no demos,
            no Figma, no &ldquo;coming soon.&rdquo;
          </p>
        </header>

        <div className="pf-rule" aria-hidden="true">
          <span>The Index</span>
          <span className="pf-line" />
          <span>{String(total).padStart(2, "0")} Entries</span>
          <span className="pf-line right" />
        </div>

        <div className="pf-grid">
          {sites.map((site, i) => {
            const screenshot = `https://image.thum.io/get/width/800/crop/500/${site.url}`;
            const num = String(i + 1).padStart(2, "0");
            return (
              <a
                key={site.url}
                className="pf-card"
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} — open ${site.domain} in a new tab`}
              >
                <div className="pf-card-no">
                  <span>№ {num}</span>
                </div>

                <div className="pf-frame" data-fallback={site.name}>
                  <img
                    src={screenshot}
                    alt={`${site.name} — live screenshot`}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                  />
                </div>

                <div className="pf-meta">
                  <div className="pf-cat">{site.category}</div>
                  <h3 className="pf-name">{site.name}</h3>
                  <p className="pf-tag">{site.tagline}</p>
                  <div className="pf-domain" aria-hidden="true">
                    <span>{site.domain}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="pf-foot">
          <span>
            All sites <strong>live</strong> · hosted on <strong>Coolify</strong> ·
            DNS via <strong>Cloudflare</strong>
          </span>
          <em>Yours could ship by Friday.</em>
        </div>
      </div>
    </section>
  );
}
