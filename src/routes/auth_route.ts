import { Router } from "express";
import forgetAuth from "../controllers/auth.controller/forget.controller";
import signInAuth from "../controllers/auth.controller/signIn.controller";
import signupAuth from "../controllers/auth.controller/signup.controller";
import verifyAuth from "../controllers/auth.controller/verify.controller";

const router = Router();
export const AuthRoute = router;

router.post("/auth/sign-up", signupAuth);
router.post("/auth/sign-in", signInAuth);
router.get("/auth/verify-email/:key", verifyAuth);
router.post("/auth/forget-password", forgetAuth);
