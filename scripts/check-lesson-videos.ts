import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findUnique({
    where: { slug: "30-day-ai-website-empire-challenge" },
    select: { id: true, title: true },
  });
  if (!course) {
    console.log("Course not found in this database.");
    return;
  }

  const withVideo = await prisma.lesson.count({
    where: { videoUrl: { not: null }, module: { courseId: course.id } },
  });
  const total = await prisma.lesson.count({
    where: { module: { courseId: course.id } },
  });

  console.log(`Course: ${course.title}`);
  console.log(`Lessons with videoUrl: ${withVideo} / ${total}`);

  const lessons = await prisma.lesson.findMany({
    where: { videoUrl: { not: null }, module: { courseId: course.id } },
    select: { slug: true, title: true, videoUrl: true },
    orderBy: { sortOrder: "asc" },
  });
  for (const l of lessons) {
    console.log(`  ${l.slug} → ${l.videoUrl}`);
  }
}

main()
  .finally(() => prisma.$disconnect());
