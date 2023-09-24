// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
  ],
  auth: {
    enableGlobalAppMiddleware: true,
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
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
    head: {
      script:
        process.env.NODE_ENV === "production"
          ? [
              {
                src: `/monitoring-${process.env.NODE_ENV}.js`,
                defer: true,
                type: "text/javascript",
              },
            ]
          : [],
    },
  },
});
