import React from "react";
import { Star } from "lucide-react";
import organigramaImg from "@assets/placeholder.svg"; // Cambia la ruta según tu estructura

const testimonios = [
  {
    nombre: "Carlos Rodríguez",
    cargo: "Director de Transparencia Internacional CR",
    texto:
      "El Parque Marino Central del Pacífico Sur es un ejemplo de transparencia institucional. Su portal de transparencia proporciona información clara y accesible sobre su gestión financiera y administrativa.",
    fecha: "Mayo 2023",
    estrellas: 5,
  },
  {
    nombre: "María Fernández",
    cargo: "Auditora Independiente",
    texto:
      "Como auditora, valoro enormemente la calidad y detalle de la información financiera que publica el Parque Marino. Facilita enormemente nuestro trabajo y demuestra un compromiso real con la rendición de cuentas.",
    fecha: "Octubre 2023",
    estrellas: 5,
  },
  {
    nombre: "Roberto Méndez",
    cargo: "Donante Corporativo",
    texto:
      "La transparencia en el uso de los recursos fue un factor determinante para que nuestra empresa decidiera apoyar al Parque Marino. Podemos ver claramente cómo se utilizan nuestras donaciones.",
    fecha: "Enero 2024",
    estrellas: 4,
  },
];

export default function TabOrganigramaTestimonios() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* Organigrama */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
        <h3 className="text-teal-600 font-bold text-lg mb-2">Organigrama Institucional</h3>
        <p className="text-gray-600 text-sm mb-4">
          Conozca la estructura organizativa del Parque Marino y las responsabilidades de cada área.
        </p>
        <img
          src={organigramaImg}
          alt="Organigrama institucional"
          className="w-full rounded-xl border border-gray-100 cursor-zoom-in transition hover:scale-105"
          onClick={() => window.open(organigramaImg, '_blank')}
        />
      </div>

      {/* Testimonios */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
        <h3 className="text-teal-600 font-bold text-lg mb-4">Testimonios</h3>
        <div className="space-y-4">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="border border-gray-100 bg-gray-50 rounded-xl p-4 hover:bg-white transition-all shadow-sm hover:shadow-md"
            >
              <div className="font-semibold text-gray-800 text-base">{t.nombre}</div>
              <div className="text-sm text-gray-500 mb-1">{t.cargo}</div>
              <p className="text-sm text-gray-700 italic mb-3">“{t.texto}”</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex space-x-1 text-yellow-400">
                  {Array.from({ length: t.estrellas }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs">{t.fecha}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
