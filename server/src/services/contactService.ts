import prisma from "../configs/dbs";
import { RoleContact, RoleContactCus } from "../types/enums/contact";

export const createContact = async (
  email: string,
  phone: string,
  title: string,
  content: string,
  role: RoleContactCus,
  userId: string
) => {
  return await prisma.contact.create({
    data: { email, phone, title, content, userId, role },
  });
};

export const updateContact = async (id: number, status: RoleContact) => {
  return await prisma.contact.update({
    where: { id },
    data: { status: status },
  });
};

export const findAllContact = async (role: RoleContactCus) => {
  return await prisma.contact.findMany({
    where: { role },
    include: {
      users: true,
    },
  });
};
