// src/pages/admin/forms/FormWrapper.jsx

export default function FormWrapper({ title, onSubmit, formData, onChange, fields }) {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>

            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ""}
                onChange={onChange}
                className="block w-full border rounded px-3 py-2"
                rows="4"
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={onChange}
                className="block w-full border rounded px-3 py-2"
              >
                <option value="">-- Seleccione --</option>
                {field.options.map(option => (
                  <option key={option[field.optionValue]} value={option[field.optionValue]}>
                    {option[field.optionLabel]}
                  </option>
                ))}
              </select>
            ) : field.type === "multiselect" ? (
              <select
                name={field.name}
                multiple
                value={formData[field.name] || []}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  onChange({ target: { name: field.name, value: selected } });
                }}
                className="block w-full border rounded px-3 py-2"
              >
                {field.options.map(option => (
                  <option key={option[field.optionValue]} value={option[field.optionValue]}>
                    {option[field.optionLabel]}
                  </option>
                ))}
              </select>
            ) : field.type === "file" ? (
              <input
                type="file"
                name={field.name}
                onChange={onChange}
                className="block w-full border rounded px-3 py-2"
              />
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={onChange}
                className="block w-full border rounded px-3 py-2"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
