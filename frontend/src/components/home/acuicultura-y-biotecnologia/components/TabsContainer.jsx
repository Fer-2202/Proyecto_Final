import React from "react";
import * as Tabs from '@radix-ui/react-tabs'

function TabsContainer({ 
  tabs, 
  defaultValue, 
  className = "flex flex-col w-full p-6",
  tabListClassName = "flex space-x-6 border-b-2 pb-2 mb-6",
  tabTriggerClassName = "data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 text-gray-600 hover:text-teal-500 font-semibold cursor-pointer transition-colors duration-200 px-4 py-2"
}) {
  
  if (!tabs || tabs.length === 0) {
    return <div className="p-6 text-center text-gray-500">No hay pestañas disponibles</div>;
  }

  const firstTabValue = defaultValue || tabs[0]?.value;

  return (
    <>
      <Tabs.Root defaultValue={firstTabValue} className={className}>
        
        {/* Tabs List */}
        <Tabs.List className={tabListClassName}>
          {tabs.map((tab) => (
            <Tabs.Trigger 
              key={tab.value} 
              value={tab.value} 
              className={tabTriggerClassName}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Tab Content */}
        {tabs.map((tab) => (
          <Tabs.Content key={tab.value} value={tab.value}>
            {tab.component}
          </Tabs.Content>
        ))}

      </Tabs.Root>
    </>
  )
}

export default TabsContainer