import { Router } from "express";
import {
  createService,
  getServiceById,
  getServices,
  updateServiceById,
  deleteServiceById,
  getImages,
  getByUserServices,
  getProducts,
  updateServiceByAdmin,
  getServicesAllByAdmin,
  getProductAllByAdmin,
} from "../controllers/serviceController";
import authMiddleware from "../middlewares/authMiddleware";

import { upload } from "../helpers/multerService";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = Router();

router.post("/create", upload.single("service"), authMiddleware, createService);
// *Get post
router.get("/id/:slug", getServiceById);
router.get("/", getProducts);
router.get("/service/:id", getServices);
router.get("/", getServices);
router.get("/by/user", authMiddleware, getByUserServices);
router.get(
  "/admin/services",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getServicesAllByAdmin
);
router.get(
  "/admin/products",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getProductAllByAdmin
);

// * Edit post
router.put("/:id", upload.single("avatar"), authMiddleware, updateServiceById);
router.put(
  "/admin/byId/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateServiceByAdmin
);
router.delete("/:id", authMiddleware, deleteServiceById);

export default router;
