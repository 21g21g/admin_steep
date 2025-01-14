// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  

  modules:[
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    'nuxt-icons',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
  ],
 
  googleFonts:{
    families:{
      Roboto:[400,700]
    }

  }


    


  
})