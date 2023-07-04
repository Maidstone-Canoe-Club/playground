export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    const user = useDirectusUser();
    const { fetchUser } = useDirectusAuth();
    if (!user.value) {
      await fetchUser();
    }

    if (!user.value) {
      return navigateTo("/login?redirect=" + to.fullPath);
    }
  } catch (err) {
    console.log("error fetching user when trying to auth user!", err);
  }
});
