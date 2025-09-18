<script setup>
definePageMeta({
  title: "Каталог курсов",
  layout: "default",
});
</script>
<template>
  <div class="catalog-page">
    <h1 class="catalog-page__title">Каталог курсов</h1>
    <div class="catalog-page__wrapper">
      <div class="catalog-page__sidebar"></div>
      <div class="catalog-page__content">
        <div class="catalog-page__content-popular">
          <div class="catalog-page__content-popular__head">
            <div class="catalog-page__content-popular__head-container">
              <div class="catalog-page__content-popular__head-title">
                <nuxt-icon
                  name="lightning"
                  class="icon icon-lightning"
                ></nuxt-icon>
                <h2 class="catalog-page__content-popular__head-title-text">
                  Популярные курсы
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="catalog-page__content-new">
          <div class="catalog-page__content-new__head">
            <div class="catalog-page__content-new__head-container">
              <div class="catalog-page__content-new__head-title">
                <nuxt-icon name="fixiks" class="icon icon-fixiks"></nuxt-icon>
                <h2 class="catalog-page__content-new__head-title-text">
                  Познакомьтесь с новинками
                </h2>
              </div>
              <p class="catalog-page__content-new__head-description">
                Откройте дверь в новые знания с нашими свежими курсами!
              </p>
            </div>
            <NuxtLink to="/new" class="catalog-page__content-new__head-link">
              Смотреть все
              <nuxt-icon name="arrow" class="icon icon-arrow"></nuxt-icon>
            </NuxtLink>
          </div>
        </div>
        <div class="catalog-page__content-most">
          <div class="catalog-page__content-most__head">
            <div class="catalog-page__content-most__head-container">
              <div class="catalog-page__content-most__head-title">
                <h2 class="catalog-page__content-most__head-title-text">
                  Эти курсы ищут чаще всего
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="catalog-page__content-recommended">
          <div class="catalog-page__content-recommended__head">
            <div class="catalog-page__content-recommended__head-container">
              <div class="catalog-page__content-recommended__head-title">
                <nuxt-icon name="fixiks" class="icon icon-fixiks"></nuxt-icon>
                <h2 class="catalog-page__content-recommended__head-title-text">
                  Рекомендованные вам курсы
                </h2>
              </div>
              <p class="catalog-page__content-recommended__head-description">
                Помогут расширить компетенции и стать более востребованным
                специалистом на рынке труда
              </p>
            </div>
            <NuxtLink
              to="/new"
              class="catalog-page__content-recommended__head-link"
            >
              Смотреть все
              <nuxt-icon name="arrow" class="icon icon-arrow"></nuxt-icon>
            </NuxtLink>
          </div>
        </div>
        <div class="catalog-page__content-developers">
          <div class="catalog-page__content-developers__head">
            <div class="catalog-page__content-developers__head-container">
              <div class="catalog-page__content-developers__head-title">
                <nuxt-icon
                  name="lightning"
                  class="icon icon-lightning"
                ></nuxt-icon>
                <h2 class="catalog-page__content-developers__head-title-text">
                  Популярные курсы
                </h2>
              </div>
              <p class="catalog-page__content-developers__head-description">
                Проходите курсы по разработке совершенно бесплатно, лучших
                возьмем к себе в команду
              </p>
            </div>
          </div>
        </div>
        <div class="catalog-page__content-viewed">
          <div class="catalog-page__content-viewed__head">
            <div class="catalog-page__content-viewed__head-container">
              <div class="catalog-page__content-viewed__head-title">
                <nuxt-icon name="fixiks" class="icon icon-fixiks"></nuxt-icon>
                <h2 class="catalog-page__content-viewed__head-title-text">
                  Вы смотрели ранее
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.catalog-page {
  &__title {
    font-family: "Nekst", sans-serif;
    font-size: 32px;
    margin: 36px 0 24px;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    width: 100%;
    margin-bottom: 120px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    max-width: 1142px;
  }

  &__content-popular,
  &__content-new,
  &__content-most,
  &__content-recommended,
  &__content-developers,
  &__content-viewed {
    padding: 32px;
    border-radius: 24px;

    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    &__head-container {
      width: 100%;
      max-width: 802px;
    }

    &__head-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
    }

    &__head-title-text {
      font-family: "Nekst", sans-serif;
      font-size: 22px;
    }
  }

  &__content-popular {
    background-color: @gray10;
    border: 1px solid @gray20;
  }

  &__content-developers {
    background-color: @green10;
    border: 1px solid @green40;

    &__head-description {
      margin-top: 4px;
      font-size: 16px;
      color: @gray80;
      max-width: 802px;
    }
  }

  &__content-new,
  &__content-most,
  &__content-recommended,
  &__content-viewed {
    border: none;
    background-color: @white;

    &__head-description {
      margin-top: 4px;
      font-size: 16px;
      color: @gray60;
      max-width: 802px;
    }

    &__head-link {
      display: flex;
      gap: 8px;
      font-size: 18px;
      font-weight: bold;
      color: @purple80;
      text-decoration: none;
    }
  }
}

.icon-lightning:deep(svg),
.icon-lightning:deep(path),
.icon-fixiks:deep(svg),
.icon-fixiks:deep(path) {
  width: 32px;
  height: 32px;
  color: @gray100;
  fill: none !important;
  cursor: pointer;
}

.icon-arrow:deep(svg),
.icon-arrow:deep(path) {
  width: 24px;
  height: 24px;
  color: @purple80;
  fill: none !important;
  cursor: pointer;
}
</style>
