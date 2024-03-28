import { get_notification } from "@src/controllers/notification.controller/notification.controller";
import { Router } from "express";

export const notificationRoute = Router();

notificationRoute.route("/latest").get(get_notification);
