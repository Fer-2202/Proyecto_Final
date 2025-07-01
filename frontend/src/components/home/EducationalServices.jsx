import placeholder from "@assets/placeholder.svg";
import visitas from "@assets/img/monitoreo.jpg";
import charla from "@assets/img/pul.jpg";
import taller from "@assets/img/massi.jpg";
import { Link } from "react-router-dom";

const services = [
  {
    img: visitas,
    title: "Visitas Guiadas",
    description:
      "Recorridos educativos con guías especializados en biología marina.",
    tag: "Popular",
    tagColor: "bg-[#1CB6B0] text-white",
    action: "Reservar",
    detail: "Desde ₡3500",
  },
  {
    img: charla,
    title: "Charlas Educativas",
    description: "Presentaciones sobre conservación marina y biodiversidad.",
    action: "Más Info",
    detail: "Grupos escolares",
  },
  {
    img: taller,
    title: "Talleres",
    description: "Actividades prácticas sobre biología marina y conservación.",
    tag: "Nuevo",
    tagColor: "bg-yellow-500 text-white",
    action: "Inscribirse",
    detail: "Todas las edades",
  },
];

export default function EducationalServices() {
  return (
    <section className="py-20 bg-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase">
          Descubre nuestros servicios educativos
        </h2>
        <div className="w-24 h-1 bg-[#1CB6B0] mx-auto my-4 rounded"></div>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Programas diseñados para todas las edades que promueven la educación
          ambiental y la conservación marina
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition"
            >
              <div className="relative">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-48 object-cover"
                />
                {s.tag && (
                  <span
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${s.tagColor}`}
                  >
                    {s.tag}
                  </span>
                )}
              </div>
              <div className="p-6 text-left">
                <h3 className="text-[#1CB6B0] font-bold text-lg mb-1">
                  {s.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{s.description}</p>
                <button className="bg-[#1CB6B0] hover:bg-[#139a95] text-white text-sm px-4 py-2 rounded-md font-medium mb-4">
                  {s.action}
                </button>
                <p className="font-semibold text-gray-800 text-sm">
                  {s.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/exhibiciones-y-servicios/servicios-educativos"
            className="inline-flex items-center gap-2 px-6 py-2 text-[#1CB6B0] border border-[#1CB6B0] rounded-md hover:bg-[#e6f7f6] transition text-sm font-medium"
          >
            Ver todos los servicios educativos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}