import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function upsertRegistryType(name: string) {
  return prisma.registryType.upsert({
    where: { name },
    update: {},
    create: {
      name,
    },
  });
}

async function main() {
  const registryTypes = ["GitHub", "DigitalOcean", "Docker Registry"];

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
