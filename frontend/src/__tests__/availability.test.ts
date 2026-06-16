import {
  checkAvailabilityLocal,
  getEmployeeDayOfWeek,
  isEmployeeAvailableForDate,
} from '../utils/availability';
import { Employee, Jornada } from '../types';

describe('Client-side Availability Engine', () => {
  describe('getEmployeeDayOfWeek', () => {
    it('should return correct Spanish day of week for a given date', () => {
      // 25/05/2026 is Monday
      expect(getEmployeeDayOfWeek('25/05/2026')).toBe('lunes');
      // 26/05/2026 is Tuesday
      expect(getEmployeeDayOfWeek('26/05/2026')).toBe('martes');
      // 27/05/2026 is Wednesday
      expect(getEmployeeDayOfWeek('27/05/2026')).toBe('miercoles');
      // 28/05/2026 is Thursday
      expect(getEmployeeDayOfWeek('28/05/2026')).toBe('jueves');
      // 29/05/2026 is Friday
      expect(getEmployeeDayOfWeek('29/05/2026')).toBe('viernes');
      // 30/05/2026 is Saturday
      expect(getEmployeeDayOfWeek('30/05/2026')).toBe('sabado');
      // 31/05/2026 is Sunday
      expect(getEmployeeDayOfWeek('31/05/2026')).toBe('domingo');
    });

    it('should normalize accented day names', () => {
      const day = getEmployeeDayOfWeek('27/05/2026'); // Wednesday
      expect(day).toBe('miercoles'); // no accent
    });
  });

  describe('isEmployeeAvailableForDate', () => {
    it('should return true for dias_puntuales when day matches', () => {
      const jornada: Jornada = {
        tipo: 'dias_puntuales',
        diasPuntuales: ['lunes', 'martes', 'miercoles'],
      };
      expect(isEmployeeAvailableForDate(jornada, '25/05/2026')).toBe(true); // Monday
      expect(isEmployeeAvailableForDate(jornada, '26/05/2026')).toBe(true); // Tuesday
    });

    it('should return false for dias_puntuales when day does not match', () => {
      const jornada: Jornada = {
        tipo: 'dias_puntuales',
        diasPuntuales: ['lunes', 'martes'],
      };
      expect(isEmployeeAvailableForDate(jornada, '30/05/2026')).toBe(false); // Saturday
    });

    it('should return true for dias_entresemana on weekdays', () => {
      const jornada: Jornada = { tipo: 'dias_entresemana' };
      expect(isEmployeeAvailableForDate(jornada, '25/05/2026')).toBe(true); // Monday
      expect(isEmployeeAvailableForDate(jornada, '29/05/2026')).toBe(true); // Friday
    });

    it('should return false for dias_entresemana on weekends', () => {
      const jornada: Jornada = { tipo: 'dias_entresemana' };
      expect(isEmployeeAvailableForDate(jornada, '30/05/2026')).toBe(false); // Saturday
      expect(isEmployeeAvailableForDate(jornada, '31/05/2026')).toBe(false); // Sunday
    });

    it('should return true for dias_finesemana on weekends', () => {
      const jornada: Jornada = { tipo: 'dias_finesemana' };
      expect(isEmployeeAvailableForDate(jornada, '30/05/2026')).toBe(true); // Saturday
      expect(isEmployeeAvailableForDate(jornada, '31/05/2026')).toBe(true); // Sunday
    });

    it('should return false for dias_finesemana on weekdays', () => {
      const jornada: Jornada = { tipo: 'dias_finesemana' };
      expect(isEmployeeAvailableForDate(jornada, '25/05/2026')).toBe(false); // Monday
    });

    it('should return true for dias_del_mes when day of month matches', () => {
      const jornada: Jornada = {
        tipo: 'dias_del_mes',
        diasDelMes: [25, 26, 27],
      };
      expect(isEmployeeAvailableForDate(jornada, '25/05/2026')).toBe(true);
      expect(isEmployeeAvailableForDate(jornada, '26/05/2026')).toBe(true);
    });

    it('should return false for dias_del_mes when day of month does not match', () => {
      const jornada: Jornada = {
        tipo: 'dias_del_mes',
        diasDelMes: [1, 15],
      };
      expect(isEmployeeAvailableForDate(jornada, '25/05/2026')).toBe(false);
    });

    it('should handle excepcional jornada with autorizacionTrabaja=true', () => {
      const jornada: Jornada = {
        tipo: 'excepcional',
        diasDelMes: [25],
        autorizacionTrabaja: true,
      };
      expect(isEmployeeAvailableForDate(jornada, '25/05/2026')).toBe(true);
    });

    it('should handle excepcional jornada with autorizacionTrabaja=false', () => {
      const jornada: Jornada = {
        tipo: 'excepcional',
        diasDelMes: [25],
        autorizacionTrabaja: false,
      };
      expect(isEmployeeAvailableForDate(jornada, '25/05/2026')).toBe(false);
    });

    it('should return false for excepcional when date does not match', () => {
      const jornada: Jornada = {
        tipo: 'excepcional',
        diasDelMes: [15],
        autorizacionTrabaja: true,
      };
      expect(isEmployeeAvailableForDate(jornada, '25/05/2026')).toBe(false);
    });
  });

  describe('checkAvailabilityLocal', () => {
    it('should return available employee with single matching jornada', () => {
      const employees: Employee[] = [
        {
          nombre: 'juan',
          jornadas: [
            {
              tipo: 'dias_puntuales',
              diasPuntuales: ['lunes'],
            },
          ],
        },
      ];

      const result = checkAvailabilityLocal({
        turnoDescripcion: 'Test shift',
        turnoDia: '25/05/2026', // Monday
        empleados: employees,
      });

      expect(result.availableEmployees).toContain('juan');
      expect(result.totalAvailable).toBe(1);
    });

    it('should exclude employee when no jornada matches date', () => {
      const employees: Employee[] = [
        {
          nombre: 'juan',
          jornadas: [
            {
              tipo: 'dias_puntuales',
              diasPuntuales: ['viernes'],
            },
          ],
        },
      ];

      const result = checkAvailabilityLocal({
        turnoDescripcion: 'Test shift',
        turnoDia: '25/05/2026', // Monday
        empleados: employees,
      });

      expect(result.availableEmployees).not.toContain('juan');
      expect(result.totalAvailable).toBe(0);
    });

    it('should handle multiple employees with mixed availability', () => {
      const employees: Employee[] = [
        {
          nombre: 'juan',
          jornadas: [{ tipo: 'dias_entresemana' }],
        },
        {
          nombre: 'maria',
          jornadas: [{ tipo: 'dias_finesemana' }],
        },
      ];

      const result = checkAvailabilityLocal({
        turnoDescripcion: 'Test',
        turnoDia: '25/05/2026', // Monday
        empleados: employees,
      });

      expect(result.availableEmployees).toContain('juan');
      expect(result.availableEmployees).not.toContain('maria');
      expect(result.totalAvailable).toBe(1);
    });

    it('should apply team rule: exclude whole team if one member is unavailable', () => {
      const employees: Employee[] = [
        {
          nombre: 'fanny',
          equipo: 'archivo',
          jornadas: [{ tipo: 'dias_finesemana' }],
        },
        {
          nombre: 'benicio',
          equipo: 'archivo',
          jornadas: [{ tipo: 'dias_finesemana' }],
        },
        {
          nombre: 'juan',
          jornadas: [{ tipo: 'dias_entresemana' }],
        },
      ];

      const result = checkAvailabilityLocal({
        turnoDescripcion: 'Test',
        turnoDia: '25/05/2026', // Monday (weekday)
        empleados: employees,
      });

      // fanny and benicio (both in 'archivo' team) are unavailable on Monday
      expect(result.availableEmployees).not.toContain('fanny');
      expect(result.availableEmployees).not.toContain('benicio');
      // juan (no team) is available
      expect(result.availableEmployees).toContain('juan');
    });

    it('should include whole team if all members are available', () => {
      const employees: Employee[] = [
        {
          nombre: 'fanny',
          equipo: 'archivo',
          jornadas: [{ tipo: 'dias_entresemana' }],
        },
        {
          nombre: 'benicio',
          equipo: 'archivo',
          jornadas: [{ tipo: 'dias_entresemana' }],
        },
      ];

      const result = checkAvailabilityLocal({
        turnoDescripcion: 'Test',
        turnoDia: '25/05/2026', // Monday (weekday)
        empleados: employees,
      });

      // Both are available on Monday
      expect(result.availableEmployees).toContain('fanny');
      expect(result.availableEmployees).toContain('benicio');
    });

    it('should prioritize excepcional over other jornadas', () => {
      const employees: Employee[] = [
        {
          nombre: 'juan',
          jornadas: [
            {
              tipo: 'dias_entresemana', // normally available Mon-Fri
            },
            {
              tipo: 'excepcional',
              diasDelMes: [25],
              autorizacionTrabaja: false, // but NOT on 25/05
            },
          ],
        },
      ];

      const result = checkAvailabilityLocal({
        turnoDescripcion: 'Test',
        turnoDia: '25/05/2026', // Monday, but exception says no
        empleados: employees,
      });

      expect(result.availableEmployees).not.toContain('juan');
    });

    it('should handle multiple jornadas with OR logic', () => {
      const employees: Employee[] = [
        {
          nombre: 'juan',
          jornadas: [
            {
              tipo: 'dias_puntuales',
              diasPuntuales: ['miercoles'],
            },
            {
              tipo: 'dias_del_mes',
              diasDelMes: [25],
            },
          ],
        },
      ];

      // Available due to dias_del_mes
      const result1 = checkAvailabilityLocal({
        turnoDescripcion: 'Test',
        turnoDia: '25/05/2026', // Monday, but 25th of month
        empleados: employees,
      });
      expect(result1.availableEmployees).toContain('juan');

      // Available due to dias_puntuales
      const result2 = checkAvailabilityLocal({
        turnoDescripcion: 'Test',
        turnoDia: '27/05/2026', // Wednesday
        empleados: employees,
      });
      expect(result2.availableEmployees).toContain('juan');

      // Not available
      const result3 = checkAvailabilityLocal({
        turnoDescripcion: 'Test',
        turnoDia: '26/05/2026', // Tuesday
        empleados: employees,
      });
      expect(result3.availableEmployees).not.toContain('juan');
    });

    it('should return response with correct metadata', () => {
      const employees: Employee[] = [
        {
          nombre: 'juan',
          jornadas: [{ tipo: 'dias_entresemana' }],
        },
      ];

      const result = checkAvailabilityLocal({
        turnoDescripcion: 'Morning shift',
        turnoDia: '25/05/2026',
        empleados: employees,
      });

      expect(result.timestamp).toBeDefined();
      expect(typeof result.timestamp).toBe('string');
      expect(result.shiftDetails).toEqual({
        date: '25/05/2026',
        description: 'Morning shift',
      });
    });

    it('should handle empty employee list', () => {
      const result = checkAvailabilityLocal({
        turnoDescripcion: 'Test',
        turnoDia: '25/05/2026',
        empleados: [],
      });

      expect(result.availableEmployees).toHaveLength(0);
      expect(result.totalAvailable).toBe(0);
    });

    it('should handle employees with no jornadas', () => {
      const employees: Employee[] = [
        {
          nombre: 'juan',
          jornadas: [],
        },
      ];

      const result = checkAvailabilityLocal({
        turnoDescripcion: 'Test',
        turnoDia: '25/05/2026',
        empleados: employees,
      });

      expect(result.availableEmployees).not.toContain('juan');
    });
  });
});
