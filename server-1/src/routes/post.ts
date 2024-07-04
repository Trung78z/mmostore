import { Router } from "express";
import {
  createPost,
  getPostById,
  getPosts,
  updatePostById,
  deletePostById,
  images,
  getImages,
  getByUserPosts,
} from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddleware";

import { upload } from "../helpers/multer";

const router = Router();

router.post("/create", upload.single("avatar"), authMiddleware, createPost);
router.post("/test", upload.single("avatar"), images);
// Protected routes
// *Get post
router.get("/:slug", getPostById);
router.get("/", getPosts);
router.get("/user/posts", authMiddleware, getByUserPosts);

// * Edit post
router.put("/:id", upload.single("avatar"), authMiddleware, updatePostById);
router.delete("/:id", authMiddleware, deletePostById);

router.get("/uploads/:filename", getImages);

export default router;
