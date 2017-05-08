"use strict"

//write your code here

const repl = require('repl')
const sqlite = require('sqlite3').verbose()

let file = 'student.db'
let db = new sqlite.Database(file)

//sql statement
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS murid (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT, gender TEXT, birthday DATE, email TEXT, phone TEXT);";
let SEED_DATA = "INSERT INTO murid (first_name, last_name, gender, birthday, email, phone) VALUES ('Erwin','Ramadhan','laki-laki',17-02-1995,'erwin@gmail.com','082242361317');";
//
//create table
let createTable = () => {
  //run sql one at a time
  db.serialize(function() {
    //create TABLE
    db.run(CREATE_TABLE, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('success createTable!');
      }
    })
    return true
  })
}

let seedData = ()=> {
  db.serialize(function() {
    db.run(SEED_DATA, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('success seedData');
      }
    })
    return true
  })
}

let replServer =   repl.start({
  prompt : '>>',
  input  : process.stdin,
  output : process.stdout

})

replServer.context.createTable = createTable;
replServer.context.seedData = seedData;