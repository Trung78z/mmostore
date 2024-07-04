import { createPool } from "mysql2/promise";
import { configDotenv } from "dotenv";

configDotenv();

const pool = createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const logConnectionStatus = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Log connection status on startup
logConnectionStatus();
export default pool;
