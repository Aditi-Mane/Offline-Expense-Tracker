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
  const transactionCard = document.createElement("div");
  transactionCard.classList.add("transaction-card");

  //left card
  const cardLeft = document.createElement("div");
  cardLeft.classList.add("card-left");

  const nameRow = document.createElement("div");
  nameRow.classList.add("name-row");

  const friendName = document.createElement("span");
  friendName.classList.add("name");
  friendName.textContent = name;

  const oweStatus = document.createElement("span");
  oweStatus.classList.add("badge", "owe");
  oweStatus.textContent = type === "friend-owes" ? "Friend owes" : "You owe";

  const payStatus = document.createElement("span");
  payStatus.classList.add("badge", "status");
  payStatus.textContent = "Unpaid"; //modify this later on

  const amountEl = document.createElement("div");
  amountEl.classList.add("amount", "owe-amount");
  amountEl.textContent = "₹" + amount.toLocaleString();

  const descEl = document.createElement("div");
  descEl.classList.add("desc");
  descEl.textContent = noteTyped;

  const dateEl = document.createElement("div");
  dateEl.classList.add("date");
  dateEl.textContent = date;

  //right card
  const rightCard = document.createElement("div");
  rightCard.classList.add("card-right");

  const tick = document.createElement("span");
  tick.classList.add("icon");
  tick.textContent = "✔";

  const deleteEl = document.createElement("span");
  deleteEl.classList.add("icon");
  deleteEl.textContent = "🗑";

  nameRow.append(friendName, oweStatus, payStatus);
  cardLeft.append(nameRow, amountEl, descEl, dateEl);
  rightCard.append(tick, deleteEl);
  transactionCard.append(cardLeft, rightCard);

  return transactionCard;
}