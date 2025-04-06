import mongoose from "mongoose";

const SavingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})
const Saving = mongoose.model("Saving",SavingSchema);
export default Saving;