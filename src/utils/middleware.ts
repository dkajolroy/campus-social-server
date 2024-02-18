import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { serverConfig } from "../config/server_config";

export function authUser(req: Request, res: Response, next: NextFunction) {
  // Check cookie
  const token = req.cookies[serverConfig.authCookieName]; // user token

  if (token) {
    try {
      const decrypt = Jwt.verify(token, process.env.SECRETE_KEY) as {
        _id: string;
      };
      res.cookie(serverConfig.clientCookieName, true, {
        secure: true,
        maxAge: serverConfig.cookieExpire,
      });
      next();
    } catch (error) {
      return res
        .cookie(serverConfig.clientCookieName, false, {
          secure: true,
          maxAge: serverConfig.cookieExpire,
        })
        .send({ message: "You are not authenticate" });
    }
  } else {
    return res
      .cookie(serverConfig.clientCookieName, false, {
        secure: true,
        maxAge: serverConfig.cookieExpire,
      })
      .send({ message: "You are not authenticate" });
  }
  // try auth
  // next or not
}

function singleImage(req: Request, res: Response, next: NextFunction) {
  // image not found return
  // single or multi validator return
  // upload single Image to next with other data
  // realtime upload percent
}
function multiImage(req: Request, res: Response, next: NextFunction) {
  // image array not found return
  // upload single Image to next with other data
  // realtime upload percent
}
export const upload = { singleImage, multiImage };
