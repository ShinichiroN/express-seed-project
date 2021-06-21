const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// mysqlの接続設定
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shinichiro217',
    database: 'express_sample'
});

// mysqlが接続できなかった時にエラーを表示
connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
});

app.use(cors({
  origin:'http://localhost:3000', // アクセス許可するオリジン
  credentials: true,            // レスポンスヘッダーにAccess-Control-Allow-Credentials追加
  optionSuccessStatus:200       //レスポンスstatusを200に設定
}))
  
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

// 'hello worldを返す'
app.get('/test', (req, res) => {
  res.send('hello world');
})

// usersテーブルの値を全て返す
app.get('/get-all-users', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
          console.log(results);
          res.json(results);
        }
    );
});

app.listen(3001);