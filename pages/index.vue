<script setup lang="ts">
import { useCourseStore } from "~/stores/useCourseStore";
import { useFilterStore } from "~/stores/useFiltersStore";
import { useMobile } from "~/composables/useMobile";
import BaseTabsFilters from "~/components/base/BaseTabsFilters.vue";
import BasePaginator from "~/components/base/BasePaginator.vue";
import BaseModal from "~/components/base/BaseModal.vue";

const { isMobile } = useMobile();

definePageMeta({
  title: "Каталог курсов",
  layout: "default",
});

const filterStore = useFilterStore();
const courseStore = useCourseStore();
const allCourses = computed(() => courseStore.courses);
const newCourses = computed(() => allCourses.value.slice(0, 3));

const mostSearchedCategories = [
  "Курсы по разработке",
  "Go",
  "Английский язык",
  "HTML и CSS",
  "Матстатистика",
  "JavaScript",
  "ООП",
  "Базы данных",
  "Проектный менеджмент",
  "AI",
  "Графический дизайн",
  "Аналитика",
];

const recommendedCourses = computed(() => {
  const shuffled = [...allCourses.value].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6);
});

const viewedCourses = computed(() => {
  const shuffled = [...allCourses.value].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
});

const hasAppliedFilters = computed(
  () => filterStore.isVisible && filterStore.visibleFilters.length > 0
);

const searchResults = computed(() => courseStore.filteredCourses);

const PER_PAGE = 12;
const page = ref(1);
const mode = ref<"append" | "page">("append");

const total = computed(() => searchResults.value.length);
const lastPage = computed(() => Math.max(1, Math.ceil(total.value / PER_PAGE)));
const hasMore = computed(() => page.value < lastPage.value);

const visibleCourses = computed(() => {
  if (!total.value) return [];
  if (mode.value === "append") {
    return searchResults.value.slice(0, PER_PAGE * page.value);
  }
  const start = (page.value - 1) * PER_PAGE;
  const end = page.value * PER_PAGE;
  return searchResults.value.slice(start, end);
});

const onChangePage = (p: number) => {
  mode.value = "page";
  page.value = p;
};

const onShowMore = () => {
  mode.value = "append";
  if (page.value < lastPage.value) page.value += 1;
};

watch(
  () => courseStore.activeFilters,
  () => {
    page.value = 1;
    mode.value = "append";
  },
  { deep: true }
);

watch(lastPage, (lp) => {
  if (page.value > lp) page.value = lp;
});

const isModalOpen = ref(false);

watch(
  () => courseStore.activeFilters,
  () => {
    if (isMobile.value) isModalOpen.value = false;
  },
  { deep: true }
);

function openModal() {
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
}

const router = useRouter();
function goToNewPage() {
  router.push("/new");
}
</script>
<template>
  <div class="catalog-page">
    <h1 class="catalog-page__title">Каталог курсов</h1>
    <div class="catalog-page__wrapper">
      <div v-if="!isMobile" class="catalog-page__sidebar">
        <Sidebar />
      </div>
      <BaseButton
        v-else
        class="catalog-page__button"
        isSubmit="button"
        @click="openModal"
      >
        Открыть фильтры
      </BaseButton>
      <div v-if="!hasAppliedFilters" class="catalog-page__content">
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
          <div class="catalog-page__content-popular__body">
            <BaseSlider :course-ids="[1, 2, 3, 4, 5]" />
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
          <div class="catalog-page__content-new__body">
            <CourseCard
              v-for="course in newCourses"
              :key="course.id"
              :course-id="course.id"
              class="catalog-page__course-card"
            />
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
          <div class="catalog-page__content-most__body">
            <BaseButton
              v-for="(category, i) in mostSearchedCategories"
              :key="i"
              @click="goToNewPage"
              color="white"
              isSubmit="button"
              class="catalog-page__content-most__body-button"
            >
              {{ category }}
            </BaseButton>
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
          <div class="catalog-page__content-recommended__body">
            <CourseCard
              v-for="course in recommendedCourses"
              :key="course.id"
              :course-id="course.id"
              class="catalog-page__course-card"
            />
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
                  Станьте частью сообщества разработчиков
                </h2>
              </div>
              <p class="catalog-page__content-developers__head-description">
                Проходите курсы по разработке совершенно бесплатно, лучших
                возьмем к себе в команду
              </p>
            </div>
          </div>
          <div class="catalog-page__content-developers__body">
            <BaseSlider :course-ids="[1, 6, 10, 11]" />
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
          <div class="catalog-page__content-viewed__body">
            <CourseCard
              v-for="course in viewedCourses"
              :key="course.id"
              :course-id="course.id"
              class="catalog-page__course-card"
            />
          </div>
        </div>
      </div>
      <div v-else class="catalog-page__search">
        <div
          class="catalog-page__search-filters"
          v-if="!isMobile && hasAppliedFilters"
        >
          <BaseTabsFilters
            v-for="(filter, i) in filterStore.visibleFilters"
            :key="i"
            :text="filter.tag"
            :category="filter.title"
          />
        </div>
        <div class="catalog-page__search-result">
          <div
            v-if="visibleCourses.length"
            class="catalog-page__search-result__cards"
          >
            <CourseCard
              v-for="course in visibleCourses"
              :key="course.id"
              :course-id="course.id"
              class="catalog-page__course-card"
            />
          </div>
          <div v-else class="catalog-page__search-result__empty">
            К сожалению, нет результатов удовлетворяющих вашему запросу
          </div>
        </div>
        <div v-if="total" class="catalog-page__search-controls">
          <BaseButton
            isSubmit="button"
            color="white"
            :disabled="!hasMore"
            @click="onShowMore"
            class="catalog-page__search-controls__button"
          >
            Показать еще
            <nuxt-icon name="arrow" class="icon icon-arrow icon-arrow--down" />
          </BaseButton>

          <div
            class="catalog-page__search-controls__paginator"
            v-if="lastPage > 1"
          >
            <BasePaginator
              :count-of-elements="total"
              :page="page"
              @update:page="onChangePage"
              @changePage="onChangePage"
            />
          </div>
        </div>
      </div>
    </div>
    <BaseModal v-model="isModalOpen" title="Фильтры">
      <div class="filters-modal">
        <div v-if="hasAppliedFilters" class="filters-modal__chips">
          <BaseTabsFilters
            v-for="(filter, i) in filterStore.visibleFilters"
            :key="i"
            :text="filter.tag"
            :category="filter.title"
          />
        </div>
        <Sidebar />
      </div>
    </BaseModal>
  </div>
</template>
<style scoped lang="less">
.filters-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: fit-content;

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}

.catalog-page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1530px;

  @media @bw1600 {
    margin: 0 32px;
  }

  @media @bw500 {
    margin: 0;
  }

  &__title {
    font-family: "Nekst", sans-serif;
    font-size: 32px;
    margin: 36px 0 64px;

    @media @bw1440 {
      margin: 32px 0 40px;
      font-size: 28px;
    }

    @media @bw1170 {
      margin: 32px 0;
      font-size: 24px;
    }

    @media @bw500 {
      margin: 24px 16px 32px 16px;
      font-size: 22px;
    }
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    width: 100%;
    max-width: 1530px;

    @media @bw768 {
      flex-direction: column;
    }
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 364px;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    padding: 12px 24px;

    @media @bw600 {
      width: 100%;
    }
  }

  &__content,
  &__search {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    max-width: 1142px;
  }

  &__content-filters {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__content-popular,
  &__content-new,
  &__content-most,
  &__content-recommended,
  &__content-developers,
  &__content-viewed {
    padding: 32px;
    border-radius: 24px;

    @media @bw1600 {
      padding: 20px 16px;
    }

    @media @bw500 {
      padding: 20px 16px;
      border-radius: 0;
    }

    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__head-container {
      max-width: 802px;

      @media @bw1440 {
        max-width: 802px;
      }

      @media @bw1170 {
        max-width: 658px;
      }

      @media @bw500 {
        max-width: 802px;
      }
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

      @media @bw1440 {
        font-size: 20px;
      }

      @media @bw1170 {
        font-size: 18px;
      }

      @media @bw500 {
        font-size: 16px;
      }
    }
  }

  &__content-popular {
    background-color: @gray10;
    border: 1px solid @gray20;
    padding: 32px 0;

    &__head {
      margin: 0 32px;
    }
  }

  &__content-most {
    display: flex;
    flex-direction: column;
    gap: 24px;

    &__body {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    &__body-button {
      padding: 8px 40px;
    }
  }

  &__content-developers {
    background-color: @green10;
    border: 1px solid @green40;
    padding: 32px 0;

    &__head {
      margin: 0 32px;
    }

    &__head-description {
      margin-top: 4px;
      font-size: 16px;
      color: @gray80;

      @media @bw1170 {
        font-size: 14px;
      }

      @media @bw500 {
        font-size: 12px;
      }
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

      @media @bw1170 {
        font-size: 14px;
      }

      @media @bw500 {
        font-size: 12px;
      }
    }

    &__head-link {
      display: flex;
      gap: 8px;
      font-size: 18px;
      font-weight: bold;
      color: @purple80;
      text-decoration: none;

      @media @bw1170 {
        font-size: 16px;
      }

      @media @bw500 {
        font-size: 14px;
      }

      &:hover,
      &:hover .icon-arrow:deep(svg),
      &:hover .icon-arrow:deep(path) {
        color: @purple70;
      }
    }
  }

  &__content-popular,
  &__content-new,
  &__content-recommended,
  &__content-developers,
  &__content-viewed {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media @bw1600 {
      column-gap: 24px;
      row-gap: 24px;
    }

    @media @bw500 {
      gap: 16px;
    }

    &__body {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px;
    }
  }

  &__search-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
  }

  &__search-result {
    display: flex;
    justify-content: center;
    padding: 32px;
    border-radius: 24px;
    background-color: @white;

    @media @bw1600 {
      padding: 20px 16px;
      column-gap: 24px;
      row-gap: 24px;
    }

    @media @bw500 {
      padding: 20px 16px;
      gap: 12px;
    }

    &__cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px;
    }

    &__empty {
      font-size: 20px;
      color: @gray40;
      line-height: normal;

      @media @bw768 {
        font-size: 16px;
      }

      @media @bw500 {
        font-size: 14px;
      }
    }
  }

  &__search-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: fit-content;
      padding: 12px 32px;
      gap: 12px;
      height: 48px;
      max-height: 48px;
      font-size: 16px;
      background-color: @gray5;
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

.icon-arrow--down {
  transform: rotate(90deg);
}
</style>
