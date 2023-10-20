<template>
  <div
    class="flex min-w-screen min-h-screen flex-col justify-center py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <UContainer
      :ui="{
        base: 'w-full',
        padding: 'sm:py-6 lg:px-8',
      }"
    >
      <slot />
    </UContainer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 50ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
