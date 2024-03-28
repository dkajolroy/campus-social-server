import { v2 as ImageCloud } from "cloudinary";
import multer from "multer";
import sharp from "sharp";

// Upload Cloudinary
export async function cUploader(file: string, folder: string) {
  ImageCloud.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const res = await ImageCloud.uploader.upload(file, {
    resource_type: "auto",
    folder: `campus/${folder}`,
  });
  return res;
}

// Check upload file multer
export const uploadInfo = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 20, //20 file limit
    fileSize: 1024 * 1024 * 25, // max 25mb
  },
  fileFilter(req, file, callback) {
    if (
      file.mimetype.startsWith("image") &&
      (file.fieldname === "media" || file.fieldname === "image")
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

// Image Minify to upload
export async function sharpImage(buffer: Buffer) {
  return await sharp(buffer).resize(800).webp().toBuffer();
}
