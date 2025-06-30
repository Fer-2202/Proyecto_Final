import { Table, Button, Tooltip, Input, Dropdown, Menu, Badge, Tag, Avatar } from "antd";
import { Edit, Trash2, Download, Filter, MoreHorizontal, Eye, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

/* ---------- Helpers ---------- */
const isImageUrl = (url) =>
  typeof url === "string" && /\.(jpeg|jpg|gif|png|webp)$/i.test(url);

const getStatusColor = (status) => {
  const statusLower = String(status).toLowerCase();
  if (statusLower.includes('activo') || statusLower.includes('active')) return 'green';
  if (statusLower.includes('inactivo') || statusLower.includes('inactive')) return 'red';
  if (statusLower.includes('pendiente') || statusLower.includes('pending')) return 'orange';
  return 'default';
};

function AdminTable({
  columns,
  filteredRows,
  handleDelete,
  showModal,
  activeTab,
  actionButtonClassName = "",
  tableClassName = "",
  rowClassName = "",
}) {
  const [searchTexts, setSearchTexts] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(columns.map(c => c.dataIndex));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const tableRef = useRef();

  /* ---- Exportar CSV/Excel ---- */
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, "tabla_admin.xlsx");
  };

  /* ---- Search por columna ---- */
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className="p-3 bg-white rounded-lg shadow-lg border border-gray-200">
        <Input
          placeholder={`Buscar en ${dataIndex}...`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
      <Filter size={14} className={filtered ? 'text-blue-600' : 'text-gray-400'} />
    ),
    onFilter: (value, record) =>
      String(record[dataIndex]).toLowerCase().includes(value.toLowerCase()),
  });

  /* ---- Columnas con filtros y render inteligente ---- */
  const enhancedColumns = [
    ...columns
      .filter(col => visibleColumns.includes(col.dataIndex))
      .map(col => ({
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
          if (col.dataIndex.toLowerCase().includes('status') || 
              col.dataIndex.toLowerCase().includes('estado')) {
            return (
              <Tag color={getStatusColor(val)}>
                {String(val)}
              </Tag>
            );
          }
          
          // Para campos de fecha
          if (col.dataIndex.toLowerCase().includes('date') || 
              col.dataIndex.toLowerCase().includes('fecha') ||
              col.dataIndex.toLowerCase().includes('created') ||
              col.dataIndex.toLowerCase().includes('updated')) {
            return (
              <span className="text-sm text-gray-600">
                {new Date(val).toLocaleDateString('es-ES')}
              </span>
            );
          }
          
          return (
            <span className="text-gray-900">
              {String(val)}
            </span>
          );
        },
      })),
    {
      title: "Acciones",
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Ver detalles">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
            >
              <Eye size={14} />
            </motion.button>
          </Tooltip>
          
          <Tooltip title="Editar">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors"
              onClick={() => showModal(record)}
            >
              <Edit size={14} />
            </motion.button>
          </Tooltip>
          
          <Tooltip title="Eliminar">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
              onClick={() => handleDelete(activeTab, record.id)}
            >
              <Trash2 size={14} />
            </motion.button>
          </Tooltip>
        </div>
      ),
    },
  ];

  /* ---- Column Toggle Menu ---- */
  const columnMenu = (
    <Menu className="rounded-lg shadow-lg border border-gray-200">
      {columns.map((col) => (
        <Menu.Item key={col.dataIndex}>
          <label className="flex gap-3 items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={visibleColumns.includes(col.dataIndex)}
              onChange={(e) => {
                const newCols = e.target.checked
                  ? [...visibleColumns, col.dataIndex]
                  : visibleColumns.filter(c => c !== col.dataIndex);
                setVisibleColumns(newCols);
              }}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium">{col.title}</span>
          </label>
        </Menu.Item>
      ))}
    </Menu>
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredRows.length} registros encontrados
          </h3>
          {selectedRowKeys.length > 0 && (
            <Badge 
              count={selectedRowKeys.length} 
              className="bg-blue-600"
              text={`${selectedRowKeys.length} seleccionados`}
            />
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            <Download size={16} />
            Exportar
          </motion.button>
          
          <Dropdown overlay={columnMenu} trigger={["click"]} placement="bottomRight">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              <Filter size={16} />
              Columnas
            </motion.button>
          </Dropdown>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table
          ref={tableRef}
          rowKey="id"
          dataSource={filteredRows}
          columns={enhancedColumns}
          scroll={{ x: true }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} de ${total} registros`,
            className: "px-4 py-2"
          }}
          rowSelection={rowSelection}
          className="admin-table"
          rowClassName={(record, index) => 
            `hover:bg-blue-50 transition-colors ${rowClassName} ${
              selectedRowKeys.includes(record.id) ? 'bg-blue-50' : ''
            }`
          }
          size="middle"
        />
      </div>
    </div>
  );
}

export default AdminTable;
