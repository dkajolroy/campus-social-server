import { NextFunction, Request, Response } from "express";

// add post securely
export const addPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send({ message: "OK" });
  } catch (error) {
    next(error);
  }
};

// get post securely
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // recommended
    // reload to random
    // pagination
    res.status(200).send({ message: "OK" });
  } catch (error) {
    next(error);
  }
};
