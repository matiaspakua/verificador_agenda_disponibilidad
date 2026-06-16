import { Employee } from '@/types';

/**
 * Mission Code System
 * Allows sharing employee rosters via URL-safe codes
 */

/**
 * Encode employees and mission details into a mission code
 */
export function encodeMissionCode(
  turnoDescripcion: string,
  turnoDia: string,
  empleados: Employee[]
): string {
  const missionData = {
    turnoDescripcion,
    turnoDia,
    empleados,
  };

  const json = JSON.stringify(missionData);
  // Convert to Base64 URL-safe format
  const base64 = btoa(json);
  const urlSafe = base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `MSN_${urlSafe}`;
}

/**
 * Decode a mission code back to data
 */
export function decodeMissionCode(
  code: string
): {
  turnoDescripcion: string;
  turnoDia: string;
  empleados: Employee[];
} | null {
  if (!code.startsWith('MSN_')) {
    return null;
  }

  try {
    let base64 = code.substring(4);
    // Restore padding
    const padding = (4 - (base64.length % 4)) % 4;
    base64 += '='.repeat(padding);
    // Restore standard Base64
    base64 = base64.replace(/-/g, '+').replace(/_/g, '/');

    const json = atob(base64);
    const data = JSON.parse(json);

    return {
      turnoDescripcion: data.turnoDescripcion || '',
      turnoDia: data.turnoDia || '',
      empleados: data.empleados || [],
    };
  } catch (e) {
    return null;
  }
}

/**
 * Generate a shareable URL with mission code
 */
export function generateShareURL(
  turnoDescripcion: string,
  turnoDia: string,
  empleados: Employee[]
): string {
  const code = encodeMissionCode(turnoDescripcion, turnoDia, empleados);
  const basePath = typeof window !== 'undefined' ? window.location.origin : '';
  return `${basePath}/verificador_agenda_disponibilidad?mission=${code}`;
}

/**
 * Extract mission code from URL parameters
 */
export function getMissionCodeFromURL(): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  return params.get('mission');
}

/**
 * Generate a short ID for the mission (for chat/messaging)
 */
export function generateShortMissionId(code: string): string {
  // Take first 8 chars after MSN_ prefix and replace special chars
  const shortCode = code.substring(4, 12);
  return shortCode
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .substring(0, 6);
}

/**
 * Validate if a string is a valid mission code
 */
export function isValidMissionCode(code: string): boolean {
  if (!code.startsWith('MSN_')) return false;
  return decodeMissionCode(code) !== null;
}
