let itemList = [];
let dateList = [];

function initialize() {
    // Show today's date
    displayCurrentDate();
    // Load saved items from localStorage
    itemList = JSON.parse(localStorage.getItem('itemList')) || [];
    dateList = JSON.parse(localStorage.getItem('dateList')) || [];
    displaySavedItems();
}

// Create table
function createRow(item, user, date) {
  let tableBody = document.getElementById("table-body");
  let row = tableBody.insertRow();
  let cellItem = row.insertCell(0);
  let cellUser = row.insertCell(1);
  let cellDate = row.insertCell(2);
  let cellAction = row.insertCell(3);

  cellItem.innerHTML = item;
  cellUser.innerHTML = user;
  cellDate.innerHTML = date;

  return { row, cellItem, cellUser, cellDate, cellAction };
}

// Add item to table
function addItem() {
  let item = document.getElementById("item").value;
  let selectedUser = userSelect.options[userSelect.selectedIndex].value;
  let currentDate = new Date();
  let formattedDate = currentDate.toISOString().split('T')[0];

  if (item.trim() !== "") {
      let { row, cellItem, cellUser, cellDate, cellAction } = createRow(item, selectedUser, formattedDate);

      // Strike off item when clicked
      cellItem.addEventListener("click", function () {
        toggleStrikeOff(cellItem, cellUser, cellDate);
      });

      // Remove item when "X" button is clicked
      let removeButton = document.createElement("button");
      removeButton.appendChild(document.createTextNode("X"));
      cellAction.appendChild(removeButton);

      removeButton.addEventListener("click", function () {
          removeItem(row, item, formattedDate);
      });

      document.getElementById("item").value = "";
      document.getElementById("user").value = "";
  } else {
      alert("Please enter an item description.");
  }
}

// Toggle strike off
function toggleStrikeOff(cellItem, cellUser, cellDate) {
  cellItem.classList.toggle("strikeoff");
  cellUser.classList.toggle("strikeoff");
  cellDate.classList.toggle("strikeoff");
}

// Remove item from table
function removeItem(row, item, formattedDate) {
  const confirmRemove = confirm("Remove this item from the list?");
  if (confirmRemove) {
      row.remove();
      const index = itemList.indexOf(item);
      if (index !== -1) {
          itemList.splice(index, 1);
          dateList.splice(index, 1);
          localStorage.setItem('itemList', JSON.stringify(itemList));
          localStorage.setItem('dateList', JSON.stringify(dateList));
          displaySavedItems();  // Refresh display after removal
      }
  }
}

// Display saved list when page loads
function displaySavedItems() {
  let tableBody = document.getElementById("table-body");
  for (let i = 0; i < itemList.length; i++) {
      let { row, cellItem, cellUser, cellDate, cellAction } = createRow(itemList[i], "User", dateList[i]);

      // Strike off item when clicked
      cellItem.addEventListener("click", function () {
        toggleStrikeOff(cellItem, cellUser, cellDate);
      });

      // Remove item when "X" button is clicked
      let removeButton = document.createElement("button");
      removeButton.appendChild(document.createTextNode("X"));
      cellAction.appendChild(removeButton);

      removeButton.addEventListener("click", function () {
          removeItem(row, itemList[i], dateList[i]);
      });
  }
}

function sortTable(columnIndex) {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("shopping-list");
  switching = true;
  
  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        let x = rows[i].cells[columnIndex].textContent.trim();
        let y = rows[i + 1].cells[columnIndex].textContent.trim();

        // Use localeCompare for case-insensitive comparison
        if (x.localeCompare(y) > 0) {
            shouldSwitch = true;
            break;
        }
    }

    if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
    }
  }
}

//Clear shopping list
function clearList() {
  const confirmClear = confirm("Are you sure you want to clear the list?");
    
  if (confirmClear) {
      let tableBody = document.getElementById("table-body");
      
      // Remove all rows from the table body
      while (tableBody.firstChild) {
          tableBody.removeChild(tableBody.firstChild);
      }

      // Clear the arrays
      itemList = [];
      dateList = [];

      // Remove items from localStorage
      localStorage.removeItem('itemList');
      localStorage.removeItem('dateList');
  }
}

// Display current date
function displayCurrentDate() {
let currentDate = new Date();
let options = { year: 'numeric', month: 'short', day: 'numeric' };
let formattedDate = currentDate.toLocaleDateString('en-US', options);
document.getElementById('current-date').innerText = "as of " + formattedDate;
}

// Call date function and saved items on page load
displayCurrentDate();
displaySavedItems();
