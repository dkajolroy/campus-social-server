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
import { PostRoute } from "./routes/post_route";
import { errorHandler } from "./utils/handler";

// config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
dotenv.config();
envConfig();
dbConfig();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // for use cdn .json from any host
        defaultSrc: ["'self'", "https: data:"],
        // for use image/emoji from any host
        "img-src": ["'self'", "https: data:"],
      },
    },
  })
);
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

// Set static site
const _appRoot = path.resolve();
app.use(express.static(path.join(_appRoot, "client/dist")));

// Api routes public
app.use("/api", AuthRoute);
// Api routes private
app.use("/api", authUser, PostRoute);

// website public
app.use("*", (req, res) => {
  res.status(200).sendFile(path.join(_appRoot, "client/dist/index.html"));
});

// socket server
const io = new Server(server);
// listen to
server.listen(PORT, () => {
  console.log(`Server⚡: http://localhost:${PORT}`);
});

// Error handler middleware
app.use(errorHandler);
