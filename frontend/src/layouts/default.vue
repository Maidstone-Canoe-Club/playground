<template>
  <div class="default-layout">
    <page-header />
    <div class="default-layout__page">
      <slot />
    </div>
    <footer class="footer">
      <div class="container">
        <strong>Footer goes here</strong>
      </div>
    </footer>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: title => title ? `${title} | MCC` : "Maidstone Canoe Club"
});
</script>
<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100vh;
  height: 100vh;
  overflow-y: scroll;

  &__page {
    flex-grow: 1;
  }
}

.footer {
  margin-top: 1rem;
  padding: 2rem 0;
  height: 100px;
  background-color: lightgray;
}
</style>
