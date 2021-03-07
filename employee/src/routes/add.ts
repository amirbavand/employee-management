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
      .withMessage("title string is required"),
    body("Name")
      .not()
      .isEmpty()
      .isString()
      .withMessage("title string is required"),
    body("Surname")
      .not()
      .isEmpty()
      .isString()
      .withMessage("title string is required"),
    body("Address")
      .not()
      .isEmpty()
      .isString()
      .withMessage("title string is required"),
    body("Title")
      .not()
      .isEmpty()
      .isString()
      .withMessage("title string is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { EmployeeId, Name, Surname, PhoneNumber, Address, Title } = req.body;

    const employee = Employee.build({
      EmployeeId,
      Name,
      Surname,
      PhoneNumber,
      Address,
      Title,
    });
    await employee.save();

    res.status(201).send(employee);
  }
);

export { router as addEmployeeRouter };
