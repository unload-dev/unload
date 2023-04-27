// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
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
