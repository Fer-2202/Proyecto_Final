import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import ExhibitIntro from '../../../components/home/exhibiciones-y-servicios/components/ExhibitIntro'
import TabsContainer from './components/TabsContainer'
import DescriptionSection from './components/DescriptionSection'
import Tanque from "./../../../assets/img/Logo_CRRAM.JPG"
import { Link } from 'react-router-dom'
import EspeciesTab from './components/tabs/EspeciesTab'
import InstalacionesTab from './components/tabs/InstalacionesTab'
import HistoriasTab from './components/tabs/HistoriasTab'
import ComoAyudarTab from './components/tabs/ComoAyudarTab'

function CentroDeRescate() {

  const workAreas = [
    "Acogen pelícanos, gaviotas, bobos, tortugas marinas, cocodrilos y serpientes marinas heridos o en peligro.",
    "Brindan atención médica especializada con veterinarios y biólogos de planta para la recuperación de los animales.",
    "Coordinan la reintroducción de animales rehabilitados a su hábitat natural cuando es posible.",
    "Proporcionan hogar a animales que no pueden ser liberados por discapacidades permanentes (como pelícanos que no pueden volar)",
    "Los animales residentes sirven como embajadores educativos para concientizar a los visitantes sobre la conservación marina.",
    "Operan bajo los permisos del SINAC con personal especializado y un regente autorizado."
  ];

  const handleButtonClick = () => {
    alert('Botón "Conocer Más" clickeado!');
  };

  const CentroRescateTabs = [
    {
      value: "especies",
      label: "Especies Atendidas",
      component: <EspeciesTab />
    },
/*     {
      value: "instalaciones",
      label: "Nuestras Instalaciones",
      component: <InstalacionesTab />
    }, */
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
    <QuienesSomos title={"Centro de Rescate"} description={"Salvando la vida marina del Pacifico"} />

      <ExhibitIntro description={"El CRRAM inició gracias a donaciones de Florida Bebidas y Pesquera Cannavo de Venezuela, y al apoyo de Fundación CRUSA, construyéndose una pequeña instalación para albergar tortugas marinas.  El centro de rescate se encuentra debidamente inscrito ante el SINAC cumpliendo así con la normativa vigente, por lo cual se cuenta con un regente, biólogos de planta y un veterinario."} title={"Programa Centro de Rescate y Rehabilitación"} />

      <DescriptionSection imageSrc={Tanque} title={"Nuestra misión"} paragraphs={["El objetivo de este centro de rescate es rehabilitar mediante un manejo biológico y veterinario los animales que ingresan a este centro y poder coordinar su posible liberación al medio silvestre. En el Parque se procura la liberación de toda tortuga marina, ave o cocodrilo excepto para el caso de aquellos que no se puedan valer por sí mismos, como es el caso de los pelícanos totalmente inhabilitados para volar, o del caso de dos tortugas marinas que por sus condiciones fisiológicas como la pérdida de sus aletas no es posible su liberación. Estos animales residentes juegan un papel muy importante de educación en los visitantes que llegan al Parque Marino del Pacífico.",]} workAreasTitle={"Nuestros Servicios:"} workAreas={workAreas} buttonText={"Reportar Animal en peligro"} onButtonClick={handleButtonClick} />

      <div className=''>
        <TabsContainer tabs={CentroRescateTabs} />
      </div>
    </div>
  )
}

export default CentroDeRescate
