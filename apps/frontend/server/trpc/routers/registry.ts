import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import RegistryClient from "@unload/registry-client";

const options = {
  repository: "localhost:5001",
  https: true,
  insecure: true,
  auth: {
    username: "testuser",
    password: "testpassword",
  },
};

export const registryRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const registries = await ctx.prisma.registry.findMany();
    const values = registries.map((reg) => {
      return {
        name: reg.title,
        type: reg.type,
        repositories: reg.title.length,
      };
    });
    return values;
  }),
});
