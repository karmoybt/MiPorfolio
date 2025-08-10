<!-- pages/dashboard/index.vue -->
<script setup lang="ts">
definePageMeta({
  auth: {
    navigateUnauthenticatedTo: '/auth',
  },
});
const { data } = useAuth();

</script>

<template>
  <div>
    <h1>Hello {{ data?.name ?? 'User' }}!</h1>
    <LogoutButton />
  </div>
</template>