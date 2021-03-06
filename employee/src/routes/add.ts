import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Employee } from "../models/employee";
import { requireAuth } from "../middle-ware/require-auth";
import { validateRequest } from "../middle-ware/validate-request";

const router = express.Router();

router.post(
  "/api/employees",
  requireAuth,
  [
    body("EmployeeId")
      .not()
      .isEmpty()
      .isString()
      .withMessage("id string is required"),
    body("Name")
      .not()
      .isEmpty()
      .isString()
      .withMessage("name string is required"),
    body("Surename")
      .not()
      .isEmpty()
      .isString()
      .withMessage("surename string is required"),
    body("Address")
      .not()
      .isEmpty()
      .isString()
      .withMessage("body string is required"),
    body("Title")
      .not()
      .isEmpty()
      .isString()
      .withMessage("title string is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      EmployeeId,
      Name,
      Surename,
      PhoneNumber,
      Address,
      Title,
    } = req.body;

    const employee = Employee.build({
      EmployeeId,
      Name,
      Surename,
      PhoneNumber,
      Address,
      Title,
    });
    await employee.save();

    res.status(201).send(employee);
  }
);

export { router as addEmployeeRouter };
