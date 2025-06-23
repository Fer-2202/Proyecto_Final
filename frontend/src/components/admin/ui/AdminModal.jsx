import { Modal, Form, Input, Select, Upload } from "antd";
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
import * as api from "../../../api/api";
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

function AdminModal({ formVisible, setFormVisible, editItem, handleSubmit, form, data, modalClassName = "", buttonClassName = "" }) {
  const { item: initialValues, tabKey } = editItem || {};

  const activeTab = tabKey;
  const [formOptions, setFormOptions] = useState({
    species: [],
    habitats: [],
    sections: [],
    conservationStatuses: [], // Added conservationStatuses
  });
  let formConfig;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let species = [];
        let habitats = [];
        let sections = [];
        let conservationStatuses = [];

        if (activeTab === "animals") {
          [species, habitats, sections] = await Promise.all([
            api.getSpecies(),
            api.getHabitats(),
            api.getSections(),
          ]);
        } else if (activeTab === "conservation-status") {
          conservationStatuses = await api.getConservationStatusChoices();
        }
        console.log("conservationStatuses:", conservationStatuses); // Add this line

        setFormOptions(prevOptions => ({
          ...prevOptions,
          species: species.map(s => ({ value: s.id, label: s.name })),
          habitats: habitats.map(h => ({ value: h.id, label: h.name })),
          sections: sections.map(sec => ({ value: sec.id, label: sec.name })),
          conservationStatuses: conservationStatuses.map(status => ({ value: status.value, label: status.label })) // Store conservationStatuses directly
        }));
      } catch (error) {
        console.error("Error fetching form options:", error);
      }
    };
    console.log("activeTab:", activeTab, "formVisible:", formVisible);

    if ((activeTab === "animals" || activeTab === "conservation-status") && formVisible) {
      fetchData();
    }
  }, [activeTab, formVisible]);

  switch (activeTab) {
    case "tickets":
      formConfig = ticketFormConfig;
      break;
    case "sections":
      formConfig = sectionFormConfig;
      break;
    case "habitats":
      formConfig = habitatFormConfig;
      break;
    case "animals":
      // Clone the animalFormConfig to avoid modifying the original
      formConfig = animalFormConfig.map(field => {
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
      break;
    case "visits":
      formConfig = visitFormConfig;
      break;
    case "orders":
      formConfig = orderFormConfig;
      break;
    case "species":
      formConfig = speciesFormConfig;
      break;
    case "conservation-status":
      // Clone the conservationStatusFormConfig to avoid modifying the original
      formConfig = conservationStatusFormConfig.map(field => {
        if (field.name === "name") {
          return { ...field, options: formOptions.conservationStatuses };
        }
        return field;
      });
      break;
    case "provinces":
      formConfig = provinceFormConfig;
      break;
    case "user-profiles":
      formConfig = userProfileFormConfig;
      break;
    default:
      formConfig = [];
      break;
  }

  return (
    <Modal
      open={formVisible}
      title={initialValues?.id ? "Editar registro" : "Nuevo registro"}
      onCancel={() => setFormVisible(false)}
      onOk={handleSubmit}
      okText="Guardar"
      className={`rounded-lg ${modalClassName}`}
      okButtonProps={{ className: buttonClassName }}
      destroyOnHidden
    >
      <Form layout="vertical" form={form} initialValues={initialValues}>
        {formConfig.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={[{ required: field.required, message: `Por favor, complete el campo ${field.label}` }]}
          >
            {field.type === "select" ? (
              <Select
                options={field.options}
                placeholder={`Seleccione un ${field.label}`}
              />
            ) : (
              <Input type={field.type} />
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
}

export default AdminModal;