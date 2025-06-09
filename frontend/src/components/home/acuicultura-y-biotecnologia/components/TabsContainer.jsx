import React from "react";
import * as Tabs from '@radix-ui/react-tabs'
import CultivoTab from "./tabs/CultivoTab";
import InvestigacionTab from "./tabs/InvestigacionTab";
import TecnologiaTab from "./tabs/TecnologiaTab";
import ExtensionTab from "./tabs/ExtensionTab";

function TabsContainer() {
  return (
    <>
      <Tabs.Root defaultValue="cultivo" className="flex flex-col w-full p-6">
      
      {/* Tabs List */}
      <Tabs.List className="flex space-x-6 border-b-2 pb-2 mb-6">
        <Tabs.Trigger value="cultivo" className="data[state=activate]:text-teal-600 data-[state=activate]:border-b-2 data-[state=activate]:border-teal-600 text-gray-600 hover:teal-500 font-semibold cursor-pointer">
          Especies en Cultivo
        </Tabs.Trigger>

        <Tabs.Trigger value="investigacion" className="data[state=activate]:text-teal-600 data-[state=activate]:border-b-2 data-[state=activate]:border-teal-600 text-gray-600 hover:teal-500 font-semibold cursor-pointer">
          Investigación
        </Tabs.Trigger>

        <Tabs.Trigger value="tecnologia" className="data[state=activate]:text-teal-600 data-[state=activate]:border-b-2 data-[state=activate]:border-teal-600 text-gray-600 hover:teal-500 font-semibold cursor-pointer">
          Tecnología e Innovación
          </Tabs.Trigger>

          <Tabs.Trigger value="extension" className="data[state=activate]:text-teal-600 data-[state=activate]:border-b-2 data-[state=activate]:border-teal-600 text-gray-600 hover:teal-500 font-semibold cursor-pointer">
          Extención y Capacitación
        </Tabs.Trigger>

      </Tabs.List>

      {/* Tab Content */}
      <Tabs.Content value="cultivo">
        <CultivoTab />
      </Tabs.Content>

      <Tabs.Content value="investigacion">
        <InvestigacionTab />
      </Tabs.Content>

      <Tabs.Content value="tecnologia">
        <TecnologiaTab />
      </Tabs.Content>

      <Tabs.Content value="extension">
        <ExtensionTab />
      </Tabs.Content>

      </Tabs.Root>
    </>
  )
}

export default TabsContainer