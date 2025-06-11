import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import Tanque from "./../../../assets/img/fotos.verticales_(1).jpg"
import ExhibitIntro from '../exhibiciones-y-servicios/components/ExhibitIntro'
import TabsContainer from './components/TabsContainer'
import ColaboracionesTab from './components/tabs/investigacion/ColaboracionesTab.jsx'
import InvestigacionTab from './components/tabs/investigacion/InvestigacionTab'
import ProyectosTab from './components/tabs/investigacion/ProyectosTab'
import PublicacionesTab from './components/tabs/investigacion/PublicacionesTab'
import { lineasDeInvestigacion, areas } from './data/lineasDeInvestigacion';
import { proyectos } from './data/proyectosData.js';
import { publicaciones, publicacionesStats  } from './data/publicacionesData.js';
import { colaboradores, redes  } from './data/colaboradoresData.js';
import OportunidadesYCiencia from './components/OportunidadesYCiencia.jsx'
import MissionCTA from '../quienes-somos/MissionCTA.jsx'



function Investigacion() {

  const links = [  
      { label: 'Ser Voluntario', href: '/apoyo/voluntariado' },
      { label: 'Hacer una Donación', href: '/apoyo/donaciones' },
      { label: 'Proponer Colaboracion', href: '/exhibiciones-y-servicios/servicios-educativos' },   
  ]

  const textos = [
    { title: 'Donaciones', text: 'Haz una donación para apoyar nuestra misión de conservación y educación ambiental.' },
  ]

  const InvestigacionTabs = [
      {
        value: "area-investigacion",
        label: "Areas de investigacion",
        component: <InvestigacionTab lineas={lineasDeInvestigacion} areas={areas} image={Tanque} />
      },
      {
        value: "proyectos-actuales",
        label: "Proyectos Actuales",
        component: <ProyectosTab proyectos={proyectos} />
      },
      {
        value: "publicaciones",
        label: "Publicaciones",
        component: <PublicacionesTab publicaciones={publicaciones} stats={publicacionesStats} />
      },
      {
        value: "colaboraciones",
        label: "Colaboraciones",
        component: <ColaboracionesTab colaboradores={colaboradores} redes={redes} />
      }
    ];
  
  return (
    <div className='mt-23'>
      <QuienesSomos title={"Investigación"} description={"Generando conocimiento para la conservación marina"} img={Tanque} />

      <ExhibitIntro title={"Nuestro Programa de Investigación"} description={"El Parque Marino Central del Pacífico Sur desarrolla investigación científica aplicada a la conservación de los ecosistemas marinos y costeros de Costa Rica. Nuestro equipo de investigadores trabaja en diversos proyectos que generan conocimiento para la toma de decisiones en conservación y manejo sostenible de los recursos marinos."} />

      <div className='ml-90 mr-90'>
      <TabsContainer tabs={InvestigacionTabs} />

      <OportunidadesYCiencia />

      <MissionCTA links={links} textos={textos} />
      </div>
    </div>
  )
}

export default Investigacion