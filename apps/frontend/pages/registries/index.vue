<script setup>
definePageMeta({
  title: "Registries",
});

// const route = useRoute();
// const addLink = [route.fullPath, "connect"].join("/");

const values = [
  "Docker Hub",
  "DigitalOcean",
  "Harbor",
  "Acme Inc.",
  "Azure",
  "GitHub",
].map((value) => {
  return {
    name: value,
    type: "DockerV2",
    repositories: value.length,
  };
});
</script>

<template>
  <div class="flex h-full gap-6">
    <div class="flex-grow rounded-box">
      <div
        class="grid grid-cols-[minmax(0,_1fr)_auto_25%] grid-rows-[auto_minmax(0,_1fr)] gap-6"
      >
        <BaseCard
          class="col-span-1 row-span-1"
          title="Manage your repositories"
          description="Seamlessly manage your container images by connecting your registry and taking control of your repositories."
        />
        <BaseCard
          class="col-span-1 row-span-1"
          title="Connect a registry"
          description="Connect a remote registry to your project."
        >
          <NuxtLink class="btn btn-primary" :to="{ name: 'connect-registry' }">
            Connect
          </NuxtLink>
          <!-- <button class="btn btn-primary">Connect</button> -->
        </BaseCard>
        <div
          class="col-span-1 row-span-2 bg-base-200 rounded-box grid place-items-center"
        >
          <p>Stats coming soon!</p>
        </div>
        <BaseTable class="col-span-2 row-span-1" :values="values" />
      </div>
    </div>
  </div>
</template>
