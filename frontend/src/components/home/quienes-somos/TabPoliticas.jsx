import React, { useState } from "react";

export default function TabPoliticas() {
  const [activeIndex, setActiveIndex] = useState(null);

  const politicas = [
    {
      titulo: "Política de Conflicto de Intereses",
      contenido:
        "Esta política establece los lineamientos para identificar y gestionar posibles conflictos de intereses que puedan surgir en el desarrollo de nuestras actividades.",
    },
    {
      titulo: "Código de Ética",
      contenido:
        "Nuestro código de ética establece los principios y valores que guían el comportamiento de todos los miembros de la organización.",
    },
    {
      titulo: "Política de Conservación",
      contenido:
        "Esta política establece los lineamientos para la conservación y manejo sostenible de los recursos marinos y costeros.",
    },
    {
      titulo: "Política de Investigación Científica",
      contenido:
        "Marco normativo para el desarrollo de investigaciones científicas en el parque.",
    },
  ];

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-w-4xl mx-auto hover:shadow-xl transition-all">
      <h3 className="text-teal-600 font-bold text-lg mb-2">Políticas Institucionales</h3>
      <p className="text-sm text-gray-600 mb-6">
        Conozca nuestras políticas y lineamientos que guían nuestro trabajo diario.
      </p>

      <div className="divide-y divide-gray-200">
        {politicas.map((p, i) => (
          <div key={i} className="py-4">
            <button
              onClick={() => toggleIndex(i)}
              className="w-full text-left font-semibold text-gray-800 text-base flex justify-between items-center hover:text-teal-700 transition-all"
            >
              {p.titulo}
              <span className="text-teal-600 text-xl">
                {activeIndex === i ? "−" : "+"}
              </span>
            </button>
            {activeIndex === i && (
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {p.contenido}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
