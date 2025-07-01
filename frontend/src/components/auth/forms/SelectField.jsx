import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ErrorMessage } from "formik";

export function SelectField({
  label,
  name,
  options = [],
  value,
  onValueChange,
  disabled = false,
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Select.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <Select.Trigger className="inline-flex items-center justify-between px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#26b7ad] bg-white w-full">
          <Select.Value placeholder={`Seleccione ${label.toLowerCase()}`} />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-md max-h-60">
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                key={option.id}
                value={String(option.id)}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#26b7ad] hover:text-white"
              >
                <Select.ItemText>{option.name}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-3">
                  ✓
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
}