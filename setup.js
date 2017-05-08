"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);

var CreateTableStudent = 'CREATE TABLE IF NOT EXISTS student(id integer primary key AUTOINCREMENT, first_name varchar(100), last_name varchar(100), gender varchar(25), birthdate DATE, email VARCHAR(100), phone VARCHAR);'
var Seed_Data = "INSERT INTO student(first_name,last_name,gender,birthdate,email,phone) Values('Antoni','Angga','m','1995-04-15','antoniangga14@gmail.com','081294373359')";

let replServer = repl.start({
  prompt : ">> ",
  input  : process.stdin,
  output : process.stdout
});

function BikinTable(){
    //Create TABLE
      db.serialize(function() {
        db.run(CreateTableStudent, function(err){
          if(err){
            console.log(err);
          } else{
            console.log('Create Table done');
          }
        });
      });
}

let seedData = () =>{
  db.serialize(function(){
    db.run(Seed_Data, function(err){
      if(!err){
        console.log('Insert Done');
      } else{
        console.log(err);
      }
    });
  });
}

replServer.context.BikinTable = BikinTable;
replServer.context.seedData = seedData;

// Akan KEtemu Undifined karena function yang di panggil tidak ada return;
