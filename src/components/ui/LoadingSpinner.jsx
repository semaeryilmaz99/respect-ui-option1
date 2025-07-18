import React from 'react';

const LoadingSpinner = ({ 
  size = 'md',
  variant = 'primary',
  fullScreen = false,
  text = '',
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4', 
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
    '2xl': 'h-16 w-16'
  };
  
  const variants = {
    primary: 'text-purple-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    success: 'text-green-600',
    danger: 'text-red-600'
  };
  
  const spinnerClasses = `animate-spin ${sizes[size]} ${variants[variant]} ${className}`;
  
  const Spinner = () => (
    <svg 
      className={spinnerClasses}
      fill="none" 
      viewBox="0 0 24 24"
      {...props}
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <Spinner />
          {text && (
            <p className="mt-4 text-gray-600 font-medium">{text}</p>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="inline-flex items-center gap-2">
      <Spinner />
      {text && (
        <span className="text-gray-600 font-medium text-sm">{text}</span>
      )}
    </div>
  );
};

// Özel spinner türleri
LoadingSpinner.Dots = ({ size = 'md', variant = 'primary', className = '' }) => {
  const dotSizes = {
    sm: 'h-1 w-1',
    md: 'h-1.5 w-1.5', 
    lg: 'h-2 w-2'
  };
  
  const variants = {
    primary: 'bg-purple-600',
    secondary: 'bg-gray-600',
    white: 'bg-white'
  };
  
  const dotClasses = `${dotSizes[size]} ${variants[variant]} rounded-full`;
  
  return (
    <div className={`flex space-x-1 ${className}`}>
      <div className={`${dotClasses} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`${dotClasses} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`${dotClasses} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

LoadingSpinner.Pulse = ({ size = 'md', variant = 'primary', className = '' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
  
  const variants = {
    primary: 'bg-purple-200',
    secondary: 'bg-gray-200'
  };
  
  return (
    <div className={`${sizes[size]} ${variants[variant]} rounded-full animate-pulse ${className}`} />
  );
};

LoadingSpinner.Skeleton = ({ lines = 3, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }, (_, i) => (
      <div key={i} className="h-4 bg-gray-200 rounded-lg animate-pulse" />
    ))}
  </div>
);

export default LoadingSpinner; 