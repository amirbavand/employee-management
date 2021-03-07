import express, { Request, Response } from "express";
import { Employee } from "../models/employee";
import { requireAuth } from "../middle-ware/require-auth";

const router = express.Router();

router.get(
  "/api/employees",
  requireAuth,
  async (req: Request, res: Response) => {
    const employees = await Employee.find({});

    res.send(employees);
  }
);

export { router as ListEmployeeRouter };
