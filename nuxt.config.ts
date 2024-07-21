// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'ascii Scrater',
      meta: [
        { name: 'description', content: 'My amazing site.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' } 
      ],
      link: [
        {href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', rel: 'stylesheet'}
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"' },
        { src: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js' }
      ]

    }
    
  }
})
