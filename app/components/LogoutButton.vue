<!-- LogoutButton.vue -->
<script setup lang="ts">
import { useAuth } from '#imports'

const { signOut } = useAuth();

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
  <UButton @click="handleLogout">Log out</UButton>
</template>