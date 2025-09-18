<script setup></script>
<template>
  <div class="footer-wrapper">
    <footer class="footer">
      <div class="footer__block1">
        <div class="footer__block1-links">
          <NuxtLink to="/" class="footer__block1-links__link"
            >Вакансии</NuxtLink
          >
          <NuxtLink to="/" class="footer__block1-links__link"
            >Техническая поддержка</NuxtLink
          >
        </div>
        <div class="footer__block1-copyright">
          <p class="footer__block1-copyright__text">© 2023 ФГБОУ ВО ТУСУР</p>
        </div>
      </div>
      <div class="footer__block2">
        <span class="footer__block2-text">Мы в социальных сетях</span>
        <ul class="footer__block2-icons">
          <li class="footer__block2-icons__item">
            <nuxt-icon
              name="yt"
              class="icon icon-yt"
              alt="Мы в Youtube"
            ></nuxt-icon>
          </li>
          <li class="footer__block2-icons__item">
            <nuxt-icon
              name="tg"
              class="icon icon-tg"
              alt="Мы в Telegram"
            ></nuxt-icon>
          </li>
          <li class="footer__block2-icons__item">
            <nuxt-icon
              name="vk"
              class="icon icon-vk"
              alt="Мы во Вконтакте"
            ></nuxt-icon>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
<style scoped lang="less">
.footer-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: @purple80;
  padding: 44px 0 40px;
}

.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1530px;

  &__block1 {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 600px;
  }

  &__block1-links {
    display: flex;
    align-items: center;
    gap: 24px;

    &__link {
      width: 100%;
      max-width: 288px;
      text-decoration: none;
      color: @white;
      font-size: 16px;
      font-weight: 500;
      transition: 0.2s ease;
    }
  }

  &__block1-copyright {
    &__text {
      color: @gray30;
      font-size: 14px;
      font-weight: 400;
    }
  }

  &__block2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 185px;
    gap: 20px;
  }

  &__block2-text {
    color: @white;
    font-size: 16px;
    font-weight: 500;
  }

  &__block2-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    width: 100%;
    max-width: 128px;

    &__item {
      &:hover .icon-yt:deep(svg),
      &:hover .icon-yt:deep(path),
      &:hover .icon-tg:deep(svg),
      &:hover .icon-tg:deep(path),
      &:hover .icon-vk:deep(svg),
      &:hover .icon-vk:deep(path) {
        color: @gray60;
        transition: 0.2s ease;
      }
    }
  }
}

.icon-yt:deep(svg),
.icon-yt:deep(path),
.icon-tg:deep(svg),
.icon-tg:deep(path),
.icon-vk:deep(svg),
.icon-vk:deep(path) {
  width: 24px;
  height: 24px;
  color: @white;
  fill: none !important;
  cursor: pointer;
}
</style>
