import prisma from "../configs/dbs";

export const findFirst = async () => {
  return await prisma.homepages.findFirst();
};
export const createHomePageFirst = async (content: string) => {
  return await prisma.homepages.create({ data: { content } });
};

export const updateDesPage = async (content: string) => {
  const data = await prisma.homepages.findFirst();

  if (data)
    return await prisma.homepages.update({
      where: { id: 1 },
      data: { content },
    });
  return await prisma.homepages.create({
    data: { content },
  });
};
