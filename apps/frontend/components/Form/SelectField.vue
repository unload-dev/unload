<script setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  name: String,
  title: String,
  key: {
    default: "id",
    type: String,
  },
  value: {
    default: "id",
    type: String,
  },
  data: {
    type: Array,
  },
  display: {
    default: "name",
    type: String,
  },
});

const { value: fieldValue, errorMessage } = useField(() => props.name);
</script>

<template>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text">{{ title }}</span>
    </label>
    <select class="select select-primary" v-model="fieldValue">
      <option v-for="item in data" :key="item[key]" :value="item[value]">
        {{ item[display] }}
      </option>
    </select>
    <label class="label">
      <span class="label-text-alt text-error">{{ errorMessage }}</span>
    </label>
  </div>
</template>
