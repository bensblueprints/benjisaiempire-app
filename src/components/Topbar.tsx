// Server component — magazine masthead.
// Shows different right-side links based on session/role.
// Styles already shipped in /public/styles/site.css under .shell-topbar.
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

async function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="shell-topbar__signout-form"
    >
      <button type="submit" className="shell-topbar__login" aria-label="Sign out">
        Sign Out
      </button>
    </form>
  );
}

export default async function Topbar() {
  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="shell-topbar" data-shell="topbar">
      <div className="shell-topbar__inner">
        <Link
          href="/"
          className="shell-topbar__brand"
          aria-label="Benji's AI Empire — home"
        >
          <span className="shell-topbar__brand-name">Benji&apos;s AI Empire</span>
          <span className="shell-topbar__brand-sub">
            Issue 01 &nbsp;·&nbsp; May 2026 &nbsp;·&nbsp; Advanced Marketing
          </span>
        </Link>

        <nav className="shell-topbar__center" aria-label="Membership">
          <Link className="shell-topbar__pill" href="/insider/">
            Insider <em>$9</em>
          </Link>
        </nav>

        <div className="shell-topbar__right">
          {!user ? (
            <>
              <Link className="shell-topbar__login" href="/login?callbackUrl=/portal">
                Portal Login
              </Link>
              <Link className="shell-topbar__cta" href="/#pricing">
                See Pricing
              </Link>
            </>
          ) : (
            <>
              {isAdmin && (
                <Link className="shell-topbar__login" href="/admin">
                  Admin
                </Link>
              )}
              <Link className="shell-topbar__cta" href="/portal">
                Portal
              </Link>
              <SignOutButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
