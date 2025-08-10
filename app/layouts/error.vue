<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
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
          {{ t('errorPage.goHome') }}
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
          {{ t('errorPage.retry') }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { NuxtError } from 'nuxt/app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()

const is404 = computed(() => props.error?.statusCode === 404)

const errorIcon = computed(() => {
  switch (props.error?.statusCode) {
    case 404:
      return 'i-heroicons-exclamation-triangle-20-solid'
    case 403:
      return 'i-heroicons-shield-exclamation-20-solid'
    case 500:
      return 'i-heroicons-server-stack-20-solid'
    default:
      return 'i-heroicons-x-circle-20-solid'
  }
})

const errorTitle = computed(() => {
  switch (props.error?.statusCode) {
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
  switch (props.error?.statusCode) {
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

const handleError = () => {
  clearError({ redirect: '/' })
}

const refreshPage = () => {
  try {
    clearNuxtData()
    refreshNuxtData()
    reloadNuxtApp()
  } catch {
    window.location.reload()
  }
}
</script>