<script setup lang="ts">
import { useAuth } from '#imports'
import { useI18n } from 'vue-i18n'

const { signOut } = useAuth();
const { t } = useI18n();

const handleLogout = async () => {
  try {
    await signOut({ callbackUrl: '/auth', external: false });
    console.log('User signed out. Redirecting to /auth...');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>

<template>
  <UButton @click="handleLogout">{{ t('logoutButton.logOut') }}</UButton>
</template>