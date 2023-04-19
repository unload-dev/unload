<template>
  <div class="flex w-screen h-screen bg-base-300 gap-6 p-6">
    <AppSidebar class="h-full" />

    <div class="w-full flex flex-col gap-6">
      <AppHeader />
      <div class="flex-grow">
        <slot />
      </div>
    </div>
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
