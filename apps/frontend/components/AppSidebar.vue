<script setup>
const isOpen = ref(false);
</script>

<template>
  <USlideover v-model="isOpen" side="left" class="w-60 flex-none">
    <AppSidebarCombined />
  </USlideover>
  <div
    class="sticky top-0 flex md:hidden w-screen border-b border-gray-200 dark:border-gray-800 bg-inherit"
  >
    <UButton
      square
      icon="i-heroicons-cube"
      size="lg"
      variant="ghost"
      color="grey"
      class="p-4 absolute"
      :ui="{ icon: { size: { lg: 'h-8 w-8' } } }"
      @click="isOpen = true"
    />
    <div class="flex items-center mx-auto py-4">
      <span class="w-8 rounded">
        <svg
          viewBox="-50 0 500 500"
          version="1.1"
          id="svg86"
          class="fill-gray-900 dark:fill-gray-100"
          sodipodi:docname="unload-logo.svg"
          inkscape:export-filename="unload-logo-white.png"
          inkscape:export-xdpi="96"
          inkscape:export-ydpi="96"
          inkscape:version="1.2.1 (9c6d41e, 2022-07-14)"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:svg="http://www.w3.org/2000/svg"
        >
          <defs id="defs90" />
          <rect
            x="249.999"
            width="127.973"
            height="127.973"
            style="fill-opacity: 1"
            y="58.04"
            id="rect82"
            inkscape:label="Rect"
          />
          <path
            d="M 377.974 313.987 C 377.974 384.665 320.678 441.96 250 441.96 C 179.322 441.96 122.026 384.665 122.026 313.987 C 122.026 313.987 122.026 313.986 122.026 313.986 L 122.026 186.013 L 249.999 186.013 L 249.999 313.986 L 377.972 313.986 L 377.972 313.264 C 377.973 313.505 377.974 313.746 377.974 313.987 Z"
            style="fill-opacity: 1"
            id="path84"
            inkscape:label="Bottom"
          />
        </svg>
      </span>
      <p class="text-2xl font-semibold tracking-wider">nload</p>
    </div>
  </div>
  <div
    class="sticky top-0 hidden md:inline h-screen border-r border-gray-200 dark:border-gray-800"
  >
    <AppSidebarCombined />
  </div>
</template>
