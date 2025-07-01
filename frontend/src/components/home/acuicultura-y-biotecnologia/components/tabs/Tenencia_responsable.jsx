import React from 'react'

function Tenencia_responsable({ index = 0, img, titulo, descripcion }) {
  const isEven = index % 2 === 0;
  return (
    <div
      className={`flex ${
        isEven ? "flex-col md:flex-row" : "flex-col-reverse md:flex-row-reverse"
      } bg-gray-50 rounded-lg p-5 border border-gray-200 shadow-md`}
    >
      <img src={img} alt={titulo} className="w-full md:w-64 h-64 object-cover rounded mb-4 md:mb-0" />
      <div className="md:mx-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{titulo}</h3>
          <p className="text-sm text-gray-700">{descripcion}</p>
        </div>
        {/* Puedes agregar botones u otros elementos aquí si es necesario */}
      </div>
    </div>
  );
}

export default Tenencia_responsable
