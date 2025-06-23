import { Button, Table } from "antd";
import { Edit, Trash2 } from "lucide-react";

function AdminTable({ columns, filteredRows, handleDelete, showModal, actionButtonClassName = "", tableClassName = "", rowClassName = "",  }) {
  return (
    <Table
      rowKey="id"
      dataSource={filteredRows}
      columns={columns}
      scroll={{ x: true }}
      className={`rounded-lg border border-gray-200 shadow ${tableClassName}`}
      pagination={{ pageSize: 10 }}
      rowClassName={() => rowClassName}
    />
  );
}

export default AdminTable;