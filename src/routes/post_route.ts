import { Router } from "express";
import { addPost, getPost } from "../controllers/post.controller";

const router = Router();
export const PostRoute = router;

router.route("/post").get(getPost).post(addPost);
