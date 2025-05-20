import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from '@/components/ui/navigation-menu'
  import { Button } from '@/components/ui/button'
  import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
  import { Menu } from 'lucide-react';
  import { Link } from 'react-router-dom'

function MobileMenu() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
            <Button variant='ghost'
            size='icon'
            className='hover:bg-primary/10 focus:bg-primary/20 rounded-full transiion'>
              <Menu className='h-6 w-6' />
            </Button>
        </SheetTrigger>
        <SheetContent 
        side='bottom'
        className='w-[320px] p-8 bg-bakground/95 backdrop-blur-xl border-l border-border shadow-2xl'>
          <NavigationMenu orientation='vertical' className='w-full'>
            <NavigationMenuList className='flex-col items-start space-y-4'>

              {/* Dropdown 1 */}
              <NavigationMenuItem className="w-full">
                <NavigationMenuTrigger className="w-full justify-between hover:bg-primary/10 focus:bg-primary/10 rounded-md transition-colors px-3 py-2 text-base font-semibold">
                  Quiénes Somos
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 p-4 hover:bg-accent/50 rounded-lg">
                    <NavigationMenuLink href="/quienes-somos" className="hover:text-primary transition-colors px-2 py-1 rounded-md">Información institucional</NavigationMenuLink>
                    <NavigationMenuLink href="/quienes-somos/historia" className="hover:text-primary transition-colors px-2 py-1 rounded-md">Historia</NavigationMenuLink>
                    <NavigationMenuLink href="/quienes-somos/equipo" className="hover:text-primary transition-colors px-2 py-1 rounded-md">Equipo</NavigationMenuLink>
                    <NavigationMenuLink href="/transparencia" className="hover:text-primary transition-colors px-2 py-1 rounded-md">Transparencia institucional</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Dropdown 2 */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Exhibiciones y Servicios</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1 p-2">
                    <NavigationMenuLink href="/exhibiciones">Exhibiciones</NavigationMenuLink>
                    <NavigationMenuLink href="/servicios-educativos">Servicios Educativos</NavigationMenuLink>
                    <NavigationMenuLink href="/servicios-educativos/visitas-guiadas">Visitas guiadas</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Dropdown 3 */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Investigación y Conservación</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1 p-2">
                    <NavigationMenuLink href="/acuicultura">Acuicultura y Biotecnología Marina</NavigationMenuLink>
                    <NavigationMenuLink href="/centro-rescate">Centro de Rescate</NavigationMenuLink>
                    <NavigationMenuLink href="/investigacion">Investigación</NavigationMenuLink>
                    <NavigationMenuLink href="/investigacion/proyectos">Proyectos actuales</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Dropdown 4 */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Apoyo</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1 p-2">
                    <NavigationMenuLink href="/voluntariado">Voluntariado</NavigationMenuLink>
                    <NavigationMenuLink href="/donar">Donar</NavigationMenuLink>
                    <NavigationMenuLink href="/patrocinios">Patrocinios</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Ticketera */}
              <NavigationMenuItem>
                <Button asChild className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-bold shadow-lg transition text-base py-3 rounded-lg">
                  <Link href="/compra-ticket">Ticketera</Link>
                </Button>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileMenu
