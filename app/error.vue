<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { error } = toRefs(props)

// Configuración
const config = useRuntimeConfig()

// Estado
const showDetails = ref(false)

// Computed
const is404 = computed(() => error.value.statusCode === 404)
const errorIcon = computed(() => getErrorIcon(error.value.statusCode))
const errorTitle = computed(() => getErrorTitle(error.value.statusCode))
const errorDescription = computed(() => getErrorDescription(error.value.statusCode))

// Funciones
function getErrorIcon(code: number) {
  const icons: Record<number, string> = {
    404: 'i-heroicons-exclamation-triangle-20-solid',
    403: 'i-heroicons-shield-exclamation-20-solid',
    500: 'i-heroicons-server-stack-20-solid'
  }
  return icons[code] || 'i-heroicons-x-circle-20-solid'
}

function getErrorTitle(code: number) {
  const titles: Record<number, string> =  {
    404: 'Página no encontrada',
    403: 'Acceso prohibido',
    500: 'Error del servidor'
  }
  return titles[code] || `Error ${code}`
}

function getErrorDescription(code: number) {
  const descriptions: Record<number, string> =  {
    404: 'La página que buscas no existe o ha sido movida.',
    403: 'No tienes permisos para acceder a esta sección.',
    500: 'Algo salió mal en nuestros servidores. Estamos trabajando para solucionarlo.'
  }
  return descriptions[code] || 'Ha ocurrido un error inesperado.'
}

function handleError() {
  clearError({ redirect: '/' })
}

function refreshPage() {
  try {
    clearNuxtData()
    refreshNuxtData()
    reloadNuxtApp()
  } catch {
    window.location.reload()
  }
}

// SEO
useHead({
  title: `${errorTitle.value} - ${config.public.appName}`,
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: errorDescription.value }
  ]
})


</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
    <NuxtLayout name="error">
      <div class="max-w-2xl w-full text-center">
        <!-- Icono -->
        <div class="mb-8 flex justify-center">
          <UIcon 
            :name="errorIcon" 
            class="w-24 h-24 text-primary-500 dark:text-primary-400"
          />
        </div>

        <!-- Código de error -->
        <p class="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          {{ error.statusCode }}
        </p>

        <!-- Título -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ errorTitle }}
        </h1>

        <!-- Descripción -->
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {{ errorDescription }}
        </p>

        <!-- Acciones -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <UButton
            color="primary"
            size="lg"
            class="w-full sm:w-auto"
            @click="handleError"

          >
            <UIcon name="i-heroicons-home" class="w-5 h-5 mr-2" />
            Volver al inicio
          </UButton>

          <UButton
            v-if="!is404"
            color="secondary"
            variant="outline"
            size="lg"
            class="w-full sm:w-auto"
            @click="refreshPage"
          >
            <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2" />
            Reintentar
          </UButton>
        </div>

        <!-- Detalles técnicos (solo en desarrollo) -->
        <div  class="text-left">
          <UButton
        
            variant="ghost"
            size="sm"
            class="mb-4"
            @click="showDetails = !showDetails"
          >
            {{ showDetails ? 'Ocultar' : 'Mostrar' }} detalles técnicos
          </UButton>

          <UCollapse v-model="showDetails">
            <UCard class="bg-gray-50 dark:bg-gray-800">
              <pre class="text-sm text-gray-700 dark:text-gray-300 overflow-auto">{{ JSON.stringify(error, null, 2) }}</pre>
            </UCard>
          </UCollapse>
        </div>

        <!-- Enlaces útiles -->
        <!-- <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
            ¿Necesitas ayuda?
          </h3>
          <div class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <NuxtLink 
              to="/contacto" 
              class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              @click="handleError"
            >
              Contactar soporte
            </NuxtLink>
            <NuxtLink 
              to="/ayuda" 
              class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              @click="handleError"
            >
              Centro de ayuda
            </NuxtLink>
            <a 
              href="/sitemap.xml" 
              class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Mapa del sitio
            </a>
          </div>
        </div> -->
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
/* Animación suave para el icono */
@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 3s ease-in-out infinite;
}
</style>