"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('data.db');
const replServer = repl.start({
  prompt:'StudentRoster>>> ',
  input:process.stdin,
  output:process.stdout
})

// write your code here
class Student {
  createStudent(firstName,lastName,birthDate){
    db.serialize(()=>{
      let query = `INSERT INTO students(firstName,lastName,birthDate) VALUES('${firstName}','${lastName}','${birthDate}')`;
      db.run(query,(err)=>{
        if(!err){
          console.log(`${firstName} ${lastName} successfully inserted`);
        } else {
          console.log(err);
        }
      })
    })
  }
  updateStudentAttribute(id,attribute,value){
    db.serialize(()=>{
      let query = `UPDATE students SET '${attribute}' = '${value}' WHERE id = ${id};`;
      db.run(query,(err)=>{
        if(!err){
          console.log(`Data successfully updated`);
        } else {
          console.log(err);
        }
      })
    })
  }
  updateStudentData(firstName,lastName,birthDate){
    db.serialize(()=>{
      let query = `UPDATE students SET '${attribute}' = '${value}' WHERE id = ${id};`;
      db.run(query,(err)=>{
        if(!err){
          console.log(`Data successfully updated`);
        } else {
          console.log(err);
        }
      })
    })
  }
  deleteStudent(id){
    db.serialize(()=>{
      let query = `DELETE FROM students WHERE id = ${id};`
      db.run(query,(err)=>{
        if(!err){
          console.log(`Data successfully deleted`);
        } else {
          console.log(err);
        }
      })
    })
  }
  list(){
    db.serialize(()=>{
      let query = `SELECT * FROM students`;
      db.all(query,(err,rows)=>{
        if(!err){
          console.log(rows);
        } else {
          console.log(err);
        }
      })
    })
  }
  listStudentFilteredByName(param){
    db.serialize(()=>{
      let query = `SELECT * FROM students WHERE firstName OR lastName LIKE '%${param}%'`;
      db.all(query,(err,rows)=>{
        if(!err){
          console.log(rows);
        } else {
          console.log(err);
        }
      })
    })
  }
  listStudentFilteredByAttribute(attribute,value){
    db.serialize(()=>{
      let query = `SELECT * FROM students WHERE '${attribute}' = '${value}'`;
      db.all(query,(err,rows)=>{
        if(!err){
          console.log(rows);
        } else {
          console.log(err);
        }
      })
    })
  }
  listStudentFilteredByBirthdayInThisMonth(month = new Date().getMonth()+1){
    db.serialize(()=>{
      let birthMonth = month
      if(birthMonth<10){
        birthMonth = '0'+birthMonth
      }
      console.log(birthMonth);
      let query = `SELECT * FROM students WHERE strftime('%m', birthDate) = '${birthMonth}'`;
      db.all(query,(err,rows)=>{
        if(!err){
          console.log(rows);
          console.log('asd');
        } else {
          console.log(err);
        }
      })
    })
  }
  listStudentSortedByBirthday(){
    db.serialize(()=>{
      let query = `SELECT * FROM students ORDER BY strftime('%m', birthDate),strftime('%d', birthDate)`;
      db.all(query,(err,rows)=>{
        if(!err){
          console.log(rows);
        } else {
          console.log(err);
        }
      })
    })
  }
  help(){
    console.log(`===============STUDENT ROSTER HELP==================
    console.log('create(<first_name>,<last_name>,<birth_date>) ====>> add student data')
    console.log('update(<id>,<attribute>,<updated_value>) ====>> update student data')
    console.log('deleteStudent(<id>) ====>> delent student data')
    console.log('list() ====>> view all students')
    console.log('name(<name>) ====>> view students with specified name')
    console.log('attribute() ====>> view students with the specified attribute')
    console.log('birthday() ====>> view students who have birthday in this month(or in specified month number 1-12)
    console.log('birthdaySorted() ====>> view students sorted by birthday')`)
  }
}

let myStudent = new Student()
// myStudent.help();
//myStudent.createStudent('Aldy','Andika','1990-07-17')
replServer.context.create = myStudent.createStudent
replServer.context.update = myStudent.updateStudentAttribute
replServer.context.deleteStudent = myStudent.deleteStudent
replServer.context.name = myStudent.listStudentFilteredByName
replServer.context.attribute = myStudent.listStudentFilteredByAttribute
replServer.context.birthday = myStudent.listStudentFilteredByBirthdayInThisMonth
replServer.context.birthdaySorted = myStudent.listStudentSortedByBirthday
replServer.context.list = myStudent.list
replServer.context.help = myStudent.help
