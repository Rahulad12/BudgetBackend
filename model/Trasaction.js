import mongoose from "mongoose";
import Income from "./Income.js";
const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;