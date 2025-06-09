import React from 'react';
import placeholderImage from '../../../assets/img/_MG_0086.jpg';

export default function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Contenedor principal con dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Texto historia */}
        <div>
          <h2 className="text-teal-600 text-2xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            El Parque Marino Central del Pacífico Sur fue fundado en 1994 como una iniciativa para la conservación de la biodiversidad marina de Costa Rica. Desde entonces, nos hemos dedicado a la investigación, educación y conservación de los ecosistemas marinos y costeros del país.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            A lo largo de los años, hemos desarrollado programas de rescate y rehabilitación de especies marinas, investigación científica y educación ambiental, convirtiéndonos en un referente en la conservación marina en Centroamérica.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Actualmente, el Parque Marino alberga diversas especies de fauna marina y cuenta con instalaciones modernas para la investigación y la educación ambiental, recibiendo miles de visitantes cada año.
          </p>
        </div>

        {/* Imagen */}
        <div>
          <div className="w-full h-50 sm:h-72 md:h-80 lg:h-full rounded-lg shadow-md bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={placeholderImage}
              alt="Imagen Parque Marino"
              className="object-cover w-full h-[315px]"
            />
          </div>
        </div>
      </div>

      {/* Misión y Visión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Misión */}
        <div className="border border-teal-400 rounded-lg p-6">
          <h3 className="text-teal-600 text-xl font-semibold mb-3">Misión</h3>
          <p className="text-gray-700 leading-relaxed">
            Conservar la biodiversidad marina y costera de Costa Rica a través de la investigación científica, la educación ambiental y la implementación de programas de conservación, promoviendo el uso sostenible de los recursos marinos y la conciencia ambiental en la sociedad.
          </p>
        </div>

        {/* Visión */}
        <div className="border border-teal-400 rounded-lg p-6">
          <h3 className="text-teal-600 text-xl font-semibold mb-3">Visión</h3>
          <p className="text-gray-700 leading-relaxed">
            Ser un centro de referencia internacional en la conservación marina, reconocido por su excelencia en la investigación científica, la educación ambiental y la implementación de programas de conservación, contribuyendo significativamente a la protección de los ecosistemas marinos y costeros de Costa Rica.
          </p>
        </div>
      </div>
    </section>
  );
}
