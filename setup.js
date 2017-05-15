"use strict"
const sqlite3 = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite3.Database(file);

//Initialize REPLServer
const repl = require('repl');
let REPLServer = repl.start({prompt : '> '});

//SQL Statement
var CREATE_TABLE = "CREATE TABLE students ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100), birthdate DATE, email VARCHAR(100), phone VARCHAR);";
var SEED_DATA = "INSERT INTO students (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza','Fahmi','1983-12-3');";

//CREATE_TABLE
let createTable = () =>{
  //Run SQL one at a time
  db.serialize(function(){
    //Create TABLE
    db.run(CREATE_TABLE, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('CREATE_TABLE');
      }
    });
  });
}

// SEED_DATA
let seedData = () => {
  //Run SQL one at a time
  db.serialize(function(){
    //SEED_DATA
    db.run(SEED_DATA, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('SEED_DATA');
      }
    });
  });
}

REPLServer.context.create_table = createTable;
REPLServer.context.seed_data = seedData;
