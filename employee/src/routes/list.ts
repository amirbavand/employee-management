import express from "express";

const router = express.Router();

router.get("/api/employees", (req, res) => {
  res.send("Hello world");
});

export { router as ListEmployeeRouter };
