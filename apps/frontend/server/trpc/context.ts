import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";

let prisma: PrismaClient | undefined;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return {
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
