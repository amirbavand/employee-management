import express, { Request, Response } from "express";
import { Employee } from "../models/employee";
import { requireAuth } from "../middle-ware/require-auth";
import { NotFoundError } from "../errors/not-found-error";

const router = express.Router();

router.delete(
  "/api/employees/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const employee = await Employee.findOne({ EmployeeId: req.params.id });

    if (!employee) {
      throw new NotFoundError();
    }
    await Employee.deleteOne({ EmployeeId: req.params.id }, function (err) {
      if (err) console.log(err);
      res.status(200).send("succecfully deleted");
    });
  }
);

export { router as DeleteEmployeeRouter };
