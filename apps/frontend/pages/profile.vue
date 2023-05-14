<script setup>
definePageMeta({
  title: "Profile",
});

const { status, data, lastRefreshedAt } = useAuth();
</script>

<template>
  <div class="w-full h-full rounded-box bg-base-200 p-4">
    <p>Status: {{ status }}</p>
    <br />
    <p>Data: {{ data }}</p>
    <br />
    <p>Refreshed at: {{ lastRefreshedAt }}</p>
  </div>
</template>
