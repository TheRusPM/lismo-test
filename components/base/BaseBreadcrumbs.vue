<script setup lang="ts">
import { useRoute } from "#imports";
import { ROUTES } from "~/enums/router";

const route = useRoute();

const breadcrumbsMap: Record<string, string> = {
  [ROUTES.home]: "Главная",
  [ROUTES.courses]: "Каталог курсов",
  [ROUTES.new_courses]: "Новые курсы",
};

const breadcrumbs = computed(() => {
  const path = route.path;

  if (path === ROUTES.home || path === ROUTES.courses) {
    return [
      { label: breadcrumbsMap[ROUTES.home], to: ROUTES.home },
      { label: breadcrumbsMap[ROUTES.courses], to: ROUTES.home },
    ];
  }

  if (path === ROUTES.new_courses) {
    return [
      { label: breadcrumbsMap[ROUTES.home], to: ROUTES.home },
      { label: breadcrumbsMap[ROUTES.courses], to: ROUTES.home },
      { label: breadcrumbsMap[ROUTES.new_courses], to: ROUTES.new_courses },
    ];
  }

  return [];
});
</script>

<template>
  <div class="breadcrumbs">
    <template v-for="(crumb, index) in breadcrumbs" :key="crumb.to">
      <NuxtLink
        :to="crumb.to"
        class="breadcrumbs__link"
        :class="{ active: index === breadcrumbs.length - 1 }"
      >
        {{ crumb.label }}
      </NuxtLink>
      <span
        v-if="index !== breadcrumbs.length - 1"
        class="breadcrumbs__separator"
        >\</span
      >
    </template>
  </div>
</template>

<style scoped lang="less">
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 12px;

  &__link {
    text-decoration: none;
    color: @purple80;
    font-size: 14px;

    &.active {
      color: @purple50;
      pointer-events: none;
      cursor: default;
    }
  }

  &__separator {
    color: @gray10;
    font-size: 14px;
  }
}
</style>
