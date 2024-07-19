import bcrypt from "bcrypt";
import prisma from "../configs/dbs";
import { Role } from "../types/enums/enums";

export const registerUser = async (
  email: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const insertId = await prisma.users.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
      profiles: { create: { firstName, lastName, accountBalance: 0 } },
    },
  });
  return insertId || null;
};

export const findUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
    include: {
      profiles: {
        select: { accountBalance: true, firstName: true, lastName: true },
      },
    },
  });
};

export const findUserByUsername = async (username: string) => {
  return (await prisma.users.findFirst({ where: { username } })) || null;
};

export const findUserById = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      role: true,
      createdAt: true,
      email: true,
      username: true,
      profiles: {
        select: { accountBalance: true, lastName: true, firstName: true },
      },
      _count: {
        select: {
          posts: true,
          orders: { where: { services: { userId: id } } },
          services: true,
        },
      },
    },
  });
};
export const findRoleUserById = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
    select: {
      role: true,
      profiles: {
        select: { accountBalance: true, lastName: true, firstName: true },
      },
    },
  });
};
export const updateUserById = async (id: string, total: number, role: Role) => {
  return await prisma.users.update({
    where: { id },
    data: { role: role, profiles: { update: { accountBalance: total } } },
    select: {
      email: true,
      id: true,
      createdAt: true,
      username: true,
      role: true,
      profiles: {
        select: { firstName: true, lastName: true, accountBalance: true },
      },
    },
  });
};

export const updatePasswordUserById = async (
  id: string,
  password: string,
  passwordNew: string
) => {
  const user = await prisma.users.findUnique({
    where: { id: id },
  });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return {
      success: false,
      msg: "Mật khẩu không đúng!",
    };
  }
  const hashedPasswordNew = bcrypt.hashSync(passwordNew, 10);
  return {
    success: true,
    msg: await prisma.users.update({
      where: { id: id },
      data: { password: hashedPasswordNew },
    }),
  };
};

// Delete a user by ID
export const deleteUserById = async (id: string) => {
  await prisma.users.delete({ where: { id } });
};

export const getAllUserServices = async () => {
  return await prisma.users.findMany({
    select: {
      email: true,
      id: true,
      createdAt: true,
      username: true,
      role: true,
      profiles: {
        select: { firstName: true, lastName: true, accountBalance: true },
      },
    },
  });
};
