import React from 'react';

const Badge = ({ 
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon = null,
  pulse = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center gap-1 font-medium rounded-full transition-all duration-200';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800', 
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    dark: 'bg-gray-800 text-white',
    respect: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    trending: 'bg-gradient-to-r from-orange-400 to-red-500 text-white',
    online: 'bg-green-500 text-white',
    new: 'bg-blue-500 text-white'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };
  
  const pulseClasses = pulse ? 'animate-pulse' : '';
  
  const badgeClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${pulseClasses} ${className}`;
  
  return (
    <span className={badgeClasses} {...props}>
      {icon && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

// Özel badge türleri
Badge.Respect = ({ amount, className = '', ...props }) => (
  <Badge variant="respect" className={className} {...props}>
    <span className="text-xs">₺</span>
    {amount}
  </Badge>
);

Badge.Trending = ({ className = '', ...props }) => (
  <Badge 
    variant="trending" 
    className={className}
    icon={
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
      </svg>
    }
    {...props}
  >
    Trending
  </Badge>
);

Badge.Online = ({ count, className = '', ...props }) => (
  <Badge 
    variant="online" 
    className={className}
    icon={
      <div className="w-2 h-2 bg-green-300 rounded-full animate-ping" />
    }
    {...props}
  >
    {count ? `${count} online` : 'Online'}
  </Badge>
);

Badge.New = ({ className = '', ...props }) => (
  <Badge 
    variant="new" 
    className={className}
    pulse={true}
    {...props}
  >
    NEW
  </Badge>
);

export default Badge; 