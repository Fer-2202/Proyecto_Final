import React from 'react';


export default function QuienesSomos({ title: title, description: description,img: img, alt: alt }) {
  return (
    <div className="relative w-full h-90 flex items-center justify-center bg-gray-400 text-white font-semibold overflow-hidden mb-10">
      {/* Imagen de fondo */}
      <img
        src={img}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Contenido encima */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
        <p className="text-base md:text-2xl mt-2">{description}</p>
      </div>
    </div>
  );
}
