import { Repository } from "./types";

import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import {
  RegistryClient,
  Provider,
  RegistryOptions,
} from "@unload/registry-client";

export const repositoryRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }): Promise<Repository[]> => {
    const registries = await ctx.prisma.registry.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        type: true,
        credentials: true,
      },
    });

    const reg = registries.filter((r) => r.name === "Unload - Production")[0];
    const options: RegistryOptions = {
      name: reg.namespace as string,
      token: reg.credentials.token as string,
    };
    const provider = RegistryClient.create(Provider.digitalOcean, options);
    const repositories = await provider.getRepositories();

    const result = repositories.map((repo): Repository => {
      return {
        ...repo,
        registry: reg.name,
      };
    });

    return result;
  }),
});
