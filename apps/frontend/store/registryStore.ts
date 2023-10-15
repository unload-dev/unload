import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/trpc/routers";

type RouterOutput = inferRouterOutputs<AppRouter>;
type RouterInput = inferRouterInputs<AppRouter>;
type Registries = RouterOutput["registry"]["getAll"] | null;
type RegistryTypes = RouterOutput["registry"]["getTypes"] | null;
type RegistryCreate = RouterInput["registry"]["add"];

import { defineStore } from "pinia";

export const useRegistryStore = defineStore("registryStore", () => {
  const registries = ref<Registries>();
  const types = ref<RegistryTypes>();
  const isLoading = ref<boolean>(true);

  const { $client } = useNuxtApp();

  async function load() {
    const { data } = await $client.registry.getAll.useQuery();
    registries.value = data.value;
    isLoading.value = false;
  }

  async function loadTypes() {
    const { data } = await $client.registry.getTypes.useQuery();
    types.value = data.value;
  }

  async function add(registry: RegistryCreate) {
    await $client.registry.add.mutate(registry);
    await load();
  }

  async function remove(id: string): Promise<void> {
    await $client.registry.delete.mutate({ id });
    await load();
  }

  load();
  loadTypes();
  return { registries, isLoading, types, remove, add };
});
