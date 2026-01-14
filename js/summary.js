const balanceAmount = document.querySelector("#expenses-section .balance-amount .value");
const incomeAmount = document.querySelector("#expenses-section .income .value");
const expenseAmount = document.querySelector("#expenses-section .expense .value");

const balanceStat = document.querySelector(".stat-card .balance");
const incomeStat = document.querySelector(".stat-card .income");
const expenseStat = document.querySelector(".stat-card .expense");

//updating balance, income & expense summary
function updateSummary(){
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

const youOweAmountDOM = document.querySelector("#ledger-section .you-owe .value")
const friendOwesAmountDOM = document.querySelector("#ledger-section .friend-owe .value")
const statTotalOwed = document.querySelector(".total-owed strong");
const statTotalBorrowed = document.querySelector(".total-borrowed strong");
const statTransactions = document.getElementById("total-transactions");
const statUnpaidTransactions = document.getElementById("unpaid-transactions");

//function to update friend summary
function updateFriendSummary(){
  let friendOweAmount = 0;
  let youOweAmount = 0;
  let totalTransactions = friendTransactions.length;
  let unpaidTransactions = 0;

  friendTransactions.forEach(transaction=>{
    if (!transaction.paid) { 
      unpaidTransactions++;
      
      if (transaction.type === "friend-owes") {
        friendOweAmount += transaction.amount;
      } else {
        youOweAmount += transaction.amount;
      }
    }
  });

  youOweAmountDOM.textContent = `${youOweAmount.toLocaleString()}`;
  friendOwesAmountDOM.textContent = `${friendOweAmount.toLocaleString()}`;
  statTotalOwed.textContent = `₹${youOweAmount.toLocaleString()}`;
  statTotalBorrowed.textContent = `₹${friendOweAmount.toLocaleString()}`;
  statTransactions.textContent = `${totalTransactions.toLocaleString()}`;
  statUnpaidTransactions.textContent = `${unpaidTransactions.toLocaleString()}`;
}