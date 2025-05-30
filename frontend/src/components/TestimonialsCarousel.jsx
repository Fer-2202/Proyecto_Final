import { useCarousel } from "../components/Carrousel/hooks/useCarousel";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import placeholder from "../assets/placeholder.svg";

const testimonials = [
  {
    name: "María Rodríguez",
    role: "Visitante",
    text: "Una experiencia increíble para toda la familia. Los niños aprendieron mucho sobre la vida marina y la importancia de su conservación. ¡Definitivamente volveremos!",
    image: placeholder,
    rating: 5,
  },
  {
    name: "Carlos Méndez",
    role: "Turista",
    text: "El personal fue muy amable y los acuarios están muy bien cuidados. Aprendí mucho sobre especies que no conocía.",
    image: placeholder,
    rating: 4,
  },
  {
    name: "Ana Sofía López",
    role: "Visitante",
    text: "Excelente lugar para pasar el día. Todo está muy bien organizado y limpio.",
    image: placeholder,
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const {
    sliderRef,
    instanceRef,
    currentSlide,
    progress,
    handlePause,
    handleResume,
  } = useCarousel(testimonials);

  return (
    <section className="bg-[#f8f9fa] py-20 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase">Lo que dicen nuestros visitantes</h2>
        <div className="w-20 h-1 bg-[#1CB6B0] mx-auto my-4 rounded"></div>
        <p className="text-gray-600 mb-10">Experiencias de quienes han disfrutado del Parque Marino</p>

        <div ref={sliderRef} className="keen-slider relative">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="keen-slider__slide flex flex-col items-center justify-center max-w-2xl mx-auto px-4"
              onMouseEnter={handlePause}
              onMouseLeave={handleResume}
            >
              <Quote className="w-12 h-12 text-[#bdecee] mb-6" />
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full border-4 border-[#1CB6B0] mb-6 object-cover"
              />
              <p className="italic text-gray-700 mb-6">{item.text}</p>
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.role}</p>
              <div className="flex mt-2 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-400 text-xl ${i < item.rating ? "" : "opacity-30"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Controles manuales */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {progress.map((p, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-[#1CB6B0]/30 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#1CB6B0] rounded-full"
                  style={{ width: `${p * 100}%`, transition: "width 0.2s" }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}