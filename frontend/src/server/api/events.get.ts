export default defineEventHandler((event) => {
  const query = getQuery(event);

  const month = query.month;

  return "ok";
});
