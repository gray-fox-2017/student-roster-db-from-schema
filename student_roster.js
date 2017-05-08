"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
});

var file= 'student.db';
var db= new sqlite.Database(file);

function serializeRun(query, message){
  db.serialize(function() {
    db.run(query, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(message)
      }
    });
  });
}

function serializeAll(query){
  db.serialize(function() {
    db.all(query, function(err, rows){
      if (err) {
        console.log(err);
      } else {
        if(rows.length == 0){
          console.log('tidak ada daftar');
        } else{
          for(let i=0; i<rows.length; i++){
            console.log('\n');
            console.log(`${i+1}.  Nama: ${rows[i].first_name} ${rows[i].last_name}`)
            console.log(`    ID: ${rows[i].id}`)
            console.log(`    Gender: ${rows[i].gender}`)
            console.log(`    Birthday: ${rows[i].birthday}`)
            console.log(`    Email: ${rows[i].email}`)
            console.log(`    Phone: ${rows[i].phone} \n`)
          }
        }
      }
    });
  });
}


class Student {
  constructor(){
  }

  addStudent(first_name, last_name, gender, birthday, email, phone){
    let insert = `INSERT INTO student (first_name, last_name, gender, birthday, email, phone) VALUES ('${first_name}', '${last_name}', '${gender}', '${birthday}', '${email}', '${phone}')`
    serializeRun(insert, 'Data berhasil ditambahkan.')
  }

  getAllData(){
    let allList = `SELECT * FROM student`;
    serializeAll(allList);
  }

  updateData(id, name_field, changes){
    let query = `UPDATE student SET ${name_field} = '${changes}' where id = '${id}'`
    serializeRun(query, 'Data telah diupdate.')
  }

  deleteList(id){
    let query = `delete from student where id = '${id}'`
    serializeRun(query, 'Data berhasil dihapus.')
  }

  showName(options){
    let query = `select * from student where first_name like '%${options}' or last_name like '%${options}'`
    serializeAll(query);
  }

  filterBy(attr, value){
    let query = `select * from student where ${attr} = '${value}'`
    serializeAll(query);
  }

  birthThisMonth(){
    let query = `select * from student where strftime('%m', birthday) = strftime('%m', 'now')`
    serializeAll(query);
  }
  listBirthday(){
    let query = `select * from student order by strftime('%m %d', birthday) ASC`
    serializeAll(query);
  }
  help(){
    console.log(`------------Help-------------`);
    console.log(`menambahkan data student => addStudent(first_name, last_name, gender, birthday, email, phone);`);
    console.log(`menampilkan list semua data student => getAllData();`);
    console.log(`mengupdate data student => updateData(id, name_field, changes);`);
    console.log(`delete data student berdasarkan id => deleteList(id);`);
    console.log(`memfilter data student berdasarkan nama student => showName(options);`);
    console.log(`memfilter data student berdasarkan nama attribut dan valuenya => filterBy(attr, value);`);
    console.log(`memfilter data student berdasarkan yang berulangtahun bulan ini => birthThisMonth();`);
    console.log(`mensortir data student berdasarkan hari ulangtahun => listBirthday();`);
    console.log(`menampilkan bantuan => help()`);
  }
}



let student = new Student()
replServer.context.addStudent = student.addStudent;
replServer.context.getAllData = student.getAllData;
replServer.context.updateData = student.updateData;
replServer.context.deleteList = student.deleteList;
replServer.context.showName = student.showName;
replServer.context.filterBy = student.filterBy;
replServer.context.birthThisMonth = student.birthThisMonth;
replServer.context.listBirthday = student.listBirthday;
replServer.context.help = student.help;
