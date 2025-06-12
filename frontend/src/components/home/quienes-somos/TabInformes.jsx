import React, { useState } from "react";
import { MapPin, FileText } from "lucide-react";

export default function TabInformes() {
  const [expanded, setExpanded] = useState(null);

  const informes = [
    {
      mes: "Enero",
      año: "2023",
      titulo: "Auditoría Financiera Anual",
      detalle:
        "Realización de la auditoría financiera por parte de la firma independiente Deloitte.",
    },
    {
      mes: "Marzo",
      año: "2023",
      titulo: "Publicación de Memoria Anual",
      detalle:
        "Publicación de la memoria institucional con los logros y desafíos del año anterior.",
    },
    {
      mes: "Junio",
      año: "2023",
      titulo: "Actualización de Políticas",
      detalle:
        "Revisión y actualización de las políticas institucionales de conflictos de intereses.",
    },
    {
      mes: "Septiembre",
      año: "2023",
      titulo: "Informe de Impacto Ambiental",
      detalle:
        "Publicación del informe anual de impacto ambiental de nuestras actividades.",
    },
    {
      mes: "Diciembre",
      año: "2023",
      titulo: "Planificación Estratégica",
      detalle: "Aprobación del plan estratégico para el periodo 2024–2028.",
    },
  ];

  const regiones = [
    { nombre: "Pacífico Norte", color: "bg-teal-500", top: "20%", left: "30%", cantidad: 10 },
    { nombre: "Pacífico Central", color: "bg-sky-500", top: "40%", left: "50%", cantidad: 12 },
    { nombre: "Pacífico Sur", color: "bg-indigo-500", top: "60%", left: "70%", cantidad: 8 },
    { nombre: "Caribe Norte", color: "bg-yellow-400", top: "30%", left: "80%", cantidad: 6 },
    { nombre: "Caribe Sur", color: "bg-orange-500", top: "60%", left: "20%", cantidad: 5 },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 font-sans">
      {/* Línea de tiempo */}
      <article className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-teal-700 mb-2">Informes Anuales</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Acceda a nuestros informes anuales, donde detallamos nuestras actividades, logros y desafíos.
          </p>
        </header>
        <div className="border-l-2 border-teal-500 pl-4 space-y-6">
          {informes.map((item, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <div className="absolute -left-[11px] top-1.5 w-3 h-3 rounded-full bg-teal-500" />
              <span className="text-teal-600 text-sm font-semibold ml-3">
                {item.mes} {item.año}
              </span>
              <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FileText size={16} /> {item.titulo}
              </h4>
              {expanded === idx && (
                <p className="text-sm text-gray-600 mt-1 transition-all">
                  {item.detalle}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      {/* Mapa de impacto */}
      <article className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-teal-700 mb-2">Mapa de Impacto</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Visualice geográficamente nuestros proyectos y su impacto en las diferentes regiones.
          </p>
        </header>
        <div className="relative w-full h-64 bg-cyan-50 rounded-xl overflow-hidden border border-gray-200">
          {regiones.map((region, idx) => (
            <div
              key={idx}
              className={`absolute w-7 h-7 rounded-full ${region.color} flex items-center justify-center text-white text-xs font-bold shadow-md hover:scale-110 transition-all`}
              style={{ top: region.top, left: region.left }}
              title={`${region.nombre}: ${region.cantidad} proyectos`}
            >
              {region.cantidad}
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl">
            🧭
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
          {regiones.map((region, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${region.color}`} />
              <span className="text-gray-700">
                {region.nombre} <span className="text-gray-500">({region.cantidad})</span>
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
