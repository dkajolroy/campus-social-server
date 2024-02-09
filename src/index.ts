import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import path from "path";

// config
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
dotenv.config();

// Set static site
const appRoot = path.resolve();
app.use(express.static(path.join(appRoot, "client/dist")));

// client public
app.use("*", (req, res) => {
  res.status(200).sendFile(appRoot + "/client/dist/index.html");
});

// socket server

// Error middleware
app.use("", (req, res, next, err) => {});
// listen to
app.listen(5000, () => {
  console.log("Server: http://localhost:8080");
});
