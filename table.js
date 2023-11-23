let itemList = [];
let dateList = [];

function initialize() {
    displayCurrentDate();
}

function addItem() {
  let item = document.getElementById("item").value;
  let selectedUser = userSelect.options[userSelect.selectedIndex].value;
  let currentDate = new Date();
  let formattedDate = currentDate.toISOString().split('T')[0];
  
  // let userSelect = document.getElementById("userSelect");
  // let date = document.getElementById("date").value;

if (item.trim() !== "") {
      // let table = document.getElementById("shopping-list");

      let tableBody = document.getElementById("table-body");
      
      // Create a new row
      let row = tableBody.insertRow();

      // Create cells for item and date added
      let cellItem = row.insertCell(0);
      let cellUser = row.insertCell(1);
      let cellDate = row.insertCell(2);
      let cellAction = row.insertCell(3);

      // Set the content of cells
      cellItem.innerHTML = item;
      cellUser.innerHTML = selectedUser;
      cellDate.innerHTML = formattedDate;

      // Push item and date to arrays
      itemList.push(item);
      dateList.push(formattedDate);

      // Create a remove button for items bought or no longer needed
      let removeButton = document.createElement("button");
      removeButton.appendChild(document.createTextNode("X"));
      
      // Track strike-off status
      let isStrikedOff = false;

      removeButton.addEventListener("click", function() {
        if (!isStrikedOff) {
          // Apply the strike-off style to the item
          cellItem.style.textDecoration = "line-through";
          cellUser.style.textDecoration = "line-through";
          cellDate.style.textDecoration = "line-through";
          isStrikedOff = true;
          } else {
                // Remove the strike-off style
                cellItem.style.textDecoration = "none";
                cellUser.style.textDecoration = "none";
                cellDate.style.textDecoration = "none";
                isStrikedOff = false;
            }
      });

      // Append the remove button to the cell
      cellAction.appendChild(removeButton);

      // Clear input fields
      document.getElementById("item").value = "";
  }
  else {
      // Display an error message for invalid date
      alert("Please enter an item description.");
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
    let tableBody = document.getElementById("table-body");

    // Remove all rows from the table body
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // Clear the arrays
    itemList = [];
    dateList = [];
}

// Display current date
function displayCurrentDate() {
let currentDate = new Date();
let options = { year: 'numeric', month: 'short', day: 'numeric' };
let formattedDate = currentDate.toLocaleDateString('en-US', options);
document.getElementById('current-date').innerText = "as of " + formattedDate;
}

// Call date function on page load
displayCurrentDate();
