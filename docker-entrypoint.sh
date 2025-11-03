#!/bin/sh
set -e

# Wait for database to be ready
echo "🔄 Waiting for database connection..."
until npx prisma db execute --stdin <<< "SELECT 1;" > /dev/null 2>&1; do
  echo "⏳ Database not ready, waiting..."
  sleep 2
done

echo "✅ Database connected!"

# Run migrations
echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

echo "✅ Migrations complete!"

# Start Next.js server
echo "🚀 Starting Next.js server..."
exec node server.js
