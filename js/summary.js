const balanceAmount = document.querySelector(".balance-amount .value");
const incomeAmount = document.querySelector(".income .value");
const expenseAmount = document.querySelector(".expense .value");

const balanceStat = document.querySelector(".stat-card .balance");
const incomeStat = document.querySelector(".stat-card .income");
const expenseStat = document.querySelector(".stat-card .expense");

//updating balance, income & expense summary
function updateSummary(transactions){
  let income = 0;
  let expense = 0;

  transactions.forEach(transaction => {
    if(transaction.type === "income"){
      income = income + transaction.amount;
    } else {
      expense = expense + transaction.amount;
    }
  });

  balanceAmount.textContent = `${(income - expense).toLocaleString()}`;
  incomeAmount.textContent = `${income.toLocaleString()}`;
  expenseAmount.textContent = `${expense.toLocaleString()}`;

  balanceStat.textContent = `₹${(income - expense).toLocaleString()}`;
  incomeStat.textContent = `₹${income.toLocaleString()}`;
  expenseStat.textContent = `₹${expense.toLocaleString()}`;
}