import { Router } from "express";
import * as userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";
const router = Router();
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/refresh-token", userController.refreshToken);

router.post("/logout", authMiddleware, userController.logoutUser);

// Protected routes
router.get("/by/id", authMiddleware, userController.getUser);
router.get("/qrCode/user", authMiddleware, userController.getQrCode);
router.get("/verify-email", userController.verifyGoogle);
router.get("/profile/:id", userController.getUserGlobal);
router.post("/reset-password", userController.verifyForgetPassword);
router.post("/create-reset-password", userController.createForgetPassword);
router.put(
  "/admin/update/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.updateUser
);

router.put(
  "/dang-ki-ban-hang",
  authMiddleware,
  userController.updateSaleUserById
);
router.put("/", authMiddleware, userController.updatePasswordUserById);
router.put("/profile/user", authMiddleware, userController.updateProfile);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.deleteUser
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.getAllUser
);
// Admin routes
router.get(
  "/vip",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.getAllUserVip
);

router.get("/google/login/:access_token", userController.getAuthorGoogle);
export default router;
