"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const file = 'student.db';
let db = new sqlite.Database(file);
let {createTable, seedData} = require('./setup.js');

let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
})

// replServer.context.createTable = createTable;


class Student {
  constructor() {
  }
  runQuery(query,tugas='',hasReturn = false) {
    db.serialize(function() {
      if (hasReturn) {
        db.all(query, (err, rows) => {
          rows.forEach((x) => {
            console.log([x.first_name+' '+x.last_name, x.gender,x.birthdate,x.email,x.PHONE]);
          })
        });
      } else {
        db.run(query,(err)=>{
          if(!err) console.log('Success to '+tugas);
        })
      }
      // stmt.finalize();
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
    // console.log(query);
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
    this.runQuery(query,true);
  }
  filterDt(arr=[]) {
    console.log('called');
    let len = arr.length;
    let query = 'SELECT * FROM student WHERE ';
    let where = [];
    for(let i = 0; i < len; i++) {
      let temp = arr[i].split(':');
      switch(temp[0]) {
        case 'name' : temp = `first_name||last_name like '%${temp[1]}%'`; break;
        default : temp = `${temp[0]} = '${temp[1]}'`; break;
      }
      where.push(temp);

    }
    query+= where.join(' AND ');

    // console.log(query);
    this.runQuery(query,true);
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
    let res = [];
    if (name === '') res = this._model.readAll();
    else{
      let arr = ['name:'+name];
      res  = this._model.filterDt(arr);
    }
    // console.log(res);
  }
  filterDt(str) {
    let res = this._model.filterDt(str.split(' '));
    // console.log(res);
  }

  birthdaySort(datas) {
    let res = this._model.birthdaySort("");
    // console.log(res);
  }
  birthdayMonth() {
    let res = this._model.birthdaySort('birthdate');
    // console.log(res);

  }

  // resToArr(res) {
  //   let res2 = [];
  //   if(typeof res !== 'undefined' && res !== null) {
  //     res.forEach((x) => {
  //       res2.push(x.first_name+' '+x.last_name, x.gender,x.birthdate,x.email,x.phone);
  //     })
  //     // console.log(res2.join(' |'));
  //   // } else console.log('No data');
  // }
}

class UI {
  constructor() {

  }
  showHelp() {
    console.log('HELP');
    console.log('1. add(firstname,lastname,gender,birthdate,email,phone)');
    console.log('2. update(id,firstname,lastname,gender,birthdate,email,phone');
    console.log('3. delete(id)');
    console.log('4. read()');
    console.log('5. read(searchname)');
    console.log('6. filterDt("first_name:poppy last_name:sari gender:F")');
    console.log('7. birthdayMonth()'); //currmonth
    console.log('8. birthdaySort()') //abaikan tahun
  }
}

replServer.context.student = new Controller();
replServer.context.createTable = createTable;
