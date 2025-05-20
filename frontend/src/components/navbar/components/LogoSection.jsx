import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "./../../../assets/img/LOGO.webp"

function LogoSection() {
  return (
    <>
      <Link to="/" className="flex items-center gap-4 text-left rounded-lg"/>
      <span className='flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full shadown-md'>
        <img src={Logo} alt="" className='w-20 h-20 object-cover rounded-full'/>
      </span>
      <span className='grid'>
        <span className="font-bold text-lg tracking-wide">PARQUE MARINO</span>
        <span className="text-sm text-muted-foreground">DEL PACIFICO SUR</span>
      </span>
    </>
  )
}

export default LogoSection
