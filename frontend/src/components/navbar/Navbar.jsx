import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram } from "lucide-react"
import MobileMenu from './components/MobileMenu'
import LogoSection from './components/LogoSection';
import DesktopMenu from './components/DesktopMenu';

function Navbar() {
  return (
    <>
      <header className='w-full shadow-md sticky top-0 backdrop-blur bg-background/80 border-b border-border transition-all'>
          <div className='w-full h-[40px] bg-gradient-to-r from-primary/90 to-primary shadow-sm'>
              <div className='container h-full flex items-center justify-between'>
                <span className='text-sm text-white flex gap-2'>
                  Siguenos |
                  <Link to='/facebook' target='_blank' rel='noopener noreferrer' className='text-black hover:underline'><Facebook size={18} /></Link>
                  <Link to='/facebook' target='_blank' rel='noopener noreferrer' className='text-black hover:underline'><Youtube size={18} /></Link>
                  <Link to='/facebook' target='_blank' rel='noopener noreferrer' className='text-black hover:underline'><Instagram size={18} /></Link>
                </span>

              </div>
          </div>

          <nav className='bg-background/80'>
            <div className='container flex items-center justify-between py-4'>
              <LogoSection />
              <MobileMenu />
              <DesktopMenu />
            </div>
          </nav>

      </header>
    </>
  )
}

export default Navbar
