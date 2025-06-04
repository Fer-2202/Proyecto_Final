import React from 'react'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Ser Voluntario', href: '/apoyo/voluntariado' },
  { label: 'Hacer una Donación', href: '/donar' },
  { label: 'Programas Educativos', href: '/programas' },
]

function MissionCTA() {
  return (
    <section className="bg-teal-600 text-white rounded-md p-8 max-w-7xl mx-auto my-10 text-center">
      <h2 className="text-xl font-semibold mb-4">¡Únete a Nuestra Misión!</h2>
      <p className="mb-6 max-w-3xl mx-auto">
        Ayúdanos a conservar la biodiversidad marina de Costa Rica. Puedes colaborar como voluntario, realizar una donación o participar en nuestros programas educativos.
      </p>
      <div className="flex justify-center gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className="bg-white text-teal-600 font-semibold rounded-md px-4 py-2 hover:bg-gray-100 transition duration-300" 
          >
            {link.label}
          </Link> 
        ))}
        
      </div>
    </section>
  )
}

export default MissionCTA