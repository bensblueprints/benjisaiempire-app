"use client";

import { useCallback, useState } from "react";

type Props = {
  title: string;
  description: string | null;
  url: string;
  fileType: string | null;
  tier: string;
  copyText: string | null;
};

export default function PortalDownloadItem({
  title,
  description,
  url,
  fileType,
  tier,
  copyText,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const onCopy = useCallback(async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback for older browsers */
      const ta = document.createElement("textarea");
      ta.value = copyText;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }, [copyText]);

  const tierClass = `portal-dl-item__tier portal-dl-item__tier--${tier.toLowerCase()}`;

  return (
    <li className={`portal-dl-item${copyText ? " portal-dl-item--has-copy" : ""}`}>
      <div className="portal-dl-item__meta">
        {fileType && <span className="portal-dl-item__type">{fileType}</span>}
        <span className={tierClass}>{tier}</span>
      </div>
      <div className="portal-dl-item__body">
        <div className="portal-dl-item__title">{title}</div>
        {description && <div className="portal-dl-item__desc">{description}</div>}
        {copyText && (
          <div className="portal-dl-copy">
            <button
              type="button"
              className="portal-dl-copy__toggle"
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
            >
              {expanded ? "Hide script text" : "Show script text"}
            </button>
            {expanded && (
              <pre className="portal-dl-copy__pre">{copyText}</pre>
            )}
          </div>
        )}
      </div>
      <div className="portal-dl-item__actions">
        {copyText && (
          <button
            type="button"
            className="portal-dl-item__cta portal-dl-item__cta--copy"
            onClick={onCopy}
          >
            {copied ? "Copied ✓" : "Copy text"}
          </button>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="portal-dl-item__cta"
          download
        >
          Download →
        </a>
      </div>
    </li>
  );
}
