import React, { useState, useEffect } from "react";
import {
  Download,
  Eye,
  Share2,
  FileText,
  FileSpreadsheet,
  File,
  X,
} from "lucide-react";
import { getDocuments } from "./../../../api/api";
import VisorPDF from "../../../components/VisorPDF";
import { Link } from 'react-router-dom'


export default function TabDocumentos() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const [modalDoc, setModalDoc] = useState(null);
  const porPagina = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const documentosFiltrados = documents
    .filter(
      (doc) =>
        doc.titulo?.toLowerCase().includes(search.toLowerCase()) ||
        doc.description?.toLowerCase().includes(search.toLowerCase())
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
    const url = doc.url;
    const subject = encodeURIComponent(doc.titulo);
    const body = encodeURIComponent(`Puedes consultar el documento aquí: ${url}`);
    const mailto = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailto);
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

      {/* Grid de documentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Cargando documentos...</p>
        ) : documentosPagina.length > 0 ? (
          documentosPagina.map((doc, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 font-semibold text-teal-700 text-sm">
                  {iconoTipo(doc.tipo)}
                  <span className="line-clamp-2 leading-snug">{doc.titulo}</span>
                </div>
                <span className="text-xs text-white bg-teal-600 rounded px-2 py-0.5">
                  {doc.tipo}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{doc.description}</p>
              <div className="flex justify-between text-xs text-gray-500 mb-3">
                <span>{doc.fecha}</span>
                <span>{doc.peso}</span>
              </div>
              <div className="flex gap-3 text-sm">
{/*                 <button
                  className="text-teal-600 hover:underline flex items-center gap-1"
                  onClick={() => setModalDoc(doc)}
                >
                  <Eye size={16} /> Ver
                </button> */}
                <a href="http://127.0.0.1:8000/media/documentos/FWD_-_PROYECTO_FINAL.pdf" target="_blank"
                className="text-teal-600 hover:underline flex items-center gap-1">
                  <Eye size={16} /> Ver
                </a>
                {doc.url && <a
                  href={doc.url}
                  download
                  className="text-teal-600 hover:underline flex items-center gap-1"
                >
                  <Download size={16} /> Descargar
                </a>}
                <button
                  onClick={() => handleCompartir(doc)}
                  className="text-teal-600 hover:underline flex items-center gap-1"
                >
                  <Share2 size={16} /> Compartir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron documentos.</p>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPaginas }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPagina(idx + 1)}
            className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${pagina === idx + 1
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
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full relative shadow-xl">
            <button
              onClick={() => setModalDoc(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h3 className="text-teal-700 font-bold text-lg mb-2">{modalDoc.titulo}</h3>
            <p className="text-sm text-gray-600 mb-4">{modalDoc.description}</p>
            {modalDoc.tipo === "PDF" ? (
              <div className="overflow-y-auto max-h-[75vh]">
                <VisorPDF fileUrl={modalDoc.url} />
              </div>
            ) : (
              <p className="text-sm text-gray-500">Vista previa no disponible para este tipo de archivo.</p>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
