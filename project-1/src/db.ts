import { PrismaClient } from "../generated/prisma";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Function to test database connection with retry
export async function testDatabaseConnection(maxRetries = 5, delay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempting database connection (${attempt}/${maxRetries})...`);
      await prismaClient.$connect();
      console.log('✅ Database connected successfully');
      return true;
    } catch (error) {
      console.error(`❌ Database connection attempt ${attempt} failed:`, error);
      if (attempt < maxRetries) {
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('❌ Database connection failed after maximum retries');
        return false;
      }
    }
  }
  return false;
}

// Initialize connection
testDatabaseConnection();

// Graceful shutdown
process.on('beforeExit', async () => {
  await prismaClient.$disconnect();
});

process.on('SIGINT', async () => {
  await prismaClient.$disconnect();
  process.exit(0);
});

