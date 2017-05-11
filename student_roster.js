"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite3.Database(file);

// write your code dhere
const replServer = repl.start({
  prompt: '>',
  input: process.stdin,
  output: process.stdout
});

class Students {
  static addStudents (Id,first_name, last_name ,gender, birthday, email,phone ){
    let add = `INSERT INTO students (first_name, last_name,gender, birthday ,email , phone) VALUES ('${first_name}', '${last_name}','${gender}' , '${birthday}' , '${email}' ,'${phone}');`;
      db.serialize(function () {
      db.run(add, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(add);
        }
      });
    });
  }


   static updateStudents(Id,first_name,last_name, gender , birthday , email , phone) {
     let update = `UPDATE students SET first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}',
                  birthday = '${birthday}', email = '${email}', phone = '${phone}' WHERE Id = '${Id}'`;
      db.serialize(function() {

        db.run(update, function (err,row) {
          if(err) {
            console.log(err);
          } else {
          console.log(row);
        }
      })
    })
  }

  static deleteStudents (Id) {
    let del = `DELETE FROM students WHERE students.id = '${Id}';`;
      db.serialize(function () {
      db.run(del, function (err,row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(row);
        }
      });
    });
  }

  static showStudents(Id , first_name , last_name , gender , birthday , email , phone){
    let show = `SELECT * FROM students`;
      db.serialize(function () {
        db.all(show, function (err,row) {
          if (err) {
            console.log(err);
          }
          else {
            console.log(row);
          }
        });
      });
    }

  static showStudentsName(name) {
    let findName = `SELECT * FROM students WHERE first_name LIKE '%${name}%' OR last_name LIKE '%${name}%';`
      db.serialize(function () {
        db.all(findName, function (err, row) {
          if (err) {
            console.log(err);
          } else {
            console.log(row);
          }
        });
      });
    }

  static findAttribute(attribute, value){
    let show = `SELECT * FROM students WHERE ${attribute} = '${value}'`;
      db.serialize(function(){
        db.all(show, function(err,row){
          if(err){
            console.log(err);
          }else {
            console.log(row);
          }
        });
      });
    }
    static findBirthdayByThisMonth () {

     let findBirtdhay = `SELECT * FROM students WHERE strftime('%m', birthday = strftime('%m', 'now')`;
     db.serialize(function () {
       db.each(findBirthday, function (err, row) {
         if (err) {
           console.log(err);
         }
         else {
           console.log(row);
         }
       });
     });
   }

   static sortBirthday () {
     let sortBirthday = `SELECT * FROM students ORDER BY birthday desc`;
     db.serialize(function () {
       db.each(sortBirthday, function (err, row) {
         if (err) {
           console.log(err);
         }
         else {
           console.log(row);
         }
       });
     });
   }

   static help () {
     let help = `showStudent ()\naddStudent (firstname, lastname, birthdate)\nupdateStudent (id, attribute, value)\ndeleteStudent (id)\nfindName (name)\nfindAttribute (attribute)\nfindBirthdayByThisMonth ()\nsortBirthday ()\nhelp ()`;
     console.log(help);
   }


}

replServer.context.addStudents=Students.addStudents;
replServer.context.updateStudents= Students.updateStudents;
replServer.context.deleteStudents=Students.deleteStudents;
replServer.context.showStudents=Students.showStudents;
replServer.context.findAttribute=Students.findAttribute;
replServer.context.showStudentsName=Students.showStudentsName;
replServer.context.findBirthdayByThisMonth=Students.findBirthdayByThisMonth;
replServer.context.sortBirthday=Students.sortBirthday;
replServer.context.help=Students.help;
