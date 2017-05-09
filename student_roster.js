"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
var replServer = repl.start({
  prompt: ">> ",
  input: process.stdin,
  output: process.stdout
})
var file = 'student.db';
var db = new sqlite.Database(file);

class Student {
  constructor() {}

  run(query) {
    db.serialize(function() {
      db.run(query, function(err) {
        if(err) {
          console.log(err);
        }
      })
    });
  }

  read(query) {
    db.all(query, (err, rows) => {
      if(!err) console.log(rows);
    })
  }

  addStudent(first, last, gender, birthdate, email, phone) {
    let query = `INSERT INTO student(firstname, lastname, gender, birthdate, email, phone) VALUES ('${first}', '${last}', '${gender}', '${birthdate}', '${email}', '${phone}');`;
    this.run(query);
  }

  updateStudent(id, changedFirst, changedLast, changedGender, changedBirth, changedEmail, changedPhone) {
    let query = `UPDATE student SET firstname = '${changedFirst}', lastname = '${changedLast}', birthdate = '${changedBirth}', gender = '${changedGender}', email = '${changedEmail}', phone = ${changedPhone} WHERE id = ${id};`;
    this.run(query);
  }

  deleteStudent(id) {
    let query = `DELETE FROM student WHERE id = ${id};`;
    this.run(query);
  }

  studentList() {
    let query = 'SELECT * FROM student;';
    this.read(query);
  }

  displayStudent(name) {
    let query = `SELECT * FROM student WHERE firstname = '${name}' OR lastname = '${name}';`;
    this.read(query);
  }

  find(attribute, value) {
    let query = `SELECT * FROM student WHERE ${attribute} = '${value}';`;
    this.read(query);
  }

  thisMonth() {
    let query = `SELECT * FROM student WHERE strftime('%m',birthdate) = strftime('%m',date('now'));`;
    this.read(query);
  }

  orderBirthday() {
    let query = `SELECT * FROM student ORDER BY strftime('%m%d', birthdate) asc;`;
    this.read(query);
  }
}

let student = new Student();
replServer.context.student = student;
// replServer.context.addStudent = student.addStudent;
// replServer.context.updateStudent = student.updateStudent;
// replServer.context.deleteStudent = student.deleteStudent;
// replServer.context.studentList = student.studentList;
// replServer.context.displayStudent = student.displayStudent;
// replServer.context.find = student.find;
// replServer.context.thisMonth = student.thisMonth;
// replServer.context.orderBirthday = student.orderBirthday;

// let cobatanggal = new Date();
// console.log(cobatanggal.getMonth())
let help = () => {
  console.log('======================HELP MENU======================');
  console.log('Every function requires you to type "student" as prefix, e.g: student.addStudent()\n');
  console.log('List of function:')
  console.log('1. To add new student use <addStudent()> with parameter of its attribute(firstname, lastname, gender, birthdate, email, phone)');
  console.log('2. To update existing student data use <updateStudent()> with parameter of its id number and other attribute');
  console.log('3. To delete existing record, use <deleteStudent()> with its id number parameter');
  console.log('4. To display current record, use <studentList()> with no parameter');
  console.log('5. To find a record with name(first or last), use <displayStudent()> with its id number as parameter');
  console.log('6. To find record with a custom attribute, use <find()> with attribute name and value as the parameter');
  console.log('7. To display student who have birthday on this month, use <thisMonth()> with no parameter');
  console.log('8. To display current record ordered by birthdate (day and month), use <orderBirthday()> with no parameter')
}
replServer.context.help = help;