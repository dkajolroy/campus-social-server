import { User } from "@src/models/user_model";
import { NextFunction, Request, Response } from "express";

export async function sendRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { req_to } = req.params;
    const { author } = req.body;
    if (!req_to || author == req_to)
      return res.status(400).send({ message: "Invalid friend request !" });
    // const exist = await User.findById(author)
    // if(exist.friends)
    // to
    await User.findByIdAndUpdate(req_to, {
      $push: {
        request: {
          user: author,
        },
      },
    });
    // Me
    await User.findByIdAndUpdate(author, {
      $push: { requestTo: { user: req_to } },
    });
    return res.status(200).send({ message: "Send request successfully !" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export async function acceptRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accept_to } = req.params;
    const { author } = req.body;
    if (!accept_to || author == accept_to)
      return res.status(400).send({ message: "Invalid accept request !" });

    // Me
    await User.findByIdAndUpdate(author, {
      $pull: { request: { user: accept_to } },
      $push: { friends: { user: accept_to } },
    });
    // To
    await User.findByIdAndUpdate(accept_to, {
      $pull: { requestTo: { user: author } },
      $push: { friends: { user: author } },
    });

    return res.status(200).send({ message: "Accept request successfully !" });
  } catch (error) {
    next(error);
  }
}
