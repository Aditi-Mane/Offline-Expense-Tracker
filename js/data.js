let transactions = []; //transactions globally available

let friendTransactions = [];

//function to save data in localStorage
function saveTransactions() {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

//function to load data from localStorage
function loadTransactions(){
  const storage = localStorage.getItem("transactions");

  if(storage){
    //conversion of string from local storage back to object format
    transactions = JSON.parse(storage); 
  } else {
    transactions = [];
  }
}

function saveFriendTransactions() {
  localStorage.setItem(
    "friendTransactions",
    JSON.stringify(friendTransactions)
  );
}

function loadFriendTransactions(){
  const storage = localStorage.getItem("friendTransactions");

  if(storage){
    //conversion of string from local storage back to object format
    friendTransactions = JSON.parse(storage); 
  } else {
    friendTransactions = [];
  }
}


