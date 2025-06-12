import React from "react";
import { MapPin } from "lucide-react";

export default function TabInformes() {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Línea de tiempo */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-teal-600 font-bold text-sm mb-2">Informes Anuales</h3>
        <p className="text-gray-600 text-sm mb-6">
          Acceda a nuestros informes anuales, donde detallamos nuestras actividades, logros y desafíos.
        </p>
        <div className="border-l-2 border-teal-500 pl-4 space-y-6">
          {informes.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[11px] top-1.5 w-3 h-3 rounded-full bg-teal-500" />
              <span className="text-teal-600 text-sm font-semibold">
                {item.mes} {item.año}
              </span>
              <h4 className="text-sm font-bold text-gray-800">{item.titulo}</h4>
              <p className="text-sm text-gray-600">{item.detalle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mapa de impacto */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-teal-600 font-bold text-sm mb-2">Mapa de Impacto</h3>
        <p className="text-gray-600 text-sm mb-4">
          Visualice geográficamente nuestros proyectos y su impacto en las diferentes regiones.
        </p>
        <div className="relative w-full h-64 bg-cyan-50 rounded overflow-hidden">
          {regiones.map((region, idx) => (
            <div
              key={idx}
              className={`absolute w-6 h-6 rounded-full ${region.color} flex items-center justify-center text-white text-xs font-bold`}
              style={{ top: region.top, left: region.left }}
              title={region.nombre}
            >
              {region.cantidad}
            </div>
          ))}
          {/* Fondo decorativo opcional */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-2xl">
            🧭
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {regiones.map((region, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${region.color}`} />
              <span>{region.nombre} ({region.cantidad})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
