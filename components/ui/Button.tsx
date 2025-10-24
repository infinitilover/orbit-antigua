import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyles = 'px-6 py-3 font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:shadow-none';
  
  const variantStyles = {
    primary: 'bg-brand-turquoise text-brand-navy hover:bg-opacity-80 hover:shadow-lg focus:ring-brand-turquoise disabled:bg-gray-300',
    secondary: 'bg-brand-navy text-white hover:bg-opacity-90 hover:shadow-lg focus:ring-brand-navy disabled:bg-gray-500',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;