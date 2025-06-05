import React from 'react'
import QuienesSomos from '../quienes-somos/QuienesSomos'
import Tanque from "./../../../assets/img/Tanque.jpeg"
import Tabs from './tabs'

function Exhibicion() {
    return (
        <div>
           <QuienesSomos title={"Exhibicion"} description={"Descubre la biodiversidad de Costa Rica "} img={Tanque} />
           <Tabs />

        </div>
    )
}

export default Exhibicion
