// src/components/tabs/InvestigacionTab.jsx

import React from 'react';

export default function InvestigacionTab() {
  const lineas = [
    'Reproducción y cultivo de especies nativas',
    'Nutrición y dietas sostenibles',
    'Sistemas de recirculación acuícola (RAS)',
    'Acuicultura multitrófica integrada (IMTA)',
    'Biotecnología aplicada a la acuicultura',
  ];

  return (
    <div>
      <h2 className="text-teal-600 text-xl font-bold mb-4">Investigación Aplicada</h2>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-1/2 h-64 bg-gray-200 flex items-center justify-center rounded">
          <span className="text-gray-500">[Imagen]</span>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-gray-700 mb-4">
            Nuestro equipo de investigación trabaja en el desarrollo de soluciones innovadoras...
          </p>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-teal-600 font-semibold mb-2">Líneas de Investigación:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {lineas.map((linea, index) => (
                <li key={index}>{linea}</li>
              ))}
            </ul>
          </div>
          <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
            Ver Publicaciones
          </button>
        </div>
      </div>

      {/* Aquí podrías agregar "Proyectos Destacados" */}
    </div>
  );
}
