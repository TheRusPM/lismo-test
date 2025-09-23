export default defineNuxtRouteMiddleware((to) => {
  const pageTitle = to.meta.title || "Страница не найдена";

  useHead({
    title: `${pageTitle}`,
  });
});
