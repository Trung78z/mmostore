import prisma from "../configs/dbs";

export const createRoom = async (name: string) => {
  return await prisma.room.create({
    data: { name },
  });
};
export const createRoomAdmin = async (
  name: string,
  userId: string,
  userIds: { userId: string }[]
) => {
  return await prisma.room.create({
    data: { name, members: { createMany: { data: userIds } } },
    include: {
      members: {
        where: { userId },
        include: {
          room: {
            select: {
              name: true,
              members: {
                select: {
                  user: {
                    select: {
                      id: true,
                      profiles: { select: { firstName: true, lastName: true } },
                    },
                  },
                },
              },
              _count: true,
              messages: { orderBy: { createdAt: "asc" } },
            },
          },
        },
      },
    },
  });
};
export async function findRoomById(roomId: string) {
  return await prisma.room.findUnique({ where: { id: parseInt(roomId) } });
}
export async function findRoomByUser(userId: string) {
  return await prisma.roomMember.findMany({
    where: { userId },
    include: {
      room: {
        select: {
          name: true,
          members: {
            select: {
              user: {
                select: {
                  id: true,
                  profiles: { select: { firstName: true, lastName: true } },
                },
              },
            },
          },
          _count: true,
          messages: { orderBy: { createdAt: "asc" } },
        },
      },
    },
  });
}

export async function findFirstAdmin() {
  return await prisma.users.findFirst({ where: { role: "ADMIN" } });
}
export async function findProfile(userId: string) {
  return await prisma.profiles.findUnique({ where: { userId } });
}

export async function createRoomMember(userId: string, roomId: string) {
  return await prisma.roomMember.create({
    data: {
      userId,
      roomId: parseInt(roomId),
    },
  });
}

export async function createMessage(
  userId: string,
  content: string,
  roomId: string
) {
  return prisma.message.create({
    data: { userId, content, roomId: parseInt(roomId) },
  });
}
export async function getMessage(roomId: string) {
  return await prisma.message.findMany({
    where: { roomId: parseInt(roomId) },
  });
}

export async function deleteRoomChat(userId: string, id: number) {
  return await prisma.roomMember.delete({
    where: { id, userId: userId },
  });
}