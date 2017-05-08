"use strict"
const repl = require('repl')
const sqlite = require('sqlite3').verbose()
const fs = require('fs')
var file = 'student.db'
var db = new sqlite.Database(file)
//write your code here

let replServer = repl.start({
  prompt: '-->',
  input: process.stdin,
  output: process.stdout
})

function create_table () {
  let createTable = `CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(50), birthdate DATE, email VARCHAR(100), phone VARCHAR(20));`
  db.serialize(function() {
    db.run(createTable, function(err) {
      if (!err){
        console.log('create table is sucess');
      } else {
        console.log(err)
      }
    })
  })
}

function seed_data() {
  let seedData = `INSERT INTO student (first_name, last_name, gender, birthdate, email, phone) VALUES ('deri', 'kurniawan', 'laki-laki', '1983-12-3', 'deri@gmail.com', '085719012371');`
  db.serialize(function() {
    db.run(seedData, function(err){
      if (!err){
        console.log(`insert data sucess`);
      }else {
        console.log(err)
      }
    })
  })
}

replServer.context.create_table = create_table;
replServer.context.seed_data = seed_data;
