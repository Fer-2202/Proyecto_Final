import React from 'react'
import * as Tab from "@radix-ui/react-tabs"

function Tabs() {
  return (
    <>
      <Tab.Root defaultValue='tab1'>
        <Tab.List>
          <Tab.Trigger value='tab1'>Tab 1</Tab.Trigger>
          <Tab.Trigger value='tab2'>Tab 2</Tab.Trigger>
          <Tab.Trigger value='tab3'>Tab 3</Tab.Trigger>
        </Tab.List>
        <Tab.Content value='tab1'><h2>Tab 1</h2></Tab.Content>
          
      </Tab.Root>
    </>
  )
}

export default Tabs