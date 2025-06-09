// src/components/tabs/TecnologiaTab.jsx

import React from 'react';

export default function TecnologiaTab() {
  const tecnologias = [
    { name: 'Sistemas de Recirculación (RAS)', desc: 'Contamos con sistemas de recirculación acuícola...' },
    { name: 'Laboratorio de Biotecnología', desc: 'Nuestro laboratorio de biotecnología marina...' },
    { name: 'Monitoreo Automatizado', desc: 'Implementamos sistemas de monitoreo automatizado...' },
  ];

  return (
    <div>
      <h2 className="text-teal-600 text-xl font-bold mb-4">Tecnología e Innovación</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tecnologias.map((tec, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col items-start"
          >
            <div className="w-full h-32 bg-gray-200 mb-2 flex items-center justify-center rounded">
              <span className="text-gray-500">[Imagen]</span>
            </div>
            <h3 className="font-semibold text-teal-600 mb-1">{tec.name}</h3>
            <p className="text-gray-700 text-sm">{tec.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
