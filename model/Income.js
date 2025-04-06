import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
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
        required: true,
    }
}, {
    timestamps: true,
});

const Income = mongoose.model("Income", IncomeSchema);
export default Income;