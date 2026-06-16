export interface CharacterData {
  id: string;
  name: string;
  role: string;
  archetype: string;
  description: string;
  dialogues: {
    greeting: string;
    available: string;
    unavailable: string;
    teamMessage?: string;
  };
  spriteColor: string;
  spriteEmoji?: string;
}

export interface ArchetypeData {
  id: string;
  name: string;
  role: string;
  spriteColor: string;
  dialogueTemplates: {
    greeting: string[];
    available: string[];
    unavailable: string[];
  };
}

// Fixed characters from the domain
export const FIXED_CHARACTERS: Record<string, CharacterData> = {
  jefe: {
    id: 'jefe',
    name: 'El Jefe',
    role: 'Director de Oficina',
    archetype: 'boss',
    description: 'Líder ejecutivo que anuncia las misiones',
    dialogues: {
      greeting: '¡Necesitamos cubrir un turno! ¿Quiénes están disponibles?',
      available: 'Perfecto, esta persona puede ayudarnos.',
      unavailable: 'Esta persona no está disponible.',
      teamMessage: 'Si uno del equipo no puede, ninguno puede venir.',
    },
    spriteColor: '#e94560',
    spriteEmoji: '👔',
  },
  jazmin: {
    id: 'jazmin',
    name: 'Jazmín',
    role: 'Recepcionista',
    archetype: 'receptionist',
    description: 'Confiable de Lunes a Viernes. En diciembre, al Chaltén con la familia.',
    dialogues: {
      greeting: '¡Hola! Estoy lista para trabajar.',
      available: 'Puedo cubrir este turno sin problema.',
      unavailable: 'Lo siento, en estos días tengo otros planes.',
      teamMessage: 'Si mis compañeros no pueden, yo tampoco voy.',
    },
    spriteColor: '#facc15',
    spriteEmoji: '📞',
  },
  gregorio: {
    id: 'gregorio',
    name: 'Gregorio',
    role: 'Técnico IT',
    archetype: 'technician',
    description: 'Solo trabaja fines de semana',
    dialogues: {
      greeting: '¿Qué se ofrece, jefe?',
      available: 'Sábado o domingo, cuenten conmigo.',
      unavailable: 'Entre semana tengo que descansar.',
    },
    spriteColor: '#4ade80',
    spriteEmoji: '💻',
  },
  esteban: {
    id: 'esteban',
    name: 'Esteban',
    role: 'Desarrollador',
    archetype: 'developer',
    description: 'Part-time los fines de semana',
    dialogues: {
      greeting: 'Listo para algunas misiones.',
      available: 'Los fines de semana soy tuyo.',
      unavailable: 'Entre semana tengo clases.',
    },
    spriteColor: '#0f3460',
    spriteEmoji: '💾',
  },
  margarita: {
    id: 'margarita',
    name: 'Margarita',
    role: 'Contadora',
    archetype: 'accountant',
    description: 'Miércoles y fines de semana',
    dialogues: {
      greeting: 'Los números no se van a contar solos.',
      available: 'Puedo ayudar en estos días.',
      unavailable: 'Esos días no me quedan bien.',
    },
    spriteColor: '#ec4899',
    spriteEmoji: '📊',
  },
  fanny: {
    id: 'fanny',
    name: 'Fanny',
    role: 'Archivista',
    archetype: 'clerk',
    description: 'Jueves y días específicos del mes. Equipo inseparable con Benicio.',
    dialogues: {
      greeting: 'Junto con Benicio, listos para trabajar.',
      available: 'Podemos venir sin problema.',
      unavailable: 'Estos días no funcionamos bien.',
      teamMessage: 'Si Benicio no viene, yo tampoco.',
    },
    spriteColor: '#8b5cf6',
    spriteEmoji: '📂',
  },
  benicio: {
    id: 'benicio',
    name: 'Benicio',
    role: 'Asistente de Archivo',
    archetype: 'clerk',
    description: 'Jueves y días específicos del mes. Equipo inseparable con Fanny.',
    dialogues: {
      greeting: 'Con Fanny siempre, listos para actuar.',
      available: 'Cuenten con nosotros.',
      unavailable: 'No podemos ese día.',
      teamMessage: 'Si Fanny no viene, yo tampoco.',
    },
    spriteColor: '#06b6d4',
    spriteEmoji: '📝',
  },
};

// Archetypal generic employees
export const CHARACTER_ARCHETYPES: ArchetypeData[] = [
  {
    id: 'accountant',
    name: 'Contador',
    role: 'Departamento de Finanzas',
    spriteColor: '#ec4899',
    dialogueTemplates: {
      greeting: [
        'Los números me llaman.',
        'Revisando las cuentas.',
        'Día de auditoría.',
      ],
      available: [
        'Las planillas están al día, puedo venir.',
        'Mi agenda está libre.',
        'Puedo ayudar en esto.',
      ],
      unavailable: [
        'Esos días tengo reconciliación.',
        'Closing mensual, no puedo.',
        'Tengo que terminar reportes.',
      ],
    },
  },
  {
    id: 'developer',
    name: 'Programador',
    role: 'Equipo de Desarrollo',
    spriteColor: '#0f3460',
    dialogueTemplates: {
      greeting: [
        'Debug incoming!',
        'Código en las manos.',
        'En zona de programación.',
      ],
      available: [
        'El código compila hoy.',
        'Puedo dejar el commit para luego.',
        'Mi sprint permite esto.',
      ],
      unavailable: [
        'Sprint planning ese día.',
        'Deadline crítico, no puedo.',
        'Refactoring en progreso.',
      ],
    },
  },
  {
    id: 'receptionist',
    name: 'Recepcionista',
    role: 'Recepción',
    spriteColor: '#facc15',
    dialogueTemplates: {
      greeting: [
        'Aquí en recepción.',
        'Llamadas por atender.',
        'Visitantes esperando.',
      ],
      available: [
        'La recepción puede funcionar sola.',
        'Mi agenda está despejada.',
        'Puedo cubrir esto.',
      ],
      unavailable: [
        'Hay muchas visitas ese día.',
        'Entrega importante esperada.',
        'Reunión de equipo programada.',
      ],
    },
  },
  {
    id: 'messenger',
    name: 'Mensajero',
    role: 'Logística',
    spriteColor: '#14b8a6',
    dialogueTemplates: {
      greeting: [
        'Rutas por planificar.',
        'Paquetes por entregar.',
        'En movimiento.',
      ],
      available: [
        'Mis entregas son pocas.',
        'Hoy tengo tiempo.',
        'Sin compromisos.',
      ],
      unavailable: [
        'Muchas entregas programadas.',
        'Viaje de logística esa fecha.',
        'Inventario en curso.',
      ],
    },
  },
  {
    id: 'cleaning',
    name: 'Personal de Limpieza',
    role: 'Servicios Generales',
    spriteColor: '#10b981',
    dialogueTemplates: {
      greeting: [
        'La oficina siempre limpia.',
        'Escobas listas.',
        'A barrer y fregar.',
      ],
      available: [
        'Hoy puedo ayudar.',
        'Limpieza básica hecha.',
        'Sin problemas.',
      ],
      unavailable: [
        'Gran limpieza programada.',
        'Mantenimiento ese día.',
        'Desinfección especial.',
      ],
    },
  },
  {
    id: 'security',
    name: 'Seguridad',
    role: 'Seguridad e Instalaciones',
    spriteColor: '#ef4444',
    dialogueTemplates: {
      greeting: [
        'Vigilancia activada.',
        'En ronda de patrulla.',
        'Código: Alerta Verde.',
      ],
      available: [
        'Base de seguridad cubierta.',
        'Puedo asignarme.',
        'Disponible.',
      ],
      unavailable: [
        'Evento especial ese día.',
        'Guardia reforzada.',
        'Entrenamiento anual.',
      ],
    },
  },
  {
    id: 'marketing',
    name: 'Marketing',
    role: 'Comunicaciones',
    spriteColor: '#f97316',
    dialogueTemplates: {
      greeting: [
        'Creatividad en marcha.',
        'Brainstorm en progreso.',
        'Campaña en desarrollo.',
      ],
      available: [
        'Mi calendario está libre.',
        'Puedo dejar esto.',
        'Sin conflictos.',
      ],
      unavailable: [
        'Lanzamiento de campaña.',
        'Foto shoot programado.',
        'Deadline creativo.',
      ],
    },
  },
  {
    id: 'hr',
    name: 'RRHH',
    role: 'Recursos Humanos',
    spriteColor: '#a855f7',
    dialogueTemplates: {
      greeting: [
        'Gestionando talento.',
        'Entrevistas pendientes.',
        'Nómina en progreso.',
      ],
      available: [
        'Agenda flexible.',
        'Puedo reorganizar.',
        'Cuenten conmigo.',
      ],
      unavailable: [
        'Selección en curso.',
        'Capacitación ese día.',
        'Auditoría laboral.',
      ],
    },
  },
];

/**
 * Get character data by name
 * If it's a fixed character, return its data
 * Otherwise, assign an archetype based on name hash
 */
export function getCharacterData(name: string): CharacterData {
  const lowerName = name.toLowerCase().trim();

  // Check if it's a fixed character
  if (FIXED_CHARACTERS[lowerName]) {
    return FIXED_CHARACTERS[lowerName];
  }

  // Assign archetype by hash
  const hashCode = lowerName
    .split('')
    .reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0);
  const archetypeIndex = Math.abs(hashCode) % CHARACTER_ARCHETYPES.length;
  const archetype = CHARACTER_ARCHETYPES[archetypeIndex];

  // Pick random dialogues from templates
  const randDialogue = (templates: string[]) =>
    templates[Math.floor(Math.random() * templates.length)];

  return {
    id: lowerName,
    name: name,
    role: archetype.role,
    archetype: archetype.id,
    description: `Empleado del departamento de ${archetype.role}`,
    dialogues: {
      greeting: randDialogue(archetype.dialogueTemplates.greeting),
      available: randDialogue(archetype.dialogueTemplates.available),
      unavailable: randDialogue(archetype.dialogueTemplates.unavailable),
    },
    spriteColor: archetype.spriteColor,
  };
}

export function isFixedCharacter(name: string): boolean {
  return Object.keys(FIXED_CHARACTERS).includes(name.toLowerCase().trim());
}
