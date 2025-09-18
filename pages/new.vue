<script setup>
definePageMeta({
  title: "Новые курсы",
  layout: "default",
});
</script>
<template>
  <div class="new-courses-page">
    <h1 class="new-courses-page__title">Новые курсы</h1>
    <div class="new-courses-page__content"></div>
  </div>
</template>
<style scoped lang="less">
.new-courses-page {
  &__title {
    font-family: "Nekst", sans-serif;
    font-size: 32px;
    margin: 36px 0 24px;
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 120px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    padding: 32px;
    border-radius: 24px;
    background-color: @white;
  }
}
</style>
