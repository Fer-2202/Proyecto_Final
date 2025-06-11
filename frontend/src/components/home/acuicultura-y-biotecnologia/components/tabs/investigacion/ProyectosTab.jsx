// src/components/tabs/ProyectosTab.jsx

import React from 'react';

export default function ProyectosTab({ proyectos = [] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-center text-teal-600 text-xl font-bold">Proyectos Actuales</h2>
      {proyectos.map((p, i) => (
        <div key={i} className="bg-white  rounded-lg shadow p-6 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4 h-32 bg-gray-100 flex items-center justify-center rounded">
            {p.img ? <img src={p.img} alt={p.titulo} className="object-cover w-full h-full" /> : <span className="text-gray-400">📷</span>}
          </div>
          <div className="w-full">
            <h3 className="text-teal-600 font-semibold">{p.titulo}</h3>
            <p className="text-sm text-gray-700 mb-2">{p.descripcion}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {p.tags.map((tag, j) => (
                <span key={j} className="text-xs bg-teal-100 text-teal-700 font-medium px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-3">Duración: {p.duracion}</p>
            <button className="text-sm bg-teal-500 text-white px-4 py-1 rounded hover:bg-teal-600">Más Información</button>
          </div>
        </div>
      ))}
    </div>
  );
}
