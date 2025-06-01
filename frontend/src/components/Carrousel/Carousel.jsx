// Carousel.jsx
import { useCarousel } from "./hooks/useCarousel"
import images from "./imgs"
import Slide from "./components/Slide"
import ProgressIndicators from "./components/ProgressIndicators"
import NavigationButtons from "./components/NavigationButtons"
import Dots from "./components/Dots"


function Carousel() {
  const {
    sliderRef,
    instanceRef,
    currentSlide,
    /* progress, */
    handlePause,
    handleResume,
  } = useCarousel(images)

  return (
    <div
      className="relative max-w-full mx-auto overflow-hidden mt-23 h-125"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
    >
      {/* Indicadores de progreso */}
      {/* <ProgressIndicators progress={progress} /> */}

      {/* Slider */}
      <div ref={sliderRef} className="keen-slider h-full ">
        {images.map((img, i) => (
          <Slide key={i} img={img} isActive={i === currentSlide} />
        ))}
      </div>

      {/* Botones de navegación */}
      <NavigationButtons instanceRef={instanceRef} />

      {/* Dots */}
      <Dots images={images} currentSlide={currentSlide} instanceRef={instanceRef} />
    </div>
  )
}

export default Carousel
