import Budget from "../model/Budget.js";
import Income from "../model/Income.js";
import Transaction from "../model/Trasaction.js";

const createBudget = async (req, res) => {
    const { monthlyexpense, expensethreshold, savinggoal } = req.body;
    const userId = req.user._id;
    try {

        const income = await Income.findOne({ userId: userId });
        const transaction = await Transaction.findOne({ userId: userId });

        const budget = await Budget.create({
            userId,
            transactionId: transaction._id,
            income: income._id,
            monthlyExpense: monthlyexpense,
            expensesThreshold: expensethreshold,
            savingGoal: savinggoal,
        })

        const createdBudget = await budget.save();
        if (!createdBudget) {
            return res.status(400).json({
                success: false,
                message: "Budget Created Failed"
            })
        }
        return res.status(201).json({
            success: true,
            message: "Budget Created Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getBudget = async (req, res) => {
    const userId = req.user._id;
    try {
        const budget = await Budget.find({ userId: userId }).populate("transactionId").populate("income");
        if (!budget) {
            return res.status(400).json({
                success: false,
                message: "Budget Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            budget
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
export { createBudget, getBudget };