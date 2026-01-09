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

//function to add new transaction card to friends transactions
function createFriendTransactionCard({name, amount, type, noteTyped, date}){
  
}