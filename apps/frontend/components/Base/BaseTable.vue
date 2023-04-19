<script setup>
defineProps({
  values: {
    type: Array,
    require: true,
  },
  key: {
    type: String,
    require: true,
  },
});
</script>

<template>
  <table class="table w-full table-auto">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Repositories</th>
        <th class="w-0"><!-- Otions--></th>
      </tr>
    </thead>
    <tbody>
      <BaseTableRow v-for="value in values" :key="value.name" :value="value" />
    </tbody>
  </table>
</template>
