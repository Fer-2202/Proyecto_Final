import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

// Configuración de redes sociales
const socialNetworks = [
  {
    id: 1,
    name: 'Facebook',
    url: 'https://www.facebook.com/parquemarinodelpacifico',
    icon: FaFacebook,
    color: 'hover:text-blue-600'
  },
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
];

/**
 * Componente TopBarRedes - Barra superior con enlaces a redes sociales
 * 
 * Características:
 * - Enlaces a redes sociales del Parque Marino
 * - Enlaces de autenticación (Registrarse/Iniciar Sesión)
 * - Diseño responsive
 * 
 * Uso:
 * <TopBarRedes />
 * 
 * Modificaciones:
 * - Para agregar/quitar redes sociales, edita el array 'socialNetworks'
 * - Los colores de hover se pueden personalizar en cada red social
 */
function TopBarRedes() {
  return (
    <div className="bg-[#2bb5b1] text-white text-sm px-4 py-1 flex justify-between items-center">
      {/* Sección de redes sociales */}
      <div className="flex items-center gap-2">
        <span>Síguenos |</span>
        {socialNetworks.map((network) => {
          const Icon = network.icon;
          return (
            <a
              key={network.id}
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:scale-110 ${network.color} transition-all duration-300`}
              aria-label={`Visitar ${network.name}`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>

      {/* Enlaces de autenticación */}
      <div className="flex gap-3 font-semibold">
        <Link to="/register" className="hover:underline transition-all duration-200">
          Registrarse
        </Link>
        <span>|</span>
        <Link to="/login" className="hover:underline transition-all duration-200">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}

export default TopBarRedes;
