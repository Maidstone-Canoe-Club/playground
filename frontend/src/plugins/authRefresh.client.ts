export default defineNuxtPlugin(async () => {
  // const { expires, refreshTokens } = useDirectusToken();
  //
  // if (isNaN(expires.value)) {
  //   return;
  // }
  //
  // const expiresInMs = (expires.value - Date.now());
  // const expiresBufferMs = 25_000; // 25 seconds
  //
  // if (expiresInMs > expiresBufferMs) {
  //   // TODO: save timeout into nuxt state?
  //   window.setTimeout(async () => {
  //     await refreshTokens();
  //   }, expiresInMs - expiresBufferMs);
  // } else {
  //   await refreshTokens();
  // }
});
