import { PrismaClient } from "@prisma/client";
import type { RegistryType } from "@prisma/client";
import { Provider } from "@unload/registry-client";
const prisma = new PrismaClient();

function upsertRegistryType(registryType: RegistryType) {
  return prisma.registryType.upsert({
    where: { id: registryType.id },
    update: {},
    create: {
      ...registryType,
    },
  });
}

async function main() {
  const registryTypes: RegistryType[] = [
    { id: Provider.dockerHub, name: "DockerHub", enabled: false },
    { id: Provider.github, name: "GitHub", enabled: false },
    { id: Provider.digitalOcean, name: "DigitalOcean", enabled: true },
    {
      id: Provider.dockerRegistryV2,
      name: "Docker Registry V2",
      enabled: false,
    },
  ];

  for (const registryType of registryTypes) {
    await upsertRegistryType(registryType);
  }

  console.log("Registry types:", registryTypes);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
