// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@pinia/nuxt", "@nuxt/ui", "@vueuse/nuxt"],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  ui: {
    icons: ["heroicons", "simple-icons"],
  },
  auth: {
    enableGlobalAppMiddleware: false,
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in", // default
    },
    // layoutTransition: {
    //   name: "fade",
    //   mode: "out-in", // default
    // },
  },
});
