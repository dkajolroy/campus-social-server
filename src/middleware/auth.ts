import { server_config } from "@src/config/server_config";
import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { sendClientCookie } from "../utils/send_cookie";

export function authUser(req: Request, res: Response, next: NextFunction) {
  // Check cookie
  const token = req.cookies[server_config.authCookieName]; // user token
  if (token) {
    try {
      const decrypt = Jwt.verify(token, process.env.SECRETE_KEY) as {
        user: string; // userId
      };
      req.body.author = decrypt.user;
      next();
    } catch (error) {
      sendClientCookie(res, { value: false });
      return res.send({ message: "Login expire please login agin !" }); // login expire or wrong token
    }
  } else {
    sendClientCookie(res, { value: false });
    return res.status(400).send({ message: "You are not authenticate" });
  }
}
