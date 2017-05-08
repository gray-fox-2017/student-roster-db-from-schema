"use strict"

const repl = require('repl');
const replServer = repl.start('> ');
const sqlite = require('sqlite3').verbose();

const file = 'student.db'
const db = new sqlite.Database(file);

class Student {
  constructor(){
    
  }
  
  static add(firstname,lastname,gender,birthday,email,phone){
    let query = `INSERT INTO student (firstname,lastname,gender,birthday,email,phone) VALUES ("${firstname}","${lastname}","${gender}","${birthday}","${email}","${phone}")`
    db.run(query, function(err){
      if(err){
        console.log(err);
      }
      else {
        console.log(`\n${firstname} ${lastname} Added!`);
      }
    })
  }
  
  static update(property_name,new_value,id){
    let query = `UPDATE student set "${property_name}" = "${new_value}" where id = ${id}`
    db.run(query, function(err){
      if(err){
        console.log(err)
      }
      else {
        rows.forEach((data)=>{
        console.log(`\nUpdate ${data.firstname} ${data.lastname}\n ${property_name} to ${new_value} Success!`);
        })
      }
    })
  }
  
  static deleteData(id){
    let query = `DELETE FROM student where id = '${id}'`
    db.run(query, function(err){
      if(err){
        console.log(err);
      }
      else{
        rows.forEach((data)=>{
              console.log(`\n${data.firstname} ${data.lastname} Deleted!`);  
        })  
      }
    })
  }
  
  static viewAll(){
    let query = `SELECT * FROM student`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      }
      else {
        rows.forEach((data)=>{
        console.log(`\nStudent List:\n${data.id} | ${data.firstname}| ${data.lastname} | ${data.gender} | ${data.birthday} | ${data.email} | ${data.phone}`);
        })
      }
    })
  }
  
  static name(name){
    let query = `SELECT * FROM student where firstname like "%${name}%" or lastname like "%${name}%"`
    db.all(query,function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        rows.forEach((data)=>{
          console.log(`\nSearch by name results:\n${data.id} | ${data.firstname}| ${data.lastname} | ${data.gender} | ${data.birthday} | ${data.email} | ${data.phone}`);
        })      
      }
    })
  }
  
  static birthday(month){
    let query = `SELECT * from student where strftime('%m', birthday) = "${month}"`
    db.all(query,function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        rows.forEach((data)=>{
          console.log(`\n${rows.length} students have birthday this month \n${data.id} | ${data.firstname}| ${data.lastname} | ${data.gender} | ${data.birthday} | ${data.email} | ${data.phone}`);
        })
      }
    })
  }
  
  static attribute(property,value){
    let query = `SELECT from student where "${property}" = "${value}"`
    db.all(query,function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        rows.forEach((data)=>{
          console.log(`\nSearch by Attribute results:\n${data.id} | ${data.firstname}| ${data.lastname} | ${data.gender} | ${data.birthday} | ${data.email} | ${data.phone}`);
        })
      }
    })
  }
  
  static sortbirthday(){
    let query = `SELECT * FROM student ORDER by strftime('%m', birthday);`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        rows.forEach((data)=>{
          console.log(`\nShow Students sort by birthday date:\n${data.id} | ${data.firstname}| ${data.lastname} | ${data.gender} | ${data.birthday} | ${data.email} | ${data.phone}`);
        })
      }
    })
  }
  
  static help(){
    console.log(`========== Student Database ==========`);
    console.log(`\n1) Show all student:\nstudent.viewAll()\n`)
    console.log(`\n2) Add new Student:\nstudent.add(<"firstname">,<"lastname">,<"gender">,<"birthday">,<"email">,<"phone">)\n`);  
    console.log(`\n3) Update Student data:\nstudent.update(<collumn_name>,<"new_data">,<id>)\n`);
    console.log(`\n4) Delete Student:\nstudent.deleteData(<id>)\n`);
    console.log(`\n5) Search Student by name:\nstudent.name(<"name">)\n`);
    console.log(`\n6) Search Student by attribute:\nstudent.attribute(<collumn_name>,<"collumn_value">)`);
    console.log(`\n7) Search Student by birthday month:\nstudent.birthday("month")\n`);
    console.log(`\n8) Sort Students by birthday date:\nstudent.sortbirthday()\n`);
    console.log(`\n9) Help Command:\nstudent.help()\n`);
  }

  
}


Student.help();
replServer.context.student = Student;


