import { Table, Button, Tooltip, Input, Dropdown, Menu } from "antd";
import { Edit, Trash2, Download } from "lucide-react";
import { useRef, useState } from "react";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

/* ---------- Helpers ---------- */
const isImageUrl = (url) =>
  typeof url === "string" && /\.(jpeg|jpg|gif|png|webp)$/i.test(url);

function AdminTable({
  columns,
  filteredRows,
  handleDelete,
  showModal,
  actionButtonClassName = "",
  tableClassName = "",
  rowClassName = "",
}) {
  console.log("filteredRows in AdminTable:", filteredRows);
  const [searchTexts, setSearchTexts] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(columns.map(c => c.dataIndex));
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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div className="p-2">
        <Input
          placeholder={`Buscar...`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          className="mb-2"
        />
        <Button onClick={() => confirm()} size="small" type="primary" block>
          Buscar
        </Button>
      </div>
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
        render: (val) =>
          isImageUrl(val) ? (
            <img src={val} alt="img" className="w-10 h-10 object-cover rounded" />
          ) : typeof val === "object" ? (
            JSON.stringify(val)
          ) : (
            val
          ),
      })),
    {
      title: "Acciones",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Tooltip title="Editar">
            <Button
              icon={<Edit size={16} />}
              size="small"
              className={`bg-blue-500 hover:bg-blue-600 text-white border-none ${actionButtonClassName}`}
              onClick={() => showModal(record)}
            />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button
              icon={<Trash2 size={16} />}
              size="small"
              danger
              className={`border-none ${actionButtonClassName}`}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  /* ---- Column Toggle Menu ---- */
  const columnMenu = (
    <Menu>
      {columns.map((col) => (
        <Menu.Item key={col.dataIndex}>
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={visibleColumns.includes(col.dataIndex)}
              onChange={(e) => {
                const newCols = e.target.checked
                  ? [...visibleColumns, col.dataIndex]
                  : visibleColumns.filter(c => c !== col.dataIndex);
                setVisibleColumns(newCols);
              }}
            />
            {col.title}
          </label>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="relative">
      <div className="flex justify-end mb-2 gap-2">
        <Button
          icon={<DownloadOutlined />}
          type="primary"
          onClick={exportToExcel}
        >
          Exportar Excel
        </Button>
        <Dropdown overlay={columnMenu} trigger={["click"]}>
          <Button>Columnas</Button>
        </Dropdown>
      </div>

      <Table
        ref={tableRef}
        rowKey="id"
        dataSource={filteredRows}
        columns={enhancedColumns}
        scroll={{ x: true }}
        pagination={{ pageSize: 10 }}
        className={`rounded-lg border border-gray-200 shadow-sm ${tableClassName}`}
        rowClassName={() => `hover:bg-blue-50 ${rowClassName}`}
      />
    </div>
  );
}

export default AdminTable;
