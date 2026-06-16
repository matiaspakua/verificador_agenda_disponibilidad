'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TitleScreen } from '@/components/game/TitleScreen';
import { BossDialog } from '@/components/game/BossDialog';
import { CharacterRoster } from '@/components/game/CharacterRoster';
import { RollCallScene } from '@/components/game/RollCallScene';
import { ResultsScene } from '@/components/game/ResultsScene';
import { GameState } from '@/types';
import { apiClient } from '@/utils/api';
import { checkAvailabilityLocal } from '@/utils/availability';

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

  const handleRosterContinue = async () => {
    setGameState((prev) => ({
      ...prev,
      scene: 'rollcall',
    }));

    try {
      // Try API first
      const response = await apiClient.checkAvailability({
        turnoDescripcion: gameState.turnoDescripcion,
        turnoDia: gameState.turnoDia,
        empleados: gameState.empleados,
      });

      // Simulate processing time for animation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setGameState((prev) => ({
        ...prev,
        scene: 'results',
        results: response,
      }));
    } catch {
      // Fallback to client-side logic if API fails
      const response = checkAvailabilityLocal({
        turnoDescripcion: gameState.turnoDescripcion,
        turnoDia: gameState.turnoDia,
        empleados: gameState.empleados,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setGameState((prev) => ({
        ...prev,
        scene: 'results',
        results: response,
      }));
    }
  };

  const handleBackToMission = () => {
    setGameState((prev) => ({
      ...prev,
      scene: 'mission',
    }));
  };

  const handleBackToTitle = () => {
    setGameState((prev) => ({
      ...prev,
      scene: 'title',
      turnoDescripcion: '',
      turnoDia: '',
      empleados: [],
      results: undefined,
      error: undefined,
    }));
  };

  const handleNewGame = () => {
    setGameState({
      scene: 'title',
      turnoDescripcion: '',
      turnoDia: '',
      empleados: [],
    });
  };

  const handleEmployeesChange = (empleados: typeof gameState.empleados) => {
    setGameState((prev) => ({
      ...prev,
      empleados,
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
        {gameState.scene === 'roster' && (
          <CharacterRoster
            key="roster"
            employees={gameState.empleados}
            onEmployeesChange={handleEmployeesChange}
            onContinue={handleRosterContinue}
            onBack={handleBackToMission}
          />
        )}
        {gameState.scene === 'rollcall' && (
          <RollCallScene
            key="rollcall"
            employees={gameState.empleados.map((e) => e.nombre)}
          />
        )}
        {gameState.scene === 'results' && gameState.results && (
          <ResultsScene
            key="results"
            results={gameState.results}
            onNewGame={handleNewGame}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
