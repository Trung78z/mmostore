import jwt from "jsonwebtoken";

interface UserPayload {
  id: number;
  role: string;
}

export const generateAccessToken = (user: UserPayload) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: "15m" });
};

export const generateRefreshToken = (user: UserPayload) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as UserPayload;
  } catch {
    return null;
  }
};
