<script setup>
// https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs/#creating-a-custom-input-component
// https://vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  name: String,
  title: String,
});

const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text">{{ $attrs["placeholder"] }}</span>
    </label>
    <input
      v-bind="$attrs"
      class="input input-primary"
      v-model="value"
      :class="{ 'input-error': errorMessage }"
    />
    <label class="label">
      <span class="label-text-alt text-error">{{ errorMessage }}</span>
    </label>
  </div>
</template>
