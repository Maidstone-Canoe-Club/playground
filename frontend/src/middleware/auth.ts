
export default defineNuxtRouteMiddleware((to, _) => {
  const user = useDirectusUser()

  if (!user.value) {
    return navigateTo('/login')
  }
})
