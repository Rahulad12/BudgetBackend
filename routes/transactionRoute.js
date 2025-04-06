import express from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from "../controller/transactionControllers.js";
import authenticate from "../middleware/authMiddleware.js";


const transactionRouter = express.Router();
// Route for creating a transaction
transactionRouter.post('/', authenticate, createTransaction);
// Route for getting transactions
transactionRouter.get('/', authenticate, getTransactions);
// Route for updating a transaction
transactionRouter.put('/:id', authenticate, updateTransaction);
// Route for deleting a transaction
transactionRouter.delete('/:id', authenticate, deleteTransaction);

export default transactionRouter;