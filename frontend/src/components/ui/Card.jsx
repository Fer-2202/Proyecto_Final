import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default',
  className = '',
  hover = false,
  clickable = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  const variants = {
    default: 'bg-white shadow-lg',
    elevated: 'bg-white shadow-xl hover:shadow-2xl',
    outlined: 'bg-white border border-gray-200',
    filled: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100'
  };
  
  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-xl' : '';
  const clickableClasses = clickable ? 'cursor-pointer active:scale-95' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverClasses} ${clickableClasses} ${className}`;
  
  const CardComponent = clickable ? motion.button : motion.div;
  
  return (
    <CardComponent
      className={classes}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={clickable ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

// Card Header Component
Card.Header = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

// Card Body Component
Card.Body = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

// Card Footer Component
Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl ${className}`} {...props}>
    {children}
  </div>
);

export default Card; 