<script setup>
import { useFilterStore } from "~/stores/useFiltersStore";

const store = useFilterStore();

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const deleteFilter = () => {
  store.deleteFilter(props.text, props.category);
};
</script>
<template>
  <div class="base-tabs">
    <span>{{ text }}</span>
    <nuxt-icon name="x" class="icon icon-x" @click="deleteFilter" />
  </div>
</template>
<style scoped lang="less">
.base-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px 16px;
  border-radius: 8px;
  border: 1px solid @purple40;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  width: fit-content;
  background-color: @white;
}

.icon-x:deep(svg),
.icon-x:deep(path) {
  width: 20px;
  height: 20px;
  color: @gray100;
  fill: none !important;
  cursor: pointer;
}
</style>
