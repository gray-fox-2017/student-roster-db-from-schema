"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = 'student.db'
let db = new sqlite3.Database(file);

let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
});
// write your code here

class Student {
  constructor() {

  }

  help() {
    console.log('Type <insertData> to insert a student\'s data');
    console.log('Type <updateData> to update a student\'s data');
    console.log('Type <deleteData> to delete a student\'s data');
    console.log('Type <listData> to list all student\'s data');
    console.log('Type <listName> to list a student\'s data by name');
    console.log('Type <listBy> to list a student\'s data by whatever you like');
    console.log('Type <listMonth> to list student(s) which having birthday this month');
    console.log('Type <listSorted> to sort students data by birthdate');
  }

  insertData(first_name, last_name, gender, birthday, email, phone) {
    db.serialize(function() {
      let query = `INSERT INTO student (first_name, last_name, gender, birthday, email, phone) VALUES ('${first_name}', '${last_name}', '${gender}', '${birthday}', '${email}', '${phone}')`;
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${first_name} has been listed`);
        }
      });
    });
  }

  updateData(id, first_name, last_name, gender, birthday, email, phone) {
    db.serialize(function() {
      let query = `UPDATE student SET first_name = "${first_name}", last_name = "${last_name}", gender = "${gender}", birthday = "${birthday}", email = "${email}", phone = "${phone}" WHERE id = "${id}"`
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Student\'s data updated");
        }
      });
    });
  }

  deleteData(first_name) {
    db.serialize(function() {
      let query = `DELETE FROM student WHERE first_name = ${first_name}`
      db.run(query, (err) => {
        if (err) {
          console.log(err,'----');
        } else {
          console.log('Student has been deleted');
        }
      });
    });
  }

  listData() {
    db.serialize(function() {
      let query = "SELECT * FROM student"
      db.all(query, (err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }

  listName(name) {
    db.serialize(function() {
      let query = `SELECT * FROM student WHERE first_name like '%${name}%' OR last_name like '%${name}%'`
      db.all(query, (err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }

  listBy(option, value) {
    db.serialize(function() {
      let query = `SELECT * FROM student WHERE "${option}" = "${value}"`
      db.all(query, (err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }

  listMonth() {
    db.serialize(function() {
      let query = `SELECT * FROM student WHERE strftime('%m', birthday) = strftime('%m', date('now'))`
      db.all(query, (err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }

  listSorted() {
    db.serialize(function() {
      let query = `SELECT * FROM student ORDER BY strftime('%m%d', birthday) ASC`
      db.all(query, (err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }
}

let studentData = new Student()
replServer.context.createData = studentData.createData;
replServer.context.deleteData = studentData.deleteData;
replServer.context.listData = studentData.listData;
replServer.context.listName = studentData.listName;
replServer.context.listBy = studentData.listBy;
replServer.context.listMonth = studentData.listMonth;
replServer.context.listSorted = studentData.listSorted;