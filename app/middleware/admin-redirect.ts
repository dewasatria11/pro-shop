export default defineNuxtRouteMiddleware(async () => {
  try { await $fetch('/api/auth/me'); return navigateTo('/admin/dashboard') }
  catch { return navigateTo('/admin/login') }
})
