<script setup lang="ts">
definePageMeta({
  title: "Registries",
});
import { useRegistryStore } from "~/store/registryStore";
import { storeToRefs } from "pinia";

const store = useRegistryStore();
const { registries } = storeToRefs(store);

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    { label: "Delete", icon: "i-heroicons-trash-20-solid" },
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
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'No registries.',
      }"
    >
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
