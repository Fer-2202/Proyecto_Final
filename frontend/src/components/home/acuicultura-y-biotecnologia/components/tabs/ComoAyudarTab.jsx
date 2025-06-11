// src/components/tabs/ComoAyudarTab.jsx

import React from 'react';
import { ayudas as ayudasDefault } from '../../data/formasDeAyuda.js';
import * as LucideIcons from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // solo si usas React Router

export default function ComoAyudarTab({ ayudas = ayudasDefault }) {
  const navigate = useNavigate(); // solo si usas rutas internas

  return (
    <div className="space-y-12">
      <h2 className="text-center text-teal-600 text-xl font-bold">¿Cómo Podés Ayudar?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ayudas.map((ayuda, index) => {
          const Icon = LucideIcons[ayuda.icon] || LucideIcons.HelpCircle;

          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="mb-3 text-teal-600">
                  <Icon size={32} />
                </div>
                <h3 className="text-teal-600 font-semibold mb-2">{ayuda.titulo}</h3>
                <p className="text-sm text-gray-700">{ayuda.descripcion}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate(ayuda.enlace)}
                  className="w-full bg-teal-500 text-white py-2 rounded border hover:bg-teal-600 transition"
                >
                  {ayuda.boton}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
