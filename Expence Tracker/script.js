const expenseName = document.querySelector("#expenseName");
const expenseAmount = document.querySelector("#expenseAmount");
const expenseCategory = document.querySelector("#expenseCategory");

const addExpense = document.querySelector("#addExpense");

const expenseList = document.querySelector("#expenseList");
const total = document.querySelector("#total");

let expenses = [];

addExpense.addEventListener("click", function (button) {
  
   const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    if (name === "") {
        alert("Please enter expense name");
        return;
    }
    if (amount <= 0 || expenseAmount.value === "") {
        alert("Please enter a valid amount");
        return;
    }

    if (category === "") {
        alert("Please select a category");
        return;
    }

  const expence = {
    name: name,
    amount: amount,
    category: category,
  };
  expenses.push(expence);
  displayExpenses(expenses);
  calculateTotal();
  expenseName.value = "";
  expenseAmount.value = "";
  expenseCategory.value = "";
});

function displayExpenses(productArray) {
  expenseList.innerHTML = "";
  productArray.map(function (item) {
    const expenseCard = document.createElement("div");
    expenseCard.className = "Expenses";

    const expName = document.createElement("h2");
    const expAmount = document.createElement("p");
    const expCategory = document.createElement("p");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    expName.textContent = item.name;
    expCategory.textContent = item.category;
    expAmount.textContent = `Rs:${item.amount}`;

    expenseCard.append(expName, expAmount, expCategory, deleteBtn);
    expenseList.append(expenseCard);
    
    deleteBtn.addEventListener('click',function(){
      const expenceFilter = expenses.filter(function(expense){
       return expense !== item ;
      
      });
      expenses = expenceFilter;
      displayExpenses(expenses);
        calculateTotal();
    });
    });
}
function calculateTotal() {

    const totalAmount = expenses.reduce(function(sum, expense) {

        return sum + Number(expense.amount);

    }, 0);

    total.textContent = totalAmount;
}