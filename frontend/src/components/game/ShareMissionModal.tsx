'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Employee } from '@/types';
import { DialogBox } from '@/components/ui/DialogBox';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelInput } from '@/components/ui/PixelInput';
import {
  encodeMissionCode,
  decodeMissionCode,
  generateShareURL,
  generateShortMissionId,
} from '@/utils/mission-codes';

interface ShareMissionModalProps {
  turnoDescripcion: string;
  turnoDia: string;
  empleados: Employee[];
  onLoadMission: (turnoDescripcion: string, turnoDia: string, empleados: Employee[]) => void;
  onClose: () => void;
}

export function ShareMissionModal({
  turnoDescripcion,
  turnoDia,
  empleados,
  onLoadMission,
  onClose,
}: ShareMissionModalProps) {
  const [tab, setTab] = useState<'share' | 'load'>('share');
  const [missionCode, setMissionCode] = useState('');
  const [copied, setCopied] = useState(false);

  const code = encodeMissionCode(turnoDescripcion, turnoDia, empleados);
  const shortId = generateShortMissionId(code);
  const shareUrl = generateShareURL(turnoDescripcion, turnoDia, empleados);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadMission = () => {
    const decoded = decodeMissionCode(missionCode);
    if (decoded) {
      onLoadMission(decoded.turnoDescripcion, decoded.turnoDia, decoded.empleados);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <DialogBox animate={false} showCursor={false}>
          COMPARTIR MISION
        </DialogBox>

        <div className="pixel-border pixel-border-inner bg-[#0f3460] p-6 mt-4 space-y-4">
          {/* Tab buttons */}
          <div className="flex gap-2 mb-4">
            <PixelButton
              variant={tab === 'share' ? 'success' : 'secondary'}
              onClick={() => setTab('share')}
              size="sm"
            >
              COMPARTIR
            </PixelButton>
            <PixelButton
              variant={tab === 'load' ? 'success' : 'secondary'}
              onClick={() => setTab('load')}
              size="sm"
            >
              CARGAR
            </PixelButton>
          </div>

          {/* Share tab */}
          {tab === 'share' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="text-center font-['VT323']">
                <div className="text-[#4ade80] mb-2">ID CORTO:</div>
                <div className="text-[#facc15] text-2xl font-bold">{shortId}</div>
                <div className="text-[#e2e2e2] text-xs mt-2">
                  Comparte este ID con tus compañeros
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-['VT323'] text-[#facc15]">CODIGO COMPLETO:</div>
                <div className="bg-[#16213e] p-2 pixel-border text-[#e2e2e2] font-['VT323'] text-xs break-all">
                  {code}
                </div>
                <PixelButton
                  variant={copied ? 'success' : 'primary'}
                  onClick={handleCopyCode}
                  size="sm"
                  className="w-full"
                >
                  {copied ? '✓ COPIADO' : 'COPIAR CODIGO'}
                </PixelButton>
              </div>

              <div className="space-y-2">
                <div className="font-['VT323'] text-[#facc15]">LINK COMPARTIBLE:</div>
                <div className="bg-[#16213e] p-2 pixel-border text-[#e2e2e2] font-['VT323'] text-xs break-all">
                  {shareUrl}
                </div>
                <PixelButton
                  variant={copied ? 'success' : 'primary'}
                  onClick={handleCopyURL}
                  size="sm"
                  className="w-full"
                >
                  {copied ? '✓ COPIADO' : 'COPIAR LINK'}
                </PixelButton>
              </div>
            </motion.div>
          )}

          {/* Load tab */}
          {tab === 'load' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <PixelInput
                label="Pega el código aquí"
                value={missionCode}
                onChange={(e) => setMissionCode(e.target.value)}
                placeholder="MSN_..."
              />
              <PixelButton
                variant="success"
                onClick={handleLoadMission}
                size="md"
                className="w-full"
                disabled={!missionCode.startsWith('MSN_')}
              >
                CARGAR MISION
              </PixelButton>
            </motion.div>
          )}

          {/* Close button */}
          <PixelButton
            variant="secondary"
            onClick={onClose}
            size="sm"
            className="w-full mt-4"
          >
            CERRAR
          </PixelButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
