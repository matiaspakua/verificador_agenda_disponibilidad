import { AvailabilityForm } from '@/components/AvailabilityForm'
import { StatusCard } from '@/components/StatusCard'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 space-y-6"
    >
      {/* Status Card */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Service Status</h2>
        <StatusCard />
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-lg font-bold text-blue-900 mb-3">How to Use</h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-none">
          <li className="flex items-center gap-2"><span className="bg-blue-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">1</span> Enter the shift description</li>
          <li className="flex items-center gap-2"><span className="bg-blue-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">2</span> Date in DD/MM/YYYY</li>
          <li className="flex items-center gap-2"><span className="bg-blue-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">3</span> Add and configure employees</li>
          <li className="flex items-center gap-2"><span className="bg-blue-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">4</span> Choose schedule types</li>
        </ol>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <AvailabilityForm />
      </div>

      {/* Features Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[
          { icon: "👥", title: "Multi-User", desc: "Simultaneous checks" },
          { icon: "📅", title: "Custom Logic", desc: "Complex patterns supported" },
          { icon: "⚡", title: "Fast Response", desc: "Instant results" }
        ].map((feature, i) => (
          <div key={i} className="bg-white border border-gray-100 p-4 rounded-xl text-center shadow-sm transition-transform hover:scale-105">
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h3 className="font-bold text-gray-800">{feature.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}


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
