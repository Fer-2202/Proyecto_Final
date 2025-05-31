import React from 'react'

function MissionCTA() {
  return (
    <section className="bg-teal-600 text-white rounded-md p-8 max-w-7xl mx-auto my-10 text-center">
      <h2 className="text-xl font-semibold mb-4">¡Únete a Nuestra Misión!</h2>
      <p className="mb-6 max-w-3xl mx-auto">
        Ayúdanos a conservar la biodiversidad marina de Costa Rica. Puedes colaborar como voluntario, realizar una donación o participar en nuestros programas educativos.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-teal-600 py-2 px-4 rounded hover:bg-gray-100 transition">
          Ser Voluntario
        </button>
        <button className="bg-white text-teal-600 py-2 px-4 rounded hover:bg-gray-100 transition">
          Hacer una Donación
        </button>
        <button className="bg-white text-teal-600 py-2 px-4 rounded hover:bg-gray-100 transition">
          Programas Educativos
        </button>
      </div>
    </section>
  )
}

export default MissionCTA