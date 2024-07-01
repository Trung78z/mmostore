import bcrypt from "bcrypt";
import {
  createUser as createUserModel,
  findUserByUsername as findUserByUsernameModel,
  findUserById as findUserByIdModel,
  updateUserById as updateUserByIdModel,
  deleteUserById as deleteUserByIdModel,
  findUserByEmail as findUserByEmailModel,
} from "../models/userModel";
import { User } from "../types/user";

// Register a new user
export const registerUser = async (
  email: string,
  username: string,
  password: string,
  role: string
): Promise<{ id: number; email: string; username: string; role: string }> => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const insertId = await createUserModel(email, username, hashedPassword, role);
  return { id: insertId, email, username, role };
};

// Find a user by email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  return findUserByEmailModel(email);
};

// Find a user by username
export const findUserByUsername = async (
  username: string
): Promise<User | null> => {
  return findUserByUsernameModel(username);
};

// Find a user by ID
export const findUserById = async (id: number): Promise<User | null> => {
  return findUserByIdModel(id);
};

// Update a user by ID
export const updateUserById = async (
  id: number,
  username: string,
  password: string,
  role: string
): Promise<void> => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  await updateUserByIdModel(id, username, hashedPassword, role);
};

// Delete a user by ID
export const deleteUserById = async (id: number): Promise<void> => {
  await deleteUserByIdModel(id);
};
