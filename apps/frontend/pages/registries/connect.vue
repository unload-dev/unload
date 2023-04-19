<script setup>
definePageMeta({
  name: "connect-registry",
});
</script>

<template>
  <div class="rounded-box bg-base-200 h-full p-6">
    <NuxtLink :to="{ name: 'registries' }">&LeftArrow; Back</NuxtLink>
    <form
      class="flex form-control mx-auto w-full max-w-md gap-4 items-center justify-items-center justify-center center"
    >
      <input
        type="text"
        placeholder="Type here"
        class="input w-full max-w-md"
      />

      <input
        type="text"
        placeholder="Type here"
        class="input w-full max-w-md"
      />
    </form>
  </div>
</template>
