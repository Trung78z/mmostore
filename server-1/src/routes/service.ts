import { Router } from "express";
import {
  createService,
  getServiceById,
  getServices,
  updateServiceById,
  deleteServiceById,
  images,
  getImages,
  getByUserServices,
} from "../controllers/serviceController";
import authMiddleware from "../middlewares/authMiddleware";

import { upload } from "../helpers/multerPost";

const router = Router();

router.post("/create", upload.single("service"), authMiddleware, createService);
// *Get post
router.get("/:slug", getServiceById);
router.get("/", getServices);
router.get("/by/user", authMiddleware, getByUserServices);

// * Edit post
router.put("/:id", upload.single("avatar"), authMiddleware, updateServiceById);
router.delete("/:id", authMiddleware, deleteServiceById);

router.get("/uploads/:filename", getImages);

export default router;
