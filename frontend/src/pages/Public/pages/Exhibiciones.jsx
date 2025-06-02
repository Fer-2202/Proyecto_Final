import React from 'react'
import bgImage from '../../../assets/img/Tanque.jpeg';

function Exhibiciones() {
  return (
    <div>
      <div className="relative w-full h-64 flex items-center justify-center bg-gray-400 text-white font-semibold overflow-hidden">
        {/* Imagen de fondo */}
        <img
          src={bgImage}
          alt="Exhibiciones"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      
        {/* Contenido encima */}
        <div className="relative z-10 text-center px-4">
          <h2 className="text-2xl md:text-4xl font-bold">Exhibiciones</h2>
          <p className="text-base md:text-lg mt-2">Descubre la dioversidad marina de Costa Rica</p>
        </div>
    
        {/* img mas oscura */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        </div>
    </div>
  )
}

export default Exhibiciones
