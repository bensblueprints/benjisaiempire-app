import type { Tier, UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: UserRole;
      tier: Tier;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
    tier: Tier;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    tier?: Tier;
  }
}
