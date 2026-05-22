type Props = {
  title: string;
  description: string;
  url: string;
  buttonLabel: string;
  badge?: string;
  tier: string;
};

export default function PortalSoftwareItem({
  title,
  description,
  url,
  buttonLabel,
  badge,
  tier,
}: Props) {
  const tierClass = `portal-sw-item__tier portal-sw-item__tier--${tier.toLowerCase()}`;

  return (
    <li className="portal-sw-item">
      <div className="portal-sw-item__meta">
        {badge && <span className="portal-sw-item__badge">{badge}</span>}
        <span className={tierClass}>{tier}</span>
      </div>
      <div className="portal-sw-item__body">
        <h3 className="portal-sw-item__title">{title}</h3>
        <p className="portal-sw-item__desc">{description}</p>
      </div>
      <div className="portal-sw-item__actions">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="portal-sw-item__cta"
        >
          {buttonLabel}
        </a>
      </div>
    </li>
  );
}
