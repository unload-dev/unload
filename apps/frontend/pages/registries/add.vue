<script setup lang="ts">
definePageMeta({
  name: "registry-connect",
});

import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import { useRegistryStore } from "~/store/registryStore";

const registryStore = useRegistryStore();
const loading = ref<boolean>(false);
const current = computed(
  () =>
    registryStore.types.find(
      (type) => type.id === state.value.registry.type
    ) ?? { name: "Select a provider" }
);

const schema = z.object({
  registry: z.object({
    name: z.string().min(1, "Required"),
    namespace: z.string().min(1, "Required"),
    type: z.string().min(1, "Required"),
    url: z.string().url("Please enter a valid url"),
    skipTlsVerify: z.boolean(),
  }),
  credentials: z.object({
    username: z.string(),
    password: z.string(),
    token: z.string(),
  }),
});

type Schema = z.output<typeof schema>;

const state = ref({
  registry: {
    name: "",
    namespace: "",
    type: "",
    url: "https://localhost",
    skipTlsVerify: false,
  },
  credentials: { username: "", password: "", token: "" },
});

async function addRegistry(values) {
  try {
    await registryStore.add(values);
    await navigateTo({ name: "registries" });
  } catch (error) {
    console.error(error);
  }
}

async function submit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  loading.value = true;
  try {
    await addRegistry(event.data);
  } catch (e) {
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <div class="my-6">
      <NuxtLink :to="{ name: 'registries-list' }">&LeftArrow; Back</NuxtLink>
    </div>

    <UForm
      :schema="schema"
      :state="state"
      @submit="submit"
      class="flex flex-col items-start gap-4 mx-auto w-full max-w-xs"
    >
      <h2>Connect your registry</h2>
      <UFormGroup required label="Name" name="registry.name">
        <UInput v-model="state.registry.name" />
      </UFormGroup>

      <UFormGroup required label="Registry provider" name="registry.type">
        <USelectMenu
          v-model="state.registry.type"
          :options="registryStore.types"
          placeholder="Select registry provider"
          value-attribute="id"
          option-attribute="name"
        >
          <template #label> {{ current.name }} </template>
        </USelectMenu>
      </UFormGroup>

      <UFormGroup required label="Registry Name" name="registry.namespace">
        <UInput v-model="state.registry.namespace" />
      </UFormGroup>

      <!-- <UFormGroup required label="Registry URL" name="registry.url">
        <UInput v-model="state.registry.url" />
      </UFormGroup> -->

      <h3 class="mt-4">Registry credentials</h3>
      <!-- <UFormGroup label="Username" name="credentials.username">
        <UInput v-model="state.credentials.username" />
      </UFormGroup>

      <UFormGroup label="Password" name="credentials.password">
        <UInput v-model="state.credentials.password" type="password" />
      </UFormGroup> -->

      <UFormGroup label="Token" name="credentials.token">
        <UInput v-model="state.credentials.token" type="token" />
      </UFormGroup>

      <UButton :loading="loading" loading-icon="" type="submit">
        <template #trailing v-if="loading">
          <svg
            class="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </template>
        Connect
      </UButton>
    </UForm>
  </div>
</template>
