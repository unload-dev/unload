<script setup lang="ts">
import type { AppProvider, BuiltInProviderType } from "next-auth/providers";

type CustomAppProvider = Omit<AppProvider, "options">;
interface Props {
  provider: CustomAppProvider;
}
defineProps<Props>();
const icons: Record<BuiltInProviderType, string> = {
  github: "i-simple-icons-github",
  google: "i-simple-icons-google",
};
</script>

<template>
  <div>
    <button
      class="my-2 inline-flex w-full items-center rounded-md border border-gray-300 bg-white py-2.5 px-4 text-gray-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-expanded="false"
    >
      <!-- https://simpleicons.org/?q=google -->
      <UIcon
        class="text-gray-800"
        :name="icons[provider.id]"
        alt="identity provider icon"
      />
      <span class="items-center truncate pl-4 text-gray-800"
        ><div class="truncate">
          <span>Log in with {{ provider.name }}</span>
        </div></span
      >
    </button>
  </div>
</template>
