'use client';

import { motion } from 'framer-motion';
import { Employee } from '@/types';
import { CharacterData, getCharacterData } from '@/data/characters';

interface CharacterCardProps {
  employee: Employee;
  onRemove: (name: string) => void;
  onEditJornadas: (index: number) => void;
  index: number;
}

export function CharacterCard({
  employee,
  onRemove,
  onEditJornadas,
  index,
}: CharacterCardProps) {
  const character: CharacterData = getCharacterData(employee.nombre);

  const jornadaTypeLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      dias_puntuales: 'Días Puntuales',
      dias_entresemana: 'Lunes-Viernes',
      dias_finesemana: 'Fin de Semana',
      dias_del_mes: 'Días del Mes',
      excepcional: 'Excepción',
    };
    return labels[tipo] || tipo;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <div className="pixel-border pixel-border-inner bg-[#0f3460] p-4">
        {/* Header with sprite */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="text-5xl p-3 pixel-border"
            style={{ backgroundColor: character.spriteColor + '20' }}
          >
            {character.spriteEmoji || '👤'}
          </div>
          <div className="flex-1">
            <h3 className="font-['Press_Start_2P'] text-[#facc15] text-lg">
              {employee.nombre.toUpperCase()}
            </h3>
            <p className="font-['VT323'] text-[#4ade80] text-xs">
              {character.role}
            </p>
            {employee.equipo && (
              <p className="font-['VT323'] text-[#e94560] text-xs">
                EQUIPO: {employee.equipo.toUpperCase()}
              </p>
            )}
          </div>
        </div>

        {/* Jornadas */}
        <div className="mb-4 border-t border-[#16213e] pt-3">
          <div className="font-['VT323'] text-[#facc15] text-xs mb-2">
            HORARIOS:
          </div>
          <div className="space-y-1">
            {employee.jornadas.map((jornada, idx) => (
              <div
                key={idx}
                className="font-['VT323'] text-[#e2e2e2] text-xs bg-[#16213e] px-2 py-1"
              >
                • {jornadaTypeLabel(jornada.tipo)}
                {jornada.diasPuntuales && jornada.diasPuntuales.length > 0 && (
                  <span className="ml-1 text-[#4ade80]">
                    ({jornada.diasPuntuales.join(', ')})
                  </span>
                )}
                {jornada.diasDelMes && jornada.diasDelMes.length > 0 && (
                  <span className="ml-1 text-[#4ade80]">
                    ({jornada.diasDelMes.join(', ')})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-center pt-3 border-t border-[#16213e]">
          <button
            onClick={() => onEditJornadas(index)}
            className="flex-1 pixel-border bg-[#0f3460] hover:bg-[#facc15] text-[#e2e2e2] hover:text-[#1a1a2e] px-2 py-1 font-['VT323'] text-xs transition-colors"
          >
            HORARIOS
          </button>
          <button
            onClick={() => onRemove(employee.nombre)}
            className="flex-1 pixel-border bg-[#e94560] hover:bg-[#ec4899] text-[#e2e2e2] px-2 py-1 font-['VT323'] text-xs transition-colors"
          >
            ELIMINAR
          </button>
        </div>
      </div>
    </motion.div>
  );
}
