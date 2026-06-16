'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface DialogBoxProps {
  children: React.ReactNode;
  className?: string;
  showCursor?: boolean;
  animate?: boolean;
}

export function DialogBox({
  children,
  className = '',
  showCursor = true,
  animate = true,
}: DialogBoxProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4 }}
      className={`
        pixel-border pixel-border-inner
        bg-[#16213e] p-6
        max-w-2xl
        relative
        ${className}
      `}
    >
      <div className="font-['VT323'] text-[#e2e2e2] leading-relaxed whitespace-pre-wrap">
        {children}
      </div>

      {showCursor && (
        <span className="inline-block ml-2 animate-pulse text-[#4ade80]">
          ▶
        </span>
      )}
    </motion.div>
  );
}
