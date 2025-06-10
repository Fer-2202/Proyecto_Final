// src/components/tabs/ColaboracionesTab.jsx

import React from 'react';

export default function ColaboracionesTab({ colaboradores = [], redes = [] }) {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 h-64 bg-gray-100 rounded flex items-center justify-center">
          <span className="text-gray-400">📷 Imagen</span>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-teal-600 text-xl font-bold mb-2">Colaboraciones y Alianzas</h2>
          <p className="text-gray-700 mb-4">Colaboramos con universidades, gobiernos, ONGs y centros de investigación.</p>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-teal-600 font-semibold mb-2">Principales Colaboradores:</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {colaboradores.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Proponer Colaboración</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-teal-600 text-lg font-bold text-center">Redes y Consorcios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {redes.map((r, i) => (
            <div key={i} className="bg-white border rounded p-4 shadow flex flex-col justify-between">
              <div>
                <h4 className="text-teal-600 font-semibold">{r.nombre}</h4>
                <p className="text-sm text-gray-700 mb-2">{r.descripcion}</p>
                <p className="text-xs text-gray-500 mb-4">Miembro desde {r.membresia}</p>
              </div>
              <a href={r.enlace} target="_blank" rel="noopener noreferrer" className="text-sm bg-teal-500 text-white px-4 py-1 rounded hover:bg-teal-600 w-fit">Visitar Sitio</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
