<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from "vue";
import BaseCollapse from "~/components/base/BaseCollapse.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseCheckbox from "~/components/base/BaseCheckbox.vue";
import { useCourseStore } from "~/stores/useCourseStore";

const store = useCourseStore();

const specializationsSeed = ref<string[]>([
  "Программирование",
  "Дизайн",
  "Разработка",
  "Физическая культура",
  "Моделирование",
  "Инноватика",
  "Аналитика больших данных",
  "Радиотехника",
  "Физика",
  "Кибербезопасность",
  "Юриспруденция",
  "Маркетинг",
]);

const humansSeed = ref<string[]>([
  "Абитуриенты",
  "Студенты",
  "Специалисты",
  "Преподаватели",
]);

const pricesSeed = ref<string[]>([
  "Бесплатно",
  "До 10 000 ₽",
  "10 000 – 30 000 ₽",
  "Более 30 000 ₽",
]);

const periodsSeed = ref<string[]>([
  "До 1 месяца",
  "1–3 месяца",
  "3–6 месяцев",
  "Более 6 месяцев",
]);

const docsSeed = ref<string[]>(["Сертификат", "Диплом о переподготовке"]);

const skillsSeed = ref<string[]>([
  "JavaScript",
  "Python",
  "Photoshop",
  "Excel",
  "Знание алгоритмов",
  "Аналитическое мышление",
]);

const hideEmpty = true;

function buildFacet(seed: string[], counter: (title: string) => number) {
  const items = seed.map((title) => ({ title, count: counter(title) }));
  return hideEmpty ? items.filter((i) => i.count > 0) : items;
}

const specializations = computed(() =>
  buildFacet(
    specializationsSeed.value,
    (t) => store.courses.filter((c) => c.category === t).length
  )
);

const humans = computed(() =>
  buildFacet(
    humansSeed.value,
    (t) => store.courses.filter((c) => c.audience === t).length
  )
);

const docs = computed(() =>
  buildFacet(
    docsSeed.value,
    (t) => store.courses.filter((c) => c.doc === t).length
  )
);

const skills = computed(() =>
  buildFacet(
    skillsSeed.value,
    (t) => store.courses.filter((c) => c.tags.includes(t)).length
  )
);

const prices = computed(() =>
  buildFacet(
    pricesSeed.value,
    (bucket) =>
      store.courses.filter((c) => store.priceInBucket(c.price, bucket)).length
  )
);

const periods = computed(() =>
  buildFacet(
    periodsSeed.value,
    (bucket) =>
      store.courses.filter((c) => store.periodInBucket(c.duration, bucket))
        .length
  )
);

const GROUPS = [
  "specializations",
  "humans",
  "prices",
  "periods",
  "docs",
  "skills",
] as const;
type GroupKey = (typeof GROUPS)[number];

const selected = reactive<Record<GroupKey, Set<string>>>({
  specializations: new Set(),
  humans: new Set(),
  prices: new Set(),
  periods: new Set(),
  docs: new Set(),
  skills: new Set(),
});

const isChecked = (group: GroupKey, title: string) =>
  selected[group].has(title);
const onToggle = (group: GroupKey, title: string, checked: boolean) => {
  if (checked) selected[group].add(title);
  else selected[group].delete(title);
  handleCheckboxChange(group, title, checked);
};

const isHiddenSpecs = ref(true);
const isHiddenSkills = ref(true);
const subjectInput = ref("");
const skillInput = ref("");

const filteredSpecializations = computed(() => {
  const q = subjectInput.value.trim().toLowerCase();
  const base = specializations.value;
  return q ? base.filter((s) => s.title.toLowerCase().includes(q)) : base;
});
const visibleSpecializations = computed(() =>
  isHiddenSpecs.value
    ? filteredSpecializations.value.slice(0, 5)
    : filteredSpecializations.value
);

const filteredSkills = computed(() => {
  const q = skillInput.value.trim().toLowerCase();
  const base = skills.value;
  return q ? base.filter((s) => s.title.toLowerCase().includes(q)) : base;
});
const visibleSkills = computed(() =>
  isHiddenSkills.value ? filteredSkills.value.slice(0, 5) : filteredSkills.value
);

function toggleHiddenSpecs() {
  isHiddenSpecs.value = !isHiddenSpecs.value;
}
function toggleHiddenSkills() {
  isHiddenSkills.value = !isHiddenSkills.value;
}

let selectCounter = 0;
const lastSelectedMap = ref<Record<string, number>>({});

function handleCheckboxChange(
  group: GroupKey,
  title: string,
  checked: boolean
) {
  const key = `${group}:::${title}`;
  if (checked) lastSelectedMap.value[key] = ++selectCounter;
  else delete lastSelectedMap.value[key];
}

const checkboxRefs = ref<Record<GroupKey, Record<string, HTMLElement>>>({
  specializations: {},
  humans: {},
  prices: {},
  periods: {},
  docs: {},
  skills: {},
});
function setCheckboxRef(
  el: HTMLElement | null,
  group: GroupKey,
  title: string
) {
  if (!el) return;
  checkboxRefs.value[group][title] = el;
}

const selectedSpecializations = computed(() => [...selected.specializations]);
const selectedHumans = computed(() => [...selected.humans]);
const selectedPrices = computed(() => [...selected.prices]);
const selectedPeriods = computed(() => [...selected.periods]);
const selectedDocs = computed(() => [...selected.docs]);
const selectedSkills = computed(() => [...selected.skills]);

const groups = [
  selectedSpecializations,
  selectedHumans,
  selectedPrices,
  selectedPeriods,
  selectedDocs,
  selectedSkills,
];

const allSelected = computed(() => groups.flatMap((g) => g.value));
const hasSelected = computed(() => allSelected.value.length > 0);

const buttonTop = ref<number | null>(null);
watch(
  lastSelectedMap,
  async () => {
    await nextTick();
    if (!hasSelected.value) {
      buttonTop.value = null;
      return;
    }
    const lastKey = Object.entries(lastSelectedMap.value).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    if (lastKey) {
      const [group, title] = lastKey.split(":::");
      const el = checkboxRefs.value[group as GroupKey]?.[title];
      if (el) buttonTop.value = el.offsetTop;
    }
  },
  { deep: true }
);

function applyFilters() {
  store.setFilters({
    specializations: selectedSpecializations.value,
    humans: selectedHumans.value,
    prices: selectedPrices.value,
    periods: selectedPeriods.value,
    docs: selectedDocs.value,
    skills: selectedSkills.value,
  });
  console.log(store.filteredCourses);
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
          :key="`spec-${spec.title}`"
          :ref="el => setCheckboxRef(el as HTMLElement, 'specializations', spec.title)"
        >
          <BaseCheckbox
            :id="'spec-' + index"
            :text="spec.title"
            :model-value="isChecked('specializations', spec.title)"
            @update:modelValue="
              (val) => onToggle('specializations', spec.title, val)
            "
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
        :key="`human-${human.title}`"
        :ref="el => setCheckboxRef(el as HTMLElement, 'humans', human.title)"
      >
        <BaseCheckbox
          :id="'human-' + index"
          :text="human.title"
          :model-value="isChecked('humans', human.title)"
          @update:modelValue="(val) => onToggle('humans', human.title, val)"
        />
        <span class="sidebar__list-count">{{ human.count }}</span>
      </div>
    </BaseCollapse>

    <BaseCollapse title="Стоимость">
      <div
        class="sidebar__list"
        v-for="(price, index) in prices"
        :key="`price-${price.title}`"
        :ref="el => setCheckboxRef(el as HTMLElement, 'prices', price.title)"
      >
        <BaseCheckbox
          :id="'price-' + index"
          :text="price.title"
          :model-value="isChecked('prices', price.title)"
          @update:modelValue="(val) => onToggle('prices', price.title, val)"
        />
        <span class="sidebar__list-count">{{ price.count }}</span>
      </div>
    </BaseCollapse>

    <BaseCollapse title="Длительность">
      <div
        class="sidebar__list"
        v-for="(period, index) in periods"
        :key="`period-${period.title}`"
        :ref="el => setCheckboxRef(el as HTMLElement, 'periods', period.title)"
      >
        <BaseCheckbox
          :id="'period-' + index"
          :text="period.title"
          :model-value="isChecked('periods', period.title)"
          @update:modelValue="(val) => onToggle('periods', period.title, val)"
        />
        <span class="sidebar__list-count">{{ period.count }}</span>
      </div>
    </BaseCollapse>

    <BaseCollapse title="Документы после прохождения">
      <div
        class="sidebar__list"
        v-for="(doc, index) in docs"
        :key="`doc-${doc.title}`"
        :ref="el => setCheckboxRef(el as HTMLElement, 'docs', doc.title)"
      >
        <BaseCheckbox
          :id="'doc-' + index"
          :text="doc.title"
          :model-value="isChecked('docs', doc.title)"
          @update:modelValue="(val) => onToggle('docs', doc.title, val)"
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
          :key="`skill-${skill.title}`"
          :ref="el => setCheckboxRef(el as HTMLElement, 'skills', skill.title)"
        >
          <BaseCheckbox
            :id="'skill-' + index"
            :text="skill.title"
            :model-value="isChecked('skills', skill.title)"
            @update:modelValue="(val) => onToggle('skills', skill.title, val)"
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
