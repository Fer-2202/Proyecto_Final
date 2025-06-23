import { Input, Button } from "antd";
import { Search, Plus } from "lucide-react";

function AdminHeader({ searchTerm, setSearchTerm, showModal }) {
  return (
    <div className="bg-white/90 backdrop-blur-md shadow border-b border-blue-100 px-6 py-4 sticky top-0 z-30">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-teal-700">Panel de administración</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Buscar..."
            prefix={<Search size={16} />}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 border border-blue-200"
            style={{ width: 240 }}
          />
          <Button
            icon={<Plus size={16} />}
            onClick={() => showModal()}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-sm px-4 py-1.5 transition-all duration-150"
          >
            Crear nuevo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
