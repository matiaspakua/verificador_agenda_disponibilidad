'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Employee, AvailabilityResponse } from '@/types'
import { apiClient } from '@/utils/api'
import { validateAvailabilityRequest } from '@/utils/validators'
import { EmployeeInput } from './EmployeeInput'
import { ResultsDisplay } from './ResultsDisplay'

export function AvailabilityForm() {
  const content = 'use client'; // This was for internal structure logic, ignored in final code. 
  // Wait, I need to just fix the file content accurately without breaking imports.

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
    setEmployees([...employees, {
      nombre: '',
      equipo: null,
      jornadas: [{ tipo: 'dias_entresemana' }],
    }])
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
    setShiftDescription('')
    setShiftDate('')
    setEmployees([{
      nombre: '',
      equipo: null,
      jornadas: [{ tipo: 'dias_entresemana' }],
    }])
  }

  const isCompleted = results || error

  return (
    <div className="space-y-6">
      <AnimatePresence mode='wait'>
        {!isCompleted ? (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Shift Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <input
                    type="text"
                    value={shiftDescription}
                    onChange={e => setShiftDescription(e.target.value)}
                    placeholder="e.g., Morning Shift"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="text"
                    value={shiftDate}
                    onChange={e => setShiftDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Staffing</h3>
              <div className="space-y-4 mb-6">
                {employees.map((_, idx) => (
                  <EmployeeInput
                    key={idx}
                    employee={employees[idx]}
                    index={idx}
                    onUpdate={(e) => handleUpdateEmployee(idx, e)}
                    onRemove={() => handleRemoveEmployee(idx)}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddEmployee}
                className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
              >
                + Add Participant
              </button>
            </div>

            {validationErrors.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-100 rounded-lg p-4"
              >
                <h4 className="text-sm font-bold text-red-700 mb-2">Please fix the following errors:</h4>
                <ul className="list-disc list-inside text-xs text-red-600 space-y-1">
                  {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-[0.98] ${
                isLoading 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200/50 hover:-translate-y-0.5"
              }`}
            >
              {isLoading ? 'Processing Request...' : 'Verify Availability'}
            </button>
          </motion.form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <ResultsDisplay 
              data={results} 
              isLoading={isLoading} 
              error={error} 
              onReset={handleReset} 
            />
            <button
              onClick={handleReset}
              className="w-full py-3 border rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Start New Calculation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
