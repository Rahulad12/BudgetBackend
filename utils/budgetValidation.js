
export const budgetValidation = (expensethreshold, monthlyexpense, income, savinggoal) => {
    // console.log(income, expensethreshold, monthlyexpense, savinggoal)
    if (!monthlyexpense || !expensethreshold || !savinggoal) {
        return "Please fill all the fields";
    }

    if (isNaN(monthlyexpense) || isNaN(expensethreshold) || isNaN(savinggoal)) {
        return "Please enter valid numbers";
    }

    if (monthlyexpense < 0 || expensethreshold < 0 || savinggoal < 0) {
        return "Please enter positive numbers";
    }


    const calucateExpense = income * (expensethreshold / 100);

    console.log(monthlyexpense,calucateExpense)
    if (monthlyexpense > calucateExpense) {
        return "Monthly Expense cannot be greater than Expense Threshold for this months";
    }

    if (savinggoal > income) {
        return "Saving Goal cannot be greater than Income for this months";
    }

    if (savinggoal > income - monthlyexpense) {
        return "Saving Goal cannot be greater than Income - Monthly Expense for this months";
    }
    return null;
}