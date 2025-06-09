import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import ExhibitIntro from '../../../components/home/exhibiciones-y-servicios/components/ExhibitIntro'
import DescriptionSection from './components/DescriptionSection'
import Tanque from "./../../../assets/img/fotos.verticales_(1).jpg"
import { Link } from 'react-router-dom'

function CentroDeRescate() {
  return (
    <div className='mt-23'>
    <QuienesSomos title={"Centro de Rescate y Rehabilitación"} description={"Descubre la biodiversidad de Costa Rica "} />
    <ExhibitIntro description={"Te invitamos a conocer un poco sobre los inicios del Centro de Rescate y Rehabilitación de Animales Marinos conocido como CRRAM. Un centro de rescate especializado en la atención de tortugas marinas."} title={"Programa Centro de Rescate y Rehabilitación"} />
    <DescriptionSection /* image={Tanque} */ title={"Rescate y rehabilitacion"} paragraphs={["Te invitamos a conocer un poco sobre los inicios del Centro de Rescate y Rehabilitación de Animales Marinos conocido como CRRAM. Un centro de rescate especializado en la atención de tortugas marinas."]} listTitle={"Beneficios del Centro de Rescate"} listItems={["Rehabilitar mediante un manejo biológico y veterinario los animales que ingresan.", "Poder coordinar su posible liberación al medio silvestre.", "Se procura la liberación de toda tortuga marina, ave o cocodrilo excepto para el caso de aquellos que no se puedan valer por sí mismos", /* "como es el caso de los pelícanos totalmente inhabilitados para volar, o del caso de dos tortugas marinas que por sus condiciones fisiológicas como la pérdida de sus aletas no es posible su liberación.", */ "Estos animales residentes juegan un papel muy importante de educación en los visitantes que llegan al Parque Marino del Pacífico."]} 
    />


    </div>
  )
}

export default CentroDeRescate
