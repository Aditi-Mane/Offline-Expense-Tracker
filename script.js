const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");

const incomeCategory = document.getElementById("income-category");
const expenseCategory = document.getElementById("expense-category");

const addBtn = document.querySelector(".transaction-card button");
const recentTransactionsContainer = document.querySelector(".recent-transaction-card");

//initial display of only income options
expenseCategory.style.display = "none";

//changing category UI options visibility according to type chosen
typeSelect.addEventListener("change",()=>{
  if(typeSelect.value === "income"){
    incomeCategory.style.display = "block";
    expenseCategory.style.display = "none";
  } else {
    incomeCategory.style.display = "none";
    expenseCategory.style.display = "block";
  }
})

//adding entry to transactions
addBtn.addEventListener("click", ()=>{
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeSelect.value;

  //checking if user entered valid title/amount
  if(!title || !amount){
    alert("Please enter valid title and amount");
    return;
  }

  //take in chosen category
  let category;

  if(typeSelect.value === "income"){
    category = incomeCategory.value;
  } else {
    category = expenseCategory.value;
  }

  //create single object for values entered
  const transaction = {
    title,
    amount,
    type,
    category,
    date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  }

   //create and append
  const transactionCard = createTransactionCard(transaction);
  recentTransactionsContainer.append(transactionCard); // newest on top

  titleInput.value="";
  amountInput.value ="";
})

//function to add new transaction card to recent transactions
function createTransactionCard({title, amount, type, category, date}){
  const transactionItem = document.createElement("div");
  transactionItem.classList.add("transaction-item", type);

  //left div
  const left = document.createElement("div");
  left.classList.add("left");

  const icon = document.createElement("div");
  icon.classList.add("icon");
  icon.textContent = type === "income" ? "↑" : "↓";

  const details = document.createElement("div");
  details.classList.add("details");

  const titleRow = document.createElement("div");
  titleRow.classList.add("title-row");

  const titleEl = document.createElement("span");
  titleEl.classList.add("title");
  titleEl.textContent = title;

  const categoryEl = document.createElement("span");
  categoryEl.classList.add("category");
  categoryEl.textContent = category;

  const dateEl = document.createElement("div");
  dateEl.classList.add("date");
  dateEl.textContent = date;

  //right div
  const right = document.createElement("div");
  right.classList.add("right");

  const amountEl = document.createElement("span");
  amountEl.classList.add("amount");
  amountEl.textContent = (type === "income" ? "+₹" : "-₹") + amount.toLocaleString();

  const deleteEl = document.createElement("span");
  deleteEl.classList.add("delete");
  deleteEl.textContent = "🗑️";

  titleRow.append(titleEl, categoryEl);
  details.append(titleRow, dateEl);
  left.append(icon, details);
  right.append(amountEl, deleteEl);
  transactionItem.append(left, right);

  return transactionItem;
}



