# Verificador de Disponibilidad - Frontend

A modern Next.js frontend for checking employee availability for shifts.

## Features

- ✨ Clean, minimalist UI built with Tailwind CSS
- 🚀 Built with Next.js 16.2.6 and React 18
- 📱 Fully responsive design
- ✅ Form validation with helpful error messages
- 🧪 Comprehensive test coverage
- 🐳 Docker support for easy deployment

## Prerequisites

- Node.js 20.0.0 or higher
- npm or yarn package manager
- Backend API running on `http://localhost:8080`

## Getting Started

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

### Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Environment Variables

Create a `.env.local` file (already provided):

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

For production Docker deployment, use:
```
NEXT_PUBLIC_API_BASE_URL=http://api:8080
```

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── AvailabilityForm.tsx
│   │   ├── EmployeeInput.tsx
│   │   ├── ResultsDisplay.tsx
│   │   └── StatusCard.tsx
│   ├── utils/            # Utility functions
│   │   ├── api.ts        # API client
│   │   └── validators.ts # Form validation
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   └── __tests__/        # Test files
├── public/               # Static files
├── Dockerfile            # Docker image configuration
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── jest.config.ts
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run lint` - Run ESLint

## Docker Support

### Build Docker Image

```bash
docker build -t verificador-frontend:1.0 .
```

### Run Docker Container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=http://localhost:8080 \
  verificador-frontend:1.0
```

### Run with Docker Compose

From the root directory:

```bash
docker-compose up
```

This will start both the backend API and frontend:
- API: http://localhost:8080
- Frontend: http://localhost:3000

## API Integration

The frontend communicates with the backend REST API:

### Endpoints Used

- `POST /api/availability/check` - Check employee availability
- `GET /api/availability/health` - Get API health status
- `GET /api/availability/info` - Get API information

### Request Example

```json
{
  "turnoDescripcion": "Morning Shift",
  "turnoDia": "25/05/2026",
  "empleados": [
    {
      "nombre": "Juan",
      "equipo": null,
      "jornadas": [
        {
          "tipo": "dias_entresemana"
        }
      ]
    }
  ]
}
```

### Response Example

```json
{
  "availableEmployees": ["Juan"],
  "totalAvailable": 1,
  "timestamp": "2026-05-25T10:20:02.401+02:00",
  "shiftDetails": {
    "date": "25/05/2026",
    "description": "Morning Shift"
  }
}
```

## Components

### AvailabilityForm
Main form component for checking availability. Handles:
- Shift information input
- Employee management
- Form validation
- API integration

### EmployeeInput
Component for adding/editing employee schedule information. Supports:
- Employee name and team
- Multiple schedule types
- Dynamic day selection

### ResultsDisplay
Component for displaying availability check results. Shows:
- Available employees
- Total count
- Shift details
- Query timestamp

### StatusCard
Component displaying API health status. Auto-refreshes every 30 seconds.

## Styling

The frontend uses Tailwind CSS for styling with:
- Mobile-first responsive design
- Custom color scheme
- Accessible UI components
- Smooth animations

## Error Handling

The application includes comprehensive error handling for:
- Network errors
- API errors
- Form validation errors
- Missing required fields

## Performance

- Next.js automatic code splitting
- Image optimization
- CSS purging for minimal bundle size
- Lazy component loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel

Deploy directly to Vercel:

```bash
vercel deploy
```

### Docker Deployment

1. Build the image: `docker build -t verificador-frontend:1.0 .`
2. Run the container with proper environment variables
3. Use reverse proxy (nginx, traefik) for production

### Kubernetes

Create a deployment manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: verificador-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: verificador-frontend
  template:
    metadata:
      labels:
        app: verificador-frontend
    spec:
      containers:
      - name: frontend
        image: verificador-frontend:1.0
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_BASE_URL
          value: "http://api:8080"
```

## Troubleshooting

### Port 3000 already in use
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API connection errors
- Check if backend is running on http://localhost:8080
- Verify `NEXT_PUBLIC_API_BASE_URL` environment variable
- Check CORS settings on the backend

### Build failures
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Testing

The project includes tests for:
- Input validation functions
- API client methods
- Component rendering

Run tests:
```bash
npm test
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Submit a pull request

## License

ISC

## Support

For issues or questions:
1. Check the backend API documentation
2. Review the code comments
3. Check application logs in browser console
4. Review Docker container logs: `docker logs verificador-frontend`

## Version

1.0.0 - Initial release
