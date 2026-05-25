'use client'

import { AvailabilityResponse } from '@/types'

interface ResultsDisplayProps {
  data: AvailabilityResponse | null
  isLoading: boolean
  error: string | null
  onReset: () => void
}

export function ResultsDisplay({ data, isLoading, error, onReset }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-blue-700 mt-3 font-medium">Checking availability...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-900 mb-2">Error</h3>
        <p className="text-red-700 text-sm mb-3">{error}</p>
        <button
          onClick={onReset}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="font-semibold text-green-900 mb-4 text-lg">Availability Results</h3>

      {data.shiftDetails && (
        <div className="bg-white rounded p-3 mb-4 border border-green-100">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Shift:</span> {data.shiftDetails.description}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Date:</span> {data.shiftDetails.date}
          </p>
        </div>
      )}

      <div className="bg-white rounded p-4 mb-4 border border-green-100">
        <p className="text-gray-700 mb-2">
          <span className="font-medium text-lg text-green-700">{data.totalAvailable}</span>
          <span className="text-gray-600 ml-2">employee(s) available</span>
        </p>
      </div>

      {data.availableEmployees.length > 0 ? (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Available Employees:</h4>
          <ul className="space-y-2">
            {data.availableEmployees.map((employee, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 bg-white p-2 rounded border border-green-100"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-800">{employee}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <p className="text-yellow-800 text-sm">No employees are available for this shift.</p>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-green-100">
        Query executed at: {new Date(data.timestamp).toLocaleString()}
      </div>

      <button
        onClick={onReset}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium"
      >
        Check Another Shift
      </button>
    </div>
  )
}
