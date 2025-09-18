<script setup lang="ts">
interface IProps {
  isActive?: boolean;
  position?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  isActive: false,
  position: "left",
});
const emit = defineEmits(["toggle"]);
</script>

<template>
  <div
    :class="[
      'burger__wrapper',
      `burger__wrapper--${props.position}`,
      { 'burger__wrapper--color': !props.isActive },
    ]"
    @click="emit('toggle')"
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
  height: 18px;
  max-width: 18px;
  width: 100%;

  &__wrapper {
    max-width: 24px;
    width: 100%;
    height: 24px;
    position: absolute;
    top: 20px;
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &--left {
      left: 16px;

      // @media @bw400 {
      //     left: 12px;
      // }
    }

    &--right {
      right: 16px;

      // @media @bw400 {
      //     right: 12px;
      // }
    }

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
