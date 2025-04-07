import mongoose from "mongoose";

const monthlyTransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    transaction: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
    }],
    income: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Income",
        default: null
    },
    expense: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expenses",
        default: null
    },
    monthlyBalance: {
        type: Number,
        required: true,
    },
    monthlyIncome: {
        type: Number,
        required: true,
    },
    monthlyExpense: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    month: {
        type: String,
        enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        required: true,
    },
    monthYear: {
        type: String,
        required: true,
        index: true,
    }

},
    {
        timestamps: true
    }
);

const MonthlyTransaction = mongoose.model("MonthlyTransaction", monthlyTransactionSchema);
export default MonthlyTransaction;