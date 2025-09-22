<script setup lang="ts">
const modelValue = defineModel<boolean>({ default: false });

interface IProps {
  id?: string;
  text: string;
  name?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  id: "",
  text: "",
  name: "",
});

const handleChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  modelValue.value = input.checked;
};
</script>

<template>
  <div class="base-checkbox">
    <input
      class="base-checkbox__input"
      type="checkbox"
      :id="props.id"
      :name="props.name"
      :checked="modelValue"
      @change="handleChange"
    />
    <label class="base-checkbox__label" :for="props.id">
      {{ props.text }}
    </label>
  </div>
</template>

<style scoped lang="less">
.base-checkbox {
  display: flex;
  align-items: center;

  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  &__input + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
    gap: 12px;
    color: @gray100;
  }

  &__input + label::before {
    content: "";
    display: inline-block;
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid @gray30;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: transparent;
    transition: background-color 0.2s ease;
  }

  &__input + label:hover::before {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuMzMzMDEgOS41MTcyTDQuMTMzMDEgMTIuOTUyMkM0LjIyNjc5IDEzLjA2ODMgNC4zNDY3IDEzLjE2MjggNC40ODM4OSAxMy4yMjg4QzQuNjIxMDggMTMuMjk0NyA0Ljc3MjA0IDEzLjMzMDQgNC45MjU2MyAxMy4zMzMyQzUuMDc5MjEgMTMuMzM2MSA1LjIzMTUgMTMuMzA1OSA1LjM3MTI1IDEzLjI0NUM1LjUxMDk5IDEzLjE4NDIgNS42MzQ2MiAxMy4wOTQxIDUuNzMzMDEgMTIuOTgxNkwxNC42NjYzIDIuNjY2NzUiIHN0cm9rZT0iI0U3RThFQiIgc3Ryb2tlLXdpZHRoPSIxLjI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");
    border-color: @purple70;
  }

  &__input:checked + label::before {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuMzMzMDEgOS41MTcyTDQuMTMzMDEgMTIuOTUyMkM0LjIyNjc5IDEzLjA2ODMgNC4zNDY3IDEzLjE2MjggNC40ODM4OSAxMy4yMjg4QzQuNjIxMDggMTMuMjk0NyA0Ljc3MjA0IDEzLjMzMDQgNC45MjU2MyAxMy4zMzMyQzUuMDc5MjEgMTMuMzM2MSA1LjIzMTUgMTMuMzA1OSA1LjM3MTI1IDEzLjI0NUM1LjUxMDk5IDEzLjE4NDIgNS42MzQ2MiAxMy4wOTQxIDUuNzMzMDEgMTIuOTgxNkwxNC42NjYzIDIuNjY2NzUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=");
    background-color: @purple80;
  }

  &__input + label::before {
    border-color: @gray30;
  }
}
</style>
