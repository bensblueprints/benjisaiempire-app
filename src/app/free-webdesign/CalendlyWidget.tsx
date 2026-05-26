"use client";
import { useEffect } from "react";

export default function CalendlyWidget({ url }: { url: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div
      className="calendly-inline-widget wd-calendly"
      data-url={url}
      aria-label="Book a free website consultation"
    />
  );
}
