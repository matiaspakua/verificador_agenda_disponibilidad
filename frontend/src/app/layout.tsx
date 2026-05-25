import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Availability Checker',
  description: 'Check employee availability for shifts',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-gray-800">📅 Availability Checker</h1>
              <p className="text-gray-600 text-sm mt-1">Check employee availability for shifts</p>
            </div>
          </header>

          <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">{children}</main>

          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
              <p>© 2026 Availability Checker. Built with Next.js and Tailwind CSS.</p>
              <p className="mt-1">
                API Status:{' '}
                <span className="font-medium text-blue-600">
                  {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}
                </span>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

