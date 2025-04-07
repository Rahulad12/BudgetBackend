import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
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
    expenseAmount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ["expense"],
        required: true,
    },

}, {
    timestamps: true,
});

const Expenses = mongoose.model("Expenses", expensesSchema);
export default Expenses;