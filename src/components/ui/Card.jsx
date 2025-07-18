import React from 'react';

const Card = ({ 
  children, 
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  className = '',
  onClick,
  hoverable = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 transition-all duration-200';
  
  const variants = {
    default: 'bg-white',
    dark: 'bg-gray-900 border-gray-700 text-white',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-none',
    glass: 'bg-white/10 backdrop-blur-md border-white/20 text-white'
  };
  
  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const shadows = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  const hoverClasses = hoverable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  
  const cardClasses = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${shadows[shadow]} ${hoverClasses} ${className}`;
  
  return (
    <div
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Card alt componentleri
Card.Header = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

export default Card; 