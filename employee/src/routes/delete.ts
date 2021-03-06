import express from "express";

const router = express.Router();

router.delete("/api/employees/:id", (req, res) => {
  res.send("Hello world");
});

export { router as DeleteEmployeeRouter };
