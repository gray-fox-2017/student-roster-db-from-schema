"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
//import db from "./setup.js"

let file = 'student.db'
let db = new sqlite.Database(file)
var Table = require('cli-table2');

// instantiate
var table = new Table({
    head: ['ID', 'FIRST NAME', 'LAST NAME', 'GENDER', 'BIRTDHDAY', 'EMAIL', 'PHONE']
  , colWidths: [5, 15, 15, 15, 15, 35, 15]
});

var table3 = new Table({
    head: ['ID', 'FIRST NAME', 'LAST NAME', 'GENDER', 'BIRTDHDAY', 'EMAIL', 'PHONE', 'NEW']
  , colWidths: [5, 15, 15, 15, 15, 35, 15, 15]
});

var table2 = new Table({
    head: ['FIRST NAME', 'LAST NAME']
  , colWidths: [15,15]
});
// write your code here
class Student {
  constructor() {


  }

  create(first_name, last_name, gender, birthday, email, phone) {
    db.serialize(function() {
      let q = `INSERT INTO  murid (first_name, last_name, gender, birthday, email, phone) VALUES
                               ('${first_name}','${last_name}','${gender}',${birthday},'${email}','${phone}')`
      db.run(q, (err) => {
        if (!err) {
          console.log('insert data success!');
        } else {
          console.log('Failed :'+err);
        }
      })
    })
  }

  read() {
    db.serialize(function() {
      let q = `SELECT * FROM murid`
      db.all(q, (err, rows) => {
        if (!err) {
          // let temp = JSON.stringify(rows)
          // console.log('read data success!\n'+temp);
          rows.forEach((value) => {
            //console.log('\n');
            table.push([value.id,
                        value.first_name,
                        value.last_name,
                        value.gender,
                        value.birthday,
                        value.email,
                        value.phone])


            //console.log(`\nfirst_name | last_name`);
            //console.log(`${value.id} | ${value.first_name} | ${value.last_name} | ${value.gender} | ${value.birthday} | ${value.email} | ${value.phone}`);
            //console.log(value.id +'|'+ value.first_name);
          })
          console.log('\n');
          console.log(table.toString());
        } else {
          console.log('failed: '+err);
        }
      })
    })
  }
  /*
  * UPDATE table_name
  * SET column1 = value1, column2 = value2, ...
  * WHERE condition;
  */
  update(id, first_name, last_name, gender, birthday, email, phone) {
    db.serialize(function() {
      let q = `UPDATE murid
               SET first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}',
                   birthday = ${birthday}, email = '${email}', phone = '${phone}'
               WHERE id = ${id}`
      db.run(q, (err) => {
        if(!err) {
          console.log('Update success!');
        } else {
          console.log(err);
        }
      })
    })
  }
  /*
  * DELETE FROM table_name
  * WHERE condition;
  */
  //dalam javascript delete itu adalah sebuah fungsi didalam  js
  delete_data(id) {
    db.serialize(function() {
      let q = `DELETE FROM murid WHERE id = ${id}`
      db.run(q, (err) => {
        if (!err) {
          console.log("Delete success!!");
        } else {
          console.log(err);
        }
      })
    })
  }

  search_byName(name) {
    db.serialize(function() {
      let q = `SELECT first_name, last_name FROM murid WHERE first_name like '%${name}%' or last_name like '%${name}%'`
      db.all(q, (err , rows) => {
        if(!err) {
          //let temp = JSON.stringify(rows)
          rows.forEach((value) => {
            table2.push([value.first_name,
                        value.last_name])
            //console.log(`\nResult : ${value.first_name} | ${value.last_name}`);
          })
          console.log('\n');
          console.log(table.toString());
          //console.log('read data success!');
          //console.log(rows);

        } else {
          console.log(err);
        }
      })
    })
  }

  search_byAttribute(attribute, value) {
    db.serialize(function() {
      let q = `SELECT * FROM murid WHERE ${attribute} like '%${value}%'`
      db.all(q, (err , rows) => {
        if(!err) {
          //let temp = JSON.stringify(rows)
          rows.forEach((value) => {
            console.log(`\nResult : ${value.id} | ${value.first_name} | ${value.last_name} | ${value.gender} | ${value.birthday} | ${value.email} | ${value.phone}`);
          })
          //console.log('read data success!');
          //console.log(rows);

        } else {
          console.log(err);
        }
      })
    })
  }

  list_birthday() {
    db.serialize(function() {
       let date = new Date()
       let bulan = date.getMonth()+1
       let str = bulan.toString()
       let hasil = '0'+str;
      // let birthday = `SELECT birthday FROM murid`
      // let tamp = birthday.getMonth()
      let q = `SELECT * FROM murid WHERE strftime('%m', birthday) = '${hasil}'`
      db.all(q, (err, rows) => {
        if(!err) {
          rows.forEach((value) => {
            table3.push([value.id,
                        value.first_name,
                        value.last_name,
                        value.gender,
                        value.birthday,
                        value.email,
                        value.phone])
            //console.log(`\nResult : ${value.first_name} | ${value.last_name}`);
          })
          console.log('\n');
          console.log(table.toString());
        } else {
          console.log("gagal : "+err);
        }
      })
    })
  }

  list_birthday_asc() {
    db.serialize(function () {
      let q = `SELECT *,strftime('%m-%d', birthday) as newBirthDay FROM murid ORDER BY newBirthDay`
      db.all(q, (err, rows) => {
        if(!err) {
          rows.forEach((value) => {
            table.push([value.id,
                        value.first_name,
                        value.last_name,
                        value.gender,
                        value.birthday,
                        value.email,
                        value.phone,
                        value.newBirthDay])
            //console.log(`\nResult : ${value.first_name} | ${value.last_name}`);
          })
          console.log('\n');
          console.log(table.toString());
        } else {
          console.log("gagal : "+err);
        }
      })
    })
  }

  help() {
    console.log('\n');
    console.log('===========================================================================================');
    console.log('                                       MENU HELP                                           ');
    console.log('===========================================================================================');
    console.log('type :');
    console.log('     create()                                                              : to add student');
    console.log('     read()                                                        : to read all of student');
    console.log('     update()                                                  : to update value of student');
    console.log('     delete_data()                                        : to delete data of student by id');
    console.log('     search_byName()                  : to read first_name and last_name of student by name');
    console.log('     search_byAttribute()                            : to read data by attribute of student');
    console.log('     list_birthday()                    : to read data student those birthday in this month');
    console.log('     list_birthday_asc()                   : to read data sort by month and day of birthday');
    console.log('===========================================================================================');
  }

}
let replServer = repl.start({
  prompt : '>>',
  input  : process.stdin,
  output : process.stdout

})


let run = new Student()
replServer.context.help = run.help()
replServer.context.create = run.create
replServer.context.read = run.read
replServer.context.update = run.update
replServer.context.delete_data = run.delete_data
replServer.context.search_byName = run.search_byName
replServer.context.search_byAttribute = run.search_byAttribute
replServer.context.list_birthday = run.list_birthday
replServer.context.list_birthday_asc = run.list_birthday_asc