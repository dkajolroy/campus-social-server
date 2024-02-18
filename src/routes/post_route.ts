import { Router } from "express";
import { addPost, getPost } from "../controllers/post.controller";

const router = Router();
export const PostRoute = router;

router.route("/posts").get(getPost).post(addPost);
