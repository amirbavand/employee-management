import express, { Request, Response } from "express";
import { requireAuth } from "../middle-ware/require-auth";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  requireAuth,

  async (req: Request, res: Response) => {
    res.status(200).send();
  }
);

export { router as currentUser };
