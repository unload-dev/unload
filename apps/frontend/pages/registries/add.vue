<script setup lang="ts">
definePageMeta({
  name: "registry-connect",
});

import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { RegistryCreate } from "~/store/registryStore";
import { useRegistryStore } from "~/store/registryStore";

const registryStore = useRegistryStore();
const loading = ref<boolean>(false);

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
    token: z.string().min(1, "Required"),
  }),
});

type Schema = z.output<typeof schema>;

const state = ref<RegistryCreate>({
  registry: {
    name: "",
    namespace: "",
    type: registryStore.types?.[0]?.id ?? "",
    url: "https://localhost",
    skipTlsVerify: false,
  },
  credentials: { username: "", password: "", token: "" },
});

async function addRegistry(values: RegistryCreate) {
  try {
    await registryStore.add(values);
    await navigateTo({ name: "registries-list" });
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
      class="mx-auto flex w-full max-w-2xl flex-col items-start gap-4"
    >
      <h1 class="my-6">Connect your registry</h1>

      <UFormGroup
        class="w-full"
        label="Select a registry provider"
        name="registry.type"
      >
        <template #label>
          <h3>Select a registry provider</h3>
        </template>
        <div class="grid w-full grid-cols-2 gap-2">
          <template v-for="registryType of registryStore.types">
            <UButton
              v-if="registryType.enabled"
              :class="{
                'ring-1 ring-inset ring-current':
                  state.registry.type === registryType.id,
              }"
              size="lg"
              variant="soft"
              block
              :label="registryType.name"
              @click="state.registry.type = registryType.id"
            />
            <UButton
              v-else
              size="lg"
              variant="soft"
              block
              disabled
              :label="registryType.name"
            />
          </template>
        </div>
      </UFormGroup>

      <UFormGroup class="w-full" required label="Name" name="registry.name">
        <UInput v-model="state.registry.name" />
      </UFormGroup>

      <UFormGroup
        class="w-full"
        required
        label="DigitalOcean's registry name"
        name="registry.namespace"
      >
        <UInput v-model="state.registry.namespace" />
      </UFormGroup>

      <h3 class="mt-4">Registry credentials</h3>

      <UFormGroup
        class="w-full"
        required
        label="Personal access token"
        name="credentials.token"
      >
        <UInput v-model="state.credentials.token" type="password" />
      </UFormGroup>

      <UButton :loading="loading" loading-icon="" type="submit">
        <template #trailing v-if="loading">
          <svg
            class="h-4 w-4 animate-spin text-white"
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
