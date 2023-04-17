export default defineNuxtRouteMiddleware(async (_to, _from) => {
  // const directus = useDirectus();
  //
  // const res = await directus("/permissions", {
  //   query: {
  //     hello: "world"
  //   }
  // });
  // console.log("perm", res.data);
  console.log("should check for page permissions");
});
