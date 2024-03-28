import { getConversations } from "@src/controllers/conversation.controller/get_conversation.controller";
import { Router } from "express";

export const ConversationRoute = Router();

ConversationRoute.route("/get").get(getConversations);
