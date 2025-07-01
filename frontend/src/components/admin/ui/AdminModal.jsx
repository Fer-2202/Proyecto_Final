import { Modal, Form, Input, Select, Upload, DatePicker, Switch } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ticketFormConfig from "./forms/TicketFormConfig";
import sectionFormConfig from "./forms/SectionFormConfig";
import habitatFormConfig from "./forms/HabitatFormConfig";
import animalFormConfig from "./forms/AnimalFormConfig";
import visitFormConfig from "./forms/VisitFormConfig";
import orderFormConfig from "./forms/OrderFormConfig";
import speciesFormConfig from "./forms/SpeciesFormConfig";
import conservationStatusFormConfig from "./forms/ConservationStatusFormConfig";
import provinceFormConfig from "./forms/ProvinceFormConfig";
import userProfileFormConfig from "./forms/UserProfileFormConfig";
import { useEffect, useState } from "react";
import * as api from "@api/api";
import {
  YupTicketSchema,
  YupSectionSchema,
  YupHabitatSchema,
  YupAnimalSchema,
  YupVisitSchema,
  YupOrderSchema,
  YupSpeciesSchema,
  YupConservationStatusSchema,
  YupProvinceSchema,
  YupUserProfileSchema,
} from "./schemas";

const { Dragger } = Upload;
const { TextArea } = Input;

function AdminModal({
  formVisible,
  setFormVisible,
  editItem,
  handleSubmit,
  form,
  data,
  modalClassName = "",
  buttonClassName = "",
}) {
  const { item: initialValues, tabKey } = editItem || {};
  const activeTab = tabKey;
  const [formOptions, setFormOptions] = useState({
    species: [],
    habitats: [],
    sections: [],
    conservationStatuses: [],
    provinces: [],
    users: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!formVisible || !activeTab) return;

      setLoading(true);
      try {
        let species = [];
        let habitats = [];
        let sections = [];
        let conservationStatuses = [];
        let provinces = [];
        let users = [];

        // Fetch data based on active tab
        if (activeTab === "animals") {
          [species, habitats, sections] = await Promise.all([
            api.getSpecies(),
            api.getHabitats(),
            api.getSections(),
          ]);
        } else if (activeTab === "conservation-status") {
          try {
            conservationStatuses = await api.getConservationStatusChoices();
          } catch (error) {
            console.warn("Could not fetch conservation status choices:", error);
            conservationStatuses = [];
          }
        } else if (activeTab === "user-profiles") {
          try {
            provinces = await api.getProvinces();
            users = await api.getUsers();
          } catch (error) {
            console.warn("Could not fetch provinces or users:", error);
          }
        }

        setFormOptions((prevOptions) => ({
          ...prevOptions,
          species: species.map((s) => ({ value: s.id, label: s.name })),
          habitats: habitats.map((h) => ({ value: h.id, label: h.name })),
          sections: sections.map((sec) => ({ value: sec.id, label: sec.name })),
          conservationStatuses: conservationStatuses.map((status) => ({
            value: status.value,
            label: status.label,
          })),
          provinces: provinces.map((p) => ({ value: p.id, label: p.name })),
          users: users.map((u) => ({ value: u.id, label: u.username })),
        }));
      } catch (error) {
        console.error("Error fetching form options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, formVisible]);

  // Get form configuration based on active tab
  const getFormConfig = () => {
    switch (activeTab) {
      case "tickets":
        return ticketFormConfig;
      case "sections":
        return sectionFormConfig;
      case "habitats":
        return habitatFormConfig;
      case "animals":
        return animalFormConfig.map((field) => {
          if (field.name === "speciesId") {
            return { ...field, options: formOptions.species };
          }
          if (field.name === "habitatId") {
            return { ...field, options: formOptions.habitats };
          }
          if (field.name === "sectionId") {
            return { ...field, options: formOptions.sections };
          }
          return field;
        });
      case "visits":
        return visitFormConfig;
      case "orders":
        return orderFormConfig;
      case "species":
        return speciesFormConfig;
      case "conservation-status":
        return conservationStatusFormConfig.map((field) => {
          if (field.name === "name") {
            return { ...field, options: formOptions.conservationStatuses };
          }
          return field;
        });
      case "provinces":
        return provinceFormConfig;
      case "user-profiles":
        return userProfileFormConfig.map((field) => {
          if (field.name === "province") {
            return { ...field, options: formOptions.provinces };
          }
          if (field.name === "user") {
            return { ...field, options: formOptions.users };
          }
          return field;
        });
      default:
        return [];
    }
  };

  const formConfig = getFormConfig();

  const renderFormField = (field) => {
    const { name, label, type, required, options = [] } = field;

    switch (type) {
      case "select":
        return (
          <Select
            options={options}
            placeholder={`Seleccione un ${label}`}
            loading={loading}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        );
      case "textarea":
        return (
          <TextArea rows={4} placeholder={`Ingrese ${label.toLowerCase()}`} />
        );
      case "date":
        return <DatePicker className="w-full" />;
      case "switch":
        return <Switch />;
      case "file":
        return (
          <Dragger name="file" multiple={false} beforeUpload={() => false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Haga clic o arrastre el archivo aquí
            </p>
          </Dragger>
        );
      default:
        return (
          <Input type={type} placeholder={`Ingrese ${label.toLowerCase()}`} />
        );
    }
  };

  return (
    <Modal
      open={formVisible}
      title={
        <div className="text-lg font-semibold text-gray-900">
          {initialValues?.id ? "Editar registro" : "Nuevo registro"}
        </div>
      }
      onCancel={() => setFormVisible(false)}
      onOk={handleSubmit}
      okText="Guardar"
      cancelText="Cancelar"
      className={`admin-modal ${modalClassName}`}
      okButtonProps={{
        className: `admin-btn admin-btn-primary ${buttonClassName}`,
        loading: loading,
      }}
      cancelButtonProps={{
        className: "admin-btn border-gray-300 text-gray-700",
      }}
      destroyOnClose
      width={600}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        className="mt-4"
      >
        {formConfig.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={
              <span className="text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </span>
            }
            rules={[
              {
                required: field.required,
                message: `Por favor, complete el campo ${field.label}`,
              },
            ]}
          >
            {renderFormField(field)}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
}

export default AdminModal;