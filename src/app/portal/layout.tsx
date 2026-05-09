import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Member Portal",
  robots: { index: false, follow: false },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar />
      <main id="main" className="portal-main">
        {children}
      </main>
      <Footer />
      <style>{`
        .portal-main {
          background: var(--ink);
          color: var(--cream);
          min-height: 70vh;
          padding: 4rem 1.5rem 6rem;
        }
        @media (min-width: 768px) {
          .portal-main { padding: 5rem 2.5rem 7rem; }
        }
      `}</style>
    </>
  );
}
