import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as api from "@api/api";
import * as Select from "@radix-ui/react-select";
import * as Switch from "@radix-ui/react-switch";
import { useEffect as useYupEffect } from "react";

const FORM_CONFIGS = {
  tickets: [
    { name: "name", label: "Nombre", type: "input", required: true },
    { name: "description", label: "Descripción", type: "textarea", required: true },
    { name: "price", label: "Precio", type: "number", required: true },
    { name: "total_slots", label: "Cupos totales", type: "number", required: true },
    { name: "currency", label: "Moneda", type: "select", required: true, options: [
      { value: "CRC", label: "Colones" },
      { value: "USD", label: "Dólares" }
    ] },
  ],
  sections: [
    { name: "name", label: "Nombre", type: "input", required: true },
  ],
  habitats: [
    { name: "name", label: "Nombre", type: "input", required: true },
    { name: "nums_animals", label: "Cantidad de animales", type: "number", required: true },
    { name: "description", label: "Descripción", type: "textarea", required: true },
    { name: "section", label: "Sección", type: "select", required: true, options: [] },
  ],
  animals: [
    { name: "name", label: "Nombre", type: "input", required: true },
    { name: "age", label: "Edad", type: "number", required: true },
    { name: "species", label: "Especie", type: "select", required: true, options: [] },
    { name: "conservation_status", label: "Estado de conservación", type: "select", required: true, options: [] },
    { name: "habitat", label: "Hábitat", type: "select", required: true, options: [] },
  ],
  visits: [
    { name: "day", label: "Fecha", type: "date", required: true },
    { name: "total_slots", label: "Cupos totales", type: "number", required: true },
  ],
  orders: [
    { name: "email", label: "Email", type: "input", required: true },
    { name: "status", label: "Estado", type: "select", required: true, options: [
      { value: "PENDING", label: "Pendiente" },
      { value: "PAID", label: "Pagado" },
      { value: "CANCELLED", label: "Cancelado" },
      { value: "FAILED", label: "Fallido" }
    ] },
    { name: "visit", label: "Visita", type: "select", required: true, options: [] },
    { name: "user", label: "Usuario", type: "select", required: true, options: [] },
  ],
  species: [
    { name: "name", label: "Nombre", type: "input", required: true },
    { name: "scientific_name", label: "Nombre científico", type: "input" },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "img", label: "Imagen", type: "file" },
  ],
  "conservation-status": [
    { name: "name", label: "Estado", type: "select", required: true, options: [
      { value: "LC", label: "Least Concern" },
      { value: "NT", label: "Near Threatened" },
      { value: "VU", label: "Vulnerable" },
      { value: "EN", label: "Endangered" },
      { value: "CR", label: "Critically Endangered" },
      { value: "EW", label: "Extinct in the Wild" },
      { value: "EX", label: "Extinct" }
    ] },
  ],
  provinces: [
    { name: "name", label: "Nombre", type: "input", required: true },
  ],
  "user-profiles": [
    { name: "user", label: "Usuario", type: "select", required: true, options: [] },
    { name: "province", label: "Provincia", type: "select", options: [] },
    { name: "phone", label: "Teléfono", type: "input" },
    { name: "address", label: "Dirección", type: "input" },
    { name: "birth_date", label: "Fecha de nacimiento", type: "date" },
    { name: "profile_picture", label: "Foto de perfil", type: "file" },
    { name: "bio", label: "Biografía", type: "textarea" },
  ],
  exhibits: [
    { name: "value", label: "Valor", type: "input", required: true },
    { name: "label", label: "Etiqueta", type: "input", required: true },
    { name: "title", label: "Título", type: "input", required: true },
  ],
};

function DashboardForm({ activeTab, formValues, setFormValues, initialValues = {}, errors = {}, setErrors = () => {} }) {
  const [formOptions, setFormOptions] = useState({
    species: [],
    habitats: [],
    sections: [],
    users: [],
    provinces: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFormOptions = async () => {
      if (!activeTab) return;
      setLoading(true);
      try {
        let species = [];
        let habitats = [];
        let sections = [];
        let users = [];
        let provinces = [];
        if (activeTab === "animals") {
          [species, habitats, sections] = await Promise.all([
            api.getSpecies(),
            api.getHabitats(),
            api.getSections(),
          ]);
        } else if (activeTab === "habitats") {
          sections = await api.getSections();
        } else if (activeTab === "user-profiles") {
          [provinces, users] = await Promise.all([
            api.getProvinces(),
            api.getUsers(),
          ]);
        }
        setFormOptions({
          species: species.map((s) => ({ value: s.id, label: s.name })),
          habitats: habitats.map((h) => ({ value: h.id, label: h.name })),
          sections: sections.map((sec) => ({ value: sec.id, label: sec.name })),
          provinces: provinces.map((p) => ({ value: p.id, label: p.name })),
          users: users.map((u) => ({ value: u.id, label: u.username })),
        });
      } catch (error) {
        console.error("Error fetching form options:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFormOptions();
  }, [activeTab]);

  const getFormConfig = () => {
    const config = FORM_CONFIGS[activeTab] || [];
    return config.map((field) => {
      if (field.name === "species") {
        return { ...field, options: formOptions.species };
      }
      if (field.name === "habitat") {
        return { ...field, options: formOptions.habitats };
      }
      if (field.name === "section") {
        return { ...field, options: formOptions.sections };
      }
      if (field.name === "province") {
        return { ...field, options: formOptions.provinces };
      }
      if (field.name === "user") {
        return { ...field, options: formOptions.users };
      }
      return field;
    });
  };

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const renderFormField = (field) => {
    const { name, label, type, required, options = [], defaultValue } = field;
    const error = errors[name];
    const inputBase = `w-full border rounded px-3 py-2 focus:ring-2 focus:ring-cyan-400 text-base transition-all duration-150 ${error ? 'border-red-500' : 'border-gray-300'}`;
    switch (type) {
      case "input":
        return (
          <div className="mb-4" key={name}>
            <label className="block font-medium mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
            <input
              type="text"
              className={inputBase}
              name={name}
              value={formValues[name] || ""}
              onChange={e => handleChange(name, e.target.value)}
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
        );
      case "textarea":
        return (
          <div className="mb-4" key={name}>
            <label className="block font-medium mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
            <textarea
              className={inputBase}
              name={name}
              rows={4}
              value={formValues[name] || ""}
              onChange={e => handleChange(name, e.target.value)}
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
        );
      case "number":
        return (
          <div className="mb-4" key={name}>
            <label className="block font-medium mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
            <input
              type="number"
              className={inputBase}
              name={name}
              value={formValues[name] || ""}
              onChange={e => handleChange(name, e.target.value === "" ? "" : Number(e.target.value))}
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
        );
      case "select":
        return (
          <div className="mb-4" key={name}>
            <label className="block font-medium mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
            <select
              className={inputBase}
              name={name}
              value={formValues[name] || ""}
              onChange={e => handleChange(name, e.target.value === "" ? "" : isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value))}
            >
              <option value="">Seleccione {label.toLowerCase()}</option>
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
        );
      case "date":
        return (
          <div className="mb-4" key={name}>
            <label className="block font-medium mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
            <input
              type="date"
              className={inputBase}
              name={name}
              value={formValues[name] || ""}
              onChange={e => handleChange(name, e.target.value)}
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
        );
      case "file":
        return (
          <div className="mb-4" key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type="file"
              className={inputBase}
              name={name}
              onChange={e => handleChange(name, e.target.files[0])}
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
        );
      default:
        return null;
    }
  };

  const formConfig = getFormConfig();

  useEffect(() => {
    // Inicializar valores del formulario cuando cambia el tab o los valores iniciales
    if (initialValues && Object.keys(initialValues).length > 0) {
      setFormValues(initialValues);
    } else {
      // Limpiar valores si no hay iniciales
      setFormValues({});
    }
    // eslint-disable-next-line
  }, [activeTab, initialValues]);

  return (
    <form className="space-y-4">
      {formConfig.map(renderFormField)}
    </form>
  );
}

DashboardForm.propTypes = {
  activeTab: PropTypes.string.isRequired,
  formValues: PropTypes.object.isRequired,
  setFormValues: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
};

export default DashboardForm;