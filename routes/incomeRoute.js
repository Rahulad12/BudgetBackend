import express from "express";
import { getIncome, getIncomeByDate } from "../controller/incomeController.js";
import authenticate from "../middleware/authMiddleware.js";

const incomeRouter = express.Router();

incomeRouter.get("/", authenticate, getIncome);
incomeRouter.post("/", authenticate, getIncomeByDate);

export default incomeRouter;