<script setup lang="ts">
const { data, signOut } = useAuth();
const getImage = computed(() => data?.value?.user.image ?? undefined);
const getName = computed(() => data?.value?.user.name ?? "");
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="rounded-b-box flex flex-row items-center px-1">
      <UAvatar
        size="xs"
        :src="getImage"
        :alt="getName"
        class="ring-1 ring-gray-700 dark:ring-gray-200"
      />

      <div class="ml-3 flex-grow min-w-0">
        <div class="text-sm font-bold truncate">{{ getName }}</div>
        <div class="text-xs opacity-50">Project Alpha</div>
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <UButton
        @click="signOut()"
        icon="i-heroicons-arrow-right-on-rectangle"
        size="2xs"
        color="gray"
        square
        variant="link"
      >
        Log out
      </UButton>
      <ColorModeButton />
    </div>
  </div>
</template>
