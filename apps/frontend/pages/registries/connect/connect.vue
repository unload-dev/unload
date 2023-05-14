<script setup>
definePageMeta({
  name: "registry-connect",
});
const { $client } = useNuxtApp();

const registryTypes = await $client.registry.getTypes.query();

const formData = reactive({
  registry: {
    name: "",
    url: "",
    skipTlsVerify: false,
    type: registryTypes[0].id,
  },
  credentials: {
    username: "",
    password: "",
  },
});

async function handleSubmit() {
  try {
    await $client.registry.add.mutate(formData);

    // TODO navigate to created registry
    await navigateTo({ name: "registries" });
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="rounded-box bg-base-200 h-full p-6">
    <NuxtLink :to="{ name: 'registries' }">&LeftArrow; Back</NuxtLink>
    <form
      class="flex form-control gap-4 max-w-md w-full mx-auto"
      @submit.prevent="handleSubmit"
    >
      <h2>Connect your registry</h2>
      <input
        type="text"
        placeholder="Name"
        class="input"
        v-model="formData.registry.name"
      />

      <select class="select" v-model="formData.registry.type">
        <option
          v-for="registryType in registryTypes"
          :key="registryType.id"
          :value="registryType.id"
        >
          {{ registryType.name }}
        </option>
      </select>

      <input
        type="text"
        placeholder="Registry URL"
        class="input"
        v-model="formData.registry.url"
      />

      <label class="cursor-pointer label w-52">
        <input
          type="checkbox"
          class="toggle toggle-primary"
          v-model="formData.registry.skipTlsVerify"
        />
        <span class="label-text">Skip TLS verification</span>
      </label>

      <h3>Registry credentials</h3>
      <input
        type="text"
        placeholder="Username"
        class="input"
        v-model="formData.credentials.username"
      />
      <input
        type="password"
        placeholder="Password"
        class="input"
        v-model="formData.credentials.password"
      />

      <BaseButton type="submit" class="btn-primary place-self-end"
        >Create</BaseButton
      >
    </form>
  </div>
</template>
