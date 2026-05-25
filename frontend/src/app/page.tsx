import { AvailabilityForm } from '@/components/AvailabilityForm'
import { StatusCard } from '@/components/StatusCard'

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Service Status</h2>
        <StatusCard />
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
          <li>Enter the shift description (e.g., &quot;Morning Shift&quot;, &quot;Weekend Coverage&quot;)</li>
          <li>Enter the shift date in DD/MM/YYYY format</li>
          <li>Add employees and specify their available schedules</li>
          <li>Select schedule types: specific days, weekdays, weekends, or days of the month</li>
          <li>Click &quot;Check Availability&quot; to see who can work</li>
        </ol>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <AvailabilityForm />
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="font-semibold text-gray-800">Multiple Employees</h3>
          <p className="text-sm text-gray-600 mt-1">Check availability for multiple employees at once</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
          <div className="text-3xl mb-2">📅</div>
          <h3 className="font-semibold text-gray-800">Flexible Schedules</h3>
          <p className="text-sm text-gray-600 mt-1">Support for various schedule patterns</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-800">Instant Results</h3>
          <p className="text-sm text-gray-600 mt-1">Get availability results in real-time</p>
        </div>
      </div>
    </div>
  )
}
