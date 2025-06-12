import React from "react";
import { FileBadge, CalendarCheck2, Building2, Download } from "lucide-react";

const certificaciones = [
  {
    titulo: "Certificación de Buenas Prácticas Ambientales",
    organizacion: "Ministerio de Ambiente y Energía (MINAE)",
    descripcion:
      "Reconocimiento por cumplimiento de estándares ambientales en la gestión de recursos costeros y marinos.",
    fecha: "05/02/2023",
    tipo: "PDF",
  },
  {
    titulo: "Sello de Transparencia 2023",
    organizacion: "Transparencia Internacional - Capítulo CR",
    descripcion:
      "Certificación otorgada por mantener procesos abiertos de rendición de cuentas y datos públicos.",
    fecha: "10/07/2023",
    tipo: "PDF",
  },
  {
    titulo: "Reconocimiento en Educación Ambiental",
    organizacion: "Organización Mundial de Educación para la Sostenibilidad",
    descripcion:
      "Premio a la excelencia por programas educativos marino-costeros dirigidos a comunidades locales.",
    fecha: "15/11/2023",
    tipo: "PDF",
  },
];

export default function TabCertificaciones() {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="text-teal-600 font-bold text-sm mb-2">Certificaciones y Reconocimientos</h3>
      <p className="text-sm text-gray-600 mb-6">
        A continuación, se presentan los certificados institucionales obtenidos por cumplimiento ambiental, educativo y de transparencia.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificaciones.map((cert, idx) => (
          <div key={idx} className="border rounded-lg p-5 shadow hover:shadow-md transition bg-white">
            <div className="flex items-center gap-2 text-teal-600 font-semibold mb-1">
              <FileBadge size={20} />
              <h4 className="text-base">{cert.titulo}</h4>
            </div>
            <div className="text-sm text-gray-600 mb-2 italic">{cert.organizacion}</div>
            <p className="text-sm text-gray-700 mb-3">{cert.descripcion}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
              <div className="flex gap-2 items-center">
                <CalendarCheck2 size={16} />
                <span>{cert.fecha}</span>
              </div>
              <button className="flex items-center gap-1 text-teal-600 hover:underline text-sm">
                <Download size={16} />
                Descargar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
