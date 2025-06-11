// src/components/tabs/ExtensionTab.jsx

import React from 'react';
import { cursos } from '../../data/cursosData.js';

export default function ExtensionTab() {
  const servicios = [
    'Cursos y talleres especializados',
    'Asistencia técnica a productores',
    'Capacitación en buenas prácticas',
    'Transferencia tecnológica',
    'Elaboración de manuales y guías',
  ];

  return (
    <div className="space-y-12">
      {/* Sección de extensión */}
      <div>
        <h2 className="text-teal-600 text-xl font-bold mb-4">Extensión y Capacitación</h2>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-full md:w-1/2 h-64 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-500">[Imagen]</span>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-gray-700 mb-4">
              Nuestro programa de extensión acuícola busca transferir conocimientos, tecnologías y buenas prácticas a productores, comunidades costeras, estudiantes y profesionales del sector, contribuyendo al desarrollo sostenible de la acuicultura en Costa Rica.
            </p>
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-teal-600 font-semibold mb-2">Servicios de Extensión:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {servicios.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
              Ver Calendario de Actividades
            </button>
          </div>
        </div>
      </div>

      {/* NUEVA SECCIÓN: Próximos Cursos y Talleres */}
      <div>
        <h2 className="text-center text-teal-600 text-xl font-bold mb-6">Próximos Cursos y Talleres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cursos.map((curso, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 relative">
              <div className="absolute top-4 right-4">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  curso.modalidad === 'Presencial' ? 'bg-teal-100 text-teal-700' :
                  curso.modalidad === 'Virtual' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {curso.modalidad}
                </span>
              </div>
              <h3 className="text-teal-600 text-lg font-semibold mb-2">{curso.nombre}</h3>
              <p className="text-sm text-gray-700 mb-1"><strong>Fecha:</strong> {curso.fecha}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>Duración:</strong> {curso.duracion}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>Lugar:</strong> {curso.lugar}</p>
              <p className="text-sm text-gray-700 mb-4"><strong>Costo:</strong> {curso.costo}</p>
              <button className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition">
                Inscribirse
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
