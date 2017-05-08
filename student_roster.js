"use strict"

const repl = require('repl');
let replserver = repl.start({
  prompt: '\(\~\'\,\'\)\~  ',
  input: process.stdin,
  output: process.stdout
})
const sqlite = require('sqlite3').verbose();
const file = 'student.db';
const db = new sqlite.Database(file);


// write your code here
class Student{
  constructor() {
    this.file = 'student.db'
    this.db = new sqlite.Database(this.file);
    this.list = null;
    this.date = new Date();
    this.month = this.date.getMonth();
  }

  addStudent(firstname, lastname, gender, birthdate, email, notelp) {
    let queryTambahData = `INSERT INTO student (firstname, lastname, gender, birthday, email, phone) VALUES ('${firstname}', '${lastname}', '${gender}', '${birthdate}', '${email}', '${notelp}');`
    db.serialize(function () {
      db.run(queryTambahData, function(err) {
        if (err) {
          console.log('Error!!');
        } else {
          console.log('\n\nINSERT DATA BERHASIL');
        }
      });
    });
  }

  updateStudent(id, kategoryDataBaru, dataBaru) {
    let queryUpdate = `UPDATE student SET ${kategoryDataBaru} = '${dataBaru}' WHERE id = ${id}`
    db.serialize(function () {
      db.run(queryUpdate, function(err) {
        if (err) {
          console.log('Error!!');
        } else {
          console.log('\n\nUPDATE DATA BERHASIL');
        }
      });
    });
  }

  deleteStudent(id) {
    let queryHapus = `DELETE FROM student WHERE id = ${id}`
    db.serialize(function () {
      db.run(queryHapus, function(err) {
        if (err) {
          console.log('Error!!');
        } else {
          console.log('\n\nMURID DI HAPUS!!');
        }
      });
    });
  }

  listAll() {
    let queryTampilkanSemuaMurid = `SELECT * FROM student;`;
    db.all(queryTampilkanSemuaMurid, function(err, rows){
            if (err){
              console.log('error')
            } else {
              this.list = rows;
              console.log('\n')
              for (let i = 0; i<rows.length;i++) {
                console.log(`\n${i+1}. ID       : ${rows[i].id}\n   Nama     : ${rows[i].firstname} ${rows[i].lastname}\n   Gender   : ${rows[i].gender}\n   TTL      : ${rows[i].birthday}\n   e-mail   : ${rows[i].email}\n   No. Telp : ${rows[i].phone}`);
              }
            }
          })
  }

  listByName(name) {
    let queryTampilkanMuridBerdasarkanNama = `SELECT * FROM student WHERE firstname = '${name}' OR lastname = '${name}';`;
    db.all(queryTampilkanMuridBerdasarkanNama, function(err, rows){
            if (err){
              console.log('error')
            } else {
              this.list = rows;
              if (rows.length < 1) {
                console.log('\n\nTidak ada yang ketemu!');
              }
              console.log('\n')
              for (let i = 0; i<rows.length;i++) {
                console.log(`\n${i+1}. ID       : ${rows[i].id}\n   Nama     : ${rows[i].firstname} ${rows[i].lastname}\n   Gender   : ${rows[i].gender}\n   TTL      : ${rows[i].birthday}\n   e-mail   : ${rows[i].email}\n   No. Telp : ${rows[i].phone}`);
              }
            }
          })
  }

  listByFilter(kategory, value) {
    let queryTampilkanMuridHabisDiFilter = `SELECT * FROM student WHERE ${kategory} = '${value}';`;
    db.all(queryTampilkanMuridHabisDiFilter, function(err, rows){
            if (err){
              console.log('error')
            } else {
              this.list = rows;
              if (rows.length<1) {
                console.log('\n\nTidak ada yang ketemu!')
              }
              console.log('\n')
              for (let i = 0; i<rows.length;i++) {
                console.log(`\n${i+1}. ID       : ${rows[i].id}\n   Nama     : ${rows[i].firstname} ${rows[i].lastname}\n   Gender   : ${rows[i].gender}\n   TTL      : ${rows[i].birthday}\n   e-mail   : ${rows[i].email}\n   No. Telp : ${rows[i].phone}`);
              }
            }
          })
  }

  birthdayStudent() {
    let queryBirthdayBoy = `SELECT * FROM student`
    db.all(queryBirthdayBoy, function(err, rows){
            if (err){
              console.log('error')
            } else {
              let ultah = rows.map(x => x.birthday.split('-'));
              this.list = rows;
              this.date = new Date();
              let ultahboy = [];
              this.month = (this.date.getMonth())+1;
              for (let i=0;i<ultah.length;i++) {
                if (ultah[i][1] == this.month) {
                  ultahboy.push(this.list[i])
                }
              }
              if (ultahboy.length < 1) {
                console.log('\nGa ada yang ulang tahun bulan ini :(')
              } else {  console.log('\n\nMurid yang ulang tahun di bulan ini:\n')
                for (let i = 0; i< ultahboy.length;i++) {
                  console.log(`${i+1}. Nama : ${ultahboy[i].firstname} ${ultahboy[i].lastname}\n   TTL  : ${ultahboy[i].birthday}\n`)
                }
              }
            }
          })
  }

  sortbyBirthday() {
    let query = `SELECT * FROM student`
    db.all(query, function(err, rows){
            if (err){
              console.log('error')
            } else {
              let siswa = rows;
              let ultahSiswa = rows.map(x => x.birthday.split('-').splice(1,2));
              let penentu = ultahSiswa.map(x => {
                let bulan = parseInt(x[0])*30;
                let tanggal = bulan + parseInt(x[1]);
                return tanggal;
              })
              for (let i = 0;i<siswa.length;i++) {
                siswa[i].angkaUltah = penentu[i]
              }
              siswa.sort((a,b)=>a.angkaUltah-b.angkaUltah);
              let output = siswa.map(x => {
                delete x.angkaUltah;
                return x
              })
              console.log('\n\nDaftar siswa diurutkan dari tanggal ulang tahunnya!')
              for (let i=0;i<output.length;i++) {
                console.log(`\n${i+1}. ID       : ${rows[i].id}\n   Nama     : ${rows[i].firstname} ${rows[i].lastname}\n   Gender   : ${rows[i].gender}\n   TTL      : ${rows[i].birthday}\n   e-mail   : ${rows[i].email}\n   No. Telp : ${rows[i].phone}`);
              }
            }
          })
  }

  pertolongan() {
    console.log('\n\nDaftar command untuk mengoperasikan student_roster.js :')
    console.log(`\n[1] tambah('<firstname>', '<lastname>', '<gender>', '<birthdate>', '<email>', '<notelp>')`)
    console.log(`   ------> untuk menambahkan siswa baru ke dalam daftar siswa.`)
    console.log(`\n[2] update('<id>', '<kategory>', '<data baru>')`)
    console.log(`   ------> untuk merubah data siswa tertentu pada kategori tertentu.`)
    console.log(`\n[3] hapus('<id>')`)
    console.log(`   ------> untuk menghapus siswa dari daftar siswa.`)
    console.log(`\n[4] list()`)
    console.log(`   ------> untuk menampilkan seluruh daftar siswa.`)
    console.log(`\n[5] list_byName('<name>')`)
    console.log(`   ------> untuk menampilkan siswa yang memiliki nama sesuai dengan yang di cari.`)
    console.log(`\n[6] list_byFilter('<category>', '<value>')`)
    console.log(`   ------> untuk menampilkan siswa yang memiliki value sesuai dengan yang di cari.`)
    console.log(`\n[7] show_birthday()`)
    console.log(`   ------> untuk menampilkan siswa yang ulang tahun di bulan ini, ciyee.`)
    console.log(`\n[8] sort_birthday()`)
    console.log(`   ------> untuk menampilkan daftar siswa di urutkan berdasarkan tanggal ulang tahunnya.`)
  }

}

var sistem = new Student();

replserver.context.tambah = sistem.addStudent;
replserver.context.update = sistem.updateStudent;
replserver.context.hapus = sistem.deleteStudent;
replserver.context.list_all = sistem.listAll;
replserver.context.list_byName = sistem.listByName;
replserver.context.list_byFilter = sistem.listByFilter;
replserver.context.show_birthday = sistem.birthdayStudent;
replserver.context.sort_birthday = sistem.sortbyBirthday;
replserver.context.help = sistem.pertolongan;

