<template>
  <div>index</div>
</template>

<script setup>
const { getSingletonItem } = useDirectusItems()

const { data } = await useAsyncData('global', () => {
  return getSingletonItem({
    collection: 'global'
  })
})

const item = await getSingletonItem({
  collection: 'global'
})

</script>
