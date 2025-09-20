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
  &__title {
    font-family: "Nekst", sans-serif;
    font-size: 32px;
    margin: 36px 0 64px;
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 120px;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 24px;
    width: 100%;
    padding: 32px;
    border-radius: 24px;
    background-color: @white;
    margin-bottom: 120px;
  }
}
</style>
