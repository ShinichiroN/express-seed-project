const express = require('express');
const mysql = require('mysql');
const app = express();

// mysqlの接続設定
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'インストールした際のやつに変えてください',
    database: 'express_sample'
});

// mysqlが接続できなかった時にエラーを表示
connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
});
  
app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
          console.log(results);
          res.render('hello.ejs');
        }
    );
    //res.render('hello.ejs');
});

app.listen(3000);