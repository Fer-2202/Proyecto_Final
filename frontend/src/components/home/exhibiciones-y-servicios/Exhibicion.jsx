import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import Tanque from "./../../../assets/img/Tanque.jpeg"
import MarineExhibit from './MarineExhibit.jsx'
import ExhibitIntro from './ExhibitIntro.jsx'
import exhibitsData from './exhibitsData.js'

function Exhibicion() {
    return (
        <div className='flex flex-col items-center mt-23'>
            <QuienesSomos title={"Exhibicion"} description={"Descubre la biodiversidad de Costa Rica "} img={Tanque} />
            <ExhibitIntro description={"El Parque Marino Central del Pacifico Sur cuenta con diversas exhibiciones que le permitirán conocer las riquezas de la biodiversidad marina de Costa Rica. Desde la fauna marina, pasando por torutgas marinas, tiburones y rayarios, nuestras exhibiciones te ofrecen una experiencia educativa y entretenida."} title={"Nuestras Exhibiciones"} />
            <MarineExhibit data={exhibitsData} />

        </div>
    )
}

export default Exhibicion
