// Dots.jsx
function Dots({ images, currentSlide, instanceRef }) {
    return (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 space-x-2 flex">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === idx
                ? "bg-white dark:bg-blue-400"
                : "bg-white/50 dark:bg-white/30"
            }`}
            aria-label={`Slide ${idx + 1}`}
            aria-pressed={currentSlide === idx}
          />
        ))}
      </div>
    )
  }
  
  export default Dots
  