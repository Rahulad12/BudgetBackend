import MonthlyTransaction from "../model/monthyTransaction.js";

const getMontlyTransaction = async (req, res) => {
    const userId = req.user._id;

    try {
        const monthlyTransactions = await MonthlyTransaction.find({ userId })
            .select("-createdAt -updatedAt -__v -userId -_id -income -expense")
            .populate({
                path: "transaction",
                select: "title amount date category type",
            });

        if (!monthlyTransactions || monthlyTransactions.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Monthly Transactions Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Monthly Transactions Fetched Successfully",
            data: monthlyTransactions
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const filterTransaction = async (req, res) => {
    const { month } = req.query;
    console.log(month);
    const userId = req.user._id;
    
    try {
        // First get the monthYear format (e.g., "04-2025" for April 2025)
        const monthNames = ["January", "February", "March", "April", "May", "June", 
                          "July", "August", "September", "October", "November", "December"];
        const monthIndex = monthNames.indexOf(month);
        if (monthIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Invalid month name"
            });
        }
        
        const currentYear = new Date().getFullYear();
        const monthYear = `${(monthIndex + 1).toString().padStart(2, '0')}-${currentYear}`;

        // Find the monthly transaction for this month/year
        const monthlyTransaction = await MonthlyTransaction.findOne({ 
            userId: userId,
            monthYear: monthYear 
        }).select("-createdAt -updatedAt -__v -userId -_id -income -expense")
          .populate({
              path: "transaction",
              select: "title amount date category type",
          });

        if (!monthlyTransaction) {
            return res.status(404).json({
                success: false,
                message: "No transactions found for this month"
            });
        }

        // Format the response to match your desired structure
        const responseData = {
            monthYear: monthlyTransaction.monthYear,
            date: monthlyTransaction.date,
            month: monthlyTransaction.month,
            monthlyBalance: monthlyTransaction.monthlyBalance,
            monthlyExpense: monthlyTransaction.monthlyExpense,
            monthlyIncome: monthlyTransaction.monthlyIncome,
            transaction: monthlyTransaction.transaction.map(t => ({
                title: t.title,
                amount: t.amount,
                date: t.date,
                category: t.category,
                type: t.type
            }))
        };

        return res.status(200).json({
            success: true,
            message: "Transactions filtered successfully",
            data: [responseData] // Wrapped in array to match your format
        });

    } catch (error) {
        console.error("Error filtering transactions:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export { getMontlyTransaction, filterTransaction };