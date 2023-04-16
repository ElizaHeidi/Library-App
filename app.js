let input = document.querySelector("#book-input");
let submit = document.querySelector(".submit-btn");
let bookArray = [];
let table;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

submit.addEventListener("click", function (event) {
  event.preventDefault();
  let bookInput = input.value;
  console.log(bookInput);
  let bookInputArray = bookInput.split(",");

  let title = bookInputArray[0];
  let author = bookInputArray[1];
  let pages = bookInputArray[2];
  let read = bookInputArray[3];

  let newBook = new Book(title, author, pages, read);
  bookArray.push(newBook);

  console.log(bookArray);

  if (!table) {
    createTable();
  } else {
    addRow(newBook);
  }

  let wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("table-wrapper");
  wrapperDiv.appendChild(table);

  document.body.appendChild(wrapperDiv);

  wrapperDiv.addEventListener("click", deleteBook);

  clear();
});

// Functions

function createTable() {
  table = document.createElement("table");

  let headers = ["Title", "Author", "Pages", "Read"];
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of headers) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }

  addRow(bookArray[0]);
  document.body.append(table);
  table.setAttribute("width", "640");
}

function addRow(Book) {
  let row = table.insertRow();
  row.insertCell(0).innerHTML = Book.title;
  row.insertCell(1).innerHTML = Book.author;
  row.insertCell(2).innerHTML = Book.pages;
  row.insertCell(3).innerHTML = Book.read;

  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-icon");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-trash");
  trashBtn.appendChild(icon);

  row.appendChild(trashBtn);
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
  }
}
