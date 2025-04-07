import Transaction from "../model/Trasaction.js"; // Fixed typo in path
import Income from "../model/Income.js";
import MonthlyTransaction from "../model/monthyTransaction.js";
import Expenses from "../model/expenses.js";
import { updateMonthlyBalance } from "../utils/updateMonthlyBalance.js";

// const createTransaction = async (req, res) => {
//     const { title, amount, date, type, category } = req.body;
//     const userId = req.user._id;

//     try {
//         const filteredDate = new Date(date);
//         const month = filteredDate.getMonth() + 1;
//         const year = filteredDate.getFullYear();
//         const monthYear = `${month.toString().padStart(2, '0')}-${year}`;

//         // 1. Create Transaction
//         const transaction = await Transaction.create({
//             userId,
//             title,
//             amount,
//             date: filteredDate,
//             type,
//             category
//         });

//         // 2. Create Income or Expense
//         let incomeDoc = null;
//         let expenseDoc = null;

//         if (type === "income") {
//             incomeDoc = await Income.create({
//                 userId,
//                 amount,
//                 date: filteredDate,
//                 type,
//                 transactionId: transaction._id,
//                 totalIncome: 0,
//             });
//         } else {
//             expenseDoc = await Expenses.create({
//                 userId,
//                 transactionId: transaction._id,
//                 expenseAmount: amount,
//                 date: filteredDate,
//                 type,
//             });
//         }

//         // Prepare the update data
//         const updateData = {
//             $set: {
//                 date: filteredDate,
//                 month: filteredDate.toLocaleString('default', { month: 'long' }),
//                 monthYear,
//                 monthlyBalance: 0,
//                 monthlyIncome: 0,
//                 monthlyExpense: 0
//             },
//             $push: { transaction: transaction._id }
//         };

//         // Initialize transaction as array if null
//         const existingDoc = await MonthlyTransaction.findOne({ userId, monthYear });
//         if (existingDoc && existingDoc.transaction === null) {
//             await MonthlyTransaction.updateOne(
//                 { _id: existingDoc._id },
//                 { $set: { transaction: [] } }
//             );
//         }

//         // 3. Update or Create MonthlyTransaction
//         await MonthlyTransaction.findOneAndUpdate(
//             { userId, monthYear },
//             updateData,
//             { upsert: true, new: true }
//         );

//         // 4. Update monthly balance
//         await updateMonthlyBalance(userId, filteredDate, transaction._id);

//         return res.status(201).json({
//             success: true,
//             message: "Transaction created successfully",
//             data: transaction
//         });

//     } catch (error) {
//         console.error("Error creating transaction:", error);
//         return res.status(500).json({ 
//             success: false, 
//             message: error.message || "Internal server error" 
//         });
//     }
// };

const createTransaction = async (req, res) => {
    const { title, amount, date, type, category } = req.body;
    const userId = req.user._id;

    try {
        const filteredDate = new Date(date);
        const month = filteredDate.getMonth() + 1;
        const year = filteredDate.getFullYear();
        const monthYear = `${month.toString().padStart(2, '0')}-${year}`;

        // 1. Create Transaction
        const transaction = await Transaction.create({
            userId,
            title,
            amount,
            date: filteredDate,
            type,
            category
        });

        // 2. Create Income or Expense
        let incomeDoc = null;
        let expenseDoc = null;

        if (type === "income") {
            incomeDoc = await Income.create({
                userId,
                amount,
                date: filteredDate,
                type,
                transactionId: transaction._id,
                totalIncome: 0,
            });
        } else {
            expenseDoc = await Expenses.create({
                userId,
                transactionId: transaction._id,
                expenseAmount: amount,
                date: filteredDate,
                type,
            });
        }

        // 3. Handle MonthlyTransaction - only one operation now
        const updateData = {
            $setOnInsert: {
                userId,
                date: filteredDate,
                month: filteredDate.toLocaleString('default', { month: 'long' }),
                monthYear,
                monthlyBalance: 0,
                monthlyIncome: 0,
                monthlyExpense: 0
            },
            $push: { transaction: transaction._id }
        };

        if (incomeDoc) {
            updateData.$set = { income: incomeDoc._id };
        } else if (expenseDoc) {
            updateData.$set = { expense: expenseDoc._id };
        }

        await MonthlyTransaction.findOneAndUpdate(
            { userId, monthYear },
            updateData,
            { upsert: true, new: true }
        );

        // 4. Update monthly balance (without pushing transaction again)
        await updateMonthlyBalance(userId, filteredDate);

        return res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            data: transaction
        });

    } catch (error) {
        console.error("Error creating transaction:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id })
            .sort({ date: -1 })
            .select('-createdAt -updatedAt -__v -userId');

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { title, amount, date, type, category } = req.body;

    try {
        // First get the existing transaction
        const oldTransaction = await Transaction.findOne({ _id: id, userId: req.user._id });
        if (!oldTransaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        // Update transaction
        const transaction = await Transaction.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { title, amount, date, type, category },
            { new: true }
        );

        // Update related income/expense
        if (oldTransaction.type === 'income') {
            await Income.findOneAndUpdate(
                { transactionId: id },
                { amount, date, type }
            );
        } else {
            await Expenses.findOneAndUpdate(
                { transactionId: id },
                { expenseAmount: amount, date, type }
            );
        }

        // Update monthly balance
        await updateMonthlyBalance(req.user._id, new Date(date), id);

        return res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            data: transaction
        });
    } catch (error) {
        console.error("Error updating transaction:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        // First get the transaction to determine its type
        const transaction = await Transaction.findOne({ _id: id, userId: req.user._id });
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        // Delete related income/expense
        if (transaction.type === 'income') {
            await Income.deleteOne({ transactionId: id });
        } else {
            await Expenses.deleteOne({ transactionId: id });
        }

        // Remove transaction reference from monthly transaction
        await MonthlyTransaction.updateMany(
            { userId: req.user._id, transaction: id },
            { $pull: { transaction: id } }
        );

        // Delete the transaction
        await Transaction.deleteOne({ _id: id });

        // Update monthly balance
        await updateMonthlyBalance(req.user._id, transaction.date, id);

        return res.status(200).json({
            success: true,
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

export { createTransaction, getTransactions, updateTransaction, deleteTransaction };