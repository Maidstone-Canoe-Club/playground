export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { refreshTokens, expires } = useDirectusToken();

  if (isNaN(expires.value)) {
    return;
  }

  const expiresIn = expires.value - Date.now();
  const expiresBufferMs = 25_000; // 25 seconds

  if (expiresIn < expiresBufferMs) {
    try {
      await refreshTokens();
    } catch (e) {
      console.log("could not refresh", e.message);
    }
  }
});
