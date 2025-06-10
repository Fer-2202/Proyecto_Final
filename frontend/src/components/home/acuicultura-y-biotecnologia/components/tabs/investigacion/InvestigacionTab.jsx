import React from 'react'

function InvestigacionTab({areas = [], lineas = [], image = null, alt = ''}) {
  return (
    <div className='space-y-10'>
      
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-1/2 h-64 bg-gray-100 flex justify-center items-center rounded'>
          {image ? <img src={image} alt={alt} className='w-full object-cover rounded'/> : <span className='text-gray-400'>📷 Imagen</span>}
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-teal-600 text-xl font-bold mb-2">Áreas de Investigación</h2>
          <p className="text-gray-700 mb-4">
            Nuestro programa de investigación se enfoca en biodiversidad marina, conservación de especies y monitoreo de ecosistemas. 
            Colaboramos con universidades y centros de investigación a nivel nacional e internacional.
          </p>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-teal-600 font-semibold mb-2">Principales Áreas:</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {areas.map((area, i) => <li key={i}>{area}</li>)}
            </ul>
          </div>
          <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
            Conocer Nuestro Equipo
          </button>
        </div>

        <div>
        <h2 className="text-teal-600 text-xl font-bold mb-6">Nuestras Líneas de Investigación</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lineas.map((linea, index) => (
            <div key={index} className="bg-white border rounded-lg shadow p-6">
              <div className="mb-3 text-teal-600">
                <linea.icon size={32} />
              </div>
              <h3 className="text-teal-600 font-semibold mb-2">{linea.nombre}</h3>
              <p className="text-sm text-gray-700">{linea.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
      
      </div>
    </div>
  )
}

export default InvestigacionTab
