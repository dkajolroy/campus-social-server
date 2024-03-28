import { Response } from "express";
import { server_config } from "../config/server_config";

export function sendServerCookie(res: Response, { token }: { token: string }) {
  res.cookie(server_config.authCookieName, token, {
    httpOnly: true,
    secure: true,
    maxAge: server_config.cookieExpire,
  });
}

export function sendClientCookie(res: Response, { value }: { value: any }) {
  res.cookie(server_config.clientCookieName, value, {
    secure: true,
    maxAge: server_config.cookieExpire,
  });
}
