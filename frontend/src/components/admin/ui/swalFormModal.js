import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

/**
 * Muestra un modal SweetAlert2 con un formulario dinámico y validación Yup.
 * @param {Object} options
 * @param {string} options.title - Título del modal
 * @param {Array} options.formConfig - Configuración de campos [{name, label, type, required, options}]
 * @param {Object} options.initialValues - Valores iniciales del formulario
 * @param {Yup.ObjectSchema} options.validationSchema - Esquema Yup para validación
 * @param {string} options.confirmButtonText - Texto del botón de confirmación
 * @param {boolean} options.readOnly - Si es true, muestra los campos como solo lectura
 * @returns {Promise<Object|null>} - Valores del formulario o null si se cancela
 */
export async function showFormModal({
  title,
  formConfig,
  initialValues = {},
  validationSchema,
  confirmButtonText = "Guardar",
  readOnly = false,
}) {
  // Genera el HTML del formulario dinámicamente
  const formHtml = formConfig.map(field => {
    const value = initialValues[field.name] || "";
    if (readOnly) {
      // Mostrar como texto plano
      if (field.type === "file") {
        return `<div class="mb-2"><label>${field.label}:</label> <span>${value ? "Archivo adjunto" : "-"}</span></div>`;
      }
      return `<div class="mb-2"><label>${field.label}:</label> <span>${value}</span></div>`;
    }
    switch (field.type) {
      case "text":
      case "number":
      case "date":
        return `
          <div class="mb-2">
            <label>${field.label}${field.required ? " *" : ""}</label>
            <input 
              type="${field.type}" 
              id="swal-input-${field.name}" 
              class="swal2-input" 
              value="${value}"
              ${field.required ? "required" : ""}
            />
          </div>
        `;
      case "select":
        return `
          <div class="mb-2">
            <label>${field.label}${field.required ? " *" : ""}</label>
            <select id="swal-input-${field.name}" class="swal2-input" ${field.required ? "required" : ""}>
              <option value="">Seleccione ${field.label.toLowerCase()}</option>
              ${field.options.map(opt => `
                <option value="${opt.value}" ${opt.value == value ? "selected" : ""}>${opt.label}</option>
              `).join("")}
            </select>
          </div>
        `;
      case "textarea":
        return `
          <div class="mb-2">
            <label>${field.label}${field.required ? " *" : ""}</label>
            <textarea id="swal-input-${field.name}" class="swal2-textarea">${value}</textarea>
          </div>
        `;
      case "file":
        return `
          <div class="mb-2">
            <label>${field.label}${field.required ? " *" : ""}</label>
            <input type="file" id="swal-input-${field.name}" class="swal2-file" />
          </div>
        `;
      default:
        return "";
    }
  }).join("");

  // Mostrar el modal
  const { value: formValues } = await MySwal.fire({
    title,
    html: `<form id="swal-form">${formHtml}</form>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText,
    preConfirm: async () => {
      if (readOnly) return null;
      // Recoger valores
      const values = {};
      for (const field of formConfig) {
        if (field.type === "file") {
          const fileInput = document.getElementById(`swal-input-${field.name}`);
          values[field.name] = fileInput.files[0] || null;
        } else {
          let val = document.getElementById(`swal-input-${field.name}`).value;
          // Si es select y la opción es numérica, convierte a número
          if (field.type === "select" && val !== "" && !isNaN(val)) {
            val = Number(val);
          }
          values[field.name] = val;
        }
      }
      // Validar con Yup
      try {
        await validationSchema.validate(values, { abortEarly: false });
        return values;
      } catch (err) {
        if (err.inner && err.inner.length > 0) {
          Swal.showValidationMessage(
            err.inner.map(e => `<div>${e.message}</div>`).join("")
          );
        } else {
          Swal.showValidationMessage(err.message);
        }
        return false;
      }
    }
  });

  // Si el usuario confirmó y pasó la validación, regresa los valores
  return formValues || null;
} 