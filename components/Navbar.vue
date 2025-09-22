<script setup lang="ts">
import { useNavbar } from "~/composables/useNavbar";

const { isNavbarOpen, close } = useNavbar();
</script>

<template>
  <div class="navbar-overlay" v-if="isNavbarOpen" @click="close"></div>
  <div class="navbar" :class="{ 'navbar--open': isNavbarOpen }">
    <div class="navbar__header">
      <div class="navbar__header-profile">
        <div class="navbar__header-profile__photo">
          <NuxtImg
            src="/img/ProfileImage.png"
            alt="Моя фотография"
            class="navbar__header-profile__photo-img"
            draggable="false"
            quality="100"
          />
        </div>
        <span class="navbar__header-profile__name">Константин</span>
      </div>
    </div>
    <div class="navbar__body">
      <ul class="navbar__body-list">
        <li class="navbar__body-list__item">
          <nuxt-icon
            name="search"
            class="icon icon-search"
            alt="Поиск"
          ></nuxt-icon>
          <NuxtLink to="/" class="navbar__body-list__item-link">Поиск</NuxtLink>
        </li>
        <li class="navbar__body-list__item">
          <nuxt-icon
            name="notification"
            class="icon icon-notification"
            alt="Уведомления"
          ></nuxt-icon>
          <NuxtLink to="/" class="navbar__body-list__item-link"
            >Уведомления</NuxtLink
          >
        </li>
        <li class="navbar__body-list__item">
          <nuxt-icon name="chat" class="icon icon-chat" alt="Чат"></nuxt-icon>
          <NuxtLink to="/" class="navbar__body-list__item-link">Чат</NuxtLink>
        </li>
        <li class="navbar__body-list__item">
          <nuxt-icon
            name="hat"
            class="icon icon-hat"
            alt="Мои курсы"
          ></nuxt-icon>
          <NuxtLink to="/" class="navbar__body-list__item-link"
            >Мои курсы</NuxtLink
          >
        </li>
        <li class="navbar__body-list__item">
          <nuxt-icon
            name="course-catalog"
            class="icon icon-course-catalog"
            alt="Каталог курсов"
          ></nuxt-icon>
          <NuxtLink to="/" class="navbar__body-list__item-link"
            >Каталог курсов</NuxtLink
          >
        </li>
        <li class="navbar__body-list__item">
          <nuxt-icon
            name="menu"
            class="icon icon-menu"
            alt="Содержание курса"
          ></nuxt-icon>
          <NuxtLink to="/" class="navbar__body-list__item-link"
            >Содержание курса</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.navbar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  @media @w768 {
    display: none;
  }
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 375px;
  width: 100%;
  height: 100%;
  padding: 16px 16px;
  background-color: @white;
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.5);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1000;

  @media @bw500 {
    max-width: 290px;
  }

  @media @bw370 {
    max-width: 240px;
  }

  &--open {
    transform: translateX(0);
  }

  &__header-profile {
    display: flex;
    align-items: center;
    gap: 12px;

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

  &__body-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 30px;
    list-style: none;

    @media @bw400 {
      row-gap: 20px;
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 12px;

      &:hover {
        cursor: pointer;
      }
    }

    &__item-link {
      text-decoration: none;
      color: @gray100;
      font-size: 16px;
      font-weight: 600;
      transition: 0.2s ease;

      .navbar__body-list__item:hover & {
        color: @purple80;
      }

      &:hover {
        outline: none;
      }
    }
  }
}

.icon-search:deep(svg),
.icon-search:deep(path),
.icon-notification:deep(svg),
.icon-notification:deep(path),
.icon-chat:deep(svg),
.icon-chat:deep(path),
.icon-hat:deep(svg),
.icon-hat:deep(path),
.icon-menu:deep(svg),
.icon-menu:deep(path) {
  width: 24px;
  height: 24px;
  color: @gray80;
  fill: none !important;

  .navbar__body-list__item:hover & {
    color: @purple80;
  }
}

.icon-course-catalog:deep(svg),
.icon-course-catalog:deep(path) {
  width: 24px;
  height: 24px;
  fill: @gray80 !important;
  cursor: pointer;

  .navbar__body-list__item:hover & {
    fill: @purple80 !important;
  }
}
</style>
