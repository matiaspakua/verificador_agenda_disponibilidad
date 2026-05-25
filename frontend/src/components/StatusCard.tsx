'use client'

import { useEffect, useState } from 'react'
import { HealthStatus } from '@/types'
import { apiClient } from '@/utils/api'

export function StatusCard() {
  const [status, setStatus] = useState<HealthStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkHealth = async () => {
      setIsLoading(true)
      try {
        const health = await apiClient.getHealth()
        setStatus(health)
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to check API health'
        setError(message)
        setStatus(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 30000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center">
        <p className="text-gray-600">Checking service status...</p>
      </div>
    )
  }

  if (error || !status) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div>
            <h3 className="font-semibold text-red-900">Service Unavailable</h3>
            <p className="text-sm text-red-700">{error || 'API is not responding'}</p>
          </div>
        </div>
      </div>
    )
  }

  const isHealthy = status.status === 'UP'

  return (
    <div className={`rounded-lg p-4 border ${isHealthy ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
        <div>
          <h3 className={`font-semibold ${isHealthy ? 'text-green-900' : 'text-yellow-900'}`}>
            {status.service}
          </h3>
          <p className={`text-sm ${isHealthy ? 'text-green-700' : 'text-yellow-700'}`}>
            Status: <span className="font-medium">{status.status}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
