var express = require('express');
var mysql = require('mysql');
var app = express();
// mysqlの接続設定
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'インストールした際のやつに変えてください',
    database: 'express_sample'
});
// mysqlが接続できなかった時にエラーを表示
connection.connect(function (err) {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});
app.get('/', function (req, res) {
    connection.query('SELECT * FROM users', function (error, results) {
        console.log(results);
        res.render('hello.ejs');
    });
    //res.render('hello.ejs');
});
app.listen(3000);
