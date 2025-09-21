// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "nuxt-icons",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-keen-slider",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/assets/less/main.less";`,
        },
      },
    },
  },
  css: ["~/assets/css/main.css", "~/assets/css/reset.css"],
  ssr: false,
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap",
        },
      ],
    },
  },
});
