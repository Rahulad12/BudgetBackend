import Income from "../model/Income.js";

const getIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId: userId }).populate({
            path: "transactionId",
            select: "title amount date type category -_id",
        }).select("-createdAt -updatedAt -__v -userId");
        if (incomes.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No income found for this user"
            })
        }
        const filteredIncomes = incomes.filter((income) => {
            const incomeDate = new Date(income.date);
            return (
                incomeDate.getFullYear() === new Date().getFullYear() &&
                incomeDate.getMonth() === new Date().getMonth()
            );
        })

        const totalIncome = filteredIncomes.reduce((acc, curr) => acc + curr.amount, 0);
        
        return res.status(200).send({
            success: true,
            totalIncome
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const getIncomeByDate = async (req, res) => {
    const { date } = req.body;
    try {
        const incomes = await Income.find({ userId: userId }).populate({
            path: "transactionId",
            select: "title amount date type category -_id",
        }).select("-createdAt -updatedAt -__v -userId");
        if (incomes.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No income found for this user"
            })
        }
        const filteredIncomes = incomes.filter((income) => {
            const incomeDate = new Date(income.date);
            return (
                incomeDate.getFullYear() === date.getFullYear() &&
                incomeDate.getMonth() === date.getMonth() &&
                incomeDate.getDate() === date.getDate()
            );
        });
        return res.status(200).send(filteredIncomes);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export { getIncome, getIncomeByDate };