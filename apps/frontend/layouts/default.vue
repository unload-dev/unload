<template>
  <div
    class="flex flex-col md:flex-row min-w-screen min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <AppSidebar />

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
