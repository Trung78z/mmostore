import { Request, response, Response } from "express";
import bcrypt from "bcrypt";
import * as userService from "../services/userService";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../helpers/tokenHelpers";
import axios from "axios";
import CryptoJS from "crypto-js";
import {
  sendForgetPasswordEmail,
  sendVerificationEmail,
} from "../utils/smsEmail";
import path from "path";
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, referralCode } = req.body;
  const username = email.split("@gmail")[0];
  const token = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
  const expiresAt = new Date(Date.now() + 3600000);

  try {
    const findByEmail = await userService.findUserByEmail(email);

    if (findByEmail) {
      return res.status(200).json({
        success: false,
        msg: "Bạn đã có tài khoản vui lòng đăng nhập!",
      });
    }

    await userService.registerUser(
      email,
      username,
      password,
      false,
      username,
      token,
      expiresAt,
      referralCode
    );
    try {
      const data = await sendVerificationEmail(email, token);
    } catch (error) {
      console.log(error);
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findUserByEmail(email);
    if (user?.active === false) {
      const token = CryptoJS.lib.WordArray.random(32).toString(
        CryptoJS.enc.Hex
      );
      const expiresAt = new Date(Date.now() + 3600000);
      await userService.createTokenVerify(user.id, token, expiresAt);
      try {
        const data = await sendVerificationEmail(email, token);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      return res.status(200).json({
        success: false,
        msg: "Tài khoản của bạn chưa được kích hoạt! Chúng tôi vừa gửi email xác nhận!",
      });
    }

    if (user && user.password && bcrypt.compareSync(password, user.password)) {
      const accessToken = generateAccessToken({
        id: user.id,
        role: user.role,
      });
      const refreshToken = generateRefreshToken({
        id: user.id,
        role: user.role,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      return res.json({
        success: true,
        accessToken: accessToken,
        id: user.id,
        role: user.role,
        accountBalance: user.profiles?.accountBalance,
        fullName: user.profiles?.fullName,
      });
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
export const getUserGlobal = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.findUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update the authenticated user's profile
export const updateUser = async (req: Request, res: Response) => {
  const { total, role } = req.body;
  const { id } = req.params;
  try {
    const msg = await userService.updateUserById(id, parseInt(total), role);
    res.json(msg);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};
// Update the authenticated user's profile
export const updatePasswordUserById = async (req: Request, res: Response) => {
  const { passwordOld, passwordNew } = req.body.data;

  try {
    if (req.user) {
      // const user = await prisma.users.findUnique({
      //   where: { id: id, active: true },
      // });
      const user = await userService.findIdUserUpdate(req.user.id);
      if (!user) {
        return {
          success: false,
          msg: "Tài khoản không tồn tại!",
        };
      }
      if (user.password && !bcrypt.compareSync(passwordOld, user.password)) {
        return {
          success: false,
          msg: "Mật khẩu không đúng!",
        };
      }

      await userService.updatePasswordUserById(req.user?.id, passwordNew);
      res.json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete the authenticated user's profile
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const msg = await userService.deleteUserById(id);
    res.status(200).json(msg);
  } catch (error) {
    console.log(error);

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
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const payload = verifyRefreshToken(refreshToken);

  if (payload) {
    const accessToken = generateAccessToken({
      id: payload.id,
      role: payload.role,
    });
    try {
      const response = await userService.findRoleUserById(payload.id);
      return res.json({
        success: true,
        id: payload.id,
        accessToken: accessToken,
        role: response?.role,
        profile: response?.profiles,
      });
    } catch (error) {
      return res.sendStatus(401);
    }
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
export const getAllUserVip = async (req: Request, res: Response) => {
  try {
    const data = await userService.getAllUserServicesVip();
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getAuthorGoogle = async (req: Request, res: Response) => {
  const { access_token } = req.params;
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const findByEmail = await userService.findUserByEmail(response.data.email);

    if (findByEmail?.active === false) {
      await userService.updateWhenLoginActive(findByEmail.id);
    }
    if (findByEmail) {
      const accessToken = generateAccessToken({
        id: findByEmail.id,
        role: findByEmail.role,
      });
      const refreshToken = generateRefreshToken({
        id: findByEmail.id,
        role: findByEmail.role,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      return res.json({
        success: true,
        accessToken: accessToken,
        id: findByEmail.id,
        role: findByEmail.role,
        accountBalance: findByEmail.profiles?.accountBalance,
        fullName: findByEmail.profiles?.fullName,
      });
    } else {
      const username = response.data.email.split("@gmail")[0];
      const msg = await userService.registerUserWhenLoginGoogle(
        response.data.email,
        username,
        response.data.name
      );
      const accessToken = generateAccessToken({
        id: msg.id,
        role: msg.role,
      });
      const refreshToken = generateRefreshToken({
        id: msg.id,
        role: msg.role,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      return res.json({
        success: true,
        accessToken: accessToken,
        id: msg.id,
        role: msg.role,
        accountBalance: msg.profiles?.accountBalance,
        fullName: msg.profiles?.fullName,
      });
    }
  } catch (error) {
    console.log(error);

    res.json({ success: false, error: "Invalid access_token token" });
  }
};

export const verifyGoogle = async (req: Request, res: Response) => {
  const { token } = req.query;
  try {
    if (!token) {
      return res.status(400).send("Token không hợp lệ");
    }
    const user = await userService.findTokenEmail(token.toString());
    if (!user) {
      return res.json({ msg: "Token không hợp lệ hoặc đã hết hạn" });
    }
    await userService.updateTokenEmailVerify(user.id);
    return res.sendFile(
      path.join(__dirname, "..", "public", "verify-google.html")
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createForgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return {
        success: false,
        msg: "Tài khoản không tồn tại!",
      };
    }
    const token = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
    const expiresAt = new Date(Date.now() + 3600000);
    await userService.createTokenForget(user.id, token, expiresAt);
    await sendForgetPasswordEmail(email, token);
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyForgetPassword = async (req: Request, res: Response) => {
  const { token } = req.query;
  const { passwordNew } = req.body;
  try {
    if (!token) {
      return res
        .status(400)
        .json({ success: false, msg: "Token không hợp lệ!" });
    }
    const user = await userService.findTokenForget(token.toString());
    if (!user) {
      return res.json({
        success: false,
        msg: "Token không hợp lệ hoặc đã hết hạn",
      });
    }
    await userService.updatePasswordUserById(user.userId, passwordNew);
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
