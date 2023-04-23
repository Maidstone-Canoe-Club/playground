import { useCustomRefresh } from "~/composables/useCustomRefresh";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const user = useDirectusUser();
  const { fetchUser } = useDirectusAuth();

  const firstRefresh = useState("first-refresh", () => false);

  if (firstRefresh.value) {
    firstRefresh.value = false;
  } else if (!user.value) {
    return;
  }
  const accessTokenExpiry = useState<number | undefined>("access-token-expiry", () => 0);

  const {
    refreshTokens
  } = useCustomRefresh();

  if (!accessTokenExpiry.value ||
    accessTokenExpiry.value === 0 ||
    Date.now() >= accessTokenExpiry.value - 10000) {
    try {
      const refreshCookie = useCookie("directus_refresh_token");
      if (!refreshCookie) {
        console.log("trying to refresh token without refresh token cookie!");
      } else {
        console.log("calling refresh WITH cookie");
      }
      const res = await refreshTokens();
      if (res) {
        accessTokenExpiry.value = Date.now() + res.expires;
      }
    } catch (err) {
      console.log("Error refreshing tokens!", err);
    }
  }
});
