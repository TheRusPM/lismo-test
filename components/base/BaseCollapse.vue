<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  isBottomLine: {
    type: Boolean,
    default: true,
  },
});

const isRotated = ref(false);

function isActive() {
  isRotated.value = !isRotated.value;
}
</script>
<template>
  <div :class="['colapse', { 'colapse--bottom-line': isBottomLine }]">
    <div :class="['colapse__header', { 'colapse__header--active': isRotated }]">
      <h3 class="colapse__header-title" @click="isActive">{{ title }}</h3>
      <nuxt-icon
        name="chevron"
        class="icon icon-chevron"
        :class="{ rotated: isRotated }"
        @click="isActive"
      ></nuxt-icon>
    </div>
    <div class="colapse__body" v-if="isRotated">
      <slot />
    </div>
  </div>
</template>
<style scoped lang="less">
.colapse {
  &--bottom-line {
    padding-bottom: 24px;
    border-bottom: 1px solid @gray10;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--active {
      padding-bottom: 24px;
    }
  }

  &__header-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    cursor: pointer;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.icon-chevron:deep(svg),
.icon-chevron:deep(path) {
  color: @gray100;
  fill: none !important;
  cursor: pointer;
}

.icon-chevron {
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &.rotated {
    transform: rotate(180deg);
  }
}
</style>
