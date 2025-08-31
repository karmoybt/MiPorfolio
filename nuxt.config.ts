export default defineNuxtConfig({
  compatibilityDate: '2025-08-23',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth',
    '@nuxt/icon',
  ],
  icon: {
    serverBundle: 'remote',
  },
  i18n: {
    locales: [
      { code: 'es', file: 'es.json', name: 'Español' },
      { code: 'en', file: 'en.json', name: 'English' }
    ],
    langDir: 'locales/',
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,   
    provider: {
      type: 'local',                 
      endpoints: {
        signIn:   { path: '/api/auth/login',    method: 'post' },
        signOut:  { path: '/api/auth/logout',   method: 'post' },
        getSession: { path: '/api/auth/session', method: 'get' },
        signUp: { path: '/api/auth/register', method: 'post' }
      },
      pages: {
        login: '/auth'
      },
      token: {
        signInResponseTokenPointer: '/token'
      },
    },
    sessionDataType: {} as import('./app/types/session').SessionData,
    globalAppMiddleware: false,      
  },

  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    public: {
      error: {
        layout: 'error'
      }
    }
  },

});
