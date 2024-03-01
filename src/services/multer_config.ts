import multer from "multer";

export const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 20, //20 file limit
    fileSize: 1024 * 1024 * 25, // max 25mb
  },
  fileFilter(req, file, callback) {
    if (
      (file.mimetype.startsWith("image") && file.fieldname === "images") ||
      (file.mimetype.startsWith("video") && file.fieldname === "videos")
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});
