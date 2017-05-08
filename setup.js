"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
});



var file= 'student.db';
var db= new sqlite.Database(file);

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(25), birthday DATE, email VARCHAR(100), phone VARCHAR)";
var SEED_DATA = "INSERT INTO student (first_name, last_name, gender, birthday, email, phone) VALUES ('Priambodo', 'Kurniawan', 'L', '1992-11-27', 'priambodo@gmail.com', '08978810210'), ('Rubio', 'Henjaya', 'L', '1993-01-27', 'rubio@gmail.com', '08975610211'), ('Philicia', 'Octa', 'P', '1997-10-28', 'philicia@gmail.com', '089656102111')";

let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE, function(err){
      if (err) {
        console.log('err');
      } else {
        console.log('CREATE TABLE')
      }
    });
  });
}

let seedData = () => {
  db.serialize(function() {
    db.run(SEED_DATA, function(err){
      if (err) {
        console.log('err');
      } else {
        console.log('DONE')
      }
    });
  });
}

replServer.context.createTable = createTable;
replServer.context.seedData = seedData;
