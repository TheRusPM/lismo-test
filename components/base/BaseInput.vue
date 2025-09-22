<script setup>
defineProps({
  name: String,
  id: String,
  placeholder: String,
});

const modelValue = defineModel();

function clearInput() {
  modelValue.value = "";
}
</script>
<template>
  <div class="base-input__wrapper">
    <input
      type="text"
      :name="name"
      :placeholder="placeholder"
      :id="id"
      class="base-input"
      v-model="modelValue"
    />
    <nuxt-icon
      v-show="!modelValue"
      name="search"
      class="icon icon-search"
    ></nuxt-icon>
    <nuxt-icon
      v-show="modelValue"
      name="x"
      class="icon icon-x"
      @click="clearInput"
    ></nuxt-icon>
  </div>
</template>
<style scoped lang="less">
.base-input {
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  color: @gray60;
  line-height: 20px;

  &:focus {
    outline: none;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 298px;
    padding: 12px;
    border: 1px solid @gray30;
    border-radius: 8px;
    margin-bottom: 24px;

    &:focus-within {
      border-color: @purple100;
    }

    @media @bw1440 {
      max-width: 260px;
    }

    @media @bw960 {
      max-width: 240px;
    }

    @media @bw960 {
      max-width: 220px;
    }

    @media @bw768 {
      max-width: 210px;
    }

    @media @bw600 {
      max-width: 200px;
    }

    @media @bw400 {
      max-width: 180px;
    }
  }
}

.icon-search:deep(svg),
.icon-search:deep(path),
.icon-x:deep(svg),
.icon-x:deep(path) {
  width: 24px;
  height: 24px;
  color: @gray60;
  fill: none !important;
  cursor: pointer;
}
</style>
