import mongoose from "mongoose";
import Saving from "./Saving";
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

BudgetSchema.post("save", async function (doc) {
    await Saving.create({
        userId: doc.userId,
        amount: this.savingGoal
    })
})

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;