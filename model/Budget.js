import mongoose from "mongoose";
import Saving from "./Saving.js";
const BudgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Transaction",
    },
    income: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Income",
    },
    monthlyExpense: {
        type: Number,
        required: true,
    },
    expensesThreshold: {
        type: Number,
        enum: [0, 25, 50, 75, 80, 100],
        required: true,
    },
    savingGoal: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;