export interface Employee {
  nombre: string
  equipo?: string | null
  jornadas: Jornada[]
}

export interface Jornada {
  tipo: 'dias_puntuales' | 'dias_finesemana' | 'dias_entresemana' | 'dias_del_mes'
  diasPuntuales?: string[] | null
  diasDelMes?: number[] | null
  autorizacionDetalle?: Authorization[] | null
  autorizacionTrabaja?: boolean | null
}

export interface Authorization {
  fecha: string
  trabajo: boolean
  detalle?: string
}

export interface AvailabilityRequest {
  turnoDescripcion: string
  turnoDia: string
  empleados: Employee[]
}

export interface AvailabilityResponse {
  availableEmployees: string[]
  totalAvailable: number
  timestamp: string
  shiftDetails?: {
    date: string
    description: string
  }
}

export interface ApiError {
  status: number
  message: string
  timestamp: string
}

export interface HealthStatus {
  status: 'UP' | 'DOWN'
  service: string
  timestamp: string
}
