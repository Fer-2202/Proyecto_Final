import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function DesktopMenu() {
  return (
    <>
      <div className='hidden md:flex gap-2 items-center'>
        {/* Quienes somos */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
            variant='ghost'
            className='px-5 py-2 text-base font-semibold text-gray-800 hover:bg-primary/15 hover:text-primary focus:bg-primary/20 focus:text-primary rounded-lg transition-colors duration-150 shadow-none'>
              Quiénes Somos
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </>
  )
}

export default DesktopMenu
