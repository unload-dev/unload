<script setup lang="ts">
definePageMeta({
  title: "Registries",
});
import { useRegistryStore } from "~/store/registryStore";
import { storeToRefs } from "pinia";
import type { Registry } from "~/server/trpc/routers/types";

const store = useRegistryStore();
const { registries, isLoading } = storeToRefs(store);

const items = (row: Registry) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      disabled: true,
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => store.remove(row.id),
    },
  ],
];

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "repositories",
    label: "Repositories",
  },
  {
    key: "connected",
    label: "Status",
  },
  { key: "actions", class: "w-12" },
];
</script>

<template>
  <div>
    <header class="my-6 flex items-center justify-between">
      <h1 class="py-1 text-xl font-medium">Registries</h1>
      <UButton
        icon="i-heroicons-plus-20-solid"
        label="Connect Registry"
        color="black"
        :ui="{ icon: { size: { sm: 'h-4 w-4' } } }"
        :to="{ name: 'registry-connect' }"
      />
    </header>

    <UTable
      :columns="columns"
      :rows="registries"
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
        label: 'No registries.',
      }"
    >
      <template #connected-data="{ row }">
        <template v-if="row.connected">
          <UBadge color="green" variant="outline" label="Connected" />
        </template>
        <template v-else>
          <UBadge color="red" variant="outline" label="Disconnected" />
        </template>
      </template>
      <template #actions-data="{ row }">
        <UDropdown class="w-8" :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
