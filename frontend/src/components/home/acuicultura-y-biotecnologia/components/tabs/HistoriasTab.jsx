// src/components/tabs/HistoriasTab.jsx

import React from 'react';
import { historias as historiasDefault } from '../../data/historiasData.js';

export default function HistoriasTab({ historias = historiasDefault }) {
  return (
    <div className="space-y-8 ">
      <h2 className="text-center text-teal-600 text-xl font-bold">Historias de Éxito</h2>

      {historias.map((historia, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
          {/* Imagen */}
          <div className="w-full h-64 bg-gray-100 rounded overflow-hidden mb-4 flex items-center justify-center">
            {historia.img ? (
              <img
                src={historia.img}
                alt={historia.nombre}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">📷 Imagen</span>
            )}
          </div>

          {/* Cabecera */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-teal-600 font-bold text-lg">{historia.nombre}</h3>
            {historia.estado && (
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">
                {historia.estado}
              </span>
            )}
          </div>

          {/* Descripción */}
          <p className="text-gray-700 text-sm mb-4">{historia.historia}</p>

          {/* Tratamiento */}
          {historia.tratamiento && (
            <div className="bg-gray-100 rounded p-4 text-sm">
              <p className="font-semibold text-teal-600 mb-2">Tratamiento:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {historia.tratamiento.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
