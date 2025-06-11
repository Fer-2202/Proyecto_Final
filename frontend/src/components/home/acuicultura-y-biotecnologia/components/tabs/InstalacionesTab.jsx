// src/components/tabs/InstalacionesTab.jsx

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { hospital, piscinas, areas, espacio_Observarcion, lab_Clinico } from '../../data/instalacionesData';

export default function InstalacionesTab({
  hospitalData = hospital,
  piscinasData = piscinas,
  areasData = areas,
  espacio_ObservarcionData = espacio_Observarcion,
  lab_ClinicoData = lab_Clinico
}) {
  return (
    <div className="space-y-12">
      <h2 className="text-center text-teal-600 text-xl font-bold">Nuestras Instalaciones</h2>

      {/* Hospital y piscinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[hospitalData, piscinasData, espacio_ObservarcionData, lab_ClinicoData].map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-full h-32 bg-gray-100 mb-4 flex items-center justify-center rounded overflow-hidden">
              {section.img ? (
                <img src={section.img} alt={section.titulo} className="object-cover w-full h-full" />
              ) : (
                <span className="text-gray-400 text-sm">📷 Imagen</span>
              )}
            </div>
            <h3 className="text-teal-600 text-lg font-semibold mb-2">{section.titulo}</h3>
            <p className="text-gray-700 text-sm mb-4">{section.descripcion}</p>
            <p className="text-teal-600 font-semibold mb-1">{section.listaTitulo}</p>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Áreas con íconos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {areasData.map((area, index) => {
          const Icon = LucideIcons[area.icon] || LucideIcons.HelpCircle;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4">
              <div className="mb-3 text-teal-600 ">
                <Icon size={32} />
              </div>
              <h3 className="text-teal-600 font-semibold mb-2">{area.nombre}</h3>
              <p className="text-sm text-gray-700">{area.descripcion}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
