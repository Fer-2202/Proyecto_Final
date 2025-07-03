import React, { useState } from "react";
import PropTypes from "prop-types";
import { Eye, Edit, Trash2 } from "lucide-react";

function DashboardTable({ columns, data, loading, onEdit, onDelete, onView }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil((data?.length || 0) / pageSize);
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></span>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 py-8">No hay datos para mostrar.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl shadow border border-gray-100 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-cyan-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.dataIndex || col.key}
                className="px-4 py-3 text-left text-xs font-bold text-cyan-700 uppercase tracking-wider"
              >
                {col.title}
              </th>
            ))}
            {(onEdit || onDelete || onView) && (
              <th className="px-4 py-3 text-xs font-bold text-cyan-700 uppercase tracking-wider text-center">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {paginatedData.map((row, idx) => (
            <tr key={row.id || idx} className="hover:bg-cyan-50 transition">
              {columns.map((col) => {
                let val = row[col.dataIndex];
                // Renderizado especial para imágenes
                if (typeof val === "string" && val.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
                  return (
                    <td key={col.dataIndex} className="px-4 py-2">
                      <img src={val} alt="img" className="h-10 w-10 object-cover rounded-lg border" />
                    </td>
                  );
                }
                // Renderizado especial para booleanos
                if (typeof val === "boolean") {
                  return (
                    <td key={col.dataIndex} className="px-4 py-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${val ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {val ? "Sí" : "No"}
                      </span>
                    </td>
                  );
                }
                // Renderizado especial para estados
                if (col.dataIndex.toLowerCase().includes("status") || col.dataIndex.toLowerCase().includes("estado")) {
                  let color = "bg-gray-100 text-gray-700";
                  if (String(val).toLowerCase().includes("activo") || String(val).toLowerCase().includes("active")) color = "bg-green-100 text-green-700";
                  if (String(val).toLowerCase().includes("inactivo") || String(val).toLowerCase().includes("inactive")) color = "bg-red-100 text-red-700";
                  if (String(val).toLowerCase().includes("pendiente") || String(val).toLowerCase().includes("pending")) color = "bg-yellow-100 text-yellow-700";
                  return (
                    <td key={col.dataIndex} className="px-4 py-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${color}`}>{String(val)}</span>
                    </td>
                  );
                }
                // Renderizado especial para fechas
                if (col.dataIndex.toLowerCase().includes("date") || col.dataIndex.toLowerCase().includes("fecha") || col.dataIndex.toLowerCase().includes("created") || col.dataIndex.toLowerCase().includes("updated")) {
                  return (
                    <td key={col.dataIndex} className="px-4 py-2 text-sm text-gray-600">
                      {val ? new Date(val).toLocaleDateString("es-ES") : "-"}
                    </td>
                  );
                }
                // Renderizado especial para objetos
                if (typeof val === "object" && val !== null) {
                  return (
                    <td key={col.dataIndex} className="px-4 py-2">
                      <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-mono">
                        {JSON.stringify(val).substring(0, 50)}...
                      </span>
                    </td>
                  );
                }
                // Default
                return (
                  <td key={col.dataIndex} className="px-4 py-2 text-gray-900">
                    {String(val)}
                  </td>
                );
              })}
              {(onEdit || onDelete || onView) && (
                <td className="px-4 py-2 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    {onView && (
                      <button
                        title="Ver"
                        className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                        onClick={() => onView(row)}
                      >
                        <Eye size={16} />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        title="Editar"
                        className="p-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600 transition"
                        onClick={() => onEdit(row)}
                      >
                        <Edit size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        title="Eliminar"
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                        onClick={() => onDelete(row)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span className="font-semibold text-cyan-700">
            Página {page} de {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

DashboardTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
};

export default DashboardTable;