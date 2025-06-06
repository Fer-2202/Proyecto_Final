import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import contaminacion from './../../../assets/img/contaminacion_1.jpg'
import ExhibitIntro from './ExhibitIntro'
import MarineExhibit from './MarineExhibit'
import educationData from './educationData'

function Servicios_Educativos() {
  return (
    <div className='mt-23'>
      <QuienesSomos title={"Servicios Educativos"} description={"Programas educativos para los jovenes"} img={contaminacion} />
      <ExhibitIntro description={"El Parque Marino ofrece una variedad de talleres educativos diseñados para crear conciencia y promover la protección de los ecosistemas marino-costeros, el objetivo de estos talleres es que los niños y jóvenes aprendan jugando."} title={"Nuestros Servicios Educativos"}/>
      <MarineExhibit data={educationData} />
    </div>
  )
}

export default Servicios_Educativos
