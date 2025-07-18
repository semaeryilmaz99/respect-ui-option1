import React from 'react';

const Avatar = ({ 
  src,
  alt = '',
  size = 'md',
  username = '',
  className = '',
  online = false,
  badge = null,
  onClick,
  ...props 
}) => {
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl',
    '3xl': 'h-24 w-24 text-3xl'
  };
  
  const baseClasses = `relative inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden ${sizes[size]}`;
  const hoverClasses = onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : '';
  
  const avatarClasses = `${baseClasses} ${hoverClasses} ${className}`;
  
  // Kullanıcı adının ilk harfi için fallback
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };
  
  return (
    <div className={avatarClasses} onClick={onClick} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt || username}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      
      {/* Fallback - kullanıcı adının ilk harfi */}
      <div 
        className={`${src ? 'hidden' : 'flex'} h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white font-medium`}
        style={{ display: src ? 'none' : 'flex' }}
      >
        {getInitials(username)}
      </div>
      
      {/* Online indicator */}
      {online && (
        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
      )}
      
      {/* Badge (respect count, level vb.) */}
      {badge && (
        <div className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {badge}
        </div>
      )}
    </div>
  );
};

export default Avatar; 