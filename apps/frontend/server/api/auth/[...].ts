import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import type { DefaultSession } from "next-auth";

// The session type needs to be augmented.
// Related issue: https://github.com/nextauthjs/next-auth/issues/7132#issuecomment-1493407702
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export default NuxtAuthHandler({
  //   pages: {
  //     // Change the default behavior to use `/login` as the path for the sign-in page
  //     signIn: "/login",
  //   },
  adapter: PrismaAdapter(prisma),
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => {
      if (session.user !== undefined) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
