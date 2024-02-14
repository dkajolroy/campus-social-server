import { NextFunction, Request, Response } from "express";

// add post securely
export const addPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
