import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import contaminacion from './../../../assets/img/contaminacion_1.jpg'
import ExhibitIntro from './components/ExhibitIntro'
import MarineExhibit from './components/MarineExhibit'
import educationData from './data/educationData'
import EducationPrograms from './components/EducationPrograms'
import EducationalMaterials from './components/EducationalMaterials'
import materialsData from './data/materialsData'

function Servicios_Educativos() {
  return (
    <div className='mt-23'>
      <QuienesSomos title={"Servicios Educativos"} description={"Programas educativos para los jovenes"} img={contaminacion} />
      <ExhibitIntro description={"El Parque Marino ofrece una variedad de talleres educativos diseñados para crear conciencia y promover la protección de los ecosistemas marino-costeros, el objetivo de estos talleres es que los niños y jóvenes aprendan jugando."} title={"Nuestros Servicios Educativos"}/>
      <MarineExhibit data={educationData} />
      <EducationPrograms />
      <EducationalMaterials data={materialsData} />
    </div>
  )
}

export default Servicios_Educativos
