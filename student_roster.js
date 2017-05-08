"use strict"
//Import required modules
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// Class
class Student {
  constructor() {
    this.REPLServer = repl.start({prompt : '> '});
    this.query = "";
    this.REPLServer.context.add_student = this.add_student;
    this.REPLServer.context.update_student = this.update_student;
    this.REPLServer.context.delete_student = this.delete_student;
    this.REPLServer.context.list_all_student = this.list_all_student;
    this.REPLServer.context.list_student_by_name = this.list_student_by_name;
    this.REPLServer.context.list_student_by_attr = this.list_student_by_attr;
    this.REPLServer.context.list_this_month_birthday = this.list_this_month_birthday;
    this.REPLServer.context.sort_birthday = this.sort_birthday;
    this.showMenu();
  }
  //Add students
  add_student(firstname, lastname, birthdate){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var INSERT_QUERY = `INSERT INTO students (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}');`;
    db.serialize(function(){
      db.run(INSERT_QUERY, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Add Student Succesfull');
        }
      });
    });
  }

  //Update student based by ID
  update_student(id, firstname, lastname, birthdate){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var UPDATE_QUERY = `UPDATE students SET firstname='${firstname}',lastname='${lastname}',birthdate='${birthdate}' WHERE id='${id}'`;
    db.serialize(function(){
      db.run(UPDATE_QUERY, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Update Student Data Succesfull');
        }
      });
    });
  }

  //Delete student based by id
  delete_student(id){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var DELETE_QUERY = `DELETE FROM students WHERE id='${id}' `;
    db.serialize(function(){
      db.run(DELETE_QUERY, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Delete Student Data Succesfull');
        }
      });
    });
  }
  //LIST ALL STUDENT
  list_all_student(){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var LIST_ALL_QUERY = `SELECT * FROM students`;
    db.serialize(function(){
        db.each(LIST_ALL_QUERY, function(err, row){if (err){
          console.log(err);
        } else {
          console.log(row.id, row.firstname, row.lastname, row.birthdate);
        }
      });
    });
  }

  //List student by name
  list_student_by_name(search_by_name){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var LIST_BY_NAME = `SELECT * FROM students WHERE firstname LIKE '${search_by_name}' OR lastname LIKE '${search_by_name}'`;
    db.serialize(function(){
      //db.run(LIST_ALL_QUERY, function(err){
        db.each(LIST_BY_NAME, function(err, row){if (err){
          console.log(err);
        } else {
          console.log(row.id, row.firstname, row.lastname, row.birthdate);
        }
      });
    });
  }
  //LIST BY ATTR
  list_student_by_attr(attribute, value){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var LIST_BY_ATRR = `SELECT * FROM students WHERE ${attribute} = '${value}'`;
    db.serialize(function(){
        db.each(LIST_BY_ATRR, function(err, row){if (err){
          console.log(err);
        } else {
          console.log(row.id, row.firstname, row.lastname, row.birthdate);
        }
      });
    });
  }
  //List this month birthday
  list_this_month_birthday(){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var LIST_MONTH_BIRTHDAY = `SELECT * FROM students where strftime('%m',birthdate)=strftime('%m','now') ;`;
    db.serialize(function(){
        db.each(LIST_MONTH_BIRTHDAY, function(err, row){if (err){
          console.log(err);
        } else {
          console.log(row.id, row.firstname, row.lastname, row.birthdate);
        }
      });
    });
  }
  //Sort Birthday
  sort_birthday(){
    let file = 'student.db';
    let db = new sqlite.Database(file);
    var SORT_BIRTHDAY = `SELECT * FROM students ORDER BY strftime('%m',birthdate),strftime('%d',birthdate);`;
    db.serialize(function(){
        db.each(SORT_BIRTHDAY, function(err, row){if (err){
          console.log(err);
        } else {
          console.log(row.id, row.firstname, row.lastname, row.birthdate);
        }
      });
    });
  }

  showMenu() {
    console.log(`WELCOME!!`);
    console.log(`- Menambahkan Student : add_student('[firstname]','[lastname]','[Year-Month-Day]')`);
    console.log(`- Update data student berdasarkan id : update_student('[id]','[firstname]','[lastname]','[Year-Month-Day]')`);
    console.log(`- Menghapus student berdasarkan id : delete_student([id])`);
    console.log(`- Menampilkan daftar semua student : list_all_student()`);
    console.log(`- Menampilkan student berdasarkan name tertentu, pilih salah satu untuk nama depan atau nama belakang : list_student_by_name('[firstname || lastname]')`);
    console.log(`- Menampilkan student dengan sesui atribut search yang diinginkan : list_student_by_attr(['attribute'],['value'])`);
    console.log(`- Menampilkan student yang berulang tahun bulan ini : list_this_month_birthday()`);
    console.log(`- Menampilkan urutan semua student berdasarkan ulang tahun : sort_birthday()`);
}

}

let student_roster = new Student();
