import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    savings: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Saving",
    },
    income: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Income",
    },
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Budget",
    },


}, {
    timestamps: true,
});

const History = mongoose.model("History", HistorySchema);
export default History;