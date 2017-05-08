"use strict"

//write your code here

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);

  let createTable = () =>{
    var CREATE_TABLE = `CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(25), birthday DATE, email VARCHAR(100), phone VARCHAR)`;
    db.serialize(function(){
      db.run(CREATE_TABLE, function(err){
        if (!err){
          console.log('TABLE CREATE SUCCESFULL');
        }
      })
    })
  }

  let seedData = () =>{
    var SEED_DATA  = `INSERT INTO student (first_name, last_name, gender, birthday, email, phone) VALUES ('Rubi', 'Henjaya', 'pria', '1986-11-20', 'rubi@gmail.com', '08567899035'), ('Riza', 'Fahmi', 'pria', '1980-11-20', 'fahmi@gmail.com', '08567776035')`;
    db.serialize(function(){
      db.run(SEED_DATA, function(err){
        if (!err){
          console.log('SEED DATA SUCCESFULL');
        }
      })
    })
  }

let replServer = repl.start({prompt : ">> "})

replServer.context.createTable = createTable;
replServer.context.seedData = seedData;
