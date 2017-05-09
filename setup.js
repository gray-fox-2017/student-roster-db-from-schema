"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite.Database(file);
let replServer = repl.start({prompt : ' $$ '});

//SQL Statement
var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEX NOT NULL, lastname TEXT, gender TEXT, email VARCHAR,birtdate DATE)";
var SEED_DATA = "INSERT INTO student (firstname, lastname, gender, email, birtdate) VALUES ('Rubi', 'Henjaya', 'Pria','rubi@gmail.com','1986-11-20'), ('Riza', 'Fahmi','Pria','riza@hacktiv8.com','1983-12-31'), ('Atong', 'Naim','Pria','atong@hacktiv8.com','1983-11-31');";

// CREATE_TABLE
let createTable = () => {
  // Run SQL one at a time
  db.serialize (function() {
    //Create table
    db.run(CREATE_TABLE, function(err) {
      if (!err) {
        console.log('insert table sukses');
      }else {
        console.log(err);
      };
    });
  });
};
replServer.context.createTable = createTable;

let seedData = () => {
//   //Your code here
db.serialize (function() {
  //Create table
  db.run(SEED_DATA, function(err) {
    if (!err) {
      console.log('seed data success');
    }else {
      console.log(err.message);
    };
  });
});
}


replServer.context.seedData = seedData;
