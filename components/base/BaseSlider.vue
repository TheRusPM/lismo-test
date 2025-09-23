<script setup lang="ts">
import { ref } from "vue";
import { useMobile } from "~/composables/useMobile";
import { useKeenSlider } from "keen-slider/vue.es";
import CourseCard from "~/components/CourseCard.vue";

interface IProps {
  courseIds: number[];
}

const props = defineProps<IProps>();
const current = ref(0);

const { isMobile } = useMobile();

const [container, slider] = useKeenSlider({
  slides: {
    perView: "auto",
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

  @media (max-width: 1522px) {
    max-width: 1024px;
  }

  @media @bw1440 {
    max-width: 1000px;
  }

  @media (max-width: 1380px) {
    max-width: 960px;
  }

  // @media (max-width: 1472) {
  //   max-width: 1024px;
  // }

  // @media (max-width: 1280px) {
  //   max-width: 888px;
  // }

  // @media (max-width: 1220px) {
  //   max-width: 846px;
  // }

  // @media @bw1170 {
  //   max-width: 824px;
  // }

  // @media (max-width: 1152px) {
  //   max-width: 800px;
  // }

  // @media (max-width: 1080px) {
  //   max-width: 750px;
  // }

  // @media @bw1020 {
  //   max-width: 728px;
  // }

  // @media @bw960 {
  //   max-width: 666px;
  // }

  // @media (max-width: 910px) {
  //   max-width: 632px;
  // }

  // @media (max-width: 870px) {
  //   max-width: 604px;
  // }

  // @media (max-width: 846px) {
  //   max-width: 586px;
  // }

  // @media (max-width: 828px) {
  //   max-width: 520px;
  // }

  // @media @bw768 {
  //   max-width: calc(fit-content - 32px);
  // }

  // @media @bw600 {
  //   max-width: 446px;
  // }

  .keen-slider {
    overflow: hidden;
    width: 100%;
  }

  .keen-slider__slide {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    flex-shrink: 0;
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
