<script setup lang="ts">
import { ref } from "vue";
import { useKeenSlider } from "keen-slider/vue.es";

import CourseCard from "~/components/CourseCard.vue";

interface IProps {
  courseIds: number[];
}

const props = defineProps<IProps>();
const current = ref(0);

const [container, slider] = useKeenSlider({
  slides: {
    perView: 2,
    spacing: 24,
  },
  slideChanged(s) {
    current.value = s.track.details.rel;
  },
});
</script>
<template>
  <div class="base-slider">
    <div ref="container" class="keen-slider">
      <div v-for="id in props.courseIds" :key="id" class="keen-slider__slide">
        <CourseCard :course-id="id" :is-horizontal="true" />
      </div>
    </div>

    <BaseButton
      color="white"
      v-if="slider"
      class="base-slider__arrow base-slider__arrow--left"
      :disabled="current === 0"
      @click="slider.prev()"
    >
      <nuxt-icon
        name="chevron"
        class="icon icon-chevron"
        alt="Вращать карусель влево"
      ></nuxt-icon>
    </BaseButton>

    <BaseButton
      color="white"
      v-if="slider"
      class="base-slider__arrow base-slider__arrow--right"
      :disabled="current === slider.track.details.slides.length - 2"
      @click="slider.next()"
    >
      <nuxt-icon
        name="chevron"
        class="icon icon-chevron"
        alt="Вращать карусель вправо"
      ></nuxt-icon>
    </BaseButton>
  </div>
</template>
<style scoped lang="less">
.base-slider {
  position: relative;
  width: 100%;
  max-width: 1142px;

  .keen-slider__slide {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 500px;
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    max-width: 56px;
    width: 100%;
    max-width: 56px;
    height: 56px;
    border-radius: 50%;
    background: @white;
    border: 1px solid @gray5;
    cursor: pointer;

    &--left {
      left: 32px;
      transform: translateY(-50%) rotate(90deg);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    }

    &--right {
      right: 32px;
      transform: translateY(-50%) rotate(270deg);
      box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.15);
    }

    &:disabled {
      opacity: 0;
      cursor: default;
    }
  }
}

.icon-chevron:deep(svg),
.icon-chevron:deep(path) {
  width: 16px;
  height: 16px;
  color: @purple80;
  fill: none !important;
  cursor: pointer;
}

.icon-chevron {
  transition: transform 0.2s ease-in-out;
}
</style>
