"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let replServer = repl.start({
  prompt: `>> `,
  input: process.stdin,
  output: process.stdout
});

var file = 'student.db';
var db = new sqlite.Database(file);

// SQL Statement
var CREATE_TABLE = `CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR (25), birthday DATE, email VARCHAR(100), phone VARCHAR)`;
var SEED_DATA = `INSERT INTO student (first_name, last_name, gender, birthday, email, phone) VALUES ('Rubi', 'Henjaya', 'male', '1986-11-20', 'rubi@hacktiv.com', '1234567'), ('Riza', 'Fahmi', 'male', '1983-12-31', 'riza@hacktiv.com', '1234568');`;

// CREATE_TABLE
let createTable = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // Create table
    db.run(CREATE_TABLE,function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`CREATE TABLE`);
      }
    });
  });
}

// SEED_DATA
let seedData = () => {
  db.serialize(function() {
    db.run(SEED_DATA, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`DATA INSERTED`);
      }
    });
  });
}

replServer.context.createTable = createTable;
replServer.context.seedData = seedData;
