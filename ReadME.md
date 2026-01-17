# Offline Expense Tracker 🧾

An **offline-first expense tracking web application** that helps you manage your income, expenses, friend transactions, and visualize your financial data using charts. All data is stored locally, so the app works completely without an internet connection.

### 🔗 Live Link:
[Check out the live application here](https://offline-expense-trackerr.netlify.app/)

### 🎥 Demo Video
https://github.com/user-attachments/assets/784fb5c3-76c0-4404-bb7d-e3d72a4ae183

## 🛠 Tech Stack
- HTML
- CSS
- JavaScript
- LocalStorage

## 🚀 Features

### 1. Balance Calculation & Transaction Management
- Displays the **total balance dynamically** based on total income and total expense.
- Balance updates instantly when:
  - A transaction is added
  - A transaction is edited
  - A transaction is deleted

### 2. Dynamic Transaction Cards
- Transactions are rendered as **dynamic cards** containing:
  - Date
  - Title
  - Amount
  - Category
  - Type (Income / Expense)
- Category options automatically switch based on whether **Income** or **Expense** is selected.
- Cards are created, updated, and removed in real time.

### 3. Edit & Delete with Modal Support
- Each transaction card includes:
  - ✏️ **Edit Button**
    - Opens a modal with all fields pre-filled
    - Allows updating and saving the transaction
  - 🗑 **Delete Button**
    - Opens a confirmation modal
    - Shows the pre-entered transaction amount
    - Requires confirmation before deleting

### 4. Friends Ledger System 🤝
- Track money between you and your friends.
- Unpaid/Paid checkbox for tracking
- Add transactions showing:
  - Friend name
  - Amount
  - Who owes whom
  - Note
- Organized into three tabs:
  - **All** → Displays all friend transactions
  - **Unpaid** → Displays pending payments
  - **Paid** → Displays completed payments

### 5. Financial Charts 📊
Three dynamic and interactive charts:
1. **Monthly Transaction Trend Chart**
2. **Category-wise Expense Distribution Chart**
3. **Expenses by category chart**

All charts update automatically whenever transactions are added, edited, or deleted.


### 6. Offline Support 🌐
- Fully functional without internet.
- No backend or server required.
- Uses browser **LocalStorage** for data persistence.
