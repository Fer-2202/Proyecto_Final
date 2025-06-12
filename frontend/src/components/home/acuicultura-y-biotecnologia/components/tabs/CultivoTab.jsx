// src/components/tabs/CultivoTab.jsx

import React from 'react';
import placeholder from './../../../../../assets/placeholder.svg'
import pargo from "../../../../../assets/img/pargo_manchado.jpg"
import corvina from "../../../../../assets/img/corvina_aguada.jpg"
import ostra from "../../../../../assets/img/original.jpg"
import piangua from "../../../../../assets/img/piangua.jpeg"
import mejillones from "../../../../../assets/img/mejillones.jpg"



export default function CultivoTab() {
  const especies = [
    { name: 'Pargo manchado (Lutjanus guttatus)', desc: 'Este es uno de los peces más destacados en los proyectos de cultivo del Parque Marino.', img: pargo  },
    { name: 'Corvina Aguada', desc: 'Recientemente, se ha informado sobre la entrega de juveniles de corvina para cultivo en granjas marinas.' , img: corvina },
    { name: 'Ostra japonesa (Crassostrea gigas)', desc: 'El cultivo de la ostra japonesa se ha desarrollado con el apoyo de la UNA y otras instituciones.', img: ostra },
    { name: 'Molusco Anadara sp. (piangua o cambute)', desc: 'Se menciona la investigación sobre el cultivo del molusco Anadara sp.',
      img: piangua },
    { name: 'Mejillones', desc: 'Se ha manifestado el interés futuro en el cultivo de mejillones.', img: mejillones },
    { name: 'Camarón marino', desc: 'Costa Rica importa larvas de camarón para la mayoría de su acuicultura desarrolló la tecnología base para la producción en masa de juveniles de camarón' },
  ];

  return (
    <div>
      <h2 className="text-teal-600 text-xl font-bold mb-4">Especies en Cultivo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {especies.map((especie, index) => (
          <div
            key={index}
            className="rounded-lg p-4 shadow-sm bg-white flex flex-col items-start"
          >
            <div className="w-full h-32 bg-gray-200 mb-2 flex items-center justify-center rounded">
              {especie.img ? (<img src={especie.img} alt="" className='w-full h-full object-cover' />):(<span className=''>undefined</span>)}
            </div>
            <h3 className="font-semibold text-teal-600 mb-1">{especie.name}</h3>
            <p className="text-gray-700 text-sm">{especie.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
