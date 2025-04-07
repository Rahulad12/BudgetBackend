import express from "express";

import { filterTransaction } from "../controller/monthlyTransactionController.js";
import authenticate from "../middleware/authMiddleware.js";

const monthlyTransactionRouter = express.Router();

monthlyTransactionRouter.get("/filter", authenticate, filterTransaction);

export default monthlyTransactionRouter;