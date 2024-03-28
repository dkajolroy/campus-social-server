import { server_config } from "@src/config/server_config";
import { cUploader, sharpImage } from "@src/services/upload_config";
import { decodeToken } from "@src/utils/generate";
import { NextFunction, Request, Response } from "express";

// upload single image
function single(folder: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { file } = req; // file | undefined
      const { user } = decodeToken(req.cookies[server_config.authCookieName]); // return user:id
      if (file) {
        const buffer = await sharpImage(file.buffer);
        const base = Buffer.from(buffer).toString("base64");
        let base64 = "data:" + file.mimetype + ";base64," + base;
        req.body.file = await cUploader(base64, `${folder}/${user}`);
      }
      next();
    } catch (error) {
      res.status(400).send({ message: "Upload failed !" });
    }
  };
}

// upload multiple image
function multi(folder: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { files } = req as { files: Express.Multer.File[] }; // file[]
      const { user } = decodeToken(req.cookies[server_config.authCookieName]); // return user:id
      // multiple minify to base64
      const base64images = await Promise.all(
        files.map(async (file: Express.Multer.File) => {
          const base = await sharpImage(file.buffer);
          const base64 = Buffer.from(base).toString("base64");
          return "data:" + file.mimetype + ";base64," + base64;
        })
      );
      req.body.files = await Promise.all(
        base64images.map(async (x) => {
          return await cUploader(x, `${folder}/${user}`);
        })
      );
      next();
    } catch (error) {
      res.status(400).send({ message: "Upload failed !" });
    }
  };
}
export const upload = { single, multi };
