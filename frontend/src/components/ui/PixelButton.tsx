'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  primary: 'bg-[#0f3460] hover:bg-[#4ade80] text-[#e2e2e2]',
  secondary: 'bg-[#16213e] hover:bg-[#0f3460] text-[#e2e2e2]',
  danger: 'bg-[#e94560] hover:bg-[#ec4899] text-[#e2e2e2]',
  success: 'bg-[#4ade80] hover:bg-[#22c55e] text-[#1a1a2e]',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

export function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: PixelButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        pixel-border font-['Press_Start_2P'] font-bold
        transition-colors duration-150
        cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
