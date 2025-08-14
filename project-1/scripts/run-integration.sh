#!/bin/bash
set -e

echo "🚀 Starting integration tests..."

# Start the database
echo "📦 Starting PostgreSQL database..."
docker compose up -d db

# Wait for database to be ready
echo "🟡 Waiting for database to be ready..."
./scripts/wait-for-it.sh "postgresql://postgres:mysecretpassword@localhost:5432/postgres" -- echo '🟢 Database is ready!'

# Regenerate Prisma client for the current platform
echo "🔧 Regenerating Prisma client..."
npx prisma generate

# Run database migrations
echo "🔄 Running database migrations..."
npx prisma migrate dev --name init

# Run tests
echo "🧪 Running tests..."
npm run test

# Cleanup
echo "🧹 Cleaning up..."
docker compose down

echo "✅ Integration tests completed successfully!"