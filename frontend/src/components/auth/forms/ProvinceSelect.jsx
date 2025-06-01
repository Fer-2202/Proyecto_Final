// components/ProvinceSelect.jsx
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';

function ProvinceSelect({ provinces, value, onChange }) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-sm font-medium text-gray-700">Provincia</label>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className="inline-flex items-center justify-between border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad] w-full bg-white">
          <Select.Value placeholder="Selecciona una provincia" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-white rounded shadow z-50">
            <Select.Viewport className="p-1">
              {provinces.map((province) => (
                <Select.Item
                  key={province.id}
                  value={province.id.toString()}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
                >
                  <Select.ItemText>{province.name}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export default ProvinceSelect;