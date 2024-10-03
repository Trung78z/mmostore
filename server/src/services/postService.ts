import prisma from "../configs/dbs";
import { createSlug } from "../utils/loashCover";
enum RolePost {
  cancel = "cancel",
  success = "success",
  ide = "ide",
  error = "error",
}

export const createPost = async (
  title: string,
  content: string,
  postCategoryId: number,
  image?: string,
  userId?: string
) => {
  return await prisma.posts.create({
    data: {
      title: title,
      content: content,
      image: image || null,
      slug: createSlug(title),
      userId: userId!,
      postCategoryId,
    },
  });
};
export const createCommentService = async (
  content: string,
  postId: number,
  userId: string
) => {
  return await prisma.postPomments.create({
    data: {
      content,
      postId,
      userId,
    },
    include: {
      user: { select: { profiles: { select: { fullName: true } } } },
    },
  });
};
export const deleteCommentService = async (id: number) => {
  return await prisma.postPomments.delete({
    where: { id },
  });
};

export const likePost = async (userId: string, postId: number) => {
  const found = await prisma.postLikes.findFirst({
    where: { userId, postId },
  });

  if (found) {
    return await prisma.postLikes.delete({ where: { id: found.id } });
  } else {
    return await prisma.postLikes.create({ data: { userId, postId } });
  }
};

export const viewPost = async (userId: string, postId: number) => {
  const found = await prisma.postViews.findFirst({
    where: { userId, postId },
  });

  if (found) {
    return null;
  } else {
    return await prisma.postViews.create({ data: { userId, postId } });
  }
};

export const findByIdPost = async (slug: string) => {
  return await prisma.posts.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      postLikes: true,
      postViews: true,
      postPomments: {
        include: {
          user: { select: { profiles: { select: { fullName: true } } } },
        },
      },
    },
  });
};
export const findAllPost = async () => {
  return await prisma.posts.findMany({
    where: { status: "success" },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      postLikes: true,
      postViews: true,
    },
  });
};
export const findAllPostByAdmin = async () => {
  return await prisma.posts.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
      postLikes: true,
      postViews: true,
    },
  });
};
export const findAllPostByUser = async (userId: string) => {
  return await prisma.posts.findMany({
    where: { userId },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      postLikes: true,
      postViews: true,
    },
  });
};

export const updatePostById = async (
  id: number,
  title: string,
  content: string,
  postCategoryId: number,
  image?: string,
  userId?: string
) => {
  const existingPost = await prisma.posts.findUnique({
    where: { id: id },
  });

  if (!existingPost) {
    throw new Error(`Post with id ${id} not found`);
  }

  const updatePost = await prisma.posts.update({
    where: { id: id, userId: userId },
    data: {
      title,
      content,
      image: image ? image : existingPost.image,
      slug: createSlug(title),
      postCategoryId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      postLikes: true,
      postViews: true,
    },
  });
  return updatePost;
};

// Delete a user by ID
export const updatePostByAdmin = async (id: number, status: RolePost) => {
  try {
    return await prisma.posts.update({
      where: { id },
      data: { status: status },
    });
  } catch (error) {
    console.error("Error delete post:", error);
    return null;
  }
};
