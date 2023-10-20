<template>
  <div>
    <div
      class="flex w-full flex-col items-center justify-center rounded-xl md:mx-auto md:max-w-sm"
    >
      <div class="flex w-full flex-col items-center px-10 pt-4 pb-6">
        <h1 class="mt-4 font-display text-2xl font-semibold leading-snug">
          Log in
        </h1>
        <h2 class="my-2 text-center text-sm text-gray-500">
          Welcome back to Unload
        </h2>
        <div class="mt-4 w-full text-sm">
          <AuthProviderButton
            v-for="provider of providers"
            :provider="provider!"
            @click="signIn(provider!.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "empty",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { signIn, getProviders } = useAuth();

const providers = await getProviders();
</script>
