const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");

const incomeCategory = document.getElementById("income-category");
const expenseCategory = document.getElementById("expense-category");

const addBtn = document.querySelector(".transaction-card button");

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

  console.log(transaction);
  titleInput.value="";
  amountInput.value ="";
})

