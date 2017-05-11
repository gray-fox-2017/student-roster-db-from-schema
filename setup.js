"use strict"

//write your code here
const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite3.Database(file);

//SQl Statement
var CREATE_TABEL = "CREATE TABLE students(Id Integer Primary Key,first_name VARCHAR(100), last_name VARCHAR(100), gender varchar(25),birthday Date, email VARCHAR(100),phone VARCHAR)";

var SEED_DATA = "INSERT INTO students (Id,first_name,last_name,gender,birthday,email,phone) VALUES (01,'Jumadi', 'Akhmad', 'Male', 1991-02-27,'jumadialkhmad2@gmail.com', 081380515932),(02,'Ade', 'Nugraha','Male', 1990-06-21,'adenugraha2@gmail.com',081312311322)";

const replServer = repl.start({
  prompt: '>',
  input : process.stdin,
  output : process.stdout
});


//CREATE_TABEL
let createTabel = () => {
  //Run SQL One at a time
  db.serialize(function () {
    //create tabel
    db.run(CREATE_TABEL, function(err) {
      if(err){
        console.log(err);
      } else {
        console.log('CREATE TABEL');
      }
    })
  })

}

let seedData = () => {
  db.serialize(function () {
    //create tabel
    db.run(SEED_DATA, function(err) {
      if(err){
        console.log(err);
      } else {
        console.log('INSERT VALUE');
      }
    })
  })
}


replServer.context.createTabel=createTabel;
replServer.context.seedData=seedData;
