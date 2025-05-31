import React from 'react'
import QuienesSomos from '../../../components/home/quienes-somos/QuienesSomos'
import AboutSection from '../../../components/home/quienes-somos/AboutSection'
import TeamMembers from '../../../components/home/quienes-somos/TeamMembers'
import Valores from '../../../components/home/quienes-somos/Valores'
import MissionCTA from '../../../components/home/quienes-somos/MissionCTA'

function InfoInstitucional() {
  return (
    <>
      <div className='flex flex-col items-center justify-center mt-23'>
      <QuienesSomos />
      <AboutSection />
      <TeamMembers />
      <Valores />
      <MissionCTA />
      </div>
    </>
  )
}

export default InfoInstitucional