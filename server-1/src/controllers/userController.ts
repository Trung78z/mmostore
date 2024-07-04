import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as userService from "../services/userService";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../helpers/tokenHelpers";
export const registerUser = async (req: Request, res: Response) => {
  const { email, username, password, role = "user" } = req.body;

  try {
    const findByEmail = await userService.findUserByEmail(email);

    if (findByEmail) {
      return res.status(200).json({
        success: false,
        msg: "Bạn đã có tài khoản vui lòng đăng nhập!",
      });
    }

    const usernames = await userService.findUserByUsername(username);
    if (usernames) {
      return res.status(200).json({
        success: false,
        msg: "Tên tài khoản đã có trong hệ thống vui lòng thử lại!",
      });
    }
    await userService.registerUser(email, username, password, role);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = generateAccessToken({ id: user.id, role: user.role });
      const refreshToken = generateRefreshToken({
        id: user.id,
        role: user.role,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.json({ success: true, msg: accessToken });
    } else {
      res.status(200).json({
        success: false,
        msg: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const user = await userService.findUserById(req.user?.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update the authenticated user's profile
export const updateUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  try {
    if (req.user) {
      await userService.updateUserById(req.user?.id, username, password, role);
      res.json({ id: req.user?.id, username, role });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete the authenticated user's profile
export const deleteUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      await userService.deleteUserById(req.user?.id);
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(401).json({ success: false, error: error });
  }
};
// Refresh access token using the refresh token
export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const payload = verifyRefreshToken(refreshToken);

  if (payload) {
    const accessToken = generateAccessToken({
      id: payload.id,
      role: payload.role,
    });
    res.json({ success: true, id: payload.id, accessToken: accessToken });
  } else {
    res.json({ success: false, error: "Invalid refresh token" });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await userService.getAllUserServices();
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
};
