'use client';

import { motion } from 'framer-motion';
import { PixelButton } from '@/components/ui/PixelButton';
import { ServerStatus } from '@/components/ui/ServerStatus';

interface TitleScreenProps {
  onStartGame: () => void;
}

export function TitleScreen({ onStartGame }: TitleScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-center gap-8 px-4"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center"
      >
        <div className="font-['Press_Start_2P'] text-4xl md:text-6xl text-[#facc15] mb-4 pixel-pulse">
          RPG PIXEL
        </div>
        <div className="font-['Press_Start_2P'] text-2xl md:text-4xl text-[#4ade80] mb-8">
          OFICINA
        </div>
        <div className="font-['VT323'] text-[#e2e2e2] text-sm md:text-base">
          ~ VERIFICADOR DE DISPONIBILIDAD ~
        </div>
      </motion.div>

      {/* Server Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <ServerStatus />
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-xl text-center font-['VT323']"
      >
        <div className="bg-[#16213e] pixel-border pixel-border-inner p-6 mb-8">
          <div className="text-[#facc15] text-sm mb-4">¡BIENVENIDO, GERENTE!</div>
          <div className="text-[#e2e2e2] text-xs leading-relaxed mb-4">
            Tu misión: verificar quién puede cubrir los turnos de la oficina.
            Ingresa empleados, sus horarios, y descubre quiénes están disponibles.
          </div>
          <div className="text-[#4ade80] text-xs">
            Recuerda: si alguien del equipo no puede venir,
            ninguno del equipo viene.
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <PixelButton
          size="lg"
          variant="success"
          onClick={onStartGame}
          className="min-w-[240px]"
        >
          &gt; INICIAR JUEGO &lt;
        </PixelButton>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-auto pb-6 text-center text-[#888] font-['VT323'] text-xs"
      >
        <div>Juego de Rol de Disponibilidad - Oficina 2026</div>
      </motion.div>
    </motion.div>
  );
}
