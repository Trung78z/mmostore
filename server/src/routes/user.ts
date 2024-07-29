import { Router } from "express";
import {
  createForgetPassword,
  deleteUser,
  getAllUser,
  getAllUserVip,
  getAuthorGoogle,
  getUser,
  getUserGlobal,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  updatePasswordUserById,
  updateUser,
  verifyForgetPassword,
  verifyGoogle,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

router.post("/logout", authMiddleware, logoutUser);

// Protected routes
router.get("/by/id", authMiddleware, getUser);
router.get("/verify-email", verifyGoogle);
router.get("/profile/:id", getUserGlobal);
router.post("/reset-password", verifyForgetPassword);
router.post("/create-reset-password", createForgetPassword);
router.put(
  "/admin/update/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateUser
);
router.put("/", authMiddleware, updatePasswordUserById);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deleteUser);

router.get("/", authMiddleware, roleMiddleware("ADMIN"), getAllUser);
// Admin routes
router.get("/vip", authMiddleware, roleMiddleware("ADMIN"), getAllUserVip);

router.get("/google/login/:access_token", getAuthorGoogle);
export default router;
