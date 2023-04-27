import prisma from "../../data/prisma";
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

export default defineEventHandler(async (event) => {
  const registries = await prisma.registry.findMany();

  // Get registries
  const registryClient = new RegistryClient(options);

  const values = registries.map((reg) => {
    return {
      name: reg.title,
      type: reg.type,
      repositories: reg.title.length,
    };
  });
  return values;
});
