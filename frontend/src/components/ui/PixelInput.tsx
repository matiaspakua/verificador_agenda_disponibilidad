'use client';

import React from 'react';

interface PixelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function PixelInput({
  label,
  error,
  className = '',
  ...props
}: PixelInputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-['Press_Start_2P'] text-sm text-[#facc15]">
          {label}
        </label>
      )}
      <input
        className={`
          pixel-border bg-[#0f3460] text-[#e2e2e2]
          px-3 py-2 font-['VT323']
          placeholder-[#888]
          focus:outline-none focus:bg-[#16213e]
          focus:border-[#4ade80]
          transition-colors
          ${error ? 'border-[#e94560]' : 'border-[#e2e2e2]'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-[#e94560] font-['VT323'] text-xs">
          ✗ {error}
        </span>
      )}
    </div>
  );
}
