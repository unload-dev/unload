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

    const response = [];
    for (const registry of registries) {
      try {
        const options: RegistryOptions = {
          name: registry.namespace as string,
          token: registry.credentials.token as string,
        };
        const provider = RegistryClient.create(Provider.digitalOcean, options);
        const repositories = await provider.getRepositories();

        const repoWithRegistry = repositories.map((repo): Repository => {
          return {
            ...repo,
            registry: registry.name,
          };
        });
        response.push(...repoWithRegistry);
      } catch (error) {
        console.error(`Can't access registry: ${registry.name}`);
      }
    }

    return response;
  }),
});
