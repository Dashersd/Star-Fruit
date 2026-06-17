import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'premium';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-forest-900 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-sf-500 text-forest-900 hover:bg-sf-400 shadow-[0_0_20px_rgba(0,168,126,0.2)] hover:shadow-[0_0_30px_rgba(0,168,126,0.4)] focus:ring-sf-400",
    secondary: "bg-forest-800 text-gold hover:bg-forest-700 border border-gold/30 hover:border-gold/60 shadow-lg focus:ring-gold",
    outline: "border border-white/20 text-ink-200 hover:bg-white/5 hover:text-white hover:border-white/40 focus:ring-ink-300",
    ghost: "text-ink-300 hover:text-white hover:bg-white/5 focus:ring-ink-500",
    premium: "bg-gradient-to-r from-gold-bronze via-gold to-gold-bronze text-forest-900 shadow-[0_0_18px_rgba(240,201,122,0.4)] hover:shadow-[0_0_25px_rgba(240,201,122,0.6)] focus:ring-gold border border-gold-pale/50"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-mono tracking-wide"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
