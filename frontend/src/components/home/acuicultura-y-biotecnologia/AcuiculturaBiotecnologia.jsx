import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import Tanque from "./../../../assets/img/fotos.verticales_(1).jpg"
import AboutSection from '../quienes-somos/AboutSection'
import ExhibitIntro from '../exhibiciones-y-servicios/components/ExhibitIntro'
import OurApproach from './components/DescriptionSection'
import TabsContainer from './components/TabsContainer'
import SuccessCases from './components/SuccessCases'
import CallToAction from './components/CallToAction'
import CultivoTab from './components/tabs/CultivoTab'
import InvestigacionTab from './components/tabs/InvestigacionTab'
import TecnologiaTab from './components/tabs/TecnologiaTab'
import ExtensionTab from './components/tabs/ExtensionTab'
import ProyectosTab from './components/tabs/investigacion/ProyectosTab'
import { Link } from 'react-router-dom'
import InvestigationTabs from './components/tabs/investigacion/InvestigacionTab'
/* import { lineasDeInvestigacion, areas } from './data/lineasDeInvestigacion'; */
import { proyectos } from './data/proyectosData.js';
import { publicaciones, publicacionesStats  } from './data/publicacionesData.js';
import { colaboradores, redes  } from './data/colaboradoresData.js';
import PublicacionesTab from './components/tabs/investigacion/PublicacionesTab';
import ColaboracionesTab from './components/tabs/investigacion/ColaboracionesTab';


function AcuiculturaBiotecnologia() {

  const paragraphs = [
    "La acuicultura es crucial en Costa Rica, donde solo el 2% de los productos marinos consumidos provienen del cultivo, a pesar de que la producción acuícola representa cerca del 50% de la pesca mundial. El trabajo del Parque Marino en biotecnología y acuicultura busca cerrar esta brecha, ofreciendo una alternativa viable y sostenible a la pesca extractiva y contribuyendo a la seguridad alimentaria y al desarrollo económico de las comunidades costeras.", "El Parque Marino del Pacífico, a través de su LABM, se ha consolidado como un referente en acuicultura marina, educación y conservación en Costa Rica, promoviendo la investigación y la transferencia de tecnología para un aprovechamiento sostenible de los recursos marinos."
  ];

  const workAreas = [
    "Promoción de la Acuicultura Marina",
    "Investigación y Desarrollo (I+D)",
    "Producción de Organismos Marinos",
    "Cultivo Larval y de Juveniles",
    "Extensión y Transferencia Tecnológica",
    "Conservación y Educación Ambiental",
    "Capacitación y Formación Académica",
    "Incidencia en Políticas Públicas"
  ];

  const handleButtonClick = () => {
    alert('Botón "Conocer Más" clickeado!');
  };

  const acuiculturaTabs = [
    {
      value: "cultivo",
      label: "Especies en Cultivo",
      component: <CultivoTab />
    },
    {
      value: "tecnologia",
      label: "Tecnología e Innovación",
      component: <TecnologiaTab />
    },
    {
      value: "investigacion",
      label: "Investigación",
      component: <InvestigacionTab />
    },
    {
      value: "extension",
      label: "Extensión y Capacitación",
      component: <ExtensionTab />
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
/*         {
      value: "investigacion-programa",
      label: "Investigación",
      component: <InvestigationTabs lineas={lineasDeInvestigacion} areas={areas} image={Tanque} /> 
    } */
  ];

  return (
    <div className='flex flex-col items-center mt-23'>
      <QuienesSomos title={"Acuicultura y Biotecnologia"} description={"Descubre la biodiversidad de Costa Rica "} img={Tanque} />
      <ExhibitIntro description={"El Parque Marino del Pacífico cuenta con un Laboratorio de Acuicultura y Biotecnología Marina (LABM) que es fundamental para su misión de sostenibilidad de los recursos marino-costeros. Este laboratorio no es solo un espacio de investigación, sino que tiene un fuerte componente de extensión y transferencia tecnológica hacia las comunidades costeras de Costa Rica."} title={"Programa de Acuicultura y Biotecnología"} />
      <div className='ml-90 mr-90'>
        <OurApproach title={"Nuestro Enfoque"} paragraphs={paragraphs} imageSrc={Tanque} workAreasTitle={"Áreas de Trabajo:"} workAreas={workAreas} buttonText={"Conocer más"} onButtonClick={handleButtonClick} imageAlt={"Img del programa"}  />
      
      
        <TabsContainer tabs={acuiculturaTabs} defaultValue="cultivo" />
      </div>
      <SuccessCases />
      <CallToAction />
    </div>
  )
}

export default AcuiculturaBiotecnologia
