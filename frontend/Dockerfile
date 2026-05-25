# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine

WORKDIR /app

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL=http://api:8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start application
CMD ["npm", "start"]
