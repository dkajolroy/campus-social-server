import { Router } from "express";
import forgetReqAuth from "../controllers/auth.controller/forget.req.controller";
import forgetResAuth from "../controllers/auth.controller/forget.res.controller";
import signInAuth from "../controllers/auth.controller/signIn.controller";
import signupAuth from "../controllers/auth.controller/signup.controller";
import verifyDoneAuth from "../controllers/auth.controller/verify.done.controller";
import verifySendAuth from "../controllers/auth.controller/verify.send.controller";

const router = Router();
export const AuthRoute = router;

router.post("/auth/sign-up", signupAuth);
router.post("/auth/sign-in", signInAuth);
router.post("/auth/forget-req", forgetReqAuth); //send link
router.post("/auth/forget-res", forgetResAuth);
router.post("/auth/verify-send", verifySendAuth); //send link
router.get("/auth/verify-email/:key", verifyDoneAuth);
