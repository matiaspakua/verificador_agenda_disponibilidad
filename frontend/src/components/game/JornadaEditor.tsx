'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Employee, Jornada } from '@/types';
import { DialogBox } from '@/components/ui/DialogBox';
import { PixelButton } from '@/components/ui/PixelButton';

interface JornadaEditorProps {
  employee: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

const WEEKDAY_NAMES = [
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
  'domingo',
];

export function JornadaEditor({ employee, onSave, onCancel }: JornadaEditorProps) {
  const [jornadas, setJornadas] = useState<Jornada[]>(employee.jornadas);
  const [addingType, setAddingType] = useState<Jornada['tipo'] | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedMonthDays, setSelectedMonthDays] = useState<number[]>([]);

  const handleAddJornada = (tipo: Jornada['tipo']) => {
    setAddingType(tipo);
    setSelectedDays([]);
    setSelectedMonthDays([]);
  };

  const handleConfirmJornada = () => {
    if (!addingType) return;

    const newJornada: Jornada = {
      tipo: addingType,
    };

    if (addingType === 'dias_puntuales' && selectedDays.length > 0) {
      newJornada.diasPuntuales = selectedDays;
    } else if (addingType === 'dias_del_mes' && selectedMonthDays.length > 0) {
      newJornada.diasDelMes = selectedMonthDays;
    } else if (addingType === 'dias_entresemana' || addingType === 'dias_finesemana') {
      // These don't need additional parameters
    } else {
      return; // Invalid jornada
    }

    setJornadas([...jornadas, newJornada]);
    setAddingType(null);
  };

  const handleRemoveJornada = (idx: number) => {
    setJornadas(jornadas.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (jornadas.length === 0) {
      alert('Debe agregar al menos una jornada');
      return;
    }
    onSave({ ...employee, jornadas });
  };

  const jornadaLabel = (jornada: Jornada) => {
    switch (jornada.tipo) {
      case 'dias_puntuales':
        return `${jornada.diasPuntuales?.join(', ') || 'días'}`;
      case 'dias_entresemana':
        return 'Lunes a Viernes';
      case 'dias_finesemana':
        return 'Sábado y Domingo';
      case 'dias_del_mes':
        return `Días: ${jornada.diasDelMes?.join(', ') || 'del mes'}`;
      case 'excepcional':
        return `Excepción: ${jornada.diasDelMes?.join(', ')} ${
          jornada.autorizacionTrabaja ? '✓ Sí' : '✗ No'
        }`;
      default:
        return 'Desconocido';
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
        className="w-full max-w-3xl max-h-[80vh] overflow-y-auto"
      >
        <DialogBox animate={false} showCursor={false}>
          CONFIGURAR JORNADAS DE: {employee.nombre.toUpperCase()}
        </DialogBox>

        <div className="pixel-border pixel-border-inner bg-[#0f3460] p-6 mt-4 space-y-4">
          {/* Current jornadas */}
          <div>
            <div className="font-['Press_Start_2P'] text-[#facc15] text-sm mb-3">
              JORNADAS ACTUALES:
            </div>

            {jornadas.length === 0 ? (
              <div className="font-['VT323'] text-[#e94560]">Sin jornadas configuradas</div>
            ) : (
              <div className="space-y-2">
                {jornadas.map((jornada, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#16213e] p-3 flex items-center justify-between pixel-border"
                  >
                    <span className="font-['VT323'] text-[#e2e2e2] text-sm">
                      {jornada.tipo.replace(/_/g, ' ').toUpperCase()}: {jornadaLabel(jornada)}
                    </span>
                    <PixelButton
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveJornada(idx)}
                    >
                      X
                    </PixelButton>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Add new jornada section */}
          {!addingType ? (
            <div className="space-y-2">
              <div className="font-['Press_Start_2P'] text-[#facc15] text-sm mb-2">
                AGREGAR NUEVA JORNADA:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <PixelButton
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAddJornada('dias_entresemana')}
                >
                  L-V
                </PixelButton>
                <PixelButton
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAddJornada('dias_finesemana')}
                >
                  S-D
                </PixelButton>
                <PixelButton
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAddJornada('dias_puntuales')}
                >
                  DÍAS
                </PixelButton>
                <PixelButton
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAddJornada('dias_del_mes')}
                >
                  DEL MES
                </PixelButton>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#16213e] p-4 space-y-3"
            >
              <div className="font-['VT323'] text-[#facc15] text-sm">
                Configurar: {addingType.replace(/_/g, ' ').toUpperCase()}
              </div>

              {/* Weekdays selection */}
              {addingType === 'dias_puntuales' && (
                <div className="space-y-2">
                  <div className="font-['VT323'] text-[#e2e2e2] text-xs">
                    Selecciona los días:
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {WEEKDAY_NAMES.map((day) => (
                      <button
                        key={day}
                        onClick={() => {
                          if (selectedDays.includes(day)) {
                            setSelectedDays(selectedDays.filter((d) => d !== day));
                          } else {
                            setSelectedDays([...selectedDays, day]);
                          }
                        }}
                        className={`pixel-border py-2 px-2 text-xs font-['VT323'] transition-colors ${
                          selectedDays.includes(day)
                            ? 'bg-[#4ade80] text-[#1a1a2e]'
                            : 'bg-[#0f3460] text-[#e2e2e2] hover:bg-[#16213e]'
                        }`}
                      >
                        {day.substring(0, 3).toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Month days selection */}
              {addingType === 'dias_del_mes' && (
                <div className="space-y-2">
                  <div className="font-['VT323'] text-[#e2e2e2] text-xs">
                    Selecciona los números del mes (1-31):
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        onClick={() => {
                          if (selectedMonthDays.includes(day)) {
                            setSelectedMonthDays(selectedMonthDays.filter((d) => d !== day));
                          } else {
                            setSelectedMonthDays([...selectedMonthDays, day]);
                          }
                        }}
                        className={`pixel-border py-1 px-1 text-xs font-['VT323'] transition-colors ${
                          selectedMonthDays.includes(day)
                            ? 'bg-[#4ade80] text-[#1a1a2e]'
                            : 'bg-[#0f3460] text-[#e2e2e2] hover:bg-[#16213e]'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm/Cancel */}
              <div className="flex gap-2 justify-center pt-2">
                <PixelButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setAddingType(null)}
                >
                  CANCELAR
                </PixelButton>
                <PixelButton
                  variant="success"
                  size="sm"
                  onClick={handleConfirmJornada}
                  disabled={
                    (addingType === 'dias_puntuales' && selectedDays.length === 0) ||
                    (addingType === 'dias_del_mes' && selectedMonthDays.length === 0)
                  }
                >
                  AGREGAR
                </PixelButton>
              </div>
            </motion.div>
          )}

          {/* Save/Cancel buttons */}
          <div className="flex gap-2 justify-center pt-4 border-t border-[#16213e]">
            <PixelButton variant="secondary" size="sm" onClick={onCancel} className="flex-1">
              CANCELAR
            </PixelButton>
            <PixelButton variant="success" size="sm" onClick={handleSave} className="flex-1">
              GUARDAR
            </PixelButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
