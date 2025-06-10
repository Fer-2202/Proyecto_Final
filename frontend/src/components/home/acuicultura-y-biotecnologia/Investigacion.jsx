import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import Tanque from "./../../../assets/img/fotos.verticales_(1).jpg"
import ExhibitIntro from '../exhibiciones-y-servicios/components/ExhibitIntro'
import TabsContainer from './components/TabsContainer'
import ColaboracionesTab from './components/tabs/investigacion/ColaboracionesTab.jsx'
import InvestigacionTab from './components/tabs/investigacion/InvestigacionTab'
import ProyectosTab from './components/tabs/investigacion/ProyectosTab'
import PublicacionesTab from './components/tabs/investigacion/PublicacionesTab'
import { lineasDeInvestigacion } from './data/lineasDeInvestigacion';


function Investigacion() {

  const InvestigacionTabs = [
      {
        value: "area-investigacion",
        label: "Areas de investigacion",
        component: <InvestigacionTab lineas={lineasDeInvestigacion} />
      },
      {
        value: "instalaciones",
        label: "Nuestras Instalaciones",
        component: <InvestigacionTab />
      },
      {
        value: "casos-exito",
        label: "Casos de Exito",
        component: <InvestigacionTab />
      },
      {
        value: "como-ayudar",
        label: "Como Ayudar",
        component: <InvestigacionTab />
      }
    ];
  
  return (
    <div className='mt-23'>
      <QuienesSomos title={"Investigación"} description={"Generando conocimiento para la conservación marina"} img={Tanque} />

      <ExhibitIntro title={"Nuestro Programa de Investigación"} description={"El Parque Marino Central del Pacífico Sur desarrolla investigación científica aplicada a la conservación de los ecosistemas marinos y costeros de Costa Rica. Nuestro equipo de investigadores trabaja en diversos proyectos que generan conocimiento para la toma de decisiones en conservación y manejo sostenible de los recursos marinos."} />

      <TabsContainer tabs={InvestigacionTabs} />
    </div>
  )
}

export default Investigacion