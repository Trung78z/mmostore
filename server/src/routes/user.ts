import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  updatePasswordUserById,
  updateUser,
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
router.get("/admin", authMiddleware, roleMiddleware("ADMIN"), (req, res) => {
  res.send("Welcome Admin!");
});

export default router;
