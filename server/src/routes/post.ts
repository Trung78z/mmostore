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
  getPostsByAdmin,
  updatePostByAdmin,
  likePost,
  viewPost,
  createComment,
  deleteComment,
} from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddleware";
import { upload } from "../helpers/multerPost";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = Router();

router.post("/create", upload.single("post"), authMiddleware, createPost);
router.post("/comment", authMiddleware, createComment);
router.delete("/comment/:id", authMiddleware, deleteComment);
router.post("/test", upload.single("post"), images);
router.post("/like-post", authMiddleware, likePost);
router.post("/view-post", authMiddleware, viewPost);
// Protected routes
// *Get post
router.get("/:slug", getPostById);
router.get("/", getPosts);
router.get(
  "/admin/posts",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getPostsByAdmin
);
router.get("/user/posts", authMiddleware, getByUserPosts);

// * Edit post
router.put("/:id", upload.single("post"), authMiddleware, updatePostById);
router.put(
  "/admin/byId/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updatePostByAdmin
);

router.get("/uploads/:filename", getImages);

export default router;
