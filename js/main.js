document.addEventListener("DOMContentLoaded",()=>{
  loadTransactions();
  loadFriendTransactions();
  renderTransactions();
  renderFriendTransactions();
  updateSummary();
  updateFriendSummary();
})