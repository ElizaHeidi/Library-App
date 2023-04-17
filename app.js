let input = document.querySelector("#book-input");
let submit = document.querySelector(".submit-btn");
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
});

// Prototypes

function Book(title, author, genre, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
}

bookPrototype = {
  toggleRead: function () {
    if (this.read === "Read") {
      this.read = "Not yet!";
    } else if (this.read === "Not yet!") {
      this.read = "Read";
    } else {
      this.read = "Read"; // set undefined value to "yes"
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
  let read = bookInputArray[3];

  let newBook = new Book(title, author, genre, read);

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

//
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

function addRow(book) {
  let tbody = table.querySelector("tbody");
  let row = tbody.insertRow();
  row.insertCell(0).innerHTML = book.title;
  row.insertCell(1).innerHTML = book.author;
  row.insertCell(2).innerHTML = book.genre;
  let readCell = row.insertCell(3);
  readCell.innerHTML = "?";

  // Create the toggle read status button
  const toggleReadBtn = document.createElement("button");
  toggleReadBtn.classList.add("read-status");
  toggleReadBtn.textContent = "Read Status";
  row.appendChild(toggleReadBtn);

  // Add click event listener to the toggle read status button
  toggleReadBtn.addEventListener("click", () => {
    book.toggleRead();
    readCell.innerHTML = book.read;
  });

  //   Create the trashBtn
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-icon");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-trash");
  trashBtn.appendChild(icon);

  row.appendChild(trashBtn);

  trashBtn.addEventListener("click", deleteBook);
}

function clear() {
  input.value = "";
}

function deleteBook(e) {
  if (
    e.target.classList.contains("trash-icon") ||
    e.target.classList.contains("fa-trash")
  ) {
    const row = e.target.closest("tr");
    if (row) {
      row.parentElement.removeChild(row);
    }

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
