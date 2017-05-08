"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'student.db';
let db = new sqlite.Database(file);

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NUlL,gender VARCHAR(25), birthdate DATE, email VARCHAR(100), PHONE VARCHAR(20))";
let SEED_DATA = "INSERT INTO student(first_name,last_name,birthdate,gender,email,phone) VALUES('Siu','Lu','1993-07-11','Male','siulu@gmail.com','6285813372797'), ('Lycaa','','1999-03-30','Female','lycaa@live.com','6215642591')";

// write your code here
let createTable = () => {
  //RUN SQL one at a time
  db.serialize(function(){
    db.run(CREATE_TABLE, function(err){
      if(err) {
        console.log(err);
      } else {
        console.log('CREATE_TABLE');
      }
    })
  });
}

let seedData = () => {

}

module.exports = {createTable, seedData};