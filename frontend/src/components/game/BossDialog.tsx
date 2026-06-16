'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DialogBox } from '@/components/ui/DialogBox';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelInput } from '@/components/ui/PixelInput';
import { validateDate } from '@/utils/validators';

interface BossDialogProps {
  onConfirm: (description: string, date: string) => void;
  onBack: () => void;
}

export function BossDialog({ onConfirm, onBack }: BossDialogProps) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<{ description?: string; date?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!description.trim()) {
      newErrors.description = 'Necesitamos una descripción del turno';
    }
    if (!validateDate(date)) {
      newErrors.date = 'Formato: DD/MM/YYYY';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onConfirm(description, date);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-center gap-8 px-4 py-8"
    >
      {/* Boss Character */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-6xl mb-4"
      >
        👔
      </motion.div>

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl"
      >
        <DialogBox showCursor animate>
          ¡Necesito tu ayuda!

Tenemos un turno que cubrir.
¿Cuál es la descripción y cuándo?
        </DialogBox>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-6"
      >
        <PixelInput
          label="Descripción del Turno"
          placeholder="Ej: Turno Matutino, Cobertura de Fin de Semana..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors({ ...errors, description: undefined });
          }}
          error={errors.description}
        />

        <PixelInput
          label="Fecha (DD/MM/YYYY)"
          placeholder="Ej: 25/05/2026"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            if (errors.date) setErrors({ ...errors, date: undefined });
          }}
          error={errors.date}
        />

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <PixelButton variant="secondary" onClick={onBack} size="md">
            &lt; ATRÁS
          </PixelButton>
          <PixelButton variant="success" type="submit" size="md">
            SIGUIENTE &gt;
          </PixelButton>
        </div>
      </motion.form>
    </motion.div>
  );
}
