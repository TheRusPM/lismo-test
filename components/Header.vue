<script setup lang="ts">
import Logo from "./base/BaseLogo.vue";

const isRotated = ref(false);

const toggleChevron = () => {
  isRotated.value = !isRotated.value;
};
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
      <div class="header__block2">
        <div class="header__block2-icons">
          <nuxt-icon
            name="search"
            class="icon icon-search"
            alt="Мои курсы"
          ></nuxt-icon>
          <nuxt-icon
            name="notification"
            class="icon icon-notification"
            alt="Мои курсы"
          ></nuxt-icon>
          <nuxt-icon
            name="chat"
            class="icon icon-chat"
            alt="Мои курсы"
          ></nuxt-icon>
        </div>
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
  }
}

.header {
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
  }

  &__block2,
  &__block2-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
  }

  &__block2 {
    width: 100%;
    max-width: 405px;
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

    &:hover {
      color: @gray80;
      outline: none;
    }
  }

  &:first-child {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.subheader {
  padding: 8px 0;
  background-color: @white;

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
.icon-chat:deep(path),
.icon-chevron:deep(svg),
.icon-chevron:deep(path) {
  width: 24px;
  height: 24px;
  color: @gray80;
  fill: none !important;
  cursor: pointer;
}

.icon-chevron:deep(svg),
.icon-hat:deep(path) {
  width: 16px;
  height: 16px;
}

.icon-chevron {
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &.rotated {
    transform: rotate(180deg);
  }
}
</style>
