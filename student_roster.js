"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('student.db')

let replServer = repl.start({
  prompt: '-->',
  input: process.stdin,
  output: process.stdout
})

// write your code here

class Student {
  constructor(){

  }

  help() {
    console.log('welcome to student database');
    console.log('=========================================================================');
    console.log('1. add(first_name, last_name, gender, birthdate, email, phone)');
    console.log('2. update(id, first_name, last_name, gender, birthdate, email, phone)');
    console.log('3. delete(id)');
    console.log('4. read_all()');
    console.log('5. read_by_name(<--1. first_name || 2. last_name-->, name)');
    console.log('6. read_by_conditions(<--1. first_name-->\n<--2. last_name-->\n<--3. gender-->\n<--5. birthdate-->\n<--6. email-->\n<--7. phone-->, data)');
    console.log('7. read_by_birthmonth()');
    console.log('8. read_by_birthday()');
    console.log('==========================================================================');
  }

  add(first_name, last_name, gender, birthdate, email, phone) {
    let addData = `INSERT INTO student (first_name, last_name, gender, birthdate, email, phone) VALUES ('${first_name}', '${last_name}', '${gender}', '${birthdate}', '${email}', '${phone}');`
    db.serialize(function() {
      db.run(addData, (err) =>{
        if (!err){
          console.log(`Insert into table sucess`)
        } else {
          console.log(err);
        }
      })
    })
  }

  update(id, first_name, last_name, gender, birthdate, email, phone) {
    let updateData = `UPDATE student SET first_name = '${first_name}', 'last_name = ${last_name}', 'gender = ${gender}', birthdate = '${birthdate}', email = '${email}', phone = ${phone} WHERE id = ${id};`
    db.serialize(function() {
      db.run(updateData, (err) => {
        if (!err) {
          console.log(`update data id: ${id} berhasil`)
        } else {
          console.log(err)
        }
      })
    })
  }

  delete_data(id) {
    let deleteData = `DELETE FROM student WHERE id = ${id};`
    db.serialize(function() {
      db.run(deleteData, (err) => {
        if (!err) {
          console.log(`delete data id : ${id} berhasil`)
        } else {
          console.log(err)
        }
      })
    })
  }

  read_all() {
    let readAll = `SELECT * FROM student;`
    db.serialize(function() {
      db.all(readAll, (err, rows) => {
        if (!err){
          console.log(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  read_by_name(params, name){
    if (params === 1){
      let readByName = `SELECT * FROM student WHERE first_name = '${name}'`
    } else {
      let readByName = `SELECT * FROM student WHERE last_name = '${name}'`
    }
    db.serialize(function() {
      db.all(readByName, (err, rows) => {
        if (!err) {
          console.log(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  read_by_conditions(params, data){
    let readByConditions = ``
    if (params === 1){
      readByConditions = `SELECT * FROM student WHERE id = ${data};`
    } else if (params === 2){
      readByConditions = `SELECT * FROM student WHERE first_name = '${data}';`
    } else if (params === 3){
      readByConditions = `SELECT * FROM student WHERE last_name = '${data}';`
    } else if (params === 4){
      readByConditions = `SELECT * FROM student WHERE gender = '${data}';`
    } else if (params === 5){
      readByConditions = `SELECT * FROM student WHERE birtdate = '${data}';`
    } else if (params === 6){
      readByConditions = `SELECT * FROM student WHERE email = '${data}';`
    } else {
      readByConditions = `SELECT * FROM student WHERE phone = '${data}';`
    }
    db.serialize(function() {
      db.all(readByConditions, (err, rows) => {
        if (!err){
          console.log(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  read_by_birthmonth(){
    let readByBirthMonth = `SELECT * FROM student WHERE strftime('%m', birthdate) = strftime('%m', 'now');`
    db.serialize(function() {
      db.each(readByBirthMonth, (err, rows) => {
        if (!err){
          console.log(rows)
        } else {
          console.log(err)
        }
        // rows.forEach((element)=>{
        //   console.log(`${element.id} | ${element.first_name} | ${element.last_name} | ${element.gender} | ${element.birthdate} | ${element.email} | ${element. phone}`);
        // })
      })
    })
  }

  read_by_birthday() {
    let readByBirthday = `SELECT * FROM student ORDER BY strftime('%m', date(birthdate)), strftime('%d', date(birthdate)) asc;`
    db.serialize(function() {
      db.each(readByBirthday, (err, rows) => {
        if (!err){
          console.log(rows)
        } else {
          console.log(err)
        }
      })
    })
  }
}

let student = new Student();
replServer.context.help = student.help();
replServer.context.add = student.add;
replServer.context.update = student.update;
replServer.context.delete_data = student.delete_data;
replServer.context.read_all = student.read_all;
replServer.context.read_by_name = student.read_by_name;
replServer.context.read_by_conditions = student.read_by_conditions;
replServer.context.read_by_birthmonth = student.read_by_birthmonth;
replServer.context.read_by_birthday = student.read_by_birthday;
