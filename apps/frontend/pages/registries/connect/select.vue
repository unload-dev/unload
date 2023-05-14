<script setup>
definePageMeta({
  name: "registry-select",
});

const registryTypes = await $client.registry.getTypes.query();
</script>

<template>
  <div class="flex flex-col gap-6 max-w-md w-full mx-auto">
    <h1 class="text-2xl">Select your registry provider</h1>
    <div class="grid grid-cols-2 gap-4">
      <BaseButton>First</BaseButton>
      <BaseButton>Second</BaseButton>
      <BaseButton>Third</BaseButton>
    </div>
  </div>
</template>
