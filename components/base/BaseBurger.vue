<script setup lang="ts">
import { useNavbar } from "~/composables/useNavbar";

interface IProps {
  isActive?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isActive: false,
});

const emit = defineEmits(["toggle"]);
const { toggle } = useNavbar();

const onClick = () => {
  toggle();
  emit("toggle");
};
</script>

<template>
  <div
    :class="['burger__wrapper', { 'burger__wrapper--color': !props.isActive }]"
    @click="onClick"
  >
    <div :class="['burger', { 'burger--active': props.isActive }]">
      <span></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.burger {
  position: absolute;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  max-width: 30px;
  width: 100%;

  &__wrapper {
    max-width: 30px;
    width: 100%;
    height: 30px;
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    // @media @bw400 {
    //     max-width: 32px;
    //     height: 32px;
    //     top: 10px;
    // }
  }

  & span {
    width: 100%;
    height: 3px;
    border-radius: 3px;
    background-color: @purple80;

    // @media @bw400 {
    //     max-width: 20px;
    //     height: 2px;
    // }
  }

  &:after,
  &:before {
    content: "";
    width: 30px;
    height: 3px;
    border-radius: 3px;
    background-color: @purple80;
    position: absolute;
    transition: all 0.3s;

    // @media @bw400 {
    //     width: 20px;
    //     height: 2px;
    // }
  }

  &:before {
    top: 3px;
  }

  &:after {
    bottom: 3px;
  }

  &--active {
    & span {
      background: transparent;
    }

    &:after {
      top: 45%;
      transform: rotate(-45deg);
    }

    &:before {
      top: 45%;
      transform: rotate(45deg);
    }
  }

  // @media @bw400 {
  //     height: 24px;
  //     max-width: 24px;
  // }
}
</style>
