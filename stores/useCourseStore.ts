import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { coursesData } from "~/data/courses";

export interface ICourse {
  id: number;
  title: string;
  category: string;
  audience: string;
  image: string;
  description: string;
  tags: string[];
  duration: string;
  startDate: string;
  price: string;
  doc: string;
  isFavorite: boolean;
}

export interface ActiveFilters {
  specializations: string[];
  humans: string[];
  prices: string[];
  periods: string[];
  docs: string[];
  skills: string[];
}

const defaultCourse: ICourse = {
  id: 0,
  title: "",
  audience: "",
  category: "",
  image: "",
  description: "",
  tags: [],
  duration: "",
  startDate: "",
  price: "",
  doc: "",
  isFavorite: false,
};

export const useCourseStore = defineStore("course", () => {
  const courses = ref<ICourse[]>(coursesData);

  const parsePrice = (s: string): number | null => {
    if (!s) return null;
    const low = s.toLowerCase();
    if (low.includes("бесплатно")) return 0;
    const num = Number(s.replace(/\D+/g, ""));
    return Number.isFinite(num) ? num : null;
  };

  const priceInBucket = (priceStr: string, bucket: string): boolean => {
    const p = parsePrice(priceStr);
    if (bucket === "Бесплатно") return p === 0;
    if (p === null) return false;
    if (bucket === "До 10 000 ₽") return p <= 10000;
    if (bucket === "10 000 – 30 000 ₽") return p > 10000 && p <= 30000;
    if (bucket === "Более 30 000 ₽") return p > 30000;
    return false;
  };

  const parseMonths = (s: string): number => {
    const m = s.match(/\d+/);
    return m ? Number(m[0]) : 0;
  };

  const periodInBucket = (durationStr: string, bucket: string): boolean => {
    const m = parseMonths(durationStr);
    if (bucket === "До 1 месяца") return m <= 1;
    if (bucket === "1–3 месяца") return m >= 1 && m <= 3;
    if (bucket === "3–6 месяцев") return m > 3 && m <= 6;
    if (bucket === "Более 6 месяцев") return m > 6;
    return false;
  };

  const activeFilters = ref<ActiveFilters>({
    specializations: [],
    humans: [],
    prices: [],
    periods: [],
    docs: [],
    skills: [],
  });

  function setFilters(partial: Partial<ActiveFilters>) {
    activeFilters.value = { ...activeFilters.value, ...partial };
  }

  const filteredCourses = computed(() => {
    const f = activeFilters.value;
    return courses.value.filter((c) => {
      const bySpec = f.specializations.length
        ? f.specializations.includes(c.category)
        : true;
      const byHuman = f.humans.length ? f.humans.includes(c.audience) : true;
      const byDoc = f.docs.length ? f.docs.includes(c.doc) : true;
      const byPrice = f.prices.length
        ? f.prices.some((b) => priceInBucket(c.price, b))
        : true;
      const byPeriod = f.periods.length
        ? f.periods.some((b) => periodInBucket(c.duration, b))
        : true;
      const bySkills = f.skills.length
        ? f.skills.some((s) => c.tags.includes(s))
        : true;
      return bySpec && byHuman && byDoc && byPrice && byPeriod && bySkills;
    });
  });

  const getCourseById = (id: number) =>
    computed(
      () => courses.value.find((course) => course.id === id) || defaultCourse
    );

  const toggleFavorite = (courseId: number) => {
    const i = courses.value.findIndex((c) => c.id === courseId);
    if (i !== -1) courses.value[i].isFavorite = !courses.value[i].isFavorite;
  };

  return {
    courses,
    filteredCourses,
    activeFilters,
    setFilters,
    getCourseById,
    toggleFavorite,
    priceInBucket,
    periodInBucket,
  };
});
