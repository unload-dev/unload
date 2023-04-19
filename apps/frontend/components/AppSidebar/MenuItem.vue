<script setup>
import { computed } from "vue";
const route = useRoute();
const props = defineProps({
  title: String,
  icon: String,
  path: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const subPathActive = computed(() => {
  if (props.path === "/") return false;

  return route.path.startsWith(props.path);
});
</script>

<template>
  <li class="text-sm" :class="{ disabled }">
    <NuxtLink
      v-if="!disabled"
      :to="path"
      activeClass="active"
      :class="{ active: subPathActive }"
    >
      <vue-feather :type="icon" /> {{ title }}
    </NuxtLink>
    <span v-else> <vue-feather :type="icon" /> {{ title }} </span>
  </li>
</template>
