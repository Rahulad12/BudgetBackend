import express from "express";

import { filterTransaction } from "../controller/monthlyTransactionController.js";
import authenticate from "../middleware/authMiddleware.js";
import { checkUserExist } from "../middleware/checkUserExist.js";
const monthlyTransactionRouter = express.Router();

monthlyTransactionRouter.get("/filter", authenticate, checkUserExist,filterTransaction);

export default monthlyTransactionRouter;