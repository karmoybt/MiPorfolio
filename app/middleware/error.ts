export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/auth/t') {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }
})