import { router } from "../trpc";
import { registryRouter } from "./registry";
import { repositoryRouter } from "./repositories";
import { healthRouter } from "./health";

export const appRouter = router({
  registry: registryRouter,
  repository: repositoryRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
