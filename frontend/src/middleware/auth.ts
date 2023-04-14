
export default defineNuxtRouteMiddleware((_to, _from) => {
  const user = useDirectusUser();

  if (!user.value) {
    return navigateTo("/login");
  }
});
