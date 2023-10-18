<script setup>
const links = [
  {
    label: "Dashboard",
    icon: "i-heroicons-home-solid",
    to: "/",
  },
  {
    label: "Registries",
    icon: "i-heroicons-square-3-stack-3d-solid",
    to: "/registries",
  },
  {
    label: "Repositories",
    icon: "i-heroicons-cube-solid",
    to: "/repositories",
  },
  // {
  //   label: "Jobs",
  //   icon: "i-heroicons-clock",
  //   to: "/jobs",
  // },
];
</script>

<template>
  <UVerticalNavigation
    :links="links"
    :ui="{
      size: 'text-md md:text-sm',
      icon: {
        base: 'h-[18px] w-[18px]',
        active: 'text-primary dark:text-primary',
      },
    }"
  />
</template>
