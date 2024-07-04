import pool from "../configs/db";
import { User } from "../types/user";

export const createUser = async (
  email: string,
  username: string,
  password: string,
  role: string
): Promise<number> => {
  const [result] = await pool.execute(
    "INSERT INTO users (email,username, password, role) VALUES (?,?, ?, ?)",
    [email, username, password, role]
  );
  return (result as any).insertId;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const users = rows as User[];
  return users[0] || null;
};
export const findUserByUsername = async (
  username: string
): Promise<User | null> => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  const users = rows as User[];
  return users[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const [rows] = await pool.execute(
    "SELECT id, username, role FROM users WHERE id = ?",
    [id]
  );
  const users = rows as User[];
  return users[0] || null;
};

export const updateUserById = async (
  id: number,
  username: string,
  password: string,
  role: string
): Promise<void> => {
  await pool.execute(
    "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?",
    [username, password, role, id]
  );
};

export const deleteUserById = async (id: number): Promise<void> => {
  await pool.execute("DELETE FROM users WHERE id = ?", [id]);
};

export async function createUsersTable(): Promise<void> {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(50) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
      )
    `;
    await pool.query(sql);
    console.log("Users table created or already exists.");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
}
