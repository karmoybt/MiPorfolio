<!-- app\pages\auth\index.vue -->
<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { SubmitPayload } from '~/components/AuthForm.vue'

type FetchError = {
  data?: {
    message?: string
  }
}

const mode = ref<'login' | 'register'>('login')
const { signIn } = useAuth()
const toast = useToast()

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
        title: 'Registration successful', 
        description: 'Please log in', 
        color: 'success' 
      })
      mode.value = 'login'
    }
  } catch (err) {
    const error = err as FetchError
    toast.add({
      title: mode.value === 'login' ? 'Login failed' : 'Registration failed',
      description: error.data?.message || 'Unknown error',
      color: 'error'
    })
  }
}
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">
    <div class="w-full max-w-md space-y-4">
      <AuthForm :mode="mode" @submit="_onSubmit" />
      
      <UButton
        variant="ghost"
        color="primary"
        block
        @click="mode = mode === 'login' ? 'register' : 'login'"
      >
        {{ mode === 'login' ? "Don't have an account? Register" : "Already have an account? Login" }}
      </UButton>
    </div>
  </div>
</template>