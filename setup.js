"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);

let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
});

// SQL statement
var CREATE_TABLE = 'CREATE TABLE students(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(25), birthday DATE, email TEXT, phone VARCHAR)';
var SEED_DATA = "INSERT INTO students (first_name, last_name, gender, birthday, email, phone) VALUES('Rubi', 'Henjaya', 'Pria', '17-04-1989', 'rubi_henjaya@yahoo.com', 08212345678), ('Riza', 'Fahmi', 'Pria', '17-04-1989', 'riza_fahmi@yahoo.com', 08212345678)";

// CREATE_TABLE
let createTable = () => {
    // Run SQL one at a time
    db.serialize(function(){
      // Create TABLE
      db.run(CREATE_TABLE, function(err){
        if (!err){
          console.log('CREATE_TABLE');
        }
      });
    });
}

//SEED_DATA
let seedData = () => {
  // your code here
  db.serialize(function(){
    // insert TABLE
    db.run(SEED_DATA,(err) => {
      if(!err){
        console.log('insert data successful!');
      }else {
        console.log(err);
      }
    });
  });
}

replServer.context.createTable = createTable;
replServer.context.seedData = seedData;
