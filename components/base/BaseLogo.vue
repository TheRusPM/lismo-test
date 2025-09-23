<script setup></script>
<template>
  <div class="logo">
    <nuxt-icon
      name="logo-tusur"
      class="icon icon-logo-tusur"
      alt="Логотип ТУСУР"
    />
    <span class="logo__line"></span>
    <nuxt-icon
      name="logo-moodle"
      class="icon icon-logo-moodle"
      alt="Система управления обучением"
    />
  </div>
</template>
<style scoped lang="less">
.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  max-width: 279px;

  &__line {
    width: 1px;
    height: 36px;
    background-color: @purple80;
  }

  .icon-logo-tusur :deep(svg),
  .icon-logo-tusur :deep(path),
  .icon-logo-moodle :deep(svg),
  .icon-logo-moodle :deep(path) {
    height: 60px;
    color: @purple80;
    stroke: none !important;
  }

  .icon-logo-tusur :deep(svg),
  .icon-logo-tusur :deep(path) {
    width: 122.38px;
  }

  .icon-logo-moodle :deep(svg),
  .icon-logo-moodle :deep(path) {
    width: 124.55px;
  }
}
</style>
