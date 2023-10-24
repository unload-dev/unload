import type { Registry } from "./types";
import type { RegistryOptions } from "@unload/registry-client";

import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { RegistryClient, Provider } from "@unload/registry-client";

export const registryRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }): Promise<Registry[]> => {
    const registries = await ctx.prisma.registry.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        type: true,
        credentials: true,
      },
    });

    const checkedRegistries: Registry[] = [];

    for (const registry of registries) {
      let isConnected = false;
      try {
        const options: RegistryOptions = {
          name: registry.namespace as string,
          token: registry.credentials.token as string,
        };
        const provider = RegistryClient.create(Provider.digitalOcean, options);
        isConnected = await provider.ping();
      } catch (error) {}
      checkedRegistries.push({
        id: registry.id,
        name: registry.name,
        type: registry.type.name,
        repositories: registry.name.length,
        connected: isConnected,
      });
    }

    return checkedRegistries;
  }),
  add: protectedProcedure
    .input(
      z.object({
        registry: z.object({
          name: z.string(),
          namespace: z.string(),
          url: z.string(),
          skipTlsVerify: z.boolean().default(false),
          type: z.string(),
        }),
        credentials: z.object({
          username: z.string(),
          password: z.string(),
          token: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.registry.create({
        data: {
          ...input.registry,
          credentials: {
            create: input.credentials,
          },
          type: {
            connect: {
              id: input.registry.type,
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const registry = await ctx.prisma.registry.delete({
        where: {
          id: input.id,
        },
      });

      await ctx.prisma.registryCredentials.delete({
        where: {
          id: registry.credentialsId,
        },
      });
    }),
  getTypes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.registryType.findMany({
      orderBy: [
        {
          enabled: "desc",
        },
        {
          name: "asc",
        },
      ],
    });
  }),
});
