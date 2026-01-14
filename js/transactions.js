//function to add new transaction card to recent transactions
function createTransactionCard({id, title, amount, type, category, date}){
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

  const editEl = document.createElement("span");
  editEl.classList.add("edit");
  editEl.dataset.id = id;

  const imgEdit = document.createElement("img");
  imgEdit.src = "./assets/pen.png";   // path to your image
  imgEdit.alt = "Edit";
  imgEdit.classList.add("edit-icon");

  editEl.appendChild(imgEdit);

  const deleteEl = document.createElement("span");
  deleteEl.classList.add("delete");
  deleteEl.dataset.id = id;

  const img = document.createElement("img");
  img.src = "./assets/bin.png";   // path to your image
  img.alt = "Delete";
  img.classList.add("delete-icon");

  deleteEl.appendChild(img);

  titleRow.append(titleEl, categoryEl);
  details.append(titleRow, dateEl);
  left.append(icon, details);
  right.append(amountEl, editEl, deleteEl);
  transactionItem.append(left, right);

  return transactionItem;
}

//function to add new transaction card to friends transactions
function createFriendTransactionCard({id, name, amount, type, noteTyped, date, paid}){
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
  payStatus.textContent = paid ? "Paid" : "Unpaid";

  if (paid) {
    payStatus.classList.add("paid");
    transactionCard.classList.add("paid-card");
  }

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

  const checkEl = document.createElement("input");
  checkEl.type = "checkbox"
  checkEl.classList.add("check-box");
  checkEl.dataset.id = id;
  checkEl.checked = paid;

  const editEl = document.createElement("span");
  editEl.classList.add("edit");
  editEl.dataset.id = id;

  const imgEdit = document.createElement("img");
  imgEdit.src = "./assets/pen.png";   // path to your image
  imgEdit.alt = "Edit";
  imgEdit.classList.add("edit-icon");

  editEl.appendChild(imgEdit);

  const deleteEl = document.createElement("span");
  deleteEl.classList.add("delete");
  deleteEl.dataset.id = id;

  const img = document.createElement("img");
  img.src = "./assets/bin.png";   // path to your image
  img.alt = "Delete";
  img.classList.add("delete-icon");

  deleteEl.appendChild(img);

  nameRow.append(friendName, oweStatus, payStatus);
  cardLeft.append(nameRow, amountEl, descEl, dateEl);
  rightCard.append(checkEl, editEl, deleteEl);
  transactionCard.append(cardLeft, rightCard);

  return transactionCard;
}

//function to render transactions
function renderTransactions() {
  const container = document.querySelector(".recent-transaction-card");

  //clear old UI (VERY IMPORTANT)
  container.innerHTML = "<h3>Recent Transactions</h3>";

  //render each transaction
  transactions.forEach(transaction => {
    const card = createTransactionCard(transaction);
    container.append(card);
  });
}

//function to render friend transactions
let currentTab = "all";
function renderFriendTransactions(){
   const list = document.querySelector(".transactions-list");
   list.innerHTML = "";

   let filtered = friendTransactions;

   if(currentTab === "paid"){
    filtered = friendTransactions.filter(t => t.paid === true);
   } else if(currentTab === "unpaid"){
    filtered = friendTransactions.filter(t => t.paid === false);
   }

   filtered.forEach(t => {
    const card = createFriendTransactionCard(t);
    list.appendChild(card);
   })
}

//function to open edit modal
const editModal = document.getElementById("editModal");
const editTitle = document.getElementById("edit-title");
const editAmount = document.getElementById("edit-amount");
const editType = document.getElementById("edit-type");

const incomeOptions = editModal.querySelector(".income-options");
const expenseOptions = editModal.querySelector(".expense-options");

const editIncomeCategory = document.getElementById("edit-income-category");
const editExpenseCategory = document.getElementById("edit-expense-category");

//to open modal
function openEditModal(txn){
  editModal.classList.remove("hidden");

  editTitle.value = txn.title;
  editAmount.value = txn.amount;
  editType.value = txn.type;
  
  if (txn.type === "income") {
    incomeOptions.style.display = "block";
    expenseOptions.style.display = "none";
  } else {
    incomeOptions.style.display = "none";
    expenseOptions.style.display = "block";
  }

  if (txn.type === "income") {
    editIncomeCategory.value = txn.category;
  } else {
    editExpenseCategory.value = txn.category;
  }

  // store id on modal
  editModal.dataset.id = txn.id;
}

//to close modal
function closeEditModal() {
  editModal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

//function to edit friend transactions using modal
const editFriendModal = document.getElementById("editFriendModal");

const editFriendName = document.getElementById("edit-name");
const editFriendAmount = document.getElementById("edit-friend-amount");
const editFriendType = document.getElementById("edit-type-owing");
const editFriendNote = document.getElementById("edit-note");

const saveEditFriendBtn = document.getElementById("saveEditFriendBtn");
const closeEditFriendModalBtn = document.getElementById("closeEditFriendModal");

function openFriendEditModal(txn){
  console.log("EDIT TXN RECEIVED:", txn);
  editFriendModal.classList.remove("hidden");

  editFriendName.value = txn.name;
  editFriendAmount.value = txn.amount;
  editFriendType.value = txn.type;
  editFriendNote.value = txn.noteTyped;

  editFriendModal.dataset.id = txn.id;
}

//to close modal
function closeEditFriendModal() {
  editFriendModal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

