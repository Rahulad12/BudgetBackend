import Transaction from "../model/Trasaction.js";
import Income from "../model/Income.js";

const createTransaction = async (req, res) => {
    const { title, amount, date, type, category } = req.body;
    const userId = req.user._id; // Assuming you have user ID from authentication middleware
    try {
        const filterdDate = new Date(date);

        //ceate Transaction
        const transaction = await Transaction.create({
            userId: userId,
            title,
            amount,
            date: filterdDate,
            type,
            category
        });

        // Only create Income if the type is "income"
        if (type === "income") {
            await Income.create({
                userId: userId,
                amount: amount,
                date: filterdDate,
                type: type,
                transactionId: transaction._id,
                totalIncome: 0,
            })
        }
        return res.status(201).json({
            success: true,
            message: "Transaction created successfully",
        });

    } catch (error) {
        console.error("Error creating transaction:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getTransactions = async (req, res) => {
    const userId = req.user._id; // Assuming you have user ID from authentication middleware

    try {
        const transactions = await Transaction.find({ userId }).sort({ date: -1 }).select('-createdAt -updatedAt -__v -userId');
        return res.status(200).send(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { title, amount, date, type, category } = req.body;
    const userId = req.user._id; // Assuming you have user ID from authentication middleware

    try {
        const transaction = await Transaction.findOneAndUpdate(
            { _id: id, userId },
            { title, amount, date, type, category },
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }
        return res.status(200).json(transaction);
    } catch (error) {
        console.error("Error updating transaction:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // Assuming you have user ID from authentication middleware

    try {
        const transaction = await Transaction.findOneAndDelete({ _id: id, userId });
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }
        return res.status(200).json({ success: true, message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export { createTransaction, getTransactions, updateTransaction, deleteTransaction };

