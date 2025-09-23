import { ref } from "vue";

export const useTooltip = () => {
  const tooltipContent = ref<string | null>(null);
  const tooltipPosition = ref({ x: 0, y: 0 });
  const tooltipVisible = ref(false);

  const isOverflowing = (el?: HTMLElement | null) => {
    if (!el) return false;

    const style = window.getComputedStyle(el);

    if (style.whiteSpace === "nowrap") {
      return el.scrollWidth > el.clientWidth;
    }

    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
  };

  const showTooltip = (
    event: MouseEvent,
    content: string,
    element?: HTMLElement
  ) => {
    const targetElement = element || (event.currentTarget as HTMLElement);

    const alwaysShow =
      targetElement?.getAttribute("data-always-show") === "true";

    if (alwaysShow || isOverflowing(targetElement)) {
      tooltipContent.value = content;
      tooltipPosition.value = {
        x: event.clientX,
        y: event.clientY,
      };
      tooltipVisible.value = true;
    }
  };

  const hideTooltip = () => {
    tooltipVisible.value = false;
    tooltipContent.value = null;
  };

  return {
    tooltipContent,
    tooltipPosition,
    tooltipVisible,
    showTooltip,
    hideTooltip,
  };
};
