'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AvailabilityResponse } from '@/types';
import { DialogBox } from '@/components/ui/DialogBox';
import { PixelButton } from '@/components/ui/PixelButton';
import { getCharacterData } from '@/data/characters';

interface ResultsSceneProps {
  results: AvailabilityResponse;
  onNewGame: () => void;
}

export function ResultsScene({ results, onNewGame }: ResultsSceneProps) {
  const { availableEmployees, totalAvailable } = results;

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const characterVariants: any = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-start gap-8 px-4 py-8"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-['Press_Start_2P'] text-3xl text-center"
      >
        <div className="text-[#4ade80] mb-2">¡ MISION LISTA !</div>
        <div className="text-[#facc15] text-lg">
          {totalAvailable} disponibles
        </div>
      </motion.div>

      {/* Celebration animation */}
      {totalAvailable > 0 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
            transition: {
              type: 'spring',
              stiffness: 100,
              damping: 10,
            },
          } as any}
          className="text-6xl"
        >
          🎉
        </motion.div>
      )}

      {/* Available employees */}
      {availableEmployees.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl"
        >
          <div className="font-['Press_Start_2P'] text-[#4ade80] text-sm mb-4 text-center">
            DISPONIBLES
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {availableEmployees.map((name, idx) => {
                const character = getCharacterData(name);
                return (
                  <motion.div
                    key={name}
                    variants={characterVariants}
                    className="pixel-border pixel-border-inner bg-[#0f3460] p-4 flex items-center gap-4"
                  >
                    <div
                      className="text-4xl p-2 pixel-border"
                      style={{ backgroundColor: character.spriteColor + '20' }}
                    >
                      {character.spriteEmoji || '👤'}
                    </div>
                    <div className="flex-1">
                      <div className="font-['Press_Start_2P'] text-[#4ade80]">
                        {name.toUpperCase()}
                      </div>
                      <div className="font-['VT323'] text-[#e2e2e2] text-xs">
                        {character.dialogues.available}
                      </div>
                    </div>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: idx * 0.1,
                      }}
                      className="text-2xl"
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* No available message */}
      {availableEmployees.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pixel-border pixel-border-inner bg-[#e94560]/10 p-6 text-center max-w-lg"
        >
          <div className="text-3xl mb-2">😞</div>
          <div className="font-['VT323'] text-[#e2e2e2]">
            Nadie está disponible para este turno. Prueba con otra fecha o invita más gente.
          </div>
        </motion.div>
      )}

      {/* Shift details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-lg"
      >
        <DialogBox showCursor={false} animate={false}>
          Turno: {results.shiftDetails?.description}
          Fecha: {results.shiftDetails?.date}
        </DialogBox>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4"
      >
        <PixelButton variant="secondary" onClick={onNewGame} size="md">
          NUEVA MISION
        </PixelButton>
      </motion.div>
    </motion.div>
  );
}
