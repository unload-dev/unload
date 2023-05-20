import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import RegistryClient from "@unload/registry-client";

const options = {
  registry: "localhost:5001",
  https: true,
  insecure: true,
  auth: {
    username: "testuser",
    password: "testpassword",
  },
};

export const registryRouter = router({
  getByName: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ ctx }) => {
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
});
