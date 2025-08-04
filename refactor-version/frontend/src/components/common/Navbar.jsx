import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiDonateHeart } from 'react-icons/bi';
import {
  Ticket,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

// Importaciones de shadcn/ui
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Importaciones locales
import logo from "@/assets/img/LOGO.webp";
// import { useAuth } from "@/context/AuthContext";
import TopBarRedes from "./TopBarRedes";

// Enlaces de acción (botones)
const ticketLink = {
  name: "Ticketera",
  href: "/purchase-form/ticketera",
};

const donarLink = {
  name: "Donar",
  href: "/apoyo/donaciones",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = false;
  const user = null;
  const logout = () => {};

  return (
    <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-white/90 via-[#e6f7f6]/80 to-white/90 backdrop-blur-md shadow-lg border-b border-gray-200">
      <TopBarRedes />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo Parque Marino del Pacífico"
            className="h-12 w-auto drop-shadow-[0_2px_8px_rgba(38,183,173,0.10)] rounded-2xl"
          />
          <div className="leading-tight flex flex-col">
            <span className="text-base font-extrabold text-gray-800 uppercase tracking-wide">
              Parque Marino
            </span>
            <span className="text-xs text-gray-600">
              Del Pacífico
            </span>
          </div>
        </Link>

        {/* Menú de navegación principal - Deshabilitamos el viewport para que cada menú aparezca debajo de su trigger */}
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="flex items-center space-x-1">
            {/* Menú: Quienes Somos */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-[#26b7ad]/10 data-[state=open]:bg-[#26b7ad]/10">
                Quienes Somos
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/quienes-somos/informacion-institucional"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#26b7ad]/10 hover:text-[#26b7ad] focus:bg-[#26b7ad]/10 focus:text-[#26b7ad]"
                      >
                        <div className="text-sm font-medium leading-none">Información Institucional</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          Conoce más sobre nuestra institución
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/quienes-somos/transparencia-institucional"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#26b7ad]/10 hover:text-[#26b7ad] focus:bg-[#26b7ad]/10 focus:text-[#26b7ad]"
                      >
                        <div className="text-sm font-medium leading-none">Transparencia Institucional</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          Información transparente de nuestra gestión
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Menú: Exhibiciones y Servicios */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-[#26b7ad]/10 data-[state=open]:bg-[#26b7ad]/10">
                Exhibiciones y Servicios
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/exhibiciones-y-servicios/exhibiciones"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#26b7ad]/10 hover:text-[#26b7ad] focus:bg-[#26b7ad]/10 focus:text-[#26b7ad]"
                      >
                        <div className="text-sm font-medium leading-none">Exhibiciones</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          Descubre nuestras exhibiciones marinas
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/exhibiciones-y-servicios/servicios-educativos"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#26b7ad]/10 hover:text-[#26b7ad] focus:bg-[#26b7ad]/10 focus:text-[#26b7ad]"
                      >
                        <div className="text-sm font-medium leading-none">Servicios Educativos</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          Programas educativos para todas las edades
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Menú: Investigación y Conservación */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-[#26b7ad]/10 data-[state=open]:bg-[#26b7ad]/10">
                Investigación y Conservación
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/investigacion-y-conservacion/acuicultura-y-biotecnologia-marina"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#26b7ad]/10 hover:text-[#26b7ad] focus:bg-[#26b7ad]/10 focus:text-[#26b7ad]"
                      >
                        <div className="text-sm font-medium leading-none">Acuicultura y Biotecnología Marina</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          Investigación en biotecnología marina
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/investigacion-y-conservacion/centro-de-rescate-y-rehabilitacion"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#26b7ad]/10 hover:text-[#26b7ad] focus:bg-[#26b7ad]/10 focus:text-[#26b7ad]"
                      >
                        <div className="text-sm font-medium leading-none">Centro de Rescate y Rehabilitación</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          Rescate y cuidado de vida marina
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center gap-4">
          <Separator orientation="vertical" className="h-8" />
          
          <Button asChild className="bg-[#26b7ad] text-white font-semibold rounded-2xl shadow-[0_2px_8px_rgba(38,183,173,0.10)]">
            <Link to={donarLink.href} className="flex items-center gap-2">
              <BiDonateHeart className="w-4 h-4" />
              {donarLink.name}
            </Link>
          </Button>

          <Button asChild className="bg-[#26b7ad] text-white font-semibold rounded-2xl shadow-[0_2px_8px_rgba(38,183,173,0.10)]">
            <Link to={ticketLink.href} className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              {ticketLink.name}
            </Link>
          </Button>

          {/* Menú del usuario - Usar DropdownMenu en lugar de NavigationMenu para evitar conflictos */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menú de Navegación</SheetTitle>
              <SheetDescription>
                Navega por las diferentes secciones del Parque Marino del Pacífico
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Quienes Somos</h3>
                <div className="pl-4 space-y-2">
                  <Link
                    to="/quienes-somos/informacion-institucional"
                    className="block text-sm text-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Información Institucional
                  </Link>
                  <Link
                    to="/quienes-somos/transparencia-institucional"
                    className="block text-sm text-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Transparencia Institucional
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Exhibiciones y Servicios</h3>
                <div className="pl-4 space-y-2">
                  <Link
                    to="/exhibiciones-y-servicios/exhibiciones"
                    className="block text-sm text-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Exhibiciones
                  </Link>
                  <Link
                    to="/exhibiciones-y-servicios/servicios-educativos"
                    className="block text-sm text-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Servicios Educativos
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Investigación y Conservación</h3>
                <div className="pl-4 space-y-2">
                  <Link
                    to="/investigacion-y-conservacion/acuicultura-y-biotecnologia-marina"
                    className="block text-sm text-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Acuicultura y Biotecnología Marina
                  </Link>
                  <Link
                    to="/investigacion-y-conservacion/centro-de-rescate-y-rehabilitacion"
                    className="block text-sm text-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Centro de Rescate y Rehabilitación
                  </Link>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <Button asChild className="w-full bg-[#26b7ad] text-white">
                  <Link to={donarLink.href} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <BiDonateHeart className="w-4 h-4" />
                    {donarLink.name}
                  </Link>
                </Button>
                
                <Button asChild className="w-full bg-[#26b7ad] text-white">
                  <Link to={ticketLink.href} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <Ticket className="w-4 h-4" />
                    {ticketLink.name}
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
