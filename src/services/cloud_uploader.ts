import { v2 as ImageCloud } from "cloudinary";

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
