"use client";
import { useEffect, useRef } from "react";

const WIDGET_ID = "ntvhTJiwVN1c4CzXTSOA_1779770004876";

export default function BookingWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // LoopFlo script — resizes the iframe via postMessage
    const script = document.createElement("script");
    script.src = "https://api.loopflo.io/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    // Fallback resize listener in case the script uses postMessage directly
    const onMessage = (e: MessageEvent) => {
      if (!iframeRef.current) return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.height && String(data?.id) === WIDGET_ID) {
          iframeRef.current.style.height = `${data.height}px`;
        }
      } catch {}
    };
    window.addEventListener("message", onMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="https://api.loopflo.io/widget/booking/ntvhTJiwVN1c4CzXTSOA"
      id={WIDGET_ID}
      style={{ width: "100%", border: "none", display: "block", minHeight: "800px" }}
      scrolling="no"
      title="Book a free website consultation"
      className="wd-loopflo"
    />
  );
}
