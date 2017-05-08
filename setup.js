"use strict"
//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let replserver = repl.start({
  prompt: '\(\~\'\,\'\)\~  ',
  input: process.stdin,
  output: process.stdout
})

var file = 'student.db';
var db = new sqlite.Database(file);

//SQL statement
var create_Table = 'CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(100), lastname VARCHAR(100), gender VARCHAR(25), birthday DATE, email VARCHAR(100), phone VARCHAR)';
var dataDummy = [`('Rubi', 'Henjaya', 'Male', '1986-11-20', 'rubikon@gmail.com', '0809-8-9999'), `,
`('Riza', 'Fahmi', 'Male', '1983-12-31', 'rifahmi@rocketmail.com', '0817-5649-879')`,
`('Aurelia', 'Monica', 'Female', '1992-5-14'), 'monicantiq@gmail.com', '0878-7898-365')`,
`('Rini', 'Nur Aggraeni', 'Female', '1994-8-24', 'kemaririni@gmail.com', '0812-4569-2323')`,
`('Isyana', 'Sarasvati', 'Female', '1993-8-5', 'isyanajauhjauh@gmail.com', '0852-5354-5556')`]
var seed_data = `INSERT INTO student (firstname, lastname, gender, birthday, email, phone) VALUES ('Rubi', 'Henjaya', 'Male', '1986-11-20', 'rubikon@gmail.com', '0809-8-9999'), ('Riza', 'Fahmi', 'Male', '1983-12-31', 'rifahmi@rocketmail.com', '0817-5649-879'), ('Aurelia', 'Monica', 'Female', '1992-5-14', 'monicantiq@gmail.com', '0878-7898-365'), ('Rini', 'Nur Aggraeni', 'Female', '1994-8-24', 'kemaririni@gmail.com', '0812-4569-2323'), ('Isyana', 'Sarasvati', 'Female', '1993-8-5', 'isyanajauhjauh@gmail.com', '0852-5354-5556');`;

//CREATE TABLE
let createTable = () => {
  db.serialize(function () {
    db.run(create_Table, function(err) {
      if (err) {
        console.log('err');
      } else {
        console.log('CREATE TABLE');
      }
    });
  });
}

//SEED DATA
let seedData = () => {
  db.serialize(function () {
    db.run(seed_data, function(err) {
      if (err) {
        console.log('err');
      } else {
        console.log('INSERT DATA');
      }
    });
  });
}

replserver.context.buat = createTable;
replserver.context.tambah = seedData;