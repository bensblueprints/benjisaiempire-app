import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import type { Tier, UserRole } from "@prisma/client";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

type DbUserSlice = {
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
  tier: Tier;
};

function applyUserToToken(
  token: Record<string, unknown>,
  dbUser: DbUserSlice,
): void {
  token.email = dbUser.email;
  token.name = dbUser.name;
  token.picture = dbUser.image;
  token.role = dbUser.role;
  token.tier = dbUser.tier;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  pages: { signIn: "/login", verifyRequest: "/auth/verify-request" },
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.EMAIL_FROM!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Prisma only here (Node / auth API) — never in session callback (runs on Edge middleware).
      if (user?.id) {
        token.id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { email: true, name: true, image: true, role: true, tier: true },
        });
        if (dbUser) {
          applyUserToToken(token, dbUser);
          if (
            user.email &&
            ADMIN_EMAILS.includes(user.email.toLowerCase()) &&
            dbUser.role !== "ADMIN"
          ) {
            await prisma.user
              .update({ where: { id: user.id }, data: { role: "ADMIN" } })
              .catch(() => {});
            token.role = "ADMIN";
          }
        }
      } else if (trigger === "update" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { email: true, name: true, image: true, role: true, tier: true },
        });
        if (dbUser) applyUserToToken(token, dbUser);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
        session.user.email = (token.email as string) ?? session.user.email ?? "";
        session.user.name = (token.name as string | null) ?? null;
        session.user.image = (token.picture as string | null) ?? null;
        session.user.role = (token.role as UserRole) ?? "USER";
        session.user.tier = (token.tier as Tier) ?? "FREE";
      }
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: UserRole;
      tier: Tier;
    };
  }
}
