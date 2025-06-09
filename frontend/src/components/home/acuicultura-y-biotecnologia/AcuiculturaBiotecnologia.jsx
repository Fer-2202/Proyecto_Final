import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import Tanque from "./../../../assets/img/fotos.verticales_(1).jpg"
import AboutSection from '../quienes-somos/AboutSection'
import ExhibitIntro from '../exhibiciones-y-servicios/ExhibitIntro'
import DescriptionSection from './components/DescriptionSection'
import { Link } from 'react-router-dom'

function AcuiculturaBiotecnologia() {
  return (
    <div className='flex flex-col items-center mt-23'>
      <QuienesSomos title={"Acuicultura y Biotecnologia"} description={"Descubre la biodiversidad de Costa Rica "} img={Tanque} />
      <ExhibitIntro description={"En el Parque Marino Central del Pacífico Sur desarrollamos investigación aplicada en acuicultura y biotecnología marina, con el objetivo de promover la producción sostenible de recursos marinos, contribuir a la seguridad alimentaria y generar alternativas económicas para las comunidades costeras."} title={"Programa de Acuicultura y Biotecnología"} />
      <DescriptionSection image={Tanque} title={"Acuicultura"} paragraphs={["La acuicultura es la producción de alimentos acuáticos en gran escala, como peces, mariscos y algas. En el Parque Marino Central del Pacífico Sur, desarrollamos proyectos de acuicultura sostenible, con el objetivo de promover la producción de alimentos marinos y contribuir a la seguridad alimentaria."]} listTitle={"Beneficios de la acuicultura"} listItems={["Producción de alimentos marinos", "Contribuir a la seguridad alimentaria", "Generar alternativas económicas para las comunidades costeras"]} button={<Link to="/acuicultura">Ver más</Link>} />
    </div>
  )
}

export default AcuiculturaBiotecnologia
