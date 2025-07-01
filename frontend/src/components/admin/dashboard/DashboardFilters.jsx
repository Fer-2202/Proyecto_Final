import React from "react";
import PropTypes from "prop-types";
import { DatePicker, Select, Input, Button } from "antd";
import { Search, Filter, X } from "lucide-react";

function DashboardFilters({ filters, setFilters, activeTab, onSearch }) {
  const getFilterOptions = () => {
    const baseOptions = {
      status: [
        { value: "activo", label: "Activo" },
        { value: "inactivo", label: "Inactivo" },
        { value: "pendiente", label: "Pendiente" },
      ],
      type: [
        { value: "animal", label: "Animal" },
        { value: "evento", label: "Evento" },
        { value: "usuario", label: "Usuario" },
      ],
    };

    // Filtros específicos por tab
    const tabSpecificOptions = {
      tickets: {
        status: [
          { value: "disponible", label: "Disponible" },
          { value: "vendido", label: "Vendido" },
          { value: "cancelado", label: "Cancelado" },
        ],
      },
      animals: {
        species: [
          { value: "mamifero", label: "Mamífero" },
          { value: "ave", label: "Ave" },
          { value: "reptil", label: "Reptil" },
          { value: "pez", label: "Pez" },
        ],
        habitat: [
          { value: "marino", label: "Marino" },
          { value: "terrestre", label: "Terrestre" },
          { value: "aereo", label: "Aéreo" },
        ],
      },
      visits: {
        status: [
          { value: "programada", label: "Programada" },
          { value: "en_curso", label: "En Curso" },
          { value: "completada", label: "Completada" },
        ],
      },
      orders: {
        status: [
          { value: "pending", label: "Pendiente" },
          { value: "completed", label: "Completado" },
          { value: "cancelled", label: "Cancelado" },
        ],
      },
    };

    return { ...baseOptions, ...tabSpecificOptions[activeTab] };
  };

  const clearFilters = () => {
    setFilters({ dateRange: null, status: "", type: "", search: "" });
  };

  const hasActiveFilters =
    filters.dateRange || filters.status || filters.type || filters.search;

  const options = getFilterOptions();

  const handleSelectChange = (field, value) => {
    setFilters((f) => ({ ...f, [field]: value }));
  };

  const handleDateChange = (dates) => {
    setFilters((f) => ({ ...f, dateRange: dates }));
  };

  const handleSearchChange = (e) => {
    setFilters((f) => ({ ...f, search: e.target.value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <Button
            icon={<X size={14} />}
            onClick={clearFilters}
            size="small"
            className="text-gray-500 hover:text-gray-700"
          >
            Limpiar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Buscar..."
            value={filters.search || ""}
            onChange={handleSearchChange}
            className="pl-10 rounded-lg"
            onPressEnter={() => onSearch?.(filters.search)}
          />
        </div>

        {/* Rango de fechas */}
        <DatePicker.RangePicker
          value={filters.dateRange}
          onChange={handleDateChange}
          className="rounded-lg w-full"
          allowClear
          placeholder={["Fecha inicio", "Fecha fin"]}
        />

        {/* Estado */}
        {options.status && (
          <Select
            value={filters.status}
            onChange={(val) => handleSelectChange("status", val)}
            className="rounded-lg"
            placeholder="Estado"
            allowClear
            options={options.status}
            dropdownStyle={{ zIndex: 1000 }}
          />
        )}

        {/* Tipo */}
        {options.type && (
          <Select
            value={filters.type}
            onChange={(val) => handleSelectChange("type", val)}
            className="rounded-lg"
            placeholder="Tipo"
            allowClear
            options={options.type}
            dropdownStyle={{ zIndex: 1000 }}
          />
        )}

        {/* Filtros específicos por tab */}
        {activeTab === "animals" && options.species && (
          <Select
            value={filters.species}
            onChange={(val) => handleSelectChange("species", val)}
            className="rounded-lg"
            placeholder="Especie"
            allowClear
            options={options.species}
            dropdownStyle={{ zIndex: 1000 }}
          />
        )}

        {activeTab === "animals" && options.habitat && (
          <Select
            value={filters.habitat}
            onChange={(val) => handleSelectChange("habitat", val)}
            className="rounded-lg"
            placeholder="Hábitat"
            allowClear
            options={options.habitat}
            dropdownStyle={{ zIndex: 1000 }}
          />
        )}
      </div>
    </div>
  );
}
/* Propiedades del componente DashboardFilter */
DashboardFilters.propTypes = {
  filters: PropTypes.shape({
    dateRange: PropTypes.any,
    status: PropTypes.string,
    type: PropTypes.string,
    search: PropTypes.string,
    species: PropTypes.string,
    habitat: PropTypes.string,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
};

export default DashboardFilters;