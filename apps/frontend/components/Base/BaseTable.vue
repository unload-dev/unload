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
        <th class="w-0"><!-- Actions--></th>
      </tr>
    </thead>

    <!-- The table is loading as long as vlaue is undefined -->
    <tbody v-if="values?.length">
      <BaseTableRow v-for="value in values" :key="value.name" :value="value" />
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="100%" class="text-center">No items found.</td>
      </tr>
    </tbody>
  </table>
</template>
