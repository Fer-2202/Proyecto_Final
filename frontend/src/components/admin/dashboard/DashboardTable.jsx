import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Table,
  Button,
  Tooltip,
  Input,
  Dropdown,
  Menu,
  Badge,
  Tag,
  Avatar,
  Checkbox,
  Popover,
} from "antd";
import {
  Edit,
  Trash2,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  Copy,
} from "lucide-react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

function DashboardTable({ columns, data, loading, onEdit, onDelete, onView }) {
  const [searchTexts, setSearchTexts] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((c) => c.dataIndex)
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [columnPopoverVisible, setColumnPopoverVisible] = useState(false);
  const tableRef = useRef();

  /* ---- Exportar CSV/Excel ---- */
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, "tabla_admin.xlsx");
  };

  /* ---- Search por columna ---- */
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="p-3 bg-white rounded-lg shadow-lg border border-gray-200">
        <Input
          placeholder={`Buscar en ${dataIndex}...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          className="mb-3"
        />
        <div className="flex gap-2">
          <Button
            onClick={() => confirm()}
            size="small"
            type="primary"
            className="bg-blue-600 hover:bg-blue-700 border-0"
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            className="border-gray-300"
          >
            Limpiar
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <Filter
        size={14}
        className={filtered ? "text-blue-600" : "text-gray-400"}
      />
    ),
    onFilter: (value, record) =>
      String(record[dataIndex]).toLowerCase().includes(value.toLowerCase()),
  });

  /* ---- Helpers para renderizado ---- */
  const isImageUrl = (url) =>
    typeof url === "string" && /\.(jpeg|jpg|gif|png|webp)$/i.test(url);

  const getStatusColor = (status) => {
    const statusLower = String(status).toLowerCase();
    if (statusLower.includes("activo") || statusLower.includes("active"))
      return "green";
    if (statusLower.includes("inactivo") || statusLower.includes("inactive"))
      return "red";
    if (statusLower.includes("pendiente") || statusLower.includes("pending"))
      return "orange";
    return "default";
  };

  /* ---- Columnas con filtros y render inteligente ---- */
  const enhancedColumns = [
    ...columns
      .filter((col) => visibleColumns.includes(col.dataIndex))
      .map((col) => ({
        ...col,
        ...getColumnSearchProps(col.dataIndex),
        render: (val, record) => {
          // Renderizado especial para diferentes tipos de datos
          if (isImageUrl(val)) {
            return (
              <Avatar
                src={val}
                size={40}
                className="border-2 border-gray-200"
              />
            );
          }

          if (typeof val === "boolean") {
            return (
              <Badge
                status={val ? "success" : "error"}
                text={val ? "Sí" : "No"}
              />
            );
          }

          if (typeof val === "object" && val !== null) {
            return (
              <Tag color="blue" className="text-xs">
                {JSON.stringify(val).substring(0, 50)}...
              </Tag>
            );
          }

          // Para campos que podrían ser estados
          if (
            col.dataIndex.toLowerCase().includes("status") ||
            col.dataIndex.toLowerCase().includes("estado")
          ) {
            return <Tag color={getStatusColor(val)}>{String(val)}</Tag>;
          }

          // Para campos de fecha
          if (
            col.dataIndex.toLowerCase().includes("date") ||
            col.dataIndex.toLowerCase().includes("fecha") ||
            col.dataIndex.toLowerCase().includes("created") ||
            col.dataIndex.toLowerCase().includes("updated")
          ) {
            return (
              <span className="text-sm text-gray-600">
                {new Date(val).toLocaleDateString("es-ES")}
              </span>
            );
          }

          return <span className="text-gray-900">{String(val)}</span>;
        },
      })),
  ];

  // Agregar columna de acciones si hay callbacks
  const actionColumn =
    onEdit || onDelete || onView
      ? [
          {
            title: "Acciones",
            key: "actions",
            fixed: "right",
            width: 140,
            render: (_, record) => (
              <div className="flex items-center gap-2">
                {onView && (
                  <Tooltip title="Ver detalles">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                      onClick={() => onView(record)}
                    >
                      <Eye size={14} />
                    </motion.button>
                  </Tooltip>
                )}

                {onEdit && (
                  <Tooltip title="Editar">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors"
                      onClick={() => onEdit(record)}
                    >
                      <Edit size={14} />
                    </motion.button>
                  </Tooltip>
                )}

                {onDelete && (
                  <Tooltip title="Eliminar" color="red">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      onClick={() => onDelete(record)}
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </Tooltip>
                )}
              </div>
            ),
          },
        ]
      : [];

  /* ---- Column Toggle Menu ---- */
  const handleColumnToggle = (columnKey, checked) => {
    const newCols = checked
      ? [...visibleColumns, columnKey]
      : visibleColumns.filter((c) => c !== columnKey);
    setVisibleColumns(newCols);
  };

  const columnPopoverContent = (
    <div className="p-2 min-w-[200px]">
      <div className="text-sm font-medium text-gray-700 mb-3">
        Columnas visibles
      </div>
      <div className="space-y-2">
        {columns.map((col) => (
          <div key={col.dataIndex} className="flex items-center gap-3">
            <Checkbox
              checked={visibleColumns.includes(col.dataIndex)}
              onChange={(e) =>
                handleColumnToggle(col.dataIndex, e.target.checked)
              }
            />
            <span className="text-sm">{col.title}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header de la tabla */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Datos</h3>
          {selectedRowKeys.length > 0 && (
            <span className="text-sm text-gray-500">
              {selectedRowKeys.length} elementos seleccionados
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Exportar */}
          <Tooltip title="Exportar a Excel">
            <Button
              icon={<Download size={16} />}
              onClick={exportToExcel}
              size="small"
              className="border-gray-300"
            >
              Exportar
            </Button>
          </Tooltip>

          {/* Toggle columnas usando Popover */}
          <Popover
            content={columnPopoverContent}
            title={null}
            trigger="click"
            open={columnPopoverVisible}
            onOpenChange={setColumnPopoverVisible}
            placement="bottomRight"
            overlayStyle={{ zIndex: 1000 }}
          >
            <Button
              icon={<Filter size={16} />}
              size="small"
              className="border-gray-300"
            >
              Columnas
            </Button>
          </Popover>
        </div>
      </div>

      {/* Tabla */}
      <Table
        ref={tableRef}
        columns={[...enhancedColumns, ...actionColumn]}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id || record.key}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} elementos`,
        }}
        scroll={{ x: "max-content" }}
        className="dashboard-table"
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        size="middle"
      />
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