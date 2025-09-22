<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
import { useCourseStore } from "~/stores/useCourseStore";
import { useTooltip } from "~/composables/useTooltip";

interface IProps {
  courseId: number;
  isHorizontal?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isHorizontal: false,
});

const courseStore = useCourseStore();
const getCourseRef = courseStore.getCourseById(props.courseId);
const course = computed(() => getCourseRef.value);

const categoryElement = ref<HTMLElement | null>(null);
const categoryNameElement = ref<HTMLElement | null>(null);
const titleElement = ref<HTMLElement | null>(null);
const allTagsPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });

const openAllTags = async () => {
  showAllTags.value = true;
  await nextTick();

  if (tagsMoreRef.value) {
    const tagsMoreRect = tagsMoreRef.value.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    allTagsPosition.value = {
      x: tagsMoreRect.left + 8,
      y: tagsMoreRect.bottom + scrollTop + 8,
    };
  }
};

const {
  tooltipContent: hoveredTag,
  tooltipPosition: tagTooltipPosition,
  tooltipVisible: tagTooltipVisible,
  showTooltip: showTagTooltip,
  hideTooltip: hideTagTooltip,
} = useTooltip();

const {
  tooltipContent: hoveredCategory,
  tooltipPosition: categoryTooltipPosition,
  tooltipVisible: categoryTooltipVisible,
  showTooltip: showCategoryTooltip,
  hideTooltip: hideCategoryTooltip,
} = useTooltip();

const {
  tooltipContent: hoveredTitle,
  tooltipPosition: titleTooltipPosition,
  tooltipVisible: titleTooltipVisible,
  showTooltip: showTitleTooltip,
  hideTooltip: hideTitleTooltip,
} = useTooltip();

const favoriteToggle = () => {
  courseStore.toggleFavorite(props.courseId);
};

const MAX_VISIBLE_TAGS = 4;

const visibleTags = computed(() =>
  course.value.tags.slice(0, MAX_VISIBLE_TAGS)
);
const hiddenTags = computed(() => course.value.tags.slice(MAX_VISIBLE_TAGS));

const showAllTags = ref(false);
const allTagsRef = ref<HTMLElement | null>(null);
const tagsMoreRef = ref<HTMLElement | null>(null);

const handleCategoryHover = (event: MouseEvent) => {
  if (categoryNameElement.value) {
    showCategoryTooltip(
      event,
      course.value.category,
      categoryNameElement.value
    );
  }
};

const handleTitleHover = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement | null;
  if (target) {
    showTitleTooltip(event, course.value.title, target);
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    showAllTags.value &&
    allTagsRef.value &&
    !allTagsRef.value.contains(event.target as Node) &&
    tagsMoreRef.value &&
    !tagsMoreRef.value.contains(event.target as Node)
  ) {
    showAllTags.value = false;
  }
};

const stopPropagation = (event: MouseEvent) => {
  event.stopPropagation();
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <div
    class="course-card"
    :class="{ 'course-card--horizontal': props.isHorizontal }"
  >
    <div class="course-card__block1">
      <div
        class="course-card__block1-favorite"
        :class="{
          'course-card__block1-favorite--horizontal': props.isHorizontal,
          'course-card__block1-favorite--active': course.isFavorite,
        }"
        @click="favoriteToggle"
      >
        <nuxt-icon
          name="star"
          class="icon icon-star"
          alt="Добавить в избранное"
        ></nuxt-icon>
      </div>
      <div
        ref="categoryElement"
        class="course-card__block1-category"
        :class="{
          'course-card__block1-category--horizontal': props.isHorizontal,
        }"
        @mouseenter="handleCategoryHover"
        @mouseleave="hideCategoryTooltip"
      >
        <span
          ref="categoryNameElement"
          class="course-card__block1-category-name"
        >
          {{ course.category }}
        </span>
      </div>
      <div
        class="course-card__block1-photo"
        :class="{ 'course-card__block1-photo--horizontal': props.isHorizontal }"
      >
        <NuxtImg
          :src="course.image"
          alt="Обложка курса"
          class="course-card__block1-photo-img"
          draggable="false"
          quality="100"
        />
      </div>
    </div>
    <div
      class="course-card__block2"
      :class="{ 'course-card__block2--horizontal': props.isHorizontal }"
    >
      <div
        class="course-card__block2-info"
        :class="{ 'course-card__block2-info--horizontal': props.isHorizontal }"
      >
        <div
          class="course-card__block2-info__title"
          :class="{
            'course-card__block2-info__title--horizontal': props.isHorizontal,
          }"
          @mouseenter="handleTitleHover"
          @mouseleave="hideTitleTooltip"
        >
          <h3
            ref="titleElement"
            class="course-card__block2-info__title-text"
            :class="{
              'course-card__block2-info__title-text--horizontal':
                props.isHorizontal,
            }"
          >
            {{ course.title }}
          </h3>
        </div>
        <div
          class="course-card__block2-info__description"
          :class="{
            'course-card__block2-info__description--horizontal':
              props.isHorizontal,
          }"
        >
          <p class="course-card__block2-info__description-text">
            {{ course.description }}
          </p>
        </div>
        <div class="course-card__block2-info__tags" style="position: relative">
          <span
            v-for="tag in visibleTags"
            :key="tag"
            class="course-card__block2-info__tags-item"
            @mouseenter="showTagTooltip($event, tag)"
            @mouseleave="hideTagTooltip"
          >
            {{ tag }}
          </span>

          <span
            ref="tagsMoreRef"
            v-if="hiddenTags.length > 0"
            class="course-card__block2-info__tags-more"
            @click="openAllTags"
          >
            +{{ hiddenTags.length }}

            <teleport to="body">
              <div
                v-if="showAllTags"
                ref="allTagsRef"
                class="course-card__block2-info__all-tags"
                :style="{
                  position: 'absolute',
                  left: `${allTagsPosition.x}px`,
                  top: `${allTagsPosition.y}px`,
                }"
                @click="stopPropagation"
              >
                <div
                  v-for="tag in course.tags"
                  :key="tag"
                  class="course-card__block2-info__all-tags-item"
                  @mouseenter="showTagTooltip($event, tag)"
                  @mouseleave="hideTagTooltip"
                >
                  {{ tag }}
                </div>
              </div>
            </teleport>
          </span>
        </div>
      </div>
      <div v-if="props.isHorizontal" class="course-card__block2-duration">
        {{ course.duration }}
        <span class="course-card__block2-duration-line"></span>
        {{ course.startDate }}
      </div>
      <BaseButton
        color="purple"
        isSubmit="button"
        class="course-card__block2-button"
        :class="{
          'course-card__block2-button--horizontal': props.isHorizontal,
        }"
        >{{ course.price }}
        <nuxt-icon name="arrow" class="icon icon-arrow"></nuxt-icon
      ></BaseButton>
    </div>

    <teleport to="body">
      <div
        v-if="tagTooltipVisible && hoveredTag"
        class="course-card__tooltip"
        :style="{
          left: `${tagTooltipPosition.x}px`,
          top: `${tagTooltipPosition.y + 20}px`,
        }"
      >
        {{ hoveredTag }}
      </div>
    </teleport>
    <teleport to="body">
      <div
        v-if="categoryTooltipVisible && hoveredCategory"
        class="course-card__tooltip"
        :style="{
          left: `${categoryTooltipPosition.x}px`,
          top: `${categoryTooltipPosition.y + 20}px`,
        }"
      >
        {{ hoveredCategory }}
      </div>
    </teleport>

    <teleport to="body">
      <div
        v-if="titleTooltipVisible && hoveredTitle"
        class="course-card__tooltip"
        :style="{
          left: `${titleTooltipPosition.x}px`,
          top: `${titleTooltipPosition.y + 20}px`,
        }"
      >
        {{ hoveredTitle }}
      </div>
    </teleport>
  </div>
</template>
<style scoped lang="less">
.course-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  width: 100%;
  max-width: 308px;
  height: 448px;
  max-height: 448px;
  padding: 16px 16px 32px 16px;
  background-color: @white;
  border: 1px solid @gray20;
  border-radius: 24px;

  &--horizontal {
    flex-direction: row;
    gap: 16px;
    max-width: 466px;
    height: 232px;
    max-height: 232px;
    padding: 16px;
  }

  &__block1 {
    position: relative;
    // width: 100%;
  }

  &__block1-favorite {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 20px;
    height: 20px;
    padding: 8px;
    background-color: @white;
    border-radius: 50%;
    cursor: pointer;

    &--horizontal {
      top: 8px;
      right: 8px;

      &:hover {
        background-color: @gray10;
      }
    }

    &--active {
      .icon-star:deep(svg),
      .icon-star:deep(path) {
        color: @purple80;
        fill: @purple80 !important;
      }
    }

    &:hover:not(.course-card__block1-favorite--active) {
      background-color: @gray10;
    }

    &:hover {
      background-color: @gray10;
    }
  }

  &__block1-category {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    align-items: center;
    width: max-content;
    max-width: 164px;
    padding: 4px 12px;
    background-color: @white;
    border: 1px solid @gray20;
    border-radius: 8px;

    &--horizontal {
      top: 8px;
      left: 8px;
      max-width: 116px;
    }
  }

  &__block1-category-name {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: fit-content;
    white-space: nowrap;
    color: @gray100;
  }

  &__block1-photo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 312px;
    min-width: 312px;
    height: 214px;
    max-height: 214px;
    border-radius: 16px;
    background-color: @gray20;
    overflow: hidden;

    &--horizontal {
      max-width: 224px;
      min-width: 224px;
      height: 234px;
      max-height: 234px;
    }
  }

  &__block1-photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__block2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-height: 204px;
    height: 204px;

    &--horizontal {
      max-height: 234px;
      height: 234px;
      gap: 16px;
    }
  }

  &__block2-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height: 140px;
    height: 140px;

    &--horizontal {
      max-width: 228px;
      max-height: 186px;
      height: 186px;
    }

    &__title {
      max-width: 312px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      width: fit-content;
      word-wrap: break-word;
      white-space: normal;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-clamp: 1;
    }

    &__title-text {
      font-family: "Nekst", sans-serif;
      font-size: 20px;
      line-height: 26px;

      &--horizontal {
        max-width: 228px;
        font-size: 14px;
        line-height: 20px;
      }
    }

    &__description {
      display: flex;
      align-items: center;
      max-width: 312px;
      width: max-content;
      margin-top: 16px;

      &--horizontal {
        max-width: 228px;
      }
    }

    &__description-text {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      width: fit-content;
      word-wrap: break-word;
      white-space: normal;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      font-size: 12px;
      color: @gray100;
    }

    &__tags {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
    }

    &__tags-item,
    &__all-tags-item {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 146px;
      height: 16px;
      line-height: 17px;
      text-align: center;
      padding: 4px 12px;
      background-color: @gray10;
      border-radius: 8px;
      font-size: 12px;
      color: @gray100;
      cursor: default;
      flex-shrink: 0;
    }

    &__tags-more {
      display: flex;
      align-items: self-start;
      position: relative;
      cursor: pointer;
      width: fit-content;
      max-width: 60px;
      height: 16px;
      max-height: 16px;
      line-height: 17px;
      font-size: 12px;
      text-align: center;
      padding: 4px 12px;
      background-color: @gray10;
      border-radius: 8px;

      &:hover {
        background-color: @gray5;
      }
    }

    &__all-tags {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      overflow-x: hidden;
      overflow-y: auto;
      position: absolute;
      max-height: 200px;
      width: 100%;
      max-width: 170px;
      background: @white;
      border: 1px solid @gray20;
      border-radius: 8px;
      padding: 6px;
      margin-top: -4px;
      margin-left: -12px;
      z-index: 10;
      cursor: auto;
      animation: tagsExpand 0.3s ease-out;
      transform-origin: top center;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: @gray100;
        border-radius: 10px;
      }

      scrollbar-width: thin;
      scrollbar-color: @gray40 transparent;

      -ms-overflow-style: -ms-autohiding-scrollbar;
      scrollbar-width: thin;
      scrollbar-color: @gray40 transparent;

      &::-webkit-scrollbar-button {
        display: none;
      }
      &::-webkit-scrollbar-corner {
        background: transparent;
      }
    }

    &__all-tags-item {
      display: block;
      min-height: 16px;
      height: auto;
      max-height: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: unset;
      line-clamp: unset;
      -webkit-box-orient: unset;
    }
  }

  &__block2-duration {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 228px;
    font-size: 12px;
    color: @gray100;
  }

  &__block2-duration-line {
    width: 1px;
    height: 16px;
    margin: 0 12px;
    background-color: @gray50;
  }

  &__block2-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 312px;
    gap: 12px;
    height: 40px;
    max-height: 40px;

    &--horizontal {
      max-width: 228px;
      height: auto;
      padding: 4px 0;
      max-height: 32px;
    }
  }

  &__tooltip {
    position: fixed;
    background: @white;
    border: 1px solid @gray20;
    border-radius: 16px;
    padding: 16px;
    font-size: 12px;
    color: @gray100;
    z-index: 1000;
    max-width: 300px;
    word-wrap: break-word;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    pointer-events: none;
  }
}

.icon-star:deep(svg),
.icon-star:deep(path) {
  width: 20px;
  height: 20px;
  color: @gray40;
  fill: none !important;
}

.icon-arrow:deep(svg),
.icon-arrow:deep(path) {
  width: 24px;
  height: 24px;
  color: @white;
  fill: none !important;
}

@keyframes tagsExpand {
  0% {
    transform: scaleY(0);
    opacity: 0;
    max-height: 0;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
    max-height: 200px;
  }
}
</style>
