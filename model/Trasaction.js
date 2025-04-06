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

// Middleware to update the income when a transaction is created or updated
TransactionSchema.post("save", async function (doc) {
    if (doc.type === "income") {
        await Income.create({
            userId: doc.userId,
            amount: doc.amount,
            date: doc.date,
            type: doc.type
        });
    }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;