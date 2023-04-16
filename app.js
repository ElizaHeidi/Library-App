let input = document.querySelector("#book-input");
let submit = document.querySelector(".submit-btn");
let bookArray = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// create new Book based on user input

submit.addEventListener("click", function (event) {
  event.preventDefault();
  let bookInput = input.value;
  console.log(bookInput);
  let bookInputArray = bookInput.split(",");

  let title = bookInputArray[0];
  let author = bookInputArray[1];
  let pages = bookInputArray[2];
  let read = bookInputArray[3];

  let newBook = new Book(title, author, pages, read); // pass the arguments to the constructor
  bookArray.push(newBook); // push the new Book object to the array instead of the input array

  console.log(bookArray);
  if (bookArray != []) {
    addRow();
  } else {
    createTable();
  }
});

function createTable() {
  let table = document.createElement("table");

  // add headers to the table
  let headers = ["Title", "Author", "Pages", "Read"];
  let header = table.createTHead();
  let headerRow = header.insertRow(0);
  for (let i = 0; i < headers.length; i++) {
    headerRow.insertCell(i).innerHTML = headers[i];
  }

  // add books to the table
  for (let i = 0; i < bookArray.length; i++) {
    let row = table.insertRow(i + 1); // add 1 to i to avoid overwriting the header row
    row.insertCell(0).innerHTML = bookArray[i].title;
    row.insertCell(1).innerHTML = bookArray[i].author;
    row.insertCell(2).innerHTML = bookArray[i].pages;
    row.insertCell(3).innerHTML = bookArray[i].read;
  }

  document.body.append(table);
}

function addRow() {
  let bookInput = input.value;
  console.log(bookInput);
  let bookInputArray = bookInput.split(",");

  let title = bookInputArray[0];
  let author = bookInputArray[1];
  let pages = bookInputArray[2];
  let read = bookInputArray[3];

  let table = document.createElement("table");
  let row = table.insertRow();
  row.insertCell(0).innerHTML = bookArray[0].title;
  row.insertCell(1).innerHTML = bookArray[1].author;
  row.insertCell(2).innerHTML = bookArray[2].pages;
  row.insertCell(3).innerHTML = bookArray[3].read;
}
