import bcrypt from "bcrypt";
import prisma from "../configs/dbs";
import { Role } from "../types/enums/enums";

export const registerUser = async (
  email: string,
  username: string,
  password: string,
  active: boolean,
  fullName: string,
  token: string,
  expiresAt: Date,
  referralCode?: string
) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return await prisma.users.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
      active,
      emailVerificationToken: token,
      emailVerificationTokenExpiresAt: expiresAt,
      profiles: {
        create: { fullName: fullName, accountBalance: 0, referralCode },
      },
    },
    include: { profiles: { select: { accountBalance: true, fullName: true } } },
  });
};
export const registerUserWhenLoginGoogle = async (
  email: string,
  username: string,
  fullName: string
) => {
  return await prisma.users.create({
    data: {
      email: email,
      username: username,
      active: true,
      profiles: {
        create: { fullName: fullName, accountBalance: 0 },
      },
    },
    include: { profiles: { select: { accountBalance: true, fullName: true } } },
  });
};

export const createTokenVerify = async (
  userId: string,
  token: string,
  expiresAt: Date
) => {
  return await prisma.users.update({
    where: { id: userId },
    data: {
      emailVerificationToken: token,
      emailVerificationTokenExpiresAt: expiresAt,
    },
  });
};
export const createTokenForget = async (
  userId: string,
  token: string,
  expiresAt: Date
) => {
  return await prisma.passwordResetToken.create({
    data: {
      token: token,
      expiresAt: expiresAt,
      userId: userId,
    },
  });
};

export const updateInfoEmailVerify = async (
  userId: string,
  fullName: string
) => {
  return await prisma.users.update({
    where: { id: userId },
    data: {
      active: true,
      profiles: {
        update: { fullName: fullName },
      },
    },
  });
};

export const updateTokenEmailVerify = async (userId: string) => {
  return await prisma.users.update({
    where: { id: userId },
    data: {
      active: true,
      emailVerificationToken: null,
      emailVerificationTokenExpiresAt: null,
    },
  });
};
export const updateWhenLoginActive = async (userId: string) => {
  return await prisma.users.update({
    where: { id: userId },
    data: { active: true },
  });
};
export const updateUserStatus = async (userId: string, isOnline: boolean) => {
  return await prisma.userStatus.upsert({
    where: { userId: userId },
    update: { isOnline, lastOnline: new Date() },
    create: { userId, isOnline, lastOnline: new Date() },
  });
};
export const updateUserById = async (id: string, total: number, role: Role) => {
  return await prisma.users.update({
    where: { id, active: true },
    data: { role: role, profiles: { update: { accountBalance: total } } },
    select: {
      email: true,
      id: true,
      createdAt: true,
      username: true,
      role: true,
      profiles: {
        select: { fullName: true, accountBalance: true },
      },
    },
  });
};

export const updatePasswordUserById = async (
  id: string,
  passwordNew: string
) => {
  const hashedPasswordNew = bcrypt.hashSync(passwordNew, 10);
  return await prisma.users.update({
    where: { id: id },
    data: { password: hashedPasswordNew },
  });
};
export const findTokenForget = async (token: string) => {
  return await prisma.passwordResetToken.findUnique({
    where: { token, expiresAt: { gt: new Date() } },
  });
};
export const findTokenEmail = async (token: string) => {
  return await prisma.users.findFirst({
    where: {
      emailVerificationToken: token,
      emailVerificationTokenExpiresAt: { gt: new Date() },
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
    include: {
      profiles: {
        select: { accountBalance: true, fullName: true },
      },
    },
  });
};

export const findUserByUsername = async (username: string) => {
  return await prisma.users.findFirst({ where: { username, active: true } });
};
export const findIdUserUpdate = async (id: string) => {
  return await prisma.users.findUnique({ where: { id } });
};
export const findUserById = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id, active: true },
    select: {
      id: true,
      role: true,
      createdAt: true,
      email: true,
      username: true,
      profiles: {
        select: { accountBalance: true, fullName: true },
      },
      status: true,
      _count: {
        select: {
          posts: true,
          serviceOrders: { where: { services: { userId: id } } },
          services: true,
        },
      },
    },
  });
};
export const findRoleUserById = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id, active: true },
    select: {
      role: true,
      profiles: {
        select: { accountBalance: true, fullName: true },
      },
    },
  });
};

// Delete a user by ID
export const deleteUserById = async (id: string) => {
  await prisma.users.delete({ where: { id } });
};

export const getAllUserServices = async () => {
  return await prisma.users.findMany({
    where: { active: true },
    select: {
      email: true,
      id: true,
      createdAt: true,
      username: true,
      role: true,
      profiles: {
        select: { fullName: true, accountBalance: true },
      },
    },
  });
};
export const getAllUserServicesVip = async () => {
  return await prisma.users.findMany({
    include: { profiles: true },
  });
};
