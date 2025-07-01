import React from "react";
import { tenencias } from "./tenenciasData";
import Tenencia_responsable from "./Tenencia_responsable";

export default function TenenciaResponsableTab() {
  return (
    <section className="px-6 py-10 md:px-12 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Tenencia Responsable</h2>
        <hr className="border-t border-gray-300 my-8" />
        <div className="space-y-8">
          {tenencias.map((tenencia, index) => (
            <Tenencia_responsable
              key={index}
              index={index}
              img={tenencia.img}
              titulo={tenencia.titulo}
              descripcion={tenencia.descripcion}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 