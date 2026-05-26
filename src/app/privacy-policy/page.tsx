import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy · Benji's AI Empire",
  description: "How Benji's AI Empire collects, uses, and protects your personal data.",
  alternates: { canonical: "https://benjisaiempire.com/privacy-policy/" },
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  .pp-wrap {
    max-width: 780px;
    margin: 0 auto;
    padding: clamp(64px, 9vw, 120px) clamp(20px, 4vw, 56px);
  }
  .pp-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px; letter-spacing: .32em; text-transform: uppercase;
    color: var(--gold);
    display: inline-flex; align-items: center; gap: 14px;
    margin-bottom: 28px;
  }
  .pp-eyebrow::before {
    content: ""; display: inline-block;
    width: 32px; height: 1px; background: var(--gold);
  }
  .pp-h1 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(42px, 5.6vw, 76px);
    line-height: .92; letter-spacing: -.012em;
    text-transform: uppercase;
    color: var(--cream);
    margin: 0 0 18px;
  }
  .pp-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
    color: var(--cream-soft);
    border-top: 1px solid var(--line);
    padding-top: 18px;
    margin-bottom: clamp(48px, 6vw, 80px);
  }
  .pp-section {
    margin-bottom: clamp(40px, 5vw, 64px);
    padding-bottom: clamp(40px, 5vw, 64px);
    border-bottom: 1px solid var(--line);
  }
  .pp-section:last-of-type {
    border-bottom: none;
  }
  .pp-h2 {
    font-family: 'Anton', sans-serif; font-weight: 400;
    font-size: clamp(22px, 2.4vw, 30px);
    line-height: 1; letter-spacing: .01em;
    text-transform: uppercase;
    color: var(--cream);
    margin: 0 0 20px;
    display: flex; align-items: center; gap: 14px;
  }
  .pp-h2-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: .28em;
    color: var(--gold);
    font-weight: 400;
  }
  .pp-body {
    font-family: 'Fraunces', serif;
    font-size: clamp(16px, 1.2vw, 18px);
    line-height: 1.7;
    color: var(--bone);
  }
  .pp-body p { margin: 0 0 18px; }
  .pp-body p:last-child { margin-bottom: 0; }
  .pp-body strong { color: var(--cream); font-weight: 600; font-style: italic; }
  .pp-body a { color: var(--gold); text-underline-offset: 3px; }
  .pp-body a:hover { color: var(--gold-bright); }
  .pp-list {
    list-style: none; margin: 18px 0; padding: 0;
    display: flex; flex-direction: column; gap: 12px;
  }
  .pp-list li {
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 12px;
    font-family: 'Fraunces', serif;
    font-size: clamp(15px, 1.1vw, 17px);
    line-height: 1.6;
    color: var(--bone);
  }
  .pp-list li::before {
    content: "→";
    color: var(--gold);
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    margin-top: 2px;
  }
  .pp-contact {
    margin-top: 32px;
    padding: clamp(24px, 3vw, 36px);
    border: 1px solid var(--line);
    background: rgba(244,236,216,.02);
  }
  .pp-contact__label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 14px;
  }
  .pp-contact__email {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px; letter-spacing: .06em;
    color: var(--cream);
  }
` }} />

      <Topbar />

      <main id="main">
        <div className="pp-wrap">
          <p className="pp-eyebrow">Legal · Privacy Policy</p>
          <h1 className="pp-h1">Privacy Policy</h1>
          <p className="pp-meta">Effective date: May 26, 2026 &nbsp;·&nbsp; Advanced Marketing Co.</p>

          <section className="pp-section">
            <h2 className="pp-h2">
              <span className="pp-h2-num">01 —</span> Who We Are
            </h2>
            <div className="pp-body">
              <p>
                Benji&apos;s AI Empire is operated by <strong>Advanced Marketing Co.</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
                This policy explains what personal data we collect, why we collect it, and how we protect it
                when you use <strong>benjisaiempire.com</strong> and related services.
              </p>
            </div>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2">
              <span className="pp-h2-num">02 —</span> Data We Collect
            </h2>
            <div className="pp-body">
              <p>We collect only what&apos;s necessary to provide the service:</p>
              <ul className="pp-list">
                <li><strong>Email address</strong> — used to create your account and send magic-link sign-in emails. No password is ever stored.</li>
                <li><strong>Payment information</strong> — processed directly by Airwallex or Stripe. We never see or store full card numbers.</li>
                <li><strong>Usage data</strong> — pages visited, course progress, and session timestamps stored in our database for your portal to function.</li>
                <li><strong>Device &amp; browser data</strong> — collected automatically via standard web logs (IP address, browser type, referring URL) for security and diagnostics.</li>
              </ul>
            </div>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2">
              <span className="pp-h2-num">03 —</span> How We Use It
            </h2>
            <div className="pp-body">
              <ul className="pp-list">
                <li>To create and manage your account and subscription tier.</li>
                <li>To send transactional emails — magic links, receipts, and account notices.</li>
                <li>To track course progress and unlock content based on your membership tier.</li>
                <li>To process and verify payments and handle subscription changes.</li>
                <li>To protect the platform from fraud and unauthorized access.</li>
                <li>To improve the site based on aggregated, anonymized usage patterns.</li>
              </ul>
              <p style={{ marginTop: '18px' }}>We do <strong>not</strong> sell your data. We do not send unsolicited marketing emails.</p>
            </div>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2">
              <span className="pp-h2-num">04 —</span> Third-Party Services
            </h2>
            <div className="pp-body">
              <p>We share data only with services required to operate the platform:</p>
              <ul className="pp-list">
                <li><strong>Resend</strong> — transactional email delivery (magic links, receipts). Your email is transmitted to send your sign-in link.</li>
                <li><strong>Airwallex</strong> — primary payment processor. Handles card data under PCI-DSS compliance.</li>
                <li><strong>Stripe</strong> — legacy/fallback payment processor. Same PCI-DSS standards.</li>
                <li><strong>Supabase / PostgreSQL</strong> — our managed database host. Data is encrypted at rest.</li>
                <li><strong>Netlify</strong> — hosting infrastructure. Processes requests and serves the application.</li>
                <li><strong>GoHighLevel</strong> — CRM and sub-account platform provided to Insider and Wholesale members.</li>
              </ul>
              <p style={{ marginTop: '18px' }}>Each third party operates under its own privacy policy and is contractually required to protect your data.</p>
            </div>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2">
              <span className="pp-h2-num">05 —</span> Cookies
            </h2>
            <div className="pp-body">
              <p>
                We use a single session cookie (<strong>next-auth.session-token</strong>) to keep you logged in.
                No advertising or cross-site tracking cookies are set. If you block cookies, you will not be
                able to access the member portal.
              </p>
            </div>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2">
              <span className="pp-h2-num">06 —</span> Data Retention
            </h2>
            <div className="pp-body">
              <p>
                We retain your account data for as long as your account is active plus 90 days after deletion,
                for legal and accounting purposes. Payment records are kept for 7 years as required by applicable
                tax law. You may request deletion at any time.
              </p>
            </div>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2">
              <span className="pp-h2-num">07 —</span> Your Rights
            </h2>
            <div className="pp-body">
              <p>You have the right to:</p>
              <ul className="pp-list">
                <li>Access a copy of the personal data we hold about you.</li>
                <li>Correct inaccurate data.</li>
                <li>Request deletion of your account and associated data.</li>
                <li>Withdraw consent and cancel your subscription at any time from the portal.</li>
                <li>Lodge a complaint with your local data protection authority.</li>
              </ul>
              <p style={{ marginTop: '18px' }}>
                To exercise any right, email us at the address below. We will respond within 30 days.
              </p>
            </div>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2">
              <span className="pp-h2-num">08 —</span> Security
            </h2>
            <div className="pp-body">
              <p>
                All data is transmitted over HTTPS. Database data is encrypted at rest. Authentication
                uses short-lived magic links — no passwords are ever created or stored. Payment data
                never touches our servers.
              </p>
            </div>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2">
              <span className="pp-h2-num">09 —</span> Changes to This Policy
            </h2>
            <div className="pp-body">
              <p>
                We may update this policy as the platform evolves. Material changes will be communicated
                via email. The effective date at the top of this page always reflects the current version.
              </p>
            </div>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2">
              <span className="pp-h2-num">10 —</span> Contact
            </h2>
            <div className="pp-body">
              <p>Questions, data requests, or complaints:</p>
              <div className="pp-contact">
                <p className="pp-contact__label">Advanced Marketing Co. — Privacy</p>
                <p className="pp-contact__email">ben@advancedmarketing.co</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
