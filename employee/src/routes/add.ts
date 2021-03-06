import express from "express";

const router = express.Router();

router.post("/api/employees", (req, res) => {
  res.send("Hello world");
});

export { router as addEmployeeRouter };
