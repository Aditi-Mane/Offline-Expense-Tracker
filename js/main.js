document.addEventListener("DOMContentLoaded",()=>{
  loadTransactions();
  loadFriendTransactions();
  renderTransactions();
  renderFriendTransactions();
  updateSummary();
  updateFriendSummary();
})

const darkBtn = document.getElementById("dark-mode");
const lightBtn = document.getElementById("light-mode");

darkBtn.addEventListener("click",()=>{
  document.body.classList.add("dark");
  localStorage.setItem("theme", "dark");
})
lightBtn.addEventListener("click",()=>{
  document.body.classList.remove("dark");
  localStorage.setItem("theme", "light");
})

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}
