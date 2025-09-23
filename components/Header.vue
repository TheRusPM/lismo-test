<script setup lang="ts">
import BaseBurger from "~/components/base/BaseBurger.vue";
import { useMobile } from "~/composables/useMobile";
import { useNavbar } from "~/composables/useNavbar";
import Logo from "./base/BaseLogo.vue";

const { isMobile } = useMobile();
const { isNavbarOpen, close: closeNavbar } = useNavbar();
const isRotated = ref(false);

const toggleChevron = () => {
  isRotated.value = !isRotated.value;
};

watch(isMobile, (val) => {
  if (!val) {
    closeNavbar();
  }
});
</script>
<template>
  <div class="header-wrapper">
    <header class="header">
      <div class="header__block1">
        <div class="header__block1-logo">
          <Logo />
        </div>
        <ul class="header__block1-links">
          <li class="list-item">
            <nuxt-icon
              name="hat"
              class="icon icon-hat"
              alt="Мои курсы"
            ></nuxt-icon>
            <NuxtLink to="/" class="list-item__link">Мои курсы</NuxtLink>
          </li>
          <li class="list-item">
            <NuxtLink to="/" class="list-item__link">Каталог курсов</NuxtLink>
          </li>
        </ul>
      </div>
      <BaseBurger
        v-if="isMobile"
        class="header__burger"
        :isActive="isNavbarOpen"
      />
      <div v-else class="header__block2">
        <ul class="header__block2-icons">
          <li class="header__block2-icons__item">
            <nuxt-icon
              name="search"
              class="icon icon-search"
              alt="Поиск"
            ></nuxt-icon>
          </li>
          <li class="header__block2-icons__item">
            <nuxt-icon
              name="notification"
              class="icon icon-notification"
              alt="Уведомления"
            ></nuxt-icon>
          </li>
          <li class="header__block2-icons__item">
            <nuxt-icon name="chat" class="icon icon-chat" alt="Чат"></nuxt-icon>
          </li>
        </ul>
        <div class="header__block2-profile">
          <div class="header__block2-profile__photo">
            <NuxtImg
              src="/img/ProfileImage.png"
              alt="Моя фотография"
              class="header__block2-profile__photo-img"
              draggable="false"
              quality="100"
            />
          </div>
          <span class="header__block2-profile__name">Константин</span>
          <nuxt-icon
            name="chevron"
            class="icon icon-chevron"
            :class="{ rotated: isRotated }"
            alt="Раскрыть профиль"
            @click="toggleChevron"
          ></nuxt-icon>
        </div>
      </div>
    </header>
  </div>
  <div class="subheader-wrapper">
    <div class="subheader">
      <BaseBreadcrumbs />
      <BaseButton color="white" isSubmit="button" class="subheader__button">
        <div class="subheader__button-menu">
          <nuxt-icon
            name="menu"
            class="icon icon-menu"
            alt="Содержание курса"
          ></nuxt-icon>
        </div>
        Содержание курса
      </BaseButton>
    </div>
  </div>
</template>
<style scoped lang="less">
.header-wrapper,
.subheader-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: @white;
}

.header-wrapper {
  position: sticky;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;

  border-bottom: 1px solid @gray10;
}

.header,
.subheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1530px;

  &__button {
    width: 100%;
    max-width: 236px;
    padding: 8px 40px;

    @media @bw768 {
      display: none;
    }
  }
}

.header {
  @media @bw1600 {
    padding: 0 32px;
  }

  @media @bw500 {
    padding: 0 16px;
  }

  &__block1 {
    display: flex;
    justify-content: space-between;
    gap: 80px;
  }

  &__block1-links {
    display: flex;
    align-items: center;
    gap: 32px;
    max-width: 271px;

    @media @bw1170 {
      display: none;
    }
  }

  &__block2,
  &__block2-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;

    @media @bw960 {
      justify-content: flex-end;
      gap: 20px;
    }
  }

  &__block2 {
    width: 100%;
    max-width: 405px;

    @media @bw768 {
      display: none;
    }
  }

  &__block2-icons {
    &__item {
      &:hover .icon-search:deep(svg),
      &:hover .icon-search:deep(path),
      &:hover .icon-notification:deep(svg),
      &:hover .icon-notification:deep(path),
      &:hover .icon-chat:deep(svg),
      &:hover .icon-chat:deep(path) {
        color: @purple80;
        transition: 0.2s ease;
      }

      &:active .icon-search:deep(svg),
      &:active .icon-search:deep(path),
      &:active .icon-notification:deep(svg),
      &:active .icon-notification:deep(path),
      &:active .icon-chat:deep(svg),
      &:active .icon-chat:deep(path) {
        color: @purple100;
        transition: 0.2s ease;
      }
    }
  }

  &__block2-profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    background-color: @gray5;
    border-radius: 40px;
    width: 100%;
    max-width: 189px;
    height: 40px;
    padding: 4px 12px 4px 4px;

    &__photo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 40px;
      min-width: 40px;
      height: 40px;
      max-height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }

    &__photo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__name {
      font-size: 16px;
      font-family: "Nekst", sans-serif;
      font-weight: 600;
    }
  }
}

.list-item {
  &__link {
    text-decoration: none;
    color: @gray100;
    font-size: 16px;
    font-weight: 600;
    transition: 0.2s ease;
  }

  &:first-child {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &:hover {
    cursor: pointer;

    .list-item__link {
      color: @purple80;
    }
  }

  &:active {
    .list-item__link,
    .icon-hat:deep(svg),
    .icon-hat:deep(path) {
      color: @purple100;
    }
  }
}

.subheader {
  height: 32px;
  padding: 8px 0;
  background-color: @white;

  @media @bw1600 {
    padding: 8px 32px;
  }

  @media @bw500 {
    padding: 8px 16px;
  }

  &__breadcrumbs {
    display: flex;
    align-items: center;
    gap: 12px;

    &-link {
      text-decoration: none;
      color: @purple80;
      font-size: 14px;

      &.active {
        color: @purple50;
        pointer-events: none;
        cursor: default;
      }
    }

    .separator {
      color: @gray10;
      font-size: 14px;
    }
  }
}

.icon-hat:deep(svg),
.icon-hat:deep(path),
.icon-menu:deep(svg),
.icon-menu:deep(path) {
  color: @purple80;
  fill: none !important;
  cursor: pointer;
}

.icon-hat:deep(svg),
.icon-hat:deep(path) {
  width: 20px;
  height: 20px;
}

.icon-menu:deep(svg),
.icon-menu:deep(path) {
  width: 24px;
  height: 24px;
}

.icon-search:deep(svg),
.icon-search:deep(path),
.icon-notification:deep(svg),
.icon-notification:deep(path),
.icon-chat:deep(svg),
.icon-chat:deep(path) {
  width: 24px;
  height: 24px;
  color: @gray80;
  fill: none !important;
  cursor: pointer;
}

.icon-chevron:deep(svg),
.icon-chevron:deep(path) {
  width: 16px;
  height: 16px;
  color: @gray80;
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
