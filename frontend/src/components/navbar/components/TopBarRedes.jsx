import React from 'react'
import { Facebook, Youtube, Instagram } from 'lucide-react'

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
          <a href="/register" className="hover:underline">Registrarse</a>
          <span>|</span>
          <a href="/login" className="hover:underline">Iniciar Sesión</a>
          <span>|</span>
          <a href="/donar" className="hover:underline">Donar</a>
        </div>
      </div>
    </>
  )
}

export default TopBarRedes