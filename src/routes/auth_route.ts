import { Router } from "express";
import { forgetPassword, signIn, signUp } from "../controllers/auth.controller";

const router = Router();
export const AuthRoute = router;

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/forget-password", forgetPassword);
