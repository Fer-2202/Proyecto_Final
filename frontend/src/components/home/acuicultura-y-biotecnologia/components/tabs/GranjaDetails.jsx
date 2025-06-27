import placeholder from "../../../../../assets/placeholder.svg";

function GranjaDetails({ granja, onClose }) {
  return (
    <div className="rounded-lg p-6 mb-8">
      <button className="mb-4 text-teal-600 hover:underline" onClick={onClose}>
        ← Volver a la lista
      </button>
      {granja.nombre === "Granja MUDECOOP" ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 mt-4">Avances del proyecto:</h1>
          <div className="gap-4 justify-center flex">
            {[granja.avance, granja.avance2, granja.avance3].map((avance, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-4 w-64 flex flex-col items-center justify-start border border-teal-200 hover:shadow-xl transition-shadow duration-200"
              >
                <img
                  src={avance.img}
                  alt={`Avance ${idx + 1}`}
                  className="object-contain h-32 w-32 mb-4 rounded-md border border-gray-200 bg-gray-50"
                />
                <p className="text-base font-medium text-gray-800 text-center">
                  {avance.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 mt-4">Especies cultivadas:</h1>
          <div className="items-center">
            <div className="flex gap-4 justify-center flex-wrap">
              {granja.img_species_cultivadas?.map((img, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 rounded-lg shadow p-2 w-50 h-50 flex items-center justify-center"
                >
                  <img src={img} alt={`Especie ${idx + 1}`} className="object-contain h-42 w-42" />
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-4 mt-4">Abastecimiento:</h1>
              <div className="flex flex-col md:flex-row items-center md:items-start shadow-lg p-4 gap-4">
                <img
                  src={granja.abaste}
                  alt={granja.nombre}
                  className="object-contain h-42 w-42"
                />
                <p className="text-lg font-semibold text-gray-700">
                  {granja.abaste_desc}
                </p>
              </div>
            </div>
            {granja.turismo_imgs && granja.turismo_desc && (
              <div>
                <h1 className="text-2xl font-bold mb-4 mt-4">Turismo:</h1>
                <div className="shadow-lg py-4 px-4">
                  <div className="flex gap-6 flex-wrap justify-center">
                    {granja.turismo_imgs.map((img, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 rounded-lg shadow p-2 w-48 h-48 flex items-center justify-center"
                      >
                        <img
                          src={img}
                          alt={`Turismo ${idx + 1}`}
                          className="object-contain h-42 w-42"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-lg font-semibold mt-4 text-gray-700">
                    {granja.turismo_desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default GranjaDetails;
