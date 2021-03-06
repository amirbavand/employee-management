import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    throw new NotAuthorizedError();
  }
  try {
    const isValid = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
  } catch (err) {
    throw new NotAuthorizedError();
  }

  next();
};
