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

export const findByIdPost = async (slug: string) => {
  try {
    const post = await prisma.posts.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Error findById post:", error);
    return null;
  }
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
    },
  });
};
export const findAllPostByUser = async (userId: string) => {
  try {
    const post = await prisma.posts.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Error findALL post:", error);
    return null;
  }
};

export const updatePostById = async (
  id: number,
  title: string,
  content: string,
  image?: string,
  userId?: string
) => {
  try {
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
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return updatePost;
  } catch (error) {
    console.error("Error update post:", error);
    return null;
  }
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
