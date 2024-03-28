import addPost from "@src/controllers/post.controller/add_post.controller";
import feedPost from "@src/controllers/post.controller/feed_post.controller";
import userPost from "@src/controllers/post.controller/user_post.controller";
import { upload } from "@src/middleware/upload";
import { uploadInfo } from "@src/services/upload_config";
import { Router } from "express";

const router = Router();
export const PostRoute = router;

router
  .route("/add")
  .post(uploadInfo.array("media"), upload.multi("post/images"), addPost);
router.route("/feed").get(feedPost);
router.get("/user/:userId", userPost); // view profile posts me | user
