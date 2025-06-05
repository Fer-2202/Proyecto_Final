import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import Tanque from "./../../../assets/img/Tanque.jpeg"
import MarineExhibit from './MarineExhibit.jsx'
import ExhibitIntro from './ExhibitIntro.jsx'

function Exhibicion() {
    return (
        <div>
            <QuienesSomos title={"Exhibicion"} description={"Descubre la biodiversidad de Costa Rica "} img={Tanque} />
            <ExhibitIntro />
            <MarineExhibit />

        </div>
    )
}

export default Exhibicion
