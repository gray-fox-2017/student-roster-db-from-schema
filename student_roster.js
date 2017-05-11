"use strict"

class Student {
  constructor() {}

  addStudent(first_name, last_name=null, birthdate=null, gender=null, email=null, phone=null) {
    // "INSERT INTO student (first_name, last_name, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";
    //  id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(100), birthdate DATE, email VARCHAR(100), phone VARCHAR(100))"
    if (first_name == null) {
      return "First name cannot empty";
    } else {
      // console.log("-------masuk--------");
      let addDetail = `INSERT INTO student (first_name, last_name, gender, birthdate, email, phone) VALUES ('${first_name}', '${last_name}', '${gender}', '${birthdate}', '${email}', '${phone}');`;
      db.serialize(function () {
        db.run(addDetail, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Student added');
          }
        });
      });
    }

  }
  updateStudent(attribute, parameter, id) {
    // var updateData = "UPDATE student SET first_name='Fajar' WHERE id = 1";
    let updateData = `UPDATE student SET ${attribute}='${parameter}' WHERE id='${id}'`
    db.serialize(function () {
      db.run(updateData, function (err) {
        if (err) {
          console.log(err);
          return 0;
        } else {
          console.log(`${attribute} student with id ${id} updated`);
          return 1;
        }
      })
    })
  }
  deleteStudent(id) {
    var deleteData = `DELETE FROM student where id = ${id}`;

    db.serialize(function () {
      db.run(deleteData, function (err) {
        if (err) {
          console.log(err);
          return 0;
        } else {
          console.log(`Student with ${id} has beed deleted`);
          return 1;
        }
      });
    });
  }
  showStudentList() {
    var readData = "SELECT * FROM student";
    db.serialize(function () {
      db.all(readData, function (err, rows) {
        if (err) {
          console.log(err);
          return 0;
        } else {
          console.log(rows);
          return 1;
        }
      })
    })
  }
  searchStudent(studentName) {
    var readData = `SELECT * FROM student WHERE first_name LIKE '%${studentName}%' OR last_name LIKE '%${studentName}%';`;
    db.serialize(function () {
      db.all(readData, function (err, rows) {
        if (err) {
          console.log(err);
          return 0;
        } else {
          console.log(rows);
          return 1;
        }
      })
    })
  }
  showInBirthdayStudent() {

    var readData = `SELECT *, strftime('%m', birthdate) as month from student where month = strftime('%m', 'now');`;
    db.serialize(function () {
      db.all(readData, function (err, rows) {
        if (err) {
          console.log(err);
          return 0;
        } else {
          console.log(rows);
          return 1;
        }
      })
    })
  }
  showSortedBirthdayStudent() {
    var readData = `SELECT *, strftime('%m', birthdate) AS new_birthday FROM student WHERE new_birthday IS NOT NULL order by new_birthday; `;
    db.serialize(function () {
      db.all(readData, function (err, rows) {
        if (err) {
          console.log(err);
          return 0;
        } else {
          console.log(rows);
          return 1;
        }
      })
    })
  }
  showHelp() {
    let sentence =
    "help() > show help \n" +
    "showall() > show all student list\n" +
    "add([first_name], [last_name], [yyyy/mm/dd]) > add student\n" +
    "update([attribute_name], [attribute_value], [id]) > update student , for example: update(birthdate,'1996-10-01', 1)\n" +
    "delete([id]) > delete data based on id\n" +
    "search([student_name]) > show student based on name\n" +
    "showinbirthday() > show in birthday student\n" +
    "sortbirthdate() > show student based on birthdate\n"
    console.log(sentence);
    return 1;
  }
}

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var murid = new Student();
var file = 'student.db';
var db = new sqlite.Database(file);

var replServer = repl.start({
  input: process.stdin,
  output: process.stdout,
  prompt: ">> "
})

replServer.context.help = murid.showHelp
replServer.context.showall = murid.showStudentList
replServer.context.add = murid.addStudent
replServer.context.update = murid.updateStudent
replServer.context.delete = murid.deleteStudent
replServer.context.search = murid.searchStudent
replServer.context.birthday = murid.showSortedBirthdayStudent
replServer.context.showinbirthday = murid.showInBirthdayStudent

// replServer.context.read = read
// replServer.context.remove = remove

// write your code here
