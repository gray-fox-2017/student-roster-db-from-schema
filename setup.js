"use strict"

//write your code here
const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = 'student.db'
let db = new sqlite3.Database(file);

let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
});

var create_query = "CREATE TABLE student (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(25), birthday DATE, email VARCHAR(100), phone VARCHAR)";
var insert_query = "INSERT INTO student (first_name, last_name, gender, birthday, email, phone) VALUES ('Rubi', 'Henjaya', 'Male', '1986-11-20', 'rsanjaya@gmail.com', '+6281323455432'), ('Riza', 'Fahmi', 'Male', '1983-12-31', 'rfahmi@gmail.com', '+6281345543210');";

let createTable = () => {
  db.serialize(function() {
    db.run(create_query, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Table created!');
      }
    });
  });
}

let insertData = () => {
  db.serialize(function() {
    db.run(insert_query, (err) => {
      if (!err) console.log('Data inserted!');
    })
  })
}

replServer.context.createTable = createTable;
replServer.context.insertData = insertData;