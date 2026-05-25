'use client'

import { Employee, Jornada } from '@/types'

interface EmployeeInputProps {
  employee: Employee
  index: number
  onUpdate: (index: number, employee: Employee) => void
  onRemove: (index: number) => void
}

export function EmployeeInput({ employee, index, onUpdate, onRemove }: EmployeeInputProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(index, {
      ...employee,
      nombre: e.target.value,
    })
  }

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(index, {
      ...employee,
      equipo: e.target.value || null,
    })
  }

  const handleJornadaTypeChange = (jIndex: number, type: Jornada['tipo']) => {
    const updatedJornadas = [...employee.jornadas]
    const newJornada: Jornada = {
      tipo: type,
      diasPuntuales: type === 'dias_puntuales' ? ['Monday'] : undefined,
      diasDelMes: type === 'dias_del_mes' ? [1] : undefined,
    }
    updatedJornadas[jIndex] = newJornada
    onUpdate(index, {
      ...employee,
      jornadas: updatedJornadas,
    })
  }

  const handleDiasPuntualesChange = (jIndex: number, dias: string[]) => {
    const updatedJornadas = [...employee.jornadas]
    updatedJornadas[jIndex] = {
      ...updatedJornadas[jIndex],
      diasPuntuales: dias,
    }
    onUpdate(index, {
      ...employee,
      jornadas: updatedJornadas,
    })
  }

  const handleDiasDelMesChange = (jIndex: number, dias: number[]) => {
    const updatedJornadas = [...employee.jornadas]
    updatedJornadas[jIndex] = {
      ...updatedJornadas[jIndex],
      diasDelMes: dias,
    }
    onUpdate(index, {
      ...employee,
      jornadas: updatedJornadas,
    })
  }

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-semibold text-lg">Employee {index + 1}</h4>
        <button
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 font-medium text-sm"
        >
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            value={employee.nombre}
            onChange={handleNameChange}
            placeholder="e.g., Juan"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Team (Optional)</label>
          <input
            type="text"
            value={employee.equipo || ''}
            onChange={handleTeamChange}
            placeholder="e.g., Team A"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h5 className="font-medium text-gray-700">Schedules (Jornadas)</h5>
        {employee.jornadas.map((jornada, jIndex) => (
          <div key={jIndex} className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Type {jIndex + 1}</label>
            <select
              value={jornada.tipo}
              onChange={e => handleJornadaTypeChange(jIndex, e.target.value as Jornada['tipo'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            >
              <option value="dias_puntuales">Specific Days (e.g., Monday, Wednesday)</option>
              <option value="dias_entresemana">Weekdays (Mon-Fri)</option>
              <option value="dias_finesemana">Weekends (Sat-Sun)</option>
              <option value="dias_del_mes">Days of Month (e.g., 1, 5, 10)</option>
            </select>

            {jornada.tipo === 'dias_puntuales' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Days</label>
                <div className="grid grid-cols-4 gap-2">
                  {weekDays.map(day => (
                    <label key={day} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={jornada.diasPuntuales?.includes(day) || false}
                        onChange={e => {
                          const currentDays = jornada.diasPuntuales || []
                          const newDays = e.target.checked ? [...currentDays, day] : currentDays.filter(d => d !== day)
                          handleDiasPuntualesChange(jIndex, newDays)
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{day.slice(0, 3)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {jornada.tipo === 'dias_del_mes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Days of Month</label>
                <input
                  type="text"
                  placeholder="e.g., 1,5,10,15,20"
                  value={jornada.diasDelMes?.join(',') || ''}
                  onChange={e => {
                    const dias = e.target.value.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d) && d >= 1 && d <= 31)
                    handleDiasDelMesChange(jIndex, dias)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
