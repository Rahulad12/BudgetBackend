import mongoose from "mongoose";
import Expenses from "../model/Expenses.js";
import Income from "../model/Income.js";
import MonthlyTransaction from "../model/monthyTransaction.js";

export const updateMonthlyBalance = async (userId, date) => {
    const objectUserId = new mongoose.Types.ObjectId(userId);
    const month = date.getMonth() + 1; // Jan = 0
    const year = date.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[date.getMonth()];

    const start = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
    const end = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    // Fetch total income
    const incomes = await Income.aggregate([
        { $match: { userId: objectUserId, date: { $gte: start, $lte: end } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Fetch total expense
    const expenses = await Expenses.aggregate([
        { $match: { userId: objectUserId, date: { $gte: start, $lte: end } } },
        { $group: { _id: null, total: { $sum: "$expenseAmount" } } }
    ]);

    const incomeTotal = incomes[0]?.total || 0;
    const expenseTotal = expenses[0]?.total || 0;
    const balance = incomeTotal - expenseTotal;
    const monthYear = `${month.toString().padStart(2, '0')}-${year}`;

    // Update only the balance, don't push transaction
    await MonthlyTransaction.updateOne(
        { userId, monthYear },
        {
            $set: {
                monthlyBalance: balance,
                monthlyIncome: incomeTotal,
                monthlyExpense: expenseTotal
            }
        }
    );
};