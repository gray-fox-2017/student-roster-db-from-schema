"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let replServer = repl.start({
  prompt:'$ '
});
let db =new sqlite.Database('student.db');

class Student {
  constructor() {
    this.data=this;
  }

  insertTable(firstname,lastname,gender,birthday,email,phone){

    let query=`insert into student (first_name,last_name,gender,birthdate,email,phone) values ('${firstname}','${lastname}','${gender}','${birthday}','${email}','${phone}');`;

    db.serialize(() => {
      db.run(query,err =>{
          if(err)
          console.log(err)
          else console.log(`date inserted`);
      });
    });
  }

  getAll(){

    let query = "select * from student";

    db.serialize(() => {
      db.all(query,(err,rows) =>{
        if(err)
        console.log(err);
        else {
          console.log('\n');
          for(let i=0; i<rows.length;i++)
            console.log(rows[i].id,rows[i].first_name,rows[i].last_name,rows[i].gender,rows[i].birthdate,rows[i].email,rows[i].phone);
        }
      });
    });
  }

  updateTable(id,firstname,lastname,gender,birthday,email,phone){
    //let data=this.data;
    let query = `update student set first_name='${firstname}',last_name='${lastname}',gender='${gender}',birthdate='${birthday}',email='${email}',phone='${phone}' where id=${id};`

    db.serialize(() => {
      db.run(query,err =>{
          if(err)
          console.log(err);
          else{
            console.log(`data updated!`);
          //  data.getAll();
          }
      });
    });
  }

  deleteTable(id){
    //let data=this.data;
    let query = `delete from student where id=${id};`;

    db.serialize(() => {
      db.run(query,err =>{
          if(err)
          console.log(err);
          else {
            console.log(`data Deleted!`);
          }

      });
    });
    //data.getAll();
  }

  getByName(name){

    let query = `select * from student where first_name='${name}' or last_name='${name}'`;

    db.serialize(() => {
      db.all(query,(err,rows) =>{
        if(err)
        console.log(err);
        else {
          console.log('\n');
          for(let i=0; i<rows.length;i++)
            console.log(rows[i].id,rows[i].first_name,rows[i].last_name,rows[i].gender,rows[i].birthdate,rows[i].email,rows[i].phone);
        }
      });
    });
  }

  getAllByInput(column,value){

    let query = `select * from student where ${column}='${value}'`;

    db.serialize(() => {
      db.all(query,(err,rows) =>{
        if(err)
        console.log(err);
        else {
          console.log('\n');
          for(let i=0; i<rows.length;i++)
            console.log(rows[i].id,rows[i].first_name,rows[i].last_name,rows[i].gender,rows[i].birthdate,rows[i].email,rows[i].phone);
        }
      });
    });
  }

  getByThisMonth(){

    let query = `select * from student where strftime('%m', birthdate) = strftime('%m', 'now')`;

    db.serialize(() => {
      db.all(query,(err,rows) =>{
        if(err)
        console.log(err);
        else {
          console.log(`B'day this Month:`)
          for(let i=0; i<rows.length;i++)
            console.log(rows[i].id,rows[i].first_name,rows[i].last_name,rows[i].gender,rows[i].birthdate,rows[i].email,rows[i].phone);
        }
      });
    });
  }

    getBirthdateAsc(){

      let query = `select * from student order by strftime('%m-%d', birthdate) asc`;

      db.serialize(() => {
        db.all(query,(err,rows) =>{
          if(err)
          console.log(err);
          else {
            console.log(`B'day this Year:`)
            for(let i=0; i<rows.length;i++)
              console.log(rows[i].id,rows[i].first_name,rows[i].last_name,rows[i].gender,rows[i].birthdate,rows[i].email,rows[i].phone);
          }
        });
      });
    }

  help(){
    console.log("\n============ HELP ============");
    console.log("$ insertTable(firstname,lastname,gender,birthday,email,phone)")
    console.log("$ updateTable()");
    console.log("$ deleteTable()");
    console.log("$ getAll()");
    console.log("$ getByName(name)");
    console.log("$ getAllByInput(column,value)");
    console.log("$ getByThisMonth()");
    console.log("$ help()");
  }

}

let student = new Student()

replServer.context.insertTable = student.insertTable;
replServer.context.getAll = student.getAll;
replServer.context.updateTable = student.updateTable;
replServer.context.deleteTable = student.deleteTable;
replServer.context.getByName = student.getByName;
replServer.context.getAllByInput = student.getAllByInput;
replServer.context.getByThisMonth = student.getByThisMonth;
replServer.context.getBirthdateAsc = student.getBirthdateAsc;
replServer.context.help = student.help;
