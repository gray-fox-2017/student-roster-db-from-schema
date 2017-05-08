"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);

var CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, gender varchar(25), birthday DATE, email VARCHAR(100), phone VARCHAR)';

var SEED_DATA = 'INSERT INTO student (firstname, lastname, gender, birthday, email, phone) VALUES ("Rubi","Henjaya","Male","1983-12-31","rubi@gmail.com","08888888888")'

let createTable = () => {
  db.serialize(function(){
    db.run(CREATE_TABLE,function(err){
      if(err){
        console.log(err);
      }
      else {
        console.log('CREATE TABLE')
      }
    })
  })
}

let seedData = () => {
  db.serialize(function(){
    db.run(SEED_DATA, function(err){
      if(err){
        console.log(err)
      }
      else {
        console.log('Successfully Added data to student');
      }
    })
  })
}

const replServer = repl.start('> ');
replServer.context.createTable = createTable()
replServer.context.seedData = seedData()