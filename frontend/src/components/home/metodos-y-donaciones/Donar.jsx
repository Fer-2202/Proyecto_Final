import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import ExhibitIntro from '../exhibiciones-y-servicios/components/ExhibitIntro'
import placeholder from "@assets/placeholder.svg";

function Donar() {
  return (
    <div>
      <QuienesSomos title={"Donaciones"} description={"Apoya nuestra misión de conservación marina"} img={placeholder} />
      <ExhibitIntro description={"El Parque Marino Central del Pacífico Sur es una institución sin fines de lucro dedicada a la conservación, investigación y educación sobre los ecosistemas marinos de Costa Rica. Tu donación nos ayuda a continuar con nuestra labor de protección de la biodiversidad marina"} title={"Tu Apoyo Hace la Diferencia"} />
    </div>
  )
}

export default Donar
