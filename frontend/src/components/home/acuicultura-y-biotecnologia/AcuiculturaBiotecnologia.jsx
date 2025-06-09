import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import Tanque from "./../../../assets/img/fotos.verticales_(1).jpg"
import AboutSection from '../quienes-somos/AboutSection'
import ExhibitIntro from '../exhibiciones-y-servicios/components/ExhibitIntro'
import OurApproach from './components/DescriptionSection'
import TabsContainer from './components/TabsContainer'
import SuccessCases from './components/SuccessCases'
import CallToAction from './components/CallToAction'
import { Link } from 'react-router-dom'

function AcuiculturaBiotecnologia() {

  const paragraphs = [
    "Nuestro programa de acuicultura y biotecnología se enfoca en el desarrollo de tecnologías y metodologías para el cultivo sostenible de especies marinas nativas del Pacífico costarricense, con énfasis en aquellas con potencial comercial y de repoblamiento.",
    "Trabajamos bajo un enfoque de economía circular, buscando maximizar la eficiencia en el uso de recursos y minimizar el impacto ambiental de las actividades acuícolas."
  ];

  const workAreas = [
    "Reproducción y cultivo de peces marinos",
    "Cultivo de moluscos bivalvos",
    "Producción de microalgas y macroalgas",
    "Biotecnología marina aplicada",
    "Sistemas de acuicultura multitrófica integrada"
  ];

  const handleButtonClick = () => {
    alert('Botón "Conocer Más" clickeado!');
  };

  return (
    <div className='flex flex-col items-center mt-23'>
      <QuienesSomos title={"Acuicultura y Biotecnologia"} description={"Descubre la biodiversidad de Costa Rica "} img={Tanque} />
      <ExhibitIntro description={"En el Parque Marino Central del Pacífico Sur desarrollamos investigación aplicada en acuicultura y biotecnología marina, con el objetivo de promover la producción sostenible de recursos marinos, contribuir a la seguridad alimentaria y generar alternativas económicas para las comunidades costeras."} title={"Programa de Acuicultura y Biotecnología"} />
      <OurApproach title={"Nuestro Enfoque"} paragraphs={paragraphs} imageSrc={Tanque} workAreasTitle={"Áreas de Trabajo:"} workAreas={workAreas} buttonText={"Conocer más"} onButtonClick={handleButtonClick} imageAlt={"Img del programa"} />
      <TabsContainer  />
      <SuccessCases />
      <CallToAction />
    </div>
  )
}

export default AcuiculturaBiotecnologia
