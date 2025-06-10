import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import ExhibitIntro from '../../../components/home/exhibiciones-y-servicios/components/ExhibitIntro'
import TabsContainer from './components/TabsContainer'
import DescriptionSection from './components/DescriptionSection'
import Tanque from "./../../../assets/img/fotos.verticales_(1).jpg"
import { Link } from 'react-router-dom'
import EspeciesTab from './components/tabs/EspeciesTab'
import InstalacionesTab from './components/tabs/InstalacionesTab'
import HistoriasTab from './components/tabs/HistoriasTab'
import ComoAyudarTab from './components/tabs/ComoAyudarTab'

function CentroDeRescate() {

  const workAreas = [
    "Rescate de fauna marina en peligro",
    "Atención veterinaria especializada",
    "Rehabilitación y cuidados intensivos",
    "Liberación y seguimiento post-liberación",
    "Investigación aplicada a la conservación",
    "Educación y sensibilización ambiental"
  ];

  const handleButtonClick = () => {
    alert('Botón "Conocer Más" clickeado!');
  };

const CentroRescateTabs = [
    {
      value: "especies",
      label: "Especies en Cultivo",
      component: <EspeciesTab />
    },
    {
      value: "instalaciones",
      label: "Nuestras Instalaciones",
      component: <InstalacionesTab />
    },
    {
      value: "casos-exito",
      label: "Casos de Exito",
      component: <HistoriasTab />
    },
    {
      value: "como-ayudar",
      label: "Como Ayudar",
      component: <ComoAyudarTab />
    }
  ];

  return (
    <div className='mt-23'>
    <QuienesSomos title={"Centro de Rescate"} description={"Salvando la vida marina del Pacifico Sur"} />

    <ExhibitIntro description={"El Centro de Rescate del Parque Marino Central del Pacífico Sur está dedicado al rescate, rehabilitación y liberación de fauna marina afectada por actividades humanas o eventos naturales. Trabajamos para dar una segunda oportunidad a tortugas marinas, mamíferos marinos, aves costeras y otras especies que necesitan nuestra ayuda."} title={"Programa Centro de Rescate y Rehabilitación"} />

    <DescriptionSection imageSrc={Tanque} title={"Nuestra misión"} paragraphs={["Rescatar, rehabilitar y reintroducir fauna marina en peligro, contribuyendo a la conservación de las especies y sus ecosistemas, mientras generamos conocimiento científico y conciencia ambiental.", "Nuestro centro cuenta con instalaciones especializadas para la atención de diferentes especies marinas, un equipo de profesionales dedicados y una red de voluntarios comprometidos con la conservación marina."]} workAreasTitle={"Nuestros Servicios:"} workAreas={workAreas} buttonText={"Repostar Animal en peligro"} onButtonClick={handleButtonClick} />

    <TabsContainer tabs={CentroRescateTabs}  />
    </div>
  )
}

export default CentroDeRescate
