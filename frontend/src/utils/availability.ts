import { Employee, Jornada, AvailabilityRequest, AvailabilityResponse } from '../types';

const SPANISH_DAYS = [
  'domingo',
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
];

const WEEKDAYS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
const WEEKEND_DAYS = ['sabado', 'domingo'];

/**
 * Parse DD/MM/YYYY and return the Spanish day of week (lowercase, no accents)
 */
export function getEmployeeDayOfWeek(dateStr: string): string {
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();
  return SPANISH_DAYS[dayOfWeek];
}

/**
 * Extract day of month from DD/MM/YYYY
 */
export function getDayOfMonth(dateStr: string): number {
  const [day] = dateStr.split('/').map(Number);
  return day;
}

/**
 * Check if a single jornada matches the given date
 */
export function isEmployeeAvailableForDate(
  jornada: Jornada,
  dateStr: string
): boolean {
  switch (jornada.tipo) {
    case 'dias_puntuales': {
      const dayOfWeek = getEmployeeDayOfWeek(dateStr);
      return jornada.diasPuntuales?.includes(dayOfWeek) ?? false;
    }

    case 'dias_entresemana': {
      const dayOfWeek = getEmployeeDayOfWeek(dateStr);
      return WEEKDAYS.includes(dayOfWeek);
    }

    case 'dias_finesemana': {
      const dayOfWeek = getEmployeeDayOfWeek(dateStr);
      return WEEKEND_DAYS.includes(dayOfWeek);
    }

    case 'dias_del_mes': {
      const dayOfMonth = getDayOfMonth(dateStr);
      return jornada.diasDelMes?.includes(dayOfMonth) ?? false;
    }

    case 'excepcional': {
      const dayOfMonth = getDayOfMonth(dateStr);
      const matches = jornada.diasDelMes?.includes(dayOfMonth) ?? false;
      if (!matches) return false;
      // Excepcional always returns the autorizacionTrabaja value
      return jornada.autorizacionTrabaja ?? false;
    }

    default:
      return false;
  }
}

/**
 * Check if an employee is available for the given date
 * considering all their jornadas with excepcional taking priority
 */
export function isEmployeeAvailable(
  employee: Employee,
  dateStr: string
): boolean {
  // Check if there's an applicable excepcional jornada (they have priority)
  for (const jornada of employee.jornadas) {
    if (jornada.tipo === 'excepcional') {
      const dayOfMonth = getDayOfMonth(dateStr);
      if (jornada.diasDelMes?.includes(dayOfMonth)) {
        // Excepcional matches, return its value (true/false)
        return jornada.autorizacionTrabaja ?? false;
      }
    }
  }

  // No applicable excepcional, check other jornadas with OR logic
  for (const jornada of employee.jornadas) {
    if (jornada.tipo !== 'excepcional' && isEmployeeAvailableForDate(jornada, dateStr)) {
      return true;
    }
  }

  return false;
}

/**
 * Main function: check availability with team rules applied
 */
export function checkAvailabilityLocal(
  request: AvailabilityRequest
): AvailabilityResponse {
  const { empleados, turnoDia } = request;

  if (!empleados || empleados.length === 0) {
    return {
      availableEmployees: [],
      totalAvailable: 0,
      timestamp: new Date().toISOString(),
      shiftDetails: {
        date: request.turnoDia,
        description: request.turnoDescripcion || '',
      },
    };
  }

  // Phase 1: Check individual availability
  const individuallyAvailable = new Set<string>();
  for (const emp of empleados) {
    if (emp.nombre && isEmployeeAvailable(emp, turnoDia)) {
      individuallyAvailable.add(emp.nombre);
    }
  }

  // Phase 2: Apply team rules
  // Group employees by team
  const teamMap = new Map<string, string[]>();
  const noTeamEmployees = new Set<string>();

  for (const emp of empleados) {
    if (!emp.nombre) continue;

    if (!emp.equipo) {
      noTeamEmployees.add(emp.nombre);
    } else {
      if (!teamMap.has(emp.equipo)) {
        teamMap.set(emp.equipo, []);
      }
      teamMap.get(emp.equipo)!.push(emp.nombre);
    }
  }

  // Build final available list
  const finalAvailable = new Set<string>();

  // Add no-team employees if individually available
  for (const empName of noTeamEmployees) {
    if (individuallyAvailable.has(empName)) {
      finalAvailable.add(empName);
    }
  }

  // Add teams only if ALL members are individually available
  for (const [, members] of teamMap.entries()) {
    const allMembersAvailable = members.every((name) =>
      individuallyAvailable.has(name)
    );

    if (allMembersAvailable) {
      members.forEach((name) => finalAvailable.add(name));
    }
  }

  const availableList = Array.from(finalAvailable);

  return {
    availableEmployees: availableList,
    totalAvailable: availableList.length,
    timestamp: new Date().toISOString(),
    shiftDetails: {
      date: request.turnoDia,
      description: request.turnoDescripcion || '',
    },
  };
}
