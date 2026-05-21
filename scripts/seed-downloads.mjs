/**
 * Upsert portal downloads (SKILL.md, cold call pack, master script).
 * Run: node scripts/seed-downloads.mjs
 * Requires DATABASE_URL in .env and `npx prisma db push` if copyText column is new.
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dlDir = join(root, "public", "downloads");

const prisma = new PrismaClient();

function readDl(name) {
  return readFileSync(join(dlDir, name), "utf8");
}

const DOWNLOADS = [
  {
    title: "Website Redesign Skill (SKILL.md)",
    description:
      "Full Cursor skill for autonomous website redesign — GitHub, Netlify, Framer Motion, booking backends.",
    url: "/downloads/website-redesign-skill.md",
    fileType: "MD",
    sortOrder: 10,
    copyText: () => readDl("website-redesign-skill.md"),
  },
  {
    title: "Master Script — Video Cold Call",
    description:
      "The baseline script from the pack — learn this cold before the five variations.",
    url: "/downloads/video-master-cold-call-script.txt",
    fileType: "Script",
    sortOrder: 15,
    copyText: () => readDl("video-master-cold-call-script.txt"),
  },
  {
    title: "Cold Calling Script Pack (PDF)",
    description:
      "Master script plus five variations, objection flips, and the free-website offer SOP.",
    url: "/downloads/cold-calling-script-pack.pdf",
    fileType: "PDF",
    sortOrder: 20,
    copyText: null,
  },
];

async function main() {
  for (const row of DOWNLOADS) {
    const copyText = row.copyText ? row.copyText() : null;
    const existing = await prisma.download.findFirst({
      where: { url: row.url },
    });
    const data = {
      title: row.title,
      description: row.description,
      url: row.url,
      copyText,
      fileType: row.fileType,
      sortOrder: row.sortOrder,
      published: true,
      tier: "INSIDER",
    };
    if (existing) {
      await prisma.download.update({ where: { id: existing.id }, data });
      console.log(`Updated: ${row.title}`);
    } else {
      await prisma.download.create({ data });
      console.log(`Created: ${row.title}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
