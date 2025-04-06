import Budget from "../model/Budget";
import Income from "../model/Income";
import Saving from "../model/Saving";
import Transaction from "../model/Trasaction";

const createBudget = async (req, res) => {
    const { monthlyExpense, expensesThreshold, savingGoal } = req.body;
    const userId = req.user._id;
    try {

        const income = await Income.find({ userId: userId });
        const transaction = await Transaction.find({ userId: userId });
        const saving = await Saving.find({ userId: userId });

        const budget = await Budget.create({
            userId,
            transactionId: transaction._id,
            saving: saving._id,
            income: income._id,
            monthlyExpense,
            expensesThreshold,
            savingGoal,
        })
        const createdBudget = await budget.save();
        if (!createBudget) {
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
        const budget = await Budget.find({ userId: userId })
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