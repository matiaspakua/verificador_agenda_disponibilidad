'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/utils/api';

export function ServerStatus() {
  const [status, setStatus] = useState<'UP' | 'DOWN' | 'CHECKING'>('CHECKING');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const result = await apiClient.getHealth();
        setStatus(result.status);
      } catch {
        setStatus('DOWN');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = status === 'UP' ? 'bg-[#4ade80]' : 'bg-[#e94560]';
  const statusText =
    status === 'UP' ? 'SERVER OK' : status === 'DOWN' ? 'NO SERVER' : 'CHECKING...';

  return (
    <div className="flex items-center gap-2 font-['VT323'] text-sm">
      <div className={`w-3 h-3 pixel-border ${statusColor}`} />
      <span className="text-[#e2e2e2]">{statusText}</span>
    </div>
  );
}
