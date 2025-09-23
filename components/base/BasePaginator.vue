<script setup>
const emit = defineEmits(["changePage", "update:page"]);

const props = defineProps({
  countOfElements: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    default: 1,
  },
});

const PER_PAGE = 12;
const lastPage = computed(
  () => Math.ceil((props.countOfElements || 0) / PER_PAGE) || 1
);

const currentPage = computed({
  get: () => Math.min(Math.max(1, props.page || 1), lastPage.value),
  set: (val) => {
    const clamped = Math.min(Math.max(1, val), lastPage.value);
    emit("update:page", clamped);
    emit("changePage", clamped);
  },
});

const goToPage = (page) => {
  if (page >= 1 && page <= lastPage.value) {
    currentPage.value = page;
  }
};

const pages = computed(() => {
  const pagesArray = [];
  const totalPages = lastPage.value;
  const cp = currentPage.value;

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pagesArray.push(i);
  } else {
    if (cp < 4) {
      for (let i = 1; i <= 4; i++) pagesArray.push(i);
      pagesArray.push("...");
      pagesArray.push(totalPages);
    } else if (cp > totalPages - 3) {
      pagesArray.push(1, "...");
      for (let i = totalPages - 3; i <= totalPages; i++) pagesArray.push(i);
    } else {
      pagesArray.push(1, "...");
      for (let i = cp - 1; i <= cp + 1; i++) pagesArray.push(i);
      pagesArray.push("...", totalPages);
    }
  }
  return pagesArray;
});
</script>
<template>
  <div class="paginator">
    <span
      class="paginator__prev"
      @click="goToPage(currentPage - 1)"
      :class="{ 'paginator__prev--active': currentPage > 1 }"
    >
      &lt;
    </span>

    <span
      v-for="(page, index) in pages"
      :key="index"
      class="paginator__ceil"
      @click="typeof page === 'number' ? goToPage(page) : null"
      :class="{ 'paginator__ceil--active': currentPage === page }"
    >
      {{ page }}
    </span>

    <span
      class="paginator__next"
      @click="goToPage(currentPage + 1)"
      :class="{ 'paginator__next--active': currentPage < lastPage }"
    >
      &gt;
    </span>
  </div>
</template>
<style scoped lang="less">
.paginator {
  width: 100%;
  display: flex;
  gap: 20px;
  &__ceil,
  &__prev,
  &__next {
    max-width: 48px;
    min-width: 48px;
    width: 100%;
    cursor: pointer;
    padding: 12px 0;
    justify-content: center;
    align-items: center;
    display: flex;
    line-height: 24px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 4px;
    background-color: @white;
    gap: 20px;
    color: @purple80;

    @media @bw500 {
      max-width: 32px;
      min-width: 32px;
      font-size: 14px;
    }

    &--active {
      background-color: @purple80;
      color: @white;
    }
  }

  &__prev,
  &__next {
    color: @gray30;
    cursor: default;
  }

  &__prev--active,
  &__next--active {
    background-color: @white;
    color: @purple80;
    cursor: pointer;
  }
}
</style>
