import { getFriends } from "@src/controllers/friend_req.controller/get_friends.controller";
import {
  acceptRequest,
  sendRequest,
} from "@src/controllers/friend_req.controller/send_req.controller";
import { Router } from "express";

export const FriendRouter = Router();

FriendRouter.post("/request/:req_to", sendRequest);
FriendRouter.post("/accept/:accept_to", acceptRequest);
FriendRouter.get("/get", getFriends);
