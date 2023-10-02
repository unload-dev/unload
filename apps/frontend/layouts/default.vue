<template>
  <div
    class="flex min-w-screen min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
body {
  background-color: aliceblue;
  color: rgba(0, 0, 0, 1);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
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
