# Build stage
FROM node:20-alpine AS builder

# Install build tools for native dependencies (required for Prisma/SQLite)
RUN apk add --no-cache python3 make g++ openssl

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only the necessary files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy the rest of the application code
COPY . .

# Create a temporary directory for the build-time database
RUN mkdir -p /app/build-data

# Set the DATABASE_URL to a temporary file for build
ENV DATABASE_URL="file:/app/build-data/dev.db"

# Generate Prisma client
RUN pnpx prisma generate

# Run migrations to create the database schema for build
RUN pnpx prisma migrate deploy --schema=/app/prisma/schema.prisma

# seed db
RUN pnpx prisma db seed 

# img optimization
RUN pnpm add sharp

# Build the Next.js app
RUN pnpm run build

# Runtime stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally (minimal setup for production)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install build tools for native dependencies (required for Prisma/SQLite)
RUN apk add --no-cache python3 make g++ openssl

# Copy built files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy public directory if it exists (optional)
COPY --from=builder /app/public ./public

# Copy prisma directory for schema
COPY --from=builder /app/prisma ./prisma

# Install prisma for runtime migrations
RUN pnpm install prisma

# Set environment variables
ENV NODE_ENV=production

# Expose port 3000 (default for Next.js)
EXPOSE 3000

# Start the application: run migrations and then start the server
CMD ["sh", "-c", "pnpx prisma migrate deploy --schema=/app/prisma/schema.prisma && pnpx prisma db seed && node /app/server.js"]