import ApiClient from '@/utils/api'
import { AvailabilityRequest } from '@/types'

// Mock fetch
global.fetch = jest.fn()

describe('ApiClient', () => {
  let client: ApiClient
  const mockApiUrl = 'http://localhost:8080'

  beforeEach(() => {
    jest.clearAllMocks()
    client = new ApiClient(mockApiUrl)
  })

  describe('checkAvailability', () => {
    it('should send POST request with correct data', async () => {
      const mockResponse = {
        availableEmployees: ['Juan'],
        totalAvailable: 1,
        timestamp: '2026-05-25T10:20:02.401+02:00',
        shiftDetails: { date: '25/05/2026', description: 'Morning Shift' },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const request: AvailabilityRequest = {
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

      const result = await client.checkAvailability(request)

      expect(global.fetch).toHaveBeenCalledWith(`${mockApiUrl}/api/availability/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      expect(result).toEqual(mockResponse)
    })

    it('should handle API errors', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          status: 400,
          message: 'Invalid request',
        }),
      })

      const request: AvailabilityRequest = {
        turnoDescripcion: 'Morning Shift',
        turnoDia: '25/05/2026',
        empleados: [],
      }

      await expect(client.checkAvailability(request)).rejects.toThrow()
    })

    it('should handle network errors', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const request: AvailabilityRequest = {
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

      await expect(client.checkAvailability(request)).rejects.toThrow('Network error')
    })
  })

  describe('getHealth', () => {
    it('should return health status', async () => {
      const mockHealth = {
        status: 'UP',
        service: 'Availability Calendar API',
        timestamp: '2026-05-25T10:20:02.401+02:00',
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockHealth,
      })

      const result = await client.getHealth()

      expect(global.fetch).toHaveBeenCalledWith(`${mockApiUrl}/api/availability/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      expect(result).toEqual(mockHealth)
    })

    it('should handle health check errors', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      await expect(client.getHealth()).rejects.toThrow()
    })
  })

  describe('getInfo', () => {
    it('should return API info', async () => {
      const mockInfo = {
        version: '1.0.0',
        service: 'Availability Calendar API',
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockInfo,
      })

      const result = await client.getInfo()

      expect(global.fetch).toHaveBeenCalledWith(`${mockApiUrl}/api/availability/info`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      expect(result).toEqual(mockInfo)
    })
  })
})
