import { onBeforeUnmount } from "vue";

type Overflow = "hidden" | "auto";

const setBodyOverflow = (value: Overflow) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = value;
  }
};

export const useNavbar = () => {
  const isNavbarOpen = useState<boolean>("navbar:isOpen", () => false);

  const open = () => {
    if (!isNavbarOpen.value) {
      isNavbarOpen.value = true;
      setBodyOverflow("hidden");
    }
  };

  const close = () => {
    if (isNavbarOpen.value) {
      isNavbarOpen.value = false;
      setBodyOverflow("auto");
    }
  };

  const toggle = () => {
    isNavbarOpen.value ? close() : open();
  };

  onBeforeUnmount(() => {
    setBodyOverflow("auto");
  });

  return { isNavbarOpen, open, close, toggle };
};
