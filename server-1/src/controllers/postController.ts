import { Request, Response } from "express";
import * as postService from "../services/postService";
import fs from "fs";
import path from "path";
import { configDotenv } from "dotenv";
configDotenv();
export const images = (req: Request, res: Response) => {
  return res.sendStatus(200);
};
export const getImages = (req: Request, res: Response) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, "../uploads", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    res.sendFile(filePath);
  });
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const filename = req.file?.filename;
  const url = filename
    ? `${process.env.HOST}/api/post/uploads/${filename}`
    : "";

  try {
    if (req.user) {
      const newPost = await postService.createPost(
        title,
        content,
        url,
        req.user.id
      );
      return res.status(201).json({ success: true, id: newPost });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login a user
export const getPostById = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const post = await postService.findByIdPost(slug);
    res.status(200).json({ success: true, msg: post });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.findAllPost();
    if (posts) {
      return res.status(200).json({ success: true, msg: posts });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getByUserPosts = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const posts = await postService.findAllPostByUser(req.user.id);
      res.status(200).json({ success: true, msg: posts });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update the authenticated user's profile
export const updatePostById = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const filename = req.file?.filename;
  const url = filename
    ? `${process.env.HOST}/api/post/uploads/${filename}`
    : "";
  const { id } = req.params;

  try {
    if (req.user) {
      const updatePost = await postService.updatePostById(
        parseInt(id),
        title,
        content,
        url,
        req.user.id
      );
      if (updatePost) {
        return res.status(200).json({ updatePost });
      } else {
        return res.status(200).json({ success: false });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete the authenticated user's profile
export const deletePostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (req.user) {
      await postService.deletePostById(parseInt(id), req.user.id);
      res.sendStatus(204);
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
