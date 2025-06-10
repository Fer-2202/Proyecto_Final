// src/components/tabs/EspeciesTab.jsx

import React from 'react';
import { especies as especiesDefault, estadisticas as estadisticasDefault } from '../../data/especiesData.js';

export default function EspeciesTab({ data = especiesDefault, stats = estadisticasDefault }) {
  return (
    <div className="space-y-12">
      {/* Sección de especies */}
      <h2 className="text-center text-teal-600 text-xl font-bold">Especies que Atendemos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow p-4 flex flex-col items-start"
          >
            <div className="w-full h-32 mb-3 flex items-center justify-center rounded overflow-hidden bg-gray-100">
              <img
                src={item.img}
                alt={item.nombre}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-teal-600 font-semibold mb-2">{item.nombre}</h3>
            <p className="text-sm text-gray-700">{item.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Sección de estadísticas */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-center text-teal-600 text-xl font-bold mb-6">Estadísticas de Rescate</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border rounded-lg shadow p-4">
              <p className="text-2xl font-bold text-teal-600">{stat.valor}</p>
              <p className="text-sm text-gray-700 mt-1">{stat.etiqueta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
