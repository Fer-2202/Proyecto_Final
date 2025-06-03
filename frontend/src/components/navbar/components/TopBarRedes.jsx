import React from 'react'
import { Facebook, Youtube, Instagram } from 'lucide-react'
import {Link} from 'react-router-dom'

function TopBarRedes() {
  return (
    <>
      <div className="bg-[#2bb5b1] text-white text-sm px-4 py-1 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>Síguenos |</span>
          {[Facebook, Youtube, Instagram].map((Icon, i) => (
            <a key={i} href="#" className="hover:scale-110 transition" aria-label="Red social">
              <Icon className="w-4 h-4" />
            </a>
            
          ))}
        </div>

        <div className="flex gap-3 font-semibold">
          <Link to="/register" className="hover:underline">Registrarse</Link>
          <span>|</span>
          <Link to="/login" className="hover:underline">Iniciar Sesión</Link>
          <span>|</span>
          <Link to="/apoyo/donaciones" className="hover:underline">Donar</Link>
        </div>
      </div>
    </>
  )
}

export default TopBarRedes