// src/components/tabs/PublicacionesTab.jsx

import React from 'react';

export default function PublicacionesTab({ publicaciones = [], stats = {} }) {
  return (
    <div className="space-y-8">
      <h2 className="text-center text-teal-600 text-xl font-bold">Publicaciones Científicas</h2>
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        {publicaciones.map((pub, i) => (
          <div key={i} className="text-sm">
            <p className="text-gray-800 font-semibold">{pub.autores} <span className="font-normal text-gray-600">({pub.anio}).</span></p>
            <a href={pub.enlace || '#'} className="text-teal-600 hover:underline">{pub.titulo}</a>
            <p className="text-gray-500 text-xs">{pub.revista}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 text-center gap-6">
        <div><p className="text-2xl text-teal-600 font-bold">{stats.articulos || '45+'}</p><p className="text-sm">Artículos publicados</p></div>
        <div><p className="text-2xl text-teal-600 font-bold">{stats.tesis || '12'}</p><p className="text-sm">Tesis</p></div>
        <div><p className="text-2xl text-teal-600 font-bold">{stats.libros || '8'}</p><p className="text-sm">Libros y capítulos</p></div>
      </div>
      <div className="text-center">
        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">Ver Todas las Publicaciones</button>
      </div>
    </div>
  );
}
