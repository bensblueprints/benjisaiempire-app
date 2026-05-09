import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://benjisaiempire.com"),
  title: {
    default: "Benji's AI Empire — Sales Calls Free · Everything Else $10 · Wholesale GHL $49",
    template: "%s · Benji's AI Empire",
  },
  description:
    "Watch me cold-call live every Tuesday — free. Every course, prompt, script, and the GHL reseller account is $10/mo. Wholesale GHL @ $0.015/min for the first 100 operators.",
  themeColor: "#0b0b0c",
  icons: { icon: "/favicon.png" },
  openGraph: {
    type: "website",
    siteName: "Benji's AI Empire",
    images: [{ url: "/images/hero-empire.jpg?v=2" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles/site.css" />
      </head>
      <body>
        <a className="skip-to-main" href="#main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
