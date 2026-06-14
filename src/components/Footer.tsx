// Server component — editorial colophon footer.
// Styles already shipped in /public/styles/site.css under .shell-footer.
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="shell-footer" data-shell="footer">
      <div className="shell-footer__inner">
        <div className="shell-footer__grid">
          {/* Column 1 — brand / colophon */}
          <div className="shell-footer__col shell-footer__col--brand">
            <h2 className="shell-footer__brand-name">Benji&apos;s AI Empire</h2>
            <p className="shell-footer__brand-meta">
              Operator&apos;s Playbook &nbsp;·&nbsp; Built In Public
            </p>
            <p className="shell-footer__brand-tagline">
              A weekly dispatch from the build floor — every cold call, every
              launch, every dollar tracked in the open.
            </p>
          </div>

          {/* Column 2 — Entry Points */}
          <div className="shell-footer__col">
            <h3 className="shell-footer__col-head">Entry Points</h3>
            <ul className="shell-footer__list">
              <li>
                <Link className="shell-footer__link" href="/insider">
                  AI Empire Insider
                </Link>
              </li>
              <li>
                <Link className="shell-footer__link" href="/challenge">
                  Empire Challenge
                </Link>
              </li>
              <li>
                <Link className="shell-footer__link" href="/cold-call-30">
                  Cold Calling Challenge
                </Link>
              </li>
              <li>
                <Link className="shell-footer__link" href="/partners">
                  Software Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Join */}
          <div className="shell-footer__col">
            <h3 className="shell-footer__col-head">Join</h3>
            <ul className="shell-footer__list">
              <li>
                <Link className="shell-footer__link" href="/insider">
                  Insider{" "}
                  <span className="shell-footer__link-meta">$9/mo</span>
                </Link>
              </li>
              <li>
                <Link className="shell-footer__link" href="/login?callbackUrl=/portal">
                  Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Every Week */}
          <div className="shell-footer__col">
            <h3 className="shell-footer__col-head">Every Week</h3>
            <ul className="shell-footer__list">
              <li>
                <a
                  className="shell-footer__link"
                  href="https://www.youtube.com/channel/UCT6RXVsmGY7U_LxcUFoVC0g"
                  target="_blank"
                  rel="noopener"
                >
                  Tuesday Cold Call Live{" "}
                  <span className="shell-footer__link-meta">YouTube</span>
                </a>
              </li>
              <li>
                <a
                  className="shell-footer__link"
                  href="https://www.youtube.com/channel/UCT6RXVsmGY7U_LxcUFoVC0g"
                  target="_blank"
                  rel="noopener"
                >
                  Thursday Build Day{" "}
                  <span className="shell-footer__link-meta">YouTube</span>
                </a>
              </li>
              <li>
                <Link className="shell-footer__link" href="/podcast">
                  Up For AI Debate{" "}
                  <span className="shell-footer__link-meta">Podcast</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="shell-footer__bottom">
          <div className="shell-footer__bottom-left">
            <span className="shell-footer__copy">
              © 2026 &nbsp;<strong>Advanced Marketing</strong>
            </span>
            <span className="shell-footer__divider" aria-hidden="true" />
            <span>All Rights Reserved</span>
            <span className="shell-footer__divider" aria-hidden="true" />
            <Link className="shell-footer__link" href="/privacy-policy">Privacy Policy</Link>
          </div>
          <span className="shell-footer__tag">Built In Public Since 2024</span>
        </div>
      </div>
    </footer>
  );
}
