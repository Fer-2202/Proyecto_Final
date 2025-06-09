// src/components/tabs/CultivoTab.jsx

import React from 'react';

export default function CultivoTab() {
  const especies = [
    { name: 'Pargo Manchado', desc: 'Especie de alto valor comercial y gastronómico...' },
    { name: 'Ostra del Pacífico', desc: 'Molusco bivalvo de rápido crecimiento y alta demanda...' },
    { name: 'Corvina Aguada', desc: 'Pez de excelente calidad de carne...' },
    { name: 'Camarón Blanco', desc: 'Sistemas de bajo impacto ambiental y alta eficiencia...' },
    { name: 'Alga Gracilaria', desc: 'Macroalga con múltiples aplicaciones...' },
    { name: 'Chuchecas', desc: 'Molusco bivalvo de gran importancia cultural y económica...' },
  ];

  return (
    <div>
      <h2 className="text-teal-600 text-xl font-bold mb-4">Especies en Cultivo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {especies.map((especie, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col items-start"
          >
            <div className="w-full h-32 bg-gray-200 mb-2 flex items-center justify-center rounded">
              <span className="text-gray-500">[Imagen]</span>
            </div>
            <h3 className="font-semibold text-teal-600 mb-1">{especie.name}</h3>
            <p className="text-gray-700 text-sm">{especie.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
