import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import placeholder from "@assets/placeholder.svg";
import { useEffect, useRef } from "react";

const placeholderArray = [placeholder, placeholder, placeholder];

function Intro({ data }) {
  const timerRef = useRef(null);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
  });

  // Autoplay
  useEffect(() => {
    if (slider) {
      timerRef.current = setInterval(() => {
        slider.current?.next();
      }, 4000);
    }
    return () => clearInterval(timerRef.current);
  }, [slider]);

  return (
    <div className="grid md:grid-cols-2 gap-6 items-center mb-8">
      <div className="relative rounded-lg border border-gray-300 p-2 bg-gray-100 h-64 overflow-hidden">
        {data[0].imgs?.length > 0 ? (
          <>
            <div ref={sliderRef} className="keen-slider h-full w-full">
              {data[0].imgs.map((img, idx) => (
                <div
                  key={idx}
                  className="keen-slider__slide relative flex items-center justify-center px-2"
                >
                  <img
                    src={img}
                    alt={`Intro ${idx + 1}`}
                    className="h-full w-full object-cover rounded-md shadow border border-gray-200 bg-white"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
                    Imagen {idx + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
              <button
                className="bg-white shadow px-2 py-1 rounded-l text-gray-600 hover:bg-teal-100"
                onClick={() => slider.current?.prev()}
              >
                ←
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
              <button
                className="bg-white shadow px-2 py-1 rounded-r text-gray-600 hover:bg-teal-100"
                onClick={() => slider.current?.next()}
              >
                →
              </button>
            </div>
          </>
        ) : (
          <img src={placeholder} alt="Granjas" className="w-full h-full object-cover" />
        )}
      </div>
      <p className="text-gray-700 text-lg md:text-xl">{data[0].description}</p>
    </div>
  );
}

export default Intro;

