<script setup lang="ts">
definePageMeta({
  name: "registries",
});
</script>
<!-- This is needed to make the navbar element "Rgistries" active when a subpath element like "/registries/add" is selected -->
<template>
  <div>
    <!-- Without the div nuxt has a problem rendering the page -->
    <NuxtPage />
  </div>
</template>
