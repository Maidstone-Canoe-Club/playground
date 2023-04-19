<template>
  <div class="gallery-icon">
    <div class="images">
      <div class="preview">
        <nuxt-img
          src="https://images.unsplash.com/photo-1571989237340-98fb838eeef1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=225&q=80" />
      </div>
      <div class="preview">
        <nuxt-img
          src="https://images.unsplash.com/photo-1546882588-d9bd63f85a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=225&q=80" />
      </div>
      <div class="preview">
        <nuxt-img
          src="https://images.unsplash.com/photo-1566141828450-84ea7ee7d634?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=225&q=80" />
      </div>
      <div class="images-count">
        56
        <!--        <font-awesome-icon :icon="['fas', 'images']" />-->
      </div>
    </div>
    <div class="content">
      <strong>Waterfalls</strong>
      <small>July 2023</small>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.gallery-icon {
  border-radius: 10px;
  width: 250px;
  overflow: hidden;
  transition: transform .2s ease-out,
  box-shadow .2s ease-out;
  box-shadow: 0px 0.2px 0.1px rgba(0, 0, 0, 0.02),
  0px 0.5px 0.3px rgba(0, 0, 0, 0.028),
  0px 0.9px 0.6px rgba(0, 0, 0, 0.035),
  0px 1.6px 1.1px rgba(0, 0, 0, 0.042),
  0px 2.9px 2.1px rgba(0, 0, 0, 0.05),
  0px 7px 5px rgba(0, 0, 0, 0.07);

  &:hover {
    transform: translateY(-3px);
    cursor: pointer;
    box-shadow: 0px 0.3px 0.1px rgba(0, 0, 0, 0.02),
    0px 0.7px 0.3px rgba(0, 0, 0, 0.028),
    0px 1.3px 0.6px rgba(0, 0, 0, 0.035),
    0px 2.2px 1.1px rgba(0, 0, 0, 0.042),
    0px 4.2px 2.1px rgba(0, 0, 0, 0.05),
    0px 10px 5px rgba(0, 0, 0, 0.07);

    .images {
      filter: brightness(115%) saturate(105%);
    }
  }

  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;

    strong {
    }

    small {
      color: gray;
    }
  }

  .images-count {
    position: absolute;
    bottom: .5rem;
    right: .5rem;
    font-weight: bold;
    color: #fff;
  }
}

.images {
  overflow: hidden;
  display: flex;
  height: 200px;
  transition: transform .2s ease-out,
  filter .2s ease-out;
  position: relative;

  .preview {
    flex: 1 1 0;
    width: 0;
    object-position: center;
    overflow: hidden;
  }

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    transform: scale(150%);
  }
}

</style>
