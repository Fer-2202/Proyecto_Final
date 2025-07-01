import React, { useEffect, useState } from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import Tanque from "@assets/img/Tanque.jpeg"
import MarineExhibit from './components/MarineExhibit.jsx'
import ExhibitIntro from './components/ExhibitIntro.jsx'
import WorldSpeciesMap from '../../WorldSpeciesMap.jsx'
import VisitInfoSection from './components/VisitInfoSection.jsx'
import { getExhibits } from '@api/exhibits.js'

function Exhibicion() {
  const [exhibits, setExhibits] = useState([]);

  useEffect(() => {
    const fetchExhibits = async () => {
      try {
        const exhibits = await getExhibits();
        setExhibits(exhibits);
      } catch (error) {
        console.error('Error fetching exhibits:', error);
      }
    };
    fetchExhibits();
  }, []);

  console.log(exhibits);

  return (
    <div className='flex flex-col items-center mt-23'>
      <QuienesSomos title={"Exhibicion"} description={"Descubre la biodiversidad de Costa Rica "} img={Tanque} />
      <ExhibitIntro description={"El Parque Marino Central del Pacifico Sur cuenta con diversas exhibiciones que le permitirán conocer las riquezas de la biodiversidad marina de Costa Rica. Desde la fauna marina, pasando por torutgas marinas, tiburones y rayarios, nuestras exhibiciones te ofrecen una experiencia educativa y entretenida."} title={"Nuestras Exhibiciones"} />
       {exhibits.length > 0 && <MarineExhibit data={exhibits} />}
      <WorldSpeciesMap />
      <VisitInfoSection />
    </div>
  )
}

export default Exhibicion