/**
 * Seeds Big Loop Flow GHL link: portal Software row + Module 5 download.
 * Run: npx tsx scripts/seed-ghl-big-loop.ts
 */
import { PrismaClient } from "@prisma/client";
import { GHL_BIG_LOOP_STRIPE_URL, PORTAL_SOFTWARE_CATALOG } from "../src/lib/portal-software";

const prisma = new PrismaClient();
const COURSE_SLUG = "30-day-ai-website-empire-challenge";
const GHL_MODULE_SORT = 5;

async function main() {
  for (const entry of PORTAL_SOFTWARE_CATALOG) {
    const existing = await prisma.download.findFirst({
      where: { title: entry.title },
    });
    if (existing) {
      await prisma.download.update({
        where: { id: existing.id },
        data: {
          description: entry.description,
          url: entry.url,
          fileType: "Software",
          sortOrder: entry.sortOrder,
          published: true,
          tier: entry.tier,
        },
      });
      console.log(`Software (updated): ${entry.title}`);
    } else {
      await prisma.download.create({
        data: {
          title: entry.title,
          description: entry.description,
          url: entry.url,
          fileType: "Software",
          sortOrder: entry.sortOrder,
          published: true,
          tier: entry.tier,
        },
      });
      console.log(`Software (created): ${entry.title}`);
    }
  }

  const course = await prisma.course.findUnique({ where: { slug: COURSE_SLUG } });
  if (!course) {
    console.error(`Course not found: ${COURSE_SLUG}. Run seed-30-day-ai-website-empire-challenge first.`);
    process.exit(1);
  }

  const ghlModule = await prisma.module.findFirst({
    where: { courseId: course.id, sortOrder: GHL_MODULE_SORT },
  });
  if (!ghlModule) {
    console.error(`Module sortOrder ${GHL_MODULE_SORT} not found.`);
    process.exit(1);
  }

  const dlTitle = "GoHighLevel — Big Loop Flow ($1/mo)";
  const existingDl = await prisma.moduleDownload.findFirst({
    where: { moduleId: ghlModule.id, title: dlTitle },
  });
  if (existingDl) {
    await prisma.moduleDownload.update({
      where: { id: existingDl.id },
      data: { url: GHL_BIG_LOOP_STRIPE_URL, fileType: "Link", sortOrder: 0 },
    });
    console.log(`Module download (updated): ${dlTitle}`);
  } else {
    await prisma.moduleDownload.create({
      data: {
        moduleId: ghlModule.id,
        title: dlTitle,
        url: GHL_BIG_LOOP_STRIPE_URL,
        fileType: "Link",
        sortOrder: 0,
      },
    });
    console.log(`Module download (created): ${dlTitle}`);
  }

  console.log("\nDone. Re-run seed-30-day-ai-website-empire-challenge to refresh Module 5 lesson text from markdown.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
