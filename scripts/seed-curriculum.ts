/**
 * Seeds the 4 Benji's AI Empire courses, their modules, and their lessons
 * into the database. Reads:
 *
 *   - C:/Users/HP/Documents/Claude/Projects/AI Big Bigs with Benji Big Bucks Boyce/CURRICULUM_PLAN.md
 *   - C:/Users/HP/Documents/Claude/Projects/AI Big Bigs with Benji Big Bucks Boyce/scripts/*.md
 *
 * The course/module skeleton is hard-coded (matches CURRICULUM_PLAN.md
 * verbatim — slugs, titles, descriptions, sort order). For each module we
 * find the matching script file (by course slug + module number) and parse
 * its `## Lesson N.M — Title (X min)` headings to discover lessons. Each
 * lesson body is converted from markdown into a minimal TipTap JSON document.
 *
 * If a module has no matching script file, the module is still upserted with
 * placeholder lessons drawn from the curriculum plan (no body — set to the
 * "coming soon" default).
 *
 * Idempotent — uses upserts keyed on slug / sortOrder.
 *
 * Run via: `npm run seed-curriculum`
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const SOURCE_ROOT =
  "C:/Users/HP/Documents/Claude/Projects/AI Big Bigs with Benji Big Bucks Boyce";
const SCRIPTS_DIR = path.join(SOURCE_ROOT, "scripts");

// ──────────────────────────────────────────────────────────────────────────
// Curriculum skeleton (transcribed from CURRICULUM_PLAN.md)
// ──────────────────────────────────────────────────────────────────────────

interface ModuleSpec {
  /** 1-based module number — matches "Module N" in script filenames. */
  num: number;
  title: string;
  summary: string;
  /**
   * Lessons described in CURRICULUM_PLAN.md (used as fallback when no
   * script file is found for the module). When script files ARE found,
   * we OVERRIDE this list with the parsed lessons (so titles match Ben's
   * actual recorded scripts).
   */
  fallbackLessons: string[];
}

interface CourseSpec {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** Maps to /images/course-<slug>.jpg. */
  heroImage: string;
  sortOrder: number;
  /**
   * The basename "stem" used to locate scripts for this course. We accept
   * both the snake_case stems (e.g. `Cold_Calling_2_0_Module_1.md`) and
   * the kebab-case stems (e.g. `cold-calling-2-module-3-master-script.md`).
   */
  scriptStems: string[];
  modules: ModuleSpec[];
}

const COURSES: CourseSpec[] = [
  {
    slug: "cold-calling",
    title: "Cold Calling 2.0 + AI — The Master Script Live",
    subtitle:
      "25 dials → 5 conversations. The 2026 prospecting math, with the AI list-builder doing the heavy lifting.",
    description:
      "The phone is empty. Everyone's competing for ad eyeballs and almost nobody calls — that's the arbitrage. This course is the full Cold Calling 2.0 system juiced with the AI tools I'm running every Tuesday on YouTube: the prospecting prompt, the list-verification stack, the live objection-handling framework, and the re-engagement lever that 99% of operators never pull. By Day 30, you've made 100 dials, booked your first demo, and earned the Cold Caller badge.",
    heroImage: "/images/course-cold-calling.jpg",
    sortOrder: 1,
    scriptStems: ["Cold_Calling_2_0_Module", "cold-calling-2-module"],
    modules: [
      {
        num: 1,
        title: "The Cold Calling 2.0 Mindset (AI Era)",
        summary:
          "Why cold calling is back, the diagnostic mindset, and the 1-Call-A-Day Rule that compounds.",
        fallbackLessons: [
          "Why Cold Calling Is Back",
          "The Mindset Shift",
          "How to Know When You're Ready",
        ],
      },
      {
        num: 2,
        title: "AI-Powered Prospecting (The Real Prompt)",
        summary:
          "The exact AI prospecting prompt, list verification stack, phone number sourcing, and how to tag the hottest prospects first.",
        fallbackLessons: [
          "Defining your ideal prospect",
          "The AI prospecting prompt",
          "Verifying the list",
          "Phone number sourcing",
        ],
      },
      {
        num: 3,
        title: "The Master Script (Live)",
        summary:
          "The 30-Second Opener, the Hook, the 5 Discovery Questions, the Bridge to Proposal, and the Assumed Close.",
        fallbackLessons: [
          "The 30-Second Opener",
          "The Hook",
          "The 5 Discovery Questions",
          "The Bridge to Proposal",
          "The Assumed Close",
        ],
      },
      {
        num: 4,
        title: "Handling The 5 Objections With One Framework",
        summary:
          "Acknowledge → Clarify → Reframe — the universal response, with scripts for each of the 5 most common objections.",
        fallbackLessons: [
          "The Acknowledge → Clarify → Reframe response",
          "It's too expensive",
          "I need to think about it",
          "I need to talk to my partner",
          "Now's not a good time",
          "We're already working with someone",
        ],
      },
      {
        num: 5,
        title: "The 30-Day Cold Calling Challenge (Cohort Mode)",
        summary:
          "The hardcore funnel: 5 dials × 30 weekdays = 100 dials. Voicemail strategy, gatekeeper script, and the Cold Caller badge.",
        fallbackLessons: [
          "The hardcore funnel",
          "The daily prompt + community accountability",
          "Voicemail strategy + the gatekeeper script",
          "The Cold Caller badge and the Builder upgrade offer",
        ],
      },
      {
        num: 6,
        title: "The Re-Engagement Lever (The Lever No One Talks About)",
        summary:
          "Pulling 12-24 month-old 'not now' leads with AI for an updated trigger event — 15-25% conversion is normal.",
        fallbackLessons: [
          "Pulling 12-24-month-old 'not now' leads with AI",
          "Re-running them through the prospecting prompt",
          "The personalized re-engagement message",
          "Why 15-25% conversion on warm leads is normal",
        ],
      },
      {
        num: 7,
        title: "Following Up Without Being Annoying",
        summary:
          "The Day 1 / Day 3 / Day 5 / Day 7 cadence, the 3-tier proposal, and the 7-day expiration line.",
        fallbackLessons: [
          "Day 1 / Day 3 / Day 5 / Day 7 cadence",
          "The 3-tier proposal",
          "The 7-day expiration line",
          "Long-term nurture and quarterly touchpoints",
        ],
      },
    ],
  },
  {
    slug: "brand-builder",
    title: "AI Brand Builder — From Idea to Launched Brand in 3 Hours",
    subtitle:
      "30-day playbooks took me 30 minutes once AI showed up. Here's the new speed.",
    description:
      "You don't need 6 months and a designer. You need a sharp positioning, a domain you can defend, four launch videos, three landing pages, and the same Claude Code workflow I use to ship real client sites. This course is the exact 3-hour sprint I run when I onboard a new agency client — compressed from the 15 years of brand work behind 2,000+ products and $25M in e-commerce. By the end, you'll have a real brand live on a real domain, a working opt-in funnel, and a 30-day content cascade scheduled. You ship today. The audience corrects from there.",
    heroImage: "/images/course-brand-builder.jpg",
    sortOrder: 2,
    scriptStems: ["AI_Brand_Builder_Module", "brand-builder-module"],
    modules: [
      {
        num: 1,
        title: "Honest Positioning (The Build-in-Public Frame)",
        summary:
          "Why 'in the work right now' beats 'I made it 5 years ago' — the honesty audit and the era you're in.",
        fallbackLessons: [
          "Why 'in the work right now' beats 'I made it 5 years ago'",
          "The 30-second / 2-minute / headline brand story",
          "The honesty audit: every claim must be true, current, specific",
          "Picking the era you're in",
        ],
      },
      {
        num: 2,
        title: "Naming, Domain & Visual Identity in 60 Minutes",
        summary:
          "The Empire test, the Namecheap drill, color & font logic, and the wordmark-first logo workflow.",
        fallbackLessons: [
          "The 'Empire' test — does your name earn its keep?",
          "Namecheap drill: registering, securing handles in one sitting",
          "Color & font choice (avoid the AI-cliche purple/cyan trap)",
          "Wordmark-first logo in Canva; three thumbnail templates",
        ],
      },
      {
        num: 3,
        title: "The Four Launch Videos (Record Once, Use For Years)",
        summary:
          "Community Welcome, Landing Page Intro, 30-Day Challenge Intro, Hardcore Funnel Intro — plus the 90-minute one-day shoot order.",
        fallbackLessons: [
          "Video 1 — Community Welcome",
          "Video 2 — Landing Page Intro",
          "Video 3 — 30-Day Challenge Intro",
          "Video 4 — Hardcore Funnel Intro",
          "The 90-minute one-day shoot order + edit order",
        ],
      },
      {
        num: 4,
        title: "Three Landing Pages With Claude Code Design Prompts",
        summary:
          "The Starter Kit opt-in page, the Founders offer page, the Thank-You page, and the deploy stack options.",
        fallbackLessons: [
          "The Starter Kit opt-in page",
          "The Founders offer page",
          "The Thank-You / Confirmation page",
          "Deploy on Netlify, GHL custom HTML, or your own server",
        ],
      },
      {
        num: 5,
        title: "The Lead Magnet Stack",
        summary:
          "Build your equivalent of the AI Empire Starter Kit — the 4-tool stack and the 30-day daily-email challenge.",
        fallbackLessons: [
          "Building your equivalent of the AI Empire Starter Kit",
          "Writing the 30-day daily-email challenge",
          "The free-launch-event seat as the conversion accelerator",
          "The 25-40% opt-in conversion benchmark",
        ],
      },
      {
        num: 6,
        title: "Going Live: Day 1 Through Day 30",
        summary:
          "The pre-launch friend-affiliate playbook, GHL wiring, the 30-day execution checklist, and the Pillar-to-Derivative Cascade.",
        fallbackLessons: [
          "Pre-launch friend-affiliate playbook",
          "Wiring tags, automations, and the founder counter in GHL",
          "The 30-day execution checklist",
          "The Pillar-to-Derivative Cascade",
        ],
      },
    ],
  },
  {
    slug: "marketing-engine",
    title:
      "AI Marketing Engine — Websites, Funnels, Ads & Automations Built With Claude Code",
    subtitle:
      "The agency stack I'm running at $10K MRR — every site, every funnel, every prompt, every workflow.",
    description:
      "This is the marketing operating manual I'm running for my own agency right now. Every Thursday on Build Day Live I ship a real client site with Claude Code in 3 hours flat — and this course is that exact workflow, plus the funnel architecture, ad-creative system, and automation layer that turns shipped sites into recurring MRR. You'll leave with a complete client-facing marketing engine: opt-in, nurture, sales call, proposal, kickoff, retain. Same playbook I'm running. Different niche.",
    heroImage: "/images/course-marketing-engine.jpg",
    sortOrder: 3,
    scriptStems: ["AI_Marketing_Engine_Module", "marketing-engine-module"],
    modules: [
      {
        num: 1,
        title: "AI Website in 3 Hours (Claude Code Live)",
        summary:
          "The Claude Code Design Prompts Pack, the mobile-first wireframe → coded landing page workflow, deploy on Netlify in 30 minutes.",
        fallbackLessons: [
          "The Claude Code Design Prompts Pack",
          "Mobile-first wireframe to coded landing page in one session",
          "Deploy on Netlify in 30 minutes",
          "The 'video on the left, form on the right' architecture",
        ],
      },
      {
        num: 2,
        title: "The Funnel Stack (Opt-in → $10 → $99/$149)",
        summary:
          "Four landing pages, the conversion math, the founder counter, and the pre-50 transition rule.",
        fallbackLessons: [
          "The four landing pages",
          "The 25-40% / 5-10% / 10-15% conversion math",
          "Wiring the founder counter",
          "The pre-50 transition rule",
        ],
      },
      {
        num: 3,
        title: "The 30-Day Email Engine",
        summary:
          "Both 30-day challenge sequences (broad + hardcore), cross-promotion, and the reply-prompt mechanic.",
        fallbackLessons: [
          "The 30-Day AI Empire Challenge sequence",
          "The 30-Day Cold Calling Challenge sequence",
          "Cross-promotion between the two challenges",
          "The reply-prompt mechanic",
        ],
      },
      {
        num: 4,
        title: "Facebook Ads That Don't Burn (Build-in-Public Creative)",
        summary:
          "The 6-variation creative shoot day, $30/day testing rules, Meta Pixel events, scale rules.",
        fallbackLessons: [
          "The 6-variation creative shoot day",
          "Why 'in the work right now' outperforms 'I made $25M'",
          "$30/day testing creative set → scale rules",
          "Meta Pixel events: OptIn / InitiateCheckout / Purchase",
        ],
      },
      {
        num: 5,
        title: "The Pillar-to-Derivative Cascade (Content Engine)",
        summary:
          "One Tuesday Cold Call Live → 14 derivative pieces. The full Metricool/Buffer + Opus Clip workflow.",
        fallbackLessons: [
          "One Tuesday Cold Call Live → 14 derivative pieces",
          "YouTube replay / Newsletter / LinkedIn carousels / TikTok / X thread",
          "The Metricool/Buffer + Opus Clip workflow",
          "Sized for solo + 1 future VA",
        ],
      },
      {
        num: 6,
        title: "Automations Inside GoHighLevel",
        summary:
          "Tag structure, onboarding triggers, engagement triggers, churn prevention, and the win-back sequence.",
        fallbackLessons: [
          "Tag structure (status / behavioral / source / risk)",
          "New-member onboarding triggers",
          "Engagement triggers (first win, course complete, 14-day inactive)",
          "Churn prevention (Stripe dunning, pause-instead-of-cancel)",
          "Win-back at 30 / 60 / 90 days post-cancel",
        ],
      },
      {
        num: 7,
        title: "The Software Partner Playbook",
        summary:
          "The 1-page partner brief, the partner showcase template, member-exclusive promo codes, and the 30% recurring affiliate program.",
        fallbackLessons: [
          "The 1-page partner brief that gets responses",
          "The partner showcase template",
          "Negotiating member-exclusive promo codes",
          "Partner pages and the 30% recurring affiliate program",
        ],
      },
    ],
  },
  {
    slug: "empire-os",
    title: "Empire OS — Scale Your Agency to $1M+ While Building It in Public",
    subtitle:
      "Two businesses growing in parallel. The agency proves it. The community compounds it. Both reinforce each other.",
    description:
      "This is the master course — the system I'm running to build a real marketing agency to $100K MRR while a community of operators builds alongside. Empire OS pulls everything together: the parallel-growth thesis, the tier mechanics, the live-programming cadence, the milestone content moments, the agency-to-community feedback loop. By the end of this course you've designed your own Empire — agency growing alongside community, build-in-public commitment locked, 5-year content engine running. This is the capstone. Take it after the other three.",
    heroImage: "/images/course-empire-os.jpg",
    sortOrder: 4,
    scriptStems: ["Empire_OS_Module", "empire-os-module"],
    modules: [
      {
        num: 1,
        title: "The Parallel Growth Thesis",
        summary:
          "Why agency + community is a 2-business model that de-risks each other, and the Year 1 milestone math.",
        fallbackLessons: [
          "Why agency + community is a 2-business model",
          "The agency provides REAL ongoing case studies",
          "The community provides DISTRIBUTION",
          "Year 1 milestone math",
        ],
      },
      {
        num: 2,
        title: "The Two-Tier Stack (Insider / Builder / Founder)",
        summary:
          "The full tier mechanics, the GHL minute markup margin layer, and the pre-50 transition rule.",
        fallbackLessons: [
          "Insider $10/mo — the entry tier",
          "Builder $99/$149 — the full vault",
          "Founder (first 50) — gold-crown badge, $99-locked-for-life",
          "The GHL minute markup mechanic",
          "The pre-50 transition rule",
        ],
      },
      {
        num: 3,
        title: "Weekly Live Programming as the Content Factory",
        summary:
          "Tuesday Cold Call Live, Empire Weekly newsletter, Thursday Build Day Live, Friday Builder Q&A.",
        fallbackLessons: [
          "Tuesday Cold Call Live — the prospecting proof loop",
          "Empire Weekly newsletter (Wed)",
          "Thursday Build Day Live — Claude Code in real time",
          "Friday Builder Q&A Zoom — hot seats",
        ],
      },
      {
        num: 4,
        title: "Milestone Content Moments (5-Year Content Engine)",
        summary:
          "$15K / $25K / $50K / $100K MRR milestones — every dollar number is a story. Plus the annual relaunch.",
        fallbackLessons: [
          "$15K MRR — here's the deal that closed it",
          "$25K MRR — first hire",
          "$50K MRR / $100K MRR — what 6 months of building in public actually looks like",
          "The annual relaunch — every 90 days, run a 5-day live event",
        ],
      },
      {
        num: 5,
        title: "Launch Week Run-of-Show (5-Day Live Event)",
        summary:
          "Mon AI Empire Vision → Tue Cold Calling Masterclass → Wed Live Build → Thu Partner Showcase → Fri AMA + Close.",
        fallbackLessons: [
          "Monday — AI Empire Vision Keynote",
          "Tuesday — Cold Calling 2.0 Masterclass + LIVE COLD CALLS",
          "Wednesday — AI Website in 3 Hours (live build)",
          "Thursday — Software Partner Showcase",
          "Friday — AMA + Final Close",
          "Sat-Sun — Final scarcity push",
        ],
      },
      {
        num: 6,
        title: "Hiring Your First Operator (and Beyond)",
        summary:
          "When to hire (the $25K MRR signal), first hire (editor/VA), second hire (cold call closer), and the senior member layer.",
        fallbackLessons: [
          "When to hire (the $25K MRR signal)",
          "First hire — the editor/VA",
          "Second hire — the cold call closer",
          "Building the senior member layer",
        ],
      },
      {
        num: 7,
        title: "The Honest Operator Brand at Scale",
        summary:
          "Why telling the truth about your numbers is the rare move, defending build-in-public when revenue dips, and the 5-year compound.",
        fallbackLessons: [
          "Why telling the truth about your numbers is, paradoxically, the rare move",
          "Defending build-in-public when revenue dips",
          "The 'what if your agency doesn't grow?' answer",
          "The 5-year compound",
        ],
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────
// Lesson script discovery + parsing
// ──────────────────────────────────────────────────────────────────────────

interface ParsedLesson {
  /** "1.1", "3.4", etc. */
  num: string;
  title: string;
  /** Body markdown (everything from after the title heading until the next "## " or EOF). */
  bodyMd: string;
}

const LESSON_HEADING_RE = /^##\s+Lesson\s+(\d+\.\d+)\s*[—\-–:]\s*(.+?)\s*$/i;

function parseLessonsFromScript(scriptPath: string): ParsedLesson[] {
  const text = fs.readFileSync(scriptPath, "utf8");
  const lines = text.split(/\r?\n/);
  const lessons: ParsedLesson[] = [];
  let current: ParsedLesson | null = null;
  let buf: string[] = [];

  for (const line of lines) {
    const m = line.match(LESSON_HEADING_RE);
    if (m) {
      if (current) {
        current.bodyMd = buf.join("\n").trim();
        lessons.push(current);
      }
      // Strip trailing "(N min)" from title.
      const rawTitle = m[2].replace(/\s*\(\s*\d+\s*min\s*\)\s*$/i, "").trim();
      // Some lessons have a trailing parenthetical that ISN'T a duration —
      // keep that. Only strip the literal "(X min)" form above.
      current = { num: m[1], title: rawTitle, bodyMd: "" };
      buf = [];
    } else if (current) {
      buf.push(line);
    }
  }
  if (current) {
    current.bodyMd = buf.join("\n").trim();
    lessons.push(current);
  }
  return lessons;
}

function findScriptForCourseModule(course: CourseSpec, moduleNum: number): string | null {
  if (!fs.existsSync(SCRIPTS_DIR)) return null;
  const files = fs.readdirSync(SCRIPTS_DIR);
  // Look for a filename that contains one of the course's stems followed by
  // either "_<num>" (snake form) or "-<num>-" / "-<num>." (kebab form).
  for (const stem of course.scriptStems) {
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const lower = file.toLowerCase();
      const stemLower = stem.toLowerCase();
      if (!lower.includes(stemLower)) continue;
      // Match module number with word boundaries on either side.
      const pattern = new RegExp(
        `${stemLower.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}[_-]${moduleNum}(?:[_\\-.]|$)`,
        "i",
      );
      if (pattern.test(lower)) {
        return path.join(SCRIPTS_DIR, file);
      }
    }
  }
  return null;
}

// ──────────────────────────────────────────────────────────────────────────
// Markdown → TipTap JSON (minimal converter)
// ──────────────────────────────────────────────────────────────────────────

type TipTapNode =
  | { type: "doc"; content: TipTapNode[] }
  | { type: "paragraph"; content?: TipTapNode[] }
  | { type: "heading"; attrs: { level: number }; content?: TipTapNode[] }
  | { type: "bulletList"; content: TipTapNode[] }
  | { type: "orderedList"; attrs?: { start?: number }; content: TipTapNode[] }
  | { type: "listItem"; content: TipTapNode[] }
  | { type: "blockquote"; content: TipTapNode[] }
  | { type: "codeBlock"; attrs?: { language?: string }; content?: TipTapNode[] }
  | { type: "horizontalRule" }
  | { type: "hardBreak" }
  | { type: "text"; text: string; marks?: Array<{ type: string; attrs?: Record<string, unknown> }> };

function placeholderDoc(): TipTapNode {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Lesson body coming soon. Check back in a few days.",
          },
        ],
      },
    ],
  };
}

/** Parse inline markdown (bold/italic/code/links) into TipTap text nodes. */
function parseInline(text: string): TipTapNode[] {
  const nodes: TipTapNode[] = [];
  let i = 0;
  let buf = "";

  function flush(marks?: Array<{ type: string; attrs?: Record<string, unknown> }>) {
    if (buf.length === 0) return;
    const node: TipTapNode = { type: "text", text: buf };
    if (marks && marks.length > 0) node.marks = marks;
    nodes.push(node);
    buf = "";
  }

  while (i < text.length) {
    const ch = text[i];

    // Escape — backslash followed by any char keeps that char literal.
    if (ch === "\\" && i + 1 < text.length) {
      buf += text[i + 1];
      i += 2;
      continue;
    }

    // Inline code: `...`
    if (ch === "`") {
      const end = text.indexOf("`", i + 1);
      if (end > i) {
        flush();
        nodes.push({
          type: "text",
          text: text.slice(i + 1, end),
          marks: [{ type: "code" }],
        });
        i = end + 1;
        continue;
      }
    }

    // Bold: ** ... **  (must come before single-asterisk italic)
    if (ch === "*" && text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2);
      if (end > i + 1) {
        flush();
        const inner = parseInline(text.slice(i + 2, end));
        for (const n of inner) {
          if (n.type === "text") {
            n.marks = [...(n.marks ?? []), { type: "bold" }];
          }
          nodes.push(n);
        }
        i = end + 2;
        continue;
      }
    }

    // Italic: * ... * (single asterisk, not at start of line as bullet)
    if (ch === "*") {
      const end = text.indexOf("*", i + 1);
      if (end > i && text[i + 1] !== " " && text[end - 1] !== " ") {
        flush();
        const inner = parseInline(text.slice(i + 1, end));
        for (const n of inner) {
          if (n.type === "text") {
            n.marks = [...(n.marks ?? []), { type: "italic" }];
          }
          nodes.push(n);
        }
        i = end + 1;
        continue;
      }
    }

    // Link: [text](url)
    if (ch === "[") {
      const closeBracket = text.indexOf("]", i + 1);
      if (closeBracket > i && text[closeBracket + 1] === "(") {
        const closeParen = text.indexOf(")", closeBracket + 2);
        if (closeParen > closeBracket) {
          flush();
          const linkText = text.slice(i + 1, closeBracket);
          const linkUrl = text.slice(closeBracket + 2, closeParen);
          nodes.push({
            type: "text",
            text: linkText,
            marks: [{ type: "link", attrs: { href: linkUrl } }],
          });
          i = closeParen + 1;
          continue;
        }
      }
    }

    buf += ch;
    i += 1;
  }
  flush();
  return nodes;
}

function markdownToTipTap(md: string): TipTapNode {
  const lines = md.split(/\r?\n/);
  const content: TipTapNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") {
      i += 1;
      continue;
    }

    // Horizontal rule
    if (/^\s*-{3,}\s*$/.test(line) || /^\s*\*{3,}\s*$/.test(line)) {
      content.push({ type: "horizontalRule" });
      i += 1;
      continue;
    }

    // Code fence ```lang ... ```
    const fenceMatch = line.match(/^\s*```(\w*)\s*$/);
    if (fenceMatch) {
      const lang = fenceMatch[1] || undefined;
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) {
        codeLines.push(lines[i]);
        i += 1;
      }
      // skip closing ```
      if (i < lines.length) i += 1;
      content.push({
        type: "codeBlock",
        attrs: lang ? { language: lang } : {},
        content: [{ type: "text", text: codeLines.join("\n") }],
      });
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = Math.min(headingMatch[1].length, 6);
      content.push({
        type: "heading",
        attrs: { level },
        content: parseInline(headingMatch[2].trim()),
      });
      i += 1;
      continue;
    }

    // Blockquote (consecutive > lines)
    if (/^\s*>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^\s*>\s?/, ""));
        i += 1;
      }
      const innerDoc = markdownToTipTap(quoteLines.join("\n")) as Extract<
        TipTapNode,
        { type: "doc" }
      >;
      content.push({ type: "blockquote", content: innerDoc.content });
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: TipTapNode[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        const itemText = lines[i].replace(/^\s*[-*]\s+/, "");
        items.push({
          type: "listItem",
          content: [{ type: "paragraph", content: parseInline(itemText) }],
        });
        i += 1;
      }
      content.push({ type: "bulletList", content: items });
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: TipTapNode[] = [];
      const firstNumMatch = line.match(/^\s*(\d+)\.\s+/);
      const start = firstNumMatch ? parseInt(firstNumMatch[1], 10) : 1;
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const itemText = lines[i].replace(/^\s*\d+\.\s+/, "");
        items.push({
          type: "listItem",
          content: [{ type: "paragraph", content: parseInline(itemText) }],
        });
        i += 1;
      }
      const node: TipTapNode = { type: "orderedList", content: items };
      if (start !== 1) node.attrs = { start };
      content.push(node);
      continue;
    }

    // Paragraph: collect consecutive non-empty, non-special lines.
    const paraLines: string[] = [line];
    i += 1;
    while (i < lines.length) {
      const nxt = lines[i];
      if (
        nxt.trim() === "" ||
        /^#{1,6}\s+/.test(nxt) ||
        /^\s*[-*]\s+/.test(nxt) ||
        /^\s*\d+\.\s+/.test(nxt) ||
        /^\s*>\s?/.test(nxt) ||
        /^\s*```/.test(nxt) ||
        /^\s*-{3,}\s*$/.test(nxt) ||
        /^\s*\*{3,}\s*$/.test(nxt)
      ) {
        break;
      }
      paraLines.push(nxt);
      i += 1;
    }
    const paraText = paraLines.join(" ").replace(/\s+/g, " ").trim();
    if (paraText.length > 0) {
      content.push({ type: "paragraph", content: parseInline(paraText) });
    }
  }

  if (content.length === 0) {
    return placeholderDoc();
  }
  return { type: "doc", content };
}

// ──────────────────────────────────────────────────────────────────────────
// Slug + helper utils
// ──────────────────────────────────────────────────────────────────────────

function slugifyLesson(num: string, title: string): string {
  // num is "1.1" → "1-1"
  const numPart = num.replace(/\./g, "-");
  const titlePart = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${numPart}-${titlePart}`;
}

function slugifyFallback(moduleNum: number, idx: number, title: string): string {
  const numPart = `${moduleNum}-${idx + 1}`;
  const titlePart = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${numPart}-${titlePart}`;
}

// ──────────────────────────────────────────────────────────────────────────
// Main seed routine
// ──────────────────────────────────────────────────────────────────────────

interface SeedStats {
  courses: number;
  modules: number;
  lessons: number;
  withBody: number;
  placeholders: number;
}

async function seed(): Promise<SeedStats> {
  const stats: SeedStats = { courses: 0, modules: 0, lessons: 0, withBody: 0, placeholders: 0 };

  // Sanity check that the curriculum plan file exists (we don't strictly
  // need to read it — the structure is hard-coded above — but it's a
  // useful "fail loud" signal if the source tree is wrong).
  const planPath = path.join(SOURCE_ROOT, "CURRICULUM_PLAN.md");
  if (!fs.existsSync(planPath)) {
    console.warn(`[seed] WARNING: CURRICULUM_PLAN.md not found at ${planPath}`);
  } else {
    const planSize = fs.statSync(planPath).size;
    console.log(`[seed] Found CURRICULUM_PLAN.md (${planSize} bytes)`);
  }
  if (!fs.existsSync(SCRIPTS_DIR)) {
    console.warn(`[seed] WARNING: scripts dir not found at ${SCRIPTS_DIR}`);
  }

  for (const course of COURSES) {
    const dbCourse = await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        heroImage: course.heroImage,
        sortOrder: course.sortOrder,
      },
      create: {
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        heroImage: course.heroImage,
        sortOrder: course.sortOrder,
        published: false,
      },
    });
    stats.courses += 1;
    console.log(`[seed] course: ${dbCourse.slug} (${course.modules.length} modules)`);

    for (const mod of course.modules) {
      // Upsert by (courseId, sortOrder). There's no DB unique constraint on
      // that pair, so we do a manual find-then-update/create.
      const existingModule = await prisma.module.findFirst({
        where: { courseId: dbCourse.id, sortOrder: mod.num },
      });
      const dbModule = existingModule
        ? await prisma.module.update({
            where: { id: existingModule.id },
            data: { title: mod.title, summary: mod.summary, sortOrder: mod.num },
          })
        : await prisma.module.create({
            data: {
              courseId: dbCourse.id,
              title: mod.title,
              summary: mod.summary,
              sortOrder: mod.num,
            },
          });
      stats.modules += 1;

      // Try to find a script file for this module and parse lessons from it.
      const scriptPath = findScriptForCourseModule(course, mod.num);
      let lessons: { slug: string; title: string; body: TipTapNode | null; sortOrder: number }[] = [];

      if (scriptPath) {
        const parsed = parseLessonsFromScript(scriptPath);
        if (parsed.length > 0) {
          lessons = parsed.map((p, idx) => ({
            slug: slugifyLesson(p.num, p.title),
            title: p.title,
            body: p.bodyMd ? markdownToTipTap(p.bodyMd) : placeholderDoc(),
            sortOrder: idx + 1,
          }));
          console.log(
            `  module ${mod.num} (${mod.title}): ${parsed.length} lessons from ${path.basename(
              scriptPath,
            )}`,
          );
        } else {
          console.log(
            `  module ${mod.num}: script found but no lesson headings parsed (${path.basename(
              scriptPath,
            )}) — using fallback`,
          );
        }
      }

      if (lessons.length === 0) {
        // Fallback: use the curriculum-plan lesson titles with placeholder bodies.
        lessons = mod.fallbackLessons.map((title, idx) => ({
          slug: slugifyFallback(mod.num, idx, title),
          title,
          body: placeholderDoc(),
          sortOrder: idx + 1,
        }));
        console.log(
          `  module ${mod.num} (${mod.title}): no script — using ${lessons.length} fallback lessons`,
        );
      }

      for (const lesson of lessons) {
        const isPlaceholder =
          lesson.body !== null &&
          (lesson.body as Extract<TipTapNode, { type: "doc" }>).content.length === 1 &&
          ((lesson.body as Extract<TipTapNode, { type: "doc" }>).content[0] as
            | Extract<TipTapNode, { type: "paragraph" }>
            | undefined)?.content?.[0]?.type === "text" &&
          ((
            (lesson.body as Extract<TipTapNode, { type: "doc" }>).content[0] as Extract<
              TipTapNode,
              { type: "paragraph" }
            >
          ).content?.[0] as Extract<TipTapNode, { type: "text" }>)?.text?.startsWith(
            "Lesson body coming soon",
          );

        await prisma.lesson.upsert({
          where: { moduleId_slug: { moduleId: dbModule.id, slug: lesson.slug } },
          update: {
            title: lesson.title,
            sortOrder: lesson.sortOrder,
            body: lesson.body as unknown as Prisma.InputJsonValue,
          },
          create: {
            moduleId: dbModule.id,
            slug: lesson.slug,
            title: lesson.title,
            body: lesson.body as unknown as Prisma.InputJsonValue,
            sortOrder: lesson.sortOrder,
            published: true,
          },
        });
        stats.lessons += 1;
        if (isPlaceholder) stats.placeholders += 1;
        else stats.withBody += 1;
      }
    }
  }

  return stats;
}

seed()
  .then((stats) => {
    console.log("\n=========================================================");
    console.log(
      `[seed] Seeded ${stats.courses} courses, ${stats.modules} modules, ${stats.lessons} lessons.`,
    );
    console.log(
      `[seed] ${stats.withBody} lessons have script bodies, ${stats.placeholders} are placeholders.`,
    );
    console.log("=========================================================\n");
  })
  .catch((err) => {
    console.error("[seed] FAILED:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
