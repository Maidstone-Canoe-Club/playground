<template>
  <div>index</div>
</template>

<script setup>
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
