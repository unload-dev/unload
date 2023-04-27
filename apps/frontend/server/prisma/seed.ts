import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",

      registries: {
        create: {
          title: "My private registry",
          type: "Digital Ocean ",
          url: "https://registry.digitalocean/alice",
          credentials: {
            create: {
              username: "alice",
              password: "password",
            },
          },
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      registries: {
        create: [
          {
            title: "ACME corp.",
            type: "Docker Hub",
            url: "https://docker.hub.com/unloaddev",
            credentials: {
              create: {
                username: "bob",
                password: "password",
              },
            },
          },
          {
            title: "Pied Piper Registry",
            type: "Github",
            url: "https://gcr.io/registry12345",
            credentials: {
              create: {
                username: "bob-business",
                password: "business-password",
              },
            },
          },
        ],
      },
    },
  });
  console.log({ alice, bob });
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
