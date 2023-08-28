// Load existing data from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadExpenses();
    loadDebts();
  });
  
  // Track spending and earning
  function addExpense() {
    var date = document.getElementById("dateInput").value;
    var spent = parseFloat(document.getElementById("spentInput").value);
    var earned = parseFloat(document.getElementById("earnedInput").value);
    var difference = earned - spent;
  
    var table = document.getElementById("expensesTable");
    var row = table.insertRow(-1);
    var dateCell = row.insertCell(0);
    var spentCell = row.insertCell(1);
    var earnedCell = row.insertCell(2);
    var differenceCell = row.insertCell(3);
  
    dateCell.innerHTML = date;
    spentCell.innerHTML = spent;
    earnedCell.innerHTML = earned;
    differenceCell.innerHTML = difference;
  
    document.getElementById("spentInput").value = "";
    document.getElementById("earnedInput").value = "";
    document.getElementById("differenceInput").value = "";
  
    saveExpenses();
  }
  
  // Manage debts
  function addDebt() {
    var date = document.getElementById("debtDateInput").value;
    var amount = parseFloat(document.getElementById("debtAmountInput").value);
  
    var table = document.getElementById("debtsTable");
    var row = table.insertRow(-1);
    var dateCell = row.insertCell(0);
    var amountCell = row.insertCell(1);
    var statusCell = row.insertCell(2);
  
    dateCell.innerHTML = date;
    amountCell.innerHTML = amount;
    statusCell.innerHTML = '<button onclick="markDebtPaid(this)">Mark as Paid</button>';
  
    document.getElementById("debtDateInput").value = "";
    document.getElementById("debtAmountInput").value = "";
  
    saveDebts();
  }
  
  function markDebtPaid(button) {
    var row = button.parentNode.parentNode;
    row.classList.add("debt-paid");
    button.parentNode.innerHTML = "Paid";
  }
  
  // Save expenses to local storage
  function saveExpenses() {
    var tableData = getTableData("expensesTable");
    localStorage.setItem("expensesData", JSON.stringify(tableData));
  }
  
  // Load expenses from local storage
  function loadExpenses() {
    var tableData = JSON.parse(localStorage.getItem("expensesData"));
    if (tableData) {
      populateTable("expensesTable", tableData);
    }
  }
  
  // Save debts to local storage
  function saveDebts() {
    var tableData = getTableData("debtsTable");
    localStorage.setItem("debtsData", JSON.stringify(tableData));
  }
  
  // Load debts from local storage
  function loadDebts() {
    var tableData = JSON.parse(localStorage.getItem("debtsData"));
    if (tableData) {
      populateTable("debtsTable", tableData);
    }
  }
  
  // Get table data as an array of objects
  function getTableData(tableId) {
    var tableData = [];
    var table = document.getElementById(tableId);
    for (var i = 1; i < table.rows.length; i++) {
      var row = table.rows[i];
      var rowData = {
        date: row.cells[0].innerHTML,
        value: parseFloat(row.cells[1].innerHTML) || 0,
        status: row.cells[2].innerHTML
      };
      tableData.push(rowData);
    }
    return tableData;
  }
  
  // Populate table with data
  function populateTable(tableId, data) {
    var table = document.getElementById(tableId);
    for (var i = 0; i < data.length; i++) {
      var row = table.insertRow(-1);
      var dateCell = row.insertCell(0);
      var valueCell = row.insertCell(1);
      var statusCell = row.insertCell(2);
  
      dateCell.innerHTML = data[i].date;
      valueCell.innerHTML = data[i].value;
      statusCell.innerHTML = data[i].status;
    }
  }
  