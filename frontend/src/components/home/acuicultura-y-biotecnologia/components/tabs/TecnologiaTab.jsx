// src/components/tabs/TecnologiaTab.jsx

import React from 'react';
import { innovaciones } from './../../data/innovacionesData.js';

export default function TecnologiaTab() {
 const lineas = [
    'Reproducción y cultivo de especies nativas',
    'Nutrición y dietas sostenibles',
    'Sistemas de recirculación acuícola (RAS)',
    'Acuicultura multitrófica integrada (IMTA)',
    'Biotecnología aplicada a la acuicultura',
  ];
  const tecnologias = [
    {
      name: 'Sistemas Biofloc (BFT)',
      desc: 'Esta es una de las tecnologías más prometedoras y aplicadas en Costa Rica. El BFT busca reducir o eliminar la necesidad de recambios de agua en los sistemas de cultivo, promoviendo la formación de flóculos microbianos.'
    },
    {
      name: 'Sistemas de Recirculación en Acuicultura (RAS)',
      desc: 'Aunque pueden ser más costosos de implementar inicialmente, los RAS permiten un control total sobre las condiciones del agua (temperatura, pH, oxígeno, amonio, nitritos, etc.) y una alta densidad de cultivo.'
    },
 /*    {
      name: 'Aquamimicry',
      desc: 'Esta tecnología busca imitar los procesos naturales de un ecosistema acuático saludable, utilizando microorganismos beneficiosos para mejorar la calidad del agua y la salud de los organismos cultivados.'
    } */
  ];

  return (
    <div className="space-y-12">
           {/* INVESTIGACION APLICADA */}
      <div>
        <h2 className="text-teal-600 text-xl font-bold mb-4">Investigación Aplicada</h2>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Imagen */}
          <div className="w-full md:w-1/2 h-64 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-500">Imagen</span>
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2">
            <p className="text-gray-700 mb-4">
              Nuestro equipo de investigación trabaja en el desarrollo de soluciones innovadoras para la producción sostenible de la acuicultura tropical, con énfasis en la sostenibilidad ambiental, la diversificación y adaptación al cambio climático.
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
      </div>

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
