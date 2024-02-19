import { NextFunction, Request, Response } from "express";

function singleImage(req: Request, res: Response, next: NextFunction) {
  // image not found return
  // single or multi validator return
  // upload single Image to next with other data
  // realtime upload percent
}
function multiImage(req: Request, res: Response, next: NextFunction) {
  // image array not found return
  // upload single Image to next with other data
  // realtime upload percent
}
export const upload = { singleImage, multiImage };
