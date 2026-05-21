/**
 * Seeds the flagship course: 30 Day AI Website Empire Challenge
 * - Modules 1–18: learn everything (text ready for Ben's videos later)
 * - Modules 19–48: Day 1–30 checklists only (100 calls/day, no new lessons)
 *
 * Run: npm run seed-30-day-ai-website-empire-challenge
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
const ROOT = path.join(__dirname, "..", "curriculum", "website-sales-blueprint", "modules");

const COURSE = {
  slug: "30-day-ai-website-empire-challenge",
  title: "30 Day AI Website Empire Challenge",
  subtitle: "AI website empire · free-site offer · 100 dials × 30 days",
  description:
    "**30 Day AI Website Empire Challenge** — one course, one sprint. Learn the stack first: domain, email, Cloudflare, GoHighLevel pipeline, the free-website offer, the AI redesign workflow, and the Master Script. Then execute: **100 business-owner dials every day for 30 days** (3,000 total). Complete every daily checklist and still don't make money? **Full program refund** (see Module 18 for terms).",
  heroImage: "/images/course-marketing-engine.jpg",
  sortOrder: 0,
};

const DEPRECATED_SLUG = "website-sales-blueprint";

const LESSON_HEADING_RE = /^##\s+Lesson\s+(\d+\.\d+)\s*[—\-–:]\s*(.+?)\s*$/i;

type TipTapNode = {
  type: string;
  content?: TipTapNode[];
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>;
};

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }
  return { meta, body: match[2] };
}

function parseLessons(body: string): { num: string; title: string; bodyMd: string }[] {
  const lines = body.split(/\r?\n/);
  const lessons: { num: string; title: string; bodyMd: string }[] = [];
  let current: { num: string; title: string; bodyMd: string } | null = null;
  let buf: string[] = [];
  for (const line of lines) {
    const m = line.match(LESSON_HEADING_RE);
    if (m) {
      if (current) {
        current.bodyMd = buf.join("\n").trim();
        lessons.push(current);
      }
      current = {
        num: m[1],
        title: m[2].replace(/\s*\(\s*\d+\s*min\s*\)\s*$/i, "").trim(),
        bodyMd: "",
      };
      buf = [];
    } else if (current) buf.push(line);
  }
  if (current) {
    current.bodyMd = buf.join("\n").trim();
    lessons.push(current);
  }
  return lessons;
}

function placeholderDoc(): TipTapNode {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "Lesson body coming soon." }],
      },
    ],
  };
}

function parseInline(text: string): TipTapNode[] {
  const nodes: TipTapNode[] = [];
  let i = 0;
  let buf = "";
  const flush = (marks?: TipTapNode["marks"]) => {
    if (!buf) return;
    const n: TipTapNode = { type: "text", text: buf };
    if (marks?.length) n.marks = marks;
    nodes.push(n);
    buf = "";
  };
  while (i < text.length) {
    if (text[i] === "*" && text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2);
      if (end > i) {
        flush();
        for (const n of parseInline(text.slice(i + 2, end))) {
          if (n.type === "text") n.marks = [...(n.marks ?? []), { type: "bold" }];
          nodes.push(n);
        }
        i = end + 2;
        continue;
      }
    }
    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1);
      if (end > i) {
        flush();
        nodes.push({ type: "text", text: text.slice(i + 1, end), marks: [{ type: "code" }] });
        i = end + 1;
        continue;
      }
    }
    buf += text[i++];
  }
  flush();
  return nodes.length ? nodes : [{ type: "text", text }];
}

function markdownToTipTap(md: string): TipTapNode {
  const lines = md.split(/\r?\n/);
  const content: TipTapNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i++;
      continue;
    }
    const hm = line.match(/^(#{1,6})\s+(.*)$/);
    if (hm) {
      content.push({
        type: "heading",
        attrs: { level: Math.min(hm[1].length, 6) },
        content: parseInline(hm[2].trim()),
      });
      i++;
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: TipTapNode[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: parseInline(lines[i].replace(/^\s*[-*]\s+/, "")),
            },
          ],
        });
        i++;
      }
      content.push({ type: "bulletList", content: items });
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: TipTapNode[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: parseInline(lines[i].replace(/^\s*\d+\.\s+/, "")),
            },
          ],
        });
        i++;
      }
      content.push({ type: "orderedList", content: items });
      continue;
    }
    const para = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !/^#{1,6}\s+/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i])) {
      para.push(lines[i++]);
    }
    content.push({ type: "paragraph", content: parseInline(para.join(" ")) });
  }
  return content.length ? { type: "doc", content } : placeholderDoc();
}

function slugify(num: string, title: string): string {
  return `${num.replace(/\./g, "-")}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 55)}`;
}

function dayChecklist(day: number): string {
  const week = Math.ceil(day / 7);
  const focus =
    day <= 5
      ? "Volume — hit 100 dials, stay on script."
      : day <= 10
        ? "Conversations — use the winding-down vs growing question."
        : day <= 15
          ? "Free sites — move deals to **Agreed to free site** and start builds."
          : day <= 20
            ? "Demos — **Free site created** → **Site demoed**."
            : day <= 25
              ? "Invoices — **Invoice sent** and follow up."
              : "Close — **Invoice paid** and re-engage old nos.";

  return `## Lesson ${18 + day}.1 — Day ${day}: 100 calls

**No new training today.** You already learned the system in Modules 1–18 of the **30 Day AI Website Empire Challenge**. Today is execution only.

### Week ${week} focus
${focus}

### Daily checklist (required)
- [ ] **100 dials** to business owners logged (name, phone, outcome)
- [ ] Every conversation noted in GoHighLevel (contact + opportunity when applicable)
- [ ] Pipeline stages updated when true: Agreed to free site → Free site created → Site demoed → Invoice sent → Invoice paid
- [ ] End-of-day count posted (community or your tracker): **Dials today: ___ / 100**

### Log columns (spreadsheet or GHL notes)
1. Business name  
2. Phone  
3. Outcome (no answer / gatekeeper / conversation / agreed free site / demo booked / not interested)  
4. Next action + date  

### Catch-up rule
Missed yesterday? Do **not** skip logging. Add a make-up block today or split 50/50 across two days — but **Day ${day} still needs its own 100.**

### Cumulative target
**${day * 100} / 3000** dials toward the refund audit on Day 30.
`;
}

async function main() {
  await prisma.course.updateMany({
    where: { slug: DEPRECATED_SLUG },
    data: { published: false },
  });

  const dbCourse = await prisma.course.upsert({
    where: { slug: COURSE.slug },
    update: {
      title: COURSE.title,
      subtitle: COURSE.subtitle,
      description: COURSE.description,
      heroImage: COURSE.heroImage,
      sortOrder: COURSE.sortOrder,
      published: true,
    },
    create: { ...COURSE, published: true },
  });

  const files = fs
    .readdirSync(ROOT)
    .filter((f) => f.startsWith("mod-") && f.endsWith(".md"))
    .sort();

  let moduleCount = 0;
  let lessonCount = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(ROOT, file), "utf8");
    const { meta, body } = parseFrontmatter(raw);
    const sortOrder = parseInt(meta.sortOrder ?? "0", 10);
    const lessons = parseLessons(body);

    const existingModule = await prisma.module.findFirst({
      where: { courseId: dbCourse.id, sortOrder },
    });
    const dbModule = existingModule
      ? await prisma.module.update({
          where: { id: existingModule.id },
          data: { title: meta.title ?? file, summary: meta.summary ?? null },
        })
      : await prisma.module.create({
          data: {
            courseId: dbCourse.id,
            title: meta.title ?? file,
            summary: meta.summary ?? null,
            sortOrder,
          },
        });
    moduleCount++;

    for (let idx = 0; idx < lessons.length; idx++) {
      const L = lessons[idx];
      const slug = slugify(L.num, L.title);
      const bodyJson = markdownToTipTap(L.bodyMd) as unknown as Prisma.InputJsonValue;
      await prisma.lesson.upsert({
        where: { moduleId_slug: { moduleId: dbModule.id, slug } },
        update: { title: L.title, body: bodyJson, sortOrder: idx + 1, published: true },
        create: {
          moduleId: dbModule.id,
          slug,
          title: L.title,
          body: bodyJson,
          sortOrder: idx + 1,
          published: true,
        },
      });
      lessonCount++;
    }
    console.log(`Module ${sortOrder}: ${meta.title} (${lessons.length} lessons)`);
  }

  for (let day = 1; day <= 30; day++) {
    const sortOrder = 18 + day;
    const title = `Day ${day} — 100 Calls`;
    const summary = "Checklist only. Log 100 dials today — no new lesson.";

    const existingModule = await prisma.module.findFirst({
      where: { courseId: dbCourse.id, sortOrder },
    });
    const dbModule = existingModule
      ? await prisma.module.update({
          where: { id: existingModule.id },
          data: { title, summary },
        })
      : await prisma.module.create({
          data: { courseId: dbCourse.id, title, summary, sortOrder },
        });
    moduleCount++;

    const bodyMd = dayChecklist(day);
    const slug = slugify(`${18 + day}.1`, `day-${day}-checklist`);
    const bodyJson = markdownToTipTap(bodyMd) as unknown as Prisma.InputJsonValue;
    await prisma.lesson.upsert({
      where: { moduleId_slug: { moduleId: dbModule.id, slug } },
      update: {
        title: `Day ${day} checklist`,
        body: bodyJson,
        sortOrder: 1,
        published: true,
      },
      create: {
        moduleId: dbModule.id,
        slug,
        title: `Day ${day} checklist`,
        body: bodyJson,
        sortOrder: 1,
        published: true,
      },
    });
    lessonCount++;
  }

  console.log(`\nDone: ${dbCourse.slug} — ${moduleCount} modules, ${lessonCount} lessons (published).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
