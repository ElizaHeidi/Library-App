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
});

function createTable() {
  table = document.createElement("table");

  let headers = ["Title", "Author", "Pages", "Read"];
  let header = table.createTHead();
  let headerRow = header.insertRow(0);
  for (let i = 0; i < headers.length; i++) {
    headerRow.insertCell(i).innerHTML = headers[i];
  }

  addRow(bookArray[0]);
  document.body.append(table);
}

function addRow(book) {
  let row = table.insertRow();
  row.insertCell(0).innerHTML = book.title;
  row.insertCell(1).innerHTML = book.author;
  row.insertCell(2).innerHTML = book.pages;
  row.insertCell(3).innerHTML = book.read;
}
