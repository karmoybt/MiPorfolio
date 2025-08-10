<script setup lang="ts">
const $config = useRuntimeConfig()
const route = useRoute()

// 1. Build canonical URL once, reactively
const canonical = computed(() => {
  const site = String($config.public.siteUrl ?? 'https://example.com')
  return site + route.path
})

// 2. Pass plain strings / refs—no inline functions
useHead({
  titleTemplate: (title?: string): string | null =>
    title
      ? `${title} · ${$config.public.appName}`:null,
  htmlAttrs: { lang: 'es' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'canonical', href: canonical }
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'color-scheme', content: 'light dark' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
  ]
})
</script>
<template>
  <div>
    <NuxtLayout  default>
      <Suspense>
        <template #default>
          <NuxtPage />
        </template>
        <template #fallback>
          <AppSkeleton />
        </template>
      </Suspense>
    </NuxtLayout>

    <ClientOnly>
      <CookieBanner />
    </ClientOnly>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;
}

:root {
  --header-height: 4rem;
  --safe-area-inset-top: env(safe-area-inset-top);
  --safe-area-inset-bottom: env(safe-area-inset-bottom);
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}
</style>