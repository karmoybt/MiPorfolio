<script setup lang="ts">
import type { NuxtError } from '#app';
import { useI18n } from 'vue-i18n'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()

const handleError = () => clearError({ redirect: '/' })

const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return t('errorPage.404Title')
    case 403:
      return t('errorPage.403Title')
    case 500:
      return t('errorPage.500Title')
    default:
      return t('errorPage.unknownTitle')
  }
})

const errorDescription = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return t('errorPage.404Description')
    case 403:
      return t('errorPage.403Description')
    case 500:
      return t('errorPage.500Description')
    default:
      return t('errorPage.unknownDescription')
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
    <div class="max-w-2xl w-full text-center">
      <!-- Icono -->
      <!-- <div class="mb-8 flex justify-center">
        <UIcon 
          :name="errorIcon" 
          class="w-24 h-24 text-primary-500 dark:text-primary-400"
        />
      </div> -->

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
          {{ t('errorPage.goHome') }}
        </UButton>

        <UButton
          v-if="props.error.statusCode !== 404"
          color="secondary"
          variant="outline"
          size="lg"
          class="w-full sm:w-auto"
          @click="() => clearError({})"
        >
          <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2" />
          {{ t('errorPage.retry') }}
        </UButton>
      </div>
    </div>
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