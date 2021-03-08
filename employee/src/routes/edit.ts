import express, { Request, Response } from "express";
import { requireAuth } from "../middle-ware/require-auth";
import { Employee } from "../models/employee";
import { validateRequest } from "../middle-ware/validate-request";
import { body } from "express-validator";
import { NotFoundError } from "../errors/not-found-error";

const router = express.Router();

router.put(
  "/api/employees/:id",
  requireAuth,
  [
    body("EmployeeId")
      .not()
      .isEmpty()
      .isString()
      .withMessage("EmployeeId string is required"),
    body("Name")
      .not()
      .isEmpty()
      .isString()
      .withMessage("Name string is required"),
    body("Surname")
      .not()
      .isEmpty()
      .isString()
      .withMessage("Surname string is required"),
    body("Address")
      .not()
      .isEmpty()
      .isString()
      .withMessage("Address string is required"),
    body("Title")
      .not()
      .isEmpty()
      .isString()
      .withMessage("Title string is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { EmployeeId, Name, Surname, PhoneNumber, Address, Title } = req.body;
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      throw new NotFoundError();
    }

    employee.set({
      EmployeeId: EmployeeId,
      Name: Name,
      Surname: Surname,
      PhoneNumber: PhoneNumber,
      Address: Address,
      Title: Title,
    });
    await employee.save();

    res.send(employee);
  }
);

export { router as EditEmployeeRouter };
