import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { ActiveFilters } from "~/stores/useCourseStore";

export const useFilterStore = defineStore("filters", () => {
  const filters = ref([
    { title: "specializations", tags: [] as string[] },
    { title: "humans", tags: [] as string[] },
    { title: "prices", tags: [] as string[] },
    { title: "periods", tags: [] as string[] },
    { title: "docs", tags: [] as string[] },
    { title: "skills", tags: [] as string[] },
  ]);

  const deletedFilter = ref({ title: "", cat: "" });
  const isVisible = ref(false);

  const visibleFilters = computed(() =>
    filters.value.flatMap((f) => f.tags.map((tag) => ({ title: f.title, tag })))
  );

  const isEmpty = computed(() =>
    filters.value.every((f) => f.tags.length === 0)
  );

  const changeVisibility = (value: boolean) => {
    isVisible.value = value;
  };

  const addFilter = (value: string, cat: string) => {
    const i = filters.value.findIndex((f) => f.title === cat);
    if (i !== -1 && !filters.value[i].tags.includes(value)) {
      filters.value[i].tags.push(value);
    }
  };

  const deleteFilter = (value: string, cat: string) => {
    const i = filters.value.findIndex((f) => f.title === cat);
    if (i !== -1) {
      filters.value[i].tags = filters.value[i].tags.filter((t) => t !== value);
    }
    deletedFilter.value.title = value;
    deletedFilter.value.cat = cat;
    if (isEmpty.value) isVisible.value = false;
  };

  const setFromCourseFilters = (f: ActiveFilters) => {
    const map: Record<keyof ActiveFilters, string[]> = {
      specializations: f.specializations ?? [],
      humans: f.humans ?? [],
      prices: f.prices ?? [],
      periods: f.periods ?? [],
      docs: f.docs ?? [],
      skills: f.skills ?? [],
    };
    filters.value = Object.entries(map).map(([title, tags]) => ({
      title,
      tags: [...tags],
    })) as any;
    isVisible.value = !isEmpty.value;
  };

  const toActiveFilters = (): ActiveFilters => {
    const get = (key: keyof ActiveFilters) =>
      filters.value.find((f) => f.title === key)?.tags ?? [];
    return {
      specializations: get("specializations"),
      humans: get("humans"),
      prices: get("prices"),
      periods: get("periods"),
      docs: get("docs"),
      skills: get("skills"),
    };
  };

  return {
    filters,
    visibleFilters,
    deletedFilter,
    isVisible,
    isEmpty,
    addFilter,
    deleteFilter,
    changeVisibility,
    setFromCourseFilters,
    toActiveFilters,
  };
});
