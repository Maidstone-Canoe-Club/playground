import { useAppStore } from "~/stores/app";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  if (process.server) {
    return;
  }

  const user = useDirectusUser();
  if (!user.value) {
    return;
  }

  const {
    token,
    refreshTokens
  } = useDirectusToken();

  const appStore = useAppStore();

  if (!appStore.accessTokenExpiry || Date.now() >= appStore.accessTokenExpiry - 10000) {
    const res = await refreshTokens();
    if (res) {
      appStore.accessTokenExpiry = Date.now() + res.expires;
    }
  }
});
