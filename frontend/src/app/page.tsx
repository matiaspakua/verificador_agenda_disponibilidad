'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TitleScreen } from '@/components/game/TitleScreen';
import { BossDialog } from '@/components/game/BossDialog';
import { GameState } from '@/types';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    scene: 'title',
    turnoDescripcion: '',
    turnoDia: '',
    empleados: [],
  });

  const handleStartGame = () => {
    setGameState((prev) => ({
      ...prev,
      scene: 'mission',
    }));
  };

  const handleMissionConfirm = (description: string, date: string) => {
    setGameState((prev) => ({
      ...prev,
      turnoDescripcion: description,
      turnoDia: date,
      scene: 'roster',
      empleados: [],
    }));
  };

  const handleBackToTitle = () => {
    setGameState((prev) => ({
      ...prev,
      scene: 'title',
    }));
  };

  return (
    <main className="w-full">
      <AnimatePresence mode="wait">
        {gameState.scene === 'title' && (
          <TitleScreen key="title" onStartGame={handleStartGame} />
        )}
        {gameState.scene === 'mission' && (
          <BossDialog
            key="mission"
            onConfirm={handleMissionConfirm}
            onBack={handleBackToTitle}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
