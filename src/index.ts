import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import dbConfig from "./config/dbConfig";
import { envConfig } from "./config/environment";
import { authUser } from "./middleware/auth";
import { AuthRoute } from "./routes/auth_route";
import { ConversationRoute } from "./routes/conversation_route";
import { FriendRouter } from "./routes/friend_router";
import { MessageRoute } from "./routes/message_route";
import { notificationRoute } from "./routes/notification_route";
import { PostRoute } from "./routes/post_route";
import { ReactRoute } from "./routes/react_route";
import { socketInit } from "./socket/socket";
import { errorHandler } from "./utils/handler";

// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
envConfig();
dbConfig();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // for use cdn .json from any host
        defaultSrc: ["'self'", "https: data:"],
        // for use image/emoji from any host
        "img-src": ["'self'", "https: data: blob:"],
      },
    },
  })
);
const PORT = process.env.PORT || 8080;
export const httpServer = http.createServer(app);

// Set static site
const _appRoot = path.resolve();
app.use(express.static(path.join(_appRoot, "client/dist")));

// Api routes public
app.use("/api/auth", AuthRoute);
// Api routes private
app.use("/api/post", authUser, PostRoute);
app.use("/api/react", authUser, ReactRoute);
app.use("/api/friend", authUser, FriendRouter);
app.use("/api/conversation", authUser, ConversationRoute);
app.use("/api/message", authUser, MessageRoute);
app.use("/api/notification", authUser, notificationRoute);

// website public
app.use("*", (req, res) => {
  res.status(200).sendFile(path.join(_appRoot, "client/dist/index.html"));
});

export const io: Server = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});
socketInit(io);

// listen to
httpServer.listen(PORT, () => {
  console.log(`Server⚡: http://localhost:${PORT}`);
});
// Error handler middleware
app.use(errorHandler);
