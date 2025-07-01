import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Select,
  Upload,
  DatePicker,
  Switch,
  InputNumber,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as api from "@api/api";

const { Dragger } = Upload;
const { TextArea } = Input;

// Configuraciones de formularios por tipo
const FORM_CONFIGS = {
  tickets: [
    { name: "name", label: "Nombre", type: "input", required: true },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "price", label: "Precio", type: "number", required: true },
    { name: "isActive", label: "Activo", type: "switch", defaultValue: true },
  ],
  sections: [
    { name: "name", label: "Nombre", type: "input", required: true },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "capacity", label: "Capacidad", type: "number" },
  ],
  habitats: [
    { name: "name", label: "Nombre", type: "input", required: true },
    { name: "description", label: "Descripción", type: "textarea" },
    { name: "climate", label: "Clima", type: "input" },
  ],
  animals: [
    { name: "name", label: "Nombre", type: "input", required: true },
    {
      name: "speciesId",
      label: "Especie",
      type: "select",
      required: true,
      options: [],
    },
    {
      name: "habitatId",
      label: "Hábitat",
      type: "select",
      required: true,
      options: [],
    },
    {
      name: "sectionId",
      label: "Sección",
      type: "select",
      required: true,
      options: [],
    },
    { name: "age", label: "Edad", type: "number" },
    { name: "weight", label: "Peso", type: "number" },
    { name: "image", label: "Imagen", type: "file" },
  ],
  visits: [
    {
      name: "visitorName",
      label: "Nombre del Visitante",
      type: "input",
      required: true,
    },
    {
      name: "visitDate",
      label: "Fecha de Visita",
      type: "date",
      required: true,
    },
    { name: "duration", label: "Duración (horas)", type: "number" },
  ],
  orders: [
    {
      name: "orderNumber",
      label: "Número de Orden",
      type: "input",
      required: true,
    },
    {
      name: "totalAmount",
      label: "Monto Total",
      type: "number",
      required: true,
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: [
        { value: "pending", label: "Pendiente" },
        { value: "completed", label: "Completado" },
        { value: "cancelled", label: "Cancelado" },
      ],
    },
  ],
  species: [
    { name: "name", label: "Nombre", type: "input", required: true },
    { name: "scientificName", label: "Nombre Científico", type: "input" },
    { name: "description", label: "Descripción", type: "textarea" },
  ],
  "conservation-status": [
    { name: "name", label: "Estado", type: "input", required: true },
    { name: "description", label: "Descripción", type: "textarea" },
  ],
  provinces: [
    { name: "name", label: "Nombre", type: "input", required: true },
    { name: "code", label: "Código", type: "input" },
  ],
  "user-profiles": [
    {
      name: "user",
      label: "Usuario",
      type: "select",
      required: true,
      options: [],
    },
    { name: "province", label: "Provincia", type: "select", options: [] },
    { name: "phone", label: "Teléfono", type: "input" },
    { name: "address", label: "Dirección", type: "textarea" },
  ],
};

function DashboardForm({ activeTab, form, initialValues = {} }) {
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

        // Fetch data based on active tab
        if (activeTab === "animals") {
          [species, habitats, sections] = await Promise.all([
            api.getSpecies(),
            api.getHabitats(),
            api.getSections(),
          ]);
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

    // Mostrar las configuraciones del modal de acuerdo al ID
    return config.map((field) => {
      if (field.name === "speciesId") {
        return { ...field, options: formOptions.species };
      }
      if (field.name === "habitatId") {
        return { ...field, options: formOptions.habitats };
      }
      if (field.name === "sectionId") {
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

  const renderFormField = (field) => {
    const { name, label, type, required, options = [], defaultValue } = field;

    const rules = required
      ? [{ required: true, message: `${label} es requerido` }]
      : [];

    switch (type) {
      case "input":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <Input placeholder={`Ingrese ${label.toLowerCase()}`} />
          </Form.Item>
        );

      case "textarea":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <TextArea rows={4} placeholder={`Ingrese ${label.toLowerCase()}`} />
          </Form.Item>
        );

      case "number":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <InputNumber
              className="w-full"
              placeholder={`Ingrese ${label.toLowerCase()}`}
              min={0}
            />
          </Form.Item>
        );

      case "select":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <Select
              options={options}
              placeholder={`Seleccione ${label.toLowerCase()}`}
              loading={loading}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              dropdownStyle={{ zIndex: 1000 }}
              dropdownMatchSelectWidth={false}
            />
          </Form.Item>
        );

      case "date":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <DatePicker className="w-full" />
          </Form.Item>
        );

      case "switch":
        return (
          <Form.Item
            name={name}
            label={label}
            valuePropName="checked"
            initialValue={defaultValue}
          >
            <Switch />
          </Form.Item>
        );

      case "file":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <Dragger
              name="file"
              multiple={false}
              beforeUpload={() => false}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Haga clic o arrastre la imagen aquí
              </p>
              <p className="ant-upload-hint">Solo archivos de imagen</p>
            </Dragger>
          </Form.Item>
        );

      default:
        return null;
    }
  };

  const formConfig = getFormConfig();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      className="space-y-4"
    >
      {formConfig.map((field, index) => (
        <div key={field.name || index}>{renderFormField(field)}</div>
      ))}
    </Form>
  );
}

DashboardForm.propTypes = {
  activeTab: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
};

export default DashboardForm;