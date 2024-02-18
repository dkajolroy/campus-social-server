import Jwt from "jsonwebtoken";
import slugify from "slugify";
import { serverConfig } from "../config/server_config";

// generate token
export function generateToken(user: any, expiresIn?: string) {
  return Jwt.sign({ user }, process.env.SECRETE_KEY, {
    expiresIn: expiresIn || serverConfig.cookieExpire,
  });
}

// generate Username
export function generateUsername(firstName: string, lastName?: string) {
  const randomNumber = (Math.random() * 999).toString().split(".")[0];
  const slug = slugify(`${firstName} ${lastName || ""}`, {
    replacement: ".",
    lower: true,
    trim: true,
  });
  return `${slug || `user-${randomNumber}`}.${randomNumber}`; // unique name
}
