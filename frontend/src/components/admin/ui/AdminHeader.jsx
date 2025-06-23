import { Input, Button } from "antd";
import { Search, Plus } from "lucide-react";

function AdminHeader({ searchTerm, setSearchTerm, showModal }) {
  return (
    <div className="bg-white shadow-md border-b border-gray-200 px-10 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Buscar..."
            prefix={<Search size={16} />}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="rounded-md shadow-sm focus:ring-2 focus:ring-teal-500"
            style={{ width: 220 }} />
          <Button
            icon={<Plus size={16} />}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4"
            onClick={() => showModal()}
          >
            Crear nuevo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;