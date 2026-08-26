import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/image', 'shadcn-nuxt', '@nuxt/eslint'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/main.css', '~/assets/css/responsive.css'],
  vite: { plugins: [tailwindcss()] },
  shadcn: { prefix: '', componentDir: './app/components/ui' },
  image: { domains: ['images.unsplash.com'] },
  runtimeConfig: {
    cloudflare: { accountId: '', d1DatabaseId: '', apiToken: '' },
    r2: { accountId: '', accessKeyId: '', secretAccessKey: '', bucket: 'proshop-products' },
    session: { cookieName: 'proshop_admin_session', secret: '' },
    public: { siteUrl: 'http://localhost:3000', whatsappNumber: '6281234567890', r2BaseUrl: '' }
  },
  routeRules: { '/admin/**': { ssr: false } },
  nitro: {
    preset: 'vercel',
    routeRules: {
      '/**': { headers: { 'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin', 'permissions-policy': 'camera=(), microphone=(), geolocation=()' } }
    }
  },
  app: { head: { htmlAttrs: { lang: 'id' }, meta: [{ name: 'theme-color', content: '#ffffff' }] } },
  typescript: { strict: true, typeCheck: false }
})
