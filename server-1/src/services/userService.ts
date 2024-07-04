import bcrypt from "bcrypt";
import prisma from "../configs/dbs";
import { Role } from "../types/enums/enums";

export const registerUser = async (
  email: string,
  username: string,
  password: string,
  role: string
) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const insertId = await prisma.users.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });
  return insertId || null;
};

export const findUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({ where: { email } });
};

export const findUserByUsername = async (username: string) => {
  return (await prisma.users.findFirst({ where: { username } })) || null;
};

export const findUserById = async (id: string) => {
  return (await prisma.users.findUnique({ where: { id } })) || null;
};
export const updateUserById = async (
  id: string,
  username: string,
  password: string,
  role: Role
) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return (
    (await prisma.users.update({
      where: { id },
      data: { username: username, password: hashedPassword, role: role },
    })) || null
  );
};

// Delete a user by ID
export const deleteUserById = async (id: string): Promise<void> => {
  (await await prisma.users.delete({ where: { id } })) || null;
};

export const getAllUserServices = async () => {
  return await prisma.users.findMany();
};
