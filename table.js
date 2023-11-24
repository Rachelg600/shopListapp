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
      //create table
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
    
      // Track strike-off status
      let isStrikedOff = false;

      // Allow strike off of items no longer needed/bought
      cellItem.addEventListener("click", function() {
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

      // Remove items from list
      let removeButton = document.createElement("button");
      removeButton.appendChild(document.createTextNode("X"));
      // Append the remove button to the cell
      cellAction.appendChild(removeButton);

      removeButton.addEventListener("click", function() {
        // Prompt the user for confirmation before removing the item
        const confirmRemove = confirm("Remove this item from list?");
        
        if (confirmRemove) {
            // Remove the row from the table
            row.remove();

            // Optionally, remove the item from your arrays
            const index = itemList.indexOf(item);
            if (index !== -1) {
                itemList.splice(index, 1);
                dateList.splice(index, 1);
            }
        }
      });

      // Clear input fields
      document.getElementById("item").value = "";
      document.getElementById("user").value = "";
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
