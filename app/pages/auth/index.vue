<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { useI18n } from 'vue-i18n'

// Define el tipo SubmitPayload directamente en esta página
interface SubmitPayload {
  email: string;
  password: string;
  name?: string;
  remember?: boolean;
}

type FetchError = {
  data?: {
    message?: string
  }
}

const mode = ref<'login' | 'register'>('login')
const { signIn } = useAuth()
const toast = useToast()
const { t } = useI18n()

const _onSubmit = async (e: FormSubmitEvent<SubmitPayload>) => {
  try {
    if (mode.value === 'login') {
      const { email, password } = e.data as Extract<SubmitPayload, { password: string }>
      await signIn({ email, password }, { callbackUrl: '/dashboard' })
    } else {
      const { name, email, password } = e.data as Extract<SubmitPayload, { name: string; password: string }>
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: { name, email, password }
      })
      toast.add({ 
        title: t('authIndex.registrationSuccessful'), 
        description: t('authIndex.pleaseLogIn'), 
        color: 'success' 
      })
      mode.value = 'login'
    }
  } catch (err) {
    const error = err as FetchError
    toast.add({
      title: mode.value === 'login' ? t('authIndex.loginFailed') : t('authIndex.registrationFailed'),
      description: error.data?.message || t('authIndex.unknownError'),
      color: 'error'
    })
  }
}
</script>

<template>
      <AuthForm :mode="mode" @submit="_onSubmit" />
</template>