﻿import { useAppStore } from "~/stores/app";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const appStore = useAppStore();
  const user = useDirectusUser();
  const { fetchUser } = useDirectusAuth();

  if (appStore.firstRefresh) {
    appStore.firstRefresh = false;
  } else if (!user.value) {
    return;
  }

  const {
    refreshTokens
  } = useDirectusToken();

  if (!appStore.accessTokenExpiry ||
    appStore.accessTokenExpiry === 0 ||
    Date.now() >= appStore.accessTokenExpiry - 10000) {
    try {
      const res = await refreshTokens();
      if (res) {
        appStore.accessTokenExpiry = Date.now() + res.expires;
      }
    } catch (err) {
      console.log("Error refreshing tokens!", err);
    }
  }
});
