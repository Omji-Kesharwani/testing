import { PrismaClient } from "../generated/prisma";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const prismaClient = new PrismaClient({});

// Handle connection errors
prismaClient.$connect()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });

// Graceful shutdown
process.on('beforeExit', async () => {
  await prismaClient.$disconnect();
});

