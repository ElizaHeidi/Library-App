let input = document.querySelector("#book-input");
let submit = document.querySelector(".submit-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const modalSubmit = document.querySelector(".btn-submit");
let bookArray = [];
let table;

let containerDiv = document.createElement("div");
containerDiv.classList.add("container");
containerDiv.appendChild(input);
containerDiv.appendChild(submit);
document.body.appendChild(containerDiv);

// Listen for click on New Book button
submit.addEventListener("click", function (event) {
  event.preventDefault();
  getInput();
  createWrapper();
  clear();
  openModal();
});

// Listen for 'enter' keypress in input field
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getInput();
    createWrapper();
    clear();
    openModal();
  }
});

// Prototypes

function Book(title, author, genre, status) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.status = status;
}

bookPrototype = {
  toggleRead: function () {
    if (this.status === "Read") {
      this.status = "Not yet!";
    } else if (this.status === "Not yet!") {
      this.status = "Read";
    } else {
      this.status = "Read"; // set undefined value to "Read"
    }
  },
};

Book.prototype = Object.create(bookPrototype);

// Functions

// Save the input.value to a variable, separate it by the commas, and set each
// object to corresponding indices of the array
function getInput() {
  let bookInput = input.value;
  let bookInputArray = bookInput.split(",");

  let title = bookInputArray[0];
  let author = bookInputArray[1];
  let genre = bookInputArray[2];
  let status = bookInputArray[3];

  // creates a new Book object using the Book constructor function
  // with the extracted values as arguments. The resulting object is assigned to the newBook variable.
  let newBook = new Book(title, author, genre, status);

  // If there is no table or rows, then push the newBook value to the array and createTable()
  // Else, push the newBook to the array again and add a row
  if (!table || table.rows.length === 0) {
    bookArray.push(newBook);
    createTable();
  } else {
    bookArray.push(newBook);
    addRow(newBook);
  }
}

// Wrap created table in div
function createWrapper() {
  let wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("table-wrapper");
  wrapperDiv.appendChild(table);

  document.body.appendChild(wrapperDiv);
}

// Create table, set headers equal to the appropriate values, create a tHead
// insert a row, loop through the headers and create a th for each one
// Then print the text.value of each header (eg., 'title') into a new textNode
// Then append that textNode to each header and append each header to the created row
function createHeader() {
  table = document.createElement("table");

  let headers = ["Title", "Author", "Genre", "Read Status"];
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of headers) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

// If there is no table or rows, then push the newBook value to the array and createTable()
// Else, push the newBook to the array again and add a row
function createTable() {
  if (!table || !table.querySelector("thead")) {
    createHeader();
  }

  // Add tbody to the table
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);

  addRow(bookArray[0]);
  document.body.append(table);
  table.setAttribute("width", "640");
}

// Grab body and each row created, Insert cell 1 with its text.content set to the
// book's submitted title value, repeat for each field
function addRow(book) {
  let tbody = table.querySelector("tbody");
  let row = tbody.insertRow();
  row.insertCell(0).textContent = book.title;
  row.insertCell(1).textContent = book.author;
  row.insertCell(2).textContent = book.genre;
  let readCell = row.insertCell(3);
  readCell.innerHTML = "";

  // Create the toggle read status button
  const toggleReadBtn = document.createElement("button");
  toggleReadBtn.classList.add("read-status");
  toggleReadBtn.textContent = "Read Status";
  readCell.appendChild(toggleReadBtn);

  // Add click event listener to the toggle read status button
  toggleReadBtn.addEventListener("click", () => {
    book.toggleRead();
    if (toggleReadBtn.textContent === "Read") {
      toggleReadBtn.textContent = "Not yet!";
    } else if (toggleReadBtn.textContent === "Not yet!") {
      toggleReadBtn.textContent = "Read";
    } else {
      toggleReadBtn.textContent = "Read"; // set undefined value to "Read"
    }
  });

  // Update the read status for the current book
  updateReadStatus(toggleReadBtn, book);

  // Create the trashBtn
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-icon");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-trash");
  trashBtn.appendChild(icon);

  row.appendChild(trashBtn);

  // Add eventListener to trashBtn
  trashBtn.addEventListener("click", deleteBook);
}

function clear() {
  input.value = "";
}

// if the click target contains the trashBtn or its icon, then delete that
// button's closest row in the table
function deleteBook(e) {
  if (
    e.target.classList.contains("trash-icon") ||
    e.target.classList.contains("fa-trash")
  ) {
    const row = e.target.closest("tr");
    if (row) {
      row.parentElement.removeChild(row);
    }

    // Loop through tr elements and check if there are 0 rows,
    // then if yes, delete the header if it exists
    const tbody = table.querySelector("tbody");
    const rowCount = tbody.querySelectorAll("tr").length;
    if (rowCount === 0) {
      const thead = table.querySelector("thead");
      if (thead) {
        table.removeChild(thead);
      }
    }
  }
}

function updateReadStatus(toggleReadBtn, book) {
  toggleReadBtn.textContent = book.status;
}

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);

modalSubmit.addEventListener("click", function () {
  let readRadio = document.querySelector("#read");
  let unreadRadio = document.querySelector("#unread");

  if (readRadio.checked) {
    bookArray[bookArray.length - 1].status = "Read";
  } else if (unreadRadio.checked) {
    bookArray[bookArray.length - 1].status = "Not yet!";
  } else {
    bookArray[bookArray.length - 1].status = "Read";
  }

  let readStatusButtons = document.querySelectorAll(".read-status");
  updateReadStatus(
    readStatusButtons[readStatusButtons.length - 1],
    bookArray[bookArray.length - 1]
  );

  closeModal();
});
