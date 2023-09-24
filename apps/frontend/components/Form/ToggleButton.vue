<script setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  name: String,
});

const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <div class="form-control w-full">
    <label class="cursor-pointer label w-52">
      <input type="checkbox" class="toggle toggle-primary" v-model="value" />
      <span class="label-text">Skip TLS verification</span>
    </label>
  </div>
</template>
