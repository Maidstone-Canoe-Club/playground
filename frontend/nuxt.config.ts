// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",

  modules: [
    "nuxt-directus",
    "@nuxtjs/google-fonts"
  ],

  googleFonts: {
    families: {
      Lato: [400, 700]
    }
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000
      }
    }
  },

  css: [
    "~/assets/normalize.css",
    "~/assets/main.scss",
    "~/assets/button.scss",
    "~/assets/input.scss"
  ]
});
