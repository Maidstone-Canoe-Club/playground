
export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    const user = useDirectusUser();
    if (!user.value) {
      return navigateTo("/login?redirect=" + to.fullPath);
    }
  } catch (err) {
    console.log("error fetching user when trying to auth user!", err);
  }
});
