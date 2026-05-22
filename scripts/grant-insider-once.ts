import { PrismaClient } from "@prisma/client";

const email = (process.argv[2] ?? "severinatip@gmail.com").trim().toLowerCase();
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      tier: "INSIDER",
      role: "USER",
      name: email.split("@")[0] ?? "Member",
      subscriptionStatus: "ACTIVE",
    },
    update: {
      tier: "INSIDER",
      subscriptionStatus: "ACTIVE",
    },
  });
  console.log(`Granted INSIDER: ${user.email} (id=${user.id}, tier=${user.tier})`);
  console.log("They can sign in at https://benjisaiempire.com/login with this email for a magic link.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
