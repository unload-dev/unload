<script setup>
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

definePageMeta({
  name: "registry-connect",
});
import { useRegistryStore } from "~/store/registryStore";
const registryStore = useRegistryStore();

const { handleSubmit } = useForm({
  initialValues: {
    registry: {
      name: "",
      type: registryStore.types?.[0].id,
      url: "",
      skipTlsVerify: false,
    },
    credentials: {
      username: "",
      password: "",
    },
  },
  validationSchema: toTypedSchema(
    z.object({
      registry: z.object({
        name: z.string().min(1, "Required"),
        type: z.string(),
        url: z.string().url("Please enter a valid url"),
        skipTlsVerify: z.boolean(),
      }),
      credentials: z.object({
        username: z.string(),
        password: z.string(),
      }),
    })
  ),
});

async function addRegistry(values) {
  try {
    await registryStore.add(values);
    await navigateTo({ name: "registries" });
  } catch (error) {
    console.error(error);
  }
}

const onSubmit = handleSubmit(async (values) => {
  await addRegistry(values);
});
</script>

<template>
  <div class="rounded-box bg-base-200 h-full p-6">
    <span class="loading loading-spinner loading-md"></span>
    <NuxtLink :to="{ name: 'registries' }">&LeftArrow; Back</NuxtLink>

    <form
      @submit.prevent="onSubmit"
      class="flex fley-grow h-full form-control max-w-md w-full mx-auto"
    >
      <h2>Connect your registry</h2>
      <FormInputField type="text" placeholder="Name" name="registry.name" />
      <FormSelectField
        title="Select a registry provider"
        :data="registryStore.types"
        name="registry.type"
      />
      <FormInputField type="text" placeholder="Registry" name="registry.url" />
      <FormToggleButton name="registry.skipTlsVerify" />

      <h3 class="mt-6">Registry credentials</h3>
      <FormInputField
        type="text"
        placeholder="Username"
        name="credentials.username"
      />
      <FormInputField
        type="password"
        placeholder="Password"
        name="credentials.password"
      />

      <BaseButton type="submit" class="btn-primary place-self-end">
        Create
      </BaseButton>
      <span class="loading loading-spinner loading-xs"></span>
      <span class="loading loading-spinner loading-md"></span>
    </form>
  </div>
</template>
