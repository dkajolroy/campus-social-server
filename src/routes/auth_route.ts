import { Router } from "express";
import forgetReqAuth from "../controllers/auth.controller/forget.req.controller";
import forgetSuccessAuth from "../controllers/auth.controller/forget.success.controller";
import signInAuth from "../controllers/auth.controller/signIn.controller";
import signupAuth from "../controllers/auth.controller/signup.controller";
import verifyDoneAuth from "../controllers/auth.controller/verify.done.controller";
import verifySendAuth from "../controllers/auth.controller/verify.send.controller";

const router = Router();
export const AuthRoute = router;

router.post("/sign-up", signupAuth);
router.post("/sign-in", signInAuth);
router.post("/forget-req", forgetReqAuth); //send link |otp
router.post("/forget-success", forgetSuccessAuth); // check & update password
router.post("/verify-send", verifySendAuth); //send link
router.get("/verify-email/:key", verifyDoneAuth);
