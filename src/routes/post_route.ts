import { Router } from "express";
import addPost from "../controllers/post.controller/add_post.controller";
import feedPost from "../controllers/post.controller/feed_post.controller";
import userPost from "../controllers/post.controller/user_post.controller";

const router = Router();
export const PostRoute = router;

router.route("/posts").get(feedPost).post(addPost);
router.get("/user/posts/:userId", userPost); // view profile posts me | user
