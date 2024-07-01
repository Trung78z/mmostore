// setup.ts (or any entry point of your application)

import { createUsersTable } from "./models/userModel"; // Adjust the path as per your project structure

async function setupDatabase() {
  // Create necessary tables
  await createUsersTable();
  // Add more tables if necessary
}

// Run setup function
setupDatabase();
