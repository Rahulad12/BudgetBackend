import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: true,
    },
    totalIncome: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ["income"],
        required: true,
    },
}, {
    timestamps: true,
});

IncomeSchema.pre("save", async function (next) {
    if (this.isNew) {
        const totalIncome = await Income.aggregate([
            { $match: { userId: this.userId } },
            { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
        ]);
        this.totalIncome = totalIncome[0] ? totalIncome[0].totalIncome + this.amount : this.amount;
    }
    next();
});

const Income = mongoose.model("Income", IncomeSchema);
export default Income;