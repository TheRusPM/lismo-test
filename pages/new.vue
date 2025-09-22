<script setup>
import CourseCard from "~/components/CourseCard.vue";

definePageMeta({
  title: "Новые курсы",
  layout: "default",
});

const courseStore = useCourseStore();
const courses = computed(() => courseStore.courses);
</script>
<template>
  <div class="new-courses-page">
    <h1 class="new-courses-page__title">Новые курсы</h1>
    <div class="new-courses-page__content">
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :courseId="course.id"
      />
    </div>
  </div>
</template>
<style scoped lang="less">
.new-courses-page {
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

  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
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
      border-radius: 0;
      gap: 12px;
    }
  }
}
</style>
