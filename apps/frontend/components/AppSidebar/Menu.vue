<script setup>
const items = [
  {
    title: "Dashboard",
    path: "/",
    icon: "home",
  },
  {
    title: "Registries",
    path: "/registries",
    icon: "truck",
  },
  {
    title: "Repositories",
    path: "/repositories",
    icon: "archive",
  },
  {
    title: "Jobs",
    path: "/jobs",
    disabled: true,
    icon: "clock",
  },
];
</script>

<template>
  <ul class="menu h-full py-6 bg-base-200">
    <AppSidebarMenuItem
      v-for="item in items"
      :key="item.title"
      :title="item.title"
      :path="item.path"
      :disabled="item.disabled"
      :icon="item.icon"
    />
  </ul>
</template>
