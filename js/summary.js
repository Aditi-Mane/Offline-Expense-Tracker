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

//for charts setup
let monthlyTrendChart; //object to easily destroy and update to new chart
let topSpendingChart;
let expenseCategoryChart;

//function to render monthly income and expenses line graph
function renderMonthlyTrendChart(){
  const monthMap = {}; //object that will store monthwise transaction details

  //month wise income and expenses grouping
  transactions.forEach(t => {
    const date = new Date(t.date);
    const key = `${date.getMonth()}-${date.getFullYear()}`;

    if(!monthMap[key]){
      monthMap[key] = {
        income: 0,
        expense: 0,
        label: date.toLocaleString("default", {
          month: "short",
          year: "numeric"
        })
      }
    }

    if (t.type === "income") {
      monthMap[key].income += t.amount;
    } else {
      monthMap[key].expense += t.amount;
    }
  })

  //convert object into arrays for Chart.js
  const labels = Object.values(monthMap).map(m => m.label);
  const incomeData = Object.values(monthMap).map(m => m.income);
  const expenseData = Object.values(monthMap).map(m => m.expense);

  //chart creation
  const ctx = document.getElementById("monthlyTrendChart").getContext("2d");

  if (monthlyTrendChart) {
    monthlyTrendChart.destroy();
  }

  monthlyTrendChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          borderColor: "#1b8f5a",
          tension: 0.4,
          fill: false
        },
        {
          label: "Expense",
          data: expenseData,
          borderColor: "#d32f2f",
          tension: 0.4,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

//function to render top spending chart
function renderTopSpendingChart() {
  const categoryMap = {};

  transactions.forEach(t => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const labels = Object.keys(categoryMap);
  const data = Object.values(categoryMap);

  const ctx = document.getElementById("topSpendingChart").getContext("2d");
  if (topSpendingChart) topSpendingChart.destroy();

  topSpendingChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Amount Spent",
        data,
        backgroundColor: "#1b8f5a"
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      }
    }
  });
}

//function to render expense category chart
function renderExpenseCategoryChart() {
  const categoryMap = {};

  transactions.forEach(t => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const labels = Object.keys(categoryMap);
  const data = Object.values(categoryMap);

  const ctx = document.getElementById("expenseCategoryChart").getContext("2d");
  if (expenseCategoryChart) expenseCategoryChart.destroy();

  expenseCategoryChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          "#1b8f5a", "#42a5f5", "#ff7043",
          "#ab47bc", "#ffa726", "#26c6da"
        ]
      }]
    }
  });
}

//function to update all charts
function updateAllCharts() {  
  renderMonthlyTrendChart();
  renderTopSpendingChart();
  renderExpenseCategoryChart();
}

