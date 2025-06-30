import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import { motion } from "framer-motion";

const MobileMenu = ({ isOpen, links, ticketLink }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className='md:hidden bg-white px-4 py-4 space-y-4'
    >
      {[...links, ticketLink].map((link) =>
        link.dropdown ? (
          <div key={link.href}>
            <span className='font-medium text-gray-700'>{link.name}</span>
            <div className='pl-4'>
              {link.sublinks.map((sublink) => (
                <Link
                  key={sublink.href}
                  to={sublink.href}
                  className='block py-1 text-gray-700 hover:text-[#26b7ad]'
                >
                  {sublink.name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={link.href}
            to={link.href}
            className={`block text-gray-700 hover:text-gray-700 transition ${link.isButton ? 'cursor-pointer' : ''}- ${
              link.isButton
                ? 'bg-[#26b7ad] text-white font-semibold text-center py-2 rounded-md mt-2 flex items-center justify-center gap-2'
                : ''
            }`}
          >
            {link.isButton && <Ticket className='w-4 h-4' />}
            {link.name}
          </Link>
        )
      )}
    </motion.div>
  );
};

export default MobileMenu;