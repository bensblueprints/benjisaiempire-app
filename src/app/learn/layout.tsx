// Server layout for /learn/*. Defense-in-depth tier check on top of middleware.
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export default async function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/learn");
  }
  const isInsider = session.user.tier === "INSIDER";
  const isAdmin = session.user.role === "ADMIN";
  if (!isInsider && !isAdmin) {
    redirect("/portal?upgrade=1");
  }

  return (
    <>
      <Topbar />
      <main
        id="main"
        style={{
          minHeight: "calc(100vh - 80px)",
          background: "var(--ink)",
          color: "var(--cream)",
          padding: "clamp(28px, 5vw, 72px) clamp(20px, 5vw, 56px) clamp(64px, 8vw, 120px)",
        }}
      >
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>{children}</div>
      </main>
      <Footer />
    </>
  );
}
