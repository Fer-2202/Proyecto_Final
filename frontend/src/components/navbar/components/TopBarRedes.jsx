import React from 'react'
import { Facebook, Youtube, Instagram } from 'lucide-react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaTiktok } from 'react-icons/fa';
import {Link} from 'react-router-dom'

const socialNetworks = [
  {
    id: 1,
    name: 'Facebook',
    url: 'https://www.facebook.com/parquemarinodelpacifico',
    icon: FaFacebook,
    color: 'hover:text-blue-600'
  },
  /* {
    id: 2,
    name: 'Twitter',
    url: 'https://twitter.com/parquemarino',
    icon: FaTwitter,
    color: 'hover:text-blue-400'
  }, */
  {
    id: 3,
    name: 'Instagram',
    url: 'https://www.instagram.com/parque.marino.del.pacifico',
    icon: FaInstagram,
    color: 'hover:text-pink-600'
  },
  {
    id: 4,
    name: 'YouTube',
    url: 'https://www.youtube.com/@ParqueMarino',
    icon: FaYoutube,
    color: 'hover:text-red-600'
  },
  {
    id: 5,
    name: 'Tiktok',
    url: 'https://www.tiktok.com/@parquemarinodelpacifico',
    icon: FaTiktok,
    color: 'hover:text-purple-800'
  }
]

function TopBarRedes() {
  return (
    <>
      <div className="bg-[#2bb5b1] text-white text-sm px-4 py-1 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>Síguenos |</span>
          {/* {[Facebook, Youtube, Instagram].map((Icon, i) => (
            <a key={i} href="#" className="hover:scale-110 transition" aria-label="Red social">
              <Icon className="w-4 h-4" />
            </a>
            
          ))} */}
          {socialNetworks.map((network) => {
        const Icon = network.icon;
        return (
          <a
            key={network.id}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:scale-110 ${network.color} transition-colors duration-300`}
            aria-label={`Visitar ${network.name}`}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
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