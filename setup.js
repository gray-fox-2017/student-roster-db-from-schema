"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var replServer = repl.start({
  prompt: ">>",
  input: process.stdin,
  output: process.stdout
})
var file = 'student.db';
var db = new sqlite.Database(file);

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, gender TEXT, birthdate DATE, email TEXT, phone INTEGER);";
var SEED_DATA = "INSERT INTO student(firstname, lastname, gender, birthdate, email, phone) VALUES ('Rubi', 'Henjaya', 'Pria', '1986-11-20', 'ruby@hacktiv8.com', 08128312819), ('Riza', 'Fahmi', 'Pria', '1983-12-3', 'riza@hacktiv8.com', 01283012392);";

let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    });
  });
}

let seedData = () => {
  db.serialize(function() {
    db.run(SEED_DATA, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('TABLE SEEDED');
      }
    })
  })
}

replServer.context.createTable = createTable;
replServer.context.seedData = seedData;