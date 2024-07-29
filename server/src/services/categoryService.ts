import prisma from "../configs/dbs";
import { createSlug } from "../utils/loashCover";

export const createPost = async (
  title: string,
  content: string,
  image?: string,
  userId?: string
) => {
  try {
    const newPost = await prisma.posts.create({
      data: {
        title: title,
        content: content,
        image: image || null,
        slug: createSlug(title),
        userId: userId!,
      },
    });
    return newPost.id;
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
};

export const getCategoriesPost = async () => {
  return await prisma.postCategory.findMany({
    include: {
      _count: { select: { posts: { where: { status: "success" } } } },
    },
  });
};
export const getCategoriesPostData = async (slug: string) => {
  return await prisma.postCategory.findFirst({
    where: { slug: slug },
    include: {
      posts: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
        where: { status: "success" },
      },
    },
  });
};
export const getCategoriesService = async () => {
  return await prisma.serviceCategory.findMany({
    include: {
      serviceSubCategory: { include: { serviceChildrenCategory: true } },
    },
    orderBy: { id: "asc" },
  });
};
export const getCategoriesSub = async (id: string) => {
  return await prisma.serviceSubCategory.findMany({
    where: { subCategoryCover: id },
    include: {
      serviceChildrenCategory: true,
    },
  });
};
