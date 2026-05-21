"use client";

import { useCallback, useEffect, useState } from "react";

type Site = {
  name: string;
  url: string;
  domain: string;
  tagline: string;
  category: string;
  slug: string;
};

const SITES: Site[] = [
  {
    name: "FDH Machinery",
    url: "https://fdh-installations.com",
    domain: "fdh-installations.com",
    tagline:
      "Industrial conveyor and sorter installs — trusted by Amazon, Walmart, and Fortune 500 DCs.",
    category: "B2B · INDUSTRIAL",
    slug: "fdh-machinery",
  },
  {
    name: "SML Wicked Striper",
    url: "https://smlwickedstriper.com",
    domain: "smlwickedstriper.com",
    tagline:
      "Captain Tommy Moore — striper charters on Smith Mountain Lake, gear and bookings included.",
    category: "OUTDOOR · GUIDE",
    slug: "sml-wicked-striper",
  },
  {
    name: "Peptide.best",
    url: "https://peptide.best",
    domain: "peptide.best",
    tagline:
      "Multi-brand peptide marketplace — COA-backed batches, crypto checkout, research hub.",
    category: "E-COMMERCE · MARKETPLACE",
    slug: "peptide-best",
  },
];

type LightboxSite = Site & { thumbSrc: string; fullSrc: string };

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

.portfolio-section .pf-grid{
  display:grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap:40px 28px;
}

.portfolio-section .pf-card{
  display:flex; flex-direction:column;
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

.portfolio-section .pf-preview{
  display:block;
  width:100%;
  padding:0;
  border:none;
  cursor:zoom-in;
  text-align:left;
  background:transparent;
  color:inherit;
  font:inherit;
}
.portfolio-section .pf-frame{
  position:relative;
  width:100%;
  aspect-ratio: 16 / 10;
  overflow:hidden;
  background:var(--ink-2);
  border:1px solid rgba(212,175,55,.22);
  box-shadow: 0 1px 0 rgba(244,236,216,.04) inset;
  transition:border-color .5s var(--ease), box-shadow .5s var(--ease);
}
.portfolio-section .pf-frame img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:top center;
  display:block;
  filter:saturate(1.05) contrast(1.02);
  transition:transform .8s var(--ease), filter .8s var(--ease);
}
.portfolio-section .pf-zoom-hint{
  position:absolute;
  right:12px; bottom:12px;
  z-index:2;
  font-family:'JetBrains Mono',monospace;
  font-size:9px;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:var(--cream);
  background:rgba(11,11,12,.72);
  border:1px solid rgba(212,175,55,.35);
  padding:6px 10px;
  pointer-events:none;
  opacity:0;
  transition:opacity .35s var(--ease);
}
.portfolio-section .pf-preview:hover .pf-frame,
.portfolio-section .pf-preview:focus-visible .pf-frame{
  border-color: rgba(212,175,55,.55);
  box-shadow: 0 18px 60px -28px rgba(212,175,55,.45),
              0 1px 0 rgba(244,236,216,.06) inset;
}
.portfolio-section .pf-preview:hover .pf-frame img,
.portfolio-section .pf-preview:focus-visible .pf-frame img{
  transform:scale(1.03);
  filter:saturate(1.12) contrast(1.05);
}
.portfolio-section .pf-preview:hover .pf-zoom-hint,
.portfolio-section .pf-preview:focus-visible .pf-zoom-hint{
  opacity:1;
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
.portfolio-section .pf-name-link{
  text-decoration:none;
  color:inherit;
}
.portfolio-section .pf-name{
  font-family:'Anton',sans-serif;
  font-weight:400;
  font-size:clamp(22px, 2vw, 26px);
  line-height:1;
  letter-spacing:-.005em;
  text-transform:uppercase;
  color:var(--cream);
  margin:0;
  transition:color .35s var(--ease);
}
.portfolio-section .pf-name-link:hover .pf-name,
.portfolio-section .pf-name-link:focus-visible .pf-name{
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
  margin:0;
}
.portfolio-section .pf-domain{
  margin-top:6px;
  font-family:'JetBrains Mono',monospace;
  font-size:11px; letter-spacing:.16em; text-transform:uppercase;
  color:var(--gold);
  display:inline-flex; align-items:center; gap:8px;
  text-decoration:none;
  max-width:100%;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.portfolio-section .pf-domain::before{
  content:"↗";
  flex-shrink:0;
  transform:translateY(-1px);
  transition:transform .4s var(--ease);
}
.portfolio-section .pf-domain:hover::before,
.portfolio-section .pf-domain:focus-visible::before{
  transform:translate(2px,-3px);
}
.portfolio-section .pf-domain span{
  overflow:hidden; text-overflow:ellipsis;
}

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

/* Lightbox */
.pf-lightbox{
  position:fixed;
  inset:0;
  z-index:9999;
  display:flex;
  flex-direction:column;
  background:rgba(8,8,9,.94);
  backdrop-filter:blur(8px);
  animation:pfLbIn .25s ease;
}
@keyframes pfLbIn{
  from{ opacity:0; }
  to{ opacity:1; }
}
.pf-lightbox__bar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:16px 20px;
  border-bottom:1px solid rgba(212,175,55,.2);
  flex-shrink:0;
}
.pf-lightbox__title{
  font-family:'Anton',sans-serif;
  font-size:18px;
  letter-spacing:.04em;
  text-transform:uppercase;
  color:var(--cream);
}
.pf-lightbox__actions{
  display:flex;
  align-items:center;
  gap:8px;
}
.pf-lightbox__btn{
  font-family:'JetBrains Mono',monospace;
  font-size:11px;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--cream);
  background:rgba(244,236,216,.08);
  border:1px solid rgba(212,175,55,.35);
  padding:8px 12px;
  cursor:pointer;
  transition:background .2s ease, border-color .2s ease;
}
.pf-lightbox__btn:hover,
.pf-lightbox__btn:focus-visible{
  background:rgba(212,175,55,.15);
  border-color:var(--gold);
}
.pf-lightbox__btn--close{
  color:var(--gold-bright);
}
.pf-lightbox__stage{
  flex:1;
  min-height:0;
  overflow:auto;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  padding:24px;
  cursor:grab;
}
.pf-lightbox__stage.is-dragging{ cursor:grabbing; }
.pf-lightbox__img-wrap{
  transform-origin:center center;
  transition:transform .12s ease-out;
  will-change:transform;
}
.pf-lightbox__img{
  display:block;
  max-width:none;
  width:auto;
  height:auto;
  max-height:none;
  border:1px solid rgba(212,175,55,.25);
  box-shadow:0 24px 80px rgba(0,0,0,.55);
  user-select:none;
  -webkit-user-drag:none;
}
.pf-lightbox__hint{
  flex-shrink:0;
  text-align:center;
  padding:10px 16px 18px;
  font-family:'JetBrains Mono',monospace;
  font-size:10px;
  letter-spacing:.2em;
  text-transform:uppercase;
  color:var(--cream-soft);
}

@media (max-width: 900px){
  .portfolio-section{ padding:88px 0 100px; }
  .portfolio-section .pf-wrap{ padding:0 22px; }
  .portfolio-section .pf-masthead{ padding-bottom:36px; margin-bottom:44px; }
  .portfolio-section .pf-grid{
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
  .portfolio-section .pf-frame img,
  .pf-lightbox__img-wrap{
    transition:none !important;
  }
  .pf-lightbox{ animation:none; }
}
`;

function portfolioSrc(slug: string, variant: "thumb" | "full") {
  return `/images/portfolio/${slug}-${variant}.webp`;
}

export default function PortfolioSection() {
  const sites = SITES;
  const total = sites.length;
  const [lightbox, setLightbox] = useState<LightboxSite | null>(null);
  const [zoom, setZoom] = useState(1);

  const openLightbox = useCallback((site: Site) => {
    setLightbox({
      ...site,
      thumbSrc: portfolioSrc(site.slug, "thumb"),
      fullSrc: portfolioSrc(site.slug, "full"),
    });
    setZoom(1);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setZoom(1);
  }, []);

  const zoomBy = useCallback((delta: number) => {
    setZoom((z) => Math.min(4, Math.max(0.5, Math.round((z + delta) * 100) / 100)));
  }, []);

  useEffect(() => {
    if (!lightbox) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "+" || e.key === "=") zoomBy(0.25);
      if (e.key === "-") zoomBy(-0.25);
      if (e.key === "0") setZoom(1);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox, zoomBy]);

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
            Every site below is live right now. <strong>Click a preview to zoom
            the full build</strong> — WebP thumbnails load fast; the hi-res shot
            opens on click. Title or domain opens the live site in a new tab.
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
            const thumbSrc = portfolioSrc(site.slug, "thumb");
            const num = String(i + 1).padStart(2, "0");
            return (
              <article key={site.url} className="pf-card">
                <div className="pf-card-no">
                  <span>№ {num}</span>
                </div>

                <button
                  type="button"
                  className="pf-preview"
                  onClick={() => openLightbox(site)}
                  aria-label={`${site.name} — zoom full preview`}
                >
                  <div className="pf-frame">
                    <img
                      src={thumbSrc}
                      alt={`${site.name} — site preview`}
                      loading="lazy"
                      decoding="async"
                      width={900}
                      height={563}
                    />
                    <span className="pf-zoom-hint">Click to zoom</span>
                  </div>
                </button>

                <div className="pf-meta">
                  <div className="pf-cat">{site.category}</div>
                  <a
                    className="pf-name-link"
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="pf-name">{site.name}</h3>
                  </a>
                  <p className="pf-tag">{site.tagline}</p>
                  <a
                    className="pf-domain"
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{site.domain}</span>
                  </a>
                </div>
              </article>
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

      {lightbox ? (
        <div
          className="pf-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.name} preview`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="pf-lightbox__bar">
            <span className="pf-lightbox__title">{lightbox.name}</span>
            <div className="pf-lightbox__actions">
              <button
                type="button"
                className="pf-lightbox__btn"
                onClick={() => zoomBy(-0.25)}
                aria-label="Zoom out"
              >
                −
              </button>
              <button
                type="button"
                className="pf-lightbox__btn"
                onClick={() => setZoom(1)}
                aria-label="Reset zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                className="pf-lightbox__btn"
                onClick={() => zoomBy(0.25)}
                aria-label="Zoom in"
              >
                +
              </button>
              <a
                className="pf-lightbox__btn"
                href={lightbox.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open site
              </a>
              <button
                type="button"
                className="pf-lightbox__btn pf-lightbox__btn--close"
                onClick={closeLightbox}
                aria-label="Close preview"
              >
                Close
              </button>
            </div>
          </div>

          <div
            className="pf-lightbox__stage"
            onWheel={(e) => {
              e.preventDefault();
              zoomBy(e.deltaY < 0 ? 0.15 : -0.15);
            }}
          >
            <div
              className="pf-lightbox__img-wrap"
              style={{ transform: `scale(${zoom})` }}
            >
              {/* Full WebP loads only when lightbox opens */}
              <img
                className="pf-lightbox__img"
                src={lightbox.fullSrc}
                alt={`${lightbox.name} — full preview`}
                decoding="async"
                draggable={false}
              />
            </div>
          </div>

          <p className="pf-lightbox__hint">
            Scroll or use + / − to zoom · Esc to close
          </p>
        </div>
      ) : null}
    </section>
  );
}
