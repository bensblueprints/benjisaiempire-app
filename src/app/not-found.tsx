import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const styles = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body.notfound{
    font-family:'Manrope',system-ui,-apple-system,sans-serif;
    background:#0a0a0a; color:#fff; min-height:100vh;
    display:grid; place-items:center; padding:24px; text-align:center;
  }
  .nf-wrap{max-width:560px}
  .nf-code{
    font-family:'Anton','Manrope',sans-serif; font-size:96px;
    color:#d4af37; line-height:1; letter-spacing:.01em;
  }
  .nf-h1{font-size:28px; margin:8px 0 12px; font-weight:700}
  .nf-p{color:#9ca3af; margin-bottom:28px}
  .nf-link{
    display:inline-block; padding:14px 22px; background:#d4af37;
    color:#0a0a0a; border-radius:8px; font-weight:600; text-decoration:none;
    transition:background .2s;
  }
  .nf-link:hover{background:#f0c850}
`;

export default function NotFound() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <main
        style={{
          fontFamily: "'Manrope',system-ui,-apple-system,sans-serif",
          background: "#0a0a0a",
          color: "#fff",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div className="nf-wrap">
          <div className="nf-code">404</div>
          <h1 className="nf-h1">This door doesn&apos;t exist.</h1>
          <p className="nf-p">The page moved, or never existed. The Starter Kit always exists.</p>
          <a className="nf-link" href="/">← Back to the Empire</a>
        </div>
      </main>
    </>
  );
}
