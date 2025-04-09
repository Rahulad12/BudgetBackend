import express from "express";
import { getIncome, getIncomeByDate } from "../controller/incomeController.js";
import authenticate from "../middleware/authMiddleware.js";
import { checkUserExist } from "../middleware/checkUserExist.js";
const incomeRouter = express.Router();

incomeRouter.get("/", authenticate, checkUserExist, getIncome);
incomeRouter.post("/", authenticate, checkUserExist, getIncomeByDate);

export default incomeRouter;