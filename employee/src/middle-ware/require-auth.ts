import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    throw new Error("not authorized");
  }
  try {
    const isValid = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
  } catch (err) {
    throw new Error("not authorized");
  }

  next();
};
