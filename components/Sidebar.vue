<script setup lang="ts">
import BaseCollapse from "~/components/base/BaseCollapse.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseCheckbox from "~/components/base/BaseCheckbox.vue";

const specializations = ref([
  { title: "Программирование", count: 12 },
  { title: "Дизайн", count: 8 },
  { title: "Разработка", count: 115 },
  { title: "Дизайн", count: 111 },
  { title: "Моделирорование", count: 298 },
  { title: "Инноватика", count: 19 },
  { title: "Аналитика больших данных", count: 20 },
  { title: "Радиотехника", count: 71 },
  { title: "Физика", count: 61 },
  { title: "Кибербезопасность", count: 4 },
  { title: "Юриспруденция", count: 2 },
  { title: "Маркетинг", count: 6 },
]);

const humans = ref([
  { title: "Абитуриенты", count: 4 },
  { title: "Студенты", count: 6 },
  { title: "Специалисты", count: 10 },
  { title: "Преподаватели", count: 3 },
]);

const prices = ref([
  { title: "Бесплатно", count: 7 },
  { title: "До 10 000 ₽", count: 5 },
  { title: "10 000 – 30 000 ₽", count: 9 },
  { title: "Более 30 000 ₽", count: 2 },
]);

const periods = ref([
  { title: "До 1 месяца", count: 6 },
  { title: "1–3 месяца", count: 11 },
  { title: "3–6 месяцев", count: 4 },
  { title: "Более 6 месяцев", count: 3 },
]);

const docs = ref([
  { title: "Сертификат", count: 10 },
  { title: "Диплом о переподготовке", count: 5 },
]);

const skills = ref([
  { title: "JavaScript", count: 12 },
  { title: "Python", count: 8 },
  { title: "Photoshop", count: 4 },
  { title: "Excel", count: 6 },
  { title: "Знание алгоритмов", count: 3 },
  { title: "Аналитическое мышление", count: 100 },
]);

const isHiddenSpecs = ref(true);
const isHiddenSkills = ref(true);

const subjectInput = ref("");
const skillInput = ref("");

const filteredSpecializations = computed(() => {
  if (subjectInput.value) {
    return specializations.value.filter((spec) =>
      spec.title.toLowerCase().includes(subjectInput.value.toLowerCase())
    );
  }
  return specializations.value;
});

const visibleSpecializations = computed(() => {
  return isHiddenSpecs.value
    ? filteredSpecializations.value.slice(0, 5)
    : filteredSpecializations.value;
});

const filteredSkills = computed(() => {
  if (skillInput.value) {
    return skills.value.filter((skill) =>
      skill.title.toLowerCase().includes(skillInput.value.toLowerCase())
    );
  }
  return skills.value;
});

const visibleSkills = computed(() => {
  return isHiddenSkills.value
    ? filteredSkills.value.slice(0, 5)
    : filteredSkills.value;
});

const selectedSpecializations = ref(
  Array(specializations.value.length).fill(false)
);
const selectedHumans = ref(Array(humans.value.length).fill(false));
const selectedPrices = ref(Array(prices.value.length).fill(false));
const selectedPeriods = ref(Array(periods.value.length).fill(false));
const selectedDocs = ref(Array(docs.value.length).fill(false));
const selectedSkills = ref(Array(skills.value.length).fill(false));

function toggleHiddenSpecs() {
  isHiddenSpecs.value = !isHiddenSpecs.value;
}
function toggleHiddenSkills() {
  isHiddenSkills.value = !isHiddenSkills.value;
}

const checkboxRefs = ref<HTMLElement[][]>([]);
function setCheckboxRef(
  el: HTMLElement | null,
  groupIndex: number,
  index: number
) {
  if (!el) return;
  if (!checkboxRefs.value[groupIndex]) {
    checkboxRefs.value[groupIndex] = [];
  }
  checkboxRefs.value[groupIndex][index] = el;
}

let selectCounter = 0;
const lastSelectedMap = ref<Record<string, number>>({});

function handleCheckboxChange(
  groupIdx: number,
  itemIdx: number,
  checked: boolean
) {
  const key = `${groupIdx}-${itemIdx}`;
  if (checked) {
    lastSelectedMap.value[key] = ++selectCounter;
  } else {
    delete lastSelectedMap.value[key];
  }
}

const groups = [
  selectedSpecializations,
  selectedHumans,
  selectedPrices,
  selectedPeriods,
  selectedDocs,
  selectedSkills,
];

const allSelected = computed(() => groups.flatMap((group) => group.value));
const hasSelected = computed(() => allSelected.value.some(Boolean));

const buttonTop = ref<number | null>(null);

watch(
  lastSelectedMap,
  async () => {
    await nextTick();
    if (!hasSelected.value) {
      buttonTop.value = null;
      return;
    }

    let lastKey = Object.entries(lastSelectedMap.value).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    if (lastKey) {
      const [gIdx, iIdx] = lastKey.split("-").map(Number);
      const el = checkboxRefs.value[gIdx]?.[iIdx];
      if (el) {
        buttonTop.value = el.offsetTop;
      }
    }
  },
  { deep: true }
);

function applyFilters() {
  console.log("Применить фильтры");
}
</script>
<template>
  <div class="sidebar">
    <BaseCollapse title="Направление">
      <BaseInput
        name="subject"
        id="subject"
        placeholder="Название направления"
        v-model="subjectInput"
      />
      <div
        v-if="filteredSpecializations.length > 0"
        class="sidebar__list-wrapper"
      >
        <div
          class="sidebar__list"
          v-for="(spec, index) in visibleSpecializations"
          :key="index"
          :ref="(el) => setCheckboxRef(el as HTMLElement, 0, index)"
        >
          <BaseCheckbox
            :id="'spec-' + index"
            :text="spec.title"
            v-model="selectedSpecializations[index]"
            @update:modelValue="(val) => handleCheckboxChange(0, index, val)"
          />
          <span class="sidebar__list-count">{{ spec.count }}</span>
        </div>
      </div>
      <span v-else class="sidebar__not-found">Ничего не нашлось</span>
      <span
        v-if="isHiddenSpecs && filteredSpecializations.length > 5"
        class="sidebar__more"
        @click="toggleHiddenSpecs()"
        >Показать ещё</span
      >
      <span
        v-else-if="!isHiddenSpecs && filteredSpecializations.length > 5"
        class="sidebar__more"
        @click="toggleHiddenSpecs()"
        >Скрыть</span
      >
    </BaseCollapse>

    <BaseCollapse title="Для кого" class="sidebar__audience">
      <div
        class="sidebar__list"
        v-for="(human, index) in humans"
        :key="index"
        :ref="(el) => setCheckboxRef(el as HTMLElement, 1, index)"
      >
        <BaseCheckbox
          :id="'human-' + index"
          :text="human.title"
          v-model="selectedHumans[index]"
          @update:modelValue="(val) => handleCheckboxChange(1, index, val)"
        />
        <span class="sidebar__list-count">{{ human.count }}</span>
      </div>
    </BaseCollapse>

    <BaseCollapse title="Стоимость">
      <div
        class="sidebar__list"
        v-for="(price, index) in prices"
        :key="index"
        :ref="(el) => setCheckboxRef(el as HTMLElement, 2, index)"
      >
        <BaseCheckbox
          :id="'price-' + index"
          :text="price.title"
          v-model="selectedPrices[index]"
          @update:modelValue="(val) => handleCheckboxChange(2, index, val)"
        />
        <span class="sidebar__list-count">{{ price.count }}</span>
      </div>
    </BaseCollapse>

    <BaseCollapse title="Длительность">
      <div
        class="sidebar__list"
        v-for="(period, index) in periods"
        :key="index"
        :ref="(el) => setCheckboxRef(el as HTMLElement, 3, index)"
      >
        <BaseCheckbox
          :id="'period-' + index"
          :text="period.title"
          v-model="selectedPeriods[index]"
          @update:modelValue="(val) => handleCheckboxChange(0, index, val)"
        />
        <span class="sidebar__list-count">{{ period.count }}</span>
      </div>
    </BaseCollapse>

    <BaseCollapse title="Документы после прохождения">
      <div
        class="sidebar__list"
        v-for="(doc, index) in docs"
        :key="index"
        :ref="(el) => setCheckboxRef(el as HTMLElement, 4, index)"
      >
        <BaseCheckbox
          :id="'doc-' + index"
          :text="doc.title"
          v-model="selectedDocs[index]"
          @update:modelValue="(val) => handleCheckboxChange(4, index, val)"
        />
        <span class="sidebar__list-count">{{ doc.count }}</span>
      </div>
    </BaseCollapse>

    <BaseCollapse title="Навыки" :isBottomLine="false" class="sidebar__skills">
      <BaseInput
        name="skill"
        id="skill"
        placeholder="Название навыка"
        v-model="skillInput"
      />
      <div v-if="filteredSkills.length > 0" class="sidebar__list-wrapper">
        <div
          class="sidebar__list"
          v-for="(skill, index) in visibleSkills"
          :key="index"
          :ref="(el) => setCheckboxRef(el as HTMLElement, 5, index)"
        >
          <BaseCheckbox
            :id="'skill-' + index"
            :text="skill.title"
            v-model="selectedSkills[index]"
            @update:modelValue="(val) => handleCheckboxChange(5, index, val)"
          />
          <span class="sidebar__list-count">{{ skill.count }}</span>
        </div>
      </div>
      <span v-else class="sidebar__not-found">Ничего не нашлось</span>
      <span
        v-if="isHiddenSkills && filteredSkills.length > 5"
        class="sidebar__more"
        @click="toggleHiddenSkills()"
        >Показать ещё</span
      >
      <span
        v-else-if="!isHiddenSkills && filteredSkills.length > 5"
        class="sidebar__more"
        @click="toggleHiddenSkills()"
        >Скрыть</span
      >
    </BaseCollapse>
    <button
      v-if="hasSelected && buttonTop !== null"
      class="sidebar__button"
      type="button"
      :style="{ top: buttonTop + 'px' }"
      @click="applyFilters()"
    >
      Применить
    </button>
  </div>
</template>
<style scoped lang="less">
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  width: 100%;
  max-width: 324px;
  background-color: @white;
  padding: 20px;
  border-radius: 24px;

  &__list-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 325px;
    overflow-y: auto;
    max-height: 384px;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: @purple40;
      border-radius: 10px;
    }

    scrollbar-width: thin;
    scrollbar-color: @purple40 transparent;

    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: thin;
    scrollbar-color: @purple40 transparent;
    ::-webkit-scrollbar-button &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }
  }

  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 325px;
    padding-bottom: 16px;

    &:last-child {
      padding-bottom: 0;
    }
  }

  &__list-count {
    font-size: 14px;
    color: @gray60;
  }

  &__more {
    padding-top: 22px;
    font-size: 14px;
    line-height: 20px;
    color: @purple80;
    cursor: pointer;

    &:hover {
      color: @purple70;
    }
  }

  &__not-found {
    font-size: 14px;
    line-height: 20px;
    color: @gray60;
    align-self: flex-start;
  }

  &__button {
    position: absolute;
    z-index: 100;
    right: -48%;
    transform: translateY(-50%);
    width: 100%;
    max-width: 184px;
    padding: 16px 48px;
    line-height: 24px;
    border-radius: 16px;
    background-color: @purple80;
    color: @white;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      left: -8%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 8px;
      border-style: solid;
      border-color: transparent @purple80 transparent transparent;
    }

    &:hover {
      background-color: @purple70;

      &::before {
        border-color: transparent @purple70 transparent transparent;
      }
    }
  }
}
</style>
