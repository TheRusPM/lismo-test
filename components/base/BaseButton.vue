<script setup lang="ts">
type TButton = "purple" | "white";
type TSubmit = "submit" | "button";
interface IProps {
  color?: TButton;
  isSubmit?: TSubmit;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  color: "purple",
  isSubmit: "button",
  disabled: false,
});

function buttonClick(): void {
  emit("click");
}

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    :class="[
      props.color === 'purple' ? 'purple-btn' : '',
      props.color === 'white' ? 'white-btn' : '',
      props.disabled ? 'disabled-btn' : '',
    ]"
    :type="props.isSubmit ? 'submit' : 'button'"
    :disabled="props.disabled"
    @click="buttonClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="less">
.purple-btn,
.white-btn,
.transparent-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  height: 32px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  border: none;
  transition: 0.2s ease;

  // @media @bw600 {
  //     height: 40px;
  //     font-size: 16px;
  // }

  // @media @bw400 {
  //     height: 36px;
  //     font-size: 14px;
  // }
}

.purple-btn {
  background-color: @purple80;
  color: @white;

  &:hover:not(.disabled-btn) {
    background-color: @purple70;
  }
}

.white-btn {
  background-color: @white;
  color: @purple80;
  border: 1px solid @purple80;

  &:hover:not(.disabled-btn) {
    background-color: @gray10;
    border-color: @purple70;
  }
}

.disabled-btn {
  cursor: not-allowed;
  background-color: @gray5;
  color: @purple80;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
