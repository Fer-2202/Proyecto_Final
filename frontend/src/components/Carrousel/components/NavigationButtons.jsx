// NavigationButtons.jsx
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

function NavigationButtons({ instanceRef }) {
  return (
    <>
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 dark:bg-black/60 p-2 rounded-full opacity-60 hover:opacity-100 transition"
        aria-label="Anterior"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 dark:bg-black/60 p-2 rounded-full opacity-60 hover:opacity-100 transition"
        aria-label="Siguiente"
      >
        <ChevronRightIcon />
      </button>
    </>
  );
}

export default NavigationButtons;
