"use strict"


function halo() {
  console.log("halo world");
}

// CREATE_TABLE
function create() {
  db.serialize(function () {
    db.run(createTable, function (err) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log('Table Created');
        return 1;
      }
    });
  });
}

// READ DATA
function read() {
  db.serialize(function () {
    db.all(readData, function (err, rows) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log(rows);
        return 1;
      }
    })
  })
}

// UPDATE_DATA
function update() {
  db.serialize(function () {
    db.run(updateData, function (err) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log("Query updated");
        return 1;
      }
    })
  })
}

// INSERT_DATA
function insert() {
  db.serialize(function () {
    db.run(seedData, function (err) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log("Query inserted");
        return 1;
      }
    })
  })
}

function remove() {
  db.serialize(function () {
    console.log('MASUK');
    db.run(deleteData, function (err) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log('Table deleted');
        return 1;
      }
    });
  });
}


//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);

var replServer = repl.start({
  input: process.stdin,
  output: process.stdout,
  prompt: ">> "
})

var createTable = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(100), birthdate DATE, email VARCHAR(100), phone VARCHAR(100))";
var seedData = "INSERT INTO student (first_name, last_name, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";
var readData = "SELECT * FROM student";
var updateData = "UPDATE student SET first_name='Fajar' WHERE id = 1";
var deleteData = "DELETE FROM student where id = 1";

// command list
replServer.context.halo = halo
replServer.context.create = create
replServer.context.update = update
replServer.context.insert = insert
replServer.context.read = read
replServer.context.remove = remove
