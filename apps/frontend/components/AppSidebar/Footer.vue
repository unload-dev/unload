<script setup lang="ts">
const { data, signOut } = useAuth();
const getImage = computed(() => data?.value?.user.image ?? undefined);
const getName = computed(() => data?.value?.user.name ?? "");
</script>

<template>
  <div class="bg-base-100 rounded-b-box flex flex-row items-center py-4 px-4">
    <div class="avatar">
      <div class="w-10 rounded-full ring-2 ring-base-content">
        <img :src="getImage" />
      </div>
    </div>
    <div class="ml-3 flex-grow min-w-0">
      <div class="font-bold truncate">{{ getName }}</div>
      <div class="text-sm opacity-50">Project Alpha</div>
    </div>
    <button @click="signOut()" class="btn btn-ghost btn-sm btn-square">
      <vue-feather type="log-out" />
    </button>
  </div>
</template>
