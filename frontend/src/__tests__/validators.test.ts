import { validateDate, validateEmployeeName, validateJornada, validateEmployee, validateAvailabilityRequest } from '@/utils/validators'
import { Employee, Jornada } from '@/types'

describe('Validators', () => {
  describe('validateDate', () => {
    it('should validate correct date format', () => {
      expect(validateDate('25/05/2026')).toBe(true)
      expect(validateDate('01/01/2020')).toBe(true)
      expect(validateDate('31/12/2025')).toBe(true)
    })

    it('should reject invalid date format', () => {
      expect(validateDate('2026-05-25')).toBe(false)
      expect(validateDate('25-05-2026')).toBe(false)
      expect(validateDate('invalid')).toBe(false)
    })

    it('should reject invalid months', () => {
      expect(validateDate('25/13/2026')).toBe(false)
      expect(validateDate('25/00/2026')).toBe(false)
    })

    it('should reject invalid days', () => {
      expect(validateDate('00/05/2026')).toBe(false)
      expect(validateDate('32/05/2026')).toBe(false)
    })
  })

  describe('validateEmployeeName', () => {
    it('should validate non-empty names', () => {
      expect(validateEmployeeName('Juan')).toBe(true)
      expect(validateEmployeeName('Maria Garcia')).toBe(true)
    })

    it('should reject empty names', () => {
      expect(validateEmployeeName('')).toBe(false)
      expect(validateEmployeeName('   ')).toBe(false)
    })

    it('should reject names longer than 100 characters', () => {
      expect(validateEmployeeName('a'.repeat(101))).toBe(false)
    })
  })

  describe('validateJornada', () => {
    it('should validate dias_puntuales with days', () => {
      const jornada: Jornada = {
        tipo: 'dias_puntuales',
        diasPuntuales: ['Monday', 'Tuesday'],
      }
      expect(validateJornada(jornada)).toBe(true)
    })

    it('should reject dias_puntuales without days', () => {
      const jornada: Jornada = {
        tipo: 'dias_puntuales',
        diasPuntuales: [],
      }
      expect(validateJornada(jornada)).toBe(false)
    })

    it('should validate dias_entresemana', () => {
      const jornada: Jornada = {
        tipo: 'dias_entresemana',
      }
      expect(validateJornada(jornada)).toBe(true)
    })

    it('should validate dias_finesemana', () => {
      const jornada: Jornada = {
        tipo: 'dias_finesemana',
      }
      expect(validateJornada(jornada)).toBe(true)
    })

    it('should validate dias_del_mes with days', () => {
      const jornada: Jornada = {
        tipo: 'dias_del_mes',
        diasDelMes: [1, 5, 10],
      }
      expect(validateJornada(jornada)).toBe(true)
    })
  })

  describe('validateEmployee', () => {
    it('should validate valid employee', () => {
      const employee: Employee = {
        nombre: 'Juan',
        equipo: null,
        jornadas: [{ tipo: 'dias_entresemana' }],
      }
      const result = validateEmployee(employee)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject employee without name', () => {
      const employee: Employee = {
        nombre: '',
        equipo: null,
        jornadas: [{ tipo: 'dias_entresemana' }],
      }
      const result = validateEmployee(employee)
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('should reject employee without jornadas', () => {
      const employee: Employee = {
        nombre: 'Juan',
        equipo: null,
        jornadas: [],
      }
      const result = validateEmployee(employee)
      expect(result.valid).toBe(false)
    })
  })

  describe('validateAvailabilityRequest', () => {
    it('should validate correct request', () => {
      const request = {
        turnoDescripcion: 'Morning Shift',
        turnoDia: '25/05/2026',
        empleados: [
          {
            nombre: 'Juan',
            equipo: null,
            jornadas: [{ tipo: 'dias_entresemana' }],
          },
        ],
      }
      const result = validateAvailabilityRequest(request)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject request without shift description', () => {
      const request = {
        turnoDescripcion: '',
        turnoDia: '25/05/2026',
        empleados: [
          {
            nombre: 'Juan',
            equipo: null,
            jornadas: [{ tipo: 'dias_entresemana' }],
          },
        ],
      }
      const result = validateAvailabilityRequest(request)
      expect(result.valid).toBe(false)
    })

    it('should reject request without employees', () => {
      const request = {
        turnoDescripcion: 'Morning Shift',
        turnoDia: '25/05/2026',
        empleados: [],
      }
      const result = validateAvailabilityRequest(request)
      expect(result.valid).toBe(false)
    })
  })
})
