#!/bin/bash
set -e

echo "🚀 Starting integration tests..."

# Start the database
echo "📦 Starting PostgreSQL database..."
docker compose up -d db

# Wait for database to be ready
echo "🟡 Waiting for database to be ready..."
./scripts/wait-for-it.sh "postgresql://postgres:mysecretpassword@localhost:5432/postgres" -- echo '🟢 Database is ready!'

# Additional wait to ensure database is fully initialized
echo "⏳ Waiting additional time for database to be fully initialized..."
sleep 5

# Regenerate Prisma client for the current platform
echo "🔧 Regenerating Prisma client..."
npx prisma generate

# Run database migrations
echo "🔄 Running database migrations..."
npx prisma migrate dev --name init

# Validate database schema
echo "🔍 Validating database schema..."
npx prisma db pull --print

# Verify database connection
echo "🔍 Verifying database connection..."
npx prisma db seed --preview-feature || echo "No seed script found, continuing..."

# Additional wait after migrations
echo "⏳ Waiting for migrations to settle..."
sleep 3

# Run tests
echo "🧪 Running tests..."
npm run test

# Cleanup
echo "🧹 Cleaning up..."
docker compose down

echo "✅ Integration tests completed successfully!"