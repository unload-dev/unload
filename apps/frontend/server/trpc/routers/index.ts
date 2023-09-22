import { router } from "../trpc";
import { registryRouter } from "./registry";
import { healthRouter } from "./health";

export const appRouter = router({
  registry: registryRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
