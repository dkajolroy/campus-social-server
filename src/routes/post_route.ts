import { Router } from "express";
import addPost from "../controllers/post.controller/add_post.controller";
import feedPost from "../controllers/post.controller/feed_post.controller";
import userPost from "../controllers/post.controller/user_post.controller";

const router = Router();
export const PostRoute = router;

router.route("/create").post(addPost);
router.route("/all").get(feedPost);
router.get("/user/:userId", userPost); // view profile posts me | user
