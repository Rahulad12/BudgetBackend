import mongoose from "mongoose";

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
    saving: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Saving",
    },
    monthlyExpense: {
        type: Number,
        required: true,
    },
    expensesThreshold: {
        type: Number,
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