import express from 'express';
import { createBudget, getBudget } from '../controller/budgetController.js';
import authenticate from "../middleware/authMiddleware.js";

const budgetRouter = express.Router();
// Route for creating a budget
budgetRouter.post('/', authenticate, createBudget);
// Route for getting a budget
budgetRouter.get('/', authenticate, getBudget);

export default budgetRouter;