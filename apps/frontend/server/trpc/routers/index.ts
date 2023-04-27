import { router } from "../trpc";
import { registryRouter } from "./registry";

export const appRouter = router({
  registry: registryRouter,
});

export type AppRouter = typeof appRouter;
