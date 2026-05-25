import { AvailabilityRequest, Employee, Jornada } from '@/types'

export function validateDate(dateStr: string): boolean {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
  if (!dateRegex.test(dateStr)) return false

  const [day, month] = dateStr.split('/').map(Number)

  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false

  return true
}

export function validateEmployeeName(name: string): boolean {
  return name.trim().length > 0 && name.trim().length <= 100
}

export function validateJornada(jornada: Jornada): boolean {
  if (!jornada.tipo) return false

  switch (jornada.tipo) {
    case 'dias_puntuales':
      return Array.isArray(jornada.diasPuntuales) && jornada.diasPuntuales.length > 0
    case 'dias_del_mes':
      return Array.isArray(jornada.diasDelMes) && jornada.diasDelMes.length > 0
    case 'dias_finesemana':
    case 'dias_entresemana':
      return true
    default:
      return false
  }
}

export function validateEmployee(employee: Employee): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!validateEmployeeName(employee.nombre)) {
    errors.push('Employee name is required and must be less than 100 characters')
  }

  if (!Array.isArray(employee.jornadas) || employee.jornadas.length === 0) {
    errors.push('At least one schedule (jornada) is required')
  }

  employee.jornadas.forEach((jornada, index) => {
    if (!validateJornada(jornada)) {
      errors.push(`Schedule ${index + 1} is invalid`)
    }
  })

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validateAvailabilityRequest(request: AvailabilityRequest): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!request.turnoDescripcion || request.turnoDescripcion.trim().length === 0) {
    errors.push('Shift description is required')
  }

  if (!request.turnoDia || !validateDate(request.turnoDia)) {
    errors.push('Valid date in format DD/MM/YYYY is required')
  }

  if (!Array.isArray(request.empleados) || request.empleados.length === 0) {
    errors.push('At least one employee is required')
  }

  request.empleados.forEach((emp, index) => {
    const validation = validateEmployee(emp)
    if (!validation.valid) {
      validation.errors.forEach(err => {
        errors.push(`Employee ${index + 1}: ${err}`)
      })
    }
  })

  return {
    valid: errors.length === 0,
    errors,
  }
}
