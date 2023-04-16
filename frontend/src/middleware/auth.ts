
export default defineNuxtRouteMiddleware(async (to, _from) => {
  const user = useDirectusUser();
  if (!user.value) {
    return navigateTo("/login?redirect=" + to.fullPath);
  }
});
