import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RPG Pixel Office - Verificador de Agenda',
  description: 'Juego de rol de oficina para verificar disponibilidad de empleados',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#1a1a2e] text-[#e2e2e2] font-['VT323',monospace] scanlines">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

