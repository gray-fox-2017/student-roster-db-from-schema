"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let replServer = repl.start({
  prompt: `>> `,
  input: process.stdin,
  output: process.stdout
});

var file = 'student.db';
var db = new sqlite.Database(file);

class Student {
  constructor() {}

  run(query) {
    db.serialize(function() {
      db.run(query, (err) => {
        if (err) console.log(err);
      });
    });
  }
  all(query) {
    db.serialize(function() {
      db.all(query, (err, rows) => {
        if (!err) console.log(rows);
      });
    });
  }
  add(firstname, lastname, gender, birthday, email, phone) {
    let query = `INSERT INTO student (first_name,last_name,gender,birthday,email,phone) VALUES ('${firstname}','${lastname}','${gender}','${birthday}','${email}','${phone}')`;
    this.run(query);
  }

  update(id, firstname, lastname, gender, birthday, email, phone) {
    let query = `UPDATE student
    SET first_name = '${firstname}', last_name = '${lastname}',  gender = '${gender}', birthday = '${birthday}', email = '${email}', phone = '${phone}'
    WHERE id = ${id};`;
    this.run(query);
  }

  delete(id) {
    let query = `DELETE FROM student
    WHERE id = ${id};`;
    this.run(query);
  }

  showTable() {
    let query = `SELECT * FROM student;`;
    this.all(query);
  }

  showName(name) {
    let query = `SELECT * FROM student
    WHERE first_name = '${name}' OR last_name = '${name}';`;
    this.all(query);
  }

  findAttribute(attribute, value) {
    let query = `SELECT * FROM student
    WHERE ${attribute} = '${value}';`;
    this.all(query);
  }

  birthdayThisMonth() {
    let query = `SELECT * FROM student
    WHERE strftime('%m', birthday) = strftime('%m','now');`;
    this.all(query);
  }

  orderByBirthday() {
    let query = `SELECT * FROM student
    ORDER BY strftime('%m',birthday),strftime('%d',birthday) ASC;`;
    this.all(query);
  }

  help () {
    console.log(`DOCUMENTATION \n
    student.add(firstname, lastname, gender, birthday, email, phone) -> to add a student record to the database. \n
    student.update(id, firstname, lastname, gender, birthday, email, phone) -> to update data in the student record. \n
    student.delete(id) -> delete data of the student. \n
    student.showTable() -> show the database. \n
    student.showName(name) -> show the data of some students with the same name (either last or first name). \n
    student.findAttribute(attribute,value) -> show a certain data, e.g. attrbute = first_name, value = 'riza' to find the record of student whose last name is riza. \n
    student.birthdayThisMonth() -> show students that are going to have birthday this month. \n
    student.orderByBirthday() -> show database order by birthday. \n`);
  }
}

replServer.context.student = new Student;

