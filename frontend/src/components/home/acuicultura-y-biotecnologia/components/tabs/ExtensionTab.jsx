// src/components/tabs/ExtensionTab.jsx

import React from 'react';

export default function ExtensionTab() {
  const servicios = [
    'Cursos y talleres especializados',
    'Asistencia técnica a productores',
    'Capacitación en buenas prácticas',
    'Transferencia tecnológica',
    'Elaboración de manuales y guías',
  ];

  const proyectos = [
    {
      name: 'Desarrollo de Dietas Sostenibles',
      desc: 'Investigación para el desarrollo de dietas acuícolas con menor dependencia de harina y aceite de pescado, utilizando ingredientes alternativos como microalgas, insectos y subproductos agroindustriales.',
      resultados: [
        ''
      ]
    }
  ]

  return (
    <div>
      <h2 className="text-teal-600 text-xl font-bold mb-4">Extensión y Capacitación</h2>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-1/2 h-64 bg-gray-200 flex items-center justify-center rounded">
          <span className="text-gray-500">[Imagen]</span>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-gray-700 mb-4">
            Nuestro programa de extensión acuícola busca transferir conocimientos técnicos...
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

      {/* Aquí puedes agregar "Próximos Cursos y Talleres" */}
    </div>
  );
}
