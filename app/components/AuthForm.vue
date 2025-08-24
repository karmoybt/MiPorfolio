<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
// import { useToast } from '~/composables/useToast';
// import { useAuth } from '~/composables/useAuth';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

const state = ref({ email: '', password: '', name: '', remember: false });
const activeTab = ref<'signIn' | 'signUp'>('signIn');
const { t } = useI18n();
const toast = useToast();
const { signIn, signUp } = useAuth();
const isLoading = ref(false);
const errorMessages = ref({ email: '', password: '', name: '' });

const _onSubmit = async () => {
  isLoading.value = true;
  try {
    const payload = {
      email: state.value.email,
      password: state.value.password,
      name: state.value.name,
      remember: state.value.remember,
    };

    const validationResult = schema.safeParse(payload);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      errorMessages.value = {
        email: errors.email?.[0] || '',
        password: errors.password?.[0] || '',
        name: errors.name?.[0] || '',
      };
      toast.add({
        title: t('authIndex.validationFailed'),
        description: t('authIndex.pleaseCheckFields'),
        color: 'error',
        duration: 3000,
      });
      return;
    }

    if (activeTab.value === 'signIn') {
      await signIn({ email: payload.email, password: payload.password });
    } else {
      await signUp(payload);
      toast.add({
        title: t('authIndex.registrationSuccessful'),
        description: t('authIndex.pleaseLogIn'),
        color: 'success',
        duration: 3000,
      });
      activeTab.value = 'signIn';
    }
  } catch (err) {
    const error = err as { data?: { message?: string } };
    toast.add({
      title: activeTab.value === 'signIn' ? t('authIndex.loginFailed') : t('authIndex.registrationFailed'),
      description: error.data?.message || t('authIndex.unknownError'),
      color: 'error',
      duration: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};

const switchTab = (tab: 'signIn' | 'signUp') => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="auth-container">
    <UContainer>
      <UCard class="auth-card">
        <div class="auth-tabs">
          <UButton
            :class="{ active: activeTab === 'signIn' }"
            :aria-pressed="activeTab === 'signIn'"
            @click="switchTab('signIn')"
          >
            {{ t('authForm.signIn') }}
          </UButton>
          <UButton
            :class="{ active: activeTab === 'signUp' }"
            :aria-pressed="activeTab === 'signUp'"
            @click="switchTab('signUp')"            
          >
            {{ t('authForm.signUp') }}
          </UButton>
        </div>
        <div v-if="activeTab === 'signIn'" class="auth-form">
          <label for="email">Email</label>
          <UInput
            id="email"
            v-model="state.email"
            type="email"
            placeholder="Email"
            :aria-required="true"
            :aria-invalid="!!errorMessages.email"
          />
          <div v-if="errorMessages.email" class="error-message">{{ errorMessages.email }}</div>
          
          <label for="password">Password</label>
          <UInput
            id="password"
            v-model="state.password"
            type="password"
            placeholder="Password"
            :aria-required="true"
            :aria-invalid="!!errorMessages.password"
          />
          <div v-if="errorMessages.password" class="error-message">{{ errorMessages.password }}</div>
          
          <UCheckbox v-model="state.remember">
            {{ t('authForm.keepMeSignedIn') }}
          </UCheckbox>
          
          <UButton color="primary"  :loading="isLoading" @click="_onSubmit">
            {{ t('authForm.signInButton') }}
          </UButton>
        </div>
        <div v-if="activeTab === 'signUp'" class="auth-form">
          <label for="name">Full Name</label>
          <UInput
            id="name"
            v-model="state.name"
            type="text"
            placeholder="Full Name"
            :aria-required="true"
            :aria-invalid="!!errorMessages.name"
          />
          <div v-if="errorMessages.name" class="error-message">{{ errorMessages.name }}</div>
          
          <label for="email">Email</label>
          <UInput
            id="email"
            v-model="state.email"
            type="email"
            placeholder="Email"
            :aria-required="true"
            :aria-invalid="!!errorMessages.email"
          />
          <div v-if="errorMessages.email" class="error-message">{{ errorMessages.email }}</div>
          
          <label for="password">Password</label>
          <UInput
            id="password"
            v-model="state.password"
            type="password"
            placeholder="Password"
            :aria-required="true"
            :aria-invalid="!!errorMessages.password"
          />
          <div v-if="errorMessages.password" class="error-message">{{ errorMessages.password }}</div>
          
          <UButton color="primary" :loading="isLoading"  @click="_onSubmit">
            {{ t('authForm.signUpButton') }}
          </UButton>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.auth-card {
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.auth-tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.auth-tabs .active {
  background-color: #3498db;
  color: white;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 4px;
}
</style>