<script setup></script>
<template>
  <div class="footer-wrapper">
    <footer class="footer">
      <div class="footer__left-section">
        <div class="footer__block1">
          <div class="footer__block1-links">
            <NuxtLink to="/" class="footer__block1-links__link"
              >Вакансии</NuxtLink
            >
            <NuxtLink to="/" class="footer__block1-links__link"
              >Техническая поддержка</NuxtLink
            >
          </div>
        </div>
        <div class="footer__block-copyright">
          <p class="footer__block-copyright__text">© 2023 ФГБОУ ВО ТУСУР</p>
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
  margin-top: 120px;
  padding: 44px 0 40px;

  @media @bw500 {
    margin-top: 56px;
    padding-top: 24px;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1530px;

  @media @bw1600 {
    padding: 0 32px;
  }

  @media @bw500 {
    padding: 0 16px;
    display: grid;
    grid-template-rows: repeat(3, auto);
    row-gap: 24px;
  }

  &__left-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 600px;

    @media @bw500 {
      display: contents;
    }
  }

  &__block-copyright {
    @media @bw500 {
      grid-row: 3;
    }

    &__text {
      color: @gray30;
      font-size: 14px;
      font-weight: 400;
    }
  }

  &__block1 {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 600px;

    @media @bw500 {
      display: grid;
    }
  }

  &__block1-links {
    display: flex;
    align-items: center;
    gap: 24px;

    @media @bw768 {
      gap: 0;
    }

    @media @bw650 {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    @media @bw500 {
      grid-row: 1;
    }

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

  &__block2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 185px;
    gap: 20px;

    @media @bw650 {
      gap: 16px;
    }

    @media @bw500 {
      grid-row: 2;
    }
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

    @media @bw650 {
      gap: 16px;
    }

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
