import addPost from "@src/controllers/post.controller/add_post.controller";
import feedPost from "@src/controllers/post.controller/feed_post.controller";
import userPost from "@src/controllers/post.controller/user_post.controller";
import { postUploader } from "@src/services/cloudinary_upload";
import { multerUpload } from "@src/services/multer_config";
import { Router } from "express";

const router = Router();
export const PostRoute = router;

const uploadFiled = multerUpload.fields([
  { name: "images", maxCount: 10 },
  { name: "videos", maxCount: 5 },
]);

router.route("/add").post(uploadFiled, postUploader, addPost);
router.route("/all").get(feedPost);
router.get("/user/:userId", userPost); // view profile posts me | user
