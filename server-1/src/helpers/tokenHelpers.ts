import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
interface UserPayload {
  id: string;
  role: string;
}
console.log(process.env.NODE_ENV);

const expiresIn = process.env.NODE_ENV === "develoment" ? "2d" : "15m";
export const generateAccessToken = (user: UserPayload) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: expiresIn,
  });
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
