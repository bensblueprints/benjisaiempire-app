"use client";
import { useEffect } from "react";

export default function BookingWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.loopflo.io/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <iframe
      src="https://api.loopflo.io/widget/booking/ntvhTJiwVN1c4CzXTSOA"
      id="ntvhTJiwVN1c4CzXTSOA_1779770004876"
      style={{ width: "100%", border: "none", overflow: "hidden" }}
      scrolling="no"
      title="Book a free website consultation"
      className="wd-loopflo"
    />
  );
}
