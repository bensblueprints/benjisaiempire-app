/**
 * Porting script — converts each source HTML to a Next.js page.tsx.
 *
 * RELIABLE STRATEGY: instead of converting raw HTML to JSX (fragile for
 * 12K lines with arbitrary entities, unclosed tags, etc.), we:
 *   1. Parse <head> for metadata → Next.js Metadata API.
 *   2. Extract per-page <style> blocks → inline <style> tags.
 *   3. Extract <main id="main"> innerHTML → render via dangerouslySetInnerHTML
 *      inside a <div> that sits between <Topbar/> and <Footer/>. Pixel-faithful.
 *   4. Extract inline <script> blocks → next/script with afterInteractive.
 *   5. Strip the static topbar / footer / skip-to-main / inline marquee
 *      from the body (replaced by component imports).
 *
 * The original site's <main> is plain HTML with <a href="..."> links; preserving
 * raw HTML is faithful and safe. SSR still emits all markup for SEO/crawlers.
 *
 * Usage: node scripts/port-html-to-next.mjs
 */

import fs from "node:fs";
import path from "node:path";

const SRC = "C:/Users/HP/benjisaiempire-site";
const DST = "C:/Users/HP/benjisaiempire-app/src/app";

/** [sourceRelHtml, dstRouteDir, hasInlineMarqueeInOriginal] */
const ROUTES = [
  ["index.html", "", true],
  ["starter-kit/index.html", "starter-kit", true],
  ["starter-kit/welcome.html", "starter-kit/welcome", false],
  ["starter-kit/thank-you.html", "starter-kit/thank-you", false],
  ["starter-kit/insider-offer.html", "starter-kit/insider-offer", false],
  ["insider/index.html", "insider", true],
  ["insider/welcome.html", "insider/welcome", false],
  ["founders/index.html", "founders", true],
  ["founders/welcome.html", "founders/welcome", false],
  ["challenge/index.html", "challenge", true],
  ["cold-call-30/index.html", "cold-call-30", true],
  ["partners/index.html", "partners", true],
  ["courses/cold-calling/index.html", "courses/cold-calling", false],
  ["courses/cold-calling/welcome.html", "courses/cold-calling/welcome", false],
  ["courses/brand-builder/index.html", "courses/brand-builder", false],
  ["courses/brand-builder/welcome.html", "courses/brand-builder/welcome", false],
  ["courses/marketing-engine/index.html", "courses/marketing-engine", false],
  ["courses/marketing-engine/welcome.html", "courses/marketing-engine/welcome", false],
  ["courses/empire-os/index.html", "courses/empire-os", false],
  ["courses/empire-os/welcome.html", "courses/empire-os/welcome", false],
];

/* -------------------- Helpers -------------------- */

function extractHead(html) {
  return html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "";
}
function extractBody(html) {
  return html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
}
function extractTitle(head) {
  return (head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
}
function extractMeta(head, attrPattern) {
  const re1 = new RegExp(`<meta\\s+${attrPattern}\\s+content="([^"]*)"`, "i");
  const re2 = new RegExp(`<meta\\s+content="([^"]*)"\\s+${attrPattern}`, "i");
  return (head.match(re1)?.[1] || head.match(re2)?.[1] || "").trim();
}
function extractCanonical(head) {
  return (head.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1] || "").trim();
}
function extractRobots(head) {
  return extractMeta(head, 'name="robots"');
}
function extractOG(head) {
  const og = {};
  for (const m of head.matchAll(/<meta\s+property="(og:[^"]+)"\s+content="([^"]*)"/gi)) {
    og[m[1]] = m[2];
  }
  return og;
}
function extractPageStyles(head) {
  const styles = [];
  for (const m of head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    styles.push(m[1]);
  }
  return styles.join("\n\n");
}
function extractInlineScripts(html) {
  const scripts = [];
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    const code = m[1].trim();
    if (code) scripts.push(code);
  }
  return scripts;
}

/** Remove <tag class="...needle..."> ... </tag> (depth-aware) */
function stripBlockByTagAndClass(body, tag, classNeedle) {
  const openRe = new RegExp(`<${tag}\\b[^>]*class="[^"]*\\b${classNeedle}\\b[^"]*"[^>]*>`, "i");
  let result = body;
  let safety = 8;
  while (safety-- > 0) {
    const open = result.match(openRe);
    if (!open) break;
    const startIdx = open.index;
    let cursor = startIdx + open[0].length;
    let depth = 1;
    const tagOpenRe = new RegExp(`<${tag}\\b[^>]*>`, "gi");
    const tagCloseRe = new RegExp(`</${tag}\\s*>`, "gi");
    while (depth > 0 && cursor < result.length) {
      tagOpenRe.lastIndex = cursor;
      tagCloseRe.lastIndex = cursor;
      const o = tagOpenRe.exec(result);
      const c = tagCloseRe.exec(result);
      if (!c) break;
      if (o && o.index < c.index) {
        depth += 1;
        cursor = o.index + o[0].length;
      } else {
        depth -= 1;
        cursor = c.index + c[0].length;
        if (depth === 0) {
          result = result.slice(0, startIdx) + result.slice(cursor);
          break;
        }
      }
    }
    if (depth !== 0) break;
  }
  return result;
}

function extractMainInner(body) {
  const m = body.match(/<main\b[^>]*id="main"[^>]*>([\s\S]*?)<\/main>/i);
  if (m) return m[1];
  let cleaned = body;
  cleaned = stripBlockByTagAndClass(cleaned, "header", "shell-topbar");
  cleaned = stripBlockByTagAndClass(cleaned, "footer", "shell-footer");
  cleaned = cleaned.replace(/<a\s+class="skip-to-main"[^>]*>[\s\S]*?<\/a>/i, "");
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, "");
  return cleaned;
}

/** Detect whether the original main contains an inline marquee block. */
function mainHasInlineMarquee(mainInner) {
  return /<div\s+class="shell-marquee\b/i.test(mainInner);
}

/** Strip inline marquee from main innerHTML — we'll render <Marquee/> instead. */
function stripInlineMarqueeFromMain(mainInner) {
  return stripBlockByTagAndClass(mainInner, "div", "shell-marquee");
}

/* -------------------- Render -------------------- */

function renderMetadata({ title, description, canonical, robots, og }) {
  const fields = [];
  if (title) fields.push(`  title: ${JSON.stringify(title)}`);
  if (description) fields.push(`  description: ${JSON.stringify(description)}`);
  if (canonical) fields.push(`  alternates: { canonical: ${JSON.stringify(canonical)} }`);
  if (robots && /noindex/i.test(robots)) {
    const follow = /follow/i.test(robots);
    fields.push(`  robots: { index: false, follow: ${follow} }`);
  }
  const ogFields = [];
  if (og["og:title"]) ogFields.push(`title: ${JSON.stringify(og["og:title"])}`);
  if (og["og:description"]) ogFields.push(`description: ${JSON.stringify(og["og:description"])}`);
  if (og["og:url"]) ogFields.push(`url: ${JSON.stringify(og["og:url"])}`);
  if (og["og:image"]) ogFields.push(`images: [{ url: ${JSON.stringify(og["og:image"])} }]`);
  if (og["og:type"]) ogFields.push(`type: ${JSON.stringify(og["og:type"])}`);
  if (ogFields.length) fields.push(`  openGraph: { ${ogFields.join(", ")} }`);
  return `export const metadata: Metadata = {\n${fields.join(",\n")}\n};\n`;
}

function escBacktick(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function renderPage({ title, description, canonical, robots, og, pageStyles, mainInner, scripts, hasMarquee }) {
  const md = renderMetadata({ title, description, canonical, robots, og });

  const styleBlock = pageStyles
    ? `      <style dangerouslySetInnerHTML={{ __html: \`${escBacktick(pageStyles)}\` }} />\n`
    : "";

  const marqueeBlock = hasMarquee ? `      <Marquee />\n` : "";

  const mainBlock = mainInner.trim()
    ? `      <main id="main" dangerouslySetInnerHTML={{ __html: \`${escBacktick(mainInner)}\` }} />`
    : `      <main id="main" />`;

  const scriptBlocks = scripts
    .map((s, i) => `      <Script id="page-init-${i}" strategy="afterInteractive">{\`${escBacktick(s)}\`}</Script>`)
    .join("\n");

  const importScript = scripts.length ? `import Script from "next/script";\n` : "";
  const importMarquee = hasMarquee ? `import Marquee from "@/components/Marquee";\n` : "";

  return `import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
${importMarquee}${importScript}
${md}
export default function Page() {
  return (
    <>
${styleBlock}      {/* @ts-expect-error Async Server Component */}
      <Topbar />
${marqueeBlock}${mainBlock}
      <Footer />
${scriptBlocks ? scriptBlocks + "\n" : ""}    </>
  );
}
`;
}

/* -------------------- Run -------------------- */

let totalBytes = 0;
let count = 0;

for (const [src, dstDir, _hasMarqueeHint] of ROUTES) {
  const srcPath = path.join(SRC, src);
  const html = fs.readFileSync(srcPath, "utf8");

  const head = extractHead(html);
  const body = extractBody(html);

  const title = extractTitle(head);
  const description = extractMeta(head, 'name="description"');
  const canonical = extractCanonical(head);
  const robots = extractRobots(head);
  const og = extractOG(head);
  const pageStyles = extractPageStyles(head);

  let cleanBody = body;
  cleanBody = cleanBody.replace(/<a\s+class="skip-to-main"[^>]*>[\s\S]*?<\/a>/i, "");
  cleanBody = stripBlockByTagAndClass(cleanBody, "header", "shell-topbar");
  cleanBody = stripBlockByTagAndClass(cleanBody, "footer", "shell-footer");

  // capture scripts BEFORE stripping them
  const scripts = extractInlineScripts(cleanBody);
  cleanBody = cleanBody.replace(/<script[\s\S]*?<\/script>/gi, "");

  let mainInner = extractMainInner(cleanBody);

  // Detect inline marquee from the actual content (more reliable than the hint)
  const hasMarquee = mainHasInlineMarquee(mainInner);
  if (hasMarquee) {
    mainInner = stripInlineMarqueeFromMain(mainInner);
  }

  const pageTsx = renderPage({
    title, description, canonical, robots, og,
    pageStyles, mainInner, scripts, hasMarquee,
  });

  const dstPath = path.join(DST, dstDir, "page.tsx");
  fs.mkdirSync(path.dirname(dstPath), { recursive: true });
  fs.writeFileSync(dstPath, pageTsx, "utf8");

  totalBytes += Buffer.byteLength(pageTsx, "utf8");
  count += 1;
  console.log(`[${count}/${ROUTES.length}] ${src} → ${path.relative(DST, dstPath).replace(/\\/g, "/")} (${pageTsx.length} chars, marquee=${hasMarquee})`);
}

console.log(`\nTotal: ${count} pages, ${totalBytes} bytes.`);
