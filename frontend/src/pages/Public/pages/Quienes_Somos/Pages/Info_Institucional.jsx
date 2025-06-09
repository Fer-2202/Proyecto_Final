import React from 'react'
import QuienesSomos from '../../../../../components/home/quienes-somos/QuienesSomos'
import AboutSection from '../../../../../components/home/quienes-somos/AboutSection'
import TeamMembers from '../../../../../components/home/quienes-somos/TeamMembers'
import Valores from '../../../../../components/home/quienes-somos/Valores'
import MissionCTA from '../../../../../components/home/quienes-somos/MissionCTA'
import IMG_INFO from '../../../../../assets/img/486175245_29175038435443319_583041807967260808_n.jpg'

function InfoInstitucional() {
  return (
    <>
      <div className='flex flex-col items-center justify-center mt-23'>
      <QuienesSomos title={"Información Institucional"} description={"Conoce nuestra historia, misión, visión y valores."} img={IMG_INFO} alt={"Información Institucional"} />
      <AboutSection />
      <TeamMembers />
      <Valores />
      <MissionCTA />
      </div>
    </>
  )
}

export default InfoInstitucional