import { Router } from "express";
import {
  createContact,
  findAllContact,
  updateContact,
} from "../controllers/contactController";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = Router();

router.post("/", authMiddleware, createContact);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), updateContact);

router.get(
  "/admin/:role",
  authMiddleware,
  roleMiddleware("ADMIN"),
  findAllContact
);
export default router;
