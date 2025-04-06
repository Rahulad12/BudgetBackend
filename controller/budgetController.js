import Budget from "../model/Budget";
import Income from "../model/Income";
const createBudget = async () => {
    const { monthlyExpense, expensesThreshold, savingGoal } = req.body;
    const userId = req.user._id;
    try {

        const income = await Income.find({ userId: userId })
        const budget = await Budget.create({
            userId,
            transactionId,
            saving,
            income,
            monthlyExpense,
            expensesThreshold,
            savingGoal,
        })
    } catch (error) {

    }
}

