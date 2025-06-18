import React from 'react'

function InvestigationTabs({ areas = [], lineas = [], image = null, alt = '' }) {
  return (
    <div className="space-y-20 px-4 md:px-16 py-10">

      {/* Sección Principal */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Imagen */}
        <div className="w-full h-full md:w-1/2 bg-gray-100 flex justify-center items-center rounded-md shadow-sm">
          {image ? (
            <img src={image} alt={alt} className="w-[1200px] h-[470px] object-cover rounded-md" />
          ) : (
            <span className="text-gray-400 text-sm">📷 Imagen</span>
          )}
        </div>

        {/* Descripción */}
        <div className="w-full md:w-1/2 space-y-5">
          <h2 className="text-teal-600 text-2xl font-bold">Áreas de Investigación</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Nuestro programa de investigación se enfoca en diversas áreas relacionadas con la biodiversidad marina,
            la ecología de ecosistemas costeros y marinos, y la conservación de especies amenazadas.
            <br /><br />
            Trabajamos en estrecha colaboración con universidades, centros de investigación y organizaciones de
            conservación, tanto nacionales como internacionales, para desarrollar proyectos que generen información
            científica relevante para la conservación marina.
          </p>

          {/* Lista de áreas */}
          <div className="bg-gray-100 p-5 rounded-md">
            <h3 className="text-teal-700 font-bold text-base mb-2">Principales Áreas:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              {areas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>

          {/* Botón */}
          <button className="bg-teal-500 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-teal-600 transition">
            Conocer Nuestro Equipo
          </button>
        </div>
      </div>

      {/* Líneas de investigación */}
      <div>
        <h2 className="text-teal-600 text-2xl font-bold mb-8 text-center">Nuestras Líneas de Investigación</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lineas.map((linea, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-md px-6 py-6 text-center"
            >
              <div className="flex justify-center mb-4 text-3xl text-teal-500">
                <linea.icon />
              </div>
              <h3 className="text-teal-700 font-bold text-base mb-2">{linea.nombre}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{linea.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InvestigationTabs;
