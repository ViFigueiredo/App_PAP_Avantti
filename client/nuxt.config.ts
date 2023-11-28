// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY

    }
  },
  alias: {
    css: '/<rootDir>/assets/css'
  },
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
