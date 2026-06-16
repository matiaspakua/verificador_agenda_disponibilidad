module.exports = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/verificador_agenda_disponibilidad',
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  },
}

