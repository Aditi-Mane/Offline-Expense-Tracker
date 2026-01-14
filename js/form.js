const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");

const incomeCategory = document.getElementById("income-category");
const expenseCategory = document.getElementById("expense-category");

const addBtn = document.querySelector(".transaction-card button");
const recentTransactionsContainer = document.querySelector(".expenses-transactions-list");

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
    id: Date.now(),
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

  transactions.push(transaction);

   //create and append
  renderTransactions();
  updateSummary();
  saveTransactions();

  titleInput.value="";
  amountInput.value ="";
})

//add in friend transaction logic
const friendName = document.getElementById("name");
const friendAmount = document.getElementById("friend-amount");
const typeOwing = document.getElementById("type-owing");
const note = document.getElementById("note");
const friendBtn = document.getElementById("addFriendBtn");

const friendTransactionContainer = document.querySelector(".friends-transactions")
const tabs = document.querySelector(".tabs");

friendBtn.addEventListener("click", ()=>{
  const name = friendName.value.trim();
  const amount = Number(friendAmount.value);
  const type = typeOwing.value;
  const noteTyped = note.value.trim();

  if(!name || !amount){
    alert("Enter valid name and amount!");
    return;
  }

  const friendTransaction = {
    id: Date.now(),
    name,
    amount,
    type,
    noteTyped,
    date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  }

  friendTransactions.push(friendTransaction);

  renderFriendTransactions();
  updateFriendSummary();
  saveFriendTransactions();

  friendName.value = "";
  friendAmount.value = "";
  note.value = "";
})

//add nav bar buttons toggle visibility
const incomeExpensesBtn = document.getElementById("income-expenses");
const friendsLedgerBtn = document.getElementById("friends-ledger");
const statsBtn = document.getElementById("stats");

const incomeExpenseSection = document.getElementById("expenses-section");
const friendsLedgerSection = document.getElementById("ledger-section");
const statSection = document.getElementById("stats-section");

const navButtons = document.querySelectorAll("nav .buttons button");

//initially only one section visible
friendsLedgerSection.style.display = "none";
statSection.style.display = "none";

incomeExpensesBtn.addEventListener("click",()=>{
  navButtons.forEach(btn => btn.classList.remove("active"));
  incomeExpensesBtn.classList.add("active");

  incomeExpenseSection.style.display = "block";
  friendsLedgerSection.style.display = "none";
  statSection.style.display = "none";
})

friendsLedgerBtn.addEventListener("click",()=>{
  navButtons.forEach(btn => btn.classList.remove("active"));
  friendsLedgerBtn.classList.add("active");

  incomeExpenseSection.style.display = "none";
  friendsLedgerSection.style.display = "block";
  statSection.style.display = "none";
})

statsBtn.addEventListener("click",()=>{
  navButtons.forEach(btn => btn.classList.remove("active"));
  statsBtn.classList.add("active");
  
  incomeExpenseSection.style.display = "none";
  friendsLedgerSection.style.display = "none";
  statSection.style.display = "block";
})

//to open the edit modal for certain transaction id
recentTransactionsContainer.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit");
  if (!editBtn) return;

  const id = Number(editBtn.dataset.id);
  const txn = transactions.find(t => t.id === id);

  openEditModal(txn);
});

//to close the edit modal
editModal.querySelector(".close").addEventListener("click", () => {
  editModal.classList.add("hidden");
});

//modal save
document.getElementById("saveEdit").addEventListener("click",()=>{
  const id = Number(editModal.dataset.id);

  const index = transactions.findIndex(t => t.id === id);
  if(index == -1) return;

  transactions[index] = {
    ...transactions[index],
    title: editTitle.value.trim(),
    amount: Number(editAmount.value),
    type: editType.value,
    category:  editType.value === "income" ? editIncomeCategory.value : editExpenseCategory.value
  }
  
  saveTransactions()
  renderTransactions();
  updateSummary();
  closeEditModal();
})

//deletion operation of a transaction
recentTransactionsContainer.addEventListener("click",(e)=>{
  const deleteBtn = e.target.closest(".delete");
  if(!deleteBtn) return;

  const id = Number(deleteBtn.dataset.id);
  const confirmed = confirm("Delete this transaction?");
  if (!confirmed) return;

  transactions = transactions.filter(t => t.id !== id);

  saveTransactions();
  renderTransactions();
  updateSummary();
})

//edit operation for friend transactions
friendTransactionContainer.addEventListener("click",(e)=>{
  const editBtn = e.target.closest(".edit");
  if(!editBtn) return;

  const id = Number(editBtn.dataset.id);
  const txn = friendTransactions.find(t => t.id === id);

  openFriendEditModal(txn);
})

closeEditFriendModalBtn.addEventListener("click", () => {
  editFriendModal.classList.add("hidden");
});

//modal save
document.getElementById("saveEditFriendBtn").addEventListener("click",()=>{
  const id = Number(editFriendModal.dataset.id);

  const index = friendTransactions.findIndex(t => t.id === id);
  if(index == -1) return;

  friendTransactions[index] = {
    ...friendTransactions[index],
    name: editFriendName.value.trim(),
    amount: Number(editFriendAmount.value),
    type: editFriendType.value,
    noteTyped: editFriendNote.value
  }
  
  saveFriendTransactions()
  renderFriendTransactions();
  updateFriendSummary();
  closeEditFriendModal();
})

//deletion operation of a transaction
friendTransactionContainer.addEventListener("click",(e)=>{
  const deleteBtn = e.target.closest(".delete");
  if(!deleteBtn) return;

  const id = Number(deleteBtn.dataset.id);
  const confirmed = confirm("Delete this transaction?");
  if (!confirmed) return;

  friendTransactions = friendTransactions.filter(t => t.id !== id);

  saveFriendTransactions();
  renderFriendTransactions();
  updateFriendSummary();
})

//unpaid/paid toggling via. event delegation
friendTransactionContainer.addEventListener("change",(e)=>{
  const checkBox = e.target;
  if(checkBox.classList.contains("check-box")){
    const id = Number(checkBox.dataset.id);

    const txn = friendTransactions.find(t => t.id === id);
    txn.paid = checkBox.checked;

    saveFriendTransactions();
    renderFriendTransactions();
    updateFriendSummary();
  }
})

//filtering all/paid/unpaid tabs in filter transactions
document.querySelectorAll(".tab").forEach((tab)=>{
  tab.addEventListener("click",()=>{
    currentTab = tab.dataset.filter;

    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    tab.classList.add("active");

    renderFriendTransactions();
  })
})







