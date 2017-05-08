"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var db = new sqlite.Database('student.db')
// write your code here
class Student {
  constructor(){
  }

  help(){
    console.log(`---------------RULES INPUT---------------\n1. addData(firstname, lastname, gender, birthday, email, phone)\n2. updateById(id, firstname, lastname, gender, birthday, email, phone)\n3. deleteData(id)\n4. showAll()\n5. showByName(firstname)\n6. showByAttributes(attributes, input)\n+++++attributes+++++\ninput a number as bellow :\n[1] show by attributes firstname\n[2] show by attributes lastname\n[3] show by attributes gender\n[4] show by attributes birthday\n[5] show by attributes email\n[6] show by attributes phone\n7. showBirthday()\n8. showBirthdayAsc()`);
  }

  addData(firstname, lastname, gender, birthday, email, phone){
    var SEED_DATA  = `INSERT INTO student (first_name, last_name, gender, birthday, email, phone) VALUES ('${firstname}', '${lastname}', '${gender}', '${birthday}', '${email}', '${phone}')`;
    db.serialize(function(){
      db.run(SEED_DATA, function(err){
        if (!err){
          console.log('ADD DATA SUCCESFULL');
        } else {
          console.log('THERE IS SOME MISTAKE WITH YOU\'R INPUT');
        }
      })
    })
  }

  updateById(id, firstname, lastname, gender, birthday, email, phone){
    var UPDATE_DATA = `UPDATE student SET first_name = '${firstname}',last_name = '${lastname}',gender = '${gender}',birthday = '${birthday}',email = '${email}',phone = '${phone}' WHERE id = '${id}'`;
    db.serialize(function(){
      db.run(UPDATE_DATA, function(err){
        if(!err) {
          console.log(`UPDATE DATA FOR ID : ${id} SUCCESFULL`);
        } else {
          console.log('THERE IS SOME MISTAKE WITH YOU\'R INPUT');
        }
      })
    })
  }

  deleteData(id){
    var DELETE_DATA = `DELETE FROM student WHERE id = ${id}`
    db.serialize(()=>{
      db.run(DELETE_DATA, (err)=>{
        if(!err) {
          console.log(`DELETE DATA WHERE ID :${id}`);
        }
      })
    })
  }

  showAll(){
    var SHOW_ALL = `SELECT * FROM student`;
    db.serialize(()=>{
      db.all(SHOW_ALL, (err, rows)=>{
        if(!err){
          console.log(rows);
        }
      })
    })
  }

  showByName(firstname){
    var SHOW_BY_NAME = `SELECT first_name, last_name FROM student WHERE first_name = '${firstname}'`
    db.serialize(()=>{
      db.all(SHOW_BY_NAME, (err, rows)=>{
        if(!err){
          console.log(rows);
        }
      })
    })
  }

  showByAttributes(attributes, input){
    var coloumn = ''
    if (attributes == 1) {
      coloumn = 'first_name';
    } else if (attributes == 2) {
      coloumn = 'last_name';
    } else if (attributes == 3) {
      coloumn = 'gender'
    } else if (attributes == 4) {
      coloumn = 'birthday'
    } else if (attributes == 5) {
      coloumn = 'email'
    } else if (attributes == 6) {
      coloumn = 'phone'
    }
    var SHOW_BY_ATTRIBUTES = `SELECT first_name, last_name FROM student WHERE ${coloumn} = '${input}'`
    db.serialize(()=>{
      db.all(SHOW_BY_ATTRIBUTES, (err, rows)=>{
        if(!err){
          console.log(rows);
        }
      })
    })
  }

  showBirthday(){
    let date = new Date().toISOString();
    let regex = /-(\d{2})-/g
    let validData = date.split(regex)
    let now = validData[1].toString();
    let SHOW_BIRTH_DAY = `SELECT first_name FROM student WHERE strftime('%m', birthday) = '${now}'`
    db.serialize(()=>{
      db.all(SHOW_BIRTH_DAY, (err, rows)=>{
        if(!err){
          console.log(rows);
        } else {
          console.log('ada yang salah');
        }
      })
    })
  }

  showBirthdayAsc(){
    let SHOW_BIRTH_ASC = `SELECT * FROM student ORDER BY strftime('%m-%d', birthday) ASC`;
    db.serialize(()=>{
      db.all(SHOW_BIRTH_ASC, (err, rows)=>{
        if(!err){
          console.log(rows);
        } else {
          console.log('ada yang salah');
        }
      })
    })
  }
}

const replServer = repl.start({prompt :'> '});

let student = new Student();
replServer.context.addData = student.addData;
replServer.context.updateById = student.updateById;
replServer.context.deleteData = student.deleteData;
replServer.context.showAll = student.showAll;
replServer.context.showByName = student.showByName;
replServer.context.showByAttributes = student.showByAttributes;
replServer.context.showBirthday = student.showBirthday;
replServer.context.showBirthdayAsc = student.showBirthdayAsc;
replServer.context.help = student.help();
