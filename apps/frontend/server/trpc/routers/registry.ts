import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const registryRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const registries = await ctx.prisma.registry.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        type: true,
      },
    });

    const values = registries.map((reg) => {
      return {
        name: reg.name,
        type: reg.type.name,
        repositories: reg.name.length,
      };
    });

    return values;
  }),
  add: protectedProcedure
    .input(
      z.object({
        registry: z.object({
          name: z.string(),
          url: z.string(),
          skipTlsVerify: z.boolean().default(false),
          type: z.string(),
        }),
        credentials: z.object({
          username: z.string(),
          password: z.string(),
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
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const registry = await ctx.prisma.registry.delete({
        where: {
          name: input.name,
        },
      });

      await ctx.prisma.registryCredentials.delete({
        where: {
          id: registry.credentialsId,
        },
      });
    }),
  getTypes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.registryType.findMany();
  }),
});
