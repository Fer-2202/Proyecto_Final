// src/components/EducationalMaterials.jsx

export default function EducationalMaterials({ data }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Materiales Educativos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition flex flex-col"
          >
            {/* Imagen */}
            <div className="h-40 bg-gray-100 flex items-center justify-center rounded-t">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full rounded-t"
                />
              ) : (
                <span className="text-gray-400">[Imagen]</span>
              )}
            </div>

            {/* Text content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-teal-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 mb-4 flex-grow">{item.description}</p>

              {/* Botón */}
              <a
                href={item.downloadLink}
                className="border border-teal-600 text-teal-600 text-center py-2 rounded hover:bg-teal-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Descargar
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
