// Convenience wrapper — use when a page wants the standard Topbar / Footer
// (and optionally the Marquee). Pages may also compose Topbar / Marquee / Footer
// manually if they need to interleave the marquee with custom content.
import Topbar from "@/components/Topbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

export function SiteShell({
  children,
  withMarquee = false,
}: {
  children: React.ReactNode;
  withMarquee?: boolean;
}) {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Topbar />
      {withMarquee && <Marquee />}
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

export default SiteShell;
