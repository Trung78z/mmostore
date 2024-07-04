import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function checkConnection() {
  try {
    // Run a simple query to check the connection
    await prisma.$connect();
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

// Execute the connection check function
checkConnection();
export default prisma;
