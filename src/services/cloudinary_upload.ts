import { cUploader } from "@src/services/cloud_uploader";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";

async function sharpImage(buffer: Buffer) {
  return await sharp(buffer).resize(800).webp().toBuffer();
}

// Post multi image & video middleware
export async function postUploader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const files = req.files as {
    images?: Express.Multer.File[];
    videos?: Express.Multer.File[];
  };
  req.body.images = [];
  req.body.videos = [];
  try {
    if (files.images) {
      const base64images = await Promise.all(
        files.images.map(async (file) => {
          const im = await sharpImage(file.buffer);
          const base64 = Buffer.from(im).toString("base64");
          let dataURI = "data:" + file.mimetype + ";base64," + base64;
          return dataURI;
        })
      );
      req.body.images = await Promise.all(
        base64images.map(async (x) => {
          return await cUploader(x, "post/images");
        })
      );
    }
    if (files.videos) {
      const base64videos = await Promise.all(
        files.videos.map((file) => {
          const base64 = Buffer.from(file.buffer).toString("base64");
          let dataURI = "data:" + file.mimetype + ";base64," + base64;
          return dataURI;
        })
      );
      req.body.videos = await Promise.all(
        base64videos.map(async (x) => {
          return await cUploader(x, "post/videos");
        })
      );
    }
    next();
  } catch (error) {
    res.status(400).send({ message: "Upload failed !" });
  }
}
