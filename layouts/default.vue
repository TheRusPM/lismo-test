<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Navbar from "~/components/Navbar.vue";
</script>

<template>
  <div class="layout">
    <Header />
    <Navbar />
    <main class="layout__content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="less">
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: @gray5;
}

.layout__content {
  flex-grow: 1;
  display: flex;
  width: 100%;
  max-width: 1530px;
}

// .layout__content {
//   display: flex;
// }
</style>
