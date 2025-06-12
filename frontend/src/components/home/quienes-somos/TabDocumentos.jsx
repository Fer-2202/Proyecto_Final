import React, { useState } from "react";
import {
  Download,
  Eye,
  Share2,
  FileText,
  FileSpreadsheet,
  File,
} from "lucide-react";

const documentosMock = [
  {
    titulo: "Estados Financieros Auditados 2023",
    descripcion:
      "Estados financieros completos auditados por firma independiente para el período fiscal 2023.",
    fecha: "15/03/2024",
    tipo: "PDF",
    peso: "2.4 MB",
  },
  {
    titulo: "Presupuesto Anual 2024",
    descripcion:
      "Detalle del presupuesto aprobado para el año 2024, incluyendo proyecciones de ingresos y gastos.",
    fecha: "04/01/2024",
    tipo: "EXCEL",
    peso: "1.8 MB",
  },
  {
    titulo: "Memoria Institucional 2023",
    descripcion:
      "Reporte completo de actividades, logros y desafíos del Parque Marino durante el año 2023.",
    fecha: "30/09/2023",
    tipo: "PDF",
    peso: "5.2 MB",
  },
  {
    titulo: "Informe de Impacto Ambiental 2022",
    descripcion:
      "Análisis ambiental detallado del año 2022 sobre las actividades del Parque Marino.",
    fecha: "15/04/2023",
    tipo: "PDF",
    peso: "3.7 MB",
  },
  {
    titulo: "Estatutos de la Fundación",
    descripcion:
      "Documento oficial que establece los objetivos, estructura y normas internas de la organización.",
    fecha: "10/03/2023",
    tipo: "PDF",
    peso: "1.2 MB",
  },
  {
    titulo: "Código de Ética",
    descripcion:
      "Principios y normas que rigen el comportamiento del personal del Parque Marino.",
    fecha: "22/01/2022",
    tipo: "PDF",
    peso: "0.8 MB",
  },
  {
    titulo: "Política de Conservación",
    descripcion:
      "Lineamientos para la conservación y manejo sostenible de recursos marinos y costeros.",
    fecha: "18/03/2023",
    tipo: "PDF",
    peso: "1.5 MB",
  },
  {
    titulo: "Política de Investigación Científica",
    descripcion:
      "Reglas y directrices para la ejecución de investigaciones científicas en el parque.",
    fecha: "17/03/2023",
    tipo: "PDF",
    peso: "1.3 MB",
  },
  {
    titulo: "Informe Trimestral Q1 2024",
    descripcion:
      "Informe de actividades y ejecución presupuestaria del primer trimestre del 2024.",
    fecha: "01/04/2024",
    tipo: "PDF",
    peso: "1.8 MB",
  },
  {
    titulo: "Convenio con Universidad de Costa Rica",
    descripcion:
      "Convenio marco de cooperación entre el Parque Marino y la UCR para proyectos de investigación.",
    fecha: "20/03/2023",
    tipo: "PDF",
    peso: "2.0 MB",
  },
  {
    titulo: "Plan Estratégico 2022-2026",
    descripcion:
      "Plan de acción a mediano plazo que guía las prioridades del parque durante 5 años.",
    fecha: "06/03/2022",
    tipo: "PDF",
    peso: "2.4 MB",
  },
  {
    titulo: "Actas Junta Directiva 2023",
    descripcion:
      "Resumen y acuerdos de las sesiones ordinarias de la junta directiva durante el año 2023.",
    fecha: "19/03/2023",
    tipo: "PDF",
    peso: "3.2 MB",
  },
];

export default function TabDocumentos() {
  const [search, setSearch] = useState("");

  const filtrar = (doc) =>
    doc.titulo.toLowerCase().includes(search.toLowerCase()) ||
    doc.descripcion.toLowerCase().includes(search.toLowerCase());

  const iconoTipo = (tipo) => {
    switch (tipo) {
      case "PDF":
        return <File className="text-red-500 w-5 h-5" />;
      case "EXCEL":
        return <FileSpreadsheet className="text-green-500 w-5 h-5" />;
      default:
        return <FileText className="text-gray-500 w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2"
          placeholder="Buscar documentos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-4">
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option value="">Todas las categorías...</option>
            <option value="Finanzas">Finanzas</option>
            <option value="Ambiental">Ambiental</option>
            <option value="Legal">Legal</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option value="">Todos los tipos...</option>
            <option value="PDF">PDF</option>
            <option value="EXCEL">Excel</option>
          </select>
        </div>
      </div>

      {/* Grid de documentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentosMock.filter(filtrar).map((doc, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 font-semibold text-teal-700 text-sm">
                {iconoTipo(doc.tipo)}
                {doc.titulo}
              </div>
              <span className="text-xs text-white bg-gray-700 rounded px-2 py-0.5">
                {doc.tipo}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{doc.descripcion}</p>
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>{doc.fecha}</span>
              <span>{doc.peso}</span>
            </div>
            <div className="flex gap-3 text-sm">
              <button className="text-teal-600 hover:underline flex items-center gap-1">
                <Eye size={16} /> Ver
              </button>
              <button className="text-teal-600 hover:underline flex items-center gap-1">
                <Download size={16} /> Descargar
              </button>
              <button className="text-teal-600 hover:underline flex items-center gap-1">
                <Share2 size={16} /> Compartir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
