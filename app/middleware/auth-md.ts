// ~/middleware/auth.ts
export default defineNuxtRouteMiddleware(() => {
  const { status } = useAuth();

  console.log('Authentication status:', status.value);

  if (status.value !== 'authenticated') {
    return navigateTo('/auth', { redirectCode: 302 });
  }
});