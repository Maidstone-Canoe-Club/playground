<template>
  <div>index</div>
</template>

<script setup>
const url = useDirectusUrl();
console.log("DIRECTUS_URL", url);
const { getSingletonItem } = useDirectusItems();

try {
  const { data } = await useAsyncData("global", () => {
    return getSingletonItem({
      collection: "global"
    });
  });
} catch (err) {
  console.error("error", err);
}
</script>
