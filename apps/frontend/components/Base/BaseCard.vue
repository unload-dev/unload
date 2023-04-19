<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});
</script>

<template>
  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="card-actions justify-end">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
