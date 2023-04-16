import { useAppStore } from "~/stores/app";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const appStore = useAppStore();
  const user = useDirectusUser();
  const { fetchUser } = useDirectusAuth();

  if (appStore.firstRefresh) {
    appStore.firstRefresh = false;
  } else if (!user.value) {
    user.value = (await fetchUser()).value;
    return;
  }

  const {
    refreshToken,
    refreshTokens
  } = useDirectusToken();

  const nuxtApp = useNuxtApp();

  if (!appStore.accessTokenExpiry ||
    appStore.accessTokenExpiry === 0 ||
    Date.now() >= appStore.accessTokenExpiry - 10000) {
    const res = await refreshTokens();
    if (res) {
      appStore.accessTokenExpiry = Date.now() + res.expires;
    }
  }
});
