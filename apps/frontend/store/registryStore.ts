import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/trpc/routers";

type RouterOutput = inferRouterOutputs<AppRouter>;
type RegistriesOutput = RouterOutput["registry"]["getAll"] | null;

import { defineStore } from "pinia";
export const useRegistryStore = defineStore("registryStore", () => {
  const registries = ref<RegistriesOutput>();

  const { $client } = useNuxtApp();

  async function load() {
    const { data } = await $client.registry.getAll.useQuery();
    registries.value = data.value;
  }

  load();
  return { registries };
});
