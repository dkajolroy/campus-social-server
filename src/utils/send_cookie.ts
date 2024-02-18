import { Response } from "express";
import { serverConfig } from "../config/server_config";

export function sendServerCookie(res: Response, { token }: { token: string }) {
  res.cookie(serverConfig.authCookieName, token, {
    httpOnly: true,
    secure: true,
    maxAge: serverConfig.cookieExpire,
  });
}

export function sendClientCookie(res: Response, { value }: { value: any }) {
  res.cookie(serverConfig.clientCookieName, value, {
    secure: true,
    maxAge: serverConfig.cookieExpire,
  });
}
