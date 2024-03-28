import react from "@src/controllers/react.controller/react.controller";
import { Router } from "express";

export const ReactRoute = Router();

ReactRoute.route("/:postId").post(react);
