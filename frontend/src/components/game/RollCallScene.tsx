'use client';

import { motion } from 'framer-motion';
import { getCharacterData } from '@/data/characters';

interface RollCallSceneProps {
  employees: string[];
}

export function RollCallScene({ employees }: RollCallSceneProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const characterVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    checking: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.6, repeat: 2 },
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-center gap-8 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-['Press_Start_2P'] text-[#facc15] text-2xl text-center pixel-pulse"
      >
        VERIFICANDO...
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8"
      >
        {employees.map((name, idx) => {
          const character = getCharacterData(name);
          return (
            <motion.div
              key={idx}
              variants={characterVariants}
              animate="checking"
              className="flex items-center gap-4"
            >
              <div
                className="text-5xl p-3 pixel-border"
                style={{ backgroundColor: character.spriteColor + '20' }}
              >
                {character.spriteEmoji || '👤'}
              </div>
              <div className="font-['VT323']">
                <div className="text-[#4ade80] font-bold">{name.toUpperCase()}</div>
                <div className="text-[#e2e2e2] text-sm">{character.role}</div>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-[#facc15] font-['Press_Start_2P'] text-lg"
              >
                ▶
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
