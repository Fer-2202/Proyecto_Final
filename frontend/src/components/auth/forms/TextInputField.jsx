import React from "react";
import { Field, ErrorMessage } from "formik";

export function TextInputField({
  label,
  name,
  type = "text",
  disabled = false,
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
}