// Server component — magazine ticker / proof bar
// Twin gold rules top + bottom, mono caps, gold accents on numbers.
// Styles already shipped in /public/styles/site.css under .shell-marquee.

const ITEMS: { label: string; tone?: "accent" | "brand" }[] = [
  { label: "$2.8M All-Stores", tone: "accent" },
  { label: "1B+ Reddit Views", tone: "accent" },
  { label: "250K+ Shopify Orders", tone: "accent" },
  { label: "Forbes", tone: "brand" },
  { label: "Yahoo Finance", tone: "brand" },
  { label: "Nasdaq", tone: "brand" },
  { label: "LA Weekly", tone: "brand" },
  { label: "52 Weeks Live", tone: "accent" },
  { label: "Tuesday Cold Call Live" },
  { label: "Thursday Build Day" },
  { label: "Built In Public" },
];

function Group({ ariaHidden }: { ariaHidden: boolean }) {
  return (
    <div className="shell-marquee__group" aria-hidden={ariaHidden}>
      {ITEMS.map((item, i) => (
        <span key={`${ariaHidden ? "b" : "a"}-${i}`} className="contents">
          <span
            className={
              "shell-marquee__item" +
              (item.tone === "accent"
                ? " shell-marquee__item--accent"
                : item.tone === "brand"
                ? " shell-marquee__item--brand"
                : "")
            }
          >
            {item.label}
          </span>
          <span className="shell-marquee__sep" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="shell-marquee" role="region" aria-label="Proof ticker">
      <span
        className="shell-marquee__fade shell-marquee__fade--left"
        aria-hidden="true"
      />
      <span
        className="shell-marquee__fade shell-marquee__fade--right"
        aria-hidden="true"
      />
      <div className="shell-marquee__track">
        <Group ariaHidden={false} />
        <Group ariaHidden={true} />
      </div>
    </div>
  );
}
