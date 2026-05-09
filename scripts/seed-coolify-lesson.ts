/**
 * One-shot seed: ensure Empire OS course exists, add a "Fulfillment Ops" module,
 * and create the "Stop Using Netlify" lesson from curriculum/empire-os-coolify-stack.md.
 * Idempotent.
 *
 * Run inside a node:22-alpine container with the repo mounted:
 *   npx tsx scripts/seed-coolify-lesson.ts
 */
import fs from "node:fs";
import path from "node:path";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Tiny markdown → TipTap JSON converter. Handles: # h1-h3, paragraphs, bullet lists,
// ordered lists, blockquotes, fenced code, hr, **bold** *italic* `code` [link](url).
function mdToTiptap(md: string): Prisma.InputJsonValue {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const content: any[] = [];
  let i = 0;

  function inlineNodes(text: string): any[] {
    const nodes: any[] = [];
    let buf = "";
    let pos = 0;
    function flush(marks: any[] = []) {
      if (buf) {
        nodes.push({ type: "text", text: buf, ...(marks.length ? { marks } : {}) });
        buf = "";
      }
    }
    while (pos < text.length) {
      // [text](url)
      const linkM = text.slice(pos).match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkM) {
        flush();
        nodes.push({
          type: "text",
          text: linkM[1],
          marks: [{ type: "link", attrs: { href: linkM[2], target: "_blank", rel: "noopener noreferrer" } }],
        });
        pos += linkM[0].length;
        continue;
      }
      // **bold**
      if (text.slice(pos, pos + 2) === "**") {
        const close = text.indexOf("**", pos + 2);
        if (close > -1) {
          flush();
          nodes.push({ type: "text", text: text.slice(pos + 2, close), marks: [{ type: "bold" }] });
          pos = close + 2;
          continue;
        }
      }
      // *italic*  (single * surrounded by non-space)
      if (text[pos] === "*" && text[pos + 1] && text[pos + 1] !== "*" && text[pos + 1] !== " ") {
        const close = text.indexOf("*", pos + 1);
        if (close > -1) {
          flush();
          nodes.push({ type: "text", text: text.slice(pos + 1, close), marks: [{ type: "italic" }] });
          pos = close + 1;
          continue;
        }
      }
      // `code`
      if (text[pos] === "`") {
        const close = text.indexOf("`", pos + 1);
        if (close > -1) {
          flush();
          nodes.push({ type: "text", text: text.slice(pos + 1, close), marks: [{ type: "code" }] });
          pos = close + 1;
          continue;
        }
      }
      buf += text[pos];
      pos++;
    }
    flush();
    return nodes;
  }

  while (i < lines.length) {
    const line = lines[i];

    // blank
    if (!line.trim()) { i++; continue; }

    // hr
    if (/^---+\s*$/.test(line)) {
      content.push({ type: "horizontalRule" });
      i++; continue;
    }

    // heading
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = Math.min(h[1].length, 3);
      content.push({ type: "heading", attrs: { level }, content: inlineNodes(h[2].trim()) });
      i++; continue;
    }

    // blockquote
    if (line.startsWith(">")) {
      const block: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        block.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      content.push({
        type: "blockquote",
        content: [{ type: "paragraph", content: inlineNodes(block.join(" ").trim()) }],
      });
      continue;
    }

    // fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || null;
      const block: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        block.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      content.push({
        type: "codeBlock",
        attrs: lang ? { language: lang } : {},
        content: [{ type: "text", text: block.join("\n") }],
      });
      continue;
    }

    // unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: any[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push({
          type: "listItem",
          content: [{ type: "paragraph", content: inlineNodes(lines[i].replace(/^[-*]\s+/, "")) }],
        });
        i++;
      }
      content.push({ type: "bulletList", content: items });
      continue;
    }

    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: any[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push({
          type: "listItem",
          content: [{ type: "paragraph", content: inlineNodes(lines[i].replace(/^\d+\.\s+/, "")) }],
        });
        i++;
      }
      content.push({ type: "orderedList", attrs: { start: 1 }, content: items });
      continue;
    }

    // paragraph (collect until blank line or block-level marker)
    const para: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|---|>|```|[-*]\s|\d+\.\s)/.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    content.push({ type: "paragraph", content: inlineNodes(para.join(" ").trim()) });
  }

  return { type: "doc", content };
}

async function main() {
  const mdPath = path.join(__dirname, "..", "curriculum", "empire-os-coolify-stack.md");
  const md = fs.readFileSync(mdPath, "utf8");
  const body = mdToTiptap(md);

  // Ensure Empire OS course
  const course = await prisma.course.upsert({
    where: { slug: "empire-os" },
    update: {},
    create: {
      slug: "empire-os",
      title: "Empire OS",
      subtitle: "How I run the agency. Systems, hires, finance, fulfillment.",
      description: "The boring stuff that compounds. The operating manual behind the YouTube.",
      heroImage: "/images/course-empire-os.jpg",
      sortOrder: 4,
      published: true,
    },
  });
  console.log(`course empire-os: id=${course.id}`);

  // Ensure "Fulfillment Ops" module under Empire OS
  let module_ = await prisma.module.findFirst({
    where: { courseId: course.id, title: "Fulfillment Ops" },
  });
  if (!module_) {
    module_ = await prisma.module.create({
      data: {
        courseId: course.id,
        title: "Fulfillment Ops",
        summary: "What you do once a client says yes — the deploy stack, hosting, email, DNS.",
        sortOrder: 6, // Fulfillment is module 06 of Empire OS per the curriculum plan
      },
    });
  }
  console.log(`module Fulfillment Ops: id=${module_.id}`);

  // Upsert the lesson
  const lesson = await prisma.lesson.upsert({
    where: { moduleId_slug: { moduleId: module_.id, slug: "coolify-stack" } },
    update: {
      title: "Stop Using Netlify — The Coolify Stack",
      body,
      durationMinutes: 45,
      sortOrder: 1,
      published: true,
    },
    create: {
      moduleId: module_.id,
      slug: "coolify-stack",
      title: "Stop Using Netlify — The Coolify Stack",
      body,
      durationMinutes: 45,
      sortOrder: 1,
      published: true,
    },
  });
  console.log(`lesson coolify-stack: id=${lesson.id}  body nodes=${(body as any).content?.length ?? 0}`);

  console.log(`\n✓ Seeded. View: https://benjisaiempire.com/learn/empire-os/coolify-stack (after admin login)`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
