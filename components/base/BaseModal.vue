<script setup lang="ts">
import { watch, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  modelValue: boolean;
  title?: string;
  closeOnEsc?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
}>();

const close = () => emit("update:modelValue", false);

const onKey = (e: KeyboardEvent) => {
  if (props.closeOnEsc !== false && e.key === "Escape") close();
};

watch(
  () => props.modelValue,
  (v) => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = v ? "hidden" : "";
    }
  }
);

onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  if (typeof document !== "undefined") document.body.style.overflow = "";
});
</script>
<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal">
      <div class="modal__backdrop" @click="close" />
      <div class="modal__dialog" role="dialog" aria-modal="true">
        <div class="modal__head">
          <h3 class="modal__title">{{ title }}</h3>
          <button class="modal__close" type="button" @click="close">✕</button>
        </div>
        <div class="modal__body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped lang="less">
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
  }

  &__dialog {
    position: relative;
    z-index: 1;
    margin: 24px auto;
    max-width: 50vh;
    width: calc(100% - 24px);
    background: @white;
    border-radius: 16px;
    padding: 16px;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  &__title {
    font-family: "Nekst", sans-serif;
    font-size: 18px;

    @media @bw600 {
      font-size: 16px;
    }
  }

  &__close {
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
  }

  &__body {
    max-height: calc(100vh - 160px);
    overflow-y: auto;
    overflow-x: hidden;
    height: fit-content;
  }
}
</style>
