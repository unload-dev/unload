<script setup>
import { formatTimeAgo } from "@vueuse/core";
definePageMeta({
  title: "Repositories",
});
const repositories = ref([]);
const isLoading = ref(true);
const { $client } = useNuxtApp();

$client.repository.getAll.useQuery().then(({ data }) => {
  repositories.value = data.value || [
    {
      name: "alpine",
      registry: "Docker Prod",
      manifest_count: 234,
      tag_count: 84,
      updated_at: new Date(),
    },
  ];
  isLoading.value = false;
});

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "registry",
    label: "Registry",
  },
  {
    key: "manifest_count",
    label: "Images",
  },
  {
    key: "tag_count",
    label: "Tags",
  },
  {
    key: "updated_at",
    label: "Last pushed",
  },
  { key: "actions", class: "w-12" },
];
</script>

<template>
  <div>
    <header class="my-6 flex items-center justify-between">
      <h1 class="py-1 text-xl font-medium">Repositories</h1>
    </header>

    <UTable
      :columns="columns"
      :rows="repositories"
      :ui="{
        wrapper: 'border rounded-md border-gray-200 dark:border-gray-700',
      }"
      :loading="isLoading"
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: 'Loading...',
      }"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'No repositories.',
      }"
    >
      <template #updated_at-data="{ row }">
        {{ formatTimeAgo(row.updated_at) }}
      </template>
      <template #actions-data="{ row }">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-chevron-right-20-solid"
          :to="{ name: 'repositories-name', params: { name: row.name } }"
        />
      </template>
    </UTable>
  </div>
</template>
