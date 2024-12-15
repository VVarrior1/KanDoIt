import { PrismaClient } from "@prisma/client";

// Function to create a new Prisma instance
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Add type safety for the global object
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Create or reuse the Prisma instance
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Ensure we use the same instance during development
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;