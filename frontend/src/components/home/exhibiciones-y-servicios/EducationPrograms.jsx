// src/components/EducationPrograms.jsx

export default function EducationPrograms() {
  const programs = [
    {
      title: 'Preescolar y Primaria',
      description:
        'Programas educativos adaptados para los más pequeños, con actividades lúdicas y experiencias sensoriales que les permiten conocer el mundo marino de manera divertida.',
      items: [
        'Visitas guiadas interactivas',
        'Talleres de manualidades con materiales reciclados',
        'Cuentacuentos sobre el océano',
        'Juegos educativos',
      ],
      image: '', // Puedes agregar una imagen si quieres
    },
    {
      title: 'Secundaria',
      description:
        'Programas educativos que complementan el currículo escolar, con énfasis en biología, ecología y conservación marina, fomentando el pensamiento crítico y la conciencia ambiental.',
      items: [
        'Visitas guiadas especializadas',
        'Talleres prácticos de biología marina',
        'Charlas sobre conservación',
        'Proyectos de investigación guiados',
      ],
      image: '',
    },
    {
      title: 'Universidad',
      description:
        'Programas educativos avanzados para estudiantes universitarios, con énfasis en investigación científica, conservación y gestión de recursos marinos.',
      items: [
        'Prácticas profesionales',
        'Proyectos de investigación',
        'Talleres especializados',
        'Pasantías en conservación marina',
      ],
      image: '',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Programas para Centros Educativos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col"
          >
            {/* Imagen (opcional) */}
            <div className="h-40 bg-gray-100 flex items-center justify-center rounded mb-4">
              {/* Aquí podrías poner: */}
              {/* <img src={program.image} alt={program.title} className="object-cover w-full h-full rounded" /> */}
              <span className="text-gray-400">[Imagen]</span>
            </div>

            {/* Título */}
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              {program.title}
            </h3>

            {/* Descripción */}
            <p className="text-gray-700 mb-4">{program.description}</p>

            {/* Lista */}
            <ul className="list-disc list-inside mb-6 space-y-1 text-gray-700 text-sm flex-grow">
              {program.items.map((item, idx) => (
                <li key={idx}>{item}</li>
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
