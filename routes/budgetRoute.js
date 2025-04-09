import express from 'express';
import { createBudget, getBudget } from '../controller/budgetController.js';
import authenticate from "../middleware/authMiddleware.js";
import { checkUserExist } from "../middleware/checkUserExist.js";
const budgetRouter = express.Router();
// Route for creating a budget
budgetRouter.post('/', authenticate, checkUserExist, createBudget);
// Route for getting a budget
budgetRouter.get('/', authenticate, checkUserExist, getBudget);

export default budgetRouter;