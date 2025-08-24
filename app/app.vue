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
<!-- <template> -->
  <!-- <div>
    <NuxtLayout  default>
      <Suspense>
        <template #default>
          <NuxtPage />
        </template>
      </Suspense>
    </NuxtLayout>

    <ClientOnly>
      <CookieBanner />
    </ClientOnly>
  </div> -->
  <template>
    <UApp>
      <NuxtLayout  default>
        <NuxtPage />
      </NuxtLayout>
   </UApp>
</template>

<style>

</style>