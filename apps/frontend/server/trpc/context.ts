import { PrismaClient } from "@prisma/client";
import type { inferAsyncReturnType } from "@trpc/server";
import { getServerSession } from "#auth";
import type { H3Event } from "h3";

let prisma: PrismaClient | undefined;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(event: H3Event) {
  if (!prisma) {
    prisma = new PrismaClient();
  }

  const session = await getServerSession(event);

  return {
    prisma,
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
