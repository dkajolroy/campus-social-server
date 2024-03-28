import Jwt from "jsonwebtoken";
import slugify from "slugify";
import { server_config } from "../config/server_config";

// generate token
export function generateToken(user: any, expiresIn?: string) {
  return Jwt.sign({ user }, process.env.SECRETE_KEY, {
    expiresIn: expiresIn || server_config.cookieExpire,
  });
} // generate token
export function decodeToken(token: string, expiresIn?: string) {
  return Jwt.verify(token, process.env.SECRETE_KEY) as {
    user: string; // userId
  };
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
export function generateOTP() {
  var digits = "123456789";
  var otpLength = 4;
  var otp = "";

  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }
  return otp;
}
