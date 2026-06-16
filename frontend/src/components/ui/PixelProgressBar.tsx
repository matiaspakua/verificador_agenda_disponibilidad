'use client';

import { motion } from 'framer-motion';

interface PixelProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'green' | 'red' | 'yellow' | 'blue';
}

const colorMap = {
  green: 'bg-[#4ade80]',
  red: 'bg-[#e94560]',
  yellow: 'bg-[#facc15]',
  blue: 'bg-[#0f3460]',
};

export function PixelProgressBar({
  value,
  max = 100,
  label,
  color = 'green',
}: PixelProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="font-['VT323'] text-[#e2e2e2] text-sm">{label}</span>
      )}
      <div className="pixel-border bg-[#0f3460] p-1 w-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={`h-6 ${colorMap[color]} pixel-border-inner`}
        >
          {percentage > 20 && (
            <span className="font-['VT323'] text-xs text-[#1a1a2e] flex items-center justify-center h-full">
              {Math.round(percentage)}%
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
}
