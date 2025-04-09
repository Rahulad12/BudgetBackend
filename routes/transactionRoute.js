import express from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from "../controller/transactionControllers.js";
import authenticate from "../middleware/authMiddleware.js";
import { checkUserExist } from "../middleware/checkUserExist.js";

const transactionRouter = express.Router();
// Route for creating a transaction
transactionRouter.post('/', authenticate, checkUserExist, createTransaction);
// Route for getting transactions
transactionRouter.get('/', authenticate, checkUserExist, getTransactions);
// Route for updating a transaction
transactionRouter.put('/:id', authenticate, checkUserExist, updateTransaction);
// Route for deleting a transaction
transactionRouter.delete('/:id', authenticate, checkUserExist, deleteTransaction);

export default transactionRouter;