import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
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
router.get("/user", authMiddleware, getUser);
router.put("/user", authMiddleware, updateUser);
router.delete("/user", authMiddleware, deleteUser);
router.get("/findAll/users", getAllUser);

// Admin routes
router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.send("Welcome Admin!");
});

export default router;
