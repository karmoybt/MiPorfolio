<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useI18n } from 'vue-i18n'

type Mode = 'login' | 'register' | 'forgot'

interface Props { mode?: Mode }
const props = withDefaults(defineProps<Props>(), { mode: 'login' })

export type LoginData    = { email: string; password: string; remember?: boolean }
export type RegisterData = { name: string; email: string; password: string }
export type ForgotData   = { email: string }
export type SubmitPayload = LoginData | RegisterData | ForgotData

const emit = defineEmits<{
  submit: [payload: FormSubmitEvent<SubmitPayload>]
}>()

const state = reactive({ email: '', password: '', name: '', remember: false })

const schemas = {
  login:    z.object({ email: z.string().email(), password: z.string().min(8), remember: z.boolean().optional() }),
  register: z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8) }),
  forgot:   z.object({ email: z.string().email() })
}
const schema = computed(() => schemas[props.mode])

const { t } = useI18n()

const fields = computed(() => {
  switch (props.mode) {
    case 'register':
      return [
        { name: 'name' as const, label: t('authForm.fullName'), placeholder: t('authForm.fullName'), type: 'text' as const },
        { name: 'email' as const, label: t('authForm.email'), placeholder: t('authForm.email'), type: 'email' as const },
        { name: 'password' as const, label: t('authForm.password'), placeholder: t('authForm.password'), type: 'password' as const }
      ]
    case 'forgot':
      return [
        { name: 'email' as const, label: t('authForm.email'), placeholder: t('authForm.email'), type: 'email' as const }
      ]
    default:
      return [
        { name: 'email' as const, label: t('authForm.email'), placeholder: t('authForm.email'), type: 'email' as const },
        { name: 'password' as const, label: t('authForm.password'), placeholder: t('authForm.password'), type: 'password' as const }
      ]
  }
})

const router = useRouter()
function setMode(m: Mode) { router.replace({ query: { mode: m } }) }

async function onSubmit(event: FormSubmitEvent<SubmitPayload>) {
  emit('submit', event)
}
</script>

<template>
  <div class="w-full space-y-6">
    <div class="text-center">
      <UIcon name="i-lucide-user" class="mx-auto size-10 text-primary mb-2" />
      <h1 class="text-xl font-semibold">
        {{ mode === 'login' ? t('authForm.welcomeBack') : mode === 'register' ? t('authForm.createAccount') : t('authForm.resetPassword') }}
      </h1>
      <p class="text-sm text-gray-500 mt-1">
        <span v-if="mode === 'login'">
          {{ t('authForm.noAccount') }}
          <ULink class="text-primary font-medium" @click="setMode('register')">{{ t('authForm.createAccount') }}</ULink>
        </span>
        <span v-else-if="mode === 'register'">
          {{ t('authForm.alreadyAccount') }}
          <ULink class="text-primary font-medium" @click="setMode('login')">{{ t('authForm.logIn') }}</ULink>
        </span>
        <span v-else>
          {{ t('authForm.rememberPassword') }}
          <ULink class="text-primary font-medium" @click="setMode('login')">{{ t('authForm.backToLogin') }}</ULink>
        </span>
      </p>
    </div>

    <UForm :schema :state class="space-y-4" @submit="onSubmit">
      <UFormField
        v-for="f in fields"
        :key="f.name"
        :name="f.name"
        :label="f.label"
        required
      >
        <UInput v-model="state[f.name]" :type="f.type" :placeholder="f.placeholder" />
      </UFormField>

      <UCheckbox
        v-if="mode === 'login'"
        v-model="state.remember"
        :label="t('authForm.rememberMe')"
      />

      <UButton type="submit" block>
        {{ mode === 'login' ? t('authForm.logIn') : mode === 'register' ? t('authForm.createAccountButton') : t('authForm.sendResetLink') }}
      </UButton>
    </UForm>
  </div>
</template>