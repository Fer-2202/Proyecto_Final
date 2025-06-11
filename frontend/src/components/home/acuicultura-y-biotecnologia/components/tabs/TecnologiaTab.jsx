// src/components/tabs/TecnologiaTab.jsx

import React from 'react';
import { innovaciones } from './../../data/innovacionesData.js';

export default function TecnologiaTab() {
  const tecnologias = [
    {
      name: 'Sistemas de Recirculación (RAS)',
      desc: 'Contamos con sistemas de recirculación acuícola de última generación que permiten un uso eficiente del agua y un control preciso de los parámetros de cultivo, reduciendo el impacto ambiental y optimizando la producción.'
    },
    {
      name: 'Laboratorio de Biotecnología',
      desc: 'Nuestro laboratorio de biotecnología marina está equipado para realizar análisis genéticos, cultivo de microorganismos, extracción de compuestos bioactivos y desarrollo de productos derivados de organismos marinos.'
    },
    {
      name: 'Monitoreo Automatizado',
      desc: 'Implementamos sistemas de monitoreo automatizado con sensores y dispositivos IoT que permiten el seguimiento en tiempo real de los parámetros críticos de cultivo, facilitando la toma de decisiones y la respuesta rápida ante emergencias.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Sección Tecnología */}
      <div>
        <h2 className="text-center text-teal-600 text-xl font-bold mb-6">Tecnología e Innovación</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tecnologias.map((tec, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-start"
            >
              <div className="w-full h-32 bg-gray-100 mb-4 flex items-center justify-center rounded">
                <span className="text-gray-400 text-sm">📷 Imagen</span>
              </div>
              <h3 className="text-teal-600 font-semibold mb-2">{tec.name}</h3>
              <p className="text-gray-700 text-sm">{tec.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sección Innovaciones */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-center text-teal-600 text-xl font-bold mb-6">Innovaciones Desarrolladas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {innovaciones.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-teal-600 text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.desc}</p>
                <p className="text-sm text-teal-500 font-medium">{item.estado}</p>
              </div>
              <div className="mt-4">
                <button className="px-4 py-1 border border-teal-500 text-teal-500 rounded hover:bg-teal-50 transition">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
