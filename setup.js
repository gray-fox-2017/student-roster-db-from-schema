"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var replServer = repl.start({
  prompt:'$ '
})


var file = 'student.db'
var db = new sqlite.Database(file);

var create_table = "create table if not exists student (id INTEGER primary key autoincrement, first_name VARCHAR(100) not null,last_name VARCHAR(100),gender VARCHAR(25),birthdate DATE,email VARCHAR(100),phone VARCHAR(15));";
var seed_data = "insert into student (first_name,last_name,gender,birthdate,email,phone) values ('Rubi','Henjaya','Pria','1986-11-20','rubi@haha.com','0834234342342'),('Riza','Fahmi','Pria','1990-01-10','riza@haha.com','0857212356554');";

let createTable = () => {
  db.serialize(() => {
    db.run(create_table,err =>{
      if(err)
        console.log(err);
      else console.log('table created')
    });
  });
}


let seedData = () =>{
  db.serialize( ()=> {
    db.run(seed_data,err =>{
      if(err)
        console.log(err);
      else console.log('table seeded');
    });
  })
}

replServer.context.createTable = createTable;
replServer.context.seedTable = seedData;
