import React, { useState } from "react";
import {
  Download,
  Eye,
  Share2,
  FileText,
  FileSpreadsheet,
  File,
  X
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
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const [modalDoc, setModalDoc] = useState(null);
  const porPagina = 6;

  const documentosFiltrados = documentosMock
    .filter((doc) =>
      doc.titulo.toLowerCase().includes(search.toLowerCase()) ||
      doc.descripcion.toLowerCase().includes(search.toLowerCase())
    )
    .filter((doc) => (tipoFiltro ? doc.tipo === tipoFiltro : true));

  const totalPaginas = Math.ceil(documentosFiltrados.length / porPagina);
  const documentosPagina = documentosFiltrados.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

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

  const handleCompartir = (doc) => {
    const loggedIn = true; // simulado
    const userEmail = "usuario@ejemplo.com";
    const url = window.location.href;
    if (loggedIn) {
      const mailto = `mailto:${userEmail}?subject=${encodeURIComponent(
        doc.titulo
      )}&body=${encodeURIComponent(`Puedes consultar el documento aquí: ${url}`)}`;
      window.open(mailto);
    } else {
      if (navigator.share) {
        navigator.share({
          title: doc.titulo,
          text: doc.descripcion,
          url,
        });
      } else {
        alert("Compartir no soportado en este navegador.");
      }
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl font-sans">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Buscar documentos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-4">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
          >
            <option value="">Todos los tipos...</option>
            <option value="PDF">PDF</option>
            <option value="EXCEL">Excel</option>
          </select>
        </div>
      </div>

      {/* Grid de documentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentosPagina.map((doc, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 font-semibold text-teal-700 text-sm">
                {iconoTipo(doc.tipo)}
                <span className="line-clamp-2 leading-snug">
                  {doc.titulo}
                </span>
              </div>
              <span className="text-xs text-white bg-teal-600 rounded px-2 py-0.5">
                {doc.tipo}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {doc.descripcion}
            </p>
            <div className="flex justify-between text-xs text-gray-500 mb-3">
              <span>{doc.fecha}</span>
              <span>{doc.peso}</span>
            </div>
            <div className="flex gap-3 text-sm">
              <button
                className="text-teal-600 hover:underline flex items-center gap-1"
                onClick={() => setModalDoc(doc)}
              >
                <Eye size={16} /> Ver
              </button>
              <a
                href="/path/to/document.pdf"
                download
                className="text-teal-600 hover:underline flex items-center gap-1"
              >
                <Download size={16} /> Descargar
              </a>
              <button
                onClick={() => handleCompartir(doc)}
                className="text-teal-600 hover:underline flex items-center gap-1"
              >
                <Share2 size={16} /> Compartir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPaginas }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPagina(idx + 1)}
            className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
              pagina === idx + 1
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Modal de vista previa */}
      {modalDoc && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full relative shadow-xl">
            <button
              onClick={() => setModalDoc(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h3 className="text-teal-700 font-bold text-lg mb-2">{modalDoc.titulo}</h3>
            <p className="text-sm text-gray-600 mb-4">{modalDoc.descripcion}</p>
            <iframe
              src="/path/to/document.pdf"
              className="w-full h-64 border rounded"
              title="Vista previa"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}



