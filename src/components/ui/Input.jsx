import React from 'react';

const Input = ({ 
  type = 'text',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  error = false,
  errorMessage = '',
  label = '',
  size = 'md',
  variant = 'default',
  leftIcon = null,
  rightIcon = null,
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'border-gray-300 focus:border-purple-500 focus:ring-purple-500',
    filled: 'bg-gray-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-purple-500',
    outline: 'border-2 border-purple-300 focus:border-purple-500 focus:ring-purple-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg'
  };
  
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  const iconPadding = {
    left: leftIcon ? 'pl-10' : '',
    right: rightIcon ? 'pr-10' : ''
  };
  
  const inputClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${errorClasses} ${iconPadding.left} ${iconPadding.right} ${className}`;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="text-gray-400">
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

// Özel input türleri
Input.Search = ({ placeholder = 'Sanatçı, şarkı ara...', className = '', ...props }) => (
  <Input
    type="text"
    placeholder={placeholder}
    variant="filled"
    leftIcon={
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    }
    className={className}
    {...props}
  />
);

Input.Amount = ({ currency = '₺', placeholder = '0', className = '', ...props }) => (
  <Input
    type="number"
    placeholder={placeholder}
    leftIcon={
      <span className="text-purple-600 font-bold">{currency}</span>
    }
    className={className}
    {...props}
  />
);

Input.Password = ({ placeholder = 'Şifre', className = '', showPassword = false, onTogglePassword, ...props }) => (
  <Input
    type={showPassword ? 'text' : 'password'}
    placeholder={placeholder}
    rightIcon={
      <button
        type="button"
        onClick={onTogglePassword}
        className="text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        {showPassword ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )}
      </button>
    }
    className={className}
    {...props}
  />
);

export default Input; 