"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const file = 'student.db';
let db = new sqlite.Database(file);
let {createTable, seedData} = require('./setup.js');

let replServer = repl.start();

class Student {
  constructor() {}
  runQuery(query,tugas='',hasReturn = false) {
    db.serialize(function() {
      if (hasReturn) {
        db.all(query, (err, rows) => {
          if (err) console.log(err)
          else{
            if (rows.length > 0) rows.forEach((x) => { console.log([x.id,x.first_name+' '+x.last_name, x.gender,x.birthdate,x.email,x.PHONE].join('|'));});
            else console.log('No data');
          }

        });
      } else db.run(query,(err)=>{ if(!err) console.log('Success to '+tugas);})
    });
  }
  add(firstname,lastname,gender,birthdate,email,phone){
    let query = `INSERT INTO student (first_name,last_name,gender,birthdate,email,phone) VALUES('${firstname}','${lastname}','${gender}','${birthdate}','${email}','${phone}')`;
    this.runQuery(query,'INSERT');
  }
  readAll(){
    let query = 'SELECT * FROM student';
    this.runQuery(query,'',true);
  }
  update(id,firstname,lastname,gender,birthdate,email,phone) {
    let query = `UPDATE student SET first_name = '${firstname}', last_name='${lastname}',gender='${gender}',email='${email}',phone='${phone}', birthdate = '${birthdate}' WHERE id = ${id}`;
    this.runQuery(query,'UPDATE');
  }
  delete(id){
    let query = `DELETE FROM student WHERE id = '${id}'`;
    this.runQuery(query,'DELETE');
  }
  birthdaySort(sort){
    let query = '';
    if (sort === 'birthdate') query = "SELECT *  FROM student WHERE strftime('%m', birthdate) = strftime('%m', date('now'))";
    else {
      query = "SELECT * FROM student ORDER BY strftime('%m', birthdate) ASC, strftime('%d', birthdate) ASC";
    }
    this.runQuery(query,'read',true);
  }
  filterDt(arr=[]) {
    let len = arr.length;
    let query = 'SELECT * FROM student WHERE ';
    let where = [];
    for(let i = 0; i < len; i++) {
      let temp = arr[i].split(':');
      switch(temp[0]) {
        case 'name' : temp = `first_name like '%${temp[1]}%' OR first_name like '%${temp[1]}%' OR first_name||last_name like '%${temp[1]}%'`; break;
        default : temp = `${temp[0]} = '${temp[1]}'`; break;
      }
      where.push(temp);
    }
    query+= where.join(' AND ');
    this.runQuery(query,'read',true);
  }
}

class Controller {
  constructor() {
    this._model = new Student();
    this._view = new UI();
    this.help();
  }
  help() {
    this._view.showHelp();
  }
  add(firstname,lastname,gender,birthdate,email,phone) {
    this._model.add(firstname,lastname,gender,birthdate,email,phone);
  }
  update(id,firstname,lastname,gender,birthdate,email,phone) {
    this._model.update(id,firstname,lastname,gender,birthdate,email,phone);
  }
  delete(id) {
    this._model.delete(id);
  }
  read (name = '') {
    if (name === '') this._model.readAll();
    else{
      let arr = ['name:'+name];
      this._model.filterDt(arr);
    }
  }
  filterDt(str) {
    this._model.filterDt(str.split(' '));
  }
  birthdaySort(datas) {
    this._model.birthdaySort('');
  }
  birthdayMonth() {
    this._model.birthdaySort('birthdate');
  }
}

class UI {
  constructor() {}
  showHelp() {
    console.log('HELP');
    console.log('1. student.add(firstname,lastname,gender,birthdate,email,phone)');
    console.log('2. student.update(id,firstname,lastname,gender,birthdate,email,phone');
    console.log('3. student.delete(id)');
    console.log('4. student.read()');
    console.log('5. student.read(searchname)');
    console.log('6. student.filterDt("first_name:poppy last_name:sari gender:F")');
    console.log('7. student.birthdayMonth()'); //currmonth
    console.log('8. student.birthdaySort()') //abaikan tahun
  }
}

replServer.context.student = new Controller();
replServer.context.createTable = createTable;
