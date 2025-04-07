import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import userRouter from './routes/authRoute.js';
import budgetRouter from './routes/budgetRoute.js';
import transactionRouter from './routes/transactionRoute.js';
import incomeRouter from "./routes/incomeRoute.js";
import monthlyTransactionRouter from "./routes/monthlyTransaction.js";

// Routes
app.use('/api/auth', userRouter);
app.use('/api/budgets', budgetRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/incomes', incomeRouter);
app.use('/api/monthlyTransactions', monthlyTransactionRouter);

// Root route
app.get('/', (req, res) => {
    return res.send({
        success: true,
        message: 'Server is running...',
    });
});

// Optional: Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message,
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
