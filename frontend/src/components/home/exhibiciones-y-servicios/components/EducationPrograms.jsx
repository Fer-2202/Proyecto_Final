import React, { useEffect, useState } from 'react';
import { getProgramsEducation } from '../../../../api/programsEducation';

export default function EducationPrograms() {
  const [programsData, setProgramsData] = useState([]);

  useEffect(() => {
    getProgramsEducation().then((response) => {
      setProgramsData(response);
    });
  }, []);

  console.log(programsData);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Programas para Centros Educativos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {programsData.map((program) => (
          <div
            key={program.id}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col"
          >
            {/* Imagen (opcional) */}
            <div className="h-40 bg-gray-100 flex items-center justify-center rounded mb-4">
              {program.image ? (
                <img src={program.image} alt={program.title} className="object-cover w-full h-full rounded" />
              ) : (
                <span className="text-gray-400">Sin imagen</span>
              )}
            </div>

            {/* Título */}
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              {program.title}
            </h3>

            {/* Descripción */}
            <p className="text-gray-700 mb-4">{program.description}</p>

            {/* Lista */}
            <ul className="list-disc list-inside mb-6 space-y-1 text-gray-700 text-sm flex-grow">
              {program.items && program.items.map((item) => (
               <li key={item.id}>{item.text}</li>
             ))}
            </ul>

            {/* Botón */}
            <button className="bg-teal-600 text-white w-full py-2 rounded hover:bg-teal-700 transition">
              Más Información
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}