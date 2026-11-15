import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface CinematicButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const CinematicButton: React.FC<CinematicButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ariaLabel,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#D95D24] text-[#F5EFE6] border border-[#EA6B2F]/60 shadow-[0_6px_24px_-6px_rgba(217,93,36,0.55)] hover:bg-[#EA6B2F] hover:shadow-[0_10px_30px_-4px_rgba(217,93,36,0.75)]',
    secondary:
      'bg-[#F5EFE6] text-[#121110] border border-[#F5EFE6] hover:bg-[#EAE0D0] shadow-[0_6px_20px_-6px_rgba(245,239,230,0.25)]',
    outline:
      'bg-[#1B1917]/70 text-[#F5EFE6] border border-[#C8A15A]/50 hover:border-[#C8A15A] hover:bg-[#23201D]',
    ghost:
      'bg-transparent text-[#F5EFE6]/85 border border-transparent hover:text-[#F5EFE6] hover:bg-white/5',
  }[variant];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={shouldReduceMotion || disabled ? undefined : { scale: 1.025 }}
      whileTap={shouldReduceMotion || disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121110] disabled:cursor-not-allowed disabled:opacity-50 ${sizeStyles} ${variantStyles} ${className}`}
    >
      {/* Subtle animated sheen sweep on hover */}
      {!shouldReduceMotion && !disabled && variant !== 'ghost' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
