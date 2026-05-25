import { AvailabilityRequest, AvailabilityResponse, HealthStatus, ApiError } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  async checkAvailability(data: AvailabilityRequest): Promise<AvailabilityResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/availability/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = (await response.json()) as ApiError
        throw new Error(error.message || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Availability check error:', error)
      throw error
    }
  }

  async getHealth(): Promise<HealthStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/api/availability/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Health check error:', error)
      throw error
    }
  }

  async getInfo(): Promise<{ version: string; service: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/availability/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Info check error:', error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()
export default ApiClient
