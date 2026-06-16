'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Employee } from '@/types';
import { DialogBox } from '@/components/ui/DialogBox';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelInput } from '@/components/ui/PixelInput';
import { CharacterCard } from './CharacterCard';
import { validateEmployee } from '@/utils/validators';

interface CharacterRosterProps {
  employees: Employee[];
  onEmployeesChange: (employees: Employee[]) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function CharacterRoster({
  employees,
  onEmployeesChange,
  onContinue,
  onBack,
}: CharacterRosterProps) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Employee | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleAddEmployee = () => {
    const newEmployee: Employee = {
      nombre: '',
      equipo: null,
      jornadas: [{ tipo: 'dias_entresemana' }],
    };
    onEmployeesChange([...employees, newEmployee]);
  };

  const handleRemoveEmployee = (idx: number) => {
    onEmployeesChange(employees.filter((_, i) => i !== idx));
  };

  const handleEditEmployee = (idx: number) => {
    setEditingIdx(idx);
    setEditForm({ ...employees[idx] });
    setErrors([]);
  };

  const handleSaveEmployee = () => {
    if (!editForm) return;

    const validation = validateEmployee(editForm);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const updated = [...employees];
    updated[editingIdx!] = editForm;
    onEmployeesChange(updated);
    setEditingIdx(null);
    setEditForm(null);
  };


  const canContinue = employees.length > 0 && employees.every((emp) => validateEmployee(emp).valid);

  if (editingIdx !== null && editForm) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-center gap-8 px-4 py-8"
      >
        <DialogBox showCursor={false} animate={false}>
          Editando personaje: {editForm.nombre || '(sin nombre)'}
        </DialogBox>

        <div className="w-full max-w-2xl flex flex-col gap-4">
          <PixelInput
            label="Nombre"
            value={editForm.nombre}
            onChange={(e) =>
              setEditForm({ ...editForm, nombre: e.target.value })
            }
            error={errors[0]}
          />

          <PixelInput
            label="Equipo (Opcional)"
            value={editForm.equipo || ''}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                equipo: e.target.value || null,
              })
            }
          />

          <div className="flex gap-2 justify-center">
            <PixelButton
              variant="secondary"
              onClick={() => {
                setEditingIdx(null);
                setEditForm(null);
              }}
            >
              CANCELAR
            </PixelButton>
            <PixelButton
              variant="success"
              onClick={handleSaveEmployee}
            >
              GUARDAR
            </PixelButton>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-start gap-6 px-4 py-8"
    >
      <DialogBox showCursor={false} animate>
        Elige tus personajes para la mision.
      </DialogBox>

      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <AnimatePresence>
            {employees.map((emp, idx) => (
              <CharacterCard
                key={idx}
                employee={emp}
                index={idx}
                onEdit={() => handleEditEmployee(idx)}
                onRemove={() => handleRemoveEmployee(idx)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {employees.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="font-['VT323'] text-[#e94560] text-lg">
              No hay personajes aun. Agrega uno para empezar.
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex gap-4">
        <PixelButton variant="secondary" onClick={handleAddEmployee} size="md">
          + AGREGAR
        </PixelButton>
      </div>

      <div className="flex gap-4 mt-6">
        <PixelButton variant="secondary" onClick={onBack} size="md">
          &lt; ATRÁS
        </PixelButton>
        <PixelButton
          variant="success"
          onClick={onContinue}
          disabled={!canContinue}
          size="md"
        >
          VERIFICAR &gt;
        </PixelButton>
      </div>
    </motion.div>
  );
}
