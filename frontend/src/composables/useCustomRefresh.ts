import { DirectusAuthResponse } from "nuxt-directus/dist/runtime/types";

export const useCustomRefresh = () => {
  const { refreshToken, expires, token } = useDirectusToken();

  const baseUrl = useDirectusUrl();

  const refreshTokens = async (): Promise<DirectusAuthResponse | null> => {
    if (refreshToken() && refreshToken().value) {
      const body = {
        refresh_token: refreshToken().value
      };
      const data = await $fetch<{data: DirectusAuthResponse}>("/auth/refresh", {
        baseURL: baseUrl,
        body,
        method: "POST"
      });
      expires().value = new Date().getTime() + data.data.expires;
      token().value = data.data.access_token;
      refreshToken().value = data.data.refresh_token;
      return data.data;
    } else {
      return null;
    }
  };

  return {
    refreshTokens
  };
};
