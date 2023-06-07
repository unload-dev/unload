import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const healthRouter = router({
  ready: publicProcedure.query(async ({ ctx }) => {
    try {
      await ctx.prisma.registryType.findMany({});
      return "OK";
    } catch (err) {
      console.error(err);
      return "ERROR";
    }
  }),
});
