"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('data.db')

let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT(50) NOT NULL, lastName TEXT(50), birthDate DATE)`;
let SEED_DATA1 = `INSERT INTO students(firstName,lastName,birthDate) VALUES('Rubi','Henjaya','1986-11-20'),('Riza','Fahmi','1983-12-31')`

function createTable(){
  db.serialize(()=>{
    db.run(CREATE_TABLE,(err)=>{
      if(!err){
        console.log('table created');
      } else {
        console.log(err);
      }
    })
  })
}

function seedData(){
  db.serialize(()=>{
    db.run(SEED_DATA1,(err)=>{
      if(!err){
        console.log('table seeded');
      } else {
        console.log(err);
      }

    })
  })
}

createTable()
seedData()