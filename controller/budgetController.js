import Budget from "../model/Budget.js";
import Income from "../model/Income.js";
import Saving from "../model/Saving.js";
import Transaction from "../model/Trasaction.js";
import { budgetValidation } from "../utils/budgetValidation.js";

const createBudget = async (req, res) => {
    const { monthlyexpense, expensethreshold, savinggoal } = req.body;

    const userId = req.user._id;

    try {
        const existingBudget = await Budget.findOne({
            $or: [
                { userId: userId },
                { month: new Date().getMonth() + 1 }
            ]
        });

        if (existingBudget) {
            return res.status(400).json({
                success: false,
                message: `Budget already exists for this user for this month ${new Date().getMonth() + 1}`,
            });
        }
        const incomes = await Income.find({ userId: userId });

        if (!incomes || incomes.length === 0) {
            return res.status(400).json({
                success: false,
                message: "There is no income found for this user"
            })
        }

        const currentMonth = new Date().getMonth() + 1;

        const incomeThisMonth = incomes.filter(
            (item) => new Date(item.date).getMonth() + 1 === currentMonth
        );

        const incomeThisMonthTotal = incomeThisMonth.reduce(
            (acc, curr) => acc + curr.amount,
            0
        );

        if (incomeThisMonth.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No income found for the current month",
            });
        }

        const latestIncome = incomeThisMonth.sort(
            (a, b) => b.createdAt - a.createdAt
        )[0];

        const transaction = await Transaction.findOne({ userId: userId });

        const validate = budgetValidation(expensethreshold, monthlyexpense, incomeThisMonthTotal, savinggoal);
        if (validate) {
            return res.status(400).json({
                success: false,
                message: validate
            })
        }

        const budget = await Budget.create({
            userId,
            transactionId: transaction._id,
            income: latestIncome._id,
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
        } else {
            await Saving.create({
                userId: userId,
                amount: savinggoal
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
        const budget = await Budget.find({ userId: userId }).select("-createdAt -updatedAt -__v -userId -transactionId -income -_id");
        if (!budget) {
            return res.status(400).json({
                success: false,
                message: "Budget Not Found"
            })
        }
        return res.status(200).send(budget)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
export { createBudget, getBudget };