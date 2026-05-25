'use client'

import { useState } from 'react'
import { Employee, AvailabilityResponse } from '@/types'
import { apiClient } from '@/utils/api'
import { validateAvailabilityRequest } from '@/utils/validators'
import { EmployeeInput } from './EmployeeInput'
import { ResultsDisplay } from './ResultsDisplay'

export function AvailabilityForm() {
  const [shiftDescription, setShiftDescription] = useState('')
  const [shiftDate, setShiftDate] = useState('')
  const [employees, setEmployees] = useState<Employee[]>([
    {
      nombre: '',
      equipo: null,
      jornadas: [{ tipo: 'dias_entresemana' }],
    },
  ])

  const [results, setResults] = useState<AvailabilityResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleAddEmployee = () => {
    setEmployees([
      ...employees,
      {
        nombre: '',
        equipo: null,
        jornadas: [{ tipo: 'dias_entresemana' }],
      },
    ])
  }

  const handleRemoveEmployee = (index: number) => {
    setEmployees(employees.filter((_, i) => i !== index))
  }

  const handleUpdateEmployee = (index: number, employee: Employee) => {
    const updated = [...employees]
    updated[index] = employee
    setEmployees(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationErrors([])
    setError(null)

    const request = {
      turnoDescripcion: shiftDescription,
      turnoDia: shiftDate,
      empleados: employees,
    }

    const validation = validateAvailabilityRequest(request)
    if (!validation.valid) {
      setValidationErrors(validation.errors)
      return
    }

    setIsLoading(true)
    try {
      const data = await apiClient.checkAvailability(request)
      setResults(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(message)
      setResults(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResults(null)
    setError(null)
    setValidationErrors([])
  }

  if (results || error) {
    return (
      <div className="space-y-4">
        <ResultsDisplay data={results} isLoading={isLoading} error={error} onReset={handleReset} />
        <button
          onClick={() => {
            handleReset()
            setShiftDescription('')
            setShiftDate('')
            setEmployees([
              {
                nombre: '',
                equipo: null,
                jornadas: [{ tipo: 'dias_entresemana' }],
              },
            ])
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
        >
          Start New Query
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shift Details */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Shift Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shift Description *
            </label>
            <input
              type="text"
              value={shiftDescription}
              onChange={e => setShiftDescription(e.target.value)}
              placeholder="e.g., Morning Shift, Evening Coverage"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shift Date * <span className="text-xs text-gray-500">(DD/MM/YYYY)</span>
            </label>
            <input
              type="text"
              value={shiftDate}
              onChange={e => setShiftDate(e.target.value)}
              placeholder="e.g., 25/05/2026"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Employees */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Employees</h3>
        <div className="space-y-4 mb-4">
          {employees.map((employee, index) => (
            <EmployeeInput
              key={index}
              employee={employee}
              index={index}
              onUpdate={handleUpdateEmployee}
              onRemove={handleRemoveEmployee}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddEmployee}
          className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded font-medium transition-colors"
        >
          + Add Employee
        </button>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-900 mb-2">Validation Errors:</h4>
          <ul className="space-y-1">
            {validationErrors.map((err, idx) => (
              <li key={idx} className="text-red-700 text-sm flex gap-2">
                <span>•</span> {err}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
      >
        {isLoading ? 'Checking Availability...' : 'Check Availability'}
      </button>
    </form>
  )
}
