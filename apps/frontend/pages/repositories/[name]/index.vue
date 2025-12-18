<script setup lang="ts">
const route = useRoute();
console.log(route);

const includeRules = ref([
  {
    name: "Keep semver versions",
    regex: "^[a-zA-Z]+$",
    time: "Always",
    enabled: true,
    affectedTags: 46,
  },
  {
    name: "Keep last 7 days",
    regex: "-",
    time: "last 7 days",
    enabled: false,
    affectedTags: 17,
  },
]);
const excludeRules = ref([]);

excludeRules.value = includeRules.value;

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      disabled: true,
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      disabled: true,
    },
  ],
];

const includeColumns = [
  {
    key: "enabled",
    label: "Status",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "regex",
    label: "Regex",
  },
  {
    key: "time",
    label: "Time Range",
  },
  { key: "actions", class: "w-12" },
];

const excludeColumns = includeColumns;
</script>

<template>
  <div>
    <div class="mb-4">
      <UButton
        variant="link"
        color="gray"
        :to="{ name: 'repositories' }"
        label="&LeftArrow; Back"
      />
    </div>

    <div class="mb-6 flex flex-col gap-2">
      <h1>Registry: {{ route.params.name }}</h1>
      <div class="flex items-center justify-between">
        <h2>Inlcude Rules</h2>
        <UButton
          color="gray"
          size="xs"
          label="Add include rule"
          :to="{ name: 'repositories-name-includeRules' }"
        />
      </div>
      <p class="text-sm opacity-50">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <UTable
        :columns="includeColumns"
        :rows="includeRules"
        :ui="{
          wrapper: 'border rounded-md border-gray-200 dark:border-gray-700',
        }"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No rules found.',
        }"
      >
        <template #enabled-data="{ row }">
          <UToggle v-model="row.enabled" />
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
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <h2>Exclude Rules</h2>
        <UButton color="gray" size="xs" label="Add exclude rule" />
      </div>
      <p class="text-sm opacity-50">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <UTable
        :columns="excludeColumns"
        :rows="excludeRules"
        :ui="{
          wrapper: 'border rounded-md border-gray-200 dark:border-gray-700',
        }"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No rules found.',
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
  </div>
</template>
