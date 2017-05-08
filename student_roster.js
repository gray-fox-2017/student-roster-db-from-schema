"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);

let replServer = repl.start({
  prompt : ">> ",
  input  : process.stdin,
  output : process.stdout
});

// write your code here
class Student{
    //Sudah Di check
    addData(first_name,last_name,gender,birthdate,email,phone){
      let InsertDataQuery = `INSERT INTO student(first_name,last_name,gender,birthdate,email,phone) Values('${first_name}','${last_name}','${gender}','${birthdate}','${email}','${phone}')`;
      db.run(InsertDataQuery, function(err){
        if(!err){
          console.log(`Insert Sukses dengan data`);
        }
        else{
          console.log(`Something Wrong please read the Error, ${err}`);
        }
      });
    }
    //Sudah di check
    editData(first_name,last_name,gender,birthdate,email,phone,id){
      let UpdateDataQuery = `UPDATE student SET first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}', birthdate = '${birthdate}', email = '${email}', phone = '${phone}' WHERE id = '${id}' `;
      db.run(UpdateDataQuery, function(err){
        if(!err){
          console.log(`Update Sukses dengan data`);
        }
        else{
          console.log(`Something Wrong please read the Error, ${err}`);
        }
      });
    }
    //Sudah Di check
    deleteData(id){
      let DeleteDataQuery = `DELETE FROM student Where id = '${id}'`
      db.run(DeleteDataQuery, function(err){
        if(err){
          console.log(`Something Wrong Delete, please Read the Error : ${err}`);
        }
        else{
          console.log(`Delete untuk ID ${id} Sukses`);
        }
      });
    }
    //Sudah Di check
    getAllData(){
      let allDataQuery = `SELECT * FROM student`;
      db.all(allDataQuery, (err,rows) =>{
        if(err){
          console.log(`Something Wrong getAllData, please Read the Error : ${err}`);
        }
        else{
          console.log(rows);
        }
      });
    }
    //Sudah Selesai di check
    getFilterName(name){
      let nameQuery = `SELECT * FROM student where first_name like '%${name}%' or last_name like '%${name}'`;
      db.all(nameQuery, (err,rows) =>{
        if(err){
          console.log(`Something Wrong getFilterName, please Read the Error : ${err}`);
        }
        else{
          console.log(rows);
        }
      });
    }
    //Sudah di check
    getFilterAll(atribute,value){
      let FilterAllQuery = `Select * From student where ${atribute} = '${value}'`;
      db.all(FilterAllQuery, (err,rows) =>{
        if(err){
          console.log(`Something Wrong getFilterAll, please Read the Error : ${err}`);
        }
        else{
          console.log(rows);
        }
      });
    }
    //Sudah Di check
    getBirthdayThisMonth(){
      let TanggalFull = new Date();
      let Bulan = TanggalFull.getMonth()+1;
      let getBirthdayThisMonthQuery = `SELECT * FROM student where strftime('%m', birthdate) = '${Bulan}'`;
      db.all(FilterAllQuery, (err,rows) =>{
        if(err){
          console.log(`Something Wrong getBirthdayThisMonth, please Read the Error : ${err}`);
        }
        else{
          console.log(rows);
        }
      });
    }
    //Sudah di check
    getAllBirthday(){
      let getAllBirthdayQuery = "SELECT id, first_name, last_name,gender,email,phone,strftime('%d',birthdate) as Date, strftime('%m', birthdate) as Month FROM student order by Month asc"
      db.all(getAllBirthdayQuery, (err,rows) =>{
        if(err){
          console.log(`Something Wrong getAllBirthdayQuery, please Read the Error : ${err}`);
        }
        else{
          console.log(rows);
        }
      });
    }


}

replServer.context.student = new Student;
