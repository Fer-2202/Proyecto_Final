import React from "react";

export default function TransparenciaHero({
  title = "Transparencia",
  subtitle = "Comprometidos con la rendición de cuentas y la gestión responsable",
  buttons = [],
  cards = [],
  bgImage = "",
  alt = "Fondo de transparencia"
}) {
  return (
    <section className="w-full relative">
      {/* Imagen de fondo */}
      {bgImage && (
        <img
          src={bgImage}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Contenido encima */}
      <div className="relative z-10 max-w-6xl mx-auto py-20 px-4 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-8">{subtitle}</p>

        {/* Botones */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              className={`px-6 py-2 rounded-md font-semibold transition ${
                btn.primary
                  ? "bg-white text-teal-600 hover:bg-teal-100"
                  : "border border-white hover:bg-white hover:text-teal-600"
              }`}
            >
              {btn.text}
            </button>
          ))}
        </div>

        {/* Cards dentro del fondo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-black">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white bg-opacity-90 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">{card.icon || "📄"}</div>
              <h3 className="text-lg font-bold mb-1">{card.title}</h3>
              <p className="text-sm text-gray-700">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
